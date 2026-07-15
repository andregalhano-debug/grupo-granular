import { useState, useCallback } from 'react'
import { validateNome, validateEmail, validateWhatsApp, validateCnpj, validateCpf } from '../utils/validators'
import { formatWhatsApp, formatCpf, formatCnpj } from '../utils/formatters'
import { createTermosAceite } from '../services/termosAceiteService'
import { sendConfirmacaoAceite } from '../services/emailService'
import type { TipoContratacao } from '../types/termosAceite'

interface FormState {
  empresaNome: string
  cnpj: string
  representanteNome: string
  representanteCpf: string
  email: string
  whatsapp: string
  tipoContratacao: TipoContratacao | null
  aceitou: boolean
}

interface FormErrors { [key: string]: string | undefined }

type TextField = 'empresaNome' | 'cnpj' | 'representanteNome' | 'representanteCpf' | 'email' | 'whatsapp'

function makeInitialState(tipoInicial: TipoContratacao | null): FormState {
  return {
    empresaNome: '', cnpj: '', representanteNome: '', representanteCpf: '',
    email: '', whatsapp: '', tipoContratacao: tipoInicial, aceitou: false,
  }
}

export function useTermosAceiteForm(parceiroRef?: string, tipoInicial: TipoContratacao | null = null) {
  const [form, setForm] = useState<FormState>(() => makeInitialState(tipoInicial))
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateField = useCallback((field: TextField, value: string) => {
    const formatted = field === 'whatsapp' ? formatWhatsApp(value)
      : field === 'representanteCpf' ? formatCpf(value)
      : field === 'cnpj' ? formatCnpj(value)
      : value
    setForm((prev) => ({ ...prev, [field]: formatted }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const selectTipo = useCallback((tipo: TipoContratacao) => {
    setForm((prev) => ({ ...prev, tipoContratacao: tipo }))
    setErrors((prev) => ({ ...prev, tipoContratacao: undefined }))
  }, [])

  const toggleAceite = useCallback(() => {
    setForm((prev) => ({ ...prev, aceitou: !prev.aceitou }))
    setErrors((prev) => ({ ...prev, aceitou: undefined }))
  }, [])

  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    if (!form.empresaNome.trim()) e.empresaNome = 'Informe o nome da empresa'
    const cnpjErr = validateCnpj(form.cnpj)
    if (cnpjErr) e.cnpj = cnpjErr
    const nomeErr = validateNome(form.representanteNome)
    if (nomeErr) e.representanteNome = nomeErr
    const cpfErr = validateCpf(form.representanteCpf)
    if (cpfErr) e.representanteCpf = cpfErr
    const emailErr = validateEmail(form.email)
    if (emailErr) e.email = emailErr
    const whatsErr = validateWhatsApp(form.whatsapp)
    if (whatsErr) e.whatsapp = whatsErr
    if (!form.tipoContratacao) e.tipoContratacao = 'Selecione o que está sendo contratado'
    if (!form.aceitou) e.aceitou = 'É necessário aceitar os Termos e a Política de Privacidade para continuar'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const submit = useCallback(async () => {
    if (!validate() || !form.tipoContratacao) return
    setSubmitError(null)
    setIsProcessing(true)
    try {
      await createTermosAceite({
        empresaNome: form.empresaNome,
        cnpj: form.cnpj,
        representanteNome: form.representanteNome,
        representanteCpf: form.representanteCpf,
        email: form.email,
        whatsapp: form.whatsapp,
        tipoContratacao: form.tipoContratacao,
        parceiroRef,
      })
      await sendConfirmacaoAceite({
        to: form.email,
        nome: form.representanteNome,
        empresa: form.empresaNome,
        tipo: form.tipoContratacao,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('[termos-aceite] Falha ao registrar aceite:', err)
      setSubmitError('Não foi possível registrar o aceite agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp.')
    } finally {
      setIsProcessing(false)
    }
  }, [validate, form, parceiroRef])

  return { form, errors, submitted, isProcessing, submitError, updateField, selectTipo, toggleAceite, submit }
}
