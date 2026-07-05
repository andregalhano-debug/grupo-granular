import { useState, useRef, useEffect } from 'react'
import { Plus, Check, Monitor, Package, ChevronDown } from 'lucide-react'
import { saasPlans, moduloPlans, type Plan } from '../../data/plans'
import { useCart } from '../../stores/useCartStore'
import { useT } from '../../i18n/useT'
import type { Category } from '../Modules'

interface QuickAddItemProps {
  plan: Plan
  inCart: boolean
  onAdd: () => void
}

function QuickAddItem({ plan, inCart, onAdd }: QuickAddItemProps) {
  const { checkout: { quickAdd: qa } } = useT()
  return (
    <button
      type="button"
      onClick={inCart ? undefined : onAdd}
      disabled={inCart}
      className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors ${
        inCart
          ? 'bg-green-50/50 cursor-default'
          : 'hover:bg-[var(--accent-05)] cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {inCart ? (
          <Check size={14} className="text-green-500 flex-shrink-0" />
        ) : (
          <Plus size={14} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
        )}
        <span className={`text-xs truncate ${inCart ? 'text-green-700' : 'text-[#0E0E0F]'}`}>
          {plan.name}
        </span>
      </div>
      <span className={`text-[11px] flex-shrink-0 ml-2 ${inCart ? 'text-green-500 font-medium' : 'text-[#9C958A]'}`}>
        {inCart ? qa.inCart : `R$ ${plan.priceFormatted}${plan.period}`}
      </span>
    </button>
  )
}

interface QuickAddBarProps {
  category?: Category
}

export function QuickAddBar({ category = 'restaurantes' }: QuickAddBarProps) {
  const cart = useCart()
  const { checkout: { quickAdd: qa } } = useT()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const cartPlanIds = new Set(cart.plans.map((p) => p.id))

  // Fecha ao clicar fora
  useEffect(() => {
    if (!openSection) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenSection(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [openSection])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  // Rótulo dinâmico: mostra o nome do plano no carrinho (ou o primeiro se houver mais de um)
  const getSectionLabel = (_sectionId: string, defaultLabel: string, plans: Plan[]) => {
    const inCartPlans = plans.filter((p) => cartPlanIds.has(p.id))
    if (inCartPlans.length === 0) return defaultLabel
    if (inCartPlans.length === 1) return inCartPlans[0].name
    return `${inCartPlans[0].name} +${inCartPlans.length - 1}`
  }

  // Televendas é exclusivo do segmento Mercados
  const filteredModuloPlans = moduloPlans.filter(
    (p) => p.id !== 'modulo-televendas' || category === 'mercados'
  )

  const sections = [
    {
      id: 'sistema',
      label: qa.system,
      icon: Monitor,
      plans: saasPlans.filter(p => p.id !== 'saas-3'),
      addFn: (plan: Plan) => cart.addPlan(plan),
    },
    {
      id: 'modulos',
      label: qa.modules,
      icon: Package,
      plans: filteredModuloPlans,
      addFn: (plan: Plan) => cart.addPlan(plan),
    },
  ]

  return (
    <div
      ref={containerRef}
      className="rounded-2xl border border-[var(--accent-20)] bg-white overflow-hidden mb-4 shadow-sm"
    >
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[var(--accent-05)] border-b border-[var(--accent-10)]">
        <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
          <Plus size={14} className="text-white" />
        </div>
        <p className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">
          {qa.title}
        </p>
      </div>

      {/* Botões de categoria lado a lado */}
      <div className="flex border-b border-[#0E0E0F]/5">
        {sections.map((section) => {
          const isOpen = openSection === section.id
          const Icon = section.icon
          const itemsInCart = section.plans.filter((p) => cartPlanIds.has(p.id)).length
          const displayLabel = getSectionLabel(section.id, section.label, section.plans)
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => toggleSection(section.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors cursor-pointer border-b-2 ${
                isOpen
                  ? 'border-b-[var(--accent)] bg-[var(--accent-05)]'
                  : 'text-[#9C958A] border-transparent hover:text-[#0E0E0F]'
              }`}
              style={isOpen ? { color: 'var(--accent)', borderBottomColor: 'var(--accent)' } : {}}
            >
              <Icon size={14} />
              <span className="truncate max-w-[80px]">{displayLabel}</span>
              {itemsInCart > 0 && (
                <span className="w-4 h-4 rounded-full bg-green-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                  {itemsInCart}
                </span>
              )}
              <ChevronDown size={12} className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          )
        })}
      </div>

      {/* Lista de itens da categoria aberta */}
      {openSection && (
        <div className="divide-y divide-[#0E0E0F]/5">
          {sections.find((s) => s.id === openSection)?.plans.map((plan) => (
            <QuickAddItem
              key={plan.id}
              plan={plan}
              inCart={cartPlanIds.has(plan.id)}
              onAdd={() => {
                sections.find((s) => s.id === openSection)?.addFn(plan)
                setOpenSection(null)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
