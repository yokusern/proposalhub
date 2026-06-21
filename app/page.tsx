import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0f0f0f', color: '#f0f0f0' }}>

      {/* NAV */}
      <nav style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.04em' }}>
          <span style={{ color: '#f97316' }}>Proposal</span>Hub
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#pricing" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>料金</a>
          <a href="#faq" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>よくある質問</a>
          <Link href="/auth" style={{ fontSize: 14, padding: '8px 20px', background: '#f97316', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
            30秒で試す →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', padding: '5px 14px', borderRadius: 20, marginBottom: 28 }}>
          ランサーズ・クラウドワークス特化 · Claude AI搭載
        </div>
        <h1 style={{ fontSize: 'clamp(36px,8vw,68px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 28px' }}>
          提案文を<span style={{ color: '#f97316' }}>30分</span>から<br />
          <span style={{ color: '#f97316' }}>30秒</span>に縮める
        </h1>
        <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#aaa', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          案件内容を貼るだけで、採用されやすい提案文をAIが生成。<br />
          案件管理・売上分析まで、フリーランスの営業をこれ1本で完結。
        </p>
        <p style={{ fontSize: 14, color: '#666', margin: '0 0 40px' }}>
          ランサーズの平均受注単価¥15,000 → <strong style={{ color: '#ddd' }}>1件受注で月額16ヶ月分の元が取れる</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" style={{ display: 'inline-block', padding: '16px 36px', background: '#f97316', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 17 }}>
            AI提案文を無料で試す →
          </Link>
        </div>
        <p style={{ fontSize: 12, color: '#444', marginTop: 12 }}>Googleアカウントで30秒 · クレジットカード不要 · 3案件まで永久無料</p>
      </section>

      {/* SOCIAL PROOF BAR */}
      <div style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '20px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {[
            { num: '30秒', label: '平均生成時間' },
            { num: '¥0', label: '初期費用' },
            { num: '5機能', label: '提案→入金まで完結' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#f97316', letterSpacing: '-0.03em' }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DEMO: AI生成例 */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            実際にこんな提案文が生成されます
          </h2>
          <p style={{ fontSize: 14, color: '#666' }}>案件情報を貼り付けて「生成」を押すだけ。編集して即送信。</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'start' }}>
          {/* Input */}
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 11, color: '#666', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>案件情報（貼り付けるだけ）</div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.7, background: '#111', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: '0 0 8px', color: '#f97316', fontWeight: 600 }}>【LP制作】美容院サイトのリニューアル</p>
              <p style={{ margin: '0 0 6px' }}>予算：3〜5万円</p>
              <p style={{ margin: '0 0 6px' }}>納期：2週間</p>
              <p style={{ margin: 0 }}>要件：Next.js、レスポンシブ、予約フォーム付き</p>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 40 }}>
            <div style={{ width: 40, height: 40, background: '#f97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✨</div>
            <div style={{ fontSize: 11, color: '#555', textAlign: 'center' }}>30秒</div>
          </div>

          {/* Output */}
          <div style={{ background: '#1a1a1a', border: '1px solid #f97316', borderRadius: 16, padding: 24, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -10, left: 20, background: '#f97316', fontSize: 10, color: '#fff', padding: '2px 10px', borderRadius: 10, fontWeight: 700 }}>AI生成</div>
            <div style={{ fontSize: 11, color: '#f97316', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>生成された提案文</div>
            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 10px' }}>はじめまして。Next.js・Tailwind CSSを使ったLP制作が得意なエンジニアのYO-KOと申します。</p>
              <p style={{ margin: '0 0 10px' }}>美容院サイトのリニューアルとのこと、ご予算内・2週間以内での納品が可能です。</p>
              <p style={{ margin: '0 0 10px' }}>直近では飲食店・サロン向けの制作実績があり、予約フォームの実装も対応済みです。</p>
              <p style={{ margin: 0, color: '#888' }}>まずはお気軽にご相談ください。サンプルをお送りすることも可能です。</p>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: 20 }}>
          ※ 生成後は自由に編集できます。案件の雰囲気に合わせてトーンも自動調整。
        </p>
      </section>

      {/* PAIN → SOLUTION */}
      <section style={{ background: '#111', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 900, textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.03em' }}>
            フリーランスの「めんどくさい」を全部解決
          </h2>
          <style>{`
            @media (max-width: 768px) {
              .pain-grid { grid-template-columns: 1fr !important; }
              .feature-grid { grid-template-columns: 1fr !important; }
              .pricing-grid { grid-template-columns: 1fr !important; }
              .demo-grid { grid-template-columns: 1fr !important; }
              .demo-grid .arrow { display: none !important; }
            }
          `}</style>
          <div className="pain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { pain: '提案文を毎回1時間かけて書く', solution: 'AIが30秒で生成。あとは送るだけ', icon: '✍️' },
              { pain: '案件の進捗をスプシで管理', solution: 'カンバンで状況を一覧管理。提案→案件登録も1クリック', icon: '📋' },
              { pain: '今月いくら稼いだか不明', solution: '売上・コンバージョン率を自動集計。目標達成度もリアルタイム', icon: '📊' },
            ].map(item => (
              <div key={item.pain} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 8, fontWeight: 600 }}>Before</p>
                <p style={{ fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 1.5 }}>{item.pain}</p>
                <p style={{ fontSize: 13, color: '#4ade80', marginBottom: 8, fontWeight: 600 }}>After</p>
                <p style={{ fontSize: 14, color: '#ddd', lineHeight: 1.5 }}>{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px' }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 900, textAlign: 'center', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          提案から入金まで、1つのツールで完結
        </h2>
        <p style={{ fontSize: 14, color: '#555', textAlign: 'center', margin: '0 0 56px' }}>バラバラのツールを使い分ける時代は終わり</p>
        <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            {
              num: '01', title: 'AI 提案文生成',
              desc: '案件内容を貼るだけ。Claude AIが採用されやすい提案文を30秒で生成。スキル・実績から最適なトーンに自動調整。',
              badge: 'Claude AI',
            },
            {
              num: '02', title: 'カンバン案件管理',
              desc: '提案中→受注→制作中→検収待ち→入金済み の5ステータスをドラッグ&ドロップで管理。提案文から案件登録も1クリック。',
              badge: 'ドラッグ&ドロップ',
            },
            {
              num: '03', title: '売上ダッシュボード',
              desc: '月次売上・プラットフォーム別内訳・提案→受注コンバージョン率・平均単価の推移を自動集計。',
              badge: 'リアルタイム',
            },
          ].map(f => (
            <div key={f.num} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#1f1f1f' }}>{f.num}</span>
                <span style={{ fontSize: 11, background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)', padding: '3px 10px', borderRadius: 20, fontWeight: 600, alignSelf: 'flex-start' }}>{f.badge}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 12px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section style={{ background: '#111', padding: '80px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 900, textAlign: 'center', margin: '0 0 40px', letterSpacing: '-0.03em' }}>こんな人に使ってほしい</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 32 }}>
            {[
              '✦ ランサーズ・クラウドワークスで案件を取りたいエンジニア・デザイナー',
              '✦ 提案文を書くのに30分以上かけている',
              '✦ 案件が増えてきてスプレッドシート管理が限界',
              '✦ 今月の売上・コンバージョン率を正確に把握したい',
            ].map(t => (
              <div key={t} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '16px 20px', fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontSize: 13, color: '#555', fontWeight: 600, margin: '0 0 8px' }}>こんな方には向いていません</p>
            <p style={{ fontSize: 13, color: '#444', margin: 0, lineHeight: 1.7 }}>
              提案文の質にこだわりがなく「とにかく数を打ちたい」方 · 副業ではなくフルタイムで案件受注している企業の方
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px' }}>
        <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 900, textAlign: 'center', margin: '0 0 12px', letterSpacing: '-0.03em' }}>シンプルな料金</h2>
        <p style={{ fontSize: 14, color: '#666', textAlign: 'center', margin: '0 0 8px' }}>
          ランサーズの平均受注単価¥15,000 → <strong style={{ color: '#f97316' }}>1件受注すれば16ヶ月分の元が取れる</strong>
        </p>
        <p style={{ fontSize: 13, color: '#444', textAlign: 'center', margin: '0 0 48px' }}>いつでもキャンセル可能。解約手続きも1分で完了。</p>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            {
              plan: 'Free', price: '¥0', period: '', badge: '',
              features: ['案件3件まで', 'AI提案文 月5回', 'カンバン管理', '売上サマリー'],
              note: 'カード不要',
              cta: 'まず無料で試す', href: '/auth', highlight: false,
            },
            {
              plan: 'Pro', price: '¥980', period: '/月', badge: 'おすすめ',
              features: ['案件無制限', 'AI提案文 無制限', '売上ダッシュボード（詳細）', 'テンプレート保存 無制限', 'CSVエクスポート'],
              note: 'いつでもキャンセル可',
              cta: 'Proを始める', href: '/auth', highlight: true,
            },
          ].map(p => (
            <div key={p.plan} style={{
              background: p.highlight ? 'rgba(249,115,22,0.06)' : '#1a1a1a',
              border: p.highlight ? '2px solid #f97316' : '1px solid #2a2a2a',
              borderRadius: 16, padding: 32, position: 'relative',
            }}>
              {p.badge && (
                <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, background: '#f97316', color: '#fff', padding: '3px 12px', borderRadius: 20, fontWeight: 700, whiteSpace: 'nowrap' }}>{p.badge}</span>
              )}
              <p style={{ fontSize: 15, fontWeight: 700, color: '#888', margin: '0 0 8px' }}>{p.plan}</p>
              <p style={{ fontSize: 40, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.04em' }}>
                {p.price}<span style={{ fontSize: 16, color: '#666' }}>{p.period}</span>
              </p>
              <p style={{ fontSize: 12, color: '#555', margin: '0 0 28px' }}>{p.note}</p>
              <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: '#ddd', margin: '0 0 10px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: '#4ade80', flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={p.href} style={{
                display: 'block', textAlign: 'center', padding: '13px',
                background: p.highlight ? '#f97316' : '#2a2a2a', color: '#fff',
                borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14,
              }}>
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: '#111', padding: '80px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 900, textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.03em' }}>よくある質問</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                q: 'ランサーズ以外でも使えますか？',
                a: 'はい、クラウドワークス・Upwork・ココナラなどどのプラットフォームでも使えます。案件情報を貼り付けるだけなので、プラットフォームを選びません。',
              },
              {
                q: '生成された提案文は審査に引っかかりませんか？',
                a: 'AI生成そのものを禁止しているプラットフォームはほぼありません。生成後に自分の言葉を加えて送信するため、ペナルティのリスクはありません。',
              },
              {
                q: 'データは安全ですか？',
                a: 'はい。Googleアカウントで認証し、案件データはFirestoreに保存されます。第三者に共有されることはありません。',
              },
              {
                q: 'Proはいつでもキャンセルできますか？',
                a: 'はい、いつでも解約できます。解約後も当月末まで使用可能。更新日の前日までにキャンセルすれば翌月以降の請求は発生しません。',
              },
              {
                q: '無料プランに制限はありますか？',
                a: '案件は3件まで、AI提案文は月5回まで無料です。まず試してみてから、必要に応じてProにアップグレードできます。',
              },
            ].map(item => (
              <div key={item.q} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '20px 24px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#f0f0f0', margin: '0 0 10px' }}>Q. {item.q}</p>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, margin: 0 }}>A. {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>まずは無料から。カード不要。</p>
        <h2 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 20px', lineHeight: 1.1 }}>
          次の提案文は<br /><span style={{ color: '#f97316' }}>30秒で書く</span>
        </h2>
        <p style={{ fontSize: 14, color: '#555', margin: '0 0 36px' }}>Googleアカウントで30秒 · 3案件まで永久無料 · いつでも解約可能</p>
        <Link href="/auth" style={{ display: 'inline-block', padding: '18px 52px', background: '#f97316', color: '#fff', borderRadius: 14, textDecoration: 'none', fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>
          AI提案文を無料で試す →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>X (Twitter)</a>
          <a href="https://note.com/yoko_ai_logic" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>note</a>
          <a href="https://www.instagram.com/yoncornrow/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>Instagram</a>
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>Portfolio</a>
        </div>
        <p style={{ fontSize: 12, color: '#333', margin: 0 }}>© 2026 YO-KO — Built with Claude Code</p>
      </footer>
    </main>
  )
}
