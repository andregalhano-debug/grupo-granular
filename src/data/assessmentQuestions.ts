import type { ConsultantCategory } from './consultants'

/* ── Tipos ── */

export interface ScenarioOption {
  id: string
  text: string
  points: number // 1 | 2 | 4 | 5
}

export interface Scenario {
  id: string
  category: ConsultantCategory
  difficulty: 'core' | 'deep'
  situation: string
  options: ScenarioOption[]
}

export interface PriorityRankItem {
  id: string
  text: string
  expertOrder: number
}

export interface PriorityRankExercise {
  situation: string
  items: PriorityRankItem[]
}

export interface ProfileDefinition {
  id: string
  label: string
  description: string
  matchClients: string[]
}

/* ── Cenários por especialidade ── */

export const scenarios: Scenario[] = [
  // ── OPERAÇÃO ──
  {
    id: 'op-core',
    category: 'operacao',
    difficulty: 'core',
    situation: 'Uma dark kitchen opera 3 marcas virtuais na mesma cozinha. O tempo médio de preparo subiu de 18 para 32 minutos e os cancelamentos por atraso triplicaram. Qual sua primeira ação?',
    options: [
      { id: 'op-c1', text: 'Contratar mais funcionários para dar conta do volume', points: 1 },
      { id: 'op-c2', text: 'Separar horários de pico por marca para reduzir colisão de pedidos', points: 2 },
      { id: 'op-c3', text: 'Mapear o fluxo no KDS por estação e identificar gargalos com tempos reais', points: 5 },
      { id: 'op-c4', text: 'Reduzir o cardápio temporariamente para simplificar a produção', points: 4 },
    ],
  },
  {
    id: 'op-deep',
    category: 'operacao',
    difficulty: 'deep',
    situation: 'Você está padronizando a mise en place de uma rede com 5 unidades. Duas filiais têm rendimento 40% menor no mesmo prato. O que você investiga primeiro?',
    options: [
      { id: 'op-d1', text: 'Comparar os fornecedores de insumos entre as unidades', points: 2 },
      { id: 'op-d2', text: 'Analisar a ficha técnica executada vs. planejada com pesagem real em cada unidade', points: 5 },
      { id: 'op-d3', text: 'Trocar o responsável de cozinha das unidades com baixo rendimento', points: 1 },
      { id: 'op-d4', text: 'Implementar checklist de preparo e treinar as equipes', points: 4 },
    ],
  },

  // ── FINANCEIRO ──
  {
    id: 'fin-core',
    category: 'financeiro',
    difficulty: 'core',
    situation: 'Um restaurante delivery fatura R$ 180k/mês com CMV de 38%. O dono quer lançar um combo promocional com 20% de desconto. Qual sua recomendação?',
    options: [
      { id: 'fin-c1', text: 'Aprovar — desconto atrai volume e compensa a margem perdida', points: 1 },
      { id: 'fin-c2', text: 'Montar o combo com itens de alta margem e desconto aparente usando engenharia de cardápio', points: 5 },
      { id: 'fin-c3', text: 'Recusar qualquer promoção até o CMV cair abaixo de 33%', points: 2 },
      { id: 'fin-c4', text: 'Revisar fichas técnicas para encontrar itens de menor custo para o combo', points: 4 },
    ],
  },
  {
    id: 'fin-deep',
    category: 'financeiro',
    difficulty: 'deep',
    situation: 'Ao montar o DRE de um restaurante, você percebe que o custo de pessoal está em 42% do faturamento bruto. O benchmark do setor é 25-30%. O que isso indica como prioridade?',
    options: [
      { id: 'fin-d1', text: 'Demitir funcionários imediatamente para reduzir a folha', points: 1 },
      { id: 'fin-d2', text: 'Cruzar com produtividade por função (pratos/hora/pessoa) antes de qualquer corte', points: 5 },
      { id: 'fin-d3', text: 'Renegociar salários e reduzir benefícios', points: 2 },
      { id: 'fin-d4', text: 'Revisar escalas e identificar horas ociosas vs. pico com dados reais de vendas', points: 4 },
    ],
  },

  // ── MARKETING ──
  {
    id: 'mkt-core',
    category: 'marketing',
    difficulty: 'core',
    situation: 'Um restaurante tem 4.1 de nota no iFood com 200 avaliações. As vendas caíram 35% nos últimos 2 meses. O dono quer investir em cupons de desconto. Qual seu diagnóstico?',
    options: [
      { id: 'mkt-c1', text: 'Criar cupons agressivos de 30% para recuperar vendas rapidamente', points: 1 },
      { id: 'mkt-c2', text: 'Primeiro analisar as avaliações negativas para entender a causa da nota baixa antes de gastar com promoção', points: 5 },
      { id: 'mkt-c3', text: 'Investir em fotos profissionais do cardápio para aumentar conversão', points: 4 },
      { id: 'mkt-c4', text: 'Aumentar o raio de entrega para atingir mais clientes', points: 2 },
    ],
  },
  {
    id: 'mkt-deep',
    category: 'marketing',
    difficulty: 'deep',
    situation: 'Um restaurante gasta R$ 3.000/mês em promoções no iFood mas não sabe o ROI. O ticket médio caiu de R$ 45 para R$ 32 nos últimos 3 meses. Como você aborda?',
    options: [
      { id: 'mkt-d1', text: 'Pausar todas as promoções e ver o que acontece', points: 2 },
      { id: 'mkt-d2', text: 'Manter as promoções porque o volume compensa', points: 1 },
      { id: 'mkt-d3', text: 'Segmentar promoções por tipo (frete grátis vs desconto) e medir conversão e margem de cada uma separadamente', points: 5 },
      { id: 'mkt-d4', text: 'Trocar desconto percentual por combos com preço fixo para proteger ticket', points: 4 },
    ],
  },

  // ── CARDÁPIO ──
  {
    id: 'card-core',
    category: 'cardapio',
    difficulty: 'core',
    situation: 'Uma hamburgueria tem 47 itens no cardápio. O ticket médio é R$ 28 e 60% dos pedidos concentram em 5 itens. O que você recomenda como prioridade?',
    options: [
      { id: 'card-c1', text: 'Adicionar mais opções para atrair públicos diferentes', points: 1 },
      { id: 'card-c2', text: 'Reduzir para 20-25 itens mantendo os mais vendidos e os de maior margem', points: 4 },
      { id: 'card-c3', text: 'Fazer engenharia de cardápio (matriz popularidade × margem) para decidir o que manter, promover, reformular ou retirar', points: 5 },
      { id: 'card-c4', text: 'Aumentar preços dos 5 itens mais vendidos', points: 2 },
    ],
  },
  {
    id: 'card-deep',
    category: 'cardapio',
    difficulty: 'deep',
    situation: 'Ao montar fichas técnicas de uma pizzaria, você descobre que a margem do sabor mais vendido (calabresa) é de apenas 18%, enquanto a média deveria ser 65-70%. Qual sua abordagem?',
    options: [
      { id: 'card-d1', text: 'Aumentar o preço da calabresa em 30% imediatamente', points: 2 },
      { id: 'card-d2', text: 'Revisar a ficha técnica, pesquisar fornecedores alternativos e criar uma versão premium com preço maior, posicionando-a como âncora', points: 5 },
      { id: 'card-d3', text: 'Reduzir a quantidade de calabresa por pizza para cortar custo', points: 1 },
      { id: 'card-d4', text: 'Manter o preço mas usar como item de atração e compensar margem com acompanhamentos e bebidas', points: 4 },
    ],
  },

  // ── iFOOD ──
  {
    id: 'if-core',
    category: 'ifood',
    difficulty: 'core',
    situation: 'Um restaurante tem taxa de cancelamento de 8% no iFood (benchmark < 3%) e nota 4.3. O dono acha que é culpa dos entregadores. Qual sua análise?',
    options: [
      { id: 'if-c1', text: 'Concordar e sugerir troca para entrega própria', points: 1 },
      { id: 'if-c2', text: 'Analisar os motivos reais de cancelamento no painel (atraso no preparo, item errado, embalagem) antes de culpar logística', points: 5 },
      { id: 'if-c3', text: 'Reduzir o raio de entrega para diminuir atrasos', points: 2 },
      { id: 'if-c4', text: 'Implementar checklist de conferência antes da saída e rastrear tempos por etapa', points: 4 },
    ],
  },
  {
    id: 'if-deep',
    category: 'ifood',
    difficulty: 'deep',
    situation: 'Um restaurante caiu do top 10 para a página 3 do iFood na sua região. A nota é 4.6 e os tempos estão dentro do SLA. O que pode estar acontecendo?',
    options: [
      { id: 'if-d1', text: 'Investir pesado em cupons para subir o volume de pedidos', points: 2 },
      { id: 'if-d2', text: 'Analisar frequência de abertura da loja, taxa de rejeição de pedidos e volume de avaliações recentes — o algoritmo pondera atividade recente e consistência', points: 5 },
      { id: 'if-d3', text: 'Ligar para o suporte do iFood e reclamar', points: 1 },
      { id: 'if-d4', text: 'Verificar se concorrentes novos entraram e ajustar o cardápio e precificação para competir', points: 4 },
    ],
  },

  // ── RH ──
  {
    id: 'rh-core',
    category: 'rh',
    difficulty: 'core',
    situation: 'Um restaurante com 15 funcionários tem turnover de 90% ao ano. O dono reclama que "ninguém quer trabalhar". Qual seu primeiro passo?',
    options: [
      { id: 'rh-c1', text: 'Aumentar salários para reter os funcionários', points: 2 },
      { id: 'rh-c2', text: 'Fazer entrevistas de desligamento e mapear as causas reais de saída (salário, gestão, carga, ambiente)', points: 5 },
      { id: 'rh-c3', text: 'Contratar através de agências especializadas em food service', points: 1 },
      { id: 'rh-c4', text: 'Criar plano de carreira básico (auxiliar → cozinheiro → chefe) com bonificação por tempo', points: 4 },
    ],
  },
  {
    id: 'rh-deep',
    category: 'rh',
    difficulty: 'deep',
    situation: 'Você precisa montar a escala de uma operação 7 dias/semana com 8 funcionários CLT (6x1). Dois pedem para não trabalhar domingo. O que você recomenda?',
    options: [
      { id: 'rh-d1', text: 'Negar os pedidos — a escala tem que ser igual para todos', points: 1 },
      { id: 'rh-d2', text: 'Montar escala rotativa com folguistas cobrindo domingos, respeitando interjornada de 11h e descanso semanal, e compensar quem cobre com folga extra na semana', points: 5 },
      { id: 'rh-d3', text: 'Contratar 2 extras só para fins de semana como PJ', points: 2 },
      { id: 'rh-d4', text: 'Criar banco de horas e revezar domingos entre toda a equipe com escala prévia mensal', points: 4 },
    ],
  },
]

