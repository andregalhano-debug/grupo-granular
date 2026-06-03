export interface PaymentRequest {
  nome: string
  whatsapp: string
  email: string
  method: 'pix' | 'cartao' | 'boleto'
  planIds: string[]
  totalCents: number
}

export interface PaymentResult {
  success: boolean
  orderId: string
  method: 'pix' | 'cartao' | 'boleto'
}

export async function processPayment(req: PaymentRequest): Promise<PaymentResult> {
  // Simulacao — substituir por MercadoPago/Stripe futuramente
  await new Promise((r) => setTimeout(r, 2000))
  return {
    success: true,
    orderId: `GR-${Date.now().toString(36).toUpperCase()}`,
    method: req.method,
  }
}
