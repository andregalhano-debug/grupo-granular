import { useState, useCallback } from 'react'
import { validateNome, validateEmail, validateWhatsApp } from '../utils/validators'
import { formatWhatsApp } from '../utils/formatters'
import { segmentOptions, specialtyOptions } from '../data/consultants'
import { createMentorLead } from '../services/mentorService'
import { sendConfirmacaoCadastro, sendNovaCandidaturaConsultor } from '../services/emailService'

interface FormState {
  nome: string
  email: string
  whatsapp: string
  cargoAtual: string
  segmentos: string[]
  segmentoOutro: string
  especialidades: string[]
  especialidadeOutra: string
}

interface FormErrors { [key: string]: string | undefined }

export function useSejaConsultorForm() {
  const [form, setForm] = useState<FormState>({
    nome: '', email: '', whatsapp: '', cargoAtual: '',
    segmentos: [], segmentoOutro: '', especialidades: [], especialidadeOutra: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateField = useCallback((
    field: 'nome' | 'email' | 'whatsapp' | 'cargoAtual' | 'segmentoOutro' | 'especialidadeOutra',
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
    if (form.segmentos.includes('outros') && !form.segmentoOutro.trim())
      e.segmentoOutro = 'Descreva o segmento de atuação'
    if (form.especialidades.length === 0) e.especialidades = 'Selecione pelo menos uma especialidade'
    if (form.especialidades.includes('outros') && !form.especialidadeOutra.trim())
      e.especialidadeOutra = 'Descreva sua especialidade'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const labelOf = (opts: { id: string; label: string }[], id: string) =>
    opts.find((o) => o.id === id)?.label || id

  const submit = useCallback(async () => {
    if (!validate()) return
    setSubmitError(null)
    setIsProcessing(true)
    try {
      const segmentos = form.segmentos
        .map((id) => {
          const label = labelOf(segmentOptions, id)
          return id === 'outros' && form.segmentoOutro.trim()
            ? `${label} (${form.segmentoOutro.trim()})`
            : label
        })
        .join(', ')
      const especialidades = form.especialidades
        .map((id) => {
          const label = labelOf(specialtyOptions, id)
          return id === 'outros' && form.especialidadeOutra.trim()
            ? `${label} (${form.especialidadeOutra.trim()})`
            : label
        })
        .join(', ')

      await sendNovaCandidaturaConsultor({
        nome: form.nome.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        cargo: form.cargoAtual.trim(),
        segmentos,
        especialidades,
      })

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
        segmentoOutro: form.segmentoOutro || undefined,
        especialidades: form.especialidades,
        especialidadeOutra: form.especialidadeOutra || undefined,
        historicoProfissional: [],
        bio: undefined,
      })
      await sendConfirmacaoCadastro({ to: form.email, nome: form.nome })
      setSubmitted(true)
    } catch {
      setSubmitError('Não foi possível enviar agora. Tente novamente em instantes.')
    } finally {
      setIsProcessing(false)
    }
  }, [validate, form])

  return { form, errors, submitted, isProcessing, submitError, updateField, toggleSegment, toggleSpecialty, submit }
}
