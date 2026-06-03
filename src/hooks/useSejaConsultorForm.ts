import { useState, useCallback } from 'react'
import { validateNome, validateEmail, validateWhatsApp } from '../utils/validators'
import { formatWhatsApp } from '../utils/formatters'
import type { ConsultantCategory } from '../data/consultants'

interface FormState {
  nome: string
  email: string
  whatsapp: string
  specialty: ConsultantCategory | ''
  experienceYears: string
  linkedin: string
  bio: string
}

interface FormErrors {
  [key: string]: string | undefined
}

export function useSejaConsultorForm() {
  const [form, setForm] = useState<FormState>({
    nome: '', email: '', whatsapp: '', specialty: '', experienceYears: '', linkedin: '', bio: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const updateField = useCallback((field: keyof FormState, value: string) => {
    if (field === 'whatsapp') value = formatWhatsApp(value)
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    const nomeErr = validateNome(form.nome)
    const emailErr = validateEmail(form.email)
    const whatsErr = validateWhatsApp(form.whatsapp)
    if (nomeErr) e.nome = nomeErr
    if (emailErr) {
      e.email = emailErr
    } else if (!form.email.trim().endsWith('@gmail.com') && !form.email.trim().endsWith('@googlemail.com')) {
      e.email = 'Use um e-mail Google (@gmail.com) para integração com a agenda'
    }
    if (whatsErr) e.whatsapp = whatsErr
    if (!form.specialty) e.specialty = 'Selecione uma especialidade'
    if (!form.experienceYears || Number(form.experienceYears) < 1) e.experienceYears = 'Informe os anos de experiência'
    if (form.bio.trim().length < 20) e.bio = 'Descreva sua experiência (mínimo 20 caracteres)'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [form])

  const submit = useCallback(async () => {
    if (!validate()) return
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsProcessing(false)
    setSubmitted(true)
  }, [validate])

  return { form, errors, submitted, isProcessing, updateField, submit }
}
