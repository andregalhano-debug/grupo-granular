import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, CheckCircle2, Send, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { GranularLogo } from '../components/GranularLogo'
import { AddToCalendar } from '../components/AddToCalendar'
import { getDemoBookings } from '../data/demoSlots'
import { submitDemoBooking } from '../services/demoBookingService'
import { formatWhatsApp } from '../utils/formatters'
import { parseCtaOrigem, ctaOrigemLabel, CTA_ORIGEM } from '../data/ctaOrigem'

const SEGMENTOS = [
  'Restaurante', 'Mercado', 'Atacado', 'Atacarejo', 'Farmácia', 'Pet Shop', 'Shopping', 'Outros',
]

const FAIXAS_FATURAMENTO = [
  'Iniciando no Delivery', 'Até 50k', '50k a 150k', '150k a 300k',
  '300k a 500k', '500k a 1M', 'Acima de 1M',
]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
const WEEKDAYS_LABEL = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

const inputClass = (hasError: boolean) =>
  `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm outline-none transition-colors ${
    hasError ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'
  }`

function getAvailableDays(): Date[] {
  const days: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let d = 1; d <= 30; d++) {
    const date = new Date(today)
    date.setDate(today.getDate() + d)
    const dow = date.getDay()
    if (dow >= 1 && dow <= 5) days.push(date) // seg–sex
  }
  return days
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function slotKey(date: Date, time: string) {
  return `${dateKey(date)}-${time}`
}

