import { Check } from 'lucide-react'
import { FadeIn } from './FadeIn'

const saasPlans = [
  {
    name: 'Pacote 1',
    subtitle: 'Para operações com até 3 IDs',
    price: '90',
    period: '/mês',
    features: [
      'Portal Granular',
      'Módulo 1: Vendas, Operação e Financeiro',
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Até 3 IDs – Até 3.000 pedidos/mês',
      '1 Relatório Mensal',
    ],
    popular: false,
    cta: 'Começar Free Trial',
    ctaStyle: 'outline' as const,
  },
  {
    name: 'Pacote 2',
    subtitle: 'Para operações em crescimento',
    price: '490',
    period: '/mês',
    features: [
      'Portal Granular',
      'Módulo 1: Vendas, Operação e Financeiro',
      'Módulo 2: Estoque e Checklist',
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Controle de entradas e saídas do estoque',
      'Organização operacional com checklist',
      'Até 10 IDs – Até 10.000 pedidos/mês',
      '1 Relatório Semanal',
    ],
    popular: true,
    cta: 'Começar Free Trial',
    ctaStyle: 'outline' as const,
  },
  {
    name: 'Pacote 3',
    subtitle: 'Para grandes operações',
    price: '3.950',
    period: '/mês',
    features: [
      'Portal Granular',
      'Módulo 1: Vendas, Operação e Financeiro',
      'Módulo 2: Estoque e Checklist',
      'Módulo 3: Recursos Humanos e Produção',
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'Controle de entradas e saídas do estoque',
      'Organização operacional com checklist',
      'Gestão completa de funcionários (RH)',
      'Controle de produção e CMV',
      'Suporte técnico e atualizações contínuas',
      'Até 20 IDs – Até 50.000 pedidos/mês',
      '1 Relatório Semanal',
    ],
    popular: false,
    cta: 'Falar com Vendas',
    ctaStyle: 'outline' as const,
  },
]

const consultoriaPlans = [
  {
    name: 'Consultoria 1 Mês',
    subtitle: 'Diagnóstico e ações imediatas',
    price: '3.950',
    period: '/mês',
    features: [
      'Diagnóstico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      '4h reunião estratégica + 1h visita na operação',
      'Relatório Semanal',
    ],
    cta: 'Falar com Vendas',
  },
  {
    name: 'Consultoria 3 Meses',
    subtitle: 'Transformação com acompanhamento',
    price: '10.880',
    period: '/mês',
    features: [
      'Diagnóstico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade iFood',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      'Análise de perfil de clientes',
      'Recursos Humanos: Diagnóstico',
      'Suporte e atualizações contínuas',
      '12h reunião estratégica + 4h visita na operação',
      'Relatório Semanal',
    ],
    cta: 'Falar com Vendas',
  },
  {
    name: 'Consultoria 6 Meses',
    subtitle: 'Evolução completa da operação',
    price: '19.200',
    period: '/mês',
    features: [
      'Diagnóstico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      'Análise de perfil de clientes',
      'Visibilidade 360° da operação',
      'RH: Diagnóstico e planos de ação',
      'Suporte e atualizações contínuas',
      '24h reunião estratégica + 8h visita na operação',
      'Relatório Semanal',
    ],
    cta: 'Falar com Vendas',
  },
]

export function Pricing() {
  return (
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#EAE5D9]/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Planos que cabem na sua operação
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Comece com free trial de 14 dias. Sem cartão de crédito. Upgrade quando quiser.
          </p>
        </FadeIn>

        {/* PACOTES SaaS */}
        <FadeIn>
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#9C958A] mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Pacotes SaaS
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start mb-20">
          {saasPlans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-[#5C1A2B] text-white lg:scale-105 shadow-2xl shadow-[#5C1A2B]/20'
                    : 'bg-white border border-[#EAE5D9]'
                }`}
              >
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-[#0E0E0F]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-white/60' : 'text-[#9C958A]'}`}>
                  {plan.subtitle}
                </p>
                <div className="flex items-baseline gap-0.5 mb-6">
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#9C958A]'}`}>R$</span>
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-[#0E0E0F]'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {plan.price}
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
                          plan.popular ? 'text-[#9B3349]' : 'text-[#5C1A2B]'
                        }`}
                      />
                      <span className={plan.popular ? 'text-white/80' : 'text-[#2A2622]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`block text-center font-medium py-3 px-6 rounded-xl text-sm transition-colors ${
                    plan.popular
                      ? 'bg-[#FAF7F0] text-[#5C1A2B] hover:bg-white'
                      : 'border border-[#5C1A2B] text-[#5C1A2B] hover:bg-[#5C1A2B] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CONSULTORIA */}
        <FadeIn>
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#9C958A] mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Consultoria
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
          {consultoriaPlans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120}>
              <div className="rounded-2xl border border-[#EAE5D9] bg-white p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold text-[#0E0E0F] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#9C958A] mb-5">
                  {plan.subtitle}
                </p>
                <div className="flex items-baseline gap-0.5 mb-6">
                  <span className="text-sm text-[#9C958A]">R$</span>
                  <span className="text-5xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-[#9C958A]">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-[#5C1A2B]" />
                      <span className="text-[#2A2622]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="block text-center font-medium py-3 px-6 rounded-xl text-sm border border-[#5C1A2B] text-[#5C1A2B] hover:bg-[#5C1A2B] hover:text-white transition-colors"
                >
                  {plan.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
