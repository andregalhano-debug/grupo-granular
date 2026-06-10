import { Check, Plus, X, ChevronDown, CalendarDays, Star, AlertCircle, ChevronsDownUp, Monitor } from 'lucide-react'
import { useState, useEffect } from 'react'
import { saasPlans } from '../../data/plans'
import type { Plan } from '../../data/plans'
import { getConsultantById } from '../../data/consultants'
import { formatCurrency } from '../../utils/formatters'
import { useCart } from '../../stores/useCartStore'
import type { PaymentMethod } from '../../hooks/useCheckoutForm'
import { MiniCalendar } from '../MiniCalendar'
import { QuickAddBar } from './QuickAddBar'

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

function CollapsibleCard({ label, name, price, period, borderClass, children, onRemove, forceToggle }: {
  label: string
  name: string
  price: string
  period: string
  borderClass?: string
  children: React.ReactNode
  onRemove?: () => void
  forceToggle?: { count: number; expand: boolean }
}) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (forceToggle && forceToggle.count > 0) setExpanded(forceToggle.expand)
  }, [forceToggle])

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

function ConsultantSlotCard({ cartConsultant, forceToggle }: { cartConsultant: { id: string; name: string; title: string; rating: number; hourlyRate: number; slot: string | null }; forceToggle?: { count: number; expand: boolean } }) {
  const cart = useCart()
  const c = cartConsultant

  const consultant = getConsultantById(c.id)
  const needsSlot = !c.slot

  return (
    <CollapsibleCard
      label="Sessão com Mentor"
      name={c.name}
      price={String(c.hourlyRate)}
      period="/hora"
      borderClass={needsSlot ? 'border-amber-300' : 'border-[#A31631]/20'}
      forceToggle={forceToggle}
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
          {consultant && (
            <MiniCalendar
              slots={consultant.slots}
              selectedSlot={c.slot}
              onSelectSlot={(key) => cart.updateConsultantSlot(c.id, key)}
              compact
            />
          )}
        </div>
      )}
    </CollapsibleCard>
  )
}

export function OrderSummary({ paymentMethod: _paymentMethod }: OrderSummaryProps) {
  const cart = useCart()
  const [toggleAll, setToggleAll] = useState({ count: 0, expand: false })
  const allExpanded = toggleAll.expand

  const saas = cart.plans.find((p) => p.type === 'saas')
  const modulos = cart.plans.filter((p) => p.type === 'modulo')
  const hasSaas = !!saas
  const hasConsultants = cart.consultants.length > 0

  const upsellSaas = saasPlans.find((p) => p.popular) || saasPlans[0]

  // Cálculos de totais
  const totalMensal = (saas ? saas.price : 0) + modulos.reduce((sum, m) => sum + m.price, 0)
  const totalAvulso = cart.consultants.reduce((sum, c) => sum + c.hourlyRate, 0)

  return (
    <div className="space-y-0">
      <QuickAddBar />

    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0E0E0F]">Resumo do pedido</h2>
        <button
          type="button"
          onClick={() => setToggleAll((prev) => ({ count: prev.count + 1, expand: !prev.expand }))}
          className="flex items-center gap-1.5 text-[10px] font-medium text-[#9C958A] hover:text-[#A31631] transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-[#A31631]/5"
        >
          <ChevronsDownUp size={12} />
          {allExpanded ? 'Recolher todos' : 'Expandir todos'}
        </button>
      </div>

      {/* ═══════════ SEÇÃO: SISTEMA ═══════════ */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#A31631] flex items-center justify-center flex-shrink-0">
            <Monitor size={16} className="text-white" />
          </div>
          <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Sistema</h3>
          <div className="flex-1 h-px bg-[#0E0E0F]/10" />
        </div>

        {/* Plano de sistema */}
        {saas && (
          <CollapsibleCard
            label="Plano"
            name={saas.name}
            price={saas.priceFormatted}
            period="/mês"
            forceToggle={toggleAll}
            onRemove={cart.plans.length > 1 || hasConsultants ? () => cart.removePlan(saas.id) : undefined}
          >
            <ul className="space-y-1.5 mb-3">
              {saas.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-[#9C958A]"><Check size={12} className="mt-0.5 text-[#A31631] flex-shrink-0" />{f}</li>
              ))}
              {saas.features.length > 3 && <li className="text-xs text-[#9C958A]">+{saas.features.length - 3} recursos inclusos</li>}
            </ul>
            <PlanSelector plans={saasPlans} currentPlan={saas} onSelect={cart.addPlan} label="pacote" />
          </CollapsibleCard>
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
            forceToggle={toggleAll}
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

        {/* Addons (sistema) */}
        {cart.addons.map((addon) => (
          <CollapsibleCard
            key={addon.id}
            label="Addon"
            name={addon.name}
            price="—"
            period=""
            borderClass="border-[#A31631]/20"
            forceToggle={toggleAll}
            onRemove={() => cart.removeAddon(addon.id)}
          >
            <p className="text-xs text-[#9C958A] leading-relaxed mb-2">{addon.description}</p>
            <div className="flex items-center gap-2 rounded-lg bg-[#A31631]/5 border border-[#A31631]/10 px-3 py-2 text-[11px] text-[#9C958A] leading-relaxed">
              <Check size={12} className="mt-0.5 text-[#A31631] flex-shrink-0" />
              <span><strong className="text-[#0E0E0F]">Consultor entrará em contato</strong> para ativar a integração.</span>
            </div>
          </CollapsibleCard>
        ))}

        {/* Sessões com consultores */}
        {cart.consultants.map((c) => (
          <ConsultantSlotCard key={c.id} cartConsultant={c} forceToggle={toggleAll} />
        ))}

        {/* Adicionar Sistema */}
        {!hasSaas && (
          <button type="button" onClick={() => cart.addPlan(upsellSaas)}
            className="w-full flex items-center gap-3 rounded-xl border border-dashed border-[#A31631]/30 bg-[#A31631]/5 p-4 text-left hover:bg-[#A31631]/10 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#A31631]/10 flex items-center justify-center flex-shrink-0"><Plus size={16} className="text-[#A31631]" /></div>
            <div>
              <p className="text-sm font-medium text-[#0E0E0F]">Adicionar Sistema</p>
              <p className="text-xs text-[#9C958A]">{upsellSaas.name} — R$ {upsellSaas.priceFormatted}/mês</p>
            </div>
          </button>
        )}
      </div>

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
                <span>R$ {formatCurrency(saas!.price)}/mês</span>
              </div>
            )}
            {modulos.map((mod) => (
              <div key={mod.id} className="flex items-baseline justify-between text-sm text-[#9C958A]">
                <span>{mod.name}</span><span>R$ {formatCurrency(mod.price)}/mês</span>
              </div>
            ))}
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
    </div>
  )
}
