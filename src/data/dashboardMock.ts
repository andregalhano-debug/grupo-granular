export interface ClientProfile {
  id: string
  name: string
  businessName: string
  businessType: string
  operationType: string
  monthlyRevenue: string
  employeeCount: number
  mainPlatforms: string[]
  city: string
  painPoints: string[]
  chatbotSummary: string
}

export interface SessionActionItem {
  text: string
  completed: boolean
}

export interface ConsultingSession {
  id: string
  client: ClientProfile
  date: string
  time: string
  duration: number
  type: 'primeira-sessao' | 'acompanhamento' | 'diagnostico'
  status: 'confirmada' | 'pendente' | 'em-andamento'
  meetLink: string
  calendarSynced: boolean
  briefing: {
    objective: string
    keyMetrics: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[]
    chatbotInsights: string[]
    recommendedApproach: string
  }
  preparation: {
    previousActionItems: SessionActionItem[]
    keyDataPoints: { label: string; value: string }[]
    suggestedTopics: string[]
    notes: string
  }
}

export interface ConsultationPhase {
  id: string
  name: string
  description: string
  duration: string
  checklist: string[]
  tips: string[]
}

const today = new Date()
function dateOffset(days: number): string {
  const d = new Date(today)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
}

export const mockConsultantName = 'Rafael Mendes'

