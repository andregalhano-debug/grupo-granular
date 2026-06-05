import { Check, Plus, X, ChevronDown, CalendarDays, Star, AlertCircle, ChevronsDownUp } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
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
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-2 text-xs text-[#A31631] font-medium mt-2 px-2 py-1.5 rounded-lg hover:bg-[#A31631]/5 transition-colors cursor-pointer">
        Alterar {label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-1 rounded-xl border border-[#0E0E0F]/10 bg-white shadow-lg overflow-hidden z-10 relative">
          {plans.map((plan) => (
            <button key={plan.id} type="button" onClick={() => { onSelect(plan); setOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors cursor-pointer ${plan.id === currentPlan.id ? 'bg-[#A31631]/5 text-[#A31631] font-medium' : 'hover:bg-[#F7F7F7] text-[#0E0E0F]'}`}>
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

function CollapsibleCard({ label, name, price, period, borderClass, children, onRemove, forceCollapsed }: {
  label: string
  name: string
  price: string
  period: string
  borderClass?: string
  children: React.ReactNode
  onRemove?: () => void
  forceCollapsed?: number
}) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (forceCollapsed !== undefined && forceCollapsed > 0) setExpanded(false)
  }, [forceCollapsed])

  return (
    <div className={`rounded-xl bg-white border transition-all ${borderClass || 'border-[#0E0E0F]/5'}`}>
      {/* Header sempre visível — clicável para recolher */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 sm:p-4 cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-left min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#A31631] block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {label}
            </span>
            <h3 className="font-semibold text-[#0E0E0F] text-sm truncate">{name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <span className="text-sm font-bold text-[#0E0E0F]">R$ {price}</span>
            <span className="text-[10px] text-[#9C958A]">{period}</span>
          </div>
          <ChevronDown size={14} className={`text-[#9C958A] transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Conteúdo expandido */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-[#0E0E0F]/5">
          {onRemove && (
            <div className="flex justify-end mb-2">
              <button type="button" onClick={onRemove} className="flex items-center gap-1 text-[10px] text-[#9C958A] hover:text-[#A31631] transition-colors">
                <X size={12} /> Remover
              </button>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}

function ConsultantSlotCard({ cartConsultant, forceCollapsed }: { cartConsultant: { id: string; name: string; title: string; rating: number; hourlyRate: number; slot: string | null }; forceCollapsed?: number }) {
  const cart = useCart()
  const c = cartConsultant
  const [slotsExpanded, setSlotsExpanded] = useState(false)

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
    <CollapsibleCard
      label="Sessão com Mentor"
      name={c.name}
      price={String(c.hourlyRate)}
      period="/hora"
      borderClass={needsSlot ? 'border-amber-300' : 'border-[#A31631]/20'}
      forceCollapsed={forceCollapsed}
      onRemove={() => cart.removeConsultant(c.id)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-[#A31631]">{getInitials(c.name)}</span>
        </div>
        <div>
          <p className="text-xs text-[#9C958A]">{c.title}</p>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.round(c.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'} />
            ))}
            <span className="text-[10px] text-[#9C958A] ml-0.5">{c.rating}</span>
          </div>
        </div>
      </div>

      {c.slot ? (
        <div className="flex items-center justify-between rounded-lg bg-[#A31631]/5 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-[#0E0E0F]">
            <CalendarDays size={14} className="text-[#A31631]" />
            Agendado: <strong>{c.slot.replace('-', ' às ')}</strong>
          </div>
          <button type="button" onClick={() => cart.updateConsultantSlot(c.id, null)} className="text-[10px] text-[#A31631] font-medium hover:underline cursor-pointer">
            Alterar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
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
                    <button key={key} type="button" disabled={!slot.available} onClick={() => cart.updateConsultantSlot(c.id, key)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer ${!slot.available ? 'bg-[#F7F7F7] text-[#9C958A]/40 cursor-not-allowed line-through' : 'border border-[#9C958A]/20 text-[#0E0E0F] hover:border-[#A31631]/40 hover:bg-[#A31631]/5'}`}>
                      {slot.time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          {!slotsExpanded && hiddenCount > 0 && (
            <button type="button" onClick={() => setSlotsExpanded(true)} className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-[#A31631] hover:bg-[#A31631]/5 py-1.5 rounded-md transition-colors cursor-pointer">
              +{hiddenCount} {hiddenCount === 1 ? 'dia' : 'dias'} <ChevronDown size={12} />
            </button>
          )}
          {slotsExpanded && (
            <button type="button" onClick={() => setSlotsExpanded(false)} className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-[#9C958A] hover:bg-[#F7F7F7] py-1.5 rounded-md transition-colors cursor-pointer">
              Recolher <ChevronDown size={12} className="rotate-180" />
            </button>
          )}
        </div>
      )}
    </CollapsibleCard>
  )
}

export function OrderSummary({ paymentMethod }: OrderSummaryProps) {
  const cart = useCart()
  const [consultoriaExpanded, setConsultoriaExpanded] = useState(false)
  const [collapseAll, setCollapseAll] = useState(0)

  const saas = cart.plans.find((p) => p.type === 'saas')
  const consultoria = cart.plans.find((p) => p.type === 'consultoria')
  const modulos = cart.plans.filter((p) => p.type === 'modulo')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria
  const hasConsultants = cart.consultants.length > 0

  const upsellSaas = saasPlans.find((p) => p.popular) || saasPlans[0]
  const modulo1 = saasPlans.find((p) => p.id === 'saas-1')!

  const consultoriaIsMensal = paymentMethod === 'cartao'

  // Módulo 1 incluso na consultoria — se saas-1 selecionado, preço é 0
  const saasIsIncluded = hasConsultoria && saas?.id === 'saas-1'
  const saasEffectivePrice = saasIsIncluded ? 0 : (saas ? saas.price : 0)

  // Cálculos de totais
  const totalMensal =
    saasEffectivePrice +
    modulos.reduce((sum, m) => sum + m.price, 0) +
    (hasConsultoria && consultoriaIsMensal ? consultoria!.price : 0)

  const sessaoAvulso = cart.consultants.reduce((sum, c) => sum + c.hourlyRate, 0)
  const consultoriaAvulso = hasConsultoria && !consultoriaIsMensal ? getConsultoriaPixTotal(consultoria!) : 0
  const totalAvulso = sessaoAvulso + consultoriaAvulso

  return (
    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0E0E0F]">Resumo do pedido</h2>
        <button
          type="button"
          onClick={() => setCollapseAll((c) => c + 1)}
          className="flex items-center gap-1.5 text-[10px] font-medium text-[#9C958A] hover:text-[#A31631] transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-[#A31631]/5"
        >
          <ChevronsDownUp size={12} />
          Recolher todos
        </button>
      </div>

      {/* Sistema */}
      {saas && (
        <CollapsibleCard
          label={saasIsIncluded ? 'Sistema — Incluso na consultoria' : 'Sistema'}
          name={saas.name}
          price={saasIsIncluded ? 'Incluso' : saas.priceFormatted}
          period={saasIsIncluded ? '' : '/mês'}
          forceCollapsed={collapseAll}
          borderClass={saasIsIncluded ? 'border-green-200' : undefined}
          onRemove={(!saasIsIncluded && (cart.plans.length > 1 || hasConsultants)) ? () => cart.removePlan(saas.id) : undefined}
        >
          {saasIsIncluded && (
            <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 mb-3 text-[11px] text-green-700 leading-relaxed">
              <Check size={12} className="mt-0.5 text-green-600 flex-shrink-0" />
              <span><strong>Módulo 1 incluso</strong> durante o período da consultoria. Ao final, você poderá continuar utilizando o sistema no mesmo cartão já autorizado, escolhendo o módulo que preferir.</span>
            </div>
          )}
          <ul className="space-y-1.5 mb-3">
            {saas.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]"><Check size={12} className="mt-0.5 text-[#A31631] flex-shrink-0" />{f}</li>
            ))}
            {saas.features.length > 3 && <li className="text-xs text-[#9C958A]">+{saas.features.length - 3} recursos inclusos</li>}
          </ul>
          {hasConsultoria && saas.id !== 'saas-1' && (
            <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 mb-3 text-[11px] text-green-700 leading-relaxed">
              <Check size={12} className="mt-0.5 text-green-600 flex-shrink-0" />
              <span>Módulo 1 já incluso na consultoria. Você está fazendo <strong>upgrade para {saas.name}</strong> com recursos adicionais.</span>
            </div>
          )}
          <PlanSelector plans={saasPlans} currentPlan={saas} onSelect={cart.addPlan} label="pacote" />
        </CollapsibleCard>
      )}

      {/* Módulo 1 incluso (quando tem consultoria mas não selecionou sistema) */}
      {!hasSaas && hasConsultoria && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-4">
          <div className="flex items-start gap-3">
            <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Módulo 1 incluso na consultoria</p>
              <p className="text-xs text-green-600 mt-1">{modulo1.subtitle} — R$ {modulo1.priceFormatted}/mês incluso durante o período.</p>
              <p className="text-[11px] text-green-600/80 mt-1">Ao finalizar a consultoria, o sistema continua ativo no cartão já autorizado. Você poderá fazer upgrade a qualquer momento.</p>
            </div>
          </div>
        </div>
      )}

      {/* Módulos avulsos */}
      {modulos.map((mod) => (
        <CollapsibleCard
          key={mod.id}
          label="Módulo avulso"
          name={mod.name}
          price={mod.priceFormatted}
          period="/mês"
          borderClass="border-[#A31631]/20"
          forceCollapsed={collapseAll}
          onRemove={() => cart.removePlan(mod.id)}
        >
          <p className="text-xs text-[#9C958A] mb-2">{mod.subtitle}</p>
          <ul className="space-y-1.5">
            {mod.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]"><Check size={12} className="mt-0.5 text-[#A31631] flex-shrink-0" />{f}</li>
            ))}
            {mod.features.length > 4 && <li className="text-xs text-[#9C958A]">+{mod.features.length - 4} recursos inclusos</li>}
          </ul>
        </CollapsibleCard>
      ))}

      {/* Sessões com consultores */}
      {cart.consultants.map((c) => (
        <ConsultantSlotCard key={c.id} cartConsultant={c} forceCollapsed={collapseAll} />
      ))}

      {/* Consultoria */}
      {hasConsultoria && (
        <CollapsibleCard
          label="Consultoria"
          name={consultoria!.name}
          price={consultoriaIsMensal ? consultoria!.priceFormatted : formatCurrency(getConsultoriaPixTotal(consultoria!))}
          period={consultoriaIsMensal ? '/mês' : ' à vista'}
          forceCollapsed={collapseAll}
          onRemove={() => cart.removePlan(consultoria!.id)}
        >
          <ul className="space-y-1.5 mb-3">
            {consultoria!.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]"><Check size={12} className="mt-0.5 text-[#A31631] flex-shrink-0" />{f}</li>
            ))}
            {consultoria!.features.length > 3 && <li className="text-xs text-[#9C958A]">+{consultoria!.features.length - 3} recursos inclusos</li>}
          </ul>
          {!consultoriaIsMensal && (
            <div className="space-y-1.5 mb-3">
              <div className="flex items-baseline justify-between text-xs text-[#9C958A]">
                <span>{consultoria!.months}x de R$ {consultoria!.priceFormatted}</span>
                <span>R$ {formatCurrency(getConsultoriaTotal(consultoria!))}</span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-green-600 font-medium">
                <span>Desconto Pix (3%)</span>
                <span>- R$ {formatCurrency(getConsultoriaPixDiscount(consultoria!))}</span>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-[11px] text-green-700 leading-relaxed">
            <Check size={12} className="mt-0.5 text-green-600 flex-shrink-0" />
            <span><strong>Módulo 1 do sistema incluso</strong> durante o período da consultoria. Módulos 2 e 3 podem ser contratados à parte. Ao final, o sistema continua no cartão já autorizado.</span>
          </div>
          <PlanSelector plans={consultoriaPlans} currentPlan={consultoria!} onSelect={cart.addPlan} label="consultoria" />
        </CollapsibleCard>
      )}

      {/* Addons */}
      {cart.addons.map((addon) => (
        <CollapsibleCard
          key={addon.id}
          label="Addon"
          name={addon.name}
          price="—"
          period=""
          borderClass="border-[#A31631]/20"
          forceCollapsed={collapseAll}
          onRemove={() => cart.removeAddon(addon.id)}
        >
          <p className="text-xs text-[#9C958A] leading-relaxed mb-2">{addon.description}</p>
          <div className="flex items-center gap-2 rounded-lg bg-[#A31631]/5 border border-[#A31631]/10 px-3 py-2 text-[11px] text-[#9C958A] leading-relaxed">
            <Check size={12} className="mt-0.5 text-[#A31631] flex-shrink-0" />
            <span><strong className="text-[#0E0E0F]">Consultor entrará em contato</strong> para ativar a integração.</span>
          </div>
        </CollapsibleCard>
      ))}

      {/* Adicionar/Upgrade Sistema — sempre visível quando não tem */}
      {!hasSaas && !hasConsultoria && (
        <button type="button" onClick={() => cart.addPlan(upsellSaas)}
          className="w-full flex items-center gap-3 rounded-xl border border-dashed border-[#A31631]/30 bg-[#A31631]/5 p-4 text-left hover:bg-[#A31631]/10 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-[#A31631]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#A31631]" /></div>
          <div>
            <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Sistema</p>
            <p className="text-xs text-[#9C958A]">{upsellSaas.name} — R$ {upsellSaas.priceFormatted}/mês</p>
          </div>
        </button>
      )}

      {/* Upgrade de módulo — quando tem consultoria (Módulo 1 já incluso) */}
      {!hasSaas && hasConsultoria && (
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Upgrade de sistema (opcional)
          </p>
          {saasPlans.filter((p) => p.id !== 'saas-1').map((plan) => (
            <button key={plan.id} type="button" onClick={() => cart.addPlan(plan)}
              className="w-full flex items-center justify-between gap-3 rounded-xl border border-dashed border-[#A31631]/30 bg-[#A31631]/5 p-4 text-left hover:bg-[#A31631]/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#A31631]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#A31631]" /></div>
                <div>
                  <p className="text-sm font-medium text-[#0E0E0F]">{plan.name} — {plan.subtitle}</p>
                  <p className="text-xs text-[#9C958A]">R$ {plan.priceFormatted}/mês adicional</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Adicionar Consultoria — sempre visível quando não tem */}
      {!hasConsultoria && (
        <div>
          <button type="button" onClick={() => setConsultoriaExpanded(!consultoriaExpanded)}
            className="w-full flex items-center justify-between gap-2 rounded-xl border border-dashed border-[#A31631]/30 bg-[#A31631]/5 p-4 text-left hover:bg-[#A31631]/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#A31631]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#A31631]" /></div>
              <div>
                <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Consultoria</p>
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
                    {plan.popular && <span className="ml-2 text-[10px] text-[#A31631] bg-[#A31631]/10 px-2 py-0.5 rounded-full">Popular</span>}
                  </div>
                  <span className="text-xs text-[#9C958A]">R$ {plan.priceFormatted}/mês</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── TOTAIS SEPARADOS ─── */}
      <div className="border-t border-[#0E0E0F]/10 pt-4 space-y-4">

        {/* Recorrente mensal */}
        {totalMensal > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Recorrente mensal
            </p>
            {hasSaas && (
              <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>{saas!.name}</span>
                {saasIsIncluded ? (
                  <span className="text-green-600 font-medium">Incluso</span>
                ) : (
                  <span>R$ {formatCurrency(saas!.price)}/mês</span>
                )}
              </div>
            )}
            {!hasSaas && hasConsultoria && (
              <div className="flex items-baseline justify-between text-sm text-green-600">
                <span>Módulo 1</span><span className="font-medium">Incluso</span>
              </div>
            )}
            {modulos.map((mod) => (
              <div key={mod.id} className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>{mod.name}</span><span>R$ {formatCurrency(mod.price)}/mês</span>
              </div>
            ))}
            {hasConsultoria && consultoriaIsMensal && (
              <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>{consultoria!.name}</span><span>R$ {formatCurrency(consultoria!.price)}/mês</span>
              </div>
            )}
            <div className="flex items-baseline justify-between pt-2 border-t border-[#0E0E0F]/5">
              <span className="text-sm font-semibold text-[#0E0E0F]">Total mensal</span>
              <span className="text-lg font-bold text-[#0E0E0F]">R$ {formatCurrency(totalMensal)}/mês</span>
            </div>
          </div>
        )}

        {/* Avulso / à parte */}
        {totalAvulso > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Pagamento avulso
            </p>
            {cart.consultants.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>Sessão ({c.name.split(' ')[0]})</span><span>R$ {formatCurrency(c.hourlyRate)}/hora</span>
              </div>
            ))}
            {hasConsultoria && !consultoriaIsMensal && (
              <div className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>{consultoria!.name} (Pix à vista)</span><span>R$ {formatCurrency(consultoriaAvulso)}</span>
              </div>
            )}
            <div className="flex items-baseline justify-between pt-2 border-t border-[#0E0E0F]/5">
              <span className="text-sm font-semibold text-[#0E0E0F]">Total à parte</span>
              <span className="text-lg font-bold text-[#0E0E0F]">R$ {formatCurrency(totalAvulso)}</span>
            </div>
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
