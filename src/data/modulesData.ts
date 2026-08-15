import { Package, ChefHat, Monitor, TrendingUp, ShoppingBag, Users, ClipboardCheck, Bot, UserCog, FileBarChart, Plug, PhoneCall, Tablet, LayoutGrid, Camera, Shield, Lock } from 'lucide-react'

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
    title: 'Monitor de Pedidos',
    desc: 'KDS (Kitchen Display System): painel digital para cozinha com tempos, prioridades e status em tempo real.',
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
  // ─── LINHA 3: Checklists, IA, Totem, Salão ───
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
    title: 'Granu | A sua IA',
    desc: 'A IA do sistema inteiro. Ela responde com número, evidência e o que fazer agora.',
    features: ['Sistema inteiro', 'Resposta com evidência', 'WhatsApp e plataforma', 'Alertas que chegam sozinhos', 'Plano de ação na conversa'],
    detailPoints: [
      'Não é chatbot em cima de relatório: é o sistema, e conhece cada grão dele',
      'Conectada a cada venda, item de estoque e centavo de repasse — em tempo real',
      'Responde em segundos, com tabela pronta e plano de ação',
      'No WhatsApp ela te chama; na plataforma, a mesma conversa com a evidência do cubo',
      'Quatro frentes, uma conversa: operação e lucro no mesmo lugar',
    ],
    screenshot: '',
  },
  {
    icon: Tablet,
    title: 'Totem de Autoatendimento',
    desc: 'Pedidos direto pelo cliente, sem fila no balcão. Cardápio digital interativo com pagamento integrado.',
    features: ['Cardápio digital', 'Pedido autônomo', 'Pagamento integrado', 'Upsell automático', 'Envio direto ao KDS'],
    detailPoints: [
      'Cliente faz o pedido diretamente no totem com cardápio visual e preços sempre atualizados',
      'Pagamento integrado: cartão de débito/crédito, PIX e voucher alimentação no próprio totem',
      'Pedido enviado automaticamente ao KDS da cozinha, sem intervenção manual no balcão',
      'Upsell inteligente: sugestão de combos e adicionais no fluxo do pedido aumenta o ticket médio',
      'Controle de senhas e retirada no balcão com painel de chamada integrado',
      'Redução de fila e aumento de capacidade de atendimento nos horários de pico',
    ],
    screenshot: '',
  },
  {
    icon: LayoutGrid,
    title: 'Gestão de Salão',
    desc: 'Mapa de mesas, comanda digital e controle de ocupação para operação de salão completa.',
    features: ['Mapa de mesas', 'Comanda digital', 'App do garçom', 'Giro de mesas', 'Divisão de conta'],
    detailPoints: [
      'Mapa visual do salão com status de cada mesa em tempo real: livre, ocupada ou aguardando pagamento',
      'Comanda digital pelo garçom via app mobile — pedidos enviados diretamente ao KDS da cozinha',
      'Controle de ocupação, tempo de mesa e giro por turno para identificar gargalos',
      'Divisão de conta flexível: por item, por pessoa ou valor livre sem necessidade de reimpressão',
      'Pagamento na mesa com cartão ou PIX sem deslocar o cliente até o caixa',
      'Histórico por mesa para identificar horários de pico e oportunidades de giro no salão',
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
    desc: 'Gestão de estoque para o varejo alimentar: do recebimento à gôndola, com controle por seção e alerta de ruptura.',
    features: ['Por seção/departamento', 'Alerta de ruptura de gôndola', 'Perecíveis e validade', 'Conferência por EAN', 'CMV por departamento', 'Reposição min/max', 'Controle de perdas', 'Múltiplos fornecedores'],
    detailPoints: [
      'Gestão por seção: açougue, padaria, FLV, mercearia, bebidas e limpeza com indicadores independentes',
      'Alerta de ruptura de gôndola antes que o cliente note: reposição automática por nível mínimo configurado',
      'Controle de perecíveis e validade: alertas de vencimento e baixa automática de produtos fora do prazo',
      'Recebimento com conferência por EAN/código de barras: divergências detectadas na entrada da mercadoria',
      'CMV por departamento e categoria para identificar onde a margem está sendo pressionada',
      'Inventário rotativo por seção sem parar a operação — ciclos programáveis por departamento',
      'Controle de perdas e quebras: registro de motivo, responsável e impacto financeiro por ocorrência',
      'Gestão de múltiplos fornecedores por categoria com histórico de preços e avaliação de desempenho',
    ],
    screenshot: '',
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
    title: 'Monitor de Pedidos',
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
    title: 'Granu | A sua IA',
    desc: 'A IA do sistema inteiro. Ela responde com número, evidência e o que fazer agora.',
    features: ['Sistema inteiro', 'Resposta com evidência', 'WhatsApp e plataforma', 'Alertas que chegam sozinhos', 'Plano de ação na conversa'],
    detailPoints: [
      'Não é chatbot em cima de relatório: é o sistema, e conhece cada grão dele',
      'Conectada a cada venda, item de estoque e centavo de repasse — em tempo real',
      'Responde em segundos, com tabela pronta e plano de ação',
      'No WhatsApp ela te chama; na plataforma, a mesma conversa com a evidência do cubo',
      'Quatro frentes, uma conversa: operação e lucro no mesmo lugar',
    ],
    screenshot: '',
  },
  {
    icon: Plug,
    title: 'Integrações',
    desc: 'Conecte seu ecossistema com as principais plataformas do varejo alimentar.',
    features: ['iFood', 'Anota AI', '99Food', 'Omie', 'Open Delivery', 'ERP'],
    detailPoints: [
      'iFood: pedidos recebidos automaticamente, sem gestão manual',
      'Anota AI: pedidos do cardápio digital centralizados na Granular',
      '99Food: gestão de pedidos integrada ao painel Granular',
      'Omie: sincronização financeira em tempo real',
      'Open Delivery: padrão aberto de integração com marketplaces',
      'Novas integrações adicionadas continuamente',
    ],
    screenshot: '',
  },
]

