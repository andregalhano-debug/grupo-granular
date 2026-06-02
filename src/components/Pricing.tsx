import { Check } from 'lucide-react'
import { FadeIn } from './FadeIn'

const plans = [
  {
    name: 'Starter',
    price: 'R$ 349',
    period: '/mês',
    description: 'Para operações iniciando a digitalização',
    features: [
      'Até 3 hubs',
      'Até 3 usuários',
      'Estoque básico',
      'Fichas técnicas',
      'KDS básico',
      'Financeiro simplificado',
      'Suporte por email',
    ],
    popular: false,
    cta: 'Começar Free Trial',
  },
  {
    name: 'Professional',
    price: 'R$ 1.299',
    period: '/mês',
    description: 'Para redes que querem escalar com inteligência',
    features: [
      'Até 8 hubs',
      'Até 15 usuários',
      'Todos os módulos inclusos',
      '15 Agentes de IA',
      'Integração iFood + Omie',
      'CMV automático',
      'Checklists operacionais',
      'Benchmark entre unidades',
      'App mobile nativo',
      'Suporte prioritário',
    ],
    popular: true,
    cta: 'Começar Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'R$ 3.999+',
    period: '/mês',
    description: 'Para grandes redes com necessidades customizadas',
    features: [
      'Hubs ilimitados',
      'Usuários ilimitados',
      'Tudo do Professional',
      'SSO / SAML',
      'SLA garantido 99.9%',
      'Gerente de conta dedicado',
      'API customizada',
      'Treinamento presencial',
      'Implantação assistida',
    ],
    popular: false,
    cta: 'Falar com Vendas',
  },
]

export function Pricing() {
  return (
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#212121] mb-4">
            Planos que cabem na sua operação
          </h2>
          <p className="text-[#666] text-base sm:text-lg max-w-2xl mx-auto">
            Comece grátis por 14 dias. Sem cartão de crédito.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 h-full ${
                  plan.popular
                    ? 'bg-[#4D1520] text-white lg:scale-105 shadow-2xl shadow-[#4D1520]/20'
                    : 'bg-white border border-[#e5e5e3]'
                }`}
              >
                {plan.popular && (
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Mais Popular
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#212121]'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-4xl font-bold font-['IBM_Plex_Mono'] ${plan.popular ? 'text-white' : 'text-[#212121]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#666]'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-8 ${plan.popular ? 'text-white/60' : 'text-[#666]'}`}>
                  {plan.description}
                </p>

                <a
                  href="#"
                  className={`block text-center font-medium py-3 px-6 rounded-xl text-sm transition-colors mb-8 ${
                    plan.popular
                      ? 'bg-white text-[#4D1520] hover:bg-white/90'
                      : 'bg-[#4D1520] text-white hover:bg-[#6b2230]'
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-[#e8a0b0]' : 'text-[#22895e]'
                        }`}
                      />
                      <span className={plan.popular ? 'text-white/80' : 'text-[#666]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
