import { useEffect, useRef, useState, useMemo } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import {
  Loader2, ChevronDown, CalendarDays, CheckCircle2,
  Send, Building2, User, MessageCircle, Mail, Store,
  TrendingUp, FileText, CheckCircle, XCircle, CreditCard, ShoppingBag,
  UtensilsCrossed, ShoppingCart, Pill, PawPrint,
} from 'lucide-react'
import { Elements } from '@stripe/react-stripe-js'
import { useT } from '../i18n/useT'
import { getPlanById, saasPlans, getConsultoriaPixTotal } from '../data/plans'
import { getConsultantById } from '../data/consultants'
import { useCart } from '../stores/useCartStore'
import { useCheckoutForm } from '../hooks/useCheckoutForm'
import { processPayment } from '../services/payment'
import { stripePromise } from '../lib/stripe'
import { CheckoutHeader } from '../components/checkout/CheckoutHeader'
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { SecurityBadge } from '../components/checkout/SecurityBadge'
import { StripeCardForm } from '../components/checkout/StripeCardForm'
import { MiniCalendar } from '../components/MiniCalendar'
import { generateDemoSlots, saveDemoBooking } from '../data/demoSlots'
import { categoryAccent, withAlpha } from '../data/categoryColors'
import type { Category } from '../components/Modules'

const CHECKOUT_CATEGORIES: { id: Category; label: string; icon: typeof UtensilsCrossed }[] = [
  { id: 'restaurantes', label: 'Food', icon: UtensilsCrossed },
  { id: 'mercados', label: 'Mercado', icon: ShoppingCart },
  { id: 'farmacias', label: 'Farmácia', icon: Pill },
  { id: 'petshop', label: 'Pet Shop', icon: PawPrint },
]

const SEGMENTOS = ['Restaurante', 'Mercado', 'Atacado', 'Atacarejo', 'Farmácia', 'Pet Shop', 'Outros']
const FAIXAS_FATURAMENTO = [
  'Iniciando no Delivery', 'Até 50k', '50k a 150k',
  '150k a 300k', '300k a 500k', '500k a 1M', 'Acima de 1M',
]

