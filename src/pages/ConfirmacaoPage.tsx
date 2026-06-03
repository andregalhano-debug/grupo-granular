import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, Mail } from 'lucide-react'
import type { Plan } from '../data/plans'
import { CheckoutHeader } from '../components/checkout/CheckoutHeader'
import { OrderDetails } from '../components/confirmacao/OrderDetails'
import { OnboardingTimeline } from '../components/confirmacao/OnboardingTimeline'

interface ConfirmacaoState {
  orderId: string
  nome: string
  whatsapp: string
  email: string
  method: string
  plans: Plan[]
  total: number
}

export function ConfirmacaoPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ConfirmacaoState | null

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!state) {
      navigate('/', { replace: true })
    }
  }, [state, navigate])

  if (!state) return null

  const firstName = state.nome.split(' ')[0]

  return (
    <div className="min-h-screen bg-white">
      <CheckoutHeader />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        {/* Sucesso */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F]">Pedido confirmado!</h1>
          <p className="text-[#9C958A] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Obrigado, <strong className="text-[#0E0E0F]">{firstName}</strong>! Um consultor Granular
            entrará em contato pelo WhatsApp <strong className="text-[#0E0E0F]">{state.whatsapp}</strong> para
            combinar os próximos passos.
          </p>
        </div>

        {/* Email notice */}
        <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
          <Mail size={18} className="flex-shrink-0" />
          Confirmação enviada para <strong>{state.email}</strong>
        </div>

        {/* Detalhes */}
        <OrderDetails
          orderId={state.orderId}
          plans={state.plans}
          method={state.method}
          total={state.total}
        />

        {/* Timeline */}
        <OnboardingTimeline />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-[#0E0E0F]/15 text-[#0E0E0F] font-medium px-6 py-3 rounded-xl text-sm transition-colors hover:bg-[#F7F7F7]"
          >
            Voltar ao site
          </Link>
          <a
            href="https://wa.me/5511999999999?text=Ola!%20Acabei%20de%20fazer%20meu%20pedido%20na%20Granular."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </main>
    </div>
  )
}
