'use client'
import { useState } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { Project, ProjectStatus, COLUMNS, FREE_PROJECT_LIMIT } from '@/types'
import { batchUpdateOrder } from '@/lib/projects'
import { useAuth } from '@/hooks/useAuth'
import KanbanColumn from './KanbanColumn'
import ProjectForm from './ProjectForm'

interface Props { projects: Project[] }

export default function KanbanBoard({ projects }: Props) {
  const { profile } = useAuth()
  const isPro = profile?.plan !== 'free'
  const [modal, setModal] = useState<{ open: boolean; project?: Project }>({ open: false })

  const byStatus = COLUMNS.reduce((acc, col) => {
    acc[col.id] = projects.filter(p => p.status === col.id).sort((a, b) => a.order - b.order)
    return acc
  }, {} as Record<ProjectStatus, Project[]>)

  const thisMonthPaid = projects
    .filter(p => {
      if (p.status !== 'paid' || !p.updatedAt) return false
      const d = new Date(p.updatedAt); const n = new Date()
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
    })
    .reduce((s, p) => s + p.amount, 0)

  const onDragEnd = async ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const srcStatus = source.droppableId as ProjectStatus
    const dstStatus = destination.droppableId as ProjectStatus
    const srcItems = [...byStatus[srcStatus]]
    const dstItems = srcStatus === dstStatus ? srcItems : [...byStatus[dstStatus]]
    const [moved] = srcItems.splice(source.index, 1)

    const updates: { id: string; order: number; status?: ProjectStatus }[] = []

    if (srcStatus === dstStatus) {
      srcItems.splice(destination.index, 0, moved)
      srcItems.forEach((p, i) => updates.push({ id: p.id, order: i }))
    } else {
      dstItems.splice(destination.index, 0, moved)
      srcItems.forEach((p, i) => updates.push({ id: p.id, order: i }))
      dstItems.forEach((p, i) => updates.push({ id: p.id, order: i, status: p.id === draggableId ? dstStatus : undefined }))
    }
    await batchUpdateOrder(updates)
  }

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.03em' }}>ダッシュボード</h1>
          <p style={{ fontSize: 13, color: '#555', margin: 0 }}>今月の売上（入金済み）: <strong style={{ color: '#4ade80' }}>¥{thisMonthPaid.toLocaleString()}</strong></p>
        </div>
        <button
          onClick={() => {
            if (!isPro && projects.length >= FREE_PROJECT_LIMIT) {
              alert(`Freeプランは${FREE_PROJECT_LIMIT}件まで。Proにアップグレードしてください。`)
              return
            }
            setModal({ open: true })
          }}
          style={{ padding: '10px 20px', background: '#f97316', border: 'none', color: '#fff', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}
        >
          ＋ 新規案件
        </button>
      </div>

      {/* Kanban */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }} className="scrollbar-hide">
          {COLUMNS.map(col => (
            <KanbanColumn
              key={col.id}
              columnId={col.id}
              label={col.label}
              color={col.color}
              projects={byStatus[col.id]}
              onEdit={p => setModal({ open: true, project: p })}
            />
          ))}
        </div>
      </DragDropContext>

      {modal.open && (
        <ProjectForm
          existing={modal.project}
          totalCount={projects.length}
          onClose={() => setModal({ open: false })}
        />
      )}
    </>
  )
}
