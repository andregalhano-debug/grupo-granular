import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader2, CheckCircle2, ChevronLeft, ChevronRight, CalendarDays, ChevronDown } from 'lucide-react'
import { submitDemoBooking, type DemoBookingInput } from '../../services/demoBookingService'
import { formatWhatsApp } from '../../utils/formatters'

const WEEKDAYS_LABEL = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const SEGMENTOS = [
  'Restaurante', 'Mercado', 'Atacado', 'Atacarejo', 'Farmácia', 'Pet Shop', 'Shopping', 'Outros',
]

const FAIXAS_FATURAMENTO = [
  'Iniciando no Delivery', 'Até 50k', '50k a 150k', '150k a 300k',
  '300k a 500k', '500k a 1M', 'Acima de 1M',
]

const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

function getAvailableDays(): Date[] {
  const days: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let d = 1; d <= 30; d++) {
    const date = new Date(today)
    date.setDate(today.getDate() + d)
    const dow = date.getDay()
    if (dow >= 1 && dow <= 5) days.push(date)
  }
  return days
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const field =
  'w-full min-h-11 px-3.5 border border-[#e4ddd2] rounded-xl bg-white text-base text-[#2c241f] outline-none focus:border-[#7c2d3e]'

export function DemoBookingForm({
  source = 'home-contato',
}: {
  source?: DemoBookingInput['source']
}) {
  const [company, setCompany] = useState('')
  const [segmento, setSegmento] = useState('')
  const [segmentoOutro, setSegmentoOutro] = useState('')
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [faturamento, setFaturamento] = useState('')
  const [dateIso, setDateIso] = useState('')
  const [time, setTime] = useState('')
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableDays = useMemo(() => getAvailableDays(), [])
  const availableDayKeys = useMemo(() => new Set(availableDays.map(dateKey)), [availableDays])

  const selectedDate = useMemo(() => {
    if (!dateIso) return null
    const d = availableDays.find((day) => dateKey(day) === dateIso)
    return d ?? null
  }, [dateIso, availableDays])

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const grid: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) grid.push(null)
    for (let d = 1; d <= daysInMonth; d++) grid.push(d)
    return grid
  }, [viewYear, viewMonth])

  const isAvailable = (day: number) => availableDayKeys.has(dateKey(new Date(viewYear, viewMonth, day)))

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === viewYear
      && selectedDate.getMonth() === viewMonth
      && selectedDate.getDate() === day
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1) }
    else setViewMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1) }
    else setViewMonth((m) => m + 1)
  }

  useEffect(() => {
    if (!calendarOpen) return
    const onDoc = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCalendarOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [calendarOpen])

  const handleDayClick = (day: number) => {
    if (!isAvailable(day)) return
    const key = dateKey(new Date(viewYear, viewMonth, day))
    if (dateIso === key) {
      setDateIso('')
      setTime('')
      setCalendarOpen(false)
      return
    }
    setDateIso(key)
    setTime('')
    setCalendarOpen(false)
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

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
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
        time: time || '-',
        dateIso: dateIso || '',
        source,
      })
      setSubmitted(true)
    } catch {
      setSubmitError('Não foi possível enviar agora. Tente de novo em instantes.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-[#2c241f]">
        <CheckCircle2 size={28} className="text-[#7c2d3e] mb-3" />
        <p className="text-[19px] font-semibold">Recebemos seu interesse.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#5f5248]">
          A equipe retorna por e-mail. Você também recebe a confirmação da demonstração.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[#2c241f]">
      <p
        className="text-[11px] tracking-[.2em] uppercase text-[#7c2d3e]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        Agendar demonstração
      </p>

      <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
        Empresa
        <input value={company} onChange={(e) => setCompany(e.target.value)} className={field} placeholder="Nome do estabelecimento ou rede" />
        {errors.company && <span className="text-xs text-[#7c2d3e]">{errors.company}</span>}
      </label>

      <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
        Segmento
        <select
          value={segmento}
          onChange={(e) => { setSegmento(e.target.value); setSegmentoOutro('') }}
          className={`${field} cursor-pointer ${!segmento ? 'text-[#8a7a6e]' : ''}`}
        >
          <option value="">Selecione o segmento</option>
          {SEGMENTOS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.segmento && <span className="text-xs text-[#7c2d3e]">{errors.segmento}</span>}
      </label>
      {segmento === 'Outros' && (
        <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
          Qual segmento?
          <input value={segmentoOutro} onChange={(e) => setSegmentoOutro(e.target.value)} className={field} placeholder="Descreva o segmento" />
          {errors.segmentoOutro && <span className="text-xs text-[#7c2d3e]">{errors.segmentoOutro}</span>}
        </label>
      )}

      <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
        Nome completo
        <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Seu nome e sobrenome" autoComplete="name" />
        {errors.name && <span className="text-xs text-[#7c2d3e]">{errors.name}</span>}
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
          WhatsApp
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
            className={field}
            placeholder="(31) 99999-9999"
          />
          {errors.whatsapp && <span className="text-xs text-[#7c2d3e]">{errors.whatsapp}</span>}
        </label>
        <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
          E-mail
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="seu@email.com" />
          {errors.email && <span className="text-xs text-[#7c2d3e]">{errors.email}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
        Faixa de faturamento <span className="font-normal text-[#8a7a6e]">(opcional)</span>
        <select
          value={faturamento}
          onChange={(e) => setFaturamento(e.target.value)}
          className={`${field} cursor-pointer ${!faturamento ? 'text-[#8a7a6e]' : ''}`}
        >
          <option value="">Selecione a faixa</option>
          {FAIXAS_FATURAMENTO.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </label>

      <div ref={calendarRef} className="relative">
        <p className="text-[13px] text-[#6b5d52] mb-1.5">
          Dia <span className="font-normal text-[#8a7a6e]">(opcional)</span>
        </p>
        <button
          type="button"
          onClick={() => setCalendarOpen((v) => !v)}
          aria-expanded={calendarOpen}
          className={`${field} flex items-center gap-2 text-left cursor-pointer ${dateIso ? '' : 'text-[#8a7a6e]'}`}
        >
          <CalendarDays size={16} className="shrink-0 text-[#8a7a6e]" />
          <span className="flex-1 truncate capitalize">
            {selectedDate
              ? selectedDate.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })
              : 'A combinar'}
          </span>
          <ChevronDown size={16} className={`shrink-0 text-[#8a7a6e] transition-transform ${calendarOpen ? 'rotate-180' : ''}`} />
        </button>
        {calendarOpen && (
          <div className="absolute z-20 left-0 right-0 mt-1.5 rounded-xl border border-[#e4ddd2] bg-white p-3 shadow-[0_12px_28px_-16px_rgba(44,36,31,.35)]">
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-[#f0ede8] text-[#8a7a6e] transition-colors" aria-label="Mês anterior">
                <ChevronLeft size={16} />
              </button>
              <span className="text-[13px] font-semibold text-[#2c241f] capitalize">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-[#f0ede8] text-[#8a7a6e] transition-colors" aria-label="Próximo mês">
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-7 mb-0.5">
              {WEEKDAYS_LABEL.map((wd) => (
                <div key={wd} className="text-center text-[10px] font-medium text-[#8a7a6e] py-1">{wd}</div>
              ))}
            </div>
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
                    className={`h-8 w-full rounded-lg text-[13px] font-medium transition-colors ${
                      selected
                        ? 'bg-[#7c2d3e] text-[#f7f2ee]'
                        : available
                          ? 'text-[#7c2d3e] font-semibold hover:bg-[#7c2d3e]/10 cursor-pointer'
                          : 'text-[#8a7a6e]/35 cursor-default'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        )}
        {dateIso ? (
          <button
            type="button"
            onClick={() => { setDateIso(''); setTime('') }}
            className="mt-1.5 text-[12px] text-[#8a7a6e] hover:text-[#7c2d3e] transition-colors"
          >
            Limpar dia — a combinar
          </button>
        ) : (
          <p className="mt-1.5 text-[12px] text-[#8a7a6e]">Dias úteis em vinho. Sem escolha, combinamos depois.</p>
        )}
      </div>

      {dateIso && (
        <div>
          <p className="text-[13px] text-[#6b5d52] mb-1.5">Horário</p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(time === slot ? '' : slot)}
                className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                  time === slot
                    ? 'bg-[#7c2d3e] text-[#f7f2ee]'
                    : 'border border-[#e4ddd2] text-[#2c241f] hover:border-[#7c2d3e]'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {submitError && <p className="text-sm text-[#7c2d3e]">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 min-h-[52px] rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] disabled:opacity-60 text-[#f7f2ee] text-base font-medium transition-colors inline-flex items-center justify-center gap-2"
      >
        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
        {isSubmitting ? 'Enviando…' : 'Agendar demonstração'}
      </button>
    </form>
  )
}
