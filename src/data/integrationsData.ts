export interface IntegrationDetail {
  name: string
  logo: string
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
    name: 'Saipos',
    logo: '/logos/saipos.svg',
    desc: 'Sincronize dados do PDV Saipos com a gestão Granular.',
    detailPoints: [
      'Dados de vendas, produtos e faturamento do PDV unificados na Granular',
      'Transações refletidas nos relatórios e dashboards em tempo real',
      'Conciliação automática entre ponto de venda e gestão financeira',
      'Elimina retrabalho de lançamento manual entre sistemas',
    ],
    tags: ['PDV integrado', 'Vendas em tempo real', 'Conciliação', 'Relatórios unificados'],
  },
  {
    name: 'Open Delivery',
    logo: '/logos/opendelivery.webp',
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
    desc: 'Integração financeira completa com o ERP Omie.',
    detailPoints: [
      'Sincronização automática de contas a pagar e receber entre Granular e Omie',
      'Notas fiscais e conciliação bancária fluem entre os sistemas sem intervenção manual',
      'Contabilidade sempre atualizada, sem retrabalho para a equipe financeira',
      'Visão unificada do financeiro em um único ecossistema',
    ],
    tags: ['ERP', 'Financeiro', 'Notas fiscais', 'Conciliação bancária'],
  },
  {
    name: 'Foozi',
    logo: '/logos/foozi.svg',
    desc: 'Atendimento digital, BPO e acesso a +2.000 fornecedores para food service.',
    detailPoints: [
      'Atendimento profissional via WhatsApp com chatbot inteligente integrado',
      'BPO de atendimento: central terceirizada que funciona como extensão da sua equipe',
      'Acesso a mais de 2.000 fornecedores homologados para food service',
      'Cotação, negociação e pedidos de compra gerenciados diretamente na Granular',
      'Executivo de Compras dedicado: cuida de ponta a ponta desde a busca de preços até a formalização dos pedidos',
      'Tudo integrado ao controle de estoque e financeiro da Granular',
    ],
    tags: ['WhatsApp', 'Chatbot', 'BPO de atendimento', '+2.000 fornecedores', 'Executivo de compras', 'Gestão de compras na Granular', 'Cotação e negociação', 'Central terceirizada'],
    partner: true,
  },
]
