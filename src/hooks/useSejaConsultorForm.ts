import { useState, useCallback } from 'react'
import { validateNome, validateEmail, validateWhatsApp } from '../utils/validators'
import { formatWhatsApp } from '../utils/formatters'

interface FormState {
  nome: string
  email: string
  whatsapp: string
  segments: string[]
  specialties: string[]
  specialtyOther: string
  experienceYears: string
  linkedin: string
  bio: string
}

interface FormErrors {
  [key: string]: string | undefined
}

export function useSejaConsultorForm() {
  const [form, setForm] = useState<FormState>({
    nome: '', email: '', whatsapp: '', segments: [], specialties: [], specialtyOther: '', experienceYears: '', linkedin: '', bio: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const updateField = useCallback((field: 'nome' | 'email' | 'whatsapp' | 'specialtyOther' | 'experienceYears' | 'linkedin' | 'bio', value: string) => {
    if (field === 'whatsapp') value = formatWhatsApp(value)
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const toggleSegment = useCallback((seg: string) => {
    setForm((prev) => ({
      ...prev,
      segments: prev.segments.includes(seg)
        ? prev.segments.filter((s) => s !== seg)
        : [...prev.segments, seg],
    }))
    setErrors((prev) => ({ ...prev, segments: undefined }))
  }, [])

  const toggleSpecialty = useCallback((spec: string) => {
    setForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(spec)
        ? prev.specialties.filter((s) => s !== spec)
        : [...prev.specialties, spec],
    }))
    setErrors((prev) => ({ ...prev, specialties: undefined }))
  }, [])

  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    const nomeErr = validateNome(form.nome)
    const emailErr = validateEmail(form.email)
    const whatsErr = validateWhatsApp(form.whatsapp)
    if (nomeErr) e.nome = nomeErr
    if (emailErr) e.email = emailErr
    if (whatsErr) e.whatsapp = whatsErr
    if (form.segments.length === 0) e.segments = 'Selecione pelo menos uma categoria'
    if (form.specialties.length === 0) e.specialties = 'Selecione pelo menos uma especialidade'
    if (form.specialties.includes('outros') && !form.specialtyOther.trim()) e.specialtyOther = 'Descreva sua especialidade'
    if (!form.experienceYears || Number(form.experienceYears) < 1) e.experienceYears = 'Informe os anos de experiência'
    if (!form.linkedin.trim()) e.linkedin = 'Informe seu LinkedIn'
    else if (!form.linkedin.includes('linkedin.com')) e.linkedin = 'Informe um link válido do LinkedIn'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const submit = useCallback(async () => {
    if (!validate()) return
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))
    localStorage.setItem('granular-consultant-registration', JSON.stringify({
      nome: form.nome,
      email: form.email,
      whatsapp: form.whatsapp,
      linkedin: form.linkedin,
      segments: form.segments,
      specialties: form.specialties,
      specialtyOther: form.specialtyOther,
      experienceYears: form.experienceYears,
      bio: form.bio,
    }))
    setIsProcessing(false)
    setSubmitted(true)
  }, [validate, form])

  return { form, errors, submitted, isProcessing, updateField, toggleSegment, toggleSpecialty, submit }
}
