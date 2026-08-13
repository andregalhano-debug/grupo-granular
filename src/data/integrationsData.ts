export interface IntegrationDetail {
  name: string
  logo: string
  iconBg: string      // cor de fundo do ícone (estilo app icon)
  logoFilter: string  // CSS filter para logo branca ou preta
  desc: string
  detailText?: string
  detailPoints?: string[]
  tags: string[]
  partner?: boolean
}

export const integrationsData: IntegrationDetail[] = [
  {
    name: 'iFood',
    logo: '/logos/ifood.png',
    iconBg: '#EA1D2C',
    logoFilter: 'none',
    desc: 'Receba e gerencie pedidos do iFood direto no painel Granular.',
    detailPoints: [
      'Pedidos recebidos automaticamente, sem necessidade de gerenciamento manual',
      'Acompanhamento do status de cada entrega em tempo real',
      'Métricas de performance: tempo médio de preparo, avaliações e taxa de cancelamento',
      'Gestão consolidada de todos os IDs e marcas em uma única tela',
      'Ativação simples diretamente via Portal do Parceiro iFood',
    ],
    tags: ['Pedidos automáticos', 'Rastreamento', 'Métricas de delivery', 'Avaliações'],
  },
  {
    name: 'Anota AI',
    logo: '/logos/anotaai.png',
    iconBg: '#1E88E5',
    logoFilter: 'none',
    desc: 'Receba pedidos do Anota AI direto no painel Granular, sem lançamento manual.',
    detailPoints: [
      'Pedidos realizados pelo cardápio digital do Anota AI chegam automaticamente na Granular',
      'Acompanhamento do status de cada pedido em tempo real',
      'Métricas de performance consolidadas com os demais canais de delivery',
      'Gestão unificada de múltiplos canais sem retrabalho operacional',
    ],
    tags: ['Cardápio digital', 'Pedidos automáticos', 'Multi-canal', 'Métricas de delivery'],
  },
  {
    name: '99Food',
    logo: '/logos/99food.png',
    iconBg: '#F7BD29',
    logoFilter: 'none',
    desc: 'Integre pedidos do 99Food à gestão Granular e centralize sua operação de delivery.',
    detailPoints: [
      'Pedidos do 99Food recebidos e gerenciados diretamente no painel Granular',
      'Visão consolidada de todos os canais de delivery em uma única tela',
      'Acompanhamento de métricas: tempo de preparo, avaliações e cancelamentos',
      'Reduz dependência de uma única plataforma e amplia seu alcance',
    ],
    tags: ['Delivery', 'Pedidos automáticos', 'Multi-plataforma', 'Métricas'],
  },
  {
    name: 'Open Delivery',
    logo: '/logos/opendelivery.png',
    iconBg: '#111111',
    logoFilter: 'none',
    desc: 'Padrão aberto para conectar múltiplas plataformas de delivery.',
    detailPoints: [
      'Padrão aberto do mercado brasileiro de food service para integração entre plataformas',
      'Receba pedidos de qualquer marketplace compatível com o protocolo',
      'Reduz dependência de uma única plataforma de delivery',
      'Escalável: novas plataformas compatíveis são incorporadas automaticamente',
    ],
    tags: ['Multi-plataforma', 'Padrão aberto', 'Escalabilidade', 'Marketplace'],
  },
  {
    name: 'Omie',
    logo: '/logos/omie.png',
    iconBg: '#FFFFFF',
    logoFilter: 'none',
    desc: 'Integração financeira completa com o ERP Omie.',
    detailPoints: [
      'Sincronização automática de contas a pagar e receber entre Granular e Omie',
      'Notas fiscais e conciliação bancária fluem entre os sistemas sem intervenção manual',
      'Contabilidade sempre atualizada, sem retrabalho para a equipe financeira',
      'Visão unificada do financeiro em um único ecossistema',
    ],
    tags: ['ERP', 'Financeiro', 'Notas fiscais', 'Conciliação bancária'],
  },
]
