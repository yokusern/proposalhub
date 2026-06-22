'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { saveProposal } from '@/lib/proposals'
import { useAuth } from '@/hooks/useAuth'
import { Tone, PLATFORM_LABELS, Platform } from '@/types'

const PLATFORMS = Object.entries(PLATFORM_LABELS) as [Platform, string][]
const TONES: { val: Tone; label: string }[] = [
  { val: 'polite',       label: '丁寧' },
  { val: 'professional', label: 'プロフェッショナル' },
  { val: 'casual',       label: 'カジュアル' },
]

export default function ProposePage() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [platform, setPlatform] = useState<Platform>('lancers')
  const [tone, setTone] = useState<Tone>('polite')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState('')
  const [generating, setGenerating] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState('')
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const generate = async () => {
    if (!user || !jobDesc.trim()) return
    setErr(''); setResult(''); setSaved(false); setGenerating(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ platform, tone, jobDesc, skills: profile?.skills ?? '' }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setErr(d.error || '生成に失敗しました')
        return
      }
      const reader = res.body?.getReader()
      if (!reader) return
      const decoder = new TextDecoder()
      let text = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setResult(text)
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    } catch (e) {
      setErr('通信エラーが発生しました')
    } finally {
      setGenerating(false)
    }
  }

  const saveAndRegister = async () => {
    if (!user || !result) return
    await saveProposal(user.uid, { projectId: null, jobDescription: jobDesc, tone, generatedText: result })
    setSaved(true)
    setTimeout(() => router.push('/dashboard'), 1200)
  }

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.03em' }}>提案文生成</h1>
      <p style={{ fontSize: 13, color: '#555', margin: '0 0 32px' }}>案件内容を貼るだけで採用される提案文をAIが生成します</p>

      {/* Platform & Tone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>プラットフォーム</label>
          <select value={platform} onChange={e => setPlatform(e.target.value as Platform)}
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14 }}>
            {PLATFORMS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>文体</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {TONES.map(t => (
              <button key={t.val} onClick={() => setTone(t.val)}
                style={{ flex: 1, padding: '10px 4px', background: tone === t.val ? 'rgba(249,115,22,0.15)' : '#1a1a1a', border: tone === t.val ? '1px solid #f97316' : '1px solid #2a2a2a', borderRadius: 8, color: tone === t.val ? '#f97316' : '#888', fontSize: 12, cursor: 'pointer', fontWeight: tone === t.val ? 700 : 400 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job description */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>案件内容 *</label>
        <textarea
          rows={8} value={jobDesc} onChange={e => setJobDesc(e.target.value)}
          placeholder={'案件のURL or 案件説明文を貼り付けてください。\n\n例：「React を使ったコーポレートサイト制作。レスポンシブ対応必須。予算5万円、納期2週間。」'}
          style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: '14px 16px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6 }}
        />
      </div>

      <button
        onClick={generate} disabled={generating || !jobDesc.trim()}
        style={{ width: '100%', padding: '14px', background: generating || !jobDesc.trim() ? '#2a2a2a' : '#f97316', border: 'none', borderRadius: 10, color: generating || !jobDesc.trim() ? '#555' : '#fff', fontSize: 15, fontWeight: 800, cursor: generating || !jobDesc.trim() ? 'not-allowed' : 'pointer', marginBottom: 24 }}
      >
        {generating ? '生成中...' : '✍️ 提案文を生成'}
      </button>

      {err && (
        <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
          <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{err}</p>
        </div>
      )}

      {result && (
        <div ref={resultRef} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#888' }}>生成結果</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={copy} style={{ fontSize: 12, padding: '6px 14px', background: copied ? 'rgba(74,222,128,0.1)' : '#2a2a2a', border: `1px solid ${copied ? '#4ade80' : '#333'}`, borderRadius: 6, color: copied ? '#4ade80' : '#aaa', cursor: 'pointer', transition: 'all 0.2s' }}>
                {copied ? '✓ コピー済み' : 'コピー'}
              </button>
              {!generating && (
                <button onClick={saveAndRegister} disabled={saved} style={{ fontSize: 12, padding: '6px 14px', background: saved ? '#1a3a1a' : 'rgba(249,115,22,0.15)', border: `1px solid ${saved ? '#4ade80' : '#f97316'}`, borderRadius: 6, color: saved ? '#4ade80' : '#f97316', cursor: saved ? 'default' : 'pointer', fontWeight: 700 }}>
                  {saved ? '✓ 保存済み' : '案件として保存'}
                </button>
              )}
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#ddd', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap' }}>{result}</p>
        </div>
      )}

      {generating && !result && (
        <div style={{ textAlign: 'center', padding: 40, color: '#555', fontSize: 14 }}>
          <div style={{ width: 24, height: 24, border: '2px solid #2a2a2a', borderTop: '2px solid #f97316', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Claudeが提案文を生成しています...
        </div>
      )}
    </div>
  )
}
