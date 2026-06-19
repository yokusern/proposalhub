import {
  doc, addDoc, updateDoc, deleteDoc,
  collection, serverTimestamp, Timestamp, DocumentData,
} from 'firebase/firestore'
import { db } from './firebase'
import { Proposal, Tone } from '@/types'

export function toProposal(id: string, d: DocumentData): Proposal {
  return {
    id,
    userId: d.userId ?? '',
    projectId: d.projectId ?? null,
    jobDescription: d.jobDescription ?? '',
    tone: d.tone ?? 'polite',
    generatedText: d.generatedText ?? '',
    isAdopted: d.isAdopted ?? false,
    createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate().toISOString() : '',
  }
}

export async function saveProposal(uid: string, data: {
  projectId: string | null
  jobDescription: string
  tone: Tone
  generatedText: string
}) {
  return addDoc(collection(db, 'ph_proposals'), {
    userId: uid,
    ...data,
    isAdopted: false,
    createdAt: serverTimestamp(),
  })
}

export async function markAdopted(proposalId: string, isAdopted: boolean) {
  return updateDoc(doc(db, 'ph_proposals', proposalId), { isAdopted })
}

export async function deleteProposal(proposalId: string) {
  return deleteDoc(doc(db, 'ph_proposals', proposalId))
}
