import { useState, useCallback } from 'react'
import { validateNome, validateEmail, validateWhatsApp } from '../utils/validators'
import { formatWhatsApp } from '../utils/formatters'
import type { HistoricoProfissional } from '../types/mentor'
import { createMentorLead } from '../services/mentorService'
import { sendConfirmacaoCadastro } from '../services/emailService'

interface FormState {
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
  especialidadeOutra: string
  historicoProfissional: HistoricoProfissional[]
  bio: string
}

interface FormErrors { [key: string]: string | undefined }

const newHistorico = (): HistoricoProfissional => ({
  id: crypto.randomUUID(),
  empresa: '',
  cargo: '',
  inicio: '',
  fim: '',
})

export function useSejaConsultorForm() {
  const [form, setForm] = useState<FormState>({
    nome: '', email: '', whatsapp: '', cidade: '', estado: '', linkedin: '',
    cargoAtual: '', empresaAtual: '', segmentos: [], especialidades: [],
    especialidadeOutra: '', historicoProfissional: [newHistorico()], bio: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const updateField = useCallback((
    field: keyof Omit<FormState, 'segmentos' | 'especialidades' | 'historicoProfissional'>,
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

  const addHistorico = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      historicoProfissional: [...prev.historicoProfissional, newHistorico()],
    }))
  }, [])

  const removeHistorico = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      historicoProfissional: prev.historicoProfissional.filter((h) => h.id !== id),
    }))
  }, [])

  const updateHistorico = useCallback((
    id: string,
    field: keyof Omit<HistoricoProfissional, 'id'>,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      historicoProfissional: prev.historicoProfissional.map((h) =>
        h.id === id ? { ...h, [field]: value } : h,
      ),
    }))
    setErrors((prev) => ({ ...prev, historicoProfissional: undefined }))
  }, [])

  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    const nomeErr = validateNome(form.nome)
    const emailErr = validateEmail(form.email)
    const whatsErr = validateWhatsApp(form.whatsapp)
    if (nomeErr) e.nome = nomeErr
    if (emailErr) e.email = emailErr
    if (whatsErr) e.whatsapp = whatsErr
    if (!form.cidade.trim()) e.cidade = 'Informe sua cidade'
    if (!form.cargoAtual.trim()) e.cargoAtual = 'Informe seu cargo atual'
    if (!form.linkedin.trim()) e.linkedin = 'Informe seu LinkedIn'
    else if (!form.linkedin.includes('linkedin.com')) e.linkedin = 'Informe um link válido do LinkedIn'
    if (form.segmentos.length === 0) e.segmentos = 'Selecione pelo menos um segmento'
    if (form.especialidades.length === 0) e.especialidades = 'Selecione pelo menos uma especialidade'
    if (form.especialidades.includes('outros') && !form.especialidadeOutra.trim())
      e.especialidadeOutra = 'Descreva sua especialidade'
    const hasHistorico = form.historicoProfissional.some(
      (h) => h.empresa.trim() && h.cargo.trim() && h.inicio.trim() && h.fim.trim(),
    )
    if (!hasHistorico) e.historicoProfissional = 'Adicione pelo menos uma experiência completa'
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
        cidade: form.cidade,
        estado: form.estado,
        linkedin: form.linkedin,
        cargoAtual: form.cargoAtual,
        empresaAtual: form.empresaAtual,
        segmentos: form.segmentos,
        especialidades: form.especialidades,
        especialidadeOutra: form.especialidadeOutra || undefined,
        historicoProfissional: form.historicoProfissional.filter(
          (h) => h.empresa.trim() && h.cargo.trim() && h.inicio.trim() && h.fim.trim(),
        ),
        bio: form.bio || undefined,
      })
      await sendConfirmacaoCadastro({ to: form.email, nome: form.nome })
      setSubmitted(true)
    } finally {
      setIsProcessing(false)
    }
  }, [validate, form])

  return {
    form, errors, submitted, isProcessing,
    updateField, toggleSegment, toggleSpecialty,
    addHistorico, removeHistorico, updateHistorico,
    submit,
  }
}
