import { useState, useRef, useEffect } from 'react'
import { Plus, Check, Monitor, Package, ChevronDown } from 'lucide-react'
import { saasPlans, moduloPlans, type Plan } from '../../data/plans'
import { useCart } from '../../stores/useCartStore'

interface QuickAddItemProps {
  plan: Plan
  inCart: boolean
  onAdd: () => void
}

function QuickAddItem({ plan, inCart, onAdd }: QuickAddItemProps) {
  return (
    <button
      type="button"
      onClick={inCart ? undefined : onAdd}
      disabled={inCart}
      className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors ${
        inCart
          ? 'bg-green-50/50 cursor-default'
          : 'hover:bg-[#A31631]/5 cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {inCart ? (
          <Check size={14} className="text-green-500 flex-shrink-0" />
        ) : (
          <Plus size={14} className="text-[#A31631] flex-shrink-0" />
        )}
        <span className={`text-xs truncate ${inCart ? 'text-green-700' : 'text-[#0E0E0F]'}`}>
          {plan.name}
        </span>
      </div>
      <span className={`text-[11px] flex-shrink-0 ml-2 ${inCart ? 'text-green-500 font-medium' : 'text-[#9C958A]'}`}>
        {inCart ? 'No carrinho' : `R$ ${plan.priceFormatted}${plan.period}`}
      </span>
    </button>
  )
}

export function QuickAddBar() {
  const cart = useCart()
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

  const sections = [
    {
      id: 'sistema',
      label: 'Sistema',
      icon: Monitor,
      plans: saasPlans,
      addFn: (plan: Plan) => cart.addPlan(plan),
    },
    {
      id: 'modulos',
      label: 'Módulos',
      icon: Package,
      plans: moduloPlans,
      addFn: (plan: Plan) => cart.addPlan(plan),
    },
  ]

  return (
    <div
      ref={containerRef}
      className="rounded-2xl border border-[#A31631]/20 bg-white overflow-hidden mb-4 shadow-sm shadow-[#A31631]/5"
    >
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#A31631]/[0.04] border-b border-[#A31631]/10">
        <div className="w-7 h-7 rounded-lg bg-[#A31631] flex items-center justify-center flex-shrink-0">
          <Plus size={14} className="text-white" />
        </div>
        <p className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">
          Adicionar ao pedido
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
                  ? 'text-[#A31631] border-[#A31631] bg-[#A31631]/[0.03]'
                  : 'text-[#9C958A] border-transparent hover:text-[#0E0E0F]'
              }`}
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
