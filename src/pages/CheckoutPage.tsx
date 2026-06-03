import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { getPlanById, saasPlans, getConsultoriaPixTotal } from '../data/plans'
import { getConsultantById } from '../data/consultants'
import { useCart } from '../stores/useCartStore'
import { useCheckoutForm } from '../hooks/useCheckoutForm'
import { processPayment } from '../services/payment'
import { formatCurrency } from '../utils/formatters'
import { CheckoutHeader } from '../components/checkout/CheckoutHeader'
import { ContactForm } from '../components/checkout/ContactForm'
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { SecurityBadge } from '../components/checkout/SecurityBadge'

export function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { form, errors, isProcessing, setIsProcessing, updateField, setPaymentMethod, validate } = useCheckoutForm()
  const cart = useCart()

  // Processar URL params apenas na primeira carga
  useEffect(() => {
    window.scrollTo(0, 0)

    const consultorId = searchParams.get('consultor')
    const slot = searchParams.get('slot')
    const planoId = searchParams.get('plano')

    if (consultorId) {
      const c = getConsultantById(consultorId)
      if (c) {
        cart.addConsultant(c, slot || null)
        // Garantir que tem pelo menos o Pacote 1
        if (cart.plans.length === 0 && !cart.plans.some((p) => p.type === 'saas')) {
          cart.addPlan(saasPlans[0])
        }
      }
    } else if (planoId) {
      const plan = getPlanById(planoId)
      if (plan) cart.addPlan(plan)
    }

    // Se carrinho vazio e sem params, adicionar plano popular
    if (!consultorId && !planoId && cart.plans.length === 0 && cart.consultants.length === 0) {
      const popular = saasPlans.find((p) => p.popular) || saasPlans[0]
      cart.addPlan(popular)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saas = cart.plans.find((p) => p.type === 'saas')
  const consultoria = cart.plans.find((p) => p.type === 'consultoria')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria
  const hasConsultants = cart.consultants.length > 0

  const consultoriaIsMensal = hasSaas && form.paymentMethod === 'cartao'

  const buildButtonText = () => {
    const parts: string[] = []
    if (hasSaas) parts.push(`R$ ${formatCurrency(saas!.price)}/mês`)
    if (hasConsultants) {
      const sessaoTotal = cart.consultants.reduce((sum, c) => sum + c.hourlyRate, 0)
      parts.push(`Sessão R$ ${formatCurrency(sessaoTotal)}`)
    }
    if (hasConsultoria) {
      if (consultoriaIsMensal) {
        parts.push(`R$ ${formatCurrency(consultoria!.price)}/mês`)
      } else {
        parts.push(`Pix R$ ${formatCurrency(getConsultoriaPixTotal(consultoria!))}`)
      }
    }
    return `Finalizar pedido — ${parts.join(' + ')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isProcessing) return

    setIsProcessing(true)
    try {
      const result = await processPayment({
        nome: form.nome,
        whatsapp: form.whatsapp,
        email: form.email,
        method: hasSaas ? form.paymentMethod : 'pix',
        planIds: cart.plans.map((p) => p.id),
        totalCents: 0,
      })

      if (result.success) {
        navigate('/confirmacao', {
          state: {
            orderId: result.orderId,
            nome: form.nome,
            whatsapp: form.whatsapp,
            email: form.email,
            saasMethod: hasSaas ? form.paymentMethod : null,
            consultoriaPix: hasConsultoria && !consultoriaIsMensal,
            plans: cart.plans,
            saasMensal: saas ? saas.price : 0,
            consultoriaPixTotal: consultoria && !consultoriaIsMensal ? getConsultoriaPixTotal(consultoria) : 0,
            consultants: cart.consultants,
          },
        })
        cart.clearCart()
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <CheckoutHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-[#0E0E0F] mb-1">Finalizar pedido</h1>
                <p className="text-sm text-[#9C958A]">Preencha seus dados e escolha a forma de pagamento.</p>
              </div>

              <ContactForm
                nome={form.nome}
                whatsapp={form.whatsapp}
                email={form.email}
                errors={errors}
                onUpdate={updateField}
              />

              <PaymentMethodSelector
                selected={form.paymentMethod}
                onSelect={setPaymentMethod}
                hasSaas={hasSaas}
                hasConsultoria={hasConsultoria || hasConsultants}
              />

              <div className="lg:hidden">
                <OrderSummary paymentMethod={form.paymentMethod} />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-[#EA1D2C] hover:bg-[#C8101E] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processando...
                  </>
                ) : (
                  buildButtonText()
                )}
              </button>

              <SecurityBadge />
            </div>

            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-8">
                <OrderSummary paymentMethod={form.paymentMethod} />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
