import { Check, Minus, Monitor, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { saasPlans, consultoriaPlans, type Plan } from '../data/plans'

const saasHighlights: Record<string, string> = {
  'saas-1': 'Portal granular iFood, focado na estratégia comercial, controle da venda e operação, com foco na sua margem de lucro.',
  'saas-2': 'Tenha uma profundidade ainda maior no controle de estoque e aplique os checklists operacionais.',
  'saas-3': 'Gerencie seu negócio de ponta a ponta, com controle e escala, investindo menos que o custo de 1 funcionário.',
}

const saasCapacity: Record<string, string> = {
  'saas-1': 'Até 3 IDs e 3k pedidos/mês',
  'saas-2': 'Até 10 IDs e 10k pedidos/mês',
  'saas-3': 'Até 20 IDs e 50k pedidos/mês',
}

// Texto customizado por feature+plano (em vez de check, mostra o texto)
const featureLabels: Record<string, Record<string, string>> = {
  'Relatórios': {
    'saas-1': 'Mensal',
    'saas-2': 'Semanal',
    'saas-3': 'Semanal',
  },
}

// Extrai todas as features únicas na ordem em que aparecem (do plano mais completo para o menor)
function getAllFeatures(plans: Plan[]): string[] {
  const seen = new Set<string>()
  const all: string[] = []
  for (const plan of [...plans].reverse()) {
    for (const f of plan.features) {
      if (!seen.has(f)) {
        seen.add(f)
        all.push(f)
      }
    }
  }
  return all
}

function ComparisonTable({
  plans,
  highlights,
  capacity,
}: {
  plans: Plan[]
  highlights?: Record<string, string>
  capacity?: Record<string, string>
}) {
  const allFeatures = getAllFeatures(plans)

  return (
    <div className="max-w-6xl mx-auto overflow-x-auto">
      <div className="min-w-[640px]">
        {/* Header dos planos */}
        <div className="grid gap-0" style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}>
          <div className="p-4" />
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="p-6 text-center rounded-t-2xl bg-white border-t border-x border-[#9C958A]/20"
            >
              <h3 className="text-lg font-bold mb-1 text-[#0E0E0F]">
                {plan.name}
              </h3>
              {plan.subtitle && (
                <p className="text-xs text-[#9C958A] mb-2">
                  {plan.subtitle}
                </p>
              )}
              {capacity?.[plan.id] && (
                <p className="text-[11px] font-medium text-[#A31631] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {capacity[plan.id]}
                </p>
              )}
              {highlights?.[plan.id] && (
                <div className="rounded-lg px-3 py-2 mb-3 bg-[#A31631]/5 border border-[#A31631]/15">
                  <p className="text-[11px] leading-relaxed font-medium text-[#A31631]">
                    {highlights[plan.id]}
                  </p>
                </div>
              )}
              <div className="flex items-baseline justify-center gap-0.5">
                <span
                  className="text-4xl font-bold text-[#0E0E0F]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {plan.priceFormatted}
                </span>
                <span className="text-sm text-[#9C958A]">
                  {plan.period}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Linhas de features */}
        {allFeatures.map((feature, idx) => (
          <div
            key={feature}
            className="grid gap-0"
            style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}
          >
            <div className={`flex items-center px-4 py-3 text-sm text-[#0E0E0F] ${idx % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
              {feature}
            </div>
            {plans.map((plan) => {
              const has = plan.features.includes(feature)
              const customLabel = featureLabels[feature]?.[plan.id]
              return (
                <div
                  key={plan.id}
                  className={`flex items-center justify-center px-4 py-3 ${
                    idx % 2 === 0 ? 'bg-[#F7F7F7] border-x border-[#9C958A]/10' : 'bg-white border-x border-[#9C958A]/10'
                  }`}
                >
                  {has ? (
                    customLabel ? (
                      <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">
                        {customLabel}
                      </span>
                    ) : (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500/10">
                        <Check size={14} className="text-green-600" />
                      </div>
                    )
                  ) : (
                    <Minus size={16} className="text-[#9C958A]/40" />
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* CTAs */}
        <div className="grid gap-0" style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}>
          <div className="p-4" />
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="p-6 text-center rounded-b-2xl bg-white border-b border-x border-[#9C958A]/20"
            >
              <Link
                to={`/checkout?plano=${plan.id}`}
                className="inline-block w-full font-medium py-3 px-6 rounded-xl text-sm transition-colors border border-[#A31631] text-[#A31631] hover:bg-[#A31631] hover:text-white"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Planos que cabem na sua operação
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Comece agora a transformação na gestão do seu negócio investindo menos que o custo de 1 funcionário.
          </p>
        </FadeIn>

        {/* SISTEMA */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#A31631] flex items-center justify-center">
                <Monitor size={22} className="text-[#F7F7F7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0E0E0F]">Sistema</h3>
                <p className="text-sm text-[#9C958A]">Plataforma SaaS para gestão da sua operação</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-[#9C958A]/30 ml-4" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100} className="mb-24">
          <ComparisonTable plans={saasPlans} highlights={saasHighlights} capacity={saasCapacity} />
        </FadeIn>

        {/* CONSULTORIA */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#A31631] flex items-center justify-center">
                <Handshake size={22} className="text-[#F7F7F7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0E0E0F]">Consultoria</h3>
                <p className="text-sm text-[#9C958A]">Especialistas transformando sua operação</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-[#9C958A]/30 ml-4" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <ComparisonTable plans={consultoriaPlans} />
        </FadeIn>
      </div>
    </section>
  )
}
