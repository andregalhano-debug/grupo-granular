import { useEffect, useState, useMemo } from 'react'
import { X, Star, Clock, MapPin, CalendarDays, Check, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Consultant, TimeSlot } from '../../data/consultants'

interface ConsultantModalProps {
  consultant: Consultant | null
  onClose: () => void
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function ConsultantModal({ consultant, onClose }: ConsultantModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)
  const [agendaExpanded, setAgendaExpanded] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    setSelectedSlot(null)
    setBooked(false)
    setAgendaExpanded(false)
  }, [consultant])

  // Agrupar slots por data
  const slotsByDate = useMemo(() => {
    if (!consultant) return new Map<string, TimeSlot[]>()
    const map = new Map<string, TimeSlot[]>()
    for (const slot of consultant.slots) {
      const list = map.get(slot.date) || []
      list.push(slot)
      map.set(slot.date, list)
    }
    return map
  }, [consultant])

  if (!consultant) return null

  const handleBook = () => {
    if (!selectedSlot) return
    // Simulação — futuramente integra com Google Calendar API
    setBooked(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer z-10">
          <X size={20} />
        </button>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#EA1D2C]">{getInitials(consultant.name)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0E0E0F]">{consultant.name}</h2>
              <p className="text-sm text-[#9C958A]">{consultant.title}</p>
              <p className="text-sm text-[#9C958A]">{consultant.company}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(consultant.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'} />
                  ))}
                  <span className="text-xs text-[#9C958A] ml-1">{consultant.rating} ({consultant.reviewCount} avaliações)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preço + Disponibilidade */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-xl">
              <span className="text-lg font-bold text-[#0E0E0F]">R$ {consultant.hourlyRate}</span>
              <span className="text-xs text-[#9C958A]">/hora</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-xl text-sm text-[#9C958A]">
              <Clock size={14} />
              {consultant.availability.join(' • ')}
            </div>
            <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-xl text-sm text-[#9C958A]">
              <MapPin size={14} />
              {consultant.experienceYears} anos de experiência
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-sm font-semibold text-[#0E0E0F] mb-2">Sobre</h3>
            <p className="text-sm text-[#9C958A] leading-relaxed">{consultant.bio}</p>
          </div>

          {/* Expertises */}
          <div>
            <h3 className="text-sm font-semibold text-[#0E0E0F] mb-3">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {consultant.expertises.map((exp) => (
                <span key={exp} className="text-xs bg-[#EA1D2C]/10 text-[#EA1D2C] px-3 py-1.5 rounded-full font-medium">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Agendamento */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#0E0E0F] mb-3">
              <CalendarDays size={16} />
              Agendar sessão
            </h3>

            {booked ? (
              <div className="rounded-xl bg-green-50 p-5 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Check size={20} className="text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-700">Sessão agendada com sucesso!</p>
                <p className="text-xs text-green-600">
                  Você receberá um convite no Google Calendar com os detalhes da reunião.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {(() => {
                  const entries = Array.from(slotsByDate.entries())
                  const visibleEntries = agendaExpanded ? entries : entries.slice(0, 1)
                  const hiddenCount = entries.length - 1

                  return (
                    <>
                      {visibleEntries.map(([date, slots]) => (
                        <div key={date}>
                          <p className="text-xs font-medium text-[#0E0E0F] mb-2 capitalize">{date}</p>
                          <div className="flex flex-wrap gap-2">
                            {slots.map((slot) => {
                              const key = `${date}-${slot.time}`
                              const isSelected = selectedSlot === key
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setSelectedSlot(isSelected ? null : key)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                    !slot.available
                                      ? 'bg-[#F7F7F7] text-[#9C958A]/40 cursor-not-allowed line-through'
                                      : isSelected
                                        ? 'bg-[#EA1D2C] text-white shadow-sm'
                                        : 'border border-[#9C958A]/20 text-[#0E0E0F] hover:border-[#EA1D2C]/30'
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}

                      {!agendaExpanded && hiddenCount > 0 && (
                        <>
                          {/* Preview das datas ocultas */}
                          <div className="flex items-center gap-2 text-xs text-[#9C958A]">
                            {entries.slice(1, 4).map(([date]) => (
                              <span key={date} className="bg-[#F7F7F7] px-2.5 py-1 rounded-lg capitalize opacity-60">{date}</span>
                            ))}
                            {hiddenCount > 3 && <span className="opacity-40">...</span>}
                          </div>
                          <button
                            type="button"
                            onClick={() => setAgendaExpanded(true)}
                            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-[#EA1D2C] hover:bg-[#EA1D2C]/5 py-2 rounded-lg transition-colors cursor-pointer"
                          >
                            Ver mais {hiddenCount} {hiddenCount === 1 ? 'dia disponível' : 'dias disponíveis'}
                            <ChevronDown size={14} />
                          </button>
                        </>
                      )}

                      {agendaExpanded && (
                        <button
                          type="button"
                          onClick={() => setAgendaExpanded(false)}
                          className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-[#9C958A] hover:bg-[#F7F7F7] py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          Recolher agenda
                          <ChevronDown size={14} className="rotate-180" />
                        </button>
                      )}
                    </>
                  )
                })()}

                <p className="text-[10px] text-[#9C958A]">
                  Integrado com Google Calendar — o convite será enviado automaticamente.
                </p>
              </div>
            )}
          </div>

          {/* Reviews */}
          {consultant.reviews.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#0E0E0F] mb-3">Avaliações</h3>
              <div className="space-y-3">
                {consultant.reviews.map((review) => (
                  <div key={review.author} className="rounded-xl bg-[#F7F7F7] p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'} />
                      ))}
                    </div>
                    <p className="text-sm text-[#9C958A] mb-2">"{review.text}"</p>
                    <p className="text-xs text-[#0E0E0F] font-medium">{review.author} — <span className="text-[#9C958A] font-normal">{review.role}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!booked && (
              <button
                type="button"
                onClick={handleBook}
                disabled={!selectedSlot}
                className={`flex-1 text-center font-medium py-4 rounded-xl text-base transition-colors ${
                  selectedSlot
                    ? 'bg-[#EA1D2C] hover:bg-[#C8101E] text-white cursor-pointer'
                    : 'bg-[#EA1D2C]/30 text-white/70 cursor-not-allowed'
                }`}
              >
                {selectedSlot ? 'Confirmar agendamento' : 'Selecione um horário'}
              </button>
            )}
            <Link
              to="/checkout?plano=consultoria-6"
              className="flex-1 block text-center border border-[#EA1D2C] text-[#EA1D2C] hover:bg-[#EA1D2C] hover:text-white font-medium py-4 rounded-xl text-base transition-colors"
            >
              Contratar consultoria
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
