'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile } from '@/lib/firestore'

export default function SettingsPage() {
  const { user, profile } = useAuth()
  const [skills, setSkills] = useState(profile?.skills ?? '')
  const [experience, setExperience] = useState(profile?.experience ?? '')
  const [goal, setGoal] = useState(profile?.monthlyGoal ?? 100000)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async () => {
    if (!user) return
    setSaving(true)
    try {
      await updateProfile(user.uid, { skills, experience, monthlyGoal: goal })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally { setSaving(false) }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.03em' }}>設定</h1>
      <p style={{ fontSize: 13, color: '#555', margin: '0 0 32px' }}>提案文生成に使うプロフィールを設定します</p>

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
            placeholder="例：3年間で22個のWebアプリを開発。LP制作5件、GAS自動化10件の実績。"
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
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, padding: 28 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#aaa' }}>プラン</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: profile?.plan === 'free' ? '#888' : '#f97316' }}>
              {profile?.plan === 'free' ? 'Free' : profile?.plan === 'pro' ? 'Pro' : 'Business'}
            </span>
            <p style={{ fontSize: 12, color: '#555', margin: '4px 0 0' }}>
              {profile?.plan === 'free' ? '案件3件・AI生成5回/月まで' : '案件無制限・AI生成無制限'}
            </p>
          </div>
          {profile?.plan === 'free' && (
            <span style={{ fontSize: 12, color: '#aaa' }}>Stripe実装後に有効化</span>
          )}
        </div>
      </div>
    </div>
  )
}
