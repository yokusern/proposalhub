import {
  doc, addDoc, updateDoc, deleteDoc,
  collection, serverTimestamp, Timestamp, DocumentData, increment,
} from 'firebase/firestore'
import { db } from './firebase'
import { Template } from '@/types'

export function toTemplate(id: string, d: DocumentData): Template {
  return {
    id,
    userId: d.userId ?? '',
    name: d.name ?? '',
    content: d.content ?? '',
    category: d.category ?? '',
    usageCount: d.usageCount ?? 0,
    createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate().toISOString() : '',
  }
}

export async function addTemplate(uid: string, data: { name: string; content: string; category: string }) {
  return addDoc(collection(db, 'ph_templates'), {
    userId: uid, ...data, usageCount: 0, createdAt: serverTimestamp(),
  })
}

export async function updateTemplate(templateId: string, data: { name: string; content: string; category: string }) {
  return updateDoc(doc(db, 'ph_templates', templateId), data)
}

export async function deleteTemplate(templateId: string) {
  return deleteDoc(doc(db, 'ph_templates', templateId))
}

export async function incrementUsage(templateId: string) {
  return updateDoc(doc(db, 'ph_templates', templateId), { usageCount: increment(1) })
}
