import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0f0f0f', color: '#f0f0f0' }}>

      {/* NAV */}
      <nav style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.04em' }}>
          <span style={{ color: '#f97316' }}>Proposal</span>Hub
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="#pricing" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>料金</a>
          <Link href="/auth" style={{ fontSize: 14, padding: '8px 20px', background: '#f97316', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
            無料で始める →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', padding: '5px 14px', borderRadius: 20, marginBottom: 28 }}>
          フリーランス特化 · AI × カンバン × 売上分析
        </div>
        <h1 style={{ fontSize: 'clamp(40px,8vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 28px' }}>
          提案から入金まで、<br />
          <span style={{ color: '#f97316' }}>これ1本。</span>
        </h1>
        <p style={{ fontSize: 18, color: '#aaa', lineHeight: 1.7, margin: '0 0 44px', maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
          コンコナラの提案文を毎回30分かけて書いていませんか？<br />
          案件管理はスプレッドシート、売上は目分量？
        </p>
        <Link href="/auth" style={{ display: 'inline-block', padding: '16px 36px', background: '#f97316', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em' }}>
          無料で始める（3案件まで無料）
        </Link>
        <p style={{ fontSize: 12, color: '#555', marginTop: 12 }}>クレジットカード不要 · Googleアカウントで30秒</p>
      </section>

      {/* PAIN → SOLUTION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            { pain: '提案文を毎回ゼロから書く', solution: 'AI が案件URLを読んで30秒で生成', icon: '✍️' },
            { pain: '案件の進捗をスプシで管理', solution: 'カンバンで5ステータスを一覧管理', icon: '📋' },
            { pain: '今月いくら稼いだか不明', solution: '売上グラフ・コンバージョン率を自動集計', icon: '📊' },
          ].map(item => (
            <div key={item.pain} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
              <p style={{ fontSize: 13, color: '#f97316', marginBottom: 8, fontWeight: 600 }}>Before</p>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 20, lineHeight: 1.5 }}>{item.pain}</p>
              <p style={{ fontSize: 13, color: '#4ade80', marginBottom: 8, fontWeight: 600 }}>After</p>
              <p style={{ fontSize: 14, color: '#ddd', lineHeight: 1.5 }}>{item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: '#111', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, textAlign: 'center', margin: '0 0 56px', letterSpacing: '-0.03em' }}>
            3つのモジュール
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              {
                num: '01', title: '提案文 AI 生成',
                desc: '案件内容を貼るだけで、ランサーズ・コンコナラ・クラウドワークス向けの採用されやすい提案文を Claude が生成。過去の採用実績からも学習。',
                badge: 'Claude API',
              },
              {
                num: '02', title: 'カンバン案件管理',
                desc: '提案中 → 受注 → 制作中 → 検収待ち → 入金済みの5ステータスをドラッグ&ドロップで管理。提案文 → そのまま案件登録も1クリック。',
                badge: '@dnd-kit',
              },
              {
                num: '03', title: '売上ダッシュボード',
                desc: '月次売上グラフ・プラットフォーム別内訳・提案→受注コンバージョン率・平均単価の推移を自動集計。今月の目標達成度もリアルタイム表示。',
                badge: 'Recharts',
              },
            ].map(f => (
              <div key={f.num} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: '#2a2a2a' }}>{f.num}</span>
                  <span style={{ fontSize: 11, background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{f.badge}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 12px' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.03em' }}>シンプルな料金</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            {
              plan: 'Free', price: '¥0', period: '', badge: '',
              features: ['案件3件まで', 'AI提案文 月5回', 'カンバン管理', '売上サマリー'],
              cta: '無料で始める', highlight: false,
            },
            {
              plan: 'Pro', price: '¥980', period: '/月', badge: 'おすすめ',
              features: ['案件無制限', 'AI提案文 無制限', '売上ダッシュボード', 'テンプレート無制限', 'CSVエクスポート'],
              cta: 'Proで始める', highlight: true,
            },
          ].map(p => (
            <div key={p.plan} style={{
              background: p.highlight ? 'rgba(249,115,22,0.06)' : '#1a1a1a',
              border: p.highlight ? '2px solid #f97316' : '1px solid #2a2a2a',
              borderRadius: 16, padding: 32, position: 'relative',
            }}>
              {p.badge && (
                <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, background: '#f97316', color: '#fff', padding: '3px 12px', borderRadius: 20, fontWeight: 700 }}>{p.badge}</span>
              )}
              <p style={{ fontSize: 15, fontWeight: 700, color: '#888', margin: '0 0 8px' }}>{p.plan}</p>
              <p style={{ fontSize: 40, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.04em' }}>
                {p.price}<span style={{ fontSize: 16, color: '#666' }}>{p.period}</span>
              </p>
              <p style={{ fontSize: 13, color: '#555', margin: '0 0 28px' }}>1件受注すれば余裕で元が取れる</p>
              <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: '#ddd', margin: '0 0 8px', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#4ade80' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth" style={{
                display: 'block', textAlign: 'center', padding: '12px',
                background: p.highlight ? '#f97316' : '#2a2a2a', color: '#fff',
                borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14,
              }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '24px 32px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#444', margin: 0 }}>
          © 2026 YO-KO — Built with Claude Code
        </p>
      </footer>
    </main>
  )
}
