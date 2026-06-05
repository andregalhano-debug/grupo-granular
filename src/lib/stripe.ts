import { loadStripe } from '@stripe/stripe-js'

// TODO: Substituir pela chave real de produção
// pk_test_ para testes, pk_live_ para produção
const STRIPE_PUBLISHABLE_KEY = 'pk_test_PLACEHOLDER_SUBSTITUIR_PELA_CHAVE_REAL'

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

// Preços em centavos (Stripe trabalha com centavos)
export const STRIPE_PRICES: Record<string, number> = {
  'saas-1': 8900,        // R$ 89,00
  'saas-2': 48900,       // R$ 489,00
  'saas-3': 389900,      // R$ 3.899,00
  'modulo-pessoas': 59900, // R$ 599,00
  'foozi-sistema': 35000,  // R$ 350,00
  'foozi-executivo': 150000, // R$ 1.500,00
  'consultoria-1': 389000,  // R$ 3.890,00
  'consultoria-3': 359000,  // R$ 3.590,00
  'consultoria-6': 299000,  // R$ 2.990,00
}

export function getPriceCents(planId: string): number {
  return STRIPE_PRICES[planId] || 0
}