export function AgendarDemoPage() {
  const [searchParams] = useSearchParams()
  const origem = parseCtaOrigem(searchParams.get('origem'))
  const origemLabel = ctaOrigemLabel(origem)
  const [company, setCompany] = useState('')
  const [segmento, setSegmento] = useState('')
  const [segmentoOutro, setSegmentoOutro] = useState('')
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [faturamento, setFaturamento] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth())
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { if (submitted) window.scrollTo({ top: 0, behavior: 'smooth' }) }, [submitted])

  // Datas disponíveis (próximos 30 dias úteis)
  const availableDays = useMemo(() => getAvailableDays(), [])
  const availableDayKeys = useMemo(() => new Set(availableDays.map(dateKey)), [availableDays])

  // Horários já reservados
  const bookedSlots = useMemo(() => {
    const bookings = getDemoBookings()
    return new Set(bookings.filter((b) => b.status !== 'cancelada').map((b) => `${b.date}-${b.time}`))
  }, [])

  // Grid do calendário
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const grid: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) grid.push(null)
    for (let d = 1; d <= daysInMonth; d++) grid.push(d)
    return grid
  }, [viewYear, viewMonth])

  const isAvailable = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    return availableDayKeys.has(dateKey(d))
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
  }

  const isTimeBooked = (time: string) => {
    if (!selectedDate) return false
    return bookedSlots.has(slotKey(selectedDate, time))
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const handleDayClick = (day: number) => {
    if (!isAvailable(day)) return
    const d = new Date(viewYear, viewMonth, day)
    setSelectedDate(d)
    setSelectedTime(null)
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!company.trim()) e.company = 'Informe o nome da empresa'
    if (!segmento) e.segmento = 'Selecione o segmento'
    if (segmento === 'Outros' && !segmentoOutro.trim()) e.segmentoOutro = 'Descreva o segmento'
    if (!name.trim()) e.name = 'Informe seu nome'
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp válido'
    if (!email.trim() || !email.includes('@')) e.email = 'Informe um e-mail válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isSubmitting) return
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await submitDemoBooking({
        name: name.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        company: company.trim(),
        segmento,
        segmentoOutro: segmento === 'Outros' ? segmentoOutro.trim() : undefined,
        faturamento: faturamento || '-',
        date: selectedDate
          ? selectedDate.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
          : '-',
        time: selectedTime || '-',
        dateIso: selectedDate ? dateKey(selectedDate) : '',
        source: origem,
      })
      setSubmitted(true)
    } catch {
      setSubmitError('Não foi possível enviar agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    const dateLabel = selectedDate
      ? selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
      : null
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <GranularLogo size={28} color="#0E0E0F" />
              <span className="text-base font-semibold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Granular</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#0E0E0F] mb-2">
              {selectedDate && selectedTime ? 'Demonstração agendada!' : 'Dados recebidos!'}
            </h1>
            <p className="text-sm text-[#9C958A] mb-6">
              {selectedDate && selectedTime
                ? <>Agendamos para <strong className="text-[#0E0E0F] capitalize">{dateLabel}</strong> às <strong className="text-[#0E0E0F]">{selectedTime}</strong>. Nossa equipe confirmará pelo WhatsApp.</>
                : 'Recebemos seus dados. Nossa equipe entrará em contato pelo WhatsApp em breve para agendar a melhor data.'}
            </p>
            {selectedDate && selectedTime && (
              <AddToCalendar
                event={{
                  title: company.trim()
                    ? `Demonstração Granular — ${company.trim()}`
                    : 'Demonstração Granular',
                  description:
                    'Demonstração da plataforma Granular. Nossa equipe confirma pelo WhatsApp e envia o link da reunião.\n\nhttps://www.grupogranular.com.br',
                  location: 'Online — link no WhatsApp',
                  start: (() => {
                    const [hh, mm] = selectedTime.split(':').map(Number)
                    const start = new Date(selectedDate)
                    start.setHours(hh || 0, mm || 0, 0, 0)
                    return start
                  })(),
                }}
              />
            )}
            <Link to="/" className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors">
              Voltar ao site
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-base font-semibold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Granular</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-1">
            {origem !== CTA_ORIGEM.demo ? origemLabel : 'Agendar demonstração'}
          </h1>
          <p className="text-xs sm:text-sm text-[#9C958A]">
            {origem !== CTA_ORIGEM.demo
              ? `Preencha seus dados para falar sobre ${origemLabel}. Se quiser, escolha também um dia e horário.`
              : 'Preencha seus dados e escolha o melhor dia e horário para você.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Dados */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-[#0E0E0F]">Seus dados</h2>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Empresa</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                className={inputClass(!!errors.company)} placeholder="Nome do estabelecimento ou rede" autoFocus />
              {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Segmento</label>
              <select value={segmento} onChange={(e) => { setSegmento(e.target.value); setSegmentoOutro('') }}
                className={`${inputClass(!!errors.segmento)} cursor-pointer ${!segmento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}>
                <option value="">Selecione o segmento</option>
                {SEGMENTOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.segmento && <p className="text-xs text-red-500 mt-1">{errors.segmento}</p>}
              {segmento === 'Outros' && (
                <div className="mt-2">
                  <input type="text" value={segmentoOutro} onChange={(e) => setSegmentoOutro(e.target.value)}
                    className={inputClass(!!errors.segmentoOutro)} placeholder="Descreva o segmento" />
                  {errors.segmentoOutro && <p className="text-xs text-red-500 mt-1">{errors.segmentoOutro}</p>}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Nome completo</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className={inputClass(!!errors.name)} placeholder="Seu nome e sobrenome" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">WhatsApp</label>
              <input type="tel" inputMode="numeric" autoComplete="tel" value={whatsapp} onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                className={inputClass(!!errors.whatsapp)} placeholder="(31) 99999-9999" />
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={inputClass(!!errors.email)} placeholder="seu@email.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">
                Faixa de faturamento <span className="text-[#9C958A] font-normal">(opcional)</span>
              </label>
              <select value={faturamento} onChange={(e) => setFaturamento(e.target.value)}
                className={`${inputClass(false)} cursor-pointer ${!faturamento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}>
                <option value="">Selecione a faixa</option>
                {FAIXAS_FATURAMENTO.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* Calendário + Horário + Submit */}
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-[#0E0E0F] mb-0.5">
                Escolha um dia e horário <span className="text-[#9C958A] font-normal">(opcional)</span>
              </h2>
              <p className="text-xs text-[#9C958A]">Dias úteis disponíveis marcados em vermelho.</p>
            </div>

            {/* Calendário */}
            <div className="rounded-2xl border border-[#9C958A]/20 p-4 bg-white">
              {/* Navegação de mês */}
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-[#0E0E0F] capitalize">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button type="button" onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Cabeçalho dias da semana */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS_LABEL.map((wd) => (
                  <div key={wd} className="text-center text-[10px] font-medium text-[#9C958A] py-1">{wd}</div>
                ))}
              </div>

              {/* Grid de dias */}
              <div className="grid grid-cols-7 gap-0.5">
                {calendarDays.map((day, i) => {
                  if (day === null) return <div key={`pad-${i}`} />
                  const available = isAvailable(day)
                  const selected = isSelected(day)
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={!available}
                      onClick={() => handleDayClick(day)}
                      className={`h-9 w-full rounded-lg text-sm font-medium transition-all ${
                        selected
                          ? 'bg-[#A31631] text-white shadow-md'
                          : available
                            ? 'text-[#A31631] font-bold hover:bg-[#A31631]/10 cursor-pointer'
                            : 'text-[#9C958A]/35 cursor-default'
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Horários */}
            {selectedDate && (
              <div>
                <p className="text-xs font-medium text-[#0E0E0F] mb-2 capitalize">
                  {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => {
                    const booked = isTimeBooked(time)
                    const sel = selectedTime === time
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={booked}
                        onClick={() => setSelectedTime(sel ? null : time)}
                        className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                          booked
                            ? 'bg-[#F7F7F7] text-[#9C958A]/40 line-through cursor-not-allowed'
                            : sel
                              ? 'bg-[#A31631] text-white shadow-md'
                              : 'border border-[#9C958A]/25 text-[#0E0E0F] hover:border-[#A31631] hover:text-[#A31631] cursor-pointer'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Seleção confirmada */}
            {selectedDate && selectedTime && (
              <div className="flex items-center gap-2 rounded-xl bg-[#A31631]/5 border border-[#A31631]/15 px-3 py-2.5 text-xs text-[#0E0E0F]">
                <CalendarDays size={14} className="text-[#A31631] flex-shrink-0" />
                <span className="capitalize">
                  {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                  {' '}às <strong>{selectedTime}</strong>
                </span>
                <button type="button" onClick={() => { setSelectedDate(null); setSelectedTime(null) }}
                  className="ml-auto text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                  ✕
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3.5 sm:py-4 px-6 rounded-xl text-sm transition-colors cursor-pointer"
            >
              {isSubmitting
                ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                : selectedDate && selectedTime
                  ? <><CalendarDays size={16} /> Confirmar agendamento</>
                  : <><Send size={16} /> Enviar — Entraremos em contato</>
              }
            </button>

            {submitError && (
              <p className="text-xs text-red-500 text-center">
                {submitError}{' '}
                <a href="https://wa.me/5531984355542" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  Abrir WhatsApp
                </a>
              </p>
            )}

            <p className="text-[11px] text-[#9C958A] text-center">
              {selectedDate && selectedTime
                ? 'Nossa equipe confirmará o agendamento pelo WhatsApp.'
                : 'Nossa equipe entrará em contato pelo WhatsApp em até 1 dia útil.'}
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
