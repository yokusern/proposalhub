'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { subscribeTemplates } from '@/lib/firestore'
import { addTemplate, updateTemplate, deleteTemplate } from '@/lib/templates'
import { Template } from '@/types'

export default function TemplatesPage() {
  const { user } = useAuth()
  const [templates, setTemplates] = useState<Template[]>([])
  const [form, setForm] = useState({ name: '', content: '', category: '' })
  const [editing, setEditing] = useState<Template | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    return subscribeTemplates(user.uid, setTemplates)
  }, [user])

  const save = async () => {
    if (!user || !form.name.trim() || !form.content.trim()) return
    setSaving(true)
    try {
      if (editing) {
        await updateTemplate(editing.id, form)
        setEditing(null)
      } else {
        await addTemplate(user.uid, form)
      }
      setForm({ name: '', content: '', category: '' })
    } finally { setSaving(false) }
  }

  const del = async (id: string) => {
    if (!confirm('削除しますか？')) return
    await deleteTemplate(id)
  }

  const startEdit = (t: Template) => {
    setEditing(t)
    setForm({ name: t.name, content: t.content, category: t.category })
  }

  const label = (s: { display: 'block'; fontSize: string; color: string; marginBottom: string }) => s

  return (
    <div style={{ maxWidth: 860, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      {/* Form */}
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 24px', letterSpacing: '-0.03em', gridColumn: '1/-1' }}>
          {editing ? 'テンプレートを編集' : '新規テンプレート'}
        </h1>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>テンプレート名 *</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="例：LP制作・丁寧体"
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>カテゴリ</label>
          <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            placeholder="例：Webサイト制作 / GAS / AI組み込み"
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#888', marginBottom: 6 }}>テンプレート本文 *</label>
          <textarea rows={10} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder="提案文のテンプレートを入力..."
            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 12px', color: '#f0f0f0', fontSize: 13, boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.65 }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ name: '', content: '', category: '' }) }}
              style={{ padding: '10px 16px', background: '#2a2a2a', border: 'none', color: '#aaa', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              キャンセル
            </button>
          )}
          <button onClick={save} disabled={saving}
            style={{ flex: 1, padding: '10px', background: '#f97316', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
            {saving ? '保存中...' : editing ? '更新' : '追加'}
          </button>
        </div>
      </div>

      {/* List */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px', color: '#aaa' }}>
          保存済み（{templates.length}件）
        </h2>
        {templates.length === 0 ? (
          <p style={{ color: '#444', fontSize: 13 }}>まだテンプレートがありません</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {templates.map(t => (
              <div key={t.id} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f0' }}>{t.name}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => startEdit(t)}
                      style={{ fontSize: 11, padding: '3px 8px', background: '#2a2a2a', border: 'none', color: '#aaa', borderRadius: 4, cursor: 'pointer' }}>
                      編集
                    </button>
                    <button onClick={() => del(t.id)}
                      style={{ fontSize: 11, padding: '3px 8px', background: 'transparent', border: '1px solid #f87171', color: '#f87171', borderRadius: 4, cursor: 'pointer' }}>
                      削除
                    </button>
                  </div>
                </div>
                {t.category && <span style={{ fontSize: 11, color: '#f97316', marginBottom: 8, display: 'block' }}>{t.category}</span>}
                <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
