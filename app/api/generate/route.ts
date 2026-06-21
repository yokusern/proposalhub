import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin'
import { FREE_PROPOSAL_LIMIT } from '@/types'

export const dynamic = 'force-dynamic'

function getGenAI() {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not set')
  return new GoogleGenerativeAI(key)
}

function buildPrompt(platform: string, tone: string, jobDesc: string, skills: string): string {
  const platformLabel: Record<string, string> = {
    lancers: 'ランサーズ', coconala: 'ココナラ', crowdworks: 'クラウドワークス',
    direct: '直案件', other: 'フリーランスサイト',
  }
  const toneGuide: Record<string, string> = {
    polite: '丁寧で誠実な文体。「〜させていただきます」を適切に使う。',
    professional: '実績・能力を前面に出した自信のある文体。数値や具体例を積極的に使う。',
    casual: '親しみやすいが礼儀を守った文体。硬すぎず、でも軽すぎない。',
  }
  return `あなたはフリーランスの受注率を高める提案文のエキスパートです。
${platformLabel[platform] || 'フリーランスサイト'}向けの提案文を書いてください。

文体：${toneGuide[tone] || toneGuide.polite}

ルール：
1. 300〜500文字程度で簡潔に
2. 冒頭で案件への理解・共感を1文で示す
3. 「なぜこの案件に向いているか」を具体的に示す
4. スキル・実績を自然に盛り込む
5. 締めは「ぜひお話しさせてください」系で
6. マークダウン記号は使わない。プレーンテキストのみ。

案件情報：
${jobDesc}
${skills ? `\n自分のスキル・経歴：\n${skills}` : ''}

上記の案件に対する提案文を書いてください。`
}

async function getProposalCountThisMonth(uid: string): Promise<number> {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const snap = await getAdminDb()
    .collection('ph_proposals').where('userId', '==', uid)
    .where('createdAt', '>=', start).count().get()
  return snap.data().count
}

export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') || '').replace('Bearer ', '')
  if (!token) return Response.json({ error: '認証が必要です' }, { status: 401 })

  let uid: string
  try { uid = (await getAdminAuth().verifyIdToken(token)).uid }
  catch { return Response.json({ error: '認証エラー' }, { status: 401 }) }

  const userDoc = await getAdminDb().collection('ph_users').doc(uid).get()
  const plan = userDoc.data()?.plan ?? 'free'

  if (plan === 'free') {
    const count = await getProposalCountThisMonth(uid)
    if (count >= FREE_PROPOSAL_LIMIT) {
      return Response.json({ error: `今月の生成上限（${FREE_PROPOSAL_LIMIT}件）に達しました。Proプランで無制限に使えます。` }, { status: 429 })
    }
  }

  const { platform, tone, jobDesc, skills } = await req.json()
  if (!jobDesc?.trim()) return Response.json({ error: '案件情報を入力してください' }, { status: 400 })

  const genAI = getGenAI()
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const result = await model.generateContentStream(buildPrompt(platform, tone, jobDesc, skills ?? ''))

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) controller.enqueue(encoder.encode(text))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
  })
}
