export interface Plan {
  id: string
  type: 'saas' | 'consultoria'
  name: string
  subtitle: string
  price: number
  priceFormatted: string
  period: string
  months?: number
  features: string[]
  popular: boolean
  cta: string
}

export function getConsultoriaTotal(plan: Plan): number {
  return plan.price * (plan.months || 1)
}

export function getConsultoriaPixDiscount(plan: Plan): number {
  return Math.round(getConsultoriaTotal(plan) * 0.03)
}

export function getConsultoriaPixTotal(plan: Plan): number {
  return getConsultoriaTotal(plan) - getConsultoriaPixDiscount(plan)
}

export const saasPlans: Plan[] = [
  {
    id: 'saas-1',
    type: 'saas',
    name: 'Pacote 1',
    subtitle: 'Para operações com até 3 IDs',
    price: 89,
    priceFormatted: '89',
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
    cta: 'Começar Agora',
  },
  {
    id: 'saas-2',
    type: 'saas',
    name: 'Pacote 2',
    subtitle: 'Para operações em crescimento',
    price: 489,
    priceFormatted: '489',
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
    cta: 'Começar Agora',
  },
  {
    id: 'saas-3',
    type: 'saas',
    name: 'Pacote 3',
    subtitle: 'Para grandes operações',
    price: 3899,
    priceFormatted: '3.899',
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
    cta: 'Começar Agora',
  },
]

export const consultoriaPlans: Plan[] = [
  {
    id: 'consultoria-1',
    type: 'consultoria',
    name: 'Consultoria 1 Mês',
    subtitle: 'Diagnóstico e ações imediatas',
    price: 3890,
    priceFormatted: '3.890',
    period: '/mês',
    months: 1,
    features: [
      'Diagnóstico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      '4h reunião estratégica + 1h visita na operação',
      'Relatório Semanal',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
  {
    id: 'consultoria-3',
    type: 'consultoria',
    name: 'Consultoria 3 Meses',
    subtitle: 'Transformação com acompanhamento',
    price: 3590,
    priceFormatted: '3.590',
    period: '/mês',
    months: 3,
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
    cta: 'Começar Agora',
    popular: false,
  },
  {
    id: 'consultoria-6',
    type: 'consultoria',
    name: 'Consultoria 6 Meses',
    subtitle: 'Evolução completa da operação',
    price: 2990,
    priceFormatted: '2.990',
    period: '/mês',
    months: 6,
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
    cta: 'Começar Agora',
    popular: true,
  },
]

export const allPlans = [...saasPlans, ...consultoriaPlans]

export function getPlanById(id: string): Plan | undefined {
  return allPlans.find((p) => p.id === id)
}