// Módulo Produção & CMV adaptado para farmácias e pet shops
const producaoCMVFarmaciaPetshop: ModuleDetail = {
  icon: ChefHat,
  title: 'Produção & CMV',
  desc: 'Controle de produção de itens promocionais e CMV para ações dentro da loja e no online.',
  features: ['Fichas de combos', 'Custo por combo', 'Ações promocionais', 'Controle de CMV', 'Produção in-store e online'],
  detailPoints: [
    'Cadastro de combos e kits promocionais com cálculo automático de custo e margem',
    'Controle de CMV por ação promocional: saiba exatamente quanto cada combo ou oferta consome',
    'Gestão de itens manipulados para venda: fracionamento, reembalagem e montagem de kits',
    'Ações in-store: controle de produção de combos e itens especiais no ponto de venda',
    'Ações online: gestão de combos publicados em plataformas de delivery com rastreio de CMV',
    'Simulador de precificação para garantir margem mínima em cada promoção criada',
  ],
  screenshot: '',
}

const adaptModuleForFarmaciaPetshop = (m: ModuleDetail): ModuleDetail => {
  if (m.title === 'Produção & Fichas Técnicas') return producaoCMVFarmaciaPetshop
  if (m.title === 'Monitor de Pedidos') return {
    ...m,
    title: 'Monitor de Pedidos',
    desc: 'Painel digital para operação de delivery com tempos, prioridades e status em tempo real dos pedidos.',
    detailPoints: [
      'Fila de pedidos de delivery organizada por canal, sem comandas de papel',
      'Priorização automática com tempo de preparo visível em tempo real',
      'Alertas visuais e sonoros para pedidos em atraso',
      'Visão simultânea de todos os pedidos ativos por status de entrega',
    ],
  }
  return m
}

