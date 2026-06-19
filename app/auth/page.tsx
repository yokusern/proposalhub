'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

export default function AuthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!loading && user) router.push('/dashboard')
  }, [user, loading, router])

  const login = async () => {
    setErr(''); setBusy(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? ''
      if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
        setErr(code === 'auth/unauthorized-domain'
          ? 'このドメインはFirebaseに未登録です。管理者にお問い合わせください。'
          : 'ログインに失敗しました。もう一度お試しください。')
      }
    } finally { setBusy(false) }
  }

  if (loading || user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f0f' }}>
      <div style={{ width: 24, height: 24, border: '2px solid #333', borderTop: '2px solid #f97316', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f0f0f' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 8px' }}>
            <span style={{ color: '#f97316' }}>Proposal</span>Hub
          </h1>
          <p style={{ fontSize: 14, color: '#666' }}>提案から入金まで、これ1本</p>
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 32 }}>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#aaa', marginBottom: 24 }}>
            Googleアカウントで無料スタート
          </p>
          <button
            onClick={login} disabled={busy}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#fff', color: '#111', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.7 : 1 }}
          >
            {busy ? '...' : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Googleでログイン
              </>
            )}
          </button>
          {err && <p style={{ fontSize: 12, color: '#f87171', textAlign: 'center', marginTop: 12 }}>{err}</p>}
          <p style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: 16 }}>
            3案件まで無料 · クレジットカード不要
          </p>
        </div>
      </div>
    </div>
  )
}
