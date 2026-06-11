export interface PlanSegment {
  label: string
  color: string   // text/border color
  bg: string      // background color
}

export const SEGMENTS: Record<string, PlanSegment> = {
  restaurantes: { label: 'Restaurantes', color: '#A31631', bg: '#fdf2f4' },
  mercados:     { label: 'Mercados',     color: '#15803d', bg: '#f0fdf4' },
  farmacias:    { label: 'Farmácias',    color: '#1d4ed8', bg: '#eff6ff' },
  petshop:      { label: 'Pet Shop',     color: '#7c3aed', bg: '#f5f3ff' },
  universal:    { label: 'Todos os segmentos', color: '#6b7280', bg: '#f9fafb' },
}

export interface Plan {
  id: string
  type: 'saas' | 'consultoria' | 'modulo'
  name: string
  subtitle: string
  price: number
  priceFormatted: string
  period: string
  months?: number
  features: string[]
  popular: boolean
  cta: string
  segment?: PlanSegment
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
    subtitle: 'Vendas, Operação, Portal iFood',
    price: 89,
    priceFormatted: '89',
    period: '/mês',
    features: [
      'Dashboard iFood completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Envio automático de Relatórios',
    ],
    popular: false,
    cta: 'Começar Agora',
    segment: SEGMENTS.restaurantes,
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
      'Dashboard iFood completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Controle de entradas e saídas do estoque',
      'Organização operacional com checklist',
      'Envio automático de Relatórios',
    ],
    popular: false,
    cta: 'Começar Agora',
    segment: SEGMENTS.restaurantes,
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
      'Dashboard iFood completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedição',
      'Controle de entradas e saídas do estoque',
      'Organização operacional com checklist',
      'Controle de produção e CMV',
      'Suporte técnico e atualizações contínuas',
      'Gestão completa de pessoas (RH)',
      'Envio automático de Relatórios',
    ],
    popular: false,
    cta: 'Começar Agora',
    segment: SEGMENTS.restaurantes,
  },
]

export const consultoriaPlans: Plan[] = [
  {
    id: 'consultoria-1',
    type: 'consultoria',
    name: 'Especialista 1 Mês',
    subtitle: 'Diagnóstico geral + primeiras ações',
    price: 3890,
    priceFormatted: '3.890',
    period: '/mês',
    months: 1,
    features: [
      '4 horas mensais com especialista',
      'Diagnóstico completo da operação',
      'Operação, financeiro, estoque, cardápio, iFood, RH',
      'Priorização de blocos pós-diagnóstico',
      'Plano de ação com metas e responsáveis',
      'Relatório semanal de evolução',
      'Suporte contínuo durante o período',
      'Módulo 1 do sistema incluso',
      'Visita in loco negociada à parte',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
  {
    id: 'consultoria-3',
    type: 'consultoria',
    name: 'Especialista 3 Meses',
    subtitle: 'Transformação com acompanhamento',
    price: 3590,
    priceFormatted: '3.590',
    period: '/mês',
    months: 3,
    features: [
      '4 horas mensais com especialista',
      'Diagnóstico completo da operação',
      'Operação, financeiro, estoque, cardápio, iFood, RH',
      'Priorização de blocos pós-diagnóstico',
      'Plano de ação com metas e responsáveis',
      'Relatório semanal de evolução',
      'Suporte contínuo durante o período',
      'Módulo 1 do sistema incluso',
      'Visita in loco negociada à parte',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
  {
    id: 'consultoria-6',
    type: 'consultoria',
    name: 'Especialista 6 Meses',
    subtitle: 'Evolução completa com melhor custo',
    price: 2990,
    priceFormatted: '2.990',
    period: '/mês',
    months: 6,
    features: [
      '4 horas mensais com especialista',
      'Diagnóstico completo da operação',
      'Operação, financeiro, estoque, cardápio, iFood, RH',
      'Priorização de blocos pós-diagnóstico',
      'Plano de ação com metas e responsáveis',
      'Relatório semanal de evolução',
      'Suporte contínuo durante o período',
      'Módulo 1 do sistema incluso',
      'Visita in loco negociada à parte',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
]

/** Features avulsas que aparecem com traço em todos os pacotes */
export const saasAddonFeatures: string[] = []

export const consultoriaAddonFeatures: string[] = [
  'Especialista sob demanda',
]

export const moduloPlans: Plan[] = [
  {
    id: 'modulo-televendas',
    type: 'modulo',
    name: 'Televendas',
    subtitle: 'Do pedido verbal à proposta enviada em menos de 2 minutos',
    price: 419,
    priceFormatted: '419',
    period: '/mês',
    features: [
      'Modo UltraFast: proposta pronta em < 2 min',
      'Busca por nome, EAN ou código interno',
      'Edição inline de preço com controle de alçada',
      'Exportação por WhatsApp ou PDF',
      'Dashboard de performance por vendedor',
      'CRM com histórico e segmentação de clientes',
      'Catálogo com importação Excel e apelidos (DE-PARA)',
      'Agentes de IA para estratégia comercial e precificação',
    ],
    popular: false,
    cta: 'Adicionar ao Carrinho',
    segment: SEGMENTS.mercados,
  },
  {
    id: 'modulo-pessoas',
    type: 'modulo',
    name: 'Pessoas (RH)',
    subtitle: 'Recrutamento, contratação, escalas e gestão completa de equipe',
    price: 599,
    priceFormatted: '599',
    period: '/mês',
    features: [
      'Recrutamento e controle de entrevistas',
      'Contratação e onboarding digital',
      'Escalas e turnos inteligentes (6x1, 12h)',
      'Controle de documentos com alertas de vencimento',
      'Avaliação de desempenho e produtividade',
      'Custo real por colaborador',
      'Gestão de turnover e plano de carreira',
      'Treinamentos e certificações',
    ],
    popular: false,
    cta: 'Começar Agora',
    segment: SEGMENTS.universal,
  },
]

export const allPlans = [...saasPlans, ...consultoriaPlans, ...moduloPlans]

export function getPlanById(id: string): Plan | undefined {
  return allPlans.find((p) => p.id === id)
}