// Market: CFTV & Security modules — exclusive to Plano 3, "sob consulta"
export const modulesDataMercadosCFTV: ModuleDetail[] = [
  {
    icon: Camera,
    title: 'CFTV & Câmeras',
    desc: '16 câmeras integradas ao sistema, com foco em açougue, caixa e estoque.',
    features: ['Grade ao vivo 4/9/16', 'Anti-fraude no caixa', '5 câmeras açougue', 'Zonas configuráveis', 'Alertas automáticos', 'Auditoria de pesagem'],
    detailPoints: [
      'Grade ao vivo com 4, 9 ou 16 câmeras simultâneas no painel de gestão',
      'Câmera posicionada abaixo do caixa para conferência de carrinho e prevenção de fraude',
      '5 câmeras overhead no açougue: cada corte, pesagem e etiquetagem é registrado',
      'Cruzamento automático balança × etiqueta — alerta imediato em divergência acima de 5%',
      'Zonas independentes: frente/caixa, açougue, estoque, entrada, corredor, carregamento',
      'Clips exportáveis para auditoria, processos e treinamento de equipe',
    ],
    screenshot: '',
  },
  {
    icon: Shield,
    title: 'Alarmes & Zonas',
    desc: 'Arme e desarme por zona, com escalonamento automático de contatos em ocorrências.',
    features: ['8 zonas independentes', 'Sensores PIR e porta', 'Fumaça e pânico', 'Escalonamento automático', 'Painel de eventos', 'Histórico auditável'],
    detailPoints: [
      '8 zonas de segurança com arme e desarme independentes por área da loja',
      'Sensores PIR de movimento, abertura de porta, fumaça/incêndio e botão de pânico',
      'Escalonamento automático: Gerente → Coordenador → Central → Polícia → Bombeiros',
      'Painel de eventos em tempo real com histórico auditável por turno',
      'Registro preciso de horário, responsável e zona para cada ocorrência',
    ],
    screenshot: '',
  },
  {
    icon: Lock,
    title: 'Controle de Acesso',
    desc: 'RFID, biometria e PIN para áreas restritas, com log auditável de cada entrada e saída.',
    features: ['6 áreas restritas', 'RFID + biometria + PIN', 'Controle de lotação', 'Registro de visitantes', 'Log em tempo real', 'Permissões por cargo'],
    detailPoints: [
      '6 áreas restritas com autenticação por RFID, biometria ou biometria + PIN',
      'Controle de lotação em tempo real por área da loja',
      'Permissões configuradas por cargo: separador, coordenador, gestor, admin',
      'Registro de visitantes com entrada, saída e responsável identificados',
      'Log auditável completo: quem entrou, onde, quando e por quanto tempo',
    ],
    screenshot: '',
  },
]

const farmaciaPetshopExclude = new Set(['Foozi — Atendimento & Compras', 'Totem de Autoatendimento', 'Gestão de Salão'])

export const modulesDataFarmacias: ModuleDetail[] = modulesDataRestaurantes
  .filter((m) => !farmaciaPetshopExclude.has(m.title))
  .map(adaptModuleForFarmaciaPetshop)

export const modulesDataPetshop: ModuleDetail[] = modulesDataRestaurantes
  .filter((m) => !farmaciaPetshopExclude.has(m.title))
  .map(adaptModuleForFarmaciaPetshop)

const adaptModuleForShopping = (m: ModuleDetail): ModuleDetail => {
  if (m.title === 'Produção & Fichas Técnicas') {
    return {
      ...m,
      title: 'Kits & Presenteáveis',
      desc: 'Cestas, kits e sazonal com custo automático e margem por item — do Dia das Mães ao Natal.',
      detailPoints: [
        'Montagem de cestas e kits com custo calculado sozinho',
        'Campanhas sazonais com margem por item, não por feeling',
        'Validade curta da floricultura entra no custo do presente',
        'Perdas e quebras registradas na origem, sem planilha',
      ],
    }
  }
  if (m.title === 'Estoque Inteligente') {
    return {
      ...m,
      desc: 'Mix longo de brinquedos, flores, presenteáveis e utilidades — ruptura, validade e giro no mesmo painel.',
      detailPoints: [
        'Entradas e saídas com saldo em tempo real por categoria da loja',
        'Alerta antes da flor murchar e do brinquedo sumir no fim de semana',
        'Inventário guiado com divergências apontadas',
        'Compra sugerida pela previsão de consumo, não pelo susto',
      ],
    }
  }
  if (m.title === 'CRM & Clientes') {
    return {
      ...m,
      desc: 'Base de quem compra presente o ano inteiro — aniversário, datas comemorativas e recorrência.',
      detailPoints: [
        'Base unificada de clientes da loja e do delivery',
        'Segmentação por ocasião: aniversário, Dia das Mães, Natal',
        'Recuperação de quem parou de comprar presente',
        'Campanha com ROI medido, sem disparo zumbi',
      ],
    }
  }
  if (m.title === 'Monitor de Pedidos') {
    return {
      ...m,
      desc: 'Painel digital para delivery da loja com tempos, prioridades e status em tempo real.',
      detailPoints: [
        'Fila de pedidos de delivery organizada por canal',
        'Priorização automática com tempo visível em tempo real',
        'Alertas para pedidos em atraso antes do SLA estourar',
        'Visão de todos os pedidos ativos por status de entrega',
      ],
    }
  }
  return m
}

export const modulesDataShopping: ModuleDetail[] = modulesDataRestaurantes
  .filter((m) => !farmaciaPetshopExclude.has(m.title))
  .map(adaptModuleForFarmaciaPetshop)
  .map(adaptModuleForShopping)

// Alias para compatibilidade com código existente
export const modulesData = modulesDataRestaurantes