/* ── Exercício de Priorização ── */

export const priorityExercise: PriorityRankExercise = {
  situation: 'Você assume a consultoria de um restaurante delivery em crise: CMV de 42%, nota 3.8 no iFood, turnover de 100%, e faturamento caindo 15% ao mês. Com tempo limitado, ordene as ações por prioridade.',
  items: [
    { id: 'pr-1', text: 'Estancar perdas financeiras: revisar fichas técnicas e cortar desperdício', expertOrder: 1 },
    { id: 'pr-2', text: 'Recuperar nota no iFood: resolver motivos de avaliações negativas', expertOrder: 2 },
    { id: 'pr-3', text: 'Estabilizar equipe: entrevistas de desligamento e ações de retenção', expertOrder: 3 },
    { id: 'pr-4', text: 'Reestruturar cardápio: engenharia de menu focando margem', expertOrder: 4 },
    { id: 'pr-5', text: 'Criar campanhas de marketing para atrair novos clientes', expertOrder: 5 },
  ],
}

/* ── Definições de perfil ── */

export const profileDefinitions: ProfileDefinition[] = [
  {
    id: 'especialista-focado',
    label: 'Especialista Focado',
    description: 'Domínio profundo em uma área específica. Ideal para consultorias direcionadas e problemas complexos dentro da especialidade.',
    matchClients: ['Operações com dor específica na sua área forte', 'Redes que precisam de profundidade técnica', 'Diagnósticos especializados'],
  },
  {
    id: 'especialista-duplo',
    label: 'Especialista Duplo',
    description: 'Forte em duas áreas complementares. Consegue conectar diagnósticos entre disciplinas e oferecer soluções integradas.',
    matchClients: ['Operações médias que precisam resolver 2 frentes simultaneamente', 'Restaurantes em fase de estruturação', 'Consultorias de 3-6 meses'],
  },
  {
    id: 'generalista-forte',
    label: 'Generalista Forte',
    description: 'Visão 360° da operação com nível sólido em múltiplas áreas. Perfeito para diagnósticos gerais e mentoria completa.',
    matchClients: ['Operações novas que precisam de tudo', 'Redes em expansão', 'Diagnósticos completos', 'Mentorias de longo prazo'],
  },
  {
    id: 'consultor-operacional',
    label: 'Consultor Operacional',
    description: 'Força principal em Operação e/ou iFood. Foco em execução, processos e performance nas plataformas.',
    matchClients: ['Dark kitchens', 'Operações com alto volume de pedidos', 'Restaurantes com problemas de tempo e logística'],
  },
  {
    id: 'consultor-estrategico',
    label: 'Consultor Estratégico',
    description: 'Força em Financeiro e/ou Marketing. Pensa em números, posicionamento e crescimento sustentável.',
    matchClients: ['Operações rentáveis que querem escalar', 'Restaurantes com CMV descontrolado', 'Marcas em reposicionamento'],
  },
  {
    id: 'consultor-tecnico',
    label: 'Consultor Técnico',
    description: 'Forte em Cardápio e/ou RH. Domina a engenharia de produto e gestão de pessoas no food service.',
    matchClients: ['Operações que precisam de fichas técnicas e padronização', 'Restaurantes com alta rotatividade', 'Redes em profissionalização'],
  },
  {
    id: 'em-desenvolvimento',
    label: 'Em Desenvolvimento',
    description: 'Potencial identificado mas ainda construindo expertise. Recomendamos a Trilha Granular para acelerar seu desenvolvimento.',
    matchClients: ['Acompanhamento supervisionado', 'Trilha de capacitação Granular'],
  },
]

