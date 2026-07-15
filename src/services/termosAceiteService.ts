import { supabase } from '../lib/supabase'
import type { TermosAceiteInput } from '../types/termosAceite'

// Deve acompanhar a data de "Última atualização" em TermosPage.tsx / PrivacidadePage.tsx.
export const TERMOS_VERSAO = '2026-07-15'
export const PRIVACIDADE_VERSAO = '2026-07-15'

export async function createTermosAceite(input: TermosAceiteInput) {
  const { error } = await supabase.from('termos_aceites').insert({
    empresa_nome: input.empresaNome.trim(),
    cnpj: input.cnpj.replace(/\D/g, ''),
    representante_nome: input.representanteNome.trim(),
    representante_cpf: input.representanteCpf.replace(/\D/g, ''),
    email: input.email.trim(),
    whatsapp: input.whatsapp.replace(/\D/g, ''),
    tipo_contratacao: input.tipoContratacao,
    termos_versao: TERMOS_VERSAO,
    privacidade_versao: PRIVACIDADE_VERSAO,
    parceiro_ref: input.parceiroRef?.trim() || null,
    user_agent: navigator.userAgent,
  })

  if (error) throw error
}
