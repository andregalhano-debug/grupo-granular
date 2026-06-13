import { Check, Minus, Monitor, Handshake, ChevronRight, GraduationCap, CalendarDays, Star, Clock, Users, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { saasPlans, saasAddonFeatures, type Plan } from '../data/plans'
import type { Category } from './Modules'
import { useCategoryAccent } from '../stores/CategoryContext'

const saasCapacity: Record<string, string> = {
  'saas-1': 'Até 3 IDs e 3k pedidos/mês',
  'saas-2': 'Até 10 IDs e 10k pedidos/mês',
  'saas-3': 'Até 20 IDs e 50k pedidos/mês',
}

const featureLabels: Record<string, Record<string, string>> = {
  'Envio automático de Relatórios': {
    'saas-1': 'Semanal',
    'saas-2': 'Diário',
    'saas-3': 'Diário',
  },
}

/* Feature avulso — apenas Pessoas (RH) */
const featureAvulso: Record<string, { label: string; ctas: { text: string; link: string }[] }> = {
  'Gestão completa de pessoas (RH)': {
    label: 'Avulso',
    ctas: [{ text: '599/mês', link: '/checkout?plano=modulo-pessoas' }],
  },
}

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

/* ── Cards mobile: um card por plano com lista de features ── */
function MobileCards({
  plans,
  capacity,
  addonFeatures = [],
}: {
  plans: Plan[]
  capacity?: Record<string, string>
  addonFeatures?: string[]
}) {
  const allFeatures = getAllFeatures(plans)

  return (
    <div className="space-y-6 lg:hidden">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="rounded-2xl bg-white border border-[#9C958A]/20 overflow-hidden"
        >
          {/* Header do card */}
          <div className="p-6 text-center border-b border-[#9C958A]/10">
            <h3 className="text-lg font-bold text-[#0E0E0F] mb-1">{plan.name}</h3>
            {plan.subtitle && (
              <p className="text-xs text-[#9C958A] mb-1">{plan.subtitle}</p>
            )}
            {capacity?.[plan.id] && (
              <p className="text-[11px] font-medium text-[var(--accent)] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {capacity[plan.id]}
              </p>
            )}
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-4xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {plan.priceFormatted}
              </span>
              <span className="text-sm text-[#9C958A]">{plan.period}</span>
            </div>
          </div>

          {/* Features */}
          <div className="p-4">
            <ul className="space-y-2.5">
              {allFeatures.map((feature) => {
                const has = plan.features.includes(feature)
                const customLabel = featureLabels[feature]?.[plan.id]
                return (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    {has ? (
                      <>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-500/10 flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-green-600" />
                        </div>
                        <div>
                          <span className="text-[#0E0E0F]">
                            {feature}
                            {customLabel && (
                              <span className="ml-2 text-[11px] font-semibold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                                {customLabel}
                              </span>
                            )}
                          </span>
                          {featureAvulso[feature] && (
                            <div className="flex items-center gap-1.5 mt-1">
                              {featureAvulso[feature].ctas.map((cta) => (
                                <Link
                                  key={cta.link}
                                  to={cta.link}
                                  className="inline-flex items-center justify-center text-[10px] font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] w-[100px] py-1 rounded-full whitespace-nowrap transition-colors text-center"
                                >
                                  {cta.text}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <Minus size={14} className="text-[#9C958A]/40 flex-shrink-0 ml-0.5 mt-0.5" />
                        <span className="text-[#9C958A]/50 line-through">{feature}</span>
                      </>
                    )}
                  </li>
                )
              })}
              {/* Addon features — sempre com traço (contratação avulsa) */}
              {addonFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm pt-2 border-t border-dashed border-[#9C958A]/20 mt-2">
                  <Minus size={14} className="text-[#9C958A]/40 flex-shrink-0 ml-0.5" />
                  <span className="text-[#9C958A]/60 italic">{feature}</span>
                  <span className="text-[9px] font-medium uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full whitespace-nowrap">Avulso</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-4 pb-5">
            <Link
              to={`/checkout?plano=${plan.id}`}
              className="block text-center font-medium py-3 px-6 rounded-xl text-sm transition-colors border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            >
              {plan.cta}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Tabela comparativa desktop ── */
function DesktopTable({
  plans,
  capacity,
  addonFeatures = [],
}: {
  plans: Plan[]
  capacity?: Record<string, string>
  addonFeatures?: string[]
}) {
  const allFeatures = getAllFeatures(plans)

  return (
    <div className="max-w-6xl mx-auto hidden lg:block">
      {/* Header dos planos */}
      <div className="grid gap-0" style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}>
        <div className="p-4 flex items-end">
          <h4 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Módulos Avulsos
          </h4>
        </div>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 text-center rounded-t-2xl bg-white border-t border-x border-[#9C958A]/20"
          >
            <h3 className="text-lg font-bold mb-1 text-[#0E0E0F]">{plan.name}</h3>
            {plan.subtitle && (
              <p className="text-xs text-[#9C958A] mb-2">{plan.subtitle}</p>
            )}
            {capacity?.[plan.id] && (
              <p className="text-[11px] font-medium text-[var(--accent)] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {capacity[plan.id]}
              </p>
            )}
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-4xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {plan.priceFormatted}
              </span>
              <span className="text-sm text-[#9C958A]">{plan.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Linhas de features */}
      {allFeatures.map((feature, idx) => {
        const avulso = featureAvulso[feature]
        return (
          <div
            key={feature}
            className="grid gap-0"
            style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}
          >
            <div className={`flex items-center justify-between gap-2 px-4 py-3 text-sm text-[#0E0E0F] ${idx % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
              <span className="truncate">{feature}</span>
              {avulso && (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {avulso.ctas.map((cta) => (
                    <Link
                      key={cta.link}
                      to={cta.link}
                      className="inline-flex items-center justify-center text-[10px] font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] w-[100px] py-1 rounded-full whitespace-nowrap transition-colors text-center"
                    >
                      {cta.text}
                    </Link>
                  ))}
                </div>
              )}
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
        )
      })}

      {/* Addon features — linhas avulsas com traço em todos os planos */}
      {addonFeatures.length > 0 && (
        <>
          {/* Separador visual */}
          <div className="grid gap-0" style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}>
            <div className="px-4 py-1 border-t-2 border-dashed border-[#9C958A]/20" />
            {plans.map((plan) => (
              <div key={plan.id} className="px-4 py-1 border-t-2 border-dashed border-[#9C958A]/20 border-x border-x-[#9C958A]/10" />
            ))}
          </div>
          {addonFeatures.map((feature, idx) => {
            const rowIdx = allFeatures.length + idx
            return (
              <div
                key={feature}
                className="grid gap-0"
                style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}
              >
                <div className={`flex items-center gap-2 px-4 py-3 text-sm ${rowIdx % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                  <span className="text-[#0E0E0F]/70 italic">{feature}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full whitespace-nowrap">Avulso</span>
                </div>
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`flex items-center justify-center px-4 py-3 ${
                      rowIdx % 2 === 0 ? 'bg-[#F7F7F7] border-x border-[#9C958A]/10' : 'bg-white border-x border-[#9C958A]/10'
                    }`}
                  >
                    <Minus size={16} className="text-[#9C958A]/40" />
                  </div>
                ))}
              </div>
            )
          })}
        </>
      )}

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
              className="inline-block w-full font-medium py-3 px-6 rounded-xl text-sm transition-colors border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Timeline de consultoria ── */
const consultoriaSteps = [
  {
    months: '1 mês',
    label: 'Diagnóstico geral + primeiras ações',
    points: [
      '4 horas mensais com especialista',
      'Diagnóstico completo da operação',
      'Priorização de blocos pós-diagnóstico',
      'Plano de ação com metas e responsáveis',
      'Módulo 1 do sistema incluso',
    ],
  },
  {
    months: '3 meses',
    label: 'Transformação com acompanhamento',
    points: [
      '4 horas mensais com especialista',
      'Acompanhamento mensal contínuo',
      'Relatório semanal de evolução',
      'Suporte contínuo durante o período',
      'Ajustes no plano conforme evolução',
    ],
  },
  {
    months: '6 meses',
    label: 'Evolução completa com melhor custo',
    points: [
      '4 horas mensais com especialista',
      'Ciclo completo de transformação',
      'Visita in loco (negociada à parte)',
      'Módulo 1 do sistema incluso',
    ],
  },
]

/* ── Mentores de exemplo ── */
const sampleMentors = [
  {
    initials: 'CM',
    name: 'Carlos Mendes',
    specialty: 'Cardápio & Precificação',
    rating: 4.9,
    reviews: 47,
    years: 12,
    rate: 280,
    tags: ['Cardápio', 'CMV', 'Precificação'],
  },
  {
    initials: 'AP',
    name: 'Ana Paula Costa',
    specialty: 'Financeiro & DRE',
    rating: 4.8,
    reviews: 62,
    years: 9,
    rate: 320,
    tags: ['DRE', 'Fluxo de caixa', 'Custos'],
  },
  {
    initials: 'RL',
    name: 'Rodrigo Lima',
    specialty: 'iFood & Marketing Digital',
    rating: 4.9,
    reviews: 38,
    years: 7,
    rate: 250,
    tags: ['iFood', 'Marketing', 'Delivery'],
  },
]

interface Props {
  category?: Category
}

export function Pricing({ category = 'restaurantes' }: Props) {
  useCategoryAccent() // CSS vars on root drive styling
  return (
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Planos que cabem na sua operação
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Comece a transformação na gestão do seu negócio hoje mesmo. Invista no nosso módulo mais completo por menos que o custo de 1 funcionário.
          </p>
        </FadeIn>

        {/* SISTEMA */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
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

        {category === 'mercados' ? (
          /* Mercados: Sistema sob consulta (Televendas + Pessoas) */
          <FadeIn delay={100}>
            <div className="max-w-6xl mx-auto mb-24">
              <div className="rounded-2xl border border-[var(--accent)]/15 bg-white p-6 sm:p-8">
                <p className="text-base font-bold text-[#0E0E0F] mb-1.5">Sistema Granular Market — Sob consulta</p>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-6">
                  O sistema é precificado de acordo com o porte da operação, número de PDVs e módulos contratados. Entre em contato para receber uma proposta personalizada.
                </p>

                {/* Módulos avulsos */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 rounded-full bg-[var(--accent)]" />
                    <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wide">
                      Módulos disponíveis avulso
                    </p>
                  </div>
                  <div className="space-y-3">
                    {/* Televendas */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F7F7F7] border border-[#9C958A]/15">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                          <PhoneCall size={16} className="text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0E0E0F]">Televendas</p>
                          <p className="text-xs text-[#9C958A]">Proposta comercial em menos de 2 min com busca e controle de alçada</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <div className="text-right">
                          <span className="text-base font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R$ 419</span>
                          <span className="text-xs text-[#9C958A]">/mês</span>
                        </div>
                        <Link
                          to="/checkout?plano=modulo-televendas"
                          className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <PhoneCall size={12} />
                          Adicionar
                        </Link>
                      </div>
                    </div>

                    {/* Pessoas (RH) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F7F7F7] border border-[#9C958A]/15">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                          <Users size={16} className="text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0E0E0F]">Pessoas (RH)</p>
                          <p className="text-xs text-[#9C958A]">Recrutamento, escalas, documentos e desempenho</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <div className="text-right">
                          <span className="text-base font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R$ 599</span>
                          <span className="text-xs text-[#9C958A]">/mês</span>
                        </div>
                        <Link
                          to="/checkout?plano=modulo-pessoas"
                          className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <Users size={12} />
                          Adicionar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/agendar-demo"
                  className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  <CalendarDays size={16} />
                  Agendar Demonstração
                </Link>
              </div>
            </div>
          </FadeIn>
        ) : (category === 'farmacias' || category === 'petshop') ? (
          /* Farmácias / Pet Shop: Sistema sob consulta (só Pessoas) */
          <FadeIn delay={100}>
            <div className="max-w-6xl mx-auto mb-24">
              <div className="rounded-2xl border border-[var(--accent)]/15 bg-white p-6 sm:p-8">
                <p className="text-base font-bold text-[#0E0E0F] mb-1.5">
                  Sistema {category === 'farmacias' ? 'Granular Farma' : 'Granular PET'} — Sob consulta
                </p>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-6">
                  O sistema é precificado de acordo com o porte da operação e módulos contratados. Entre em contato para receber uma proposta personalizada.
                </p>

                {/* Módulo avulso */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 rounded-full bg-[var(--accent)]" />
                    <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wide">
                      Módulo disponível avulso
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F7F7F7] border border-[#9C958A]/15">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                        <Users size={16} className="text-[var(--accent)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0E0E0F]">Pessoas (RH)</p>
                        <p className="text-xs text-[#9C958A]">Recrutamento, escalas, documentos e desempenho</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:flex-shrink-0">
                      <div className="text-right">
                        <span className="text-base font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R$ 599</span>
                        <span className="text-xs text-[#9C958A]">/mês</span>
                      </div>
                      <Link
                        to="/checkout?plano=modulo-pessoas"
                        className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Users size={12} />
                        Adicionar
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  to="/agendar-demo"
                  className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  <CalendarDays size={16} />
                  Agendar Demonstração
                </Link>
              </div>
            </div>
          </FadeIn>
        ) : (
          /* Restaurantes: tabela padrão */
          <FadeIn delay={100} className="mb-8">
            <DesktopTable plans={saasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} />
            <MobileCards plans={saasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} />
          </FadeIn>
        )}

        <div className="mb-24" />

        {/* CONSULTORIA */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <Handshake size={22} className="text-[#F7F7F7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0E0E0F]">Especialista sob demanda</h3>
                <p className="text-sm text-[#9C958A]">Especialistas transformando sua operação</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-[#9C958A]/30 ml-4" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={50}>
          <div className="max-w-6xl mx-auto mb-10 rounded-xl bg-[#0E0E0F]/[0.03] border border-[#9C958A]/15 p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-[#0E0E0F] leading-relaxed">
              Após o diagnóstico inicial, especialista e cliente definem juntos quais blocos serão priorizados — de acordo com as necessidades do negócio e o tempo contratado.
            </p>
          </div>
        </FadeIn>

        {/* Timeline de consultoria */}
        <FadeIn delay={80}>
          <div className="max-w-6xl mx-auto mb-10">
            {/* Linha do tempo desktop */}
            <div className="hidden sm:block">
              <div className="relative flex items-stretch justify-between gap-4">
                {/* Linha conectora */}
                <div className="absolute top-5 left-[calc(16.66%)] right-[calc(16.66%)] h-0.5 bg-[var(--accent)]/20" />
                {consultoriaSteps.map((step) => (
                  <div key={step.months} className="flex-1 flex flex-col">
                    {/* Nó */}
                    <div className="relative z-10 flex flex-col items-center mb-5">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-md shadow-[var(--accent-20)] mb-3">
                        <Clock size={18} className="text-white" />
                      </div>
                      <span
                        className="text-sm font-bold text-[var(--accent)]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {step.months}
                      </span>
                    </div>
                    {/* Card do step — flex-1 garante mesma altura em todos */}
                    <div className="flex-1 w-full rounded-2xl border bg-white p-5 border-[#9C958A]/20">
                      <p className="text-xs font-semibold text-[#0E0E0F] mb-3 leading-snug">{step.label}</p>
                      <ul className="space-y-1.5">
                        {step.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs text-[#9C958A]">
                            <Check size={11} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: stack vertical */}
            <div className="sm:hidden space-y-4">
              {consultoriaSteps.map((step, idx) => (
                <div key={step.months} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 shadow-md shadow-[var(--accent-20)]">
                      <Clock size={16} className="text-white" />
                    </div>
                    {idx < consultoriaSteps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-[var(--accent)]/15 my-1" />
                    )}
                  </div>
                  <div className={`flex-1 rounded-2xl border bg-white p-4 mb-1 ${idx === 2 ? 'border-[var(--accent)]/30' : 'border-[#9C958A]/20'}`}>
                    <p className="text-sm font-bold text-[var(--accent)] mb-1">{step.months}</p>
                    <p className="text-xs font-semibold text-[#0E0E0F] mb-2">{step.label}</p>
                    <ul className="space-y-1">
                      {step.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-[#9C958A]">
                          <Check size={11} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Sob consulta CTA */}
        <FadeIn delay={120}>
          <div className="max-w-6xl mx-auto mb-24">
            <div className="rounded-2xl border border-[var(--accent)]/15 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-[#0E0E0F] mb-1.5">Precificação sob consulta</p>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-4">
                  Os planos são personalizados de acordo com a realidade da sua operação.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Diagnóstico da operação', 'Plano de ação', 'Relatório semanal', 'Módulo 1 incluso', 'Suporte contínuo', 'Visita in loco'].map((f) => (
                    <span key={f} className="text-xs bg-[#F7F7F7] text-[#0E0E0F] px-3 py-1 rounded-full border border-[#9C958A]/20">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/agendar-demo"
                className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
              >
                <CalendarDays size={16} />
                Agendar Demonstração
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* ESPECIALISTA SOB DEMANDA */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <GraduationCap size={22} className="text-[#F7F7F7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0E0E0F]">Mentoria Granular</h3>
                <p className="text-sm text-[#9C958A]">
                  {category === 'mercados'
                    ? 'Conecte-se com mentores do varejo e atacarejo'
                    : category === 'farmacias'
                    ? 'Conecte-se com mentores do setor farmacêutico'
                    : category === 'petshop'
                    ? 'Conecte-se com mentores do setor pet'
                    : 'Conecte-se com mentores do food service'}
                </p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-[#9C958A]/30 ml-4" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={50}>
          <div className="max-w-6xl mx-auto mb-8 rounded-xl bg-[#0E0E0F]/[0.03] border border-[#9C958A]/15 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0E0E0F] mb-2">O que são os Mentores Granular?</p>
                <p className="text-sm text-[#0E0E0F]/80 leading-relaxed">
                  Os Mentores Granular conectam operadores do food service com profissionais que já resolveram os mesmos desafios.
                  São sessões sob demanda em áreas como cardápio, iFood, financeiro, RH e operação — sem vínculo de prazo,
                  com foco em decisões estratégicas pontuais.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-xl px-4 py-3 flex-shrink-0">
                <Users size={18} className="text-[var(--accent)]" />
                <div>
                  <p className="text-xs font-bold text-[#0E0E0F]">Você é mentor?</p>
                  <p className="text-xs text-[#9C958A]">Faça parte da rede Granular</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Cards de mentores (exemplo) */}
        <FadeIn delay={80}>
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-6">
              <p
                className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest whitespace-nowrap"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Exemplo de Mentores
              </p>
              <div className="flex-1 h-px bg-[#9C958A]/25" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleMentors.map((mentor) => (
                <div
                  key={mentor.name}
                  className="rounded-2xl border border-[#9C958A]/20 bg-white p-5 hover:border-[var(--accent)]/30 hover:shadow-md transition-all"
                >
                  {/* Avatar + nome */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[var(--accent)]">{mentor.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#0E0E0F] truncate">{mentor.name}</p>
                      <p className="text-xs text-[#9C958A] truncate">{mentor.specialty}</p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-[#0E0E0F]">{mentor.rating}</span>
                    <span className="text-xs text-[#9C958A]">({mentor.reviews} avaliações)</span>
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-[#F7F7F7] text-[#9C958A] px-2.5 py-1 rounded-full border border-[#9C958A]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#9C958A]/10">
                    <div>
                      <span
                        className="text-lg font-bold text-[#0E0E0F]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        R$ {mentor.rate}
                      </span>
                      <span className="text-xs text-[#9C958A]">/hora</span>
                    </div>
                    <span className="text-xs text-[#9C958A]">{mentor.years} anos exp.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA Seja um especialista */}
        <FadeIn delay={120}>
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-[var(--accent)]/15 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={24} className="text-[var(--accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-[#0E0E0F] mb-1">Seja um Mentor Granular</p>
                <p className="text-sm text-[#9C958A] leading-relaxed">
                  Compartilhe sua experiência com operadores do food service, defina sua disponibilidade e valor por hora, e faça parte de uma rede de mentores em crescimento.
                </p>
              </div>
              <Link
                to="/seja-consultor"
                className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
              >
                Quero ser mentor
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
