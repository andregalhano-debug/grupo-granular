import { useMemo, useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { submitDemoBooking, type DemoBookingInput } from '../../services/demoBookingService'
import { formatWhatsApp } from '../../utils/formatters'

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
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableDays = useMemo(() => getAvailableDays(), [])

  const selectedDate = useMemo(() => {
    if (!dateIso) return null
    const d = availableDays.find((day) => dateKey(day) === dateIso)
    return d ?? null
  }, [dateIso, availableDays])

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

      <label className="flex flex-col gap-1 text-[13px] text-[#6b5d52]">
        Dia <span className="font-normal text-[#8a7a6e]">(opcional)</span>
        <select
          value={dateIso}
          onChange={(e) => { setDateIso(e.target.value); setTime('') }}
          className={`${field} cursor-pointer ${!dateIso ? 'text-[#8a7a6e]' : ''}`}
        >
          <option value="">A combinar</option>
          {availableDays.slice(0, 15).map((d) => (
            <option key={dateKey(d)} value={dateKey(d)}>
              {d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
            </option>
          ))}
        </select>
      </label>

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
