import { useState } from 'react'
import { FadeIn } from '../FadeIn'
import type { Scenario } from '../../data/assessmentQuestions'
import { categoryLabels } from '../../data/assessmentQuestions'

interface Props {
  scenario: Scenario
  scenarioIndex: number
  totalScenarios: number
  onAnswer: (optionId: string, points: number) => void
}

export function ScenarioStep({ scenario, scenarioIndex, totalScenarios, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)

  const handleSelect = (optionId: string, points: number) => {
    if (selected || animating) return
    setSelected(optionId)
    setAnimating(true)
    setTimeout(() => {
      setSelected(null)
      setAnimating(false)
      onAnswer(optionId, points)
    }, 400)
  }

  return (
    <FadeIn key={scenario.id}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#A31631] uppercase tracking-wider bg-[#A31631]/10 px-2.5 py-1 rounded-full">
            {categoryLabels[scenario.category]}
          </span>
          <span className="text-xs text-[#9C958A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {scenarioIndex + 1}/{totalScenarios}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#0E0E0F]/10 overflow-hidden mb-6">
          <div
            className="h-full rounded-full bg-[#A31631] transition-all duration-500"
            style={{ width: `${((scenarioIndex + 1) / totalScenarios) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-5 sm:p-6 mb-6">
        <p className="text-sm sm:text-base text-[#0E0E0F] leading-relaxed font-medium">
          {scenario.situation}
        </p>
      </div>

      <p className="text-xs text-[#9C958A] mb-3 font-medium uppercase tracking-wider">O que você faria?</p>

      <div className="space-y-3">
        {scenario.options.map((opt, i) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id, opt.points)}
            disabled={animating}
            className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
              selected === opt.id
                ? 'border-[#A31631] bg-[#A31631]/5 shadow-sm scale-[0.98]'
                : 'border-[#0E0E0F]/10 bg-white hover:border-[#A31631]/30 hover:shadow-sm'
            } ${animating && selected !== opt.id ? 'opacity-40' : ''}`}
          >
            <div className="flex items-start gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                selected === opt.id ? 'bg-[#A31631] text-white' : 'bg-[#F7F7F7] text-[#9C958A]'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <p className="text-sm text-[#0E0E0F] leading-relaxed pt-0.5">{opt.text}</p>
            </div>
          </button>
        ))}
      </div>
    </FadeIn>
  )
}
