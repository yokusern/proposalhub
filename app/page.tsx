import Link from 'next/link'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'ProposalHub — ランサーズ・クラウドワークスの提案文をAIで30秒生成',
  alternates: { canonical: 'https://proposalhub-opal.vercel.app' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ProposalHub',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://proposalhub-opal.vercel.app',
  description: 'ランサーズ・クラウドワークス向けAI提案文生成・案件管理・売上分析の一体型フリーランスSaaS',
  author: {
    '@type': 'Person',
    name: 'YO-KO',
    url: 'https://yokoportofolio.vercel.app',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Freeプラン',
      price: '0',
      priceCurrency: 'JPY',
      description: '案件3件まで・AI提案文月5回無料',
    },
    {
      '@type': 'Offer',
      name: 'Proプラン',
      price: '980',
      priceCurrency: 'JPY',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        billingDuration: 'P1M',
      },
      description: '案件無制限・AI提案文無制限・売上ダッシュボード・CSVエクスポート',
    },
  ],
  featureList: [
    'ランサーズ向けAI提案文自動生成',
    'クラウドワークス向けAI提案文自動生成',
    '案件カンバン管理（5ステータス）',
    '売上ダッシュボード・コンバージョン率分析',
    'テンプレート管理',
    'CSVエクスポート',
  ],
}

