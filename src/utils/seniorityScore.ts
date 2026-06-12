import type { HistoricoProfissional, SenioridadeNivel, MentorLead } from '../types/mentor'

export interface SenioridadeRange {
  nivel: SenioridadeNivel
  label: string
  scoreMin: number
  scoreMax: number
  valorMin: number
  valorMax: number
  color: string
  bg: string
  border: string
}

export const SENIORIDADE_RANGES: SenioridadeRange[] = [
  { nivel: 'iniciante',   label: 'Iniciante',   scoreMin: 0,  scoreMax: 30, valorMin: 100,  valorMax: 200,  color: 'text-blue-600',     bg: 'bg-blue-50',      border: 'border-blue-200' },
  { nivel: 'pleno',       label: 'Pleno',       scoreMin: 31, scoreMax: 50, valorMin: 200,  valorMax: 350,  color: 'text-green-600',    bg: 'bg-green-50',     border: 'border-green-200' },
  { nivel: 'senior',      label: 'Sênior',      scoreMin: 51, scoreMax: 70, valorMin: 350,  valorMax: 550,  color: 'text-purple-600',   bg: 'bg-purple-50',    border: 'border-purple-200' },
  { nivel: 'especialista',label: 'Especialista',scoreMin: 71, scoreMax: 85, valorMin: 550,  valorMax: 900,  color: 'text-orange-600',   bg: 'bg-orange-50',    border: 'border-orange-200' },
  { nivel: 'premium',     label: 'Premium',     scoreMin: 86, scoreMax: 93, valorMin: 900,  valorMax: 1500, color: 'text-[#A31631]',    bg: 'bg-[#A31631]/10', border: 'border-[#A31631]/30' },
  { nivel: 'elite',       label: 'Elite',       scoreMin: 94, scoreMax: 100,valorMin: 1500, valorMax: 3000, color: 'text-yellow-700',   bg: 'bg-yellow-50',    border: 'border-yellow-300' },
]

const CLEVEL     = ['ceo','coo','cfo','cto','cmo','cro','fundador','co-fundador','cofundador','sócio','socio','partner','presidente','founder']
const DIRECTOR   = ['diretor','diretora','vp','vice-presidente','vice presidente','head','superintendent','superintendente']
const MANAGER    = ['gerente','coordenador','coordenadora','supervisor','supervisora','líder','lider','manager','responsável','responsavel']
const SPECIALIST = ['especialista','sênior','senior','sr.','sr ','lead','principal','pleno']

function cargoPoints(cargo: string): number {
  const c = cargo.toLowerCase()
  if (CLEVEL.some((k) => c.includes(k))) return 25
  if (DIRECTOR.some((k) => c.includes(k))) return 20
  if (MANAGER.some((k) => c.includes(k))) return 15
  if (SPECIALIST.some((k) => c.includes(k))) return 10
  return 5
}

function parseMonthYear(str: string): Date | null {
  if (!str) return null
  if (str === 'atual') return new Date()
  const [m, y] = str.split('/')
  const month = parseInt(m) - 1
  const year = parseInt(y)
  if (isNaN(month) || isNaN(year)) return null
  return new Date(year, month)
}

function monthsDiff(a: Date, b: Date): number {
  return Math.max(0, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()))
}

export interface ScoreBreakdown {
  total: number
  nivel: SenioridadeNivel
  detalhes: { label: string; pts: number; max: number; desc: string }[]
}

