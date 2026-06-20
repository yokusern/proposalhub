export const dynamic = 'force-dynamic'
import { NextRequest } from 'next/server'
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin'
import { stripe, PRO_PRICE_ID, APP_URL } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const token = (req.headers.get('authorization') || '').replace('Bearer ', '')
  if (!token) return Response.json({ error: '認証が必要です' }, { status: 401 })

  let uid: string, email: string
  try {
    const decoded = await getAdminAuth().verifyIdToken(token)
    uid = decoded.uid
    email = decoded.email ?? ''
  } catch {
    return Response.json({ error: '認証エラー' }, { status: 401 })
  }

  const userDoc = await getAdminDb().collection('ph_users').doc(uid).get()
  const userData = userDoc.data()

  // 既存のStripe顧客IDがあれば再利用
  let customerId: string = userData?.stripeCustomerId ?? ''
  if (!customerId) {
    const customer = await stripe.customers.create({ email, metadata: { uid } })
    customerId = customer.id
    await getAdminDb().collection('ph_users').doc(uid).update({ stripeCustomerId: customerId })
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
    success_url: `${APP_URL}/settings?upgraded=1`,
    cancel_url: `${APP_URL}/settings`,
    metadata: { uid },
    subscription_data: { metadata: { uid } },
    locale: 'ja',
  })

  return Response.json({ url: session.url })
}
