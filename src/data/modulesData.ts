import { Package, ChefHat, Monitor, TrendingUp, ShoppingBag, Users, ClipboardCheck, Bot, UserCog, FileBarChart, Plug, Headphones, PhoneCall } from 'lucide-react'

export interface ModuleDetail {
  icon: typeof Package
  title: string
  desc: string
  features: string[]
  detailText?: string
  detailPoints?: string[]
  screenshot: string
  standalone?: boolean
}

export const modulesDataRestaurantes: ModuleDetail[] = [
  // ─── LINHA 1: iFood, Pessoas, Relatórios, Estoque ───
  {
    icon: ShoppingBag,
    title: 'iFood & Pedidos',
    desc: 'Integração nativa com iFood para gestão centralizada de todos os pedidos.',
    features: ['Integração iFood', 'Painel de pedidos', 'Rastreamento', 'Métricas de delivery', 'Multi-plataforma'],
    detailPoints: [
      'Pedidos do iFood e demais plataformas centralizados em um único painel',
      'Acompanhamento do status de cada entrega em tempo real',
      'Métricas de performance: tempo médio, avaliações e taxa de cancelamento',
      'Visão consolidada de todos os IDs e marcas em uma só tela',
    ],
    screenshot: '',
  },
  {
    icon: UserCog,
    title: 'Pessoas (RH)',
    desc: 'Recrutamento, contratação, escalas, documentos, desempenho e controle de turnover.',
    features: ['Recrutamento e seleção', 'Controle de entrevistas', 'Contratação e onboarding', 'Escalas e turnos (6x1, 12h)', 'Controle de documentos', 'Avaliação de desempenho', 'Custo real por colaborador', 'Produtividade por função', 'Gestão de turnover', 'Plano de carreira', 'Treinamentos e certificações', 'Histórico funcional'],
    detailPoints: [
      'Recrutamento com funil de entrevistas e controle de candidatos',
      'Onboarding digital: documentos, exames e contratos com alertas de vencimento',
      'Escalas inteligentes para turnos de 6x1, 12h e folguistas',
      'Produtividade por função: chapeiro, fritador, montador, auxiliar e estoquista',
      'Custo real por colaborador: salário, encargos, VT e alimentação',
      'Avaliação de desempenho e plano de carreira simplificado (auxiliar → chefe)',
      'Bonificações por resultado e acompanhamento de turnover',
    ],
    screenshot: '/Tela sistema Pessoas Granular People.jpg',
    standalone: true,
  },
  {
    icon: FileBarChart,
    title: 'Relatórios',
    desc: 'Relatórios gerenciais automatizados com insights acionáveis para tomada de decisão.',
    features: ['Relatórios semanais', 'Análises comparativas', 'Indicadores de performance', 'Exportação de dados', 'Visão multi-lojas'],
    detailPoints: [
      'Relatórios gerenciais gerados automaticamente, sem montar planilhas',
      'Comparativo de performance entre unidades',
      'Indicadores principais: vendas, CMV, ticket médio e margem',
      'Dados consolidados e prontos para decisão imediata',
      'Visão multi-lojas para operações com mais de uma unidade',
    ],
    screenshot: '',
  },
  {
    icon: Package,
    title: 'Estoque Inteligente',
    desc: 'Controle total de insumos, compras e inventário com alertas automáticos de reposição.',
    features: ['Operações', 'Análises', 'Compras', 'Transferências', 'Etiquetas e Impressão'],
    detailPoints: [
      'Indicadores em tempo real: Valor Parado, CMV%, Cobertura e Desperdício',
      'Comparativo entre custo fiscal e custo móvel de cada insumo',
      'Histórico de CMV mês a mês para identificar tendências',
      'Gestão de compras e transferências entre unidades',
      'Impressão de etiquetas integrada ao estoque',
    ],
    screenshot: '/Tela Estoque Site.png',
  },
  // ─── LINHA 2: Financeiro, Produção, KDS, CRM ───
  {
    icon: TrendingUp,
    title: 'Financeiro & DRE',
    desc: 'DRE automático, contas a pagar/receber e conciliação bancária integrada.',
    features: ['DRE automático', 'Contas a pagar', 'Contas a receber', 'Conciliação bancária', 'Fluxo de caixa'],
    detailPoints: [
      'DRE gerado automaticamente a partir dos dados reais do sistema',
      'Contas a pagar e receber com vencimentos e alertas',
      'Conciliação bancária integrada sem exportação manual',
      'Fluxo de caixa por unidade com visão diária e mensal',
    ],
    screenshot: '',
  },
  {
    icon: ChefHat,
    title: 'Produção & Fichas Técnicas',
    desc: 'Fichas técnicas detalhadas com custo automático e controle de rendimento.',
    features: ['Fichas técnicas', 'Custo por porção', 'Rendimento', 'Modo de preparo', 'Simulador de preço'],
    detailPoints: [
      'Fichas técnicas completas com ingredientes, quantidades e modo de preparo',
      'Custo por porção calculado e atualizado automaticamente com os preços dos insumos',
      'Simulador de precificação para garantir a margem ideal em cada prato',
      'Controle de rendimento e identificação de desperdício por receita',
    ],
    screenshot: '',
  },
  {
    icon: Monitor,
    title: 'KDS - Kitchen Display',
    desc: 'Painel digital para cozinha com tempos, prioridades e status em tempo real.',
    features: ['Fila de pedidos', 'Tempos por estação', 'Priorização automática', 'Status em tempo real', 'Alertas de atraso'],
    detailPoints: [
      'Fila de pedidos organizada por estação de trabalho, sem comandas de papel',
      'Priorização automática com tempo de preparo visível em tempo real',
      'Alertas visuais e sonoros para pedidos em atraso',
      'Visão simultânea de todas as estações: chapa, fritura, montagem e embalagem',
    ],
    screenshot: '',
  },
  {
    icon: Users,
    title: 'CRM & Clientes',
    desc: 'Base unificada de clientes com histórico de pedidos e segmentação.',
    features: ['Base de clientes', 'Histórico de pedidos', 'Segmentação', 'Campanhas', 'Análise de recorrência'],
    detailPoints: [
      'Base unificada com histórico completo de pedidos por cliente',
      'Segmentação por frequência, ticket médio e preferências',
      'Campanhas direcionadas para aumentar recorrência e faturamento',
      'Análise de comportamento e identificação de clientes em risco de churn',
    ],
    screenshot: '',
  },
  // ─── LINHA 3: Checklists, IA, Foozi, Integrações ───
  {
    icon: ClipboardCheck,
    title: 'Checklists Operacionais',
    desc: 'Rotinas diárias digitalizadas com fotos, evidências e acompanhamento.',
    features: ['Checklists diários', 'Registro com fotos', 'Acompanhamento', 'Templates', 'Relatórios de conformidade'],
    detailPoints: [
      'Checklists personalizados com exigência de foto como evidência',
      'Acompanhamento da execução em tempo real por turno e unidade',
      'Templates prontos para abertura, limpeza, fechamento e segurança',
      'Relatórios de conformidade para garantir padrão entre unidades',
    ],
    screenshot: '',
  },
  {
    icon: Bot,
    title: '15 Agentes de IA',
    desc: 'Assistentes inteligentes para compras, precificação, previsão e mais.',
    features: ['IA de compras', 'IA de precificação', 'Previsão de demanda', 'Alertas inteligentes', 'Recomendações automáticas'],
    detailPoints: [
      'Sugestões de compra baseadas no consumo histórico de cada insumo',
      'Precificação dinâmica com simulações de margem em tempo real',
      'Previsão de demanda por período, produto e canal de venda',
      'Alertas proativos antes que problemas afetam a operação',
      'Recomendações automáticas de ação com base nos dados da sua operação',
    ],
    screenshot: '',
  },
  {
    icon: Headphones,
    title: 'Foozi — Atendimento & Compras',
    desc: 'Atendimento digital, BPO e acesso a +2.000 fornecedores para food service.',
    features: ['WhatsApp', 'Chatbot', 'BPO de atendimento', '+2.000 fornecedores', 'Executivo de compras', 'Cotação e negociação', 'Central terceirizada', 'Gestão na Granular'],
    detailPoints: [
      'Atendimento profissional via WhatsApp com chatbot inteligente',
      'BPO de atendimento: central terceirizada e gerenciada pela Foozi',
      'Acesso a mais de 2.000 fornecedores homologados para food service',
      'Cotação, negociação e pedidos centralizados diretamente na Granular',
    ],
    screenshot: '',
  },
  {
    icon: Plug,
    title: 'Integrações',
    desc: 'Conecte seu ecossistema com iFood, Saipos, Omie, Open Delivery e mais.',
    features: ['iFood', 'Saipos', 'Omie', 'Open Delivery', 'Foozi'],
    detailPoints: [
      'iFood: pedidos recebidos automaticamente, sem gestão manual',
      'Omie: sincronização financeira em tempo real',
      'Saipos: dados do PDV unificados no painel Granular',
      'Open Delivery: padrão aberto de integração com marketplaces',
      'Novas integrações adicionadas continuamente',
    ],
    screenshot: '',
  },
]

