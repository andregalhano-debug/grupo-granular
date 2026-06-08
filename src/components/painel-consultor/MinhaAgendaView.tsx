import { useState, useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Plus, Video, Trash2, Calendar, X } from 'lucide-react'
import { mockSessions } from '../../data/dashboardMock'
import { typeLabels } from '../../data/dashboardMock'

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

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

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

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewMonth.year, viewMonth.month, 1)
    const lastDay = new Date(viewMonth.year, viewMonth.month + 1, 0)
    const startPad = firstDay.getDay()
    const days: (number | null)[] = []
    for (let i = 0; i < startPad; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
    return days
  }, [viewMonth])

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  const today = new Date()
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate())

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

  const selectedSessions = selectedDate ? (sessionsByDate.get(selectedDate) || []) : []
  const selectedEvents = selectedDate ? (eventsByDate.get(selectedDate) || []) : []

  const selectedDateFormatted = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
    : ''

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0E0E0F]">Minha Agenda</h2>
        <div className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#A31631]" /> Sessões</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Pessoal</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Calendar */}
        <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => setViewMonth((prev) => prev.month === 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: prev.month - 1 })}
              className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <h3 className="text-base font-semibold text-[#0E0E0F] capitalize">{monthLabel}</h3>
            <button
              type="button"
              onClick={() => setViewMonth((prev) => prev.month === 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: prev.month + 1 })}
              className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="text-center text-[10px] font-medium text-[#9C958A] py-1">{wd}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
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
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#A31631] text-white font-bold shadow-md'
                      : isToday
                        ? 'bg-[#A31631]/10 text-[#A31631] font-semibold ring-1 ring-[#A31631]/30'
                        : 'text-[#0E0E0F] hover:bg-[#F7F7F7]'
                  }`}
                >
                  {day}
                  {(hasSessions || hasEvents) && (
                    <div className="flex gap-0.5 mt-0.5">
                      {hasSessions && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/70' : 'bg-[#A31631]'}`} />}
                      {hasEvents && <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/70' : 'bg-blue-500'}`} />}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sidebar: selected day details */}
        <div className="space-y-4">
          {selectedDate ? (
            <>
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

              {/* New event form */}
              {showForm && (
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

              {/* Sessions for this day */}
              {selectedSessions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Sessoes agendadas
                  </p>
                  {selectedSessions.map((s) => (
                    <div key={s.id} className="rounded-xl border border-[#A31631]/15 bg-white p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#0E0E0F]">{s.client.businessName}</span>
                        <span className="text-[10px] font-medium bg-[#A31631]/10 text-[#A31631] px-2 py-0.5 rounded-full">
                          {typeLabels[s.type]}
                        </span>
                      </div>
                      <p className="text-xs text-[#9C958A]">{s.time} - {s.duration} min - {s.client.name}</p>
                      <a
                        href={s.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        <Video size={11} />
                        Entrar no Google Meet
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Personal events for this day */}
              {selectedEvents.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Eventos pessoais
                  </p>
                  {selectedEvents.map((ev) => (
                    <div key={ev.id} className="rounded-xl border border-blue-200 bg-white p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#0E0E0F]">{ev.title}</span>
                        <button
                          type="button"
                          onClick={() => removeEvent(ev.id)}
                          className="text-[#9C958A] hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <p className="text-xs text-[#9C958A]">{ev.time} - {ev.duration} min</p>
                      {ev.notes && <p className="text-xs text-[#9C958A]">{ev.notes}</p>}
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

              {selectedSessions.length === 0 && selectedEvents.length === 0 && !showForm && (
                <div className="rounded-xl border border-dashed border-[#9C958A]/20 p-6 text-center">
                  <Calendar size={24} className="mx-auto text-[#9C958A]/40 mb-2" />
                  <p className="text-sm text-[#9C958A]">Nenhum evento neste dia</p>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="mt-2 text-xs font-medium text-[#A31631] hover:underline cursor-pointer"
                  >
                    Adicionar evento
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-[#9C958A]/20 p-6 text-center">
              <Calendar size={32} className="mx-auto text-[#9C958A]/30 mb-3" />
              <p className="text-sm text-[#9C958A]">Selecione um dia no calendario para ver detalhes e adicionar eventos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
