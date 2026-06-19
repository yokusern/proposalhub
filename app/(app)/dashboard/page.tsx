'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { subscribeProjects } from '@/lib/firestore'
import { seedSampleProjects } from '@/lib/projects'
import { Project } from '@/types'
import KanbanBoard from '@/components/KanbanBoard'

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    if (!user) return
    return subscribeProjects(user.uid, ps => {
      setProjects(ps)
      if (!seeded && ps.length === 0 && profile) {
        setSeeded(true)
        seedSampleProjects(user.uid).catch(() => {})
      }
    })
  }, [user, profile, seeded])

  return <KanbanBoard projects={projects} />
}
