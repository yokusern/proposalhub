import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'

const APP_URL = 'https://proposalhub-opal.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'ProposalHub — ランサーズ・クラウドワークスの提案文をAIで自動生成',
    template: '%s | ProposalHub',
  },
  description: 'フリーランス向けAI提案文生成SaaS。ランサーズ・クラウドワークスの案件に30秒で提案文を作成。カンバン案件管理・売上ダッシュボードも一体化。月額¥980のProプランで無制限生成。',
  keywords: [
    'ランサーズ 提案文 AI',
    'クラウドワークス 提案文 自動生成',
    'フリーランス 提案文 テンプレート',
    '提案書 AI 生成',
    'フリーランス 案件管理',
    'ProposalHub',
    '提案文 自動生成',
    'フリーランス SaaS',
    '受注率アップ 提案文',
    '副業 提案文',
  ],
  authors: [{ name: 'YO-KO', url: 'https://yokoportofolio.vercel.app' }],
  creator: 'YO-KO',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: APP_URL,
    siteName: 'ProposalHub',
    title: 'ProposalHub — ランサーズ・クラウドワークスの提案文をAIで30秒生成',
    description: 'フリーランス向けAI提案文生成SaaS。案件内容を貼るだけで採用されやすい提案文を即生成。案件カンバン・売上分析も一体化。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProposalHub — AI提案文生成・案件管理SaaS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProposalHub — 提案文をAIで30秒生成',
    description: 'ランサーズ・クラウドワークス向け提案文AI生成＋案件管理SaaS。月額¥980で無制限。',
    images: ['/og-image.png'],
    creator: '@Yoko_ai_dev',
    site: '@Yoko_ai_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
