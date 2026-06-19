'use client'
import { Draggable } from '@hello-pangea/dnd'
import { Project, PLATFORM_LABELS } from '@/types'

interface Props {
  project: Project
  index: number
  onEdit: (p: Project) => void
}

export default function ProjectCard({ project, index, onEdit }: Props) {
  const deadline = project.deadline ? new Date(project.deadline) : null
  const isOverdue = deadline && deadline < new Date()
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null

  return (
    <Draggable draggableId={project.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(project)}
          style={{
            ...provided.draggableProps.style,
            background: snapshot.isDragging ? '#252525' : '#1e1e1e',
            border: '1px solid #2a2a2a',
            borderRadius: 10,
            padding: '14px 16px',
            marginBottom: 8,
            cursor: 'pointer',
            transition: snapshot.isDragging ? undefined : 'background 0.15s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#f97316', fontWeight: 600 }}>
              {PLATFORM_LABELS[project.platform]}
            </span>
            {project.amount > 0 && (
              <span style={{ fontSize: 12, color: '#aaa', fontWeight: 600 }}>
                ¥{project.amount.toLocaleString()}
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', color: '#f0f0f0', lineHeight: 1.3 }}>
            {project.title}
          </p>
          <p style={{ fontSize: 12, color: '#666', margin: 0 }}>{project.clientName}</p>
          {deadline && (
            <p style={{ fontSize: 11, marginTop: 8, color: isOverdue ? '#f87171' : daysLeft! <= 3 ? '#fbbf24' : '#555' }}>
              {isOverdue ? '⚠️ 期限超過' : `残${daysLeft}日`}
            </p>
          )}
          {project.proposalText && (
            <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, color: '#4ade80', background: 'rgba(74,222,128,0.08)', padding: '2px 7px', borderRadius: 4 }}>
              提案文あり
            </span>
          )}
        </div>
      )}
    </Draggable>
  )
}
