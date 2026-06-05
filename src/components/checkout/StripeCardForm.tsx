import { useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Lock, AlertCircle } from 'lucide-react'

const elementStyle = {
  style: {
    base: {
      fontSize: '14px',
      color: '#0E0E0F',
      fontFamily: "'Inter', system-ui, sans-serif",
      '::placeholder': { color: '#9C958A' },
    },
    invalid: { color: '#dc2626' },
  },
}

interface StripeCardFormProps {
  onPaymentSuccess: (paymentMethodId: string) => void
  onError?: (error: string) => void
  isProcessing: boolean
  setIsProcessing: (v: boolean) => void
  totalCents?: number
  customerEmail: string
  customerName: string
  buttonText: string
}

function CardBrands() {
  return (
    <div className="flex items-center gap-1">
      {/* Visa */}
      <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="4" fill="#F6F9FC" stroke="#E0E6EB"/>
        <path d="M16.11 16.46h-2.57l1.6-9.92h2.58l-1.6 9.92z" fill="#3C58BF"/>
        <path d="M25.68 6.74c-.5-.2-1.3-.42-2.3-.42-2.53 0-4.31 1.35-4.33 3.28-.02 1.43 1.28 2.23 2.25 2.7.99.49 1.33.8 1.32 1.23-.01.67-.79.97-1.52.97-1.02 0-1.56-.15-2.39-.52l-.33-.16-.36 2.2c.6.27 1.7.51 2.84.52 2.69 0 4.44-1.33 4.46-3.39.01-1.13-.67-1.99-2.15-2.7-.9-.46-1.45-.77-1.44-1.23 0-.41.46-.85 1.47-.85.84-.01 1.45.18 1.92.38l.23.12.35-2.13z" fill="#3C58BF"/>
        <path d="M29.86 6.54h-1.98c-.61 0-1.07.18-1.34.82l-3.8 9.1h2.69l.54-1.48h3.28l.31 1.48h2.37l-2.07-9.92zm-3.16 6.38l1.36-3.68.78 3.68h-2.14z" fill="#3C58BF"/>
        <path d="M13.09 6.54l-2.51 6.76-.27-1.36c-.47-1.58-1.92-3.3-3.55-4.15l2.29 8.66h2.71l4.03-9.9h-2.7z" fill="#3C58BF"/>
        <path d="M8.43 6.54H4.37l-.03.19c3.21.82 5.33 2.8 6.21 5.18l-.9-4.53c-.15-.62-.6-.82-1.22-.84z" fill="#F9A51A"/>
      </svg>
      {/* Mastercard */}
      <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="4" fill="#F6F9FC" stroke="#E0E6EB"/>
        <circle cx="15" cy="12" r="7" fill="#EB001B"/>
        <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
        <path d="M19 7.44A6.98 6.98 0 0 1 21.5 12 6.98 6.98 0 0 1 19 16.56 6.98 6.98 0 0 1 16.5 12 6.98 6.98 0 0 1 19 7.44z" fill="#FF5F00"/>
      </svg>
      {/* Amex */}
      <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="4" fill="#2557D6"/>
        <text x="19" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text>
      </svg>
      {/* Elo */}
      <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="4" fill="#F6F9FC" stroke="#E0E6EB"/>
        <text x="19" y="14" textAnchor="middle" fill="#0066CC" fontSize="8" fontWeight="bold" fontFamily="Arial">elo</text>
      </svg>
      {/* Hiper */}
      <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="4" fill="#F6F9FC" stroke="#E0E6EB"/>
        <text x="19" y="14" textAnchor="middle" fill="#F37421" fontSize="6.5" fontWeight="bold" fontFamily="Arial">Hiper</text>
      </svg>
    </div>
  )
}

export function StripeCardForm({
  onPaymentSuccess,
  isProcessing,
  setIsProcessing,
  customerEmail,
  customerName,
  buttonText,
}: StripeCardFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState({ number: false, expiry: false, cvc: false })

  const allComplete = cardComplete.number && cardComplete.expiry && cardComplete.cvc

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || isProcessing) return

    setIsProcessing(true)
    setCardError(null)

    try {
      const cardNumber = elements.getElement(CardNumberElement)
      if (!cardNumber) {
        setCardError('Erro ao carregar formulário de pagamento.')
        setIsProcessing(false)
        return
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: {
          name: customerName,
          email: customerEmail,
        },
      })

      if (error) {
        setCardError(error.message || 'Erro ao processar cartão.')
        setIsProcessing(false)
        return
      }

      if (paymentMethod) {
        onPaymentSuccess(paymentMethod.id)
      }
    } catch {
      setCardError('Erro inesperado. Tente novamente.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header com bandeiras */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-[#0E0E0F]" />
          <span className="text-sm font-medium text-[#0E0E0F]">Dados do cartão</span>
        </div>
        <CardBrands />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Número do cartão */}
        <div>
          <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Número do cartão</label>
          <div className="px-3 py-2.5 sm:py-3 rounded-xl border border-[#9C958A]/20 focus-within:border-[#A31631] transition-colors bg-white">
            <CardNumberElement
              options={elementStyle}
              onChange={(e) => {
                setCardComplete((prev) => ({ ...prev, number: e.complete }))
                if (e.error) setCardError(e.error.message)
                else setCardError(null)
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Validade */}
          <div>
            <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Validade</label>
            <div className="px-3 py-2.5 sm:py-3 rounded-xl border border-[#9C958A]/20 focus-within:border-[#A31631] transition-colors bg-white">
              <CardExpiryElement
                options={elementStyle}
                onChange={(e) => {
                  setCardComplete((prev) => ({ ...prev, expiry: e.complete }))
                }}
              />
            </div>
          </div>

          {/* CVC */}
          <div>
            <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">CVV</label>
            <div className="px-3 py-2.5 sm:py-3 rounded-xl border border-[#9C958A]/20 focus-within:border-[#A31631] transition-colors bg-white">
              <CardCvcElement
                options={elementStyle}
                onChange={(e) => {
                  setCardComplete((prev) => ({ ...prev, cvc: e.complete }))
                }}
              />
            </div>
          </div>
        </div>

        {/* Erro */}
        {cardError && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
            <AlertCircle size={14} className="flex-shrink-0" />
            {cardError}
          </div>
        )}

        {/* Segurança */}
        <div className="flex items-center gap-2 text-[10px] text-[#9C958A]">
          <Lock size={10} className="flex-shrink-0" />
          Pagamento processado com segurança pela Stripe.
        </div>

        {/* Botão de pagar */}
        <button
          type="submit"
          disabled={!stripe || !allComplete || isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl text-sm transition-colors cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processando...
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>
    </div>
  )
}