/* ── Helpers ── */

export const categoryLabels: Record<ConsultantCategory, string> = {
  operacao: 'Operação',
  financeiro: 'Financeiro',
  marketing: 'Marketing Digital',
  cardapio: 'Cardápio',
  ifood: 'iFood',
  rh: 'Recursos Humanos',
}

export function getScenariosForCategory(cat: ConsultantCategory, difficulty?: 'core' | 'deep'): Scenario[] {
  return scenarios.filter((s) => s.category === cat && (!difficulty || s.difficulty === difficulty))
}

/** Seleciona cenários adaptativos com base na auto-avaliação */
export function selectAdaptiveScenarios(selfScores: Record<ConsultantCategory, number>): Scenario[] {
  const selected: Scenario[] = []
  const categories: ConsultantCategory[] = ['operacao', 'financeiro', 'marketing', 'cardapio', 'ifood', 'rh']

  for (const cat of categories) {
    // Sempre inclui o cenário core
    const core = scenarios.find((s) => s.category === cat && s.difficulty === 'core')
    if (core) selected.push(core)

    // Se auto-avaliação >= 4, inclui o deep também
    if (selfScores[cat] >= 4) {
      const deep = scenarios.find((s) => s.category === cat && s.difficulty === 'deep')
      if (deep) selected.push(deep)
    }
  }

  return selected
}

