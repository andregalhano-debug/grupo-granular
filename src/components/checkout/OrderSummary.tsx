import { Check, Plus, X, ChevronDown, CalendarDays, Star, AlertCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { saasPlans, consultoriaPlans, getConsultoriaTotal, getConsultoriaPixTotal, getConsultoriaPixDiscount } from '../../data/plans'
import type { Plan } from '../../data/plans'
import { getConsultantById } from '../../data/consultants'
import type { TimeSlot } from '../../data/consultants'
import { formatCurrency } from '../../utils/formatters'
import { useCart } from '../../stores/useCartStore'
import type { PaymentMethod } from '../../hooks/useCheckoutForm'

interface OrderSummaryProps {
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
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-2 text-xs text-[#EA1D2C] font-medium mt-2 px-2 py-1.5 rounded-lg hover:bg-[#EA1D2C]/5 transition-colors cursor-pointer">
        Alterar {label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-1 rounded-xl border border-[#0E0E0F]/10 bg-white shadow-lg overflow-hidden z-10 relative">
          {plans.map((plan) => (
            <button key={plan.id} type="button" onClick={() => { onSelect(plan); setOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors cursor-pointer ${plan.id === currentPlan.id ? 'bg-[#EA1D2C]/5 text-[#EA1D2C] font-medium' : 'hover:bg-[#F7F7F7] text-[#0E0E0F]'}`}>
              <span>{plan.name}</span>
              <span className="text-xs text-[#9C958A]">R$ {plan.priceFormatted}/mês</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function ConsultantSlotCard({ cartConsultant }: { cartConsultant: { id: string; name: string; title: string; rating: number; hourlyRate: number; slot: string | null } }) {
  const cart = useCart()
  const c = cartConsultant
  const [slotsExpanded, setSlotsExpanded] = useState(false)

  // Buscar slots do consultor original
  const consultant = getConsultantById(c.id)
  const slotsByDate = useMemo(() => {
    if (!consultant) return new Map<string, TimeSlot[]>()
    const map = new Map<string, TimeSlot[]>()
    for (const slot of consultant.slots) {
      const list = map.get(slot.date) || []
      list.push(slot)
      map.set(slot.date, list)
    }
    return map
  }, [consultant])

  const entries = Array.from(slotsByDate.entries())
  const visibleEntries = slotsExpanded ? entries : entries.slice(0, 1)
  const hiddenCount = entries.length - 1
  const needsSlot = !c.slot

  return (
    <div className={`rounded-xl bg-white p-4 border ${needsSlot ? 'border-amber-300' : 'border-[#EA1D2C]/20'}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[#EA1D2C]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Sessão com consultor
        </span>
        <button type="button" onClick={() => cart.removeConsultant(c.id)} className="p-1 text-[#9C958A] hover:text-[#EA1D2C] transition-colors"><X size={16} /></button>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-[#EA1D2C]">{getInitials(c.name)}</span>
        </div>
        <div>
          <h3 className="font-semibold text-[#0E0E0F] text-sm">{c.name}</h3>
          <p className="text-xs text-[#9C958A]">{c.title}</p>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.round(c.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'} />
            ))}
            <span className="text-[10px] text-[#9C958A] ml-0.5">{c.rating}</span>
          </div>
        </div>
      </div>

      {/* Slot selecionado ou seletor */}
      {c.slot ? (
        <div className="flex items-center justify-between rounded-lg bg-[#EA1D2C]/5 px-3 py-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-[#0E0E0F]">
            <CalendarDays size={14} className="text-[#EA1D2C]" />
            Agendado: <strong>{c.slot.replace('-', ' às ')}</strong>
          </div>
          <button type="button" onClick={() => cart.updateConsultantSlot(c.id, null)} className="text-[10px] text-[#EA1D2C] font-medium hover:underline cursor-pointer">
            Alterar
          </button>
        </div>
      ) : (
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
            <AlertCircle size={14} className="flex-shrink-0" />
            Selecione uma data e horário para continuar
          </div>

          {visibleEntries.map(([date, slots]) => (
            <div key={date}>
              <p className="text-[10px] font-medium text-[#0E0E0F] mb-1.5 capitalize">{date}</p>
              <div className="flex flex-wrap gap-1.5">
                {slots.map((slot) => {
                  const key = `${date}-${slot.time}`
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => cart.updateConsultantSlot(c.id, key)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer ${
                        !slot.available
                          ? 'bg-[#F7F7F7] text-[#9C958A]/40 cursor-not-allowed line-through'
                          : 'border border-[#9C958A]/20 text-[#0E0E0F] hover:border-[#EA1D2C]/40 hover:bg-[#EA1D2C]/5'
                      }`}
                    >
                      {slot.time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {!slotsExpanded && hiddenCount > 0 && (
            <button type="button" onClick={() => setSlotsExpanded(true)}
              className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-[#EA1D2C] hover:bg-[#EA1D2C]/5 py-1.5 rounded-md transition-colors cursor-pointer">
              +{hiddenCount} {hiddenCount === 1 ? 'dia' : 'dias'}
              <ChevronDown size={12} />
            </button>
          )}
          {slotsExpanded && (
            <button type="button" onClick={() => setSlotsExpanded(false)}
              className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-[#9C958A] hover:bg-[#F7F7F7] py-1.5 rounded-md transition-colors cursor-pointer">
              Recolher <ChevronDown size={12} className="rotate-180" />
            </button>
          )}
        </div>
      )}

      <div className="text-right">
        <span className="text-xl font-bold text-[#0E0E0F]">R$ {c.hourlyRate}</span>
        <span className="text-xs text-[#9C958A]">/hora</span>
      </div>
    </div>
  )
}

export function OrderSummary({ paymentMethod }: OrderSummaryProps) {
  const cart = useCart()
  const [consultoriaExpanded, setConsultoriaExpanded] = useState(false)

  const saas = cart.plans.find((p) => p.type === 'saas')
  const consultoria = cart.plans.find((p) => p.type === 'consultoria')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria
  const hasConsultants = cart.consultants.length > 0

  const upsellSaas = saasPlans.find((p) => p.popular)!
  const upsellConsultoria = consultoriaPlans.find((p) => p.popular)!

  const consultoriaIsMensal = hasSaas && paymentMethod === 'cartao'

  const saasMensal = saas ? saas.price : 0
  const consultoriaMensal = consultoria ? consultoria.price : 0
  const consultoriaPixFinal = consultoria ? getConsultoriaPixTotal(consultoria) : 0

  return (
    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-6 space-y-5">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Resumo do pedido</h2>

      {/* Sistema */}
      {saas && (
        <div className="rounded-xl bg-white p-4 border border-[#0E0E0F]/5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#EA1D2C]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sistema</span>
              <h3 className="font-semibold text-[#0E0E0F] text-sm">{saas.name}</h3>
            </div>
            {(cart.plans.length > 1 || hasConsultants) && (
              <button type="button" onClick={() => cart.removePlan(saas.id)} className="p-1 text-[#9C958A] hover:text-[#EA1D2C] transition-colors"><X size={16} /></button>
            )}
          </div>
          <ul className="space-y-1.5 mb-3">
            {saas.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]"><Check size={12} className="mt-0.5 text-[#EA1D2C] flex-shrink-0" />{f}</li>
            ))}
            {saas.features.length > 3 && <li className="text-xs text-[#9C958A]">+{saas.features.length - 3} recursos inclusos</li>}
          </ul>
          <div className="text-right">
            <span className="text-xl font-bold text-[#0E0E0F]">R$ {saas.priceFormatted}</span>
            <span className="text-xs text-[#9C958A]">/mês</span>
          </div>
          <PlanSelector plans={saasPlans} currentPlan={saas} onSelect={cart.addPlan} label="pacote" />
        </div>
      )}

      {/* Sessões com consultores */}
      {cart.consultants.map((c) => (
        <ConsultantSlotCard key={c.id} cartConsultant={c} />
      ))}

      {/* Consultoria tradicional */}
      {hasConsultoria && (
        <div className="rounded-xl bg-white p-4 border border-[#0E0E0F]/5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#EA1D2C]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Consultoria</span>
              <h3 className="font-semibold text-[#0E0E0F] text-sm">{consultoria!.name}</h3>
            </div>
            <button type="button" onClick={() => cart.removePlan(consultoria!.id)} className="p-1 text-[#9C958A] hover:text-[#EA1D2C] transition-colors"><X size={16} /></button>
          </div>
          <ul className="space-y-1.5 mb-3">
            {consultoria!.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]"><Check size={12} className="mt-0.5 text-[#EA1D2C] flex-shrink-0" />{f}</li>
            ))}
            {consultoria!.features.length > 3 && <li className="text-xs text-[#9C958A]">+{consultoria!.features.length - 3} recursos inclusos</li>}
          </ul>
          {consultoriaIsMensal ? (
            <div className="text-right">
              <span className="text-xl font-bold text-[#0E0E0F]">R$ {consultoria!.priceFormatted}</span>
              <span className="text-xs text-[#9C958A]">/mês</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs text-[#9C958A]">
                <span>{consultoria!.months}x de R$ {consultoria!.priceFormatted}</span>
                <span>R$ {formatCurrency(getConsultoriaTotal(consultoria!))}</span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-green-600 font-medium">
                <span>Desconto Pix (3%)</span>
                <span>- R$ {formatCurrency(getConsultoriaPixDiscount(consultoria!))}</span>
              </div>
              <div className="flex items-baseline justify-between pt-1 border-t border-[#0E0E0F]/5">
                <span className="text-xs font-medium text-[#0E0E0F]">Total via Pix</span>
                <span className="text-lg font-bold text-[#0E0E0F]">R$ {formatCurrency(getConsultoriaPixTotal(consultoria!))}</span>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2 rounded-lg bg-[#EA1D2C]/5 border border-[#EA1D2C]/10 px-3 py-2 mt-3 text-[11px] text-[#9C958A] leading-relaxed">
            <Check size={12} className="mt-0.5 text-[#EA1D2C] flex-shrink-0" />
            <span><strong className="text-[#0E0E0F]">Sistema incluso</strong> durante o período da consultoria. Necessário integração dos dados para início.</span>
          </div>
          <PlanSelector plans={consultoriaPlans} currentPlan={consultoria!} onSelect={cart.addPlan} label="consultoria" />
        </div>
      )}

      {/* Upsells */}
      {hasSaas && !hasConsultoria && !hasConsultants && (
        <button type="button" onClick={() => cart.addPlan(upsellConsultoria)}
          className="w-full flex items-center gap-3 rounded-xl border border-dashed border-[#EA1D2C]/30 bg-[#EA1D2C]/5 p-4 text-left hover:bg-[#EA1D2C]/10 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#EA1D2C]" /></div>
          <div>
            <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Consultoria</p>
            <p className="text-xs text-[#9C958A]">{upsellConsultoria.name} — R$ {upsellConsultoria.priceFormatted}/mês</p>
          </div>
        </button>
      )}

      {/* Consultoria recolhida (quando tem consultores) */}
      {hasConsultants && !hasConsultoria && (
        <div>
          <button type="button" onClick={() => setConsultoriaExpanded(!consultoriaExpanded)}
            className="w-full flex items-center justify-between gap-2 rounded-xl border border-dashed border-[#9C958A]/20 bg-white p-4 text-left hover:bg-[#F7F7F7] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#EA1D2C]" /></div>
              <div>
                <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Consultoria Recorrente</p>
                <p className="text-xs text-[#9C958A]">Planos de 1, 3 ou 6 meses</p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-[#9C958A] transition-transform ${consultoriaExpanded ? 'rotate-180' : ''}`} />
          </button>
          {consultoriaExpanded && (
            <div className="mt-2 rounded-xl border border-[#0E0E0F]/10 bg-white shadow-lg overflow-hidden">
              {consultoriaPlans.map((plan) => (
                <button key={plan.id} type="button" onClick={() => { cart.addPlan(plan); setConsultoriaExpanded(false) }}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm hover:bg-[#F7F7F7] text-[#0E0E0F] transition-colors cursor-pointer">
                  <div>
                    <span className="font-medium">{plan.name}</span>
                    {plan.popular && <span className="ml-2 text-[10px] text-[#EA1D2C] bg-[#EA1D2C]/10 px-2 py-0.5 rounded-full">Popular</span>}
                  </div>
                  <span className="text-xs text-[#9C958A]">R$ {plan.priceFormatted}/mês</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {hasConsultoria && !hasSaas && !hasConsultants && (
        <button type="button" onClick={() => cart.addPlan(upsellSaas)}
          className="w-full flex items-center gap-3 rounded-xl border border-dashed border-[#EA1D2C]/30 bg-[#EA1D2C]/5 p-4 text-left hover:bg-[#EA1D2C]/10 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#EA1D2C]" /></div>
          <div>
            <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Sistema</p>
            <p className="text-xs text-[#9C958A]">{upsellSaas.name} — R$ {upsellSaas.priceFormatted}/mês</p>
          </div>
        </button>
      )}

      {/* Totais */}
      <div className="border-t border-[#0E0E0F]/10 pt-4 space-y-2">
        {hasSaas && (
          <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
            <span>Sistema</span><span>R$ {formatCurrency(saasMensal)}/mês</span>
          </div>
        )}
        {cart.consultants.map((c) => (
          <div key={c.id} className="flex items-baseline justify-between text-sm text-[#9C958A]">
            <span>Sessão ({c.name.split(' ')[0]})</span><span>R$ {formatCurrency(c.hourlyRate)}/hora</span>
          </div>
        ))}
        {hasConsultoria && (
          <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
            <span>Consultoria{consultoriaIsMensal ? '' : ' (Pix à vista)'}</span>
            <span>{consultoriaIsMensal ? `R$ ${formatCurrency(consultoriaMensal)}/mês` : `R$ ${formatCurrency(consultoriaPixFinal)}`}</span>
          </div>
        )}
      </div>

      {/* Trust */}
      <div className="flex flex-col gap-2 text-xs text-[#9C958A]">
        <div className="flex items-center gap-2"><Check size={12} className="text-green-600" />14 dias grátis nos planos de sistema</div>
        <div className="flex items-center gap-2"><Check size={12} className="text-green-600" />Cancele quando quiser</div>
        <div className="flex items-center gap-2"><Check size={12} className="text-green-600" />Receba o cronograma após o pagamento</div>
        <div className="flex items-center gap-2"><Check size={12} className="text-green-600" />Um Consultor irá entrar em contato</div>
      </div>
    </div>
  )
}
