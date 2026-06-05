export interface IntegrationDetail {
  name: string
  logo: string
  desc: string
  detailText: string
  tags: string[]
  partner?: boolean
}

export const integrationsData: IntegrationDetail[] = [
  {
    name: 'iFood',
    logo: 'https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-0.png',
    desc: 'Receba e gerencie pedidos do iFood direto no painel Granular.',
    detailText:
      'A integração com o iFood permite que todos os pedidos entrem automaticamente no sistema Granular, eliminando a necessidade de gerenciamento manual. Acompanhe status de entregas, métricas de performance, avaliações e tempo médio de preparo — tudo centralizado. Consolide a gestão de todos os IDs e marcas, com visão unificada dos resultados. Ativação simples diretamente via Portal do Parceiro iFood.',
    tags: ['Pedidos automáticos', 'Rastreamento', 'Métricas de delivery', 'Avaliações'],
  },
  {
    name: 'Saipos',
    logo: '/logos/saipos.svg',
    desc: 'Sincronize dados do PDV Saipos com a gestão Granular.',
    detailText:
      'Conecte o PDV Saipos ao ecossistema Granular para unificar dados de vendas, produtos e faturamento. A integração garante que todas as transações realizadas no ponto de venda sejam refletidas nos relatórios e dashboards da Granular em tempo real, facilitando a conciliação e a tomada de decisão.',
    tags: ['PDV integrado', 'Vendas em tempo real', 'Conciliação', 'Relatórios unificados'],
  },
  {
    name: 'Open Delivery',
    logo: '/logos/opendelivery.webp',
    desc: 'Padrão aberto para conectar múltiplas plataformas de delivery.',
    detailText:
      'O Open Delivery é o padrão aberto do mercado brasileiro de food service que permite a integração entre diferentes plataformas de delivery. Com essa integração, a Granular recebe pedidos de qualquer marketplace compatível com o protocolo, ampliando sua cobertura e eliminando a dependência de uma única plataforma.',
    tags: ['Multi-plataforma', 'Padrão aberto', 'Escalabilidade', 'Marketplace'],
  },
  {
    name: 'Omie',
    logo: '/logos/omie.png',
    desc: 'Integração financeira completa com o ERP Omie.',
    detailText:
      'Sincronize automaticamente dados financeiros entre a Granular e o ERP Omie. Contas a pagar, contas a receber, notas fiscais e conciliação bancária fluem entre os dois sistemas sem intervenção manual, garantindo que a contabilidade esteja sempre atualizada e reduzindo o retrabalho da equipe financeira.',
    tags: ['ERP', 'Financeiro', 'Notas fiscais', 'Conciliação bancária'],
  },
  {
    name: 'Foozi',
    logo: '/logos/foozi.svg',
    desc: 'Plataforma completa de atendimento digital e BPO para food service.',
    detailText:
      'A Foozi é a nossa parceira estratégica em atendimento digital e BPO (Business Process Outsourcing) para food service. Com a Foozi integrada à Granular, sua operação ganha um canal de atendimento profissional via WhatsApp, chatbot inteligente, gestão de pedidos por mensagem e uma central de atendimento terceirizada que funciona como extensão da sua equipe. A combinação Granular + Foozi entrega gestão operacional completa junto com atendimento ao cliente de alto nível — tudo em um único ecossistema. Ideal para redes que querem escalar o atendimento sem aumentar a equipe interna.',
    tags: ['WhatsApp', 'Chatbot', 'BPO de atendimento', 'Central terceirizada', 'Pedidos por mensagem', 'Atendimento 24h'],
    partner: true,
  },
]
