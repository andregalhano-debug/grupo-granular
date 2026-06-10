/* ── Assessment do Parceiro (Diagnóstico Rápido) ── */

export interface AssessmentQuestion {
  id: string
  question: string
  type: 'single' | 'multi' | 'scale' | 'text'
  options?: { id: string; label: string; icon?: string }[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: [string, string]
  placeholder?: string
  required?: boolean
}

export interface AssessmentSection {
  id: string
  title: string
  subtitle: string
  questions: AssessmentQuestion[]
}

export const partnerSections: AssessmentSection[] = [
  {
    id: 'perfil',
    title: 'Seu negócio',
    subtitle: 'Conte-nos sobre sua operação',
    questions: [
      {
        id: 'segmento',
        question: 'Qual o segmento do seu negócio?',
        type: 'single',
        required: true,
        options: [
          { id: 'restaurante', label: 'Restaurante', icon: '🍽️' },
          { id: 'hamburgueria', label: 'Hamburgueria', icon: '🍔' },
          { id: 'pizzaria', label: 'Pizzaria', icon: '🍕' },
          { id: 'dark-kitchen', label: 'Dark Kitchen', icon: '🏭' },
          { id: 'cafeteria', label: 'Cafeteria / Padaria', icon: '☕' },
          { id: 'marmitex', label: 'Marmitex / Refeição', icon: '🥗' },
          { id: 'acai-sorvete', label: 'Açaí / Sorvete', icon: '🍨' },
          { id: 'outro', label: 'Outro', icon: '🏪' },
        ],
      },
      {
        id: 'operacao',
        question: 'Como você opera?',
        type: 'single',
        required: true,
        options: [
          { id: 'delivery', label: 'Só delivery' },
          { id: 'delivery-salao', label: 'Delivery + Salão' },
          { id: 'delivery-balcao', label: 'Delivery + Balcão' },
          { id: 'completo', label: 'Delivery + Salão + Balcão' },
        ],
      },
      {
        id: 'faturamento',
        question: 'Qual o faturamento mensal aproximado?',
        type: 'single',
        required: true,
        options: [
          { id: 'ate-30k', label: 'Até R$ 30 mil' },
          { id: '30-80k', label: 'R$ 30 a 80 mil' },
          { id: '80-150k', label: 'R$ 80 a 150 mil' },
          { id: '150-300k', label: 'R$ 150 a 300 mil' },
          { id: 'acima-300k', label: 'Acima de R$ 300 mil' },
        ],
      },
      {
        id: 'funcionarios',
        question: 'Quantos funcionários?',
        type: 'single',
        required: true,
        options: [
          { id: '1-5', label: '1 a 5' },
          { id: '6-15', label: '6 a 15' },
          { id: '16-30', label: '16 a 30' },
          { id: '31-plus', label: 'Mais de 30' },
        ],
      },
      {
        id: 'plataformas',
        question: 'Em quais plataformas você vende?',
        type: 'multi',
        options: [
          { id: 'ifood', label: 'iFood' },
          { id: 'rappi', label: 'Rappi' },
          { id: 'uber-eats', label: 'Uber Eats' },
          { id: 'site-proprio', label: 'Site próprio' },
          { id: 'whatsapp', label: 'WhatsApp' },
          { id: 'nenhum', label: 'Nenhuma ainda' },
        ],
      },
    ],
  },
  {
    id: 'dores',
    title: 'Suas dores',
    subtitle: 'O que mais te preocupa hoje?',
    questions: [
      {
        id: 'dores-principais',
        question: 'Quais são seus maiores desafios? (selecione todos)',
        type: 'multi',
        required: true,
        options: [
          { id: 'cmv-alto', label: 'CMV alto / custo de mercadoria', icon: '📊' },
          { id: 'vendas-caindo', label: 'Vendas caindo', icon: '📉' },
          { id: 'nota-baixa', label: 'Nota baixa nas plataformas', icon: '⭐' },
          { id: 'cancelamentos', label: 'Muitos cancelamentos', icon: '❌' },
          { id: 'tempo-preparo', label: 'Tempo de preparo alto', icon: '⏱️' },
          { id: 'equipe', label: 'Problemas com equipe / turnover', icon: '👥' },
          { id: 'financeiro', label: 'Descontrole financeiro', icon: '💰' },
          { id: 'cardapio', label: 'Cardápio desatualizado / sem fichas', icon: '📋' },
          { id: 'estoque', label: 'Falta de controle de estoque', icon: '📦' },
          { id: 'marketing', label: 'Pouca visibilidade / marketing', icon: '📣' },
          { id: 'delivery-novo', label: 'Quero começar no delivery', icon: '🚀' },
          { id: 'escala', label: 'Quero expandir / abrir novas unidades', icon: '🏗️' },
        ],
      },
      {
        id: 'dor-principal',
        question: 'Se pudesse resolver UMA coisa agora, qual seria?',
        type: 'text',
        placeholder: 'Ex: Reduzir meu CMV que está em 40%, ou melhorar minha nota no iFood...',
        required: true,
      },
    ],
  },
  {
    id: 'metricas',
    title: 'Números rápidos',
    subtitle: 'Nos ajuda a entender melhor (valores aproximados)',
    questions: [
      {
        id: 'nota-ifood',
        question: 'Qual sua nota no iFood?',
        type: 'single',
        options: [
          { id: 'nao-uso', label: 'Não uso iFood' },
          { id: 'abaixo-4', label: 'Abaixo de 4.0' },
          { id: '4-4.4', label: '4.0 a 4.4' },
          { id: '4.5-4.7', label: '4.5 a 4.7' },
          { id: '4.8-plus', label: '4.8 ou mais' },
        ],
      },
      {
        id: 'cmv-conhece',
        question: 'Você sabe seu CMV (custo de mercadoria vendida)?',
        type: 'single',
        options: [
          { id: 'nao-sei', label: 'Não sei o que é / nunca calculei' },
          { id: 'acima-35', label: 'Sei e está acima de 35%' },
          { id: '30-35', label: 'Entre 30% e 35%' },
          { id: 'abaixo-30', label: 'Abaixo de 30%' },
        ],
      },
      {
        id: 'ficha-tecnica',
        question: 'Você tem fichas técnicas dos pratos?',
        type: 'single',
        options: [
          { id: 'nao', label: 'Não tenho' },
          { id: 'alguns', label: 'Tenho de alguns pratos' },
          { id: 'todos', label: 'Tenho de todos' },
        ],
      },
      {
        id: 'controle-financeiro',
        question: 'Como controla o financeiro?',
        type: 'single',
        options: [
          { id: 'nao-controla', label: 'Não controlo formalmente' },
          { id: 'planilha', label: 'Planilha / caderno' },
          { id: 'sistema-basico', label: 'Sistema básico / ERP' },
          { id: 'sistema-completo', label: 'Sistema completo com DRE' },
        ],
      },
    ],
  },
  {
    id: 'expectativa',
    title: 'Expectativas',
    subtitle: 'O que você espera da mentoria',
    questions: [
      {
        id: 'objetivo',
        question: 'O que espera como resultado principal?',
        type: 'single',
        required: true,
        options: [
          { id: 'reduzir-custo', label: 'Reduzir custos e melhorar margem' },
          { id: 'aumentar-vendas', label: 'Aumentar vendas e faturamento' },
          { id: 'organizar', label: 'Organizar a operação e processos' },
          { id: 'expandir', label: 'Expandir (delivery ou novas unidades)' },
          { id: 'tudo', label: 'Um pouco de tudo — preciso de visão geral' },
        ],
      },
      {
        id: 'urgencia',
        question: 'Qual a urgência?',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: ['Estou tranquilo', 'Preciso urgente'],
      },
      {
        id: 'observacao',
        question: 'Algo mais que queira contar? (opcional)',
        type: 'text',
        placeholder: 'Conte qualquer contexto que ajude o mentor a se preparar...',
      },
    ],
  },
]

/* ── Geração de briefing automático ── */

export interface PartnerBriefing {
  segmento: string
  operacao: string
  faturamento: string
  funcionarios: string
  plataformas: string[]
  doresPrincipais: string[]
  dorPrioritaria: string
  notaIfood: string
  cmv: string
  fichaTecnica: string
  controleFinanceiro: string
  objetivo: string
  urgencia: number
  observacao: string
  resumoIA: string
  recomendacoes: string[]
}

const segmentoLabels: Record<string, string> = {
  'restaurante': 'Restaurante', 'hamburgueria': 'Hamburgueria', 'pizzaria': 'Pizzaria',
  'dark-kitchen': 'Dark Kitchen', 'cafeteria': 'Cafeteria / Padaria',
  'marmitex': 'Marmitex / Refeição', 'acai-sorvete': 'Açaí / Sorvete', 'outro': 'Outro',
}

const operacaoLabels: Record<string, string> = {
  'delivery': 'Só delivery', 'delivery-salao': 'Delivery + Salão',
  'delivery-balcao': 'Delivery + Balcão', 'completo': 'Delivery + Salão + Balcão',
}

const faturamentoLabels: Record<string, string> = {
  'ate-30k': 'Até R$ 30k', '30-80k': 'R$ 30-80k', '80-150k': 'R$ 80-150k',
  '150-300k': 'R$ 150-300k', 'acima-300k': 'Acima de R$ 300k',
}

const funcionariosLabels: Record<string, string> = {
  '1-5': '1-5 pessoas', '6-15': '6-15 pessoas', '16-30': '16-30 pessoas', '31-plus': '30+ pessoas',
}

const doresLabels: Record<string, string> = {
  'cmv-alto': 'CMV alto', 'vendas-caindo': 'Vendas em queda', 'nota-baixa': 'Nota baixa',
  'cancelamentos': 'Cancelamentos', 'tempo-preparo': 'Tempo de preparo', 'equipe': 'Problemas com equipe',
  'financeiro': 'Descontrole financeiro', 'cardapio': 'Cardápio desatualizado', 'estoque': 'Estoque descontrolado',
  'marketing': 'Pouca visibilidade', 'delivery-novo': 'Início no delivery', 'escala': 'Expansão',
}

const notaLabels: Record<string, string> = {
  'nao-uso': 'Não usa iFood', 'abaixo-4': 'Abaixo de 4.0', '4-4.4': '4.0-4.4',
  '4.5-4.7': '4.5-4.7', '4.8-plus': '4.8+',
}

const cmvLabels: Record<string, string> = {
  'nao-sei': 'Não sabe/não calcula', 'acima-35': 'Acima de 35%', '30-35': '30-35%', 'abaixo-30': 'Abaixo de 30%',
}

const fichaLabels: Record<string, string> = {
  'nao': 'Não tem', 'alguns': 'Parcial', 'todos': 'Completa',
}

const financeiroLabels: Record<string, string> = {
  'nao-controla': 'Sem controle formal', 'planilha': 'Planilha/caderno',
  'sistema-basico': 'Sistema básico', 'sistema-completo': 'Sistema completo',
}

const objetivoLabels: Record<string, string> = {
  'reduzir-custo': 'Reduzir custos', 'aumentar-vendas': 'Aumentar vendas',
  'organizar': 'Organizar operação', 'expandir': 'Expandir', 'tudo': 'Visão geral completa',
}

function generateResumoIA(answers: Record<string, string | string[]>): string {
  const parts: string[] = []
  const segmento = segmentoLabels[answers.segmento as string] || ''
  const fat = faturamentoLabels[answers.faturamento as string] || ''
  const func = funcionariosLabels[answers.funcionarios as string] || ''

  parts.push(`${segmento} com faturamento de ${fat} e ${func}.`)

  const dores = answers['dores-principais'] as string[]
  if (dores?.length) {
    parts.push(`Principais dores: ${dores.map((d) => doresLabels[d] || d).join(', ')}.`)
  }

  const dorText = answers['dor-principal'] as string
  if (dorText) parts.push(`Prioridade declarada: "${dorText}"`)

  const cmv = answers['cmv-conhece'] as string
  if (cmv === 'nao-sei') parts.push('Não conhece ou nunca calculou CMV — oportunidade de diagnóstico financeiro.')
  else if (cmv === 'acima-35') parts.push('CMV acima de 35% — potencial de redução significativa.')

  const nota = answers['nota-ifood'] as string
  if (nota === 'abaixo-4') parts.push('Nota iFood abaixo de 4.0 — necessidade urgente de plano de recuperação.')
  else if (nota === '4-4.4') parts.push('Nota iFood entre 4.0-4.4 — margem de melhoria para Super Restaurante.')

  const ficha = answers['ficha-tecnica'] as string
  if (ficha === 'nao') parts.push('Sem fichas técnicas — priorizar para controle de CMV.')

  const urgencia = Number(answers.urgencia || 3)
  if (urgencia >= 4) parts.push('Urgência alta — parceiro precisa de resultados rápidos.')

  return parts.join(' ')
}

function generateRecomendacoes(answers: Record<string, string | string[]>): string[] {
  const recs: string[] = []
  const dores = (answers['dores-principais'] as string[]) || []
  const cmv = answers['cmv-conhece'] as string
  const ficha = answers['ficha-tecnica'] as string
  const nota = answers['nota-ifood'] as string
  const controle = answers['controle-financeiro'] as string

  if (dores.includes('cmv-alto') || cmv === 'acima-35' || cmv === 'nao-sei') {
    recs.push('Diagnóstico de CMV e implementação de fichas técnicas como prioridade')
  }
  if (ficha === 'nao') recs.push('Criação de fichas técnicas dos 10 pratos mais vendidos')
  if (nota === 'abaixo-4' || nota === '4-4.4') recs.push('Plano de recuperação de nota no iFood')
  if (dores.includes('cancelamentos')) recs.push('Auditoria de motivos de cancelamento e plano de redução')
  if (dores.includes('tempo-preparo')) recs.push('Mapeamento de fluxo de cozinha e implementação de KDS')
  if (dores.includes('equipe')) recs.push('Diagnóstico de turnover e plano de retenção')
  if (controle === 'nao-controla' || controle === 'planilha') recs.push('Implementação de controle financeiro com DRE')
  if (dores.includes('estoque')) recs.push('Sistema de controle de estoque com alertas de reposição')
  if (dores.includes('marketing') || dores.includes('vendas-caindo')) recs.push('Estratégia de marketing e posicionamento nos marketplaces')
  if (dores.includes('delivery-novo')) recs.push('Estruturação completa da operação de delivery')
  if (dores.includes('cardapio')) recs.push('Engenharia de cardápio: análise popularidade x margem')

  return recs.length > 0 ? recs.slice(0, 5) : ['Diagnóstico geral da operação como ponto de partida']
}

export function generateBriefing(answers: Record<string, string | string[]>): PartnerBriefing {
  return {
    segmento: segmentoLabels[answers.segmento as string] || '',
    operacao: operacaoLabels[answers.operacao as string] || '',
    faturamento: faturamentoLabels[answers.faturamento as string] || '',
    funcionarios: funcionariosLabels[answers.funcionarios as string] || '',
    plataformas: (answers.plataformas as string[]) || [],
    doresPrincipais: ((answers['dores-principais'] as string[]) || []).map((d) => doresLabels[d] || d),
    dorPrioritaria: (answers['dor-principal'] as string) || '',
    notaIfood: notaLabels[answers['nota-ifood'] as string] || '',
    cmv: cmvLabels[answers['cmv-conhece'] as string] || '',
    fichaTecnica: fichaLabels[answers['ficha-tecnica'] as string] || '',
    controleFinanceiro: financeiroLabels[answers['controle-financeiro'] as string] || '',
    objetivo: objetivoLabels[answers.objetivo as string] || '',
    urgencia: Number(answers.urgencia || 3),
    observacao: (answers.observacao as string) || '',
    resumoIA: generateResumoIA(answers),
    recomendacoes: generateRecomendacoes(answers),
  }
}
