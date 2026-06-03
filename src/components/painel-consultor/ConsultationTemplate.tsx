import { Search, BarChart3, Target, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react'
import { consultationTemplate } from '../../data/dashboardMock'

const phaseIcons = [Search, BarChart3, Target, ArrowRight]
const phaseColors = ['text-[#EA1D2C]', 'text-[#0E0E0F]', 'text-[#0E0E0F]', 'text-green-600']
const phaseBgColors = ['bg-[#EA1D2C]/10', 'bg-[#0E0E0F]/5', 'bg-[#0E0E0F]/5', 'bg-green-50']

export function ConsultationTemplate() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Modelo de consultoria</h2>
        <p className="text-sm text-[#9C958A]">Fluxo estruturado para conduzir cada sessão com eficiência e consistência.</p>
      </div>

      <div className="space-y-0">
        {consultationTemplate.map((phase, i) => {
          const Icon = phaseIcons[i]
          return (
            <div key={phase.id} className="flex gap-4">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${phaseBgColors[i]}`}>
                  <Icon size={18} className={phaseColors[i]} />
                </div>
                {i < consultationTemplate.length - 1 && (
                  <div className="w-px flex-1 bg-[#9C958A]/20 my-1 min-h-[20px]" />
                )}
              </div>

              {/* Conteúdo */}
              <div className="pb-8 flex-1">
                <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-sm font-bold text-[#0E0E0F]">{phase.name}</h3>
                    <span className="text-[10px] font-medium bg-[#F7F7F7] text-[#9C958A] px-2 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {phase.duration}
                    </span>
                  </div>

                  <p className="text-xs text-[#9C958A] leading-relaxed mb-4">{phase.description}</p>

                  {/* Checklist */}
                  <div className="space-y-2 mb-4">
                    {phase.checklist.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-[#0E0E0F]">
                        <CheckCircle2 size={14} className="mt-0.5 text-[#9C958A]/40 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Dicas */}
                  {phase.tips.map((tip) => (
                    <div key={tip} className="flex items-start gap-2 rounded-lg bg-[#EA1D2C]/5 px-3 py-2">
                      <Lightbulb size={14} className="mt-0.5 text-[#EA1D2C] flex-shrink-0" />
                      <p className="text-[11px] text-[#9C958A] leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