// Mercados: estrutura própria com Televendas como primeiro módulo — ajustes finos pendentes
export const modulesDataMercados: ModuleDetail[] = [
  {
    icon: PhoneCall,
    title: 'Televendas',
    desc: 'Sistema de aceleração de propostas comerciais: do pedido verbal à cotação enviada em menos de 2 minutos.',
    features: ['Modo UltraFast: proposta em < 2 min', 'Busca por nome, EAN ou código', 'Edição inline de preço e desconto', 'Controle de alçada por cargo', 'Exportação WhatsApp e PDF', 'Dashboard de performance por vendedor', 'CRM com histórico e segmentação', 'Catálogo com importação Excel'],
    detailPoints: [
      'Modo UltraFast: pedido verbal vira proposta pronta em menos de 2 minutos',
      'Busca por nome, código EAN ou código interno com confirmação instantânea',
      'Edição inline de preço com controle de alçada automático por cargo',
      'Exportação direta por WhatsApp ou PDF com layout profissional',
      'Dashboard com funil de conversão, eficiência de matching e ranking de vendedores',
      'CRM com histórico completo e segmentação de clientes',
      'Catálogo com importação Excel e gestão de apelidos (DE-PARA)',
    ],
    screenshot: '/TEla sistema televendas Granular market.jpg',
    standalone: true,
  },
  {
    icon: ShoppingBag,
    title: 'iFood & Pedidos',
    desc: 'Integração nativa com iFood e plataformas de delivery para gestão centralizada de pedidos.',
    features: ['Integração iFood', 'Painel de pedidos', 'Rastreamento', 'Métricas de delivery', 'Multi-plataforma'],
    detailPoints: [
      'Pedidos do iFood e demais plataformas centralizados em um único painel',
      'Acompanhamento do status de cada entrega em tempo real',
      'Métricas de performance: tempo médio, avaliações e taxa de cancelamento',
      'Visão consolidada de todos os IDs e marcas em uma só tela',
    ],
    screenshot: '',
  },
  {
    icon: UserCog,
    title: 'Pessoas (RH)',
    desc: 'Recrutamento, contratação, escalas, documentos, desempenho e controle de turnover.',
    features: ['Recrutamento e seleção', 'Controle de entrevistas', 'Contratação e onboarding', 'Escalas e turnos (6x1, 12h)', 'Controle de documentos', 'Avaliação de desempenho', 'Custo real por colaborador', 'Produtividade por função', 'Gestão de turnover', 'Plano de carreira', 'Treinamentos e certificações', 'Histórico funcional'],
    detailPoints: [
      'Recrutamento com funil de entrevistas e controle de candidatos',
      'Onboarding digital: documentos, exames e contratos com alertas de vencimento',
      'Escalas inteligentes para turnos de 6x1, 12h e folguistas',
      'Custo real por colaborador: salário, encargos, VT e alimentação',
      'Avaliação de desempenho e plano de carreira simplificado',
      'Bonificações por resultado e acompanhamento de turnover',
    ],
    screenshot: '/Tela sistema Pessoas Granular People.jpg',
    standalone: true,
  },
  {
    icon: FileBarChart,
    title: 'Relatórios',
    desc: 'Relatórios gerenciais automatizados com insights acionáveis para tomada de decisão.',
    features: ['Relatórios semanais', 'Análises comparativas', 'Indicadores de performance', 'Exportação de dados', 'Visão multi-lojas'],
    detailPoints: [
      'Relatórios gerenciais gerados automaticamente, sem montar planilhas',
      'Comparativo de performance entre unidades',
      'Indicadores principais: vendas, CMV, ticket médio e margem',
      'Dados consolidados e prontos para decisão imediata',
      'Visão multi-lojas para operações com mais de uma unidade',
    ],
    screenshot: '',
  },
  {
    icon: Package,
    title: 'Estoque Inteligente',
    desc: 'Controle total de insumos, compras e inventário com alertas automáticos de reposição.',
    features: ['Operações', 'Análises', 'Compras', 'Transferências', 'Etiquetas e Impressão'],
    detailPoints: [
      'Indicadores em tempo real: Valor Parado, CMV%, Cobertura e Desperdício',
      'Comparativo entre custo fiscal e custo móvel de cada produto',
      'Histórico de preços mês a mês para identificar tendências',
      'Gestão de compras e transferências entre unidades',
      'Impressão de etiquetas integrada ao estoque',
    ],
    screenshot: '/Tela Estoque Site.png',
  },
  {
    icon: TrendingUp,
    title: 'Financeiro & DRE',
    desc: 'DRE automático, contas a pagar/receber e conciliação bancária integrada.',
    features: ['DRE automático', 'Contas a pagar', 'Contas a receber', 'Conciliação bancária', 'Fluxo de caixa'],
    detailPoints: [
      'DRE gerado automaticamente a partir dos dados reais do sistema',
      'Contas a pagar e receber com vencimentos e alertas',
      'Conciliação bancária integrada sem exportação manual',
      'Fluxo de caixa por unidade com visão diária e mensal',
    ],
    screenshot: '',
  },
  {
    icon: ChefHat,
    title: 'Produção & Padaria',
    desc: 'Fichas técnicas detalhadas com custo automático e controle de rendimento para padaria e rotisserie.',
    features: ['Fichas técnicas', 'Custo por porção', 'Rendimento', 'Modo de preparo', 'Simulador de preço'],
    detailPoints: [
      'Fichas técnicas para padaria, rotisserie e produtos elaborados',
      'Custo por porção atualizado automaticamente com os preços dos insumos',
      'Simulador de precificação para garantir a margem ideal em cada produto',
      'Controle de rendimento e identificação de desperdício por receita',
    ],
    screenshot: '',
  },
  {
    icon: Monitor,
    title: 'KDS - Kitchen Display',
    desc: 'Painel digital para cozinha, padaria e rotisserie com tempos e status em tempo real.',
    features: ['Fila de pedidos', 'Tempos por estação', 'Priorização automática', 'Status em tempo real', 'Alertas de atraso'],
    detailPoints: [
      'Fila de pedidos organizada por estação: padaria, rotisserie e cozinha quente',
      'Priorização automática com tempo de preparo visível em tempo real',
      'Alertas visuais e sonoros para pedidos em atraso',
      'Substitui comandas de papel em todas as estações de produção',
    ],
    screenshot: '',
  },
  {
    icon: Users,
    title: 'CRM & Clientes',
    desc: 'Base unificada de clientes com histórico de compras, fidelidade e segmentação.',
    features: ['Base de clientes', 'Histórico de pedidos', 'Segmentação', 'Campanhas', 'Análise de recorrência'],
    detailPoints: [
      'Base unificada com histórico completo de compras por cliente',
      'Segmentação por frequência, ticket médio e preferências',
      'Campanhas de fidelidade direcionadas para aumentar recorrência',
      'Análise de comportamento e identificação de clientes em risco de churn',
    ],
    screenshot: '',
  },
  {
    icon: ClipboardCheck,
    title: 'Checklists Operacionais',
    desc: 'Rotinas diárias digitalizadas com fotos, evidências e acompanhamento.',
    features: ['Checklists diários', 'Registro com fotos', 'Acompanhamento', 'Templates', 'Relatórios de conformidade'],
    detailPoints: [
      'Checklists personalizados com exigência de foto como evidência',
      'Acompanhamento da execução em tempo real por turno e unidade',
      'Templates prontos para abertura, limpeza, fechamento e segurança alimentar',
      'Relatórios de conformidade para garantir padrão entre unidades',
    ],
    screenshot: '',
  },
  {
    icon: Bot,
    title: '15 Agentes de IA',
    desc: 'Assistentes inteligentes para compras, precificação, previsão de demanda e mais.',
    features: ['IA de compras', 'IA de precificação', 'Previsão de demanda', 'Alertas inteligentes', 'Recomendações automáticas'],
    detailPoints: [
      'Sugestões de compra baseadas no consumo histórico de cada produto',
      'Precificação dinâmica com simulações de margem em tempo real',
      'Previsão de demanda por período, produto e sazonalidade',
      'Alertas proativos antes que problemas afetam a operação',
      'Recomendações automáticas de ação com base nos dados da sua operação',
    ],
    screenshot: '',
  },
  {
    icon: Plug,
    title: 'Integrações',
    desc: 'Conecte seu ecossistema com as principais plataformas do varejo alimentar.',
    features: ['iFood', 'Saipos', 'Omie', 'Open Delivery', 'ERP'],
    detailPoints: [
      'iFood: pedidos recebidos automaticamente, sem gestão manual',
      'Omie: sincronização financeira em tempo real',
      'Saipos: dados do PDV unificados no painel Granular',
      'Open Delivery: padrão aberto de integração com marketplaces',
      'Novas integrações adicionadas continuamente',
    ],
    screenshot: '',
  },
]

// Alias para compatibilidade com código existente
export const modulesData = modulesDataRestaurantes
