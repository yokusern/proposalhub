'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { addProject, updateProject, deleteProject } from '@/lib/projects'
import { Project, ProjectInput, PLATFORM_LABELS, Platform, FREE_PROJECT_LIMIT } from '@/types'

interface Props {
  existing?: Project
  totalCount: number
  onClose: () => void
  onProposalLink?: (text: string) => void
}

const PLATFORMS = Object.entries(PLATFORM_LABELS) as [Platform, string][]

export default function ProjectForm({ existing, totalCount, onClose, onProposalLink }: Props) {
  const { user, profile } = useAuth()
  const isPro = profile?.plan !== 'free'
  const [form, setForm] = useState<ProjectInput>({
    clientName: existing?.clientName ?? '',
    title: existing?.title ?? '',
    description: existing?.description ?? '',
    platform: existing?.platform ?? 'lancers',
    amount: existing?.amount ?? 0,
    deadline: existing?.deadline ? existing.deadline.slice(0, 10) : '',
    proposalText: existing?.proposalText ?? '',
    memo: existing?.memo ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const canAdd = isPro || totalCount < FREE_PROJECT_LIMIT

  const save = async () => {
    if (!user || !form.title.trim()) return
    if (!existing && !canAdd) return alert(`Freeプランは案件${FREE_PROJECT_LIMIT}件まで。Proにアップグレードしてください。`)
    setSaving(true)
    try {
      if (existing) {
        await updateProject(user.uid, existing.id, form)
      } else {
        await addProject(user.uid, form, totalCount)
      }
      onClose()
    } finally { setSaving(false) }
  }

  const del = async () => {
    if (!existing || !user || !confirm('削除しますか？')) return
    setDeleting(true)
    try { await deleteProject(existing.id); onClose() }
    finally { setDeleting(false) }
  }

  const set = (k: keyof ProjectInput, v: string | number) =>
    setForm(f => ({ ...f, [k]: v }))

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{existing ? '案件を編集' : '案件を追加'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 20 }}>×</button>
        </div>

        {[
          { label: 'クライアント名', key: 'clientName', type: 'text', placeholder: '例：株式会社サンプル' },
          { label: '案件名 *', key: 'title', type: 'text', placeholder: '例：LP制作 React+Tailwind' },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>{f.label}</label>
            <input
              type={f.type} placeholder={f.placeholder}
              value={form[f.key as keyof ProjectInput] as string}
              onChange={e => set(f.key as keyof ProjectInput, e.target.value)}
              style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>プラットフォーム</label>
            <select
              value={form.platform}
              onChange={e => set('platform', e.target.value)}
              style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14 }}
            >
              {PLATFORMS.map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>報酬額（円）</label>
            <input
              type="number" min={0}
              value={form.amount || ''}
              onChange={e => set('amount', parseInt(e.target.value) || 0)}
              style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>納期</label>
          <input
            type="date" value={form.deadline ?? ''}
            onChange={e => set('deadline', e.target.value)}
            style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>提案文</label>
          <textarea
            rows={4} value={form.proposalText ?? ''}
            onChange={e => set('proposalText', e.target.value)}
            placeholder="提案文を入力、または提案文生成画面で作成してここに貼り付け"
            style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>メモ</label>
          <textarea
            rows={2} value={form.memo ?? ''}
            onChange={e => set('memo', e.target.value)}
            style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {existing && (
            <button onClick={del} disabled={deleting} style={{ padding: '10px 16px', background: 'transparent', border: '1px solid #f87171', color: '#f87171', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              {deleting ? '削除中...' : '削除'}
            </button>
          )}
          <button onClick={onClose} style={{ padding: '10px 16px', background: '#2a2a2a', border: 'none', color: '#aaa', borderRadius: 8, cursor: 'pointer', fontSize: 13, marginLeft: 'auto' }}>
            キャンセル
          </button>
          <button onClick={save} disabled={saving} style={{ padding: '10px 20px', background: '#f97316', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            {saving ? '保存中...' : existing ? '更新' : '追加'}
          </button>
        </div>
      </div>
    </div>
  )
}
