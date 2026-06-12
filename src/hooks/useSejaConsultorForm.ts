import { useState, useCallback } from 'react'
import { validateNome, validateEmail, validateWhatsApp } from '../utils/validators'
import { formatWhatsApp } from '../utils/formatters'
import { createMentorLead } from '../services/mentorService'
import { sendConfirmacaoCadastro } from '../services/emailService'

interface FormState {
  nome: string
  email: string
  whatsapp: string
  cargoAtual: string
  segmentos: string[]
  especialidades: string[]
  especialidadeOutra: string
}

interface FormErrors { [key: string]: string | undefined }

export function useSejaConsultorForm() {
  const [form, setForm] = useState<FormState>({
    nome: '', email: '', whatsapp: '', cargoAtual: '',
    segmentos: [], especialidades: [], especialidadeOutra: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const updateField = useCallback((
    field: 'nome' | 'email' | 'whatsapp' | 'cargoAtual' | 'especialidadeOutra',
    value: string,
  ) => {
    const val = field === 'whatsapp' ? formatWhatsApp(value) : value
    setForm((prev) => ({ ...prev, [field]: val }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const toggleSegment = useCallback((seg: string) => {
    setForm((prev) => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg)
        ? prev.segmentos.filter((s) => s !== seg)
        : [...prev.segmentos, seg],
    }))
    setErrors((prev) => ({ ...prev, segmentos: undefined }))
  }, [])

  const toggleSpecialty = useCallback((spec: string) => {
    setForm((prev) => ({
      ...prev,
      especialidades: prev.especialidades.includes(spec)
        ? prev.especialidades.filter((s) => s !== spec)
        : [...prev.especialidades, spec],
    }))
    setErrors((prev) => ({ ...prev, especialidades: undefined }))
  }, [])

  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    const nomeErr = validateNome(form.nome)
    const emailErr = validateEmail(form.email)
    const whatsErr = validateWhatsApp(form.whatsapp)
    if (nomeErr) e.nome = nomeErr
    if (emailErr) e.email = emailErr
    if (whatsErr) e.whatsapp = whatsErr
    if (!form.cargoAtual.trim()) e.cargoAtual = 'Informe seu cargo atual'
    if (form.segmentos.length === 0) e.segmentos = 'Selecione pelo menos um segmento'
    if (form.especialidades.length === 0) e.especialidades = 'Selecione pelo menos uma especialidade'
    if (form.especialidades.includes('outros') && !form.especialidadeOutra.trim())
      e.especialidadeOutra = 'Descreva sua especialidade'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const submit = useCallback(async () => {
    if (!validate()) return
    setIsProcessing(true)
    try {
      createMentorLead({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        cidade: '',
        estado: '',
        linkedin: '',
        cargoAtual: form.cargoAtual,
        empresaAtual: '',
        segmentos: form.segmentos,
        especialidades: form.especialidades,
        especialidadeOutra: form.especialidadeOutra || undefined,
        historicoProfissional: [],
        bio: undefined,
      })
      await sendConfirmacaoCadastro({ to: form.email, nome: form.nome })
      setSubmitted(true)
    } finally {
      setIsProcessing(false)
    }
  }, [validate, form])

  return { form, errors, submitted, isProcessing, updateField, toggleSegment, toggleSpecialty, submit }
}
