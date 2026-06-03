import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { getPlanById, allPlans, getConsultoriaPixTotal } from '../data/plans'
import type { Plan } from '../data/plans'
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

  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const planoId = searchParams.get('plano')
    if (planoId) {
      const plan = getPlanById(planoId)
      if (plan) {
        setSelectedPlans([plan])
        return
      }
    }
    const popular = allPlans.find((p) => p.type === 'saas' && p.popular)
    if (popular) setSelectedPlans([popular])
  }, [searchParams])

  const handleAddPlan = (plan: Plan) => {
    setSelectedPlans((prev) => {
      if (prev.some((p) => p.id === plan.id)) return prev
      const filtered = prev.filter((p) => p.type !== plan.type)
      const updated = [...filtered, plan]
      return updated.sort((a, b) => (a.type === 'saas' ? -1 : 1) - (b.type === 'saas' ? -1 : 1))
    })
  }

  const handleRemovePlan = (planId: string) => {
    setSelectedPlans((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((p) => p.id !== planId)
    })
  }

  const saas = selectedPlans.find((p) => p.type === 'saas')
  const consultoria = selectedPlans.find((p) => p.type === 'consultoria')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria

  // Texto do botão
  const buildButtonText = () => {
    const parts: string[] = []
    if (hasSaas) parts.push(`Sistema R$ ${formatCurrency(saas!.price)}/mês`)
    if (hasConsultoria) parts.push(`Consultoria R$ ${formatCurrency(getConsultoriaPixTotal(consultoria!))} (Pix)`)
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
        planIds: selectedPlans.map((p) => p.id),
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
            consultoriaPix: hasConsultoria,
            plans: selectedPlans,
            saasMensal: saas ? saas.price : 0,
            consultoriaPixTotal: consultoria ? getConsultoriaPixTotal(consultoria) : 0,
          },
        })
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
            {/* Coluna esquerda — Formulário */}
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
                hasConsultoria={hasConsultoria}
              />

              {/* Resumo mobile */}
              <div className="lg:hidden">
                <OrderSummary
                  selectedPlans={selectedPlans}
                  onAddPlan={handleAddPlan}
                  onRemovePlan={handleRemovePlan}
                />
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

            {/* Coluna direita — Resumo (desktop) */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-8">
                <OrderSummary
                  selectedPlans={selectedPlans}
                  onAddPlan={handleAddPlan}
                  onRemovePlan={handleRemovePlan}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
