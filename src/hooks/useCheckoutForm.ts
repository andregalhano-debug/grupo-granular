import { useState, useCallback, useRef } from 'react'
import { validateWhatsApp, validateEmail, validateNome, validateDocumento } from '../utils/validators'
import { formatWhatsApp, formatDocumento } from '../utils/formatters'

export type PaymentMethod = 'pix' | 'cartao'

interface FormState {
  empresa: string
  documento: string
  nome: string
  whatsapp: string
  email: string
  paymentMethod: PaymentMethod
  avulsoMethod: PaymentMethod
}

interface FormErrors {
  empresa?: string
  documento?: string
  nome?: string
  whatsapp?: string
  email?: string
}

export type DocumentoStatus = 'idle' | 'loading' | 'valid' | 'invalid'

export function useCheckoutForm() {
  const [form, setForm] = useState<FormState>({
    empresa: '',
    documento: '',
    nome: '',
    whatsapp: '',
    email: '',
    paymentMethod: 'cartao',
    avulsoMethod: 'cartao',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [documentoStatus, setDocumentoStatus] = useState<DocumentoStatus>('idle')
  const cnpjDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateField = useCallback((field: keyof FormState, value: string) => {
    if (field === 'whatsapp') value = formatWhatsApp(value)
    if (field === 'documento') value = formatDocumento(value)
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))

    // Validação/consulta assíncrona para CNPJ
    if (field === 'documento') {
      const digits = value.replace(/\D/g, '')
      if (digits.length === 14) {
        setDocumentoStatus('loading')
        if (cnpjDebounceRef.current) clearTimeout(cnpjDebounceRef.current)
        cnpjDebounceRef.current = setTimeout(async () => {
          try {
            const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`)
            if (res.ok) {
              const data = await res.json()
              setDocumentoStatus('valid')
              // Preencher nome da empresa automaticamente se estiver vazio
              if (data.razao_social) {
                setForm((prev) => ({
                  ...prev,
                  empresa: prev.empresa || data.razao_social,
                }))
              }
            } else {
              setDocumentoStatus('invalid')
              setErrors((prev) => ({ ...prev, documento: 'CNPJ não encontrado na Receita Federal' }))
            }
          } catch {
            setDocumentoStatus('invalid')
            setErrors((prev) => ({ ...prev, documento: 'Não foi possível validar o CNPJ. Verifique sua conexão.' }))
          }
        }, 600)
      } else if (digits.length === 11) {
        // Validação local imediata do CPF
        const cpfErr = validateDocumento(value)
        if (cpfErr) {
          setDocumentoStatus('invalid')
          setErrors((prev) => ({ ...prev, documento: cpfErr }))
        } else {
          setDocumentoStatus('valid')
        }
      } else {
        setDocumentoStatus('idle')
      }
    }
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setForm((prev) => ({ ...prev, paymentMethod: method }))
  }, [])

  const setAvulsoMethod = useCallback((method: PaymentMethod) => {
    setForm((prev) => ({ ...prev, avulsoMethod: method }))
  }, [])

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    if (!form.empresa.trim()) newErrors.empresa = 'Informe o nome da empresa'
    const docErr = validateDocumento(form.documento)
    if (docErr) newErrors.documento = docErr
    if (documentoStatus === 'invalid') newErrors.documento = 'CNPJ não encontrado na Receita Federal'
    const nomeErr = validateNome(form.nome)
    if (nomeErr) newErrors.nome = nomeErr
    const whatsErr = validateWhatsApp(form.whatsapp)
    if (whatsErr) newErrors.whatsapp = whatsErr
    const emailErr = validateEmail(form.email)
    if (emailErr) newErrors.email = emailErr
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form, documentoStatus])

  return {
    form,
    errors,
    isProcessing,
    setIsProcessing,
    documentoStatus,
    updateField,
    setPaymentMethod,
    setAvulsoMethod,
    validate,
  }
}
