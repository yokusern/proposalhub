import {
  doc, addDoc, updateDoc, deleteDoc,
  collection, serverTimestamp, Timestamp, writeBatch, DocumentData,
} from 'firebase/firestore'
import { db } from './firebase'
import { ProjectInput, ProjectStatus, Project } from '@/types'

export function toProject(id: string, d: DocumentData): Project {
  return {
    id,
    userId: d.userId ?? '',
    clientName: d.clientName ?? '',
    title: d.title ?? '',
    description: d.description ?? '',
    platform: d.platform ?? 'other',
    status: d.status ?? 'proposing',
    amount: d.amount ?? 0,
    deadline: d.deadline instanceof Timestamp ? d.deadline.toDate().toISOString() : null,
    proposalText: d.proposalText ?? null,
    memo: d.memo ?? '',
    order: d.order ?? 0,
    isSample: d.isSample ?? false,
    createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate().toISOString() : '',
    updatedAt: d.updatedAt instanceof Timestamp ? d.updatedAt.toDate().toISOString() : '',
  }
}

export async function addProject(uid: string, data: ProjectInput, currentCount: number) {
  return addDoc(collection(db, 'ph_projects'), {
    userId: uid,
    clientName: data.clientName,
    title: data.title,
    description: data.description ?? '',
    platform: data.platform,
    status: 'proposing' as ProjectStatus,
    amount: data.amount,
    deadline: data.deadline ? Timestamp.fromDate(new Date(data.deadline)) : null,
    proposalText: data.proposalText ?? null,
    memo: data.memo ?? '',
    order: currentCount,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateProject(uid: string, projectId: string, data: Partial<ProjectInput & { status: ProjectStatus; order: number }>) {
  const update: Record<string, unknown> = { updatedAt: serverTimestamp() }
  const keys: (keyof typeof data)[] = ['clientName', 'title', 'description', 'platform', 'amount', 'memo', 'status', 'order']
  for (const k of keys) if (data[k] !== undefined) update[k] = data[k]
  if ('deadline' in data) update.deadline = data.deadline ? Timestamp.fromDate(new Date(data.deadline!)) : null
  if ('proposalText' in data) update.proposalText = data.proposalText ?? null
  return updateDoc(doc(db, 'ph_projects', projectId), update)
}

export async function deleteProject(projectId: string) {
  return deleteDoc(doc(db, 'ph_projects', projectId))
}

export async function batchUpdateOrder(items: { id: string; order: number; status?: ProjectStatus }[]) {
  const batch = writeBatch(db)
  for (const item of items) {
    const update: Record<string, unknown> = { order: item.order }
    if (item.status) update.status = item.status
    batch.update(doc(db, 'ph_projects', item.id), update)
  }
  await batch.commit()
}

export async function seedSampleProjects(uid: string) {
  const now = new Date()
  const d7  = new Date(now); d7.setDate(now.getDate() + 7)
  const d14 = new Date(now); d14.setDate(now.getDate() + 14)
  const batch = writeBatch(db)
  const base = { userId: uid, isSample: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }

  batch.set(doc(collection(db, 'ph_projects')), {
    ...base, clientName: 'サンプル株式会社', title: 'LP制作 React+Tailwind',
    description: 'コーポレートLP制作。レスポンシブ対応。', platform: 'lancers',
    status: 'working', amount: 80000, deadline: Timestamp.fromDate(d7),
    proposalText: null, memo: 'サンプルです。自由に編集・削除してください。', order: 0,
  })
  batch.set(doc(collection(db, 'ph_projects')), {
    ...base, clientName: 'テスト商店', title: 'GAS自動化スクリプト',
    description: 'スプレッドシートからメール自動送信。', platform: 'coconala',
    status: 'proposing', amount: 30000, deadline: Timestamp.fromDate(d14),
    proposalText: null, memo: 'サンプルです。自由に編集・削除してください。', order: 1,
  })
  await batch.commit()
}
