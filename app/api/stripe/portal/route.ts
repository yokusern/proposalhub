export const dynamic = 'force-dynamic'
import { NextRequest } from 'next/server'
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin'
import { stripe, APP_URL } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') || '').replace('Bearer ', '')
  if (!token) return Response.json({ error: '認証が必要です' }, { status: 401 })

  let uid: string
  try {
    uid = (await getAdminAuth().verifyIdToken(token)).uid
  } catch {
    return Response.json({ error: '認証エラー' }, { status: 401 })
  }

  const userDoc = await getAdminDb().collection('ph_users').doc(uid).get()
  const customerId = userDoc.data()?.stripeCustomerId
  if (!customerId) return Response.json({ error: '顧客情報が見つかりません' }, { status: 404 })

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${APP_URL}/settings`,
  })

  return Response.json({ url: session.url })
}
