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

      // Criar PaymentMethod
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
    } catch (err) {
      setCardError('Erro inesperado. Tente novamente.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-[#0E0E0F]" />
          <span className="text-sm font-medium text-[#0E0E0F]">Dados do cartão</span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Bandeiras */}
          <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
          <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
          <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1571c.svg" alt="Amex" className="h-6" />
          <span className="text-[10px] text-[#9C958A] ml-1">+ Elo, Hiper</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Número do cartão */}
        <div>
          <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Número do cartão</label>
          <div className="px-3 sm:px-4 py-3 rounded-xl border border-[#9C958A]/20 focus-within:border-[#A31631] transition-colors bg-white">
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

        <div className="grid grid-cols-2 gap-3">
          {/* Validade */}
          <div>
            <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Validade</label>
            <div className="px-3 sm:px-4 py-3 rounded-xl border border-[#9C958A]/20 focus-within:border-[#A31631] transition-colors bg-white">
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
            <div className="px-3 sm:px-4 py-3 rounded-xl border border-[#9C958A]/20 focus-within:border-[#A31631] transition-colors bg-white">
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
          <Lock size={10} />
          Pagamento processado com segurança pela Stripe. Seus dados não ficam em nossos servidores.
        </div>

        {/* Botão de pagar */}
        <button
          type="submit"
          disabled={!stripe || !allComplete || isProcessing}
          className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-4 px-8 rounded-xl text-sm transition-colors cursor-pointer"
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
