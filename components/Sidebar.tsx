'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

const NAV = [
  { href: '/dashboard',  label: 'ダッシュボード', icon: '⬜' },
  { href: '/propose',    label: '提案文生成',     icon: '✍️' },
  { href: '/analytics',  label: '売上分析',       icon: '📊' },
  { href: '/templates',  label: 'テンプレート',   icon: '📄' },
  { href: '/settings',   label: '設定',           icon: '⚙️' },
]

export default function Sidebar() {
  const path = usePathname()
  const { profile } = useAuth()

  return (
    <aside style={{ width: 220, background: '#111', borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 28px', borderBottom: '1px solid #1e1e1e' }}>
        <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.04em' }}>
          <span style={{ color: '#f97316' }}>Proposal</span>Hub
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {NAV.map(item => {
          const active = path.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginBottom: 4,
              background: active ? 'rgba(249,115,22,0.1)' : 'transparent',
              color: active ? '#f97316' : '#888',
              textDecoration: 'none', fontSize: 13, fontWeight: active ? 700 : 400,
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Plan badge + logout */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1e1e1e' }}>
        {profile && (
          <div style={{ marginBottom: 12 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
              background: profile.plan === 'free' ? '#2a2a2a' : 'rgba(249,115,22,0.15)',
              color: profile.plan === 'free' ? '#555' : '#f97316',
            }}>
              {profile.plan === 'free' ? 'Free' : profile.plan === 'pro' ? 'Pro' : 'Business'}
            </span>
            {profile.plan === 'free' && (
              <Link href="/settings" style={{ display: 'block', fontSize: 11, color: '#f97316', textDecoration: 'none', marginTop: 6 }}>
                Proにアップグレード →
              </Link>
            )}
          </div>
        )}
        <button
          onClick={() => signOut(auth)}
          style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          ログアウト
        </button>
      </div>
    </aside>
  )
}
