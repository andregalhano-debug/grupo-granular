import { QrCode, CreditCard, Check, ChevronDown } from 'lucide-react'
import type { PaymentMethod } from '../../hooks/useCheckoutForm'

interface PaymentMethodSelectorProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
  hasSaas: boolean
  hasConsultoria: boolean
  hasMentor: boolean
  hasAvulso?: boolean
  onAvulsoMethodChange?: (method: 'cartao' | 'pix') => void
  avulsoMethod?: 'cartao' | 'pix'
  cardContent?: React.ReactNode
  pixContent?: React.ReactNode
}

export function PaymentMethodSelector({
  selected,
  onSelect,
  hasConsultoria,
  hasMentor,
  hasAvulso,
  onAvulsoMethodChange,
  avulsoMethod,
  cardContent,
  pixContent,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Forma de pagamento</h2>
        <p className="text-xs text-[#9C958A]">Escolha como deseja pagar os itens recorrentes (mensal).</p>
      </div>

      <div className="space-y-3">
        {/* ── Cartão de Crédito ── */}
        <div className={`rounded-xl border transition-all ${selected === 'cartao' ? 'border-[#A31631]' : 'border-[#0E0E0F]/10'}`}>
          <button
            type="button"
            onClick={() => hasMentor && onSelect(selected === 'cartao' ? 'pix' : 'cartao')}
            className={`w-full flex items-center justify-between gap-3 p-4 ${hasMentor ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${selected === 'cartao' ? 'bg-[#A31631]/10' : 'bg-[#F7F7F7]'}`}>
                <CreditCard size={18} className={selected === 'cartao' ? 'text-[#A31631]' : 'text-[#9C958A]'} />
              </div>
              <div className="text-left">
                <p className={`text-sm font-semibold ${selected === 'cartao' ? 'text-[#A31631]' : 'text-[#0E0E0F]'}`}>Cartão de Crédito</p>
                <p className="text-xs text-[#9C958A]">Recorrente mensal</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {selected === 'cartao' && (
                <span className="w-5 h-5 rounded-full bg-[#A31631] flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </span>
              )}
              {hasMentor && (
                <ChevronDown size={16} className={`text-[#9C958A] transition-transform ${selected === 'cartao' ? 'rotate-180' : ''}`} />
              )}
            </div>
          </button>

          {selected === 'cartao' && (
            <div className="px-4 pb-4 border-t border-[#0E0E0F]/5">
              <div className="pt-4 space-y-4">
                {/* Info contextual */}
                <div className="rounded-lg bg-[#F7F7F7] px-3 py-2.5 text-xs text-[#9C958A]">
                  Os dados do cartão serão preenchidos abaixo via Stripe.
                  {hasConsultoria && <span className="block mt-0.5">Especialista e sistema cobrados mensalmente no cartão.</span>}
                </div>

                {/* Formulário do cartão injetado */}
                {cardContent}

                {/* Pagamento avulso separado */}
                {hasAvulso && onAvulsoMethodChange && (
                  <div className="rounded-xl border border-[#0E0E0F]/10 p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-[#0E0E0F]">Pagamento avulso (sessões/especialista à vista)</p>
                      <p className="text-xs text-[#9C958A]">Escolha como pagar os itens de pagamento único.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onAvulsoMethodChange('cartao')}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          avulsoMethod === 'cartao'
                            ? 'bg-[#A31631]/10 text-[#A31631] border border-[#A31631]/30'
                            : 'border border-[#0E0E0F]/10 text-[#9C958A] hover:border-[#0E0E0F]/25'
                        }`}
                      >
                        <CreditCard size={14} />
                        Mesmo cartão
                      </button>
                      <button
                        type="button"
                        onClick={() => onAvulsoMethodChange('pix')}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          avulsoMethod === 'pix'
                            ? 'bg-green-50 text-green-700 border border-green-300'
                            : 'border border-[#0E0E0F]/10 text-[#9C958A] hover:border-[#0E0E0F]/25'
                        }`}
                      >
                        <QrCode size={14} />
                        Pix à vista
                      </button>
                    </div>
                    {avulsoMethod === 'pix' && (
                      <div className="flex items-center gap-1.5 text-[11px] text-green-600">
                        <Check size={12} />
                        Pagamento avulso via Pix com 3% de desconto. QR Code gerado após a confirmação.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── PIX — apenas quando há mentor no carrinho ── */}
        {hasMentor && <div className={`rounded-xl border transition-all ${selected === 'pix' ? 'border-[#A31631]' : 'border-[#0E0E0F]/10'}`}>
          <button
            type="button"
            onClick={() => onSelect(selected === 'pix' ? 'cartao' : 'pix')}
            className="w-full flex items-center justify-between gap-3 p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${selected === 'pix' ? 'bg-[#A31631]/10' : 'bg-[#F7F7F7]'}`}>
                <QrCode size={18} className={selected === 'pix' ? 'text-[#A31631]' : 'text-[#9C958A]'} />
              </div>
              <div className="text-left">
                <p className={`text-sm font-semibold ${selected === 'pix' ? 'text-[#A31631]' : 'text-[#0E0E0F]'}`}>Pix</p>
                <p className="text-xs text-[#9C958A]">À vista com 3% de desconto</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {selected === 'pix' && (
                <span className="w-5 h-5 rounded-full bg-[#A31631] flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </span>
              )}
              <ChevronDown size={16} className={`text-[#9C958A] transition-transform ${selected === 'pix' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {selected === 'pix' && (
            <div className="px-4 pb-4 border-t border-[#0E0E0F]/5">
              <div className="pt-4">
                {/* Info contextual */}
                <div className="rounded-lg bg-[#F7F7F7] px-3 py-2.5 text-xs text-[#9C958A] mb-4">
                  O QR Code Pix será gerado após a confirmação do pedido. Você terá 30 minutos para realizar o pagamento.
                  {hasConsultoria && (
                    <span className="block mt-0.5 text-green-600 font-medium">Especialista sob demanda via Pix com 3% de desconto aplicado.</span>
                  )}
                </div>

                {/* Botão / formulário Pix injetado */}
                {pixContent}
              </div>
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}
