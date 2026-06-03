import { Package, ChefHat, Monitor, TrendingUp, ShoppingBag, Users, ClipboardCheck, Bot } from 'lucide-react'

export interface ModuleDetail {
  icon: typeof Package
  title: string
  desc: string
  features: string[]
  detailText: string
  screenshot: string
}

export const modulesData: ModuleDetail[] = [
  {
    icon: Package,
    title: 'Estoque Inteligente',
    desc: 'Controle total de insumos, compras e inventário com alertas automáticos de reposição.',
    features: ['Operações', 'Análises', 'Compras', 'Transferências', 'Etiquetas e Impressão'],
    detailText: 'Tenha visão completa do seu estoque com indicadores de Valor Parado, Potencial Perdido, CMV%, Cobertura Média e Desperdício. Compare o custo fiscal com o custo móvel de cada insumo, acompanhe a evolução do CMV histórico mês a mês e identifique divergências de lead time e drift de preço. Gerencie compras, transferências entre unidades e imprima etiquetas — tudo em um só lugar.',
    screenshot: '/Tela Estoque Site.png',
  },
  {
    icon: ChefHat,
    title: 'Produção & Fichas Técnicas',
    desc: 'Fichas técnicas detalhadas com custo automático e controle de rendimento.',
    features: ['Fichas técnicas', 'Custo por porção', 'Rendimento', 'Modo de preparo', 'Simulador de preço'],
    detailText: 'Cadastre fichas técnicas completas com ingredientes, quantidades e modo de preparo. O sistema calcula automaticamente o custo por porção e atualiza conforme os preços dos insumos mudam. Simule cenários de precificação e garanta a margem ideal em cada prato.',
    screenshot: '',
  },
  {
    icon: Monitor,
    title: 'KDS - Kitchen Display',
    desc: 'Painel digital para cozinha com tempos, prioridades e status em tempo real.',
    features: ['Fila de pedidos', 'Tempos por estação', 'Priorização automática', 'Status em tempo real', 'Alertas de atraso'],
    detailText: 'Substitua as comandas de papel por um painel digital inteligente. O KDS organiza os pedidos por estação de trabalho, prioriza automaticamente e exibe tempos de preparo em tempo real. Alertas visuais e sonoros garantem que nenhum pedido atrase.',
    screenshot: '',
  },
  {
    icon: TrendingUp,
    title: 'Financeiro & DRE',
    desc: 'DRE automático, contas a pagar/receber e conciliação bancária integrada.',
    features: ['DRE automático', 'Contas a pagar', 'Contas a receber', 'Conciliação bancária', 'Fluxo de caixa'],
    detailText: 'Acompanhe a saúde financeira da sua operação com DRE gerado automaticamente a partir dos dados reais do sistema. Gerencie contas a pagar e receber, faça conciliação bancária e tenha visão clara do fluxo de caixa por unidade.',
    screenshot: '',
  },
  {
    icon: ShoppingBag,
    title: 'iFood & Pedidos',
    desc: 'Integração nativa com iFood para gestão centralizada de todos os pedidos.',
    features: ['Integração iFood', 'Painel de pedidos', 'Rastreamento', 'Métricas de delivery', 'Multi-plataforma'],
    detailText: 'Centralize todos os pedidos do iFood e demais plataformas em um único painel. Acompanhe o status de cada entrega em tempo real, analise métricas de performance do delivery e identifique oportunidades de melhoria no tempo e na avaliação.',
    screenshot: '',
  },
  {
    icon: Users,
    title: 'CRM & Clientes',
    desc: 'Base unificada de clientes com histórico de pedidos e segmentação.',
    features: ['Base de clientes', 'Histórico de pedidos', 'Segmentação', 'Campanhas', 'Análise de recorrência'],
    detailText: 'Conheça seus clientes a fundo com uma base unificada que registra todo o histórico de pedidos. Segmente por frequência, ticket médio e preferências para criar campanhas direcionadas que aumentam a recorrência e o faturamento.',
    screenshot: '',
  },
  {
    icon: ClipboardCheck,
    title: 'Checklists Operacionais',
    desc: 'Rotinas diárias digitalizadas com fotos, evidências e acompanhamento.',
    features: ['Checklists diários', 'Registro com fotos', 'Acompanhamento', 'Templates', 'Relatórios de conformidade'],
    detailText: 'Digitalize as rotinas operacionais da sua cozinha e salão. Crie checklists personalizados com exigência de fotos como evidência, acompanhe a execução em tempo real e gere relatórios de conformidade para garantir a padronização entre unidades.',
    screenshot: '',
  },
  {
    icon: Bot,
    title: '15 Agentes de IA',
    desc: 'Assistentes inteligentes para compras, precificação, previsão e mais.',
    features: ['IA de compras', 'IA de precificação', 'Previsão de demanda', 'Alertas inteligentes', 'Recomendações automáticas'],
    detailText: 'Conte com 15 agentes de inteligência artificial que trabalham nos bastidores da sua operação. Desde sugestões de compra baseadas em consumo histórico até precificação dinâmica e previsão de demanda — a IA da Granular antecipa problemas e recomenda ações antes que você precise pedir.',
    screenshot: '',
  },
]
