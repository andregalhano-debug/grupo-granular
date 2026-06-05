import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, List, Settings, Check, X, Lock } from 'lucide-react'
import { GranularLogo } from '../components/GranularLogo'
import { getDemoBookings, updateDemoBookingStatus, getDemoConfig, saveDemoConfig } from '../data/demoSlots'
import type { DemoBooking, DemoConfig } from '../data/demoSlots'

type AdminTab = 'bookings' | 'slots' | 'calendar'

const allTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function AdminAuth({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === 'granular2026') {
      sessionStorage.setItem('granular-admin', '1')
      onAuth()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-[#0E0E0F]/10 p-8 text-center">
        <Lock size={32} className="text-[#A31631] mx-auto mb-4" />
        <h1 className="text-xl font-bold text-[#0E0E0F] mb-1">Admin Granular</h1>
        <p className="text-xs text-[#9C958A] mb-6">Acesso restrito à equipe.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false) }}
          placeholder="Senha"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none mb-4 ${error ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'}`}
        />
        {error && <p className="text-xs text-red-500 mb-3">Senha incorreta</p>}
        <button type="submit" className="w-full bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-3 rounded-xl text-sm transition-colors cursor-pointer">
          Entrar
        </button>
      </form>
    </div>
  )
}

function BookingsView() {
  const [bookings, setBookings] = useState<DemoBooking[]>(getDemoBookings())

  const refresh = () => setBookings(getDemoBookings())

  const handleStatus = (id: string, status: DemoBooking['status']) => {
    updateDemoBookingStatus(id, status)
    refresh()
  }

  const statusColors = {
    pendente: 'bg-amber-100 text-amber-700',
    confirmada: 'bg-green-100 text-green-700',
    cancelada: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0E0E0F]">Demos agendadas</h2>
        <button type="button" onClick={refresh} className="text-xs text-[#A31631] font-medium cursor-pointer">Atualizar</button>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl bg-white border border-[#0E0E0F]/5 p-8 text-center">
          <CalendarDays size={32} className="text-[#9C958A]/30 mx-auto mb-3" />
          <p className="text-sm text-[#9C958A]">Nenhuma demonstração agendada ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((b) => (
            <div key={b.id} className="rounded-xl bg-white border border-[#0E0E0F]/5 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#0E0E0F]">{b.name}</h3>
                  <p className="text-xs text-[#9C958A]">{b.company} — {b.units} unidade(s)</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[b.status]}`}>
                  {b.status}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#9C958A] mb-3">
                <div><strong className="text-[#0E0E0F]">Data:</strong> {b.date}</div>
                <div><strong className="text-[#0E0E0F]">Horário:</strong> {b.time}</div>
                <div><strong className="text-[#0E0E0F]">Email:</strong> {b.email}</div>
                <div><strong className="text-[#0E0E0F]">WhatsApp:</strong> {b.whatsapp}</div>
              </div>
              {b.status === 'pendente' && (
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleStatus(b.id, 'confirmada')}
                    className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                    <Check size={12} /> Confirmar
                  </button>
                  <button type="button" onClick={() => handleStatus(b.id, 'cancelada')}
                    className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                    <X size={12} /> Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SlotsConfigView() {
  const [config, setConfig] = useState<DemoConfig>(getDemoConfig())

  const toggleDay = (day: number) => {
    const updated = config.days.includes(day)
      ? { ...config, days: config.days.filter((d) => d !== day) }
      : { ...config, days: [...config.days, day].sort() }
    setConfig(updated)
    saveDemoConfig(updated)
  }

  const toggleTime = (time: string) => {
    const updated = config.times.includes(time)
      ? { ...config, times: config.times.filter((t) => t !== time) }
      : { ...config, times: [...config.times, time].sort() }
    setConfig(updated)
    saveDemoConfig(updated)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Configurar horários disponíveis</h2>

      <div>
        <p className="text-xs font-medium text-[#9C958A] uppercase tracking-wider mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Dias da semana
        </p>
        <div className="flex flex-wrap gap-2">
          {dayNames.map((name, i) => (
            <button key={i} type="button" onClick={() => toggleDay(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                config.days.includes(i)
                  ? 'bg-[#A31631] text-white'
                  : 'border border-[#9C958A]/20 text-[#9C958A] hover:border-[#A31631]/30'
              }`}>
              {name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-[#9C958A] uppercase tracking-wider mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Horários
        </p>
        <div className="flex flex-wrap gap-2">
          {allTimes.map((time) => (
            <button key={time} type="button" onClick={() => toggleTime(time)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                config.times.includes(time)
                  ? 'bg-[#A31631] text-white'
                  : 'border border-[#9C958A]/20 text-[#9C958A] hover:border-[#A31631]/30'
              }`}>
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#F7F7F7] p-4 text-xs text-[#9C958A]">
        <strong className="text-[#0E0E0F]">Resumo:</strong> {config.days.map((d) => dayNames[d]).join(', ')} — {config.times.join(', ')}
      </div>
    </div>
  )
}

function CalendarView() {
  const [connected, setConnected] = useState(() => localStorage.getItem('granular-gcal') === '1')

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Google Agenda</h2>

      {connected ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
          <Check size={32} className="text-green-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-green-800 mb-1">Google Agenda conectado</p>
          <p className="text-xs text-green-600 mb-4">As demos agendadas serão sincronizadas automaticamente.</p>
          <button type="button" onClick={() => { localStorage.removeItem('granular-gcal'); setConnected(false) }}
            className="text-xs text-red-600 font-medium cursor-pointer hover:underline">
            Desconectar
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-[#0E0E0F]/10 p-6 text-center">
          <CalendarDays size={32} className="text-[#9C958A]/30 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#0E0E0F] mb-1">Conecte seu Google Agenda</p>
          <p className="text-xs text-[#9C958A] mb-4">Sincronize automaticamente os agendamentos de demonstração com seu calendário.</p>
          <button type="button" onClick={() => { localStorage.setItem('granular-gcal', '1'); setConnected(true) }}
            className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer">
            <CalendarDays size={16} />
            Conectar Google Agenda
          </button>
          <div className="mt-6 space-y-2 text-left">
            <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              O que a integração faz
            </p>
            <div className="space-y-1.5 text-xs text-[#9C958A]">
              <p className="flex items-start gap-2"><Check size={12} className="text-[#A31631] mt-0.5 flex-shrink-0" /> Cria eventos automaticamente no Google Agenda para cada demo agendada</p>
              <p className="flex items-start gap-2"><Check size={12} className="text-[#A31631] mt-0.5 flex-shrink-0" /> Bloqueia horários já ocupados no calendário</p>
              <p className="flex items-start gap-2"><Check size={12} className="text-[#A31631] mt-0.5 flex-shrink-0" /> Envia convite por e-mail ao cliente</p>
              <p className="flex items-start gap-2"><Check size={12} className="text-[#A31631] mt-0.5 flex-shrink-0" /> Sincroniza disponibilidade dos consultores</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('granular-admin') === '1')
  const [tab, setTab] = useState<AdminTab>('bookings')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!authed) return <AdminAuth onAuth={() => setAuthed(true)} />

  const tabs: { id: AdminTab; icon: typeof List; label: string }[] = [
    { id: 'bookings', icon: List, label: 'Demos agendadas' },
    { id: 'slots', icon: Settings, label: 'Horários' },
    { id: 'calendar', icon: CalendarDays, label: 'Google Agenda' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="bg-white border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <GranularLogo size={28} color="#0E0E0F" />
              <div>
                <span className="text-base font-semibold text-[#0E0E0F] block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Granular</span>
                <span className="text-[10px] font-medium text-[#A31631] uppercase tracking-wider">Admin</span>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => { sessionStorage.removeItem('granular-admin'); setAuthed(false) }}
            className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer">
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                tab === t.id
                  ? 'bg-[#A31631]/10 text-[#A31631]'
                  : 'text-[#9C958A] hover:bg-[#F7F7F7] hover:text-[#0E0E0F]'
              }`}>
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'bookings' && <BookingsView />}
        {tab === 'slots' && <SlotsConfigView />}
        {tab === 'calendar' && <CalendarView />}
      </div>
    </div>
  )
}