const inp = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
    hasError ? 'border-[var(--accent)]' : 'border-[#0E0E0F]/15 focus:border-[var(--accent)]'
  }`

export function CheckoutPage() {
  const t = useT()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [checkoutCategory, setCheckoutCategory] = useState<Category>('restaurantes')

  useEffect(() => {
    const accent = categoryAccent[checkoutCategory]
    const root = document.documentElement
    root.style.setProperty('--accent', accent.primary)
    root.style.setProperty('--accent-dark', accent.dark)
    root.style.setProperty('--accent-05', withAlpha(accent.primary, 5))
    root.style.setProperty('--accent-08', withAlpha(accent.primary, 8))
    root.style.setProperty('--accent-10', withAlpha(accent.primary, 10))
    root.style.setProperty('--accent-15', withAlpha(accent.primary, 15))
    root.style.setProperty('--accent-20', withAlpha(accent.primary, 20))
    root.style.setProperty('--accent-30', withAlpha(accent.primary, 30))
    root.style.setProperty('--accent-40', withAlpha(accent.primary, 40))
  }, [checkoutCategory])

  const {
    form, errors: payErrors, isProcessing, setIsProcessing,
    documentoStatus, updateField, setPaymentMethod, setAvulsoMethod, validate,
  } = useCheckoutForm()
  const cart = useCart()

  // Demo-specific state
  const [segmento, setSegmento] = useState('')
  const [segmentoOutro, setSegmentoOutro] = useState('')
  const [faturamento, setFaturamento] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [demoErrors, setDemoErrors] = useState<Record<string, string>>({})

  const slots = useMemo(() => generateDemoSlots(), [])

  // URL params on first load
  useEffect(() => {
    window.scrollTo(0, 0)
    const consultorId = searchParams.get('consultor')
    const slot = searchParams.get('slot')
    const planoId = searchParams.get('plano')
    const addon = searchParams.get('addon')

    if (consultorId) {
      const c = getConsultantById(consultorId)
      if (c) {
        cart.addConsultant(c, slot || null)
        if (cart.plans.length === 0 && !cart.plans.some((p) => p.type === 'saas')) {
          cart.addPlan(saasPlans[0])
        }
      }
    } else if (planoId) {
      if (planoId === 'saas-3') {
        window.location.replace('/agendar-demo')
        return
      }
      const plan = getPlanById(planoId)
      if (plan) cart.addPlan(plan)
    }

    if (addon === 'foozi') {
      cart.addAddon({
        id: 'foozi',
        name: 'Foozi — Atendimento Digital & BPO',
        description: 'Plataforma de atendimento via WhatsApp, chatbot e central terceirizada',
      })
    }

    if (!consultorId && !planoId && cart.plans.length === 0 && cart.consultants.length === 0) {
      const popular = saasPlans.find((p) => p.popular) || saasPlans[0]
      cart.addPlan(popular)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saas = cart.plans.find((p) => p.type === 'saas')
  const consultoria = cart.plans.find((p) => p.type === 'consultoria')
  const modulos = cart.plans.filter((p) => p.type === 'modulo')
  const hasSaas = !!saas
  const hasConsultoria = !!consultoria
  const hasConsultants = cart.consultants.length > 0

  const consultoriaIsMensal = form.paymentMethod === 'cartao'
  const allConsultantsHaveSlots = cart.consultants.every((c) => !!c.slot)
  const canSubmit = !hasConsultants || allConsultantsHaveSlots
  const isCartao = form.paymentMethod === 'cartao'
  const hasAvulso = hasConsultants || (hasConsultoria && !consultoriaIsMensal)

  const saasIsIncluded = hasConsultoria && saas?.id === 'saas-1'
  const saasPrice = saasIsIncluded ? 0 : (saas ? saas.price : 0)
  const modulosPrice = modulos.reduce((sum, m) => sum + m.price, 0)
  const consultoriaPrice = hasConsultoria ? (consultoriaIsMensal ? consultoria!.price : getConsultoriaPixTotal(consultoria!)) : 0
  const sessaoPrice = cart.consultants.reduce((sum, c) => sum + c.hourlyRate, 0)
  const totalReais = saasPrice + modulosPrice + consultoriaPrice + sessaoPrice
  const totalCents = totalReais * 100

  const buttonText = canSubmit ? t.checkout.buttonFinish : t.checkout.buttonSelectSlots

  useEffect(() => {
    if (!hasConsultants && form.paymentMethod === 'pix') {
      setPaymentMethod('cartao')
    }
  }, [hasConsultants, form.paymentMethod, setPaymentMethod])

  const paymentRef = useRef<HTMLDivElement>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)

  useEffect(() => {
    if (!showPayment) return
    const handleScroll = () => {
      if (!paymentRef.current) return
      setShowStickyBar(paymentRef.current.getBoundingClientRect().top > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showPayment])

  // ── Validate demo fields only ────────────────────────────────
  const validateDemo = () => {
    const e: Record<string, string> = {}
    if (!form.empresa.trim()) e.empresa = 'Informe o nome da empresa'
    if (!segmento) e.segmento = 'Selecione o segmento'
    if (segmento === 'Outros' && !segmentoOutro.trim()) e.segmentoOutro = 'Descreva o segmento'
    if (!form.nome.trim()) e.nome = 'Informe seu nome'
    if (!form.whatsapp.replace(/\D/g, '') || form.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp válido'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Informe um e-mail válido'
    setDemoErrors(e)
    return Object.keys(e).length === 0
  }

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateDemo()) return

    let slotDate = '', slotTime = ''
    if (selectedSlot) {
      const lastDash = selectedSlot.lastIndexOf('-')
      slotDate = selectedSlot.substring(0, lastDash)
      slotTime = selectedSlot.substring(lastDash + 1)
    }

    saveDemoBooking({
      id: `demo-${Date.now()}`,
      name: form.nome.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      company: form.empresa.trim(),
      segmento,
      segmentoOutro: segmento === 'Outros' ? segmentoOutro.trim() : undefined,
      units: faturamento || '-',
      date: slotDate,
      time: slotTime,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    })

    setDemoSubmitted(true)
  }

  const navigateToConfirmation = (orderId: string) => {
    navigate('/confirmacao', {
      state: {
        orderId,
        nome: form.nome,
        whatsapp: form.whatsapp,
        email: form.email,
        saasMethod: hasSaas ? form.paymentMethod : null,
        consultoriaPix: hasConsultoria && !consultoriaIsMensal,
        plans: cart.plans,
        saasMensal: saas ? saas.price : 0,
        consultoriaPixTotal: consultoria && !consultoriaIsMensal ? getConsultoriaPixTotal(consultoria) : 0,
        consultants: cart.consultants,
      },
    })
    cart.clearCart()
  }

  const handleStripePayment = async (paymentMethodId: string) => {
    if (!validate() || !canSubmit) { setIsProcessing(false); return }
    try {
      const result = await processPayment({
        nome: form.nome, whatsapp: form.whatsapp, email: form.email,
        method: 'cartao', planIds: cart.plans.map((p) => p.id),
        totalCents, stripePaymentMethodId: paymentMethodId,
      })
      if (result.success) navigateToConfirmation(result.orderId)
    } finally { setIsProcessing(false) }
  }

  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isProcessing || !canSubmit) return
    setIsProcessing(true)
    try {
      const result = await processPayment({
        nome: form.nome, whatsapp: form.whatsapp, email: form.email,
        method: 'pix', planIds: cart.plans.map((p) => p.id), totalCents,
      })
      if (result.success) navigateToConfirmation(result.orderId)
    } finally { setIsProcessing(false) }
  }

  // ── Success screen ───────────────────────────────────────────
  if (demoSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <CheckoutHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <CheckCircle2 size={52} className="text-green-500 mx-auto mb-5" />
            <h1 className="text-2xl font-bold text-[#0E0E0F] mb-2">
              {selectedSlot ? 'Demonstração agendada!' : 'Dados recebidos!'}
            </h1>
            <p className="text-sm text-[#9C958A] mb-8 leading-relaxed">
              {selectedSlot
                ? <>Agendamos para <strong className="text-[#0E0E0F]">{selectedSlot.replace(/-(?=[^-]*$)/, ' às ')}</strong>. Entraremos em contato pelo WhatsApp para confirmar.</>
                : 'Recebemos seus dados. Nossa equipe entrará em contato pelo WhatsApp em até 1 dia útil para agendar a demonstração.'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Voltar ao site
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // ── Main checkout ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <CheckoutHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left column */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-[#0E0E0F] mb-1">Fale com a Granular</h1>
              <p className="text-sm text-[#9C958A]">
                Preencha seus dados e nossa equipe entra em contato para apresentar o sistema.
              </p>
            </div>

            {/* ── Formulário principal (demo path) ── */}
            <form onSubmit={handleDemoSubmit} className="space-y-8">

              {/* Seus dados */}
              <div className="space-y-5">
                <h2 className="text-base font-bold text-[#0E0E0F]">Seus dados</h2>

                {/* Empresa */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                    <Building2 size={15} className="text-[#9C958A]" />
                    Empresa
                  </label>
                  <input
                    type="text" autoFocus
                    placeholder="Nome do estabelecimento ou rede"
                    value={form.empresa}
                    onChange={(e) => updateField('empresa', e.target.value)}
                    className={inp(!!demoErrors.empresa)}
                  />
                  {demoErrors.empresa && <p className="text-xs text-[#A31631] mt-1">{demoErrors.empresa}</p>}
                </div>

                {/* Segmento */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                    <Store size={15} className="text-[#9C958A]" />
                    Segmento
                  </label>
                  <select
                    value={segmento}
                    onChange={(e) => { setSegmento(e.target.value); setSegmentoOutro('') }}
                    className={`${inp(!!demoErrors.segmento)} cursor-pointer ${!segmento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}
                  >
                    <option value="">Selecione o segmento</option>
                    {SEGMENTOS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {demoErrors.segmento && <p className="text-xs text-[#A31631] mt-1">{demoErrors.segmento}</p>}
                  {segmento === 'Outros' && (
                    <div className="mt-2">
                      <input
                        type="text" value={segmentoOutro}
                        onChange={(e) => setSegmentoOutro(e.target.value)}
                        className={inp(!!demoErrors.segmentoOutro)}
                        placeholder="Descreva o segmento"
                      />
                      {demoErrors.segmentoOutro && <p className="text-xs text-[#A31631] mt-1">{demoErrors.segmentoOutro}</p>}
                    </div>
                  )}
                </div>

                {/* Nome completo */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                    <User size={15} className="text-[#9C958A]" />
                    Nome completo
                  </label>
                  <input
                    type="text" placeholder="Seu nome e sobrenome"
                    value={form.nome}
                    onChange={(e) => updateField('nome', e.target.value)}
                    className={inp(!!demoErrors.nome)}
                  />
                  {demoErrors.nome && <p className="text-xs text-[#A31631] mt-1">{demoErrors.nome}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                    <MessageCircle size={15} className="text-[#25D366]" />
                    WhatsApp
                  </label>
                  <input
                    type="tel" placeholder="(31) 99999-9999"
                    value={form.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className={inp(!!demoErrors.whatsapp)}
                  />
                  {demoErrors.whatsapp
                    ? <p className="text-xs text-[#A31631] mt-1">{demoErrors.whatsapp}</p>
                    : <p className="text-xs text-[#9C958A] mt-1">Usaremos para entrar em contato e confirmar a demonstração</p>}
                </div>

                {/* E-mail */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                    <Mail size={15} className="text-[#9C958A]" />
                    E-mail
                  </label>
                  <input
                    type="email" placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={inp(!!demoErrors.email)}
                  />
                  {demoErrors.email
                    ? <p className="text-xs text-[#A31631] mt-1">{demoErrors.email}</p>
                    : <p className="text-xs text-[#9C958A] mt-1">Enviaremos o resumo do contato por aqui</p>}
                </div>

                {/* Faixa de faturamento */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                    <TrendingUp size={15} className="text-[#9C958A]" />
                    Faixa de faturamento
                    <span className="text-[#9C958A] text-xs font-normal">(opcional)</span>
                  </label>
                  <select
                    value={faturamento}
                    onChange={(e) => setFaturamento(e.target.value)}
                    className={`${inp(false)} cursor-pointer ${!faturamento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}
                  >
                    <option value="">Selecione a faixa</option>
                    {FAIXAS_FATURAMENTO.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              {/* Calendário — colapsado por padrão */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowCalendar((v) => !v)}
                  className="w-full flex items-center justify-between gap-3 border border-dashed border-[#9C958A]/30 hover:border-[var(--accent)] rounded-xl px-4 py-3 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} style={selectedSlot ? { color: 'var(--accent)' } : {}} />
                    {selectedSlot
                      ? <><strong className="text-[#0E0E0F]">Horário selecionado:</strong> {selectedSlot.replace(/-(?=[^-]*$)/, ' às ')}</>
                      : 'Quero escolher um horário (opcional)'}
                  </span>
                  <ChevronDown size={15} className={`shrink-0 transition-transform duration-200 ${showCalendar ? 'rotate-180' : ''}`} />
                </button>

                {showCalendar && (
                  <div className="rounded-xl border border-[#9C958A]/15 p-4">
                    <MiniCalendar
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelectSlot={(key) => setSelectedSlot(selectedSlot === key ? null : key)}
                    />
                  </div>
                )}

                {selectedSlot && (
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--accent-05)] border border-[var(--accent-10)] px-3 py-2 text-xs text-[#0E0E0F]">
                    <CalendarDays size={14} style={{ color: 'var(--accent)' }} className="shrink-0" />
                    <strong>{selectedSlot.replace(/-(?=[^-]*$)/, ' às ')}</strong>
                    <button
                      type="button"
                      onClick={() => { setSelectedSlot(null); setShowCalendar(false) }}
                      className="ml-auto text-[#9C958A] hover:text-[var(--accent)] transition-colors text-[10px]"
                    >
                      remover
                    </button>
                  </div>
                )}
              </div>

              {/* Seletor de segmento — mobile */}
              <div className="lg:hidden rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9C958A] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Seu segmento
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CHECKOUT_CATEGORIES.map(({ id, label, icon: Icon }) => {
                    const isActive = checkoutCategory === id
                    const accent = categoryAccent[id]
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setCheckoutCategory(id)}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all cursor-pointer border ${
                          isActive ? 'border-[1.5px] text-white' : 'border-[#0E0E0F]/10 bg-white text-[#9C958A] hover:text-[#0E0E0F] hover:border-[#0E0E0F]/20'
                        }`}
                        style={isActive ? { backgroundColor: accent.primary, borderColor: accent.primary } : {}}
                      >
                        <Icon size={13} />
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Resumo do pedido — colapsado por padrão */}
              <div className="lg:hidden space-y-2">
                <button
                  type="button"
                  onClick={() => setShowSummary((v) => !v)}
                  className="w-full flex items-center justify-between gap-3 border border-[#9C958A]/20 hover:border-[#9C958A]/40 rounded-xl px-4 py-3 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={15} />
                    Ver resumo do pedido
                  </span>
                  <ChevronDown size={15} className={`shrink-0 transition-transform duration-200 ${showSummary ? 'rotate-180' : ''}`} />
                </button>
                {showSummary && <OrderSummary paymentMethod={form.paymentMethod} category={checkoutCategory} />}
              </div>

              {/* CTA primário — enviar sem pagamento */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
                >
                  {selectedSlot
                    ? <><CalendarDays size={18} /> Confirmar agendamento</>
                    : <><Send size={18} /> Enviar — Entraremos em contato</>
                  }
                </button>
                <p className="text-[11px] text-[#9C958A] text-center">
                  {selectedSlot
                    ? 'Confirmaremos a data pelo WhatsApp informado.'
                    : 'Nossa equipe entra em contato pelo WhatsApp em até 1 dia útil.'}
                </p>
              </div>

              {/* Separador */}
              <div className="relative flex items-center gap-4">
                <div className="flex-1 h-px bg-[#9C958A]/20" />
                <span className="text-xs text-[#9C958A] whitespace-nowrap">ou, se preferir</span>
                <div className="flex-1 h-px bg-[#9C958A]/20" />
              </div>

              {/* ── Seção de pagamento colapsada ── */}
              <div>
                <button
                  type="button"
                  onClick={() => { setShowPayment((v) => { const next = !v; if (next) setShowSummary(true); return next }) }}
                  className="w-full flex items-center justify-between gap-3 bg-[#0E0E0F] hover:bg-[#1a1a1b] text-white rounded-2xl px-5 py-4 text-sm font-semibold transition-colors shadow-lg shadow-black/10"
                >
                  <span className="flex items-center gap-2.5">
                    <CreditCard size={17} />
                    Quero contratar agora
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-white/60 transition-transform duration-300 ${showPayment ? 'rotate-180' : ''}`}
                  />
                </button>

                {showPayment && (
                  <div className="mt-3 space-y-6 bg-[#F7F6F3] border border-[#0E0E0F]/8 rounded-2xl p-5 sm:p-6">
                    {/* CNPJ/CPF — necessário para cobrança */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
                        <FileText size={15} className="text-[#9C958A]" />
                        {t.checkout.contact.document}
                      </label>
                      <div className="relative">
                        <input
                          type="text" inputMode="numeric"
                          placeholder="00.000.000/0000-00 ou 000.000.000-00"
                          value={form.documento}
                          onChange={(e) => updateField('documento', e.target.value)}
                          className={`${inp(!!payErrors.documento)} pr-10`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {documentoStatus === 'loading' && <Loader2 size={16} className="text-[#9C958A] animate-spin" />}
                          {documentoStatus === 'valid' && <CheckCircle size={16} className="text-green-500" />}
                          {documentoStatus === 'invalid' && <XCircle size={16} className="text-[#A31631]" />}
                        </div>
                      </div>
                      {payErrors.documento
                        ? <p className="text-xs text-[#A31631] mt-1">{payErrors.documento}</p>
                        : documentoStatus === 'valid'
                          ? <p className="text-xs text-green-600 mt-1">Documento validado</p>
                          : <p className="text-xs text-[#9C958A] mt-1">{t.checkout.contact.documentHint}</p>}
                    </div>

                    {/* Pagamento */}
                    <div ref={paymentRef}>
                      <Elements stripe={stripePromise} options={{ locale: 'pt-BR' }}>
                        <PaymentMethodSelector
                          selected={form.paymentMethod}
                          onSelect={setPaymentMethod}
                          hasSaas={hasSaas}
                          hasConsultoria={hasConsultoria || hasConsultants}
                          hasMentor={hasConsultants}
                          hasAvulso={hasAvulso && isCartao}
                          avulsoMethod={form.avulsoMethod}
                          onAvulsoMethodChange={setAvulsoMethod}
                          cardContent={
                            <StripeCardForm
                              onPaymentSuccess={handleStripePayment}
                              onError={(err) => console.error(err)}
                              isProcessing={isProcessing}
                              setIsProcessing={setIsProcessing}
                              totalCents={totalCents}
                              customerEmail={form.email}
                              customerName={form.nome}
                              buttonText={buttonText}
                            />
                          }
                          pixContent={
                            <form onSubmit={handlePixSubmit}>
                              <button
                                type="submit"
                                disabled={isProcessing || !canSubmit}
                                className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
                              >
                                {isProcessing
                                  ? <><Loader2 size={20} className="animate-spin" />{t.checkout.processing}</>
                                  : buttonText}
                              </button>
                            </form>
                          }
                        />
                      </Elements>
                    </div>

                    <SecurityBadge />
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Right column — seletor de categoria + resumo (desktop) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8 space-y-3">

              {/* Seletor de segmento */}
              <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9C958A] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Seu segmento
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CHECKOUT_CATEGORIES.map(({ id, label, icon: Icon }) => {
                    const isActive = checkoutCategory === id
                    const accent = categoryAccent[id]
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setCheckoutCategory(id)}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all cursor-pointer border ${
                          isActive ? 'border-[1.5px] text-white' : 'border-[#0E0E0F]/10 bg-white text-[#9C958A] hover:text-[#0E0E0F] hover:border-[#0E0E0F]/20'
                        }`}
                        style={isActive ? { backgroundColor: accent.primary, borderColor: accent.primary } : {}}
                      >
                        <Icon size={13} />
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSummary((v) => !v)}
                className="w-full flex items-center justify-between gap-3 border border-[#9C958A]/20 hover:border-[#9C958A]/40 rounded-xl px-4 py-3 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={15} />
                  Ver resumo do pedido
                </span>
                <ChevronDown size={15} className={`shrink-0 transition-transform duration-200 ${showSummary ? 'rotate-180' : ''}`} />
              </button>
              {showSummary && <OrderSummary paymentMethod={form.paymentMethod} category={checkoutCategory} />}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky mobile bar — aparece só quando pagamento expandido e fora da tela */}
      {showPayment && (
        <div
          className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
            showStickyBar ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="bg-white border-t border-[#9C958A]/20 shadow-2xl px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-xs text-[#9C958A] leading-tight">
              {t.checkout.totalLabel}{' '}
              <span className="font-bold text-[#0E0E0F] text-sm">
                R$ {totalReais.toLocaleString('pt-BR')}{t.checkout.perMonth}
              </span>
            </p>
            <button
              onClick={() => paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="flex-shrink-0 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              {t.checkout.goToPayment}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
