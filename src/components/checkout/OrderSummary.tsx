import { Check, Plus, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Plan } from '../../data/plans'
import { saasPlans, consultoriaPlans, getConsultoriaTotal, getConsultoriaPixTotal, getConsultoriaPixDiscount } from '../../data/plans'
import { formatCurrency } from '../../utils/formatters'
import type { PaymentMethod } from '../../hooks/useCheckoutForm'

interface OrderSummaryProps {
  selectedPlans: Plan[]
  onAddPlan: (plan: Plan) => void
  onRemovePlan: (planId: string) => void
  paymentMethod: PaymentMethod
}

function PlanSelector({ plans, currentPlan, onSelect, label }: {
  plans: Plan[]
  currentPlan: Plan
  onSelect: (plan: Plan) => void
  label: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 text-xs text-[#EA1D2C] font-medium mt-2 px-2 py-1.5 rounded-lg hover:bg-[#EA1D2C]/5 transition-colors cursor-pointer"
      >
        Alterar {label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-1 rounded-xl border border-[#0E0E0F]/10 bg-white shadow-lg overflow-hidden z-10 relative">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => { onSelect(plan); setOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
                plan.id === currentPlan.id
                  ? 'bg-[#EA1D2C]/5 text-[#EA1D2C] font-medium'
                  : 'hover:bg-[#F7F7F7] text-[#0E0E0F]'
              }`}
            >
              <span>{plan.name}</span>
              <span className="text-xs text-[#9C958A]">R$ {plan.priceFormatted}/mês</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function OrderSummary({ selectedPlans, onAddPlan, onRemovePlan, paymentMethod }: OrderSummaryProps) {
  const saas = selectedPlans.find((p) => p.type === 'saas')
  const consultoria = selectedPlans.find((p) => p.type === 'consultoria')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria

  const upsellSaas = saasPlans.find((p) => p.popular)!
  const upsellConsultoria = consultoriaPlans.find((p) => p.popular)!

  // Se tem sistema e método é cartão, consultoria mostra mensal
  // Se não tem sistema (só consultoria) ou método é pix, consultoria mostra Pix à vista
  const consultoriaIsMensal = hasSaas && paymentMethod === 'cartao'

  const saasMensal = saas ? saas.price : 0
  const consultoriaMensal = consultoria ? consultoria.price : 0
  const consultoriaPixFinal = consultoria ? getConsultoriaPixTotal(consultoria) : 0

  // Total mensal quando cartão (sistema + consultoria)
  const totalMensal = saasMensal + (consultoriaIsMensal ? consultoriaMensal : 0)

  return (
    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-6 space-y-5">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Resumo do pedido</h2>

      {/* Planos selecionados — ordem fixa: saas primeiro */}
      {[saas, consultoria].filter(Boolean).map((plan) => {
        const planList = plan!.type === 'saas' ? saasPlans : consultoriaPlans
        const planLabel = plan!.type === 'saas' ? 'pacote' : 'consultoria'
        const isConsultoria = plan!.type === 'consultoria'

        return (
          <div key={plan!.id} className="rounded-xl bg-white p-4 border border-[#0E0E0F]/5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-[#EA1D2C]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {plan!.type === 'saas' ? 'Sistema' : 'Consultoria'}
                </span>
                <h3 className="font-semibold text-[#0E0E0F] text-sm">{plan!.name}</h3>
              </div>
              {selectedPlans.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemovePlan(plan!.id)}
                  className="p-1 text-[#9C958A] hover:text-[#EA1D2C] transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <ul className="space-y-1.5 mb-3">
              {plan!.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]">
                  <Check size={12} className="mt-0.5 text-[#EA1D2C] flex-shrink-0" />
                  {f}
                </li>
              ))}
              {plan!.features.length > 3 && (
                <li className="text-xs text-[#9C958A]">+{plan!.features.length - 3} recursos inclusos</li>
              )}
            </ul>

            {/* Preço */}
            {isConsultoria && !consultoriaIsMensal ? (
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between text-xs text-[#9C958A]">
                  <span>{plan!.months}x de R$ {plan!.priceFormatted}</span>
                  <span>R$ {formatCurrency(getConsultoriaTotal(plan!))}</span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-green-600 font-medium">
                  <span>Desconto Pix (3%)</span>
                  <span>- R$ {formatCurrency(getConsultoriaPixDiscount(plan!))}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-[#0E0E0F]/5">
                  <span className="text-xs font-medium text-[#0E0E0F]">Total via Pix</span>
                  <span className="text-lg font-bold text-[#0E0E0F]">R$ {formatCurrency(getConsultoriaPixTotal(plan!))}</span>
                </div>
              </div>
            ) : (
              <div className="text-right">
                <span className="text-xl font-bold text-[#0E0E0F]">R$ {plan!.priceFormatted}</span>
                <span className="text-xs text-[#9C958A]">/mês</span>
              </div>
            )}

            <PlanSelector
              plans={planList}
              currentPlan={plan!}
              onSelect={onAddPlan}
              label={planLabel}
            />
          </div>
        )
      })}

      {/* Upsell */}
      {hasSaas && !hasConsultoria && (
        <button
          type="button"
          onClick={() => onAddPlan(upsellConsultoria)}
          className="w-full flex items-center gap-3 rounded-xl border border-dashed border-[#EA1D2C]/30 bg-[#EA1D2C]/5 p-4 text-left hover:bg-[#EA1D2C]/10 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0">
            <Plus size={16} className="text-[#EA1D2C]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Consultoria</p>
            <p className="text-xs text-[#9C958A]">{upsellConsultoria.name} — R$ {upsellConsultoria.priceFormatted}/mês</p>
          </div>
        </button>
      )}

      {hasConsultoria && !hasSaas && (
        <button
          type="button"
          onClick={() => onAddPlan(upsellSaas)}
          className="w-full flex items-center gap-3 rounded-xl border border-dashed border-[#EA1D2C]/30 bg-[#EA1D2C]/5 p-4 text-left hover:bg-[#EA1D2C]/10 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0">
            <Plus size={16} className="text-[#EA1D2C]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Sistema</p>
            <p className="text-xs text-[#9C958A]">{upsellSaas.name} — R$ {upsellSaas.priceFormatted}/mês</p>
          </div>
        </button>
      )}

      {/* Totais */}
      <div className="border-t border-[#0E0E0F]/10 pt-4 space-y-2">
        {consultoriaIsMensal ? (
          <>
            {hasSaas && (
              <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>Sistema</span>
                <span>R$ {formatCurrency(saasMensal)}/mês</span>
              </div>
            )}
            {hasConsultoria && (
              <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>Consultoria</span>
                <span>R$ {formatCurrency(consultoriaMensal)}/mês</span>
              </div>
            )}
            <div className="flex items-baseline justify-between pt-2 border-t border-[#0E0E0F]/5">
              <span className="text-sm font-bold text-[#0E0E0F]">Total mensal</span>
              <div>
                <span className="text-2xl font-bold text-[#0E0E0F]">R$ {formatCurrency(totalMensal)}</span>
                <span className="text-xs text-[#9C958A]">/mês</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {hasSaas && (
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-[#9C958A]">Sistema (mensal)</span>
                <span className="font-semibold text-[#0E0E0F]">R$ {formatCurrency(saasMensal)}/mês</span>
              </div>
            )}
            {hasConsultoria && (
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-[#9C958A]">Consultoria (Pix à vista)</span>
                <span className="font-semibold text-[#0E0E0F]">R$ {formatCurrency(consultoriaPixFinal)}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Trust */}
      <div className="flex flex-col gap-2 text-xs text-[#9C958A]">
        <div className="flex items-center gap-2">
          <Check size={12} className="text-green-600" />
          14 dias grátis nos planos de sistema
        </div>
        <div className="flex items-center gap-2">
          <Check size={12} className="text-green-600" />
          Cancele quando quiser
        </div>
        <div className="flex items-center gap-2">
          <Check size={12} className="text-green-600" />
          Receba o cronograma após o pagamento
        </div>
        <div className="flex items-center gap-2">
          <Check size={12} className="text-green-600" />
          Um Consultor irá entrar em contato
        </div>
      </div>
    </div>
  )
}
