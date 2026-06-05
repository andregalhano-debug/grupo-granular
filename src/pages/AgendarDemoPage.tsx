import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react'
import { GranularLogo } from '../components/GranularLogo'
import { generateDemoSlots, saveDemoBooking } from '../data/demoSlots'
import type { DemoSlot } from '../data/demoSlots'

export function AgendarDemoPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('')
  const [units, setUnits] = useState('')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slotsExpanded, setSlotsExpanded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const slots = useMemo(() => generateDemoSlots(), [])

  const slotsByDate = useMemo(() => {
    const map = new Map<string, DemoSlot[]>()
    for (const slot of slots) {
      const list = map.get(slot.date) || []
      list.push(slot)
      map.set(slot.date, list)
    }
    return map
  }, [slots])

  const entries = Array.from(slotsByDate.entries())
  const visibleEntries = slotsExpanded ? entries : entries.slice(0, 3)
  const hiddenCount = entries.length - 3

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Informe seu nome'
    if (!email.trim() || !email.includes('@')) e.email = 'Informe um e-mail válido'
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp válido'
    if (!company.trim()) e.company = 'Informe o nome da empresa'
    if (!selectedSlot) e.slot = 'Selecione uma data e horário'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const lastDash = selectedSlot!.lastIndexOf('-')
    const slotDate = selectedSlot!.substring(0, lastDash)
    const slotTime = selectedSlot!.substring(lastDash + 1)

    saveDemoBooking({
      id: `demo-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      company: company.trim(),
      units: units.trim() || '1',
      date: slotDate,
      time: slotTime,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    })

    setSubmitted(true)
  }

  if (submitted) {
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
            <h1 className="text-2xl font-bold text-[#0E0E0F] mb-2">Demonstração agendada!</h1>
            <p className="text-sm text-[#9C958A] mb-6">
              Recebemos seu agendamento para <strong className="text-[#0E0E0F]">{selectedSlot?.replace(/-(?=[^-]*$)/, ' às ')}</strong>.
              Entraremos em contato pelo WhatsApp para confirmar.
            </p>
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
          <h1 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-1">Agendar demonstração</h1>
          <p className="text-xs sm:text-sm text-[#9C958A]">Escolha o melhor dia e horário para conhecer a plataforma.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Dados */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-[#0E0E0F]">Seus dados</h2>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Nome completo</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'}`}
                placeholder="Seu nome" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'}`}
                placeholder="seu@email.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">WhatsApp</label>
              <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm outline-none transition-colors ${errors.whatsapp ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'}`}
                placeholder="(31) 99999-9999" />
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Empresa</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm outline-none transition-colors ${errors.company ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'}`}
                placeholder="Nome do restaurante ou rede" />
              {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Número de unidades</label>
              <input type="text" value={units} onChange={(e) => setUnits(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#9C958A]/20 text-sm outline-none focus:border-[#A31631] transition-colors"
                placeholder="Ex: 3" />
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-[#0E0E0F]">Escolha data e horário</h2>

            {errors.slot && (
              <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
                <AlertCircle size={14} className="flex-shrink-0" />
                {errors.slot}
              </div>
            )}

            <div className="space-y-4">
              {visibleEntries.map(([date, dateSlots]) => (
                <div key={date}>
                  <p className="text-xs font-medium text-[#0E0E0F] mb-2 capitalize">{date}</p>
                  <div className="flex flex-wrap gap-2">
                    {dateSlots.map((slot) => {
                      const key = `${date}-${slot.time}`
                      const isSelected = selectedSlot === key
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(isSelected ? null : key)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            !slot.available
                              ? 'bg-[#F7F7F7] text-[#9C958A]/40 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#A31631] text-white shadow-sm'
                              : 'border border-[#9C958A]/20 text-[#0E0E0F] hover:border-[#A31631]/40 hover:bg-[#A31631]/5'
                          }`}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {!slotsExpanded && hiddenCount > 0 && (
                <button type="button" onClick={() => setSlotsExpanded(true)}
                  className="w-full flex items-center justify-center gap-1 text-xs font-medium text-[#A31631] hover:bg-[#A31631]/5 py-2 rounded-lg transition-colors cursor-pointer">
                  +{hiddenCount} dias <ChevronDown size={14} />
                </button>
              )}
              {slotsExpanded && hiddenCount > 0 && (
                <button type="button" onClick={() => setSlotsExpanded(false)}
                  className="w-full flex items-center justify-center gap-1 text-xs font-medium text-[#9C958A] hover:bg-[#F7F7F7] py-2 rounded-lg transition-colors cursor-pointer">
                  Recolher <ChevronDown size={14} className="rotate-180" />
                </button>
              )}
            </div>

            {selectedSlot && (
              <div className="flex items-center gap-2 rounded-lg bg-[#A31631]/5 px-3 py-2 text-xs text-[#0E0E0F]">
                <CalendarDays size={14} className="text-[#A31631]" />
                Selecionado: <strong>{selectedSlot.replace(/-(?=[^-]*$)/, ' às ')}</strong>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl text-sm transition-colors cursor-pointer"
            >
              <CalendarDays size={16} />
              Confirmar agendamento
            </button>

            <p className="text-[11px] text-[#9C958A] text-center">
              Ao agendar, você receberá uma confirmação no WhatsApp informado.
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
