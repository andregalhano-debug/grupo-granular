import type { Plan } from '../../data/plans'
import { formatCurrency } from '../../utils/formatters'

interface OrderDetailsProps {
  orderId: string
  plans: Plan[]
  method: string
  total: number
}

const methodLabels: Record<string, string> = {
  pix: 'Pix',
  cartao: 'Cartao de Credito',
  boleto: 'Boleto Bancario',
}

const statusLabels: Record<string, { text: string; color: string }> = {
  pix: { text: 'Aprovado', color: 'text-green-600 bg-green-50' },
  cartao: { text: 'Aprovado', color: 'text-green-600 bg-green-50' },
  boleto: { text: 'Aguardando pagamento', color: 'text-amber-600 bg-amber-50' },
}

export function OrderDetails({ orderId, plans, method, total }: OrderDetailsProps) {
  const status = statusLabels[method] || statusLabels.pix

  return (
    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#0E0E0F]">Detalhes do pedido</h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${status.color}`}>{status.text}</span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#9C958A]">Pedido</span>
          <span className="font-mono text-[#0E0E0F] text-xs">{orderId}</span>
        </div>
        {plans.map((p) => (
          <div key={p.id} className="flex justify-between">
            <span className="text-[#9C958A]">{p.name}</span>
            <span className="text-[#0E0E0F]">R$ {p.priceFormatted}/mes</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="text-[#9C958A]">Pagamento</span>
          <span className="text-[#0E0E0F]">{methodLabels[method]}</span>
        </div>
        <div className="border-t border-[#0E0E0F]/10 pt-3 flex justify-between font-bold">
          <span className="text-[#0E0E0F]">Total mensal</span>
          <span className="text-[#0E0E0F]">R$ {formatCurrency(total)}/mes</span>
        </div>
      </div>
    </div>
  )
}
