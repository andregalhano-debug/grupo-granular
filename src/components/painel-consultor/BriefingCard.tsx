import { useState } from 'react'
import { ChevronDown, Bot, TrendingUp, TrendingDown, Minus, Target, AlertTriangle, Lightbulb } from 'lucide-react'
import type { ConsultingSession } from '../../data/dashboardMock'
import { typeLabels } from '../../data/dashboardMock'

interface BriefingCardProps {
  session: ConsultingSession
  defaultOpen?: boolean
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
}

export function BriefingCard({ session, defaultOpen = false }: BriefingCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const b = session.briefing
  const c = session.client

  return (
    <div className="rounded-2xl border border-[#9C958A]/20 bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-[#F7F7F7]/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#A31631]">{c.businessName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0E0E0F]">{c.businessName}</h3>
            <p className="text-xs text-[#9C958A]">{session.date} às {session.time} — {typeLabels[session.type]}</p>
          </div>
        </div>
        <ChevronDown size={18} className={`text-[#9C958A] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Conteúdo expandível */}
      {open && (
        <div className="px-5 pb-5 border-t border-[#0E0E0F]/5 pt-5 divide-y divide-[#0E0E0F]/5">
          {/* Objetivo */}
          <div className="flex items-start gap-3 pb-5">
            <Target size={18} className="text-[#A31631] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider mb-1.5">Objetivo</h4>
              <p className="text-sm font-medium text-[#0E0E0F]">{b.objective}</p>
            </div>
          </div>

          {/* Métricas */}
          <div className="py-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-[#A31631] flex-shrink-0" />
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Métrica Chave</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {b.keyMetrics.map((m) => {
                const TrendIcon = m.trend ? trendIcons[m.trend] : Minus
                const trendColor = m.trend === 'up' ? 'text-amber-500' : m.trend === 'down' ? 'text-green-500' : 'text-[#9C958A]'
                return (
                  <div key={m.label} className="flex items-center justify-between bg-[#F7F7F7] rounded-lg px-3 py-2">
                    <span className="text-xs text-[#9C958A]">{m.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#0E0E0F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</span>
                      <TrendIcon size={12} className={trendColor} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Insights do Chatbot */}
          <div className="py-5">
            <div className="flex items-center gap-2 mb-3">
              <Bot size={18} className="text-[#A31631] flex-shrink-0" />
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Insights da IA</h4>
            </div>
            <div className="border-l-2 border-[#A31631]/30 pl-3 space-y-2">
              {b.chatbotInsights.map((insight, i) => (
                <p key={i} className="text-xs text-[#9C958A] leading-relaxed">{insight}</p>
              ))}
            </div>
          </div>

          {/* Dores */}
          <div className="py-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-[#A31631] flex-shrink-0" />
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Dores Principais</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.painPoints.map((p) => (
                <span key={p} className="text-xs bg-[#A31631]/10 text-[#A31631] px-2.5 py-1 rounded-full">{p}</span>
              ))}
            </div>
          </div>

          {/* Abordagem */}
          <div className="pt-5">
            <div className="rounded-xl bg-[#A31631]/5 border border-[#A31631]/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={18} className="text-[#A31631] flex-shrink-0" />
                <h4 className="text-xs font-bold text-[#A31631] uppercase tracking-wider">Abordagem Recomendada</h4>
              </div>
              <p className="text-xs text-[#0E0E0F] leading-relaxed">{b.recommendedApproach}</p>
            </div>
          </div>

          {/* Perfil do cliente */}
          <div className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-[18px] h-[18px] rounded-full bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-[#A31631]">{c.businessName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
              </div>
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Perfil</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-[#9C958A]">Tipo</span><span className="text-[#0E0E0F]">{c.businessType}</span></div>
              <div className="flex justify-between"><span className="text-[#9C958A]">Operação</span><span className="text-[#0E0E0F]">{c.operationType}</span></div>
              <div className="flex justify-between"><span className="text-[#9C958A]">Faturamento</span><span className="text-[#0E0E0F]">{c.monthlyRevenue}</span></div>
              <div className="flex justify-between"><span className="text-[#9C958A]">Equipe</span><span className="text-[#0E0E0F]">{c.employeeCount} pessoas</span></div>
              <div className="flex justify-between"><span className="text-[#9C958A]">Plataformas</span><span className="text-[#0E0E0F]">{c.mainPlatforms.join(', ')}</span></div>
              <div className="flex justify-between"><span className="text-[#9C958A]">Cidade</span><span className="text-[#0E0E0F]">{c.city}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