/** Calcula score de priorização (0-100) baseado na distância do ranking expert */
export function calculatePriorityScore(userOrder: string[]): number {
  let totalDistance = 0
  const maxDistance = 8 // máximo possível para 5 itens
  for (let i = 0; i < userOrder.length; i++) {
    const item = priorityExercise.items.find((it) => it.id === userOrder[i])
    if (item) {
      totalDistance += Math.abs((i + 1) - item.expertOrder)
    }
  }
  return Math.round(((maxDistance - totalDistance) / maxDistance) * 100)
}

export type Tier = 'iniciante' | 'praticante' | 'especialista' | 'referencia'

export const tierLabels: Record<Tier, string> = {
  iniciante: 'Iniciante',
  praticante: 'Praticante',
  especialista: 'Especialista',
  referencia: 'Referência',
}

export const tierColors: Record<Tier, string> = {
  iniciante: 'text-[#9C958A] bg-[#9C958A]/10',
  praticante: 'text-blue-600 bg-blue-100',
  especialista: 'text-[#A31631] bg-[#A31631]/10',
  referencia: 'text-green-600 bg-green-100',
}

export function getTier(score: number): Tier {
  if (score >= 76) return 'referencia'
  if (score >= 56) return 'especialista'
  if (score >= 31) return 'praticante'
  return 'iniciante'
}

/** Calcula score final por especialidade */
export function calculateSpecialtyScore(
  selfScore: number,
  scenarioAvg: number,
  priorityScore: number,
): number {
  const raw = (selfScore / 5) * 100 * 0.15 + scenarioAvg * 0.70 + priorityScore * 0.15
  return Math.round(Math.min(100, Math.max(0, raw)))
}

/** Classifica o perfil geral */
export function classifyProfile(scores: Record<ConsultantCategory, number>): ProfileDefinition {
  const entries = Object.entries(scores) as [ConsultantCategory, number][]
  const sorted = [...entries].sort((a, b) => b[1] - a[1])
  const top = sorted[0][1]
  const second = sorted[1][1]
  const above55 = entries.filter(([, s]) => s > 55).length

  if (top < 56) return profileDefinitions.find((p) => p.id === 'em-desenvolvimento')!

  if (above55 >= 4) return profileDefinitions.find((p) => p.id === 'generalista-forte')!

  if (top >= 76 && second >= 70) return profileDefinitions.find((p) => p.id === 'especialista-duplo')!
  if (top >= 76) return profileDefinitions.find((p) => p.id === 'especialista-focado')!

  const topCat = sorted[0][0]
  if (topCat === 'operacao' || topCat === 'ifood') return profileDefinitions.find((p) => p.id === 'consultor-operacional')!
  if (topCat === 'financeiro' || topCat === 'marketing') return profileDefinitions.find((p) => p.id === 'consultor-estrategico')!
  return profileDefinitions.find((p) => p.id === 'consultor-tecnico')!
}
