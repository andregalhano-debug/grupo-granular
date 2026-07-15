export type TipoContratacao = 'sistema' | 'especialista' | 'mentoria'

export const TIPO_CONTRATACAO_LABEL: Record<TipoContratacao, string> = {
  sistema: 'Sistema Granular',
  especialista: 'Especialista sob demanda',
  mentoria: 'Mentoria',
}

export function isTipoContratacao(value: string | null): value is TipoContratacao {
  return value === 'sistema' || value === 'especialista' || value === 'mentoria'
}

export interface TermosAceiteInput {
  empresaNome: string
  cnpj: string
  representanteNome: string
  representanteCpf: string
  email: string
  whatsapp: string
  tipoContratacao: TipoContratacao
  parceiroRef?: string
}
