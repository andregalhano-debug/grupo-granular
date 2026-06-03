import { mockSessions } from '../../data/dashboardMock'
import { SessionCard } from './SessionCard'

export function AgendaView() {
  const todayDate = mockSessions[0].date
  const todaySessions = mockSessions.filter((s) => s.date === todayDate)
  const upcomingSessions = mockSessions.filter((s) => s.date !== todayDate)

  return (
    <div className="space-y-8">
      {/* Hoje */}
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-4">Hoje — {todayDate}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {todaySessions.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
        {todaySessions.length === 0 && (
          <p className="text-sm text-[#9C958A]">Nenhuma sessão agendada para hoje.</p>
        )}
      </div>

      {/* Próximas */}
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-4">Próximas sessões</h2>
        <div className="space-y-3">
          {upcomingSessions.map((s) => (
            <div key={s.id}>
              <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-2 capitalize" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {s.date}
              </p>
              <SessionCard session={s} />
            </div>
          ))}
        </div>
      </div>

      {/* Resumo semanal */}
      <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-6">
        <h3 className="text-sm font-semibold text-[#0E0E0F] mb-4">Resumo da semana</h3>
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
