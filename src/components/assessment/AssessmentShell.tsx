import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GranularLogo } from '../GranularLogo'
import type { AssessmentStep } from '../../hooks/useAssessment'

const stepLabels: Record<AssessmentStep, string> = {
  contact: 'Dados',
  'self-assessment': 'Auto-avaliação',
  scenarios: 'Cenários',
  priority: 'Priorização',
  result: 'Resultado',
}

interface Props {
  step: AssessmentStep
  progressPercent: number
  children: React.ReactNode
}

export function AssessmentShell({ step, progressPercent, children }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#0E0E0F]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <GranularLogo size={32} color="#0E0E0F" />
            <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Granular
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>
      </header>

      {/* Progress bar */}
      {step !== 'result' && (
        <div className="border-b border-[#0E0E0F]/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                {(Object.keys(stepLabels) as AssessmentStep[]).filter((s) => s !== 'result').map((s, i) => (
                  <span
                    key={s}
                    className={`text-[10px] font-medium uppercase tracking-wider hidden sm:block ${
                      s === step ? 'text-[#A31631]' : 'text-[#9C958A]/50'
                    }`}
                  >
                    {i + 1}. {stepLabels[s]}
                  </span>
                ))}
                <span className="text-[10px] font-medium text-[#A31631] uppercase tracking-wider sm:hidden">
                  {stepLabels[step]}
                </span>
              </div>
              <span className="text-xs font-bold text-[#0E0E0F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0E0E0F]/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#A31631] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-xl w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
