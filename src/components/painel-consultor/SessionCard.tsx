import { Clock } from 'lucide-react'
import type { ConsultingSession } from '../../data/dashboardMock'
import { typeLabels, statusColors } from '../../data/dashboardMock'

interface SessionCardProps {
  session: ConsultingSession
  onClick?: () => void
  compact?: boolean
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function SessionCard({ session, onClick, compact }: SessionCardProps) {
  const status = statusColors[session.status]

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-[#9C958A]/20 bg-white hover:border-[#A31631]/20 hover:shadow-lg hover:shadow-[#A31631]/5 transition-all ${onClick ? 'cursor-pointer' : ''} ${compact ? 'p-4' : 'p-5'}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-[#A31631]">{getInitials(session.client.businessName)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-[#0E0E0F] truncate">{session.client.businessName}</h3>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status.dot}`} />
          </div>
          <p className="text-xs text-[#9C958A]">{session.client.name} — {session.client.businessType}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-[#9C958A]">
              <Clock size={12} /> {session.time} ({session.duration} min)
            </span>
            <span className="text-[10px] font-medium bg-[#A31631]/10 text-[#A31631] px-2 py-0.5 rounded-full">
              {typeLabels[session.type]}
            </span>
          </div>
          {!compact && (
            <p className="text-xs text-[#9C958A] mt-2 line-clamp-2">{session.briefing.objective}</p>
          )}
        </div>
      </div>
    </div>
  )
}
