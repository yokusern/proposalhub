'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { subscribeProjects, subscribeProposals } from '@/lib/firestore'
import { Project, Proposal, PLATFORM_LABELS } from '@/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function AnalyticsPage() {
  const { user, profile } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [proposals, setProposals] = useState<Proposal[]>([])

  useEffect(() => {
    if (!user) return
    const u1 = subscribeProjects(user.uid, setProjects)
    const u2 = subscribeProposals(user.uid, setProposals)
    return () => { u1(); u2() }
  }, [user])

  const thisMonth = new Date()
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - (5 - i), 1)
    return {
      label: `${d.getMonth() + 1}月`,
      month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
    }
  })

  const revenueByMonth = last6Months.map(({ label, month }) => {
    const revenue = projects
      .filter(p => {
        if (p.status !== 'paid' || !p.updatedAt) return false
        return p.updatedAt.startsWith(month)
      })
      .reduce((s, p) => s + p.amount, 0)
    return { label, revenue }
  })

  const byPlatform = Object.entries(PLATFORM_LABELS).map(([key, label]) => {
    const pjs = projects.filter(p => p.platform === key)
    return {
      label,
      total: pjs.reduce((s, p) => s + p.amount, 0),
      count: pjs.length,
    }
  }).filter(p => p.count > 0)

  const totalRevenue = projects.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const conversionRate = proposals.length > 0
    ? Math.round((proposals.filter(p => p.isAdopted).length / proposals.length) * 100)
    : 0
  const avgAmount = projects.filter(p => p.amount > 0).length > 0
    ? Math.round(totalRevenue / Math.max(projects.filter(p => p.status === 'paid').length, 1))
    : 0
  const goal = profile?.monthlyGoal ?? 100000
  const thisMonthRevenue = revenueByMonth[5]?.revenue ?? 0
  const goalPct = Math.min(Math.round((thisMonthRevenue / goal) * 100), 100)

  const StatCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
    <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 20 }}>
      <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.03em', color: '#f0f0f0' }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: '#555', margin: 0 }}>{sub}</p>}
    </div>
  )

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 28px', letterSpacing: '-0.03em' }}>売上分析</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
        <StatCard label="累計売上" value={`¥${totalRevenue.toLocaleString()}`} />
        <StatCard label="提案→受注率" value={`${conversionRate}%`} sub={`${proposals.length}件提案`} />
        <StatCard label="平均単価" value={`¥${avgAmount.toLocaleString()}`} />
        <StatCard label="今月の達成率" value={`${goalPct}%`} sub={`目標 ¥${goal.toLocaleString()}`} />
      </div>

      {/* Goal progress bar */}
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#aaa' }}>今月の目標達成度</span>
          <span style={{ fontSize: 13, color: '#f97316', fontWeight: 700 }}>¥{thisMonthRevenue.toLocaleString()} / ¥{goal.toLocaleString()}</span>
        </div>
        <div style={{ background: '#2a2a2a', borderRadius: 8, height: 8 }}>
          <div style={{ background: goalPct >= 100 ? '#4ade80' : '#f97316', width: `${goalPct}%`, height: '100%', borderRadius: 8, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* Revenue chart */}
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', color: '#aaa' }}>月次売上推移</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueByMonth}>
            <XAxis dataKey="label" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `¥${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, color: '#f0f0f0' }}
              formatter={(v) => [`¥${Number(v).toLocaleString()}`, '売上']}
            />
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
              {revenueByMonth.map((_, i) => (
                <Cell key={i} fill={i === 5 ? '#f97316' : '#2a2a2a'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Platform breakdown */}
      {byPlatform.length > 0 && (
        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 20px', color: '#aaa' }}>プラットフォーム別売上</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={byPlatform} layout="vertical">
              <XAxis type="number" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `¥${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="label" tick={{ fill: '#aaa', fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, color: '#f0f0f0' }}
                formatter={(v) => [`¥${Number(v).toLocaleString()}`, '売上']}
              />
              <Bar dataKey="total" fill="#f97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
