export interface PaymentRequest {
  nome: string
  whatsapp: string
  email: string
  method: 'pix' | 'cartao'
  planIds: string[]
  totalCents: number
  stripePaymentMethodId?: string
}

export interface PaymentResult {
  success: boolean
  orderId: string
  method: 'pix' | 'cartao'
  pixQrCode?: string
}

export async function processPayment(req: PaymentRequest): Promise<PaymentResult> {
  // TODO: Substituir pela chamada real ao backend
  // Se cartão: enviar stripePaymentMethodId para Edge Function que cria PaymentIntent
  // Se pix: criar PaymentIntent com method 'pix' e retornar QR Code
  //
  // Exemplo de implementação backend (Vercel Edge Function):
  //
  // POST /api/create-payment-intent
  // Body: { amount: totalCents, paymentMethodId, email, planIds }
  //
  // Backend faz:
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: totalCents,
  //     currency: 'brl',
  //     payment_method: paymentMethodId,
  //     confirm: true,
  //     receipt_email: email,
  //     metadata: { planIds: planIds.join(',') }
  //   })

  await new Promise((r) => setTimeout(r, 2000))

  return {
    success: true,
    orderId: `GR-${Date.now().toString(36).toUpperCase()}`,
    method: req.method,
  }
}
