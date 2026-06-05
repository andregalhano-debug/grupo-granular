import { QrCode, CreditCard, Check } from 'lucide-react'
import type { PaymentMethod } from '../../hooks/useCheckoutForm'

interface PaymentMethodSelectorProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
  hasSaas: boolean
  hasConsultoria: boolean
  hasAvulso?: boolean
  onAvulsoMethodChange?: (method: 'cartao' | 'pix') => void
  avulsoMethod?: 'cartao' | 'pix'
}

const methods = [
  { id: 'cartao' as const, icon: CreditCard, label: 'Cartão de Crédito', desc: 'Recorrente mensal' },
  { id: 'pix' as const, icon: QrCode, label: 'Pix', desc: 'À vista com 3% de desconto' },
]

export function PaymentMethodSelector({ selected, onSelect, hasConsultoria, hasAvulso, onAvulsoMethodChange, avulsoMethod }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Forma de pagamento</h2>
        <p className="text-xs text-[#9C958A]">Escolha como deseja pagar os itens recorrentes (mensal).</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border text-center transition-all cursor-pointer ${
              selected === m.id
                ? 'border-[#A31631] bg-[#A31631]/5 shadow-sm'
                : 'border-[#0E0E0F]/10 hover:border-[#0E0E0F]/25'
            }`}
          >
            <m.icon size={24} className={selected === m.id ? 'text-[#A31631]' : 'text-[#9C958A]'} />
            <span className={`text-sm font-medium ${selected === m.id ? 'text-[#A31631]' : 'text-[#0E0E0F]'}`}>
              {m.label}
            </span>
            <span className="text-[10px] text-[#9C958A]">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* Info contextual */}
      <div className="rounded-xl bg-[#F7F7F7] p-4 text-sm text-[#9C958A] space-y-1.5">
        {selected === 'cartao' && (
          <>
            <p>Os dados do cartão serão solicitados abaixo via Stripe.</p>
            {hasConsultoria && <p className="text-xs">Consultoria e sistema cobrados mensalmente no cartão.</p>}
          </>
        )}
        {selected === 'pix' && (
          <>
            <p>O QR Code Pix será gerado após a confirmação do pedido.</p>
            {hasConsultoria && (
              <p className="text-xs">Consultoria paga à vista via Pix com <strong className="text-green-600">3% de desconto</strong>.</p>
            )}
          </>
        )}
      </div>

      {/* Pagamento avulso separado */}
      {hasAvulso && selected === 'cartao' && onAvulsoMethodChange && (
        <div className="rounded-xl border border-[#0E0E0F]/10 p-4 space-y-3">
          <div>
            <p className="text-sm font-medium text-[#0E0E0F]">Pagamento avulso (sessões/consultoria à vista)</p>
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
  )
}
