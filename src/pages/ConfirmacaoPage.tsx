import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, Mail } from 'lucide-react'
import type { Plan } from '../data/plans'
import { formatCurrency } from '../utils/formatters'
import { CheckoutHeader } from '../components/checkout/CheckoutHeader'
import { OnboardingTimeline } from '../components/confirmacao/OnboardingTimeline'

interface ConfirmacaoState {
  orderId: string
  nome: string
  whatsapp: string
  email: string
  saasMethod: 'pix' | 'cartao' | null
  consultoriaPix: boolean
  plans: Plan[]
  saasMensal: number
  consultoriaPixTotal: number
}

const methodLabels: Record<string, string> = {
  pix: 'Pix',
  cartao: 'Cartão de Crédito',
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
  const saas = state.plans.find((p) => p.type === 'saas')
  const consultoria = state.plans.find((p) => p.type === 'consultoria')

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

        {/* Detalhes do pedido */}
        <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#0E0E0F]">Detalhes do pedido</h3>
            <span className="text-xs font-medium px-3 py-1 rounded-full text-green-600 bg-green-50">Aprovado</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#9C958A]">Pedido</span>
              <span className="font-mono text-[#0E0E0F] text-xs">{state.orderId}</span>
            </div>

            {saas && (
              <>
                <div className="flex justify-between">
                  <span className="text-[#9C958A]">{saas.name}</span>
                  <span className="text-[#0E0E0F]">R$ {saas.priceFormatted}/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9C958A]">Pagamento Sistema</span>
                  <span className="text-[#0E0E0F]">{state.saasMethod ? methodLabels[state.saasMethod] : 'Pix'}</span>
                </div>
              </>
            )}

            {consultoria && (
              <>
                <div className="flex justify-between">
                  <span className="text-[#9C958A]">{consultoria.name}</span>
                  <span className="text-[#0E0E0F]">R$ {formatCurrency(state.consultoriaPixTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9C958A]">Pagamento Consultoria</span>
                  <span className="text-[#0E0E0F]">Pix à vista (3% desconto)</span>
                </div>
              </>
            )}
          </div>
        </div>

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
            href="https://wa.me/5511999999999?text=Olá!%20Acabei%20de%20fazer%20meu%20pedido%20na%20Granular."
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
