import {
  doc, getDoc, setDoc, updateDoc, onSnapshot,
  collection, query, where, orderBy,
  serverTimestamp, Timestamp, DocumentData,
} from 'firebase/firestore'
import { db } from './firebase'
import { UserProfile, Project, Proposal, Template } from '@/types'
import { toProject } from './projects'
import { toProposal } from './proposals'
import { toTemplate } from './templates'

function toProfile(d: DocumentData): UserProfile {
  return {
    uid: d.uid ?? '',
    email: d.email ?? '',
    displayName: d.displayName ?? '',
    plan: d.plan ?? 'free',
    stripeCustomerId: d.stripeCustomerId ?? null,
    stripeSubscriptionId: d.stripeSubscriptionId ?? null,
    monthlyGoal: d.monthlyGoal ?? 100000,
    proposalCount: d.proposalCount ?? 0,
    proposalResetDate: d.proposalResetDate ?? '',
    skills: d.skills ?? '',
    experience: d.experience ?? '',
    createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate().toISOString() : '',
  }
}

export async function ensureProfile(uid: string, email: string, displayName: string) {
  const ref = doc(db, 'ph_users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    const now = new Date()
    await setDoc(ref, {
      uid, email, displayName, plan: 'free',
      stripeCustomerId: null, stripeSubscriptionId: null,
      monthlyGoal: 100000, proposalCount: 0,
      proposalResetDate: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      skills: '', experience: '',
      createdAt: serverTimestamp(),
    })
  }
}

export function subscribeProfile(
  uid: string,
  cb: (p: UserProfile | null) => void,
  onError?: () => void,
) {
  return onSnapshot(
    doc(db, 'ph_users', uid),
    snap => { cb(snap.exists() ? toProfile(snap.data()) : null) },
    () => { cb(null); onError?.() },
  )
}

export async function updateProfile(uid: string, data: Partial<UserProfile>) {
  return updateDoc(doc(db, 'ph_users', uid), { ...data, updatedAt: serverTimestamp() })
}

export function subscribeProjects(uid: string, cb: (p: Project[]) => void) {
  return onSnapshot(
    query(collection(db, 'ph_projects'), where('userId', '==', uid), orderBy('order', 'asc')),
    snap => cb(snap.docs.map(d => toProject(d.id, d.data()))),
    () => cb([]),
  )
}

export function subscribeProposals(uid: string, cb: (p: Proposal[]) => void) {
  return onSnapshot(
    query(collection(db, 'ph_proposals'), where('userId', '==', uid), orderBy('createdAt', 'desc')),
    snap => cb(snap.docs.map(d => toProposal(d.id, d.data()))),
    () => cb([]),
  )
}

export function subscribeTemplates(uid: string, cb: (t: Template[]) => void) {
  return onSnapshot(
    query(collection(db, 'ph_templates'), where('userId', '==', uid), orderBy('createdAt', 'desc')),
    snap => cb(snap.docs.map(d => toTemplate(d.id, d.data()))),
    () => cb([]),
  )
}
