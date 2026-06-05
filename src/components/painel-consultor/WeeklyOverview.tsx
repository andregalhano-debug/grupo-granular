import { TrendingUp, Users, Clock, DollarSign, CalendarCheck, Star } from 'lucide-react'
import { mockSessions } from '../../data/dashboardMock'

const weekStats = {
  sessionsWeek: mockSessions.length,
  sessionsCompleted: 3,
  hoursWorked: 4.5,
  clientsActive: 5,
  rating: 4.9,
  // Financeiro
  revenueMonth: 11670,
  revenuePending: 7780,
  sessionsMonth: 8,
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })
}

export function WeeklyOverview() {
  return (
    <div className="space-y-4 mb-8">
      {/* KPIs rápidos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard
          icon={CalendarCheck}
          label="Sessões semana"
          value={`${weekStats.sessionsCompleted}/${weekStats.sessionsWeek}`}
          sub="concluídas"
        />
        <KpiCard
          icon={Clock}
          label="Horas trabalhadas"
          value={`${weekStats.hoursWorked}h`}
          sub="esta semana"
        />
        <KpiCard
          icon={Users}
          label="Clientes ativos"
          value={String(weekStats.clientsActive)}
          sub="em acompanhamento"
        />
        <KpiCard
          icon={Star}
          label="Avaliação"
          value={String(weekStats.rating)}
          sub="média geral"
          accent
        />
        <KpiCard
          icon={DollarSign}
          label="Faturado no mês"
          value={`R$ ${formatCurrency(weekStats.revenueMonth)}`}
          sub={`${weekStats.sessionsMonth} sessões`}
          highlight
        />
        <KpiCard
          icon={TrendingUp}
          label="A receber"
          value={`R$ ${formatCurrency(weekStats.revenuePending)}`}
          sub="próximo ciclo"
          highlight
        />
      </div>
    </div>
  )
}

function KpiCard({ icon: Icon, label, value, sub, highlight, accent }: {
  icon: typeof TrendingUp
  label: string
  value: string
  sub: string
  highlight?: boolean
  accent?: boolean
}) {
  return (
    <div className={`rounded-xl p-4 border ${
      highlight
        ? 'bg-[#A31631]/5 border-[#A31631]/15'
        : 'bg-white border-[#0E0E0F]/5'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={highlight ? 'text-[#A31631]' : accent ? 'text-amber-500' : 'text-[#9C958A]'} />
        <span className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {label}
        </span>
      </div>
      <p className={`text-lg font-bold ${highlight ? 'text-[#A31631]' : 'text-[#0E0E0F]'}`}>{value}</p>
      <p className="text-[10px] text-[#9C958A] mt-0.5">{sub}</p>
    </div>
  )
}
