export type MentorStatus =
  | 'novo'
  | 'em_analise'
  | 'aprovado'
  | 'convidado'
  | 'ativo'
  | 'pausado'
  | 'rejeitado'

export type SenioridadeNivel =
  | 'iniciante'
  | 'pleno'
  | 'senior'
  | 'especialista'
  | 'premium'
  | 'elite'

export interface HistoricoProfissional {
  id: string
  empresa: string
  cargo: string
  inicio: string  // 'MM/YYYY'
  fim: string     // 'MM/YYYY' | 'atual'
  descricao?: string
}

export interface AdminLogEntry {
  data: string
  acao: string
  adminNota?: string
}

export interface MentorLead {
  id: string
  // Etapa 1 — Cadastro público
  nome: string
  email: string
  whatsapp: string
  cidade: string
  estado: string
  linkedin: string
  cargoAtual: string
  empresaAtual: string
  segmentos: string[]
  especialidades: string[]
  especialidadeOutra?: string
  historicoProfissional: HistoricoProfissional[]
  bio?: string
  // Scoring automático
  scoreSenioridade: number          // 0–100
  faixaSenioridade: SenioridadeNivel
  valorHoraSugeridoMin: number
  valorHoraSugeridoMax: number
  // Etapa 2 — Enriquecimento pós-aprovação
  fotoUrl?: string
  certificacoes: string[]
  idiomas: string[]
  disponibilidade: Record<string, string[]>
  valorHora?: number
  portfolioUrl?: string
  cases?: string
  // Admin
  status: MentorStatus
  adminNotes: string
  perfilCompletude: number          // 0–100
  historicoStatus: AdminLogEntry[]
  // Timestamps
  criadoEm: string
  atualizadoEm: string
  aprovadoEm?: string
  convidadoEm?: string
  ativoEm?: string
}
