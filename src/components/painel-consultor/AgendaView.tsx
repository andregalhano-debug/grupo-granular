import { CalendarDays, CalendarClock, BarChart3 } from 'lucide-react'
import { mockSessions } from '../../data/dashboardMock'
import { SessionCard } from './SessionCard'

export function AgendaView() {
  const todayDate = mockSessions[0].date
  const todaySessions = mockSessions.filter((s) => s.date === todayDate)
  const upcomingSessions = mockSessions.filter((s) => s.date !== todayDate)

  // Agrupar próximas sessões por data
  const upcomingByDate = upcomingSessions.reduce<Record<string, typeof upcomingSessions>>((acc, s) => {
    (acc[s.date] ||= []).push(s)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {/* Hoje */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <CalendarDays size={20} className="text-[#A31631]" />
          <h2 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Hoje — {todayDate}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {todaySessions.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
        {todaySessions.length === 0 && (
          <p className="text-sm text-[#9C958A]">Nenhuma sessão agendada para hoje.</p>
        )}
      </div>

      <div className="border-t border-[#0E0E0F]/5" />

      {/* Próximas */}
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <CalendarClock size={20} className="text-[#A31631]" />
          <h2 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Próximas Sessões</h2>
        </div>
        <div className="space-y-5">
          {Object.entries(upcomingByDate).map(([date, sessions]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#A31631] bg-[#A31631]/10 px-3 py-1 rounded-full">
                  {date}
                </span>
                <div className="flex-1 h-px bg-[#0E0E0F]/5" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {sessions.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#0E0E0F]/5" />

      {/* Resumo semanal */}
      <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <BarChart3 size={20} className="text-[#A31631]" />
          <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Resumo da Semana</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-2xl font-bold text-[#0E0E0F]">{mockSessions.length}</span>
            <p className="text-xs text-[#9C958A]">Sessões</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#0E0E0F]">{new Set(mockSessions.map((s) => s.client.id)).size}</span>
            <p className="text-xs text-[#9C958A]">Clientes</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#0E0E0F]">{mockSessions.reduce((sum, s) => sum + s.duration, 0) / 60}h</span>
            <p className="text-xs text-[#9C958A]">Total horas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
