import { useState, useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Plus, Video, Trash2, Calendar, X, Clock } from 'lucide-react'
import { mockSessions } from '../../data/dashboardMock'
import { typeLabels, statusColors } from '../../data/dashboardMock'

interface PersonalEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  time: string
  duration: number
  meetLink: string
  notes: string
}

const STORAGE_KEY = 'granular-mentor-events'

function loadEvents(): PersonalEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveEvents(events: PersonalEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function generateMeetLink() {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  const seg = () => Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `https://meet.google.com/${seg()}-${seg()}${seg().slice(0,1)}-${seg()}`
}

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function parseMockSessionDate(dateStr: string): string | null {
  const match = dateStr.match(/(\d{2})\/(\d{2})/)
  if (!match) return null
  const day = match[1]
  const month = match[2]
  const now = new Date()
  let year = now.getFullYear()
  const m = parseInt(month, 10) - 1
  if (m < now.getMonth()) year++
  return `${year}-${month}-${day}`
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function MinhaAgendaView() {
  const [events, setEvents] = useState<PersonalEvent[]>(loadEvents)
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', time: '09:00', duration: 60, notes: '' })

  // Map sessions to date keys
  const sessionsByDate = useMemo(() => {
    const map = new Map<string, typeof mockSessions>()
    for (const s of mockSessions) {
      const key = parseMockSessionDate(s.date)
      if (!key) continue
      const list = map.get(key) || []
      list.push(s)
      map.set(key, list)
    }
    return map
  }, [])

  // Map personal events to date keys
  const eventsByDate = useMemo(() => {
    const map = new Map<string, PersonalEvent[]>()
    for (const ev of events) {
      const list = map.get(ev.date) || []
      list.push(ev)
      map.set(ev.date, list)
    }
    return map
  }, [events])

  // All sessions sorted by date for the left panel
  const allSessionsSorted = useMemo(() => {
    return mockSessions.map((s) => ({
      ...s,
      dateKey: parseMockSessionDate(s.date),
    })).sort((a, b) => (a.dateKey || '').localeCompare(b.dateKey || ''))
  }, [])

  // Filtered sessions: show selected date or all
  const displaySessions = useMemo(() => {
    if (!selectedDate) return allSessionsSorted
    return allSessionsSorted.filter((s) => s.dateKey === selectedDate)
  }, [selectedDate, allSessionsSorted])

  const displayEvents = useMemo(() => {
    if (!selectedDate) return events
    return events.filter((ev) => ev.date === selectedDate)
  }, [selectedDate, events])

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewMonth.year, viewMonth.month, 1)
    const lastDay = new Date(viewMonth.year, viewMonth.month + 1, 0)
    const startPad = firstDay.getDay()
    const days: (number | null)[] = []
    for (let i = 0; i < startPad; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
    return days
  }, [viewMonth])

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

  const today = new Date()
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate())

  const selectedDateFormatted = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
    : ''

  const addEvent = useCallback(() => {
    if (!selectedDate || !formData.title.trim()) return
    const newEvent: PersonalEvent = {
      id: `ev-${Date.now()}`,
      title: formData.title,
      date: selectedDate,
      time: formData.time,
      duration: formData.duration,
      meetLink: generateMeetLink(),
      notes: formData.notes,
    }
    const updated = [...events, newEvent]
    setEvents(updated)
    saveEvents(updated)
    setFormData({ title: '', time: '09:00', duration: 60, notes: '' })
    setShowForm(false)
  }, [selectedDate, formData, events])

  const removeEvent = useCallback((id: string) => {
    const updated = events.filter((e) => e.id !== id)
    setEvents(updated)
    saveEvents(updated)
  }, [events])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0E0E0F]">Minha Agenda</h2>
        <div className="flex items-center gap-3 text-xs text-[#9C958A]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#A31631]" /> Sessões</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Pessoal</span>
          {selectedDate && (
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="text-[#A31631] font-medium hover:underline cursor-pointer"
            >
              Ver todos
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* LEFT: Parceiros / sessões */}
        <div className="space-y-4">
          {selectedDate && (
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#0E0E0F] capitalize">{selectedDateFormatted}</h3>
              <button
                type="button"
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#A31631] hover:bg-[#A31631]/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {showForm ? <X size={12} /> : <Plus size={12} />}
                {showForm ? 'Cancelar' : 'Novo evento'}
              </button>
            </div>
          )}

          {/* New event form */}
          {showForm && selectedDate && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-3">
              <input
                type="text"
                placeholder="Titulo do evento"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-sm border border-[#9C958A]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#A31631]/40"
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="flex-1 text-sm border border-[#9C958A]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#A31631]/40"
                />
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="flex-1 text-sm border border-[#9C958A]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#A31631]/40"
                >
                  <option value={30}>30 min</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1h30</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>
              <textarea
                placeholder="Notas (opcional)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full text-sm border border-[#9C958A]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#A31631]/40 resize-none"
              />
              <div className="flex items-center gap-2 text-[10px] text-blue-600">
                <Video size={12} />
                Link do Google Meet gerado automaticamente
              </div>
              <button
                type="button"
                onClick={addEvent}
                disabled={!formData.title.trim()}
                className="w-full text-sm font-medium bg-[#A31631] text-white py-2 rounded-lg hover:bg-[#8B1229] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Salvar evento
              </button>
            </div>
          )}

          {/* Session cards */}
          {displaySessions.length > 0 && (
            <div className="space-y-3">
              {!selectedDate && (
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} className="text-[#A31631]" />
                  <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Todas as sessões</h4>
                </div>
              )}
              {displaySessions.map((s) => {
                const status = statusColors[s.status]
                return (
                  <div key={s.id} className="rounded-2xl border border-[#9C958A]/20 bg-white p-4 hover:border-[#A31631]/20 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#A31631]">{getInitials(s.client.businessName)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-semibold text-[#0E0E0F] truncate">{s.client.businessName}</h3>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot}`} />
                        </div>
                        <p className="text-xs text-[#9C958A]">{s.client.name} — {s.client.businessType}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#0E0E0F] bg-[#F7F7F7] px-2.5 py-1 rounded-lg">
                            <Clock size={12} className="text-[#A31631]" /> {s.date} {s.time} ({s.duration} min)
                          </span>
                          <span className="text-[10px] font-medium bg-[#A31631]/10 text-[#A31631] px-2 py-0.5 rounded-full">
                            {typeLabels[s.type]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <a
                            href={s.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <Video size={11} />
                            Google Meet
                          </a>
                          <p className="text-xs text-[#9C958A] truncate">{s.briefing.objective}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Personal events */}
          {displayEvents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-blue-500" />
                <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Eventos Pessoais</h4>
              </div>
              {displayEvents.map((ev) => (
                <div key={ev.id} className="rounded-2xl border border-blue-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#0E0E0F]">{ev.title}</span>
                    <button
                      type="button"
                      onClick={() => removeEvent(ev.id)}
                      className="text-[#9C958A] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-[#9C958A] mb-2">{ev.date} - {ev.time} - {ev.duration} min</p>
                  {ev.notes && <p className="text-xs text-[#9C958A] mb-2">{ev.notes}</p>}
                  <a
                    href={ev.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Video size={11} />
                    Link do Google Meet
                  </a>
                </div>
              ))}
            </div>
          )}

          {displaySessions.length === 0 && displayEvents.length === 0 && !showForm && (
            <div className="rounded-xl border border-dashed border-[#9C958A]/20 p-8 text-center">
              <Calendar size={28} className="mx-auto text-[#9C958A]/30 mb-2" />
              <p className="text-sm text-[#9C958A]">
                {selectedDate ? 'Nenhum evento neste dia' : 'Selecione um dia no calendário'}
              </p>
              {selectedDate && (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-2 text-xs font-medium text-[#A31631] hover:underline cursor-pointer"
                >
                  Adicionar evento
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Mini Calendar */}
        <div className="lg:sticky lg:top-24 space-y-4 self-start">
          <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-4">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setViewMonth((prev) => prev.month === 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: prev.month - 1 })}
                className="p-1.5 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <h3 className="text-xs font-semibold text-[#0E0E0F] capitalize">{monthLabel}</h3>
              <button
                type="button"
                onClick={() => setViewMonth((prev) => prev.month === 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: prev.month + 1 })}
                className="p-1.5 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] transition-colors cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {WEEKDAYS.map((wd, i) => (
                <div key={i} className="text-center text-[9px] font-medium text-[#9C958A] py-0.5">{wd}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarDays.map((day, i) => {
                if (day === null) return <div key={`pad-${i}`} />
                const dateKey = formatDateKey(viewMonth.year, viewMonth.month, day)
                const hasSessions = sessionsByDate.has(dateKey)
                const hasEvents = eventsByDate.has(dateKey)
                const isToday = dateKey === todayKey
                const isSelected = dateKey === selectedDate

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                    className={`relative w-8 h-8 mx-auto flex flex-col items-center justify-center rounded-lg text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#A31631] text-white font-bold shadow-sm'
                        : isToday
                          ? 'bg-[#A31631]/10 text-[#A31631] font-semibold ring-1 ring-[#A31631]/30'
                          : 'text-[#0E0E0F] hover:bg-[#F7F7F7]'
                    }`}
                  >
                    {day}
                    {(hasSessions || hasEvents) && (
                      <div className="flex gap-0.5 -mt-0.5">
                        {hasSessions && <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white/70' : 'bg-[#A31631]'}`} />}
                        {hasEvents && <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white/70' : 'bg-blue-500'}`} />}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick stats */}
          <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-4">
            <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider mb-3">
              Resumo
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-lg font-bold text-[#0E0E0F]">{mockSessions.length}</span>
                <p className="text-[10px] text-[#9C958A]">Sessões</p>
              </div>
              <div>
                <span className="text-lg font-bold text-[#0E0E0F]">{new Set(mockSessions.map((s) => s.client.id)).size}</span>
                <p className="text-[10px] text-[#9C958A]">Parceiros</p>
              </div>
              <div>
                <span className="text-lg font-bold text-[#0E0E0F]">{events.length}</span>
                <p className="text-[10px] text-[#9C958A]">Eventos</p>
              </div>
              <div>
                <span className="text-lg font-bold text-[#0E0E0F]">{mockSessions.reduce((sum, s) => sum + s.duration, 0) / 60}h</span>
                <p className="text-[10px] text-[#9C958A]">Total horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
