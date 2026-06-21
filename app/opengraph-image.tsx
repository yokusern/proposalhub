import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ProposalHub — AI提案文生成・案件管理SaaS'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px 80px',
        }}
      >
        <div style={{ fontSize: 14, letterSpacing: '0.2em', color: '#f97316', marginBottom: 28, textTransform: 'uppercase' }}>
          フリーランス特化SaaS
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, color: '#f0f0f0', lineHeight: 1.1, textAlign: 'center', marginBottom: 24 }}>
          <span style={{ color: '#f97316' }}>Proposal</span>Hub
        </div>
        <div style={{ fontSize: 28, color: '#aaa', textAlign: 'center', lineHeight: 1.5, maxWidth: 800 }}>
          ランサーズ・クラウドワークスの提案文を<br />
          <span style={{ color: '#f0f0f0', fontWeight: 700 }}>AIで30秒生成</span>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
          {['AI提案文生成', 'カンバン案件管理', '売上ダッシュボード'].map(f => (
            <div key={f} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '10px 20px', fontSize: 16, color: '#ccc' }}>
              {f}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 40, fontSize: 14, color: '#444' }}>
          proposalhub-opal.vercel.app
        </div>
      </div>
    ),
    size,
  )
}
