import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2, QrCode } from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import { getPlanById, saasPlans, getConsultoriaPixTotal } from '../data/plans'
import { getConsultantById } from '../data/consultants'
import { useCart } from '../stores/useCartStore'
import { useCheckoutForm } from '../hooks/useCheckoutForm'
import { processPayment } from '../services/payment'
import { stripePromise } from '../lib/stripe'
import { CheckoutHeader } from '../components/checkout/CheckoutHeader'
import { ContactForm } from '../components/checkout/ContactForm'
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { SecurityBadge } from '../components/checkout/SecurityBadge'
import { StripeCardForm } from '../components/checkout/StripeCardForm'

export function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { form, errors, isProcessing, setIsProcessing, updateField, setPaymentMethod, setAvulsoMethod, validate } = useCheckoutForm()
  const cart = useCart()

  // Processar URL params apenas na primeira carga
  useEffect(() => {
    window.scrollTo(0, 0)

    const consultorId = searchParams.get('consultor')
    const slot = searchParams.get('slot')
    const planoId = searchParams.get('plano')
    const addon = searchParams.get('addon')

    if (consultorId) {
      const c = getConsultantById(consultorId)
      if (c) {
        cart.addConsultant(c, slot || null)
        if (cart.plans.length === 0 && !cart.plans.some((p) => p.type === 'saas')) {
          cart.addPlan(saasPlans[0])
        }
      }
    } else if (planoId) {
      const plan = getPlanById(planoId)
      if (plan) cart.addPlan(plan)
    }

    if (addon === 'foozi') {
      cart.addAddon({
        id: 'foozi',
        name: 'Foozi — Atendimento Digital & BPO',
        description: 'Plataforma de atendimento via WhatsApp, chatbot e central terceirizada',
      })
    }

    if (!consultorId && !planoId && cart.plans.length === 0 && cart.consultants.length === 0) {
      const popular = saasPlans.find((p) => p.popular) || saasPlans[0]
      cart.addPlan(popular)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saas = cart.plans.find((p) => p.type === 'saas')
  const consultoria = cart.plans.find((p) => p.type === 'consultoria')
  const modulos = cart.plans.filter((p) => p.type === 'modulo')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria
  const hasConsultants = cart.consultants.length > 0

  const consultoriaIsMensal = form.paymentMethod === 'cartao'
  const allConsultantsHaveSlots = cart.consultants.every((c) => !!c.slot)
  const canSubmit = !hasConsultants || allConsultantsHaveSlots
  const isCartao = form.paymentMethod === 'cartao'
  const hasAvulso = hasConsultants || (hasConsultoria && !consultoriaIsMensal)

  // Calcular total em centavos para o Stripe
  const saasIsIncluded = hasConsultoria && saas?.id === 'saas-1'
  const saasPrice = saasIsIncluded ? 0 : (saas ? saas.price : 0)
  const modulosPrice = modulos.reduce((sum, m) => sum + m.price, 0)
  const consultoriaPrice = hasConsultoria ? (consultoriaIsMensal ? consultoria!.price : getConsultoriaPixTotal(consultoria!)) : 0
  const sessaoPrice = cart.consultants.reduce((sum, c) => sum + c.hourlyRate, 0)
  const totalReais = saasPrice + modulosPrice + consultoriaPrice + sessaoPrice
  const totalCents = totalReais * 100

  const buttonText = canSubmit ? 'Finalizar o pedido' : 'Selecione os horários dos mentores'

  const navigateToConfirmation = (orderId: string) => {
    navigate('/confirmacao', {
      state: {
        orderId,
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

  // Handler para pagamento com cartão via Stripe
  const handleStripePayment = async (paymentMethodId: string) => {
    if (!validate() || !canSubmit) {
      setIsProcessing(false)
      return
    }

    try {
      // TODO: Enviar paymentMethodId para o backend (Edge Function)
      // que criará o PaymentIntent e confirmará o pagamento
      const result = await processPayment({
        nome: form.nome,
        whatsapp: form.whatsapp,
        email: form.email,
        method: 'cartao',
        planIds: cart.plans.map((p) => p.id),
        totalCents,
        stripePaymentMethodId: paymentMethodId,
      })

      if (result.success) {
        navigateToConfirmation(result.orderId)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // Handler para pagamento via Pix
  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isProcessing || !canSubmit) return

    setIsProcessing(true)
    try {
      const result = await processPayment({
        nome: form.nome,
        whatsapp: form.whatsapp,
        email: form.email,
        method: 'pix',
        planIds: cart.plans.map((p) => p.id),
        totalCents,
      })

      if (result.success) {
        navigateToConfirmation(result.orderId)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <CheckoutHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
              hasAvulso={hasAvulso && isCartao}
              avulsoMethod={form.avulsoMethod}
              onAvulsoMethodChange={setAvulsoMethod}
            />

            <div className="lg:hidden">
              <OrderSummary paymentMethod={form.paymentMethod} />
            </div>

            {/* Formulário de pagamento por método */}
            {isCartao ? (
              <Elements stripe={stripePromise} options={{ locale: 'pt-BR' }}>
                <StripeCardForm
                  onPaymentSuccess={handleStripePayment}
                  onError={(err) => console.error(err)}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                  totalCents={totalCents}
                  customerEmail={form.email}
                  customerName={form.nome}
                  buttonText={buttonText}
                />
              </Elements>
            ) : (
              <form onSubmit={handlePixSubmit}>
                <div className="rounded-xl bg-[#F7F7F7] border border-[#0E0E0F]/10 p-5 mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <QrCode size={20} className="text-[#A31631]" />
                    <span className="text-sm font-medium text-[#0E0E0F]">Pagamento via Pix</span>
                  </div>
                  <p className="text-xs text-[#9C958A] leading-relaxed">
                    O QR Code Pix será gerado após a confirmação do pedido. Você terá 30 minutos para realizar o pagamento.
                    {hasConsultoria && (
                      <span className="block mt-1 text-green-600 font-medium">Consultoria via Pix com 3% de desconto aplicado.</span>
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !canSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processando...
                    </>
                  ) : (
                    buttonText
                  )}
                </button>
              </form>
            )}

            <SecurityBadge />
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8">
              <OrderSummary paymentMethod={form.paymentMethod} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
