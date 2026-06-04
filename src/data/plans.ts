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
    name: 'Módulo 1',
    subtitle: 'Vendas, operação, Portal iFood',
    price: 89,
    priceFormatted: '89',
    period: '/mês',
    features: [
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Relatórios',
    ],
    popular: false,
    cta: 'Começar Agora',
  },
  {
    id: 'saas-2',
    type: 'saas',
    name: 'Módulo 2',
    subtitle: 'Estoque e Checklist',
    price: 489,
    priceFormatted: '489',
    period: '/mês',
    features: [
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Controle de entradas e saídas do estoque',
      'Organização operacional com checklist',
      'Relatórios',
    ],
    popular: false,
    cta: 'Começar Agora',
  },
  {
    id: 'saas-3',
    type: 'saas',
    name: 'Módulo 3',
    subtitle: 'Pessoas (RH) e Produção',
    price: 3899,
    priceFormatted: '3.899',
    period: '/mês',
    features: [
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Controle de entradas e saídas do estoque',
      'Organização operacional com checklist',
      'Gestão completa de funcionários (RH)',
      'Controle de produção e CMV',
      'Suporte técnico e atualizações contínuas',
      'Relatórios',
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
      'Diagnóstico de gargalos operacionais e comerciais',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      'Visita operacional presencial sob demanda',
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
      'Diagnóstico de gargalos operacionais e comerciais',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade iFood',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      'Análise de perfil de clientes',
      'Recursos Humanos: Diagnóstico',
      'Suporte e atualizações contínuas',
      'Visita operacional presencial sob demanda',
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
      'Diagnóstico de gargalos operacionais e comerciais',
      'Curadoria e posicionamento do cardápio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliação de visitas e rankeamento iFood',
      'Estratégias de aumento de ticket médio',
      'Análise de perfil de clientes',
      'Visibilidade 360° da operação',
      'RH: Diagnóstico e planos de ação',
      'Suporte e atualizações contínuas',
      'Visita operacional presencial sob demanda',
      'Relatório Semanal',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
]

export const allPlans = [...saasPlans, ...consultoriaPlans]

export function getPlanById(id: string): Plan | undefined {
  return allPlans.find((p) => p.id === id)
}
