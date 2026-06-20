export const dynamic = 'force-dynamic'
import { NextRequest } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getAdminDb } from '@/lib/firebaseAdmin'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  const db = getAdminDb()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const uid = session.metadata?.uid
      if (!uid) break
      const subId = session.subscription as string
      await db.collection('ph_users').doc(uid).update({
        plan: 'pro',
        stripeSubscriptionId: subId,
      })
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const uid = sub.metadata?.uid
      if (!uid) break
      const isActive = sub.status === 'active' || sub.status === 'trialing'
      await db.collection('ph_users').doc(uid).update({
        plan: isActive ? 'pro' : 'free',
      })
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const uid = sub.metadata?.uid
      if (!uid) break
      await db.collection('ph_users').doc(uid).update({
        plan: 'free',
        stripeSubscriptionId: null,
      })
      break
    }
  }

  return Response.json({ received: true })
}
