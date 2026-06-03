import { mockSessions } from '../../data/dashboardMock'
import { BriefingCard } from './BriefingCard'

export function BriefingView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Briefings dos clientes</h2>
        <p className="text-sm text-[#9C958A]">Resumo gerado pela IA com base nos dados do sistema e conversas dos parceiros.</p>
      </div>

      <div className="space-y-4">
        {mockSessions.map((s, i) => (
          <BriefingCard key={s.id} session={s} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  )
}