export default function LandingPage() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            フリーランス特化 · AI提案文生成 × カンバン管理 × 売上分析
          </div>
          <h1 style={{ fontSize: 'clamp(36px,8vw,72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 28px' }}>
            ランサーズ・クラウドワークスの<br />
            提案文を<span style={{ color: '#f97316' }}>30秒で生成。</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#aaa', lineHeight: 1.7, margin: '0 0 44px', maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
            ランサーズの提案文を毎回30分かけて書いていませんか？<br />
            案件管理はスプレッドシート、売上は目分量？<br />
            <strong style={{ color: '#ddd' }}>AIが提案文を生成し、カンバンで案件を管理、売上を自動集計します。</strong>
          </p>
          <Link href="/auth" style={{ display: 'inline-block', padding: '16px 36px', background: '#f97316', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em' }}>
            無料で始める（3案件まで無料）
          </Link>
          <p style={{ fontSize: 12, color: '#555', marginTop: 12 }}>クレジットカード不要 · Googleアカウントで30秒</p>
        </section>

        {/* PAIN → SOLUTION */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px' }}>
          <div className="pain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            <style>{`
              @media (max-width: 768px) {
                .pain-grid { grid-template-columns: 1fr !important; }
                .feature-grid { grid-template-columns: 1fr !important; }
                .pricing-grid { grid-template-columns: 1fr !important; }
                .faq-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {[
              { pain: '提案文を毎回ゼロから書く', solution: 'AIが案件内容を読んで30秒で生成', icon: '✍️' },
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
            <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 900, textAlign: 'center', margin: '0 0 56px', letterSpacing: '-0.03em' }}>
              3つの機能で、フリーランスの提案〜入金を完結
            </h2>
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {[
                {
                  num: '01', title: 'AI提案文生成（ランサーズ・CW対応）',
                  desc: '案件内容を貼るだけで、ランサーズ・クラウドワークス向けの採用されやすい提案文をAIが30秒で生成。スキルや経歴から最適なトーンに自動調整。毎回ゼロから書く時間をゼロにします。',
                  badge: 'Gemini API',
                },
                {
                  num: '02', title: 'カンバン案件管理',
                  desc: '提案中 → 受注 → 制作中 → 検収待ち → 入金済みの5ステータスをドラッグ&ドロップで管理。提案文をそのまま案件登録も1クリック。スプレッドシート不要。',
                  badge: 'DnD',
                },
                {
                  num: '03', title: '売上ダッシュボード',
                  desc: '月次売上グラフ・プラットフォーム別内訳・提案→受注コンバージョン率・平均単価の推移を自動集計。今月の目標達成度もリアルタイム表示。売上の把握が一瞬でできます。',
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

        {/* WHO IS THIS FOR */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 900, textAlign: 'center', margin: '0 0 40px', letterSpacing: '-0.03em' }}>こんな人に使ってほしい</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {[
              'ランサーズ・クラウドワークスで副業中のエンジニア・デザイナー',
              '提案文を書くのに毎回30分以上かけている',
              '案件が増えてきてスプレッドシート管理が限界になってきた',
              '今月の売上・コンバージョン率を正確に把握したい',
            ].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '16px 20px' }}>
                <span style={{ color: '#f97316', fontSize: 16, marginTop: 1, flexShrink: 0 }}>✦</span>
                <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" style={{ background: '#111', padding: '80px 32px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 900, textAlign: 'center', margin: '0 0 12px', letterSpacing: '-0.03em' }}>シンプルな料金</h2>
            <p style={{ fontSize: 14, color: '#666', textAlign: 'center', margin: '0 0 48px' }}>1件受注すれば月額の元が取れる設計</p>
            <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                {
                  plan: 'Free', price: '¥0', period: '', badge: '',
                  features: ['案件3件まで', 'AI提案文 月5回', 'カンバン管理', '売上サマリー'],
                  cta: '無料で始める', href: '/auth', highlight: false,
                },
                {
                  plan: 'Pro', price: '¥980', period: '/月', badge: 'おすすめ',
                  features: ['案件無制限', 'AI提案文 無制限', '売上ダッシュボード', 'テンプレート無制限', 'CSVエクスポート'],
                  cta: 'Proで始める', href: '/auth', highlight: true,
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
                  <p style={{ fontSize: 13, color: '#555', margin: '0 0 28px' }}>
                    {p.highlight ? 'いつでもキャンセル可能' : 'カード不要'}
                  </p>
                  <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0 }}>
                    {p.features.map(f => (
                      <li key={f} style={{ fontSize: 14, color: '#ddd', margin: '0 0 8px', display: 'flex', gap: 8 }}>
                        <span style={{ color: '#4ade80' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={p.href} style={{
                    display: 'block', textAlign: 'center', padding: '12px',
                    background: p.highlight ? '#f97316' : '#2a2a2a', color: '#fff',
                    borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14,
                  }}>
                    {p.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — SEO & 信頼構築 */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '80px 32px' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 900, textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.03em' }}>よくある質問</h2>
          <div className="faq-grid" style={{ display: 'grid', gap: 16 }}>
            {[
              {
                q: 'ランサーズとクラウドワークス、どちらの提案文も生成できますか？',
                a: 'はい。ランサーズ・クラウドワークスはもちろん、直案件向けの文体にも対応しています。プラットフォームを選択するだけで、それぞれのルールに合った文章が生成されます。',
              },
              {
                q: '生成された提案文はそのままコピペして使えますか？',
                a: 'はい、そのままコピペして使える品質を目指しています。ただし、あなた自身の言葉で少し手を加えることでより受注率が上がります。AIが下書きを作り、あなたが仕上げるイメージです。',
              },
              {
                q: 'Freeプランから始めてProにアップグレードできますか？',
                a: 'はい。Freeプランはカード不要で今すぐ始められます。上限（月5回生成・案件3件）に達したタイミングでProプラン（¥980/月）にアップグレードできます。いつでもキャンセル可能です。',
              },
              {
                q: 'スマホからも使えますか？',
                a: 'はい。ProposalHubはモバイル対応しています。外出先でもランサーズの案件を見ながら、その場で提案文を生成して送ることができます。',
              },
            ].map(({ q, a }) => (
              <details key={q} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '20px 24px' }}>
                <summary style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f0', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q}
                  <span style={{ color: '#f97316', fontSize: 18, flexShrink: 0, marginLeft: 16 }}>＋</span>
                </summary>
                <p style={{ fontSize: 14, color: '#999', lineHeight: 1.7, margin: '16px 0 0' }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 20px' }}>
            今すぐ提案を<span style={{ color: '#f97316' }}>10倍速く</span>書く
          </h2>
          <p style={{ fontSize: 15, color: '#666', margin: '0 0 36px' }}>Googleアカウントで30秒 · カード不要 · 3案件まで永久無料</p>
          <Link href="/auth" style={{ display: 'inline-block', padding: '18px 48px', background: '#f97316', color: '#fff', borderRadius: 14, textDecoration: 'none', fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>
            無料で始める →
          </Link>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid #1a1a1a', padding: '32px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
            <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>X (Twitter)</a>
            <a href="https://note.com/yoko_ai_logic" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>note</a>
            <a href="https://www.instagram.com/yoncornrow/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>Instagram</a>
            <a href="https://buildflow-ai-six.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>BuildFlow AI</a>
            <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>Portfolio</a>
          </div>
          <p style={{ fontSize: 12, color: '#333', margin: 0 }}>© 2026 YO-KO — Built with Claude Code</p>
        </footer>
      </main>
    </>
  )
}
