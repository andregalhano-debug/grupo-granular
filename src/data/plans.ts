export interface Plan {
  id: string
  type: 'saas' | 'consultoria'
  name: string
  subtitle: string
  price: number
  priceFormatted: string
  period: string
  features: string[]
  popular: boolean
  cta: string
}

export const saasPlans: Plan[] = [
  {
    id: 'saas-1',
    type: 'saas',
    name: 'Pacote 1',
    subtitle: 'Para operacoes com ate 3 IDs',
    price: 89,
    priceFormatted: '89',
    period: '/mes',
    features: [
      'Portal Granular',
      'Modulo 1: Vendas, Operacao e Financeiro',
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedicao',
      'Ate 3 IDs – Ate 3.000 pedidos/mes',
      '1 Relatorio Mensal',
    ],
    popular: false,
    cta: 'Comecar teste gratis',
  },
  {
    id: 'saas-2',
    type: 'saas',
    name: 'Pacote 2',
    subtitle: 'Para operacoes em crescimento',
    price: 489,
    priceFormatted: '489',
    period: '/mes',
    features: [
      'Portal Granular',
      'Modulo 1: Vendas, Operacao e Financeiro',
      'Modulo 2: Estoque e Checklist',
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'KDS para cozinha e expedicao',
      'Controle de entradas e saidas do estoque',
      'Organizacao operacional com checklist',
      'Ate 10 IDs – Ate 10.000 pedidos/mes',
      '1 Relatorio Semanal',
    ],
    popular: true,
    cta: 'Comecar teste gratis',
  },
  {
    id: 'saas-3',
    type: 'saas',
    name: 'Pacote 3',
    subtitle: 'Para grandes operacoes',
    price: 3899,
    priceFormatted: '3.899',
    period: '/mes',
    features: [
      'Portal Granular',
      'Modulo 1: Vendas, Operacao e Financeiro',
      'Modulo 2: Estoque e Checklist',
      'Modulo 3: Recursos Humanos e Producao',
      'Dashboard completo de performance',
      'Monitoramento em tempo real',
      'Controle de entradas e saidas do estoque',
      'Organizacao operacional com checklist',
      'Gestao completa de funcionarios (RH)',
      'Controle de producao e CMV',
      'Suporte tecnico e atualizacoes continuas',
      'Ate 20 IDs – Ate 50.000 pedidos/mes',
      '1 Relatorio Semanal',
    ],
    popular: false,
    cta: 'Comecar Gratis',
  },
]

export const consultoriaPlans: Plan[] = [
  {
    id: 'consultoria-1',
    type: 'consultoria',
    name: 'Consultoria 1 Mes',
    subtitle: 'Diagnostico e acoes imediatas',
    price: 3890,
    priceFormatted: '3.890',
    period: '/mes',
    features: [
      'Diagnostico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardapio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliacao de visitas e rankeamento iFood',
      'Estrategias de aumento de ticket medio',
      '4h reuniao estrategica + 1h visita na operacao',
      'Relatorio Semanal',
    ],
    cta: 'Comecar Gratis',
    popular: false,
  },
  {
    id: 'consultoria-3',
    type: 'consultoria',
    name: 'Consultoria 3 Meses',
    subtitle: 'Transformacao com acompanhamento',
    price: 3590,
    priceFormatted: '3.590',
    period: '/mes',
    features: [
      'Diagnostico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardapio',
      'Campanhas e alavancas de rentabilidade iFood',
      'Avaliacao de visitas e rankeamento iFood',
      'Estrategias de aumento de ticket medio',
      'Analise de perfil de clientes',
      'Recursos Humanos: Diagnostico',
      'Suporte e atualizacoes continuas',
      '12h reuniao estrategica + 4h visita na operacao',
      'Relatorio Semanal',
    ],
    cta: 'Comecar Gratis',
    popular: false,
  },
  {
    id: 'consultoria-6',
    type: 'consultoria',
    name: 'Consultoria 6 Meses',
    subtitle: 'Evolucao completa da operacao',
    price: 2990,
    priceFormatted: '2.990',
    period: '/mes',
    features: [
      'Diagnostico de gargalos operacionais e comerciais (in loco)',
      'Curadoria e posicionamento do cardapio',
      'Campanhas e alavancas de rentabilidade',
      'Avaliacao de visitas e rankeamento iFood',
      'Estrategias de aumento de ticket medio',
      'Analise de perfil de clientes',
      'Visibilidade 360 da operacao',
      'RH: Diagnostico e planos de acao',
      'Suporte e atualizacoes continuas',
      '24h reuniao estrategica + 8h visita na operacao',
      'Relatorio Semanal',
    ],
    cta: 'Comecar Gratis',
    popular: true,
  },
]

export const allPlans = [...saasPlans, ...consultoriaPlans]

export function getPlanById(id: string): Plan | undefined {
  return allPlans.find((p) => p.id === id)
}
