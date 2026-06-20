'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile } from '@/lib/firestore'

async function callStripeApi(path: string, token: string) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (data.url) window.location.href = data.url
}

export default function SettingsPage() {
  const { user, profile } = useAuth()
  const searchParams = useSearchParams()
  const [skills, setSkills] = useState(profile?.skills ?? '')
  const [experience, setExperience] = useState(profile?.experience ?? '')
  const [goal, setGoal] = useState(profile?.monthlyGoal ?? 100000)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stripeLoading, setStripeLoading] = useState(false)
  const [upgraded, setUpgraded] = useState(false)

  useEffect(() => {
    if (profile) {
      setSkills(profile.skills)
      setExperience(profile.experience)
      setGoal(profile.monthlyGoal)
    }
  }, [profile])

  useEffect(() => {
    if (searchParams.get('upgraded') === '1') setUpgraded(true)
  }, [searchParams])

  const save = async () => {
    if (!user) return
    setSaving(true)
    try {
      await updateProfile(user.uid, { skills, experience, monthlyGoal: goal })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally { setSaving(false) }
  }

  const handleUpgrade = async () => {
    if (!user) return
    setStripeLoading(true)
    try {
      const token = await user.getIdToken()
      await callStripeApi('/api/stripe/checkout', token)
    } finally { setStripeLoading(false) }
  }

  const handlePortal = async () => {
    if (!user) return
    setStripeLoading(true)
    try {
      const token = await user.getIdToken()
      await callStripeApi('/api/stripe/portal', token)
    } finally { setStripeLoading(false) }
  }

  const isPro = profile?.plan === 'pro' || profile?.plan === 'business'

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.03em' }}>設定</h1>
      <p style={{ fontSize: 13, color: '#555', margin: '0 0 32px' }}>提案文生成に使うプロフィールを設定します</p>

      {upgraded && (
        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid #4ade80', borderRadius: 12, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🎉</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#4ade80', margin: 0 }}>Proプランへのアップグレード完了！</p>
            <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0' }}>案件・AI生成が無制限になりました</p>
          </div>
        </div>
      )}

      {/* Profile */}
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', color: '#aaa' }}>提案文プロフィール</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>スキル</label>
          <input value={skills} onChange={e => setSkills(e.target.value)}
            placeholder="例：Next.js, TypeScript, Firebase, GAS, Python"
            style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>経歴・実績</label>
          <textarea rows={4} value={experience} onChange={e => setExperience(e.target.value)}
            placeholder="例：3年間で25個のWebアプリを開発。LP制作5件、GAS自動化10件の実績。"
            style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box', resize: 'vertical' }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>月次目標売上（円）</label>
          <input type="number" value={goal} onChange={e => setGoal(parseInt(e.target.value) || 0)} min={0}
            style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }} />
        </div>

        <button onClick={save} disabled={saving}
          style={{ padding: '10px 24px', background: saved ? '#4ade80' : '#f97316', border: 'none', color: saved ? '#111' : '#fff', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
          {saved ? '✓ 保存しました' : saving ? '保存中...' : '保存'}
        </button>
      </div>

      {/* Plan */}
      <div style={{ background: '#1a1a1a', border: isPro ? '1px solid rgba(249,115,22,0.4)' : '1px solid #2a2a2a', borderRadius: 14, padding: 28 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', color: '#aaa' }}>プラン</h2>

        {isPro ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🔥</span>
              <div>
                <p style={{ fontSize: 18, fontWeight: 900, color: '#f97316', margin: 0 }}>Pro プラン</p>
                <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0' }}>案件管理無制限・AI生成無制限・テンプレート保存</p>
              </div>
            </div>
            <button onClick={handlePortal} disabled={stripeLoading}
              style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #3a3a3a', color: '#888', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              {stripeLoading ? '読み込み中...' : 'サブスクリプションを管理'}
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, background: '#111', border: '1px solid #2a2a2a', borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#888', margin: '0 0 8px' }}>Free</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#f0f0f0', margin: '0 0 8px' }}>¥0</p>
                <ul style={{ fontSize: 12, color: '#666', margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
                  <li>案件管理 3件まで</li>
                  <li>AI生成 5回/月まで</li>
                </ul>
              </div>
              <div style={{ flex: 1, background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 10, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#f97316', margin: '0 0 8px' }}>Pro ✦</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#f0f0f0', margin: '0 0 8px' }}>¥980<span style={{ fontSize: 13, fontWeight: 400, color: '#888' }}>/月</span></p>
                <ul style={{ fontSize: 12, color: '#aaa', margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
                  <li>案件管理 無制限</li>
                  <li>AI生成 無制限</li>
                  <li>テンプレート保存</li>
                  <li>売上分析ダッシュボード</li>
                </ul>
              </div>
            </div>
            <button onClick={handleUpgrade} disabled={stripeLoading}
              style={{ width: '100%', padding: 14, background: stripeLoading ? '#555' : '#f97316', border: 'none', color: '#fff', borderRadius: 10, cursor: stripeLoading ? 'default' : 'pointer', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>
              {stripeLoading ? '読み込み中...' : 'Proにアップグレード → ¥980/月'}
            </button>
            <p style={{ fontSize: 11, color: '#555', textAlign: 'center', marginTop: 10 }}>いつでもキャンセル可能 · Stripe で安全に決済</p>
          </>
        )}
      </div>
    </div>
  )
}
