'use client'
import { Droppable } from '@hello-pangea/dnd'
import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface Props {
  columnId: string
  label: string
  color: string
  projects: Project[]
  onEdit: (p: Project) => void
}

export default function KanbanColumn({ columnId, label, color, projects, onEdit }: Props) {
  const totalAmount = projects.reduce((s, p) => s + p.amount, 0)

  return (
    <div style={{ minWidth: 230, maxWidth: 260, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color.replace('bg-', '').replace('-500', '') === 'blue' ? '#3b82f6' : color.includes('purple') ? '#a855f7' : color.includes('yellow') ? '#eab308' : color.includes('orange') ? '#f97316' : '#22c55e' }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        <span style={{ fontSize: 11, background: '#2a2a2a', color: '#666', padding: '1px 7px', borderRadius: 10 }}>{projects.length}</span>
        {totalAmount > 0 && (
          <span style={{ fontSize: 11, color: '#555', marginLeft: 'auto' }}>¥{totalAmount.toLocaleString()}</span>
        )}
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: 80,
              background: snapshot.isDraggingOver ? 'rgba(249,115,22,0.04)' : 'transparent',
              borderRadius: 10,
              border: snapshot.isDraggingOver ? '1px dashed rgba(249,115,22,0.3)' : '1px dashed transparent',
              padding: 4,
              transition: 'all 0.15s',
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onEdit={onEdit} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
