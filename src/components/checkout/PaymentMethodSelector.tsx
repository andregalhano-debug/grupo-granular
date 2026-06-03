import { QrCode, CreditCard } from 'lucide-react'
import type { PaymentMethod } from '../../hooks/useCheckoutForm'

interface PaymentMethodSelectorProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
}

const methods = [
  { id: 'pix' as const, icon: QrCode, label: 'Pix', desc: 'Aprovação instantânea' },
  { id: 'cartao' as const, icon: CreditCard, label: 'Cartão', desc: '' },
]

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Forma de pagamento</h2>

      <div className="grid grid-cols-2 gap-3">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border text-center transition-all cursor-pointer ${
              selected === m.id
                ? 'border-[#EA1D2C] bg-[#EA1D2C]/5 shadow-sm'
                : 'border-[#0E0E0F]/10 hover:border-[#0E0E0F]/25'
            }`}
          >
            <m.icon size={24} className={selected === m.id ? 'text-[#EA1D2C]' : 'text-[#9C958A]'} />
            <span className={`text-sm font-medium ${selected === m.id ? 'text-[#EA1D2C]' : 'text-[#0E0E0F]'}`}>
              {m.label}
            </span>
            {m.desc && <span className="text-[10px] text-[#9C958A]">{m.desc}</span>}
          </button>
        ))}
      </div>

      {/* Info contextual */}
      <div className="rounded-xl bg-[#F7F7F7] p-4 text-sm text-[#9C958A]">
        {selected === 'pix' && 'O QR Code Pix será gerado após a confirmação do pedido.'}
        {selected === 'cartao' && 'Os dados do cartão serão solicitados na etapa de pagamento seguro.'}
      </div>
    </div>
  )
}
