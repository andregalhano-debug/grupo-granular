import { Check, Minus, Monitor, Star, Users, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { saasPlans, saasAddonFeatures, type Plan } from '../data/plans'
import type { Category } from './Modules'
import { useCategoryAccent } from '../stores/CategoryContext'
import { useT } from '../i18n/useT'
import { modulesDataMercadosCFTV } from '../data/modulesData'
import { SecuritySection } from './home/SecuritySection'

type BillingCycle = 'monthly' | 'annual'

// Enquanto refinamos os preços, os 3 módulos SaaS ficam "Sob consulta" (preço oculto,
// CTA leva ao formulário de contato). Reverter: reduzir o Set para new Set(['saas-3']).
const SOB_CONSULTA_IDS = new Set(['saas-1', 'saas-2', 'saas-3'])
function isSobConsulta(plan: Plan): boolean {
  return SOB_CONSULTA_IDS.has(plan.id)
}

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

/* Feature avulso — apenas Pessoas (RH): built dynamically in Pricing component */

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
  billingCycle = 'annual',
  category = 'restaurantes',
  plan3ConsultFeatures = [],
}: {
  plans: Plan[]
  capacity?: Record<string, string>
  addonFeatures?: string[]
  billingCycle?: BillingCycle
  category?: string
  plan3ConsultFeatures?: string[]
}) {
  const t = useT()
  const allFeatures = getAllFeatures(plans)
  const featureAvulso: Record<string, { label: string; ctas: { text: string; link: string }[] }> = category === 'mercados' ? {} : {
    [t.plansData.addonPessoas]: {
      label: 'Avulso',
      ctas: [{ text: 'Sob consulta', link: '/agendar-demo' }],
    },
  }

  return (
    <div className="space-y-6 lg:hidden">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-2xl bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
            plan.popular
              ? 'border-2 border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10'
              : 'border border-[#9C958A]/20'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-px left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-b-lg" style={{ animation: 'badgePulse 2.5s ease-in-out infinite' }}>
                <Star size={9} fill="currentColor" /> {t.pricingExtended.mostChosen}
              </span>
            </div>
          )}
          {/* Header do card */}
          <div className={`p-6 text-center border-b border-[#9C958A]/10 ${plan.popular ? 'pt-8' : ''}`}>
            <h3 className="text-lg font-bold text-[#0E0E0F] mb-1">{plan.name}</h3>
            {plan.subtitle && (
              <p className="text-xs text-[#9C958A] mb-1">{plan.subtitle}</p>
            )}
            {capacity?.[plan.id] && (
              <p className="text-[11px] font-medium text-[var(--accent)] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {capacity[plan.id]}
              </p>
            )}
            {isSobConsulta(plan) ? (
              <div className="mt-1">
                <span className="text-xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.pricingExtended.onRequest}</span>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-4xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {billingCycle === 'monthly' && plan.monthlyPriceFormatted
                      ? plan.monthlyPriceFormatted
                      : plan.priceFormatted}
                  </span>
                  <span className="text-sm text-[#9C958A]">{plan.period}</span>
                </div>
                {billingCycle === 'annual' && plan.monthlyPrice && (
                  <p className="text-xs text-[#9C958A] mt-1">
                    <span className="line-through">R${plan.monthlyPriceFormatted}</span>
                    <span className="ml-1 text-green-600 font-medium">no mensal</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="p-4">
            <ul className="space-y-2.5">
              {(() => {
                const LAST_FEATURE = 'Envio automático de Relatórios'
                const head = allFeatures.filter(f => f !== LAST_FEATURE)
                const hasLast = allFeatures.includes(LAST_FEATURE)
                const merged: Array<{ feature: string; isP3: boolean }> = [
                  ...head.map(f => ({ feature: f, isP3: false })),
                  ...plan3ConsultFeatures.map(f => ({ feature: f, isP3: true })),
                  ...(hasLast ? [{ feature: LAST_FEATURE, isP3: false }] : []),
                ]
                return merged.map(({ feature, isP3 }) => {
                  const has = isP3 ? plan.id === 'saas-3' : plan.features.includes(feature)
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
                                  <Link key={cta.link} to={cta.link} className="inline-flex items-center justify-center text-[10px] font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] w-[100px] py-1 rounded-full whitespace-nowrap transition-colors text-center">
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
                })
              })()}
              {/* Addon features — sempre com traço (contratação avulsa) */}
              {addonFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm pt-2 border-t border-dashed border-[#9C958A]/20 mt-2">
                  <Minus size={14} className="text-[#9C958A]/40 flex-shrink-0 ml-0.5" />
                  <span className="text-[#9C958A]/60 italic">{feature}</span>
                  <span className="text-[9px] font-medium uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full whitespace-nowrap">{t.pricingExtended.modulesAvulsos}</span>
                </li>
              ))}
              {/* Plano 3 sob consulta features — renderizadas antes de "Envio automático de Relatórios" */}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-4 pb-5">
            <Link
              to={isSobConsulta(plan) ? '/agendar-demo' : `/checkout?plano=${plan.id}&segmento=${category}`}
              className="flex items-center justify-center w-full h-11 font-medium px-4 rounded-xl text-sm transition-colors border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white whitespace-nowrap"
            >
              {isSobConsulta(plan) ? t.pricingExtended.scheduleDemo : plan.cta}
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
  billingCycle = 'annual',
  category = 'restaurantes',
  plan3ConsultFeatures = [],
}: {
  plans: Plan[]
  capacity?: Record<string, string>
  addonFeatures?: string[]
  billingCycle?: BillingCycle
  category?: string
  plan3ConsultFeatures?: string[]
}) {
  const t = useT()
  const allFeatures = getAllFeatures(plans)
  const featureAvulso: Record<string, { label: string; ctas: { text: string; link: string }[] }> = category === 'mercados' ? {} : {
    [t.plansData.addonPessoas]: {
      label: 'Avulso',
      ctas: [{ text: 'Sob consulta', link: '/agendar-demo' }],
    },
  }

  return (
    <div className="max-w-6xl mx-auto hidden lg:block">
      {/* Header dos planos */}
      <div className="grid gap-0" style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}>
        <div className="p-4 flex items-end">
          <h4 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {t.pricingExtended.modulesAvulsos}
          </h4>
        </div>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 text-center rounded-t-2xl bg-white border-t border-x transition-all duration-200 hover:-translate-y-0.5 ${
              plan.popular
                ? 'border-[var(--accent)] border-x-[var(--accent)] shadow-lg shadow-[var(--accent)]/10'
                : 'border-[#9C958A]/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-px left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-b-lg" style={{ animation: 'badgePulse 2.5s ease-in-out infinite' }}>
                  <Star size={9} fill="currentColor" /> {t.pricingExtended.mostChosen}
                </span>
              </div>
            )}
            <h3 className={`text-lg font-bold mb-1 text-[#0E0E0F] ${plan.popular ? 'mt-4' : ''}`}>{plan.name}</h3>
            {plan.subtitle && (
              <p className="text-xs text-[#9C958A] mb-2">{plan.subtitle}</p>
            )}
            {capacity?.[plan.id] && (
              <p className="text-[11px] font-medium text-[var(--accent)] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {capacity[plan.id]}
              </p>
            )}
            {isSobConsulta(plan) ? (
              <div className="mt-1">
                <span className="text-xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.pricingExtended.onRequest}</span>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-4xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {billingCycle === 'monthly' && plan.monthlyPriceFormatted
                      ? plan.monthlyPriceFormatted
                      : plan.priceFormatted}
                  </span>
                  <span className="text-sm text-[#9C958A]">{plan.period}</span>
                </div>
                {billingCycle === 'annual' && plan.monthlyPrice && (
                  <p className="text-xs text-[#9C958A] mt-1">
                    <span className="line-through">R${plan.monthlyPriceFormatted}</span>
                    <span className="ml-1 text-green-600 font-medium">no mensal</span>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Linhas de features — injetando plan3ConsultFeatures antes de "Envio automático de Relatórios" */}
      {(() => {
        const LAST_FEATURE = 'Envio automático de Relatórios'
        const head = allFeatures.filter(f => f !== LAST_FEATURE)
        const hasLast = allFeatures.includes(LAST_FEATURE)
        const merged: Array<{ feature: string; isP3: boolean }> = [
          ...head.map(f => ({ feature: f, isP3: false })),
          ...plan3ConsultFeatures.map(f => ({ feature: f, isP3: true })),
          ...(hasLast ? [{ feature: LAST_FEATURE, isP3: false }] : []),
        ]
        return merged.map(({ feature, isP3 }, idx) => {
          const avulso = featureAvulso[feature]
          return (
            <div key={feature} className="grid gap-0" style={{ gridTemplateColumns: `1.5fr repeat(${plans.length}, 1fr)` }}>
              <div className={`flex items-center justify-between gap-2 px-4 py-3 text-sm text-[#0E0E0F] ${idx % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
                <span className="truncate">{feature}</span>
                {avulso && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {avulso.ctas.map((cta) => (
                      <Link key={cta.link} to={cta.link} className="inline-flex items-center justify-center text-[10px] font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] w-[100px] py-1 rounded-full whitespace-nowrap transition-colors text-center">
                        {cta.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {plans.map((plan) => {
                const has = isP3 ? plan.id === 'saas-3' : plan.features.includes(feature)
                const customLabel = featureLabels[feature]?.[plan.id]
                return (
                  <div key={plan.id} className={`flex items-center justify-center px-4 py-3 ${idx % 2 === 0 ? 'bg-[#F7F7F7] border-x border-[#9C958A]/10' : 'bg-white border-x border-[#9C958A]/10'}`}>
                    {has ? (
                      customLabel ? (
                        <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">{customLabel}</span>
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
        })
      })()}

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
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full whitespace-nowrap">{t.pricingExtended.modulesAvulsos}</span>
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
              to={isSobConsulta(plan) ? '/agendar-demo' : `/checkout?plano=${plan.id}&segmento=${category}`}
              className="flex items-center justify-center w-full h-11 font-medium px-4 rounded-xl text-sm transition-colors border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white whitespace-nowrap"
            >
              {isSobConsulta(plan) ? t.pricingExtended.scheduleDemo : plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  category?: Category
  showSecurity?: boolean
}

export function Pricing({ category = 'restaurantes', showSecurity = false }: Props) {
  useCategoryAccent() // CSS vars on root drive styling
  const t = useT()
  // Preços dos módulos estão sob consulta — ciclo fixo (o toggle Mensal/Anual foi ocultado).
  const billingCycle: BillingCycle = 'annual'
  const translatedSaasPlans = saasPlans.map((plan, i) => {
    const features = (t.plansData.saas[i]?.features ?? plan.features).map((f: string) =>
      (category === 'farmacias' || category === 'petshop' || category === 'shopping')
        ? f.replace('KDS para cozinha e expedição', 'Monitor de Pedidos')
        : f
    )
    return {
      ...plan,
      name: t.plansData.saas[i]?.name ?? plan.name,
      subtitle: t.plansData.saas[i]?.subtitle ?? plan.subtitle,
      features,
      period: t.plansData.saas[i]?.period ?? plan.period,
      cta: t.plansData.saas[i]?.cta ?? plan.cta,
    }
  })
  return (
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            {t.pricing.sectionHeading}
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            {t.pricing.sectionDesc}
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
                <h3 className="text-2xl font-bold text-[#0E0E0F]">{t.pricingExtended.systemTitle}</h3>
                <p className="text-sm text-[#9C958A]">{t.pricingExtended.systemSaas}</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-[#9C958A]/30 ml-4" />
            </div>
          </div>
        </FadeIn>

        {/* Toggle Mensal/Anual ocultado enquanto os preços dos módulos estão sob consulta. */}

        {category === 'mercados' ? (
          /* Mercados: mesma tabela de planos + módulos adicionais abaixo */
          <FadeIn delay={100} className="mb-8">
            <DesktopTable plans={translatedSaasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} billingCycle={billingCycle} category={category} plan3ConsultFeatures={modulesDataMercadosCFTV.map(m => m.title)} />
            <MobileCards plans={translatedSaasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} billingCycle={billingCycle} category={category} plan3ConsultFeatures={modulesDataMercadosCFTV.map(m => m.title)} />
            {/* Módulos adicionais Market */}
            <div className="max-w-6xl mx-auto mt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-8 rounded-full bg-[var(--accent)]" />
                <div>
                  <p className="text-sm font-bold text-[#0E0E0F]">Módulos adicionais · Granular Market</p>
                  <p className="text-xs text-[#9C958A]">Disponíveis como complemento ao plano base — consulte preço via demonstração</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Pessoas (RH) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#9C958A]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Users size={18} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0E0E0F]">{t.pricingExtended.pessoasName}</p>
                      <p className="text-xs text-[#9C958A]">{t.pricingExtended.pessoasDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#0E0E0F]">Sob consulta</p>
                    </div>
                    <Link
                      to="/agendar-demo"
                      className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Falar com a gente
                    </Link>
                  </div>
                </div>
                {/* Televendas */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#9C958A]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <PhoneCall size={18} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0E0E0F]">{t.pricingExtended.televendasName}</p>
                      <p className="text-xs text-[#9C958A]">{t.pricingExtended.televendasDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#0E0E0F]">Sob consulta</p>
                    </div>
                    <Link
                      to="/agendar-demo"
                      className="inline-flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Falar com a gente
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        ) : (category === 'farmacias' || category === 'petshop' || category === 'shopping') ? (
          /* Farmácias / Pet Shop: mesma tabela do Food */
          <FadeIn delay={100} className="mb-8">
            <DesktopTable plans={translatedSaasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} billingCycle={billingCycle} category={category} />
            <MobileCards plans={translatedSaasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} billingCycle={billingCycle} category={category} />
          </FadeIn>
        ) : (
          /* Restaurantes: tabela padrão */
          <FadeIn delay={100} className="mb-8">
            <DesktopTable plans={translatedSaasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} billingCycle={billingCycle} category={category} />
            <MobileCards plans={translatedSaasPlans} capacity={saasCapacity} addonFeatures={saasAddonFeatures} billingCycle={billingCycle} category={category} />
          </FadeIn>
        )}

        {showSecurity && (
          <div className="max-w-6xl mx-auto mt-2 pt-8 border-t border-[#e4ddd2]">
            <SecuritySection />
          </div>
        )}
      </div>
      <style>{`
        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.04); }
        }
      `}</style>
    </section>
  )
}
