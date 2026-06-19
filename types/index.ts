export type ProjectStatus = 'proposing' | 'accepted' | 'working' | 'delivered' | 'paid'
export type Platform = 'coconala' | 'lancers' | 'crowdworks' | 'direct' | 'other'
export type Tone = 'polite' | 'casual' | 'professional'
export type Plan = 'free' | 'pro' | 'business'

export interface Project {
  id: string
  userId: string
  clientName: string
  title: string
  description: string
  platform: Platform
  status: ProjectStatus
  amount: number
  deadline: string | null
  proposalText: string | null
  memo: string
  order: number
  isSample?: boolean
  createdAt: string
  updatedAt: string
}

export interface ProjectInput {
  clientName: string
  title: string
  description?: string
  platform: Platform
  amount: number
  deadline?: string | null
  proposalText?: string | null
  memo?: string
}

export interface Proposal {
  id: string
  userId: string
  projectId: string | null
  jobDescription: string
  tone: Tone
  generatedText: string
  isAdopted: boolean
  createdAt: string
}

export interface Template {
  id: string
  userId: string
  name: string
  content: string
  category: string
  usageCount: number
  createdAt: string
}

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  plan: Plan
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  monthlyGoal: number
  proposalCount: number
  proposalResetDate: string
  skills: string
  experience: string
  createdAt: string
}

export const COLUMNS: { id: ProjectStatus; label: string; color: string }[] = [
  { id: 'proposing',  label: '提案中',  color: 'bg-blue-500' },
  { id: 'accepted',   label: '受注',    color: 'bg-purple-500' },
  { id: 'working',    label: '制作中',  color: 'bg-yellow-500' },
  { id: 'delivered',  label: '検収待ち', color: 'bg-orange-500' },
  { id: 'paid',       label: '入金済み', color: 'bg-green-500' },
]

export const PLATFORM_LABELS: Record<Platform, string> = {
  coconala: 'ココナラ',
  lancers: 'ランサーズ',
  crowdworks: 'クラウドワークス',
  direct: '直案件',
  other: 'その他',
}

export const FREE_PROJECT_LIMIT = 3
export const FREE_PROPOSAL_LIMIT = 5