export const mockSessions: ConsultingSession[] = [
  {
    id: 's1',
    client: {
      id: 'cl1', name: 'Marcos Tavares', businessName: 'Sabor & Arte Burger',
      businessType: 'Hamburgueria', operationType: 'Delivery + Salão',
      monthlyRevenue: 'R$ 85.000', employeeCount: 12,
      mainPlatforms: ['iFood', 'Rappi'], city: 'São Paulo, SP',
      painPoints: ['Tempo de preparo acima de 25 min', 'Perda de insumos na cozinha', 'Avaliação iFood caindo'],
      chatbotSummary: 'Cliente relatou que o tempo de preparo médio subiu para 28 minutos após contratação de novos funcionários. Pediu ajuda para reorganizar o fluxo da cozinha e melhorar a nota no iFood que caiu de 4.6 para 4.2.',
    },
    date: dateOffset(0), time: '09:00', duration: 60,
    type: 'primeira-sessao', status: 'confirmada',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    calendarSynced: true,
    briefing: {
      objective: 'Reduzir tempo de preparo e recuperar nota no iFood',
      keyMetrics: [
        { label: 'Tempo preparo', value: '28 min', trend: 'up' },
        { label: 'Nota iFood', value: '4.2', trend: 'down' },
        { label: 'Pedidos/dia', value: '95', trend: 'neutral' },
        { label: 'CMV', value: '34%', trend: 'up' },
      ],
      chatbotInsights: [
        'Cliente mencionou que novos funcionários não receberam treinamento adequado',
        'Reclamações frequentes de atraso nas últimas 2 semanas',
        'Interesse em implementar KDS para organizar a produção',
        'Já tentou reorganizar o layout da cozinha sem sucesso',
      ],
      recommendedApproach: 'Iniciar com diagnóstico do fluxo de cozinha e mapear gargalos. Propor implementação de KDS e treinamento da equipe. Definir SLAs de preparo por produto.',
    },
    preparation: {
      previousActionItems: [],
      keyDataPoints: [
        { label: 'Faturamento', value: 'R$ 85.000/mês' },
        { label: 'Ticket médio', value: 'R$ 42' },
        { label: 'Funcionários', value: '12' },
        { label: 'Horário pico', value: '19h-21h' },
      ],
      suggestedTopics: ['Mapeamento do fluxo de cozinha', 'Análise do cardápio por tempo de preparo', 'Proposta de KDS', 'Plano de treinamento'],
      notes: '',
    },
  },
  {
    id: 's2',
    client: {
      id: 'cl2', name: 'Maria Aparecida', businessName: 'Dona Maria Marmitex',
      businessType: 'Restaurante', operationType: 'Delivery',
      monthlyRevenue: 'R$ 45.000', employeeCount: 6,
      mainPlatforms: ['iFood'], city: 'Belo Horizonte, MG',
      painPoints: ['CMV acima de 38%', 'Sem controle de fichas técnicas', 'Desperdício alto'],
      chatbotSummary: 'Parceira desde o mês passado. Na última sessão definimos implementar fichas técnicas para os 10 pratos principais. Relatou que conseguiu fazer 4 fichas mas travou nas outras por dificuldade em pesar ingredientes.',
    },
    date: dateOffset(0), time: '14:00', duration: 60,
    type: 'acompanhamento', status: 'confirmada',
    meetLink: 'https://meet.google.com/klm-nopq-rst',
    calendarSynced: true,
    briefing: {
      objective: 'Acompanhar fichas técnicas e reduzir CMV para 32%',
      keyMetrics: [
        { label: 'CMV atual', value: '36%', trend: 'down' },
        { label: 'Fichas prontas', value: '4/10', trend: 'up' },
        { label: 'Desperdício', value: '8%', trend: 'down' },
        { label: 'Pedidos/dia', value: '65', trend: 'up' },
      ],
      chatbotInsights: [
        'Conseguiu reduzir CMV de 38% para 36% com as 4 fichas implementadas',
        'Dificuldade em pesar ingredientes — não tem balança de precisão',
        'Quer entender como precificar pratos novos',
        'Perguntou sobre integração com sistema de estoque',
      ],
      recommendedApproach: 'Revisar as 4 fichas prontas, ajudar a completar as 6 restantes. Recomendar balança de precisão. Mostrar como o sistema calcula CMV automaticamente.',
    },
    preparation: {
      previousActionItems: [
        { text: 'Criar fichas técnicas dos 10 pratos principais', completed: false },
        { text: 'Implementar controle de porcionamento', completed: true },
        { text: 'Revisar fornecedores de proteína', completed: false },
        { text: 'Cadastrar receitas no sistema Granular', completed: false },
      ],
      keyDataPoints: [
        { label: 'CMV anterior', value: '38%' },
        { label: 'CMV atual', value: '36%' },
        { label: 'Meta CMV', value: '32%' },
        { label: 'Pratos no cardápio', value: '18' },
      ],
      suggestedTopics: ['Completar fichas técnicas', 'Equipamento de pesagem', 'Precificação de novos pratos', 'Demo do módulo de estoque'],
      notes: '',
    },
  },
  {
    id: 's3',
    client: {
      id: 'cl3', name: 'Kenji Yamamoto', businessName: 'Tokyo Express',
      businessType: 'Dark Kitchen', operationType: 'Delivery',
      monthlyRevenue: 'R$ 120.000', employeeCount: 8,
      mainPlatforms: ['iFood', 'Rappi', 'Uber Eats'], city: 'São Paulo, SP',
      painPoints: ['Nota iFood 3.9', 'Muitos cancelamentos', 'Embalagem inadequada'],
      chatbotSummary: 'Cliente preocupado com nota baixa no iFood (3.9). Relatou 15% de cancelamentos por atraso e reclamações de comida chegando fria. Opera em 3 marketplaces mas não tem controle centralizado dos pedidos.',
    },
    date: dateOffset(1), time: '10:00', duration: 60,
    type: 'diagnostico', status: 'confirmada',
    meetLink: 'https://meet.google.com/uvw-xyza-bcd',
    calendarSynced: true,
    briefing: {
      objective: 'Diagnóstico completo: rankeamento iFood, cancelamentos e embalagens',
      keyMetrics: [
        { label: 'Nota iFood', value: '3.9', trend: 'down' },
        { label: 'Cancelamentos', value: '15%', trend: 'up' },
        { label: 'Faturamento', value: 'R$ 120k', trend: 'neutral' },
        { label: 'Tempo entrega', value: '52 min', trend: 'up' },
      ],
      chatbotInsights: [
        'Opera em 3 marketplaces sem gestão centralizada de pedidos',
        'Embalagens atuais não mantêm temperatura — especialmente sushi',
        'Já perdeu selo Super Restaurante no iFood',
        'Interesse em automação de aceite de pedidos',
      ],
      recommendedApproach: 'Focar primeiro no iFood (maior volume). Diagnóstico de embalagens, implementar gestão centralizada de pedidos, trabalhar SLA de entrega. Meta: nota 4.5 em 60 dias.',
    },
    preparation: {
      previousActionItems: [],
      keyDataPoints: [
        { label: 'Marketplaces', value: '3 ativos' },
        { label: 'Pedidos/dia', value: '140' },
        { label: 'Ticket médio', value: 'R$ 58' },
        { label: 'Raio entrega', value: '7 km' },
      ],
      suggestedTopics: ['Auditoria de embalagens', 'Gestão multi-marketplace', 'Estratégia de rankeamento iFood', 'Automação de pedidos'],
      notes: '',
    },
  },
  {
    id: 's4',
    client: {
      id: 'cl4', name: 'Renata Oliveira', businessName: 'Café Colonial da Vila',
      businessType: 'Cafeteria', operationType: 'Salão + Delivery',
      monthlyRevenue: 'R$ 35.000', employeeCount: 5,
      mainPlatforms: ['iFood'], city: 'Curitiba, PR',
      painPoints: ['Delivery representa só 15% da receita', 'Cardápio não adaptado para delivery', 'Sem presença digital'],
      chatbotSummary: 'Dona de cafeteria tradicional querendo expandir para delivery. Faturamento de R$ 35k quase todo presencial. Não sabe como adaptar bolos e salgados para entrega. Pediu ajuda para começar no iFood.',
    },
    date: dateOffset(2), time: '11:00', duration: 60,
    type: 'primeira-sessao', status: 'pendente',
    meetLink: 'https://meet.google.com/efg-hijk-lmn',
    calendarSynced: false,
    briefing: {
      objective: 'Estruturar operação de delivery e adaptar cardápio',
      keyMetrics: [
        { label: '% Delivery', value: '15%', trend: 'neutral' },
        { label: 'Faturamento', value: 'R$ 35k', trend: 'neutral' },
        { label: 'Itens cardápio', value: '45', trend: 'neutral' },
        { label: 'Nota iFood', value: '4.0', trend: 'neutral' },
      ],
      chatbotInsights: [
        'Primeira experiência com consultoria de delivery',
        'Cardápio extenso (45 itens) — muitos não viáveis para entrega',
        'Sem embalagens próprias — usa genéricas',
        'Quer atingir 40% de receita via delivery em 6 meses',
      ],
      recommendedApproach: 'Começar pela curadoria do cardápio: selecionar 15-20 itens viáveis para delivery. Definir embalagens adequadas. Otimizar perfil no iFood com fotos profissionais.',
    },
    preparation: {
      previousActionItems: [],
      keyDataPoints: [
        { label: 'Faturamento', value: 'R$ 35.000' },
        { label: 'Meta delivery', value: '40% receita' },
        { label: 'Funcionários', value: '5' },
        { label: 'Área', value: 'Centro de Curitiba' },
      ],
      suggestedTopics: ['Seleção de itens para delivery', 'Embalagens adequadas', 'Fotografia de cardápio', 'Configuração do perfil iFood'],
      notes: '',
    },
  },
  {
    id: 's5',
    client: {
      id: 'cl5', name: 'Giovanni Rossi', businessName: 'Pizza Napoli',
      businessType: 'Pizzaria', operationType: 'Delivery + Balcão',
      monthlyRevenue: 'R$ 95.000', employeeCount: 10,
      mainPlatforms: ['iFood', 'Site próprio'], city: 'São Paulo, SP',
      painPoints: ['Logística de entregadores próprios', 'Alto custo com motoboys', 'Inconsistência na qualidade'],
      chatbotSummary: 'Parceiro em acompanhamento. Na sessão anterior implementamos controle de qualidade com checklist. Relatou melhora na consistência mas ainda tem problemas com custo de entrega (R$ 8.500/mês com motoboys próprios).',
    },
    date: dateOffset(3), time: '15:00', duration: 60,
    type: 'acompanhamento', status: 'confirmada',
    meetLink: 'https://meet.google.com/opq-rstu-vwx',
    calendarSynced: true,
    briefing: {
      objective: 'Otimizar custo de entrega e consolidar checklist de qualidade',
      keyMetrics: [
        { label: 'Custo entrega', value: 'R$ 8.500', trend: 'neutral' },
        { label: 'Entregas/dia', value: '75', trend: 'up' },
        { label: 'Reclamações', value: '3%', trend: 'down' },
        { label: 'Nota iFood', value: '4.7', trend: 'up' },
      ],
      chatbotInsights: [
        'Checklist de qualidade implementado com sucesso — reclamações caíram de 8% para 3%',
        'Custo por entrega com motoboy próprio: R$ 7,50 — acima do mercado',
        'Avaliando migrar parte das entregas para iFood Entrega',
        'Quer implementar rastreamento de pedidos para o site próprio',
      ],
      recommendedApproach: 'Analisar mix ideal: motoboy próprio para raio curto + iFood Entrega para raio longo. Calcular break-even. Revisar rotas e otimizar despacho.',
    },
    preparation: {
      previousActionItems: [
        { text: 'Implementar checklist de qualidade pré-despacho', completed: true },
        { text: 'Fotografar 100% do cardápio profissionalmente', completed: true },
        { text: 'Testar iFood Entrega por 2 semanas', completed: false },
        { text: 'Mapear rotas dos motoboys', completed: false },
      ],
      keyDataPoints: [
        { label: 'Custo entrega/mês', value: 'R$ 8.500' },
        { label: 'Custo por entrega', value: 'R$ 7,50' },
        { label: 'Raio médio', value: '5 km' },
        { label: '% entregas próprias', value: '100%' },
      ],
      suggestedTopics: ['Análise de custo motoboy próprio vs iFood Entrega', 'Otimização de rotas', 'Rastreamento de pedidos', 'Consolidar resultados do checklist'],
      notes: '',
    },
  },
]

