import { mockSessions } from '../../data/dashboardMock'
import { PreparationCard } from './PreparationCard'

export function PreparationView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Preparação rápida</h2>
        <p className="text-sm text-[#9C958A]">Dados-chave, ações pendentes e tópicos sugeridos para cada sessão.</p>
      </div>

      <div className="space-y-4">
        {mockSessions.map((s, i) => (
          <PreparationCard key={s.id} session={s} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  )
}
