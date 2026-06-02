import { Check, Monitor, Handshake } from 'lucide-react'
import { FadeIn } from './FadeIn'

const saasPlans = [
  {
    name: 'Pacote 1',
    subtitle: 'Para operações com até 3 IDs',
    price: '89',
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
  },
  {
    name: 'Pacote 2',
    subtitle: 'Para operações em crescimento',
    price: '489',
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
  },
  {
    name: 'Pacote 3',
    subtitle: 'Para grandes operações',
    price: '3.899',
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
    price: '3.626',
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
    price: '3.200',
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
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Planos que cabem na sua operação
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Comece com free trial de 14 dias. Sem cartão de crédito. Upgrade quando quiser.
          </p>
        </FadeIn>

        {/* PACOTES SaaS — Section Header */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5C1A2B] flex items-center justify-center">
                <Monitor size={22} className="text-[#FAF7F0]" />
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
            <FadeIn key={plan.name} delay={i * 120}>
              <div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  plan.popular
                    ? 'bg-[#5C1A2B] text-white shadow-2xl shadow-[#5C1A2B]/20'
                    : 'bg-[#EAE5D9] border border-[#9C958A]/20'
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
                      ? 'bg-[#EAE5D9] text-[#5C1A2B] hover:bg-[#FAF7F0]'
                      : 'border border-[#5C1A2B] text-[#5C1A2B] hover:bg-[#5C1A2B] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CONSULTORIA — Section Header */}
        <FadeIn>
          <div className="max-w-6xl mx-auto mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#5C1A2B] flex items-center justify-center">
                <Handshake size={22} className="text-[#FAF7F0]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0E0E0F]">Consultoria</h3>
                <p className="text-sm text-[#9C958A]">Especialistas in loco transformando sua operação</p>
              </div>
              <div className="hidden sm:block flex-1 h-px bg-[#9C958A]/30 ml-4" />
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {consultoriaPlans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120}>
              <div className="rounded-2xl border border-[#9C958A]/20 bg-[#EAE5D9] p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold text-[#0E0E0F] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#9C958A] mb-5">
                  {plan.subtitle}
                </p>
                <div className="flex items-baseline gap-0.5 mb-6">
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
