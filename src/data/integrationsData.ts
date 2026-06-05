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
    desc: 'Atendimento digital, BPO e acesso a +2.000 fornecedores para food service.',
    detailText:
      'A Foozi é parceira estratégica da Granular em atendimento digital, BPO e gestão de compras para food service. Com a integração, sua operação ganha atendimento profissional via WhatsApp, chatbot inteligente e uma central terceirizada que funciona como extensão da sua equipe. Além disso, você acessa uma base de mais de 2.000 fornecedores homologados para o fluxo de compras — cotação, negociação e pedidos gerenciados diretamente na Granular, simplificando toda a cadeia de suprimentos. Com o Executivo de Compras, um profissional dedicado cuida de ponta a ponta: desde a busca dos melhores preços na rede de fornecedores até a formalização dos pedidos, tudo integrado ao controle de estoque e financeiro da Granular. Ideal para operações que querem reduzir custos de insumos, ganhar poder de negociação e eliminar o trabalho manual de compras.',
    tags: ['WhatsApp', 'Chatbot', 'BPO de atendimento', '+2.000 fornecedores', 'Executivo de compras', 'Gestão de compras na Granular', 'Cotação e negociação', 'Central terceirizada'],
    partner: true,
  },
]
