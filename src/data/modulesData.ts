import { Package, ChefHat, Monitor, TrendingUp, ShoppingBag, Users, ClipboardCheck, Bot, UserCog, FileBarChart, Plug, Headphones } from 'lucide-react'

export interface ModuleDetail {
  icon: typeof Package
  title: string
  desc: string
  features: string[]
  detailText: string
  screenshot: string
  standalone?: boolean
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
  {
    icon: UserCog,
    title: 'Pessoas (RH)',
    desc: 'Recrutamento, contratação, escalas, documentos, desempenho e controle de turnover.',
    features: ['Recrutamento e seleção', 'Controle de entrevistas', 'Contratação e onboarding', 'Escalas e turnos (6x1, 12h)', 'Controle de documentos', 'Avaliação de desempenho', 'Custo real por colaborador', 'Produtividade por função', 'Gestão de turnover', 'Plano de carreira', 'Treinamentos e certificações', 'Histórico funcional'],
    detailText: 'O módulo mais completo de gestão de pessoas para food service. Comece pelo recrutamento: publique vagas, controle o funil de entrevistas e acompanhe cada candidato até a contratação. No onboarding, cadastre colaboradores com documentos, exames e contratos — com alertas automáticos de vencimento para reduzir riscos trabalhistas. Monte escalas inteligentes (6x1, turnos de 12h, folguistas) e acompanhe a produtividade por função: chapeiro, fritador, montador, auxiliar, estoquista. Calcule o custo real de cada colaborador (salário × 1.6 a 1.8 com encargos, VT, alimentação e uniforme) e identifique oportunidades de otimização. Avalie desempenho individual, crie planos de carreira simples (auxiliar → cozinheiro → chefe) e implemente bonificações por resultado. Com o turnover do setor entre 60-100% ao ano, ter visibilidade completa sobre a equipe é o que separa operações lucrativas de operações que sangram dinheiro.',
    screenshot: '',
    standalone: true,
  },
  {
    icon: FileBarChart,
    title: 'Relatórios',
    desc: 'Relatórios gerenciais automatizados com insights acionáveis para tomada de decisão.',
    features: ['Relatórios semanais', 'Análises comparativas', 'Indicadores de performance', 'Exportação de dados', 'Visão multi-lojas'],
    detailText: 'Receba relatórios gerenciais automatizados com os principais indicadores da sua operação. Compare performance entre unidades, acompanhe a evolução de vendas, CMV, ticket médio e muito mais. Dados consolidados e prontos para decisão — sem precisar montar planilhas manualmente.',
    screenshot: '',
  },
  {
    icon: Plug,
    title: 'Integrações',
    desc: 'Conecte seu ecossistema com iFood, Saipos, Omie, Open Delivery e mais.',
    features: ['iFood', 'Saipos', 'Omie', 'Open Delivery', 'Foozi'],
    detailText: 'Integre as principais plataformas do mercado ao ecossistema Granular. Receba pedidos do iFood automaticamente, sincronize dados financeiros com o Omie, conecte-se ao padrão Open Delivery e centralize toda a operação em um único lugar. Novas integrações são adicionadas continuamente para acompanhar a evolução do seu negócio.',
    screenshot: '',
  },
  {
    icon: Headphones,
    title: 'Foozi — Atendimento & Compras',
    desc: 'Atendimento digital, BPO e acesso a +2.000 fornecedores para food service.',
    features: ['WhatsApp', 'Chatbot', 'BPO de atendimento', '+2.000 fornecedores', 'Executivo de compras', 'Cotação e negociação', 'Central terceirizada', 'Gestão na Granular'],
    detailText: 'A Foozi é parceira estratégica da Granular em atendimento digital, BPO e gestão de compras para food service. Com a integração, sua operação ganha atendimento profissional via WhatsApp, chatbot inteligente e uma central terceirizada. Além disso, você acessa uma base de mais de 2.000 fornecedores homologados para o fluxo de compras — cotação, negociação e pedidos gerenciados diretamente na Granular.',
    screenshot: '',
    standalone: true,
  },
]