export function calcularScoreSenioridade(
  historico: HistoricoProfissional[],
  linkedin: string,
  especialidades: string[],
): ScoreBreakdown {
  let totalMeses = 0
  let maxCargoScore = 0
  const tenures: number[] = []
  const empresas = new Set<string>()

  for (const h of historico) {
    const start = parseMonthYear(h.inicio)
    const end = parseMonthYear(h.fim)
    if (start && end) {
      const m = monthsDiff(start, end)
      totalMeses += m
      tenures.push(m)
    }
    const cs = cargoPoints(h.cargo)
    if (cs > maxCargoScore) maxCargoScore = cs
    if (h.empresa.trim()) empresas.add(h.empresa.toLowerCase().trim())
  }

  const anosTotal = totalMeses / 12

  // 1. Anos de experiência (25 pts)
  let ptsAnos = 5
  let descAnos = '< 3 anos'
  if (anosTotal >= 16) { ptsAnos = 25; descAnos = '16+ anos' }
  else if (anosTotal >= 11) { ptsAnos = 22; descAnos = '11–15 anos' }
  else if (anosTotal >= 6) { ptsAnos = 18; descAnos = '6–10 anos' }
  else if (anosTotal >= 3) { ptsAnos = 10; descAnos = '3–5 anos' }

  // 2. Nível máximo do cargo (25 pts)
  const ptsCargo = maxCargoScore
  const descCargo = ptsCargo >= 25 ? 'C-Level / Fundador' : ptsCargo >= 20 ? 'Diretor / VP / Head' : ptsCargo >= 15 ? 'Gerente / Coordenador' : ptsCargo >= 10 ? 'Especialista Sênior' : 'Analista / Assistente'

  // 3. Permanência média (20 pts)
  let ptsPermanencia = 0; let descPermanencia = 'Sem histórico'
  if (tenures.length > 0) {
    const avg = tenures.reduce((a, b) => a + b, 0) / tenures.length
    if (avg >= 36) { ptsPermanencia = 20; descPermanencia = '3+ anos em média' }
    else if (avg >= 24) { ptsPermanencia = 15; descPermanencia = '2–3 anos em média' }
    else if (avg >= 12) { ptsPermanencia = 10; descPermanencia = '1–2 anos em média' }
    else { ptsPermanencia = 5; descPermanencia = '< 1 ano em média' }
  }

  // 4. Amplitude de empresas (15 pts)
  const n = empresas.size
  let ptsEmpresas = 3; let descEmpresas = `${n} empresa`
  if (n >= 5) { ptsEmpresas = 15; descEmpresas = `${n} empresas` }
  else if (n >= 3) { ptsEmpresas = 10; descEmpresas = `${n} empresas` }
  else if (n >= 2) { ptsEmpresas = 7; descEmpresas = `${n} empresas` }

  // 5. Presença digital (15 pts)
  const temLinkedin = linkedin && linkedin.includes('linkedin.com')
  const ptsDigital = (temLinkedin ? 10 : 0) + (especialidades.length >= 3 ? 5 : 0)
  const descDigital = [temLinkedin ? 'LinkedIn' : null, especialidades.length >= 3 ? '3+ especialidades' : null].filter(Boolean).join(', ') || 'Incompleto'

  const total = Math.min(100, ptsAnos + ptsCargo + ptsPermanencia + ptsEmpresas + ptsDigital)

  let nivel: SenioridadeNivel
  if (total <= 30) nivel = 'iniciante'
  else if (total <= 50) nivel = 'pleno'
  else if (total <= 70) nivel = 'senior'
  else if (total <= 85) nivel = 'especialista'
  else if (total <= 93) nivel = 'premium'
  else nivel = 'elite'

  return {
    total,
    nivel,
    detalhes: [
      { label: 'Tempo de carreira', pts: ptsAnos, max: 25, desc: descAnos },
      { label: 'Nível de cargo',     pts: ptsCargo, max: 25, desc: descCargo },
      { label: 'Permanência',        pts: ptsPermanencia, max: 20, desc: descPermanencia },
      { label: 'Amplitude',          pts: ptsEmpresas, max: 15, desc: descEmpresas },
      { label: 'Presença digital',   pts: ptsDigital, max: 15, desc: descDigital },
    ],
  }
}

export function getRangeBySenioridade(nivel: SenioridadeNivel): SenioridadeRange {
  return SENIORIDADE_RANGES.find((r) => r.nivel === nivel)!
}

export function calcularCompletude(lead: Partial<MentorLead>): number {
  const checks = [
    !!lead.nome,
    !!lead.email,
    !!lead.whatsapp,
    !!lead.cidade,
    !!lead.linkedin,
    !!lead.cargoAtual,
    (lead.segmentos?.length ?? 0) > 0,
    (lead.especialidades?.length ?? 0) > 0,
    (lead.historicoProfissional?.length ?? 0) > 0,
    !!lead.fotoUrl,
    !!(lead.bio && lead.bio.length > 50),
    (lead.certificacoes?.length ?? 0) > 0,
    !!lead.valorHora,
    (lead.idiomas?.length ?? 0) > 0,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export function isValorForaDaFaixa(lead: MentorLead): boolean {
  if (!lead.valorHora) return false
  return lead.valorHora < lead.valorHoraSugeridoMin || lead.valorHora > lead.valorHoraSugeridoMax
}

export function desvioPercentual(lead: MentorLead): number | null {
  if (!lead.valorHora) return null
  const mid = (lead.valorHoraSugeridoMin + lead.valorHoraSugeridoMax) / 2
  return Math.round(((lead.valorHora - mid) / mid) * 100)
}
