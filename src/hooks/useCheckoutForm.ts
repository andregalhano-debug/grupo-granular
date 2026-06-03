import { useState, useCallback } from 'react'
import { validateWhatsApp, validateEmail, validateNome } from '../utils/validators'
import { formatWhatsApp } from '../utils/formatters'

export type PaymentMethod = 'pix' | 'cartao'

interface FormState {
  nome: string
  whatsapp: string
  email: string
  paymentMethod: PaymentMethod
}

interface FormErrors {
  nome?: string
  whatsapp?: string
  email?: string
}

export function useCheckoutForm() {
  const [form, setForm] = useState<FormState>({
    nome: '',
    whatsapp: '',
    email: '',
    paymentMethod: 'pix',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const updateField = useCallback((field: keyof FormState, value: string) => {
    if (field === 'whatsapp') {
      value = formatWhatsApp(value)
    }
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setForm((prev) => ({ ...prev, paymentMethod: method }))
  }, [])

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    const nomeErr = validateNome(form.nome)
    const whatsErr = validateWhatsApp(form.whatsapp)
    const emailErr = validateEmail(form.email)
    if (nomeErr) newErrors.nome = nomeErr
    if (whatsErr) newErrors.whatsapp = whatsErr
    if (emailErr) newErrors.email = emailErr
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form])

  return {
    form,
    errors,
    isProcessing,
    setIsProcessing,
    updateField,
    setPaymentMethod,
    validate,
  }
}