export const consultationTemplate: ConsultationPhase[] = [
  {
    id: 'p1', name: 'Diagnóstico', duration: '20 min',
    description: 'Entenda a situação atual do cliente, seus desafios e o que motivou a busca por consultoria.',
    checklist: [
      'Revisar métricas atuais do sistema',
      'Identificar gargalos operacionais',
      'Mapear processos existentes',
      'Alinhar expectativas com o cliente',
      'Verificar dados do briefing da IA',
    ],
    tips: ['Deixe o cliente falar primeiro. Use perguntas abertas como "O que mais te incomoda na operação hoje?"'],
  },
  {
    id: 'p2', name: 'Análise', duration: '15 min',
    description: 'Analise os dados coletados, compare com benchmarks do setor e identifique oportunidades de melhoria.',
    checklist: [
      'Comparar com benchmarks do setor',
      'Priorizar problemas por impacto',
      'Identificar quick wins (ganhos rápidos)',
      'Avaliar recursos disponíveis do cliente',
    ],
    tips: ['Use dados concretos. "Seu CMV de 38% está 6 pontos acima da média do setor" é mais impactante que "seu CMV está alto".'],
  },
  {
    id: 'p3', name: 'Plano de Ação', duration: '15 min',
    description: 'Defina ações concretas com prazos, responsáveis e métricas de sucesso.',
    checklist: [
      'Definir 3-5 ações prioritárias',
      'Estabelecer prazos realistas',
      'Atribuir responsáveis para cada ação',
      'Definir métricas de sucesso mensuráveis',
      'Documentar tudo no sistema',
    ],
    tips: ['Seja específico. "Reduzir tempo de preparo de 25 para 18 min até 15/07" é melhor que "melhorar operação".'],
  },
  {
    id: 'p4', name: 'Acompanhamento', duration: '10 min',
    description: 'Garanta continuidade, comprometimento e clareza sobre os próximos passos.',
    checklist: [
      'Resumir as decisões tomadas na sessão',
      'Confirmar próximos passos com o cliente',
      'Agendar a próxima sessão de follow-up',
      'Enviar resumo por escrito via sistema',
    ],
    tips: ['Termine com energia positiva. O cliente deve sair motivado e com total clareza do que fazer a seguir.'],
  },
]

export const typeLabels: Record<string, string> = {
  'primeira-sessao': 'Primeira Sessão',
  'acompanhamento': 'Acompanhamento',
  'diagnostico': 'Diagnóstico',
}

export const statusColors: Record<string, { dot: string; text: string }> = {
  'confirmada': { dot: 'bg-green-500', text: 'text-green-600' },
  'pendente': { dot: 'bg-amber-400', text: 'text-amber-600' },
  'em-andamento': { dot: 'bg-blue-500', text: 'text-blue-600' },
}
