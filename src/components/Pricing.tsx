import { Check, Monitor, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { saasPlans, consultoriaPlans } from '../data/plans'

const saasHighlights: Record<string, string> = {
  'saas-1': 'Portal granular iFood, focado na estratégia comercial, controle da venda e operação, com foco na sua margem de lucro.',
  'saas-2': 'Tenha uma profundidade ainda maior no controle de estoque e aplique os checklists operacionais.',
  'saas-3': 'Gerencie seu negócio de ponta a ponta, com controle e escala, investindo menos que o custo de 1 funcionário.',
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
            Comece agora a transformação na gestão do seu negócio. Pacotes sob demanda e valores acessíveis.
          </p>
        </FadeIn>

        {/* PACOTES SaaS */}
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

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch mb-24">
          {saasPlans.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-[#A31631] text-white shadow-2xl shadow-[#A31631]/20'
                    : 'bg-white border border-[#9C958A]/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-[#0E0E0F]'}`}>
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-white/60' : 'text-[#9C958A]'}`}>
                    {plan.subtitle}
                  </p>
                )}

                {saasHighlights[plan.id] && (
                  <div className={`rounded-lg px-4 py-2.5 mb-5 ${
                    plan.popular
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-[#A31631]/5 border border-[#A31631]/15'
                  }`}>
                    <p className={`text-xs leading-relaxed font-medium ${
                      plan.popular ? 'text-white/90' : 'text-[#A31631]'
                    }`}>
                      {saasHighlights[plan.id]}
                    </p>
                  </div>
                )}

                <div className="flex items-baseline gap-0.5 mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-[#0E0E0F]'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {plan.priceFormatted}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#9C958A]'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-[#C4223D]' : 'text-[#A31631]'
                        }`}
                      />
                      <span className={plan.popular ? 'text-white/80' : 'text-[#2A2622]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/checkout?plano=${plan.id}`}
                  className={`block text-center font-medium py-3 px-6 rounded-xl text-sm transition-colors ${
                    plan.popular
                      ? 'bg-white text-[#A31631] hover:bg-[#F7F7F7]'
                      : 'border border-[#A31631] text-[#A31631] hover:bg-[#A31631] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

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

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {consultoriaPlans.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-[#A31631] text-white shadow-2xl shadow-[#A31631]/20'
                    : 'bg-white border border-[#9C958A]/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-[#0E0E0F]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-white/60' : 'text-[#9C958A]'}`}>
                  {plan.subtitle}
                </p>
                <div className="flex items-baseline gap-0.5 mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-[#0E0E0F]'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {plan.priceFormatted}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#9C958A]'}`}>{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#C4223D]' : 'text-[#A31631]'}`} />
                      <span className={plan.popular ? 'text-white/80' : 'text-[#2A2622]'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/checkout?plano=${plan.id}`}
                  className={`block text-center font-medium py-3 px-6 rounded-xl text-sm transition-colors ${
                    plan.popular
                      ? 'bg-white text-[#A31631] hover:bg-[#F7F7F7]'
                      : 'border border-[#A31631] text-[#A31631] hover:bg-[#A31631] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
