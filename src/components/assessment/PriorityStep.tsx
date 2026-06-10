import { ChevronUp, ChevronDown, ChevronRight } from 'lucide-react'
import { FadeIn } from '../FadeIn'
import { priorityExercise } from '../../data/assessmentQuestions'

interface Props {
  priorityOrder: string[]
  onMove: (index: number, direction: 'up' | 'down') => void
  onFinish: () => void
}

export function PriorityStep({ priorityOrder, onMove, onFinish }: Props) {
  return (
    <FadeIn>
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-2">
          Priorize as ações
        </h2>
        <p className="text-sm text-[#9C958A]">
          Ordene do mais urgente ao menos urgente. Use as setas para reposicionar.
        </p>
      </div>

      <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-5 sm:p-6 mb-6">
        <p className="text-sm sm:text-base text-[#0E0E0F] leading-relaxed font-medium">
          {priorityExercise.situation}
        </p>
      </div>

      <div className="space-y-2">
        {priorityOrder.map((itemId, idx) => {
          const item = priorityExercise.items.find((it) => it.id === itemId)!
          return (
            <div
              key={itemId}
              className="flex items-center gap-3 rounded-xl border border-[#0E0E0F]/10 bg-white p-4 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-[#A31631]/10 flex items-center justify-center text-xs font-bold text-[#A31631] flex-shrink-0">
                {idx + 1}
              </span>
              <p className="text-sm text-[#0E0E0F] leading-relaxed flex-1">{item.text}</p>
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 rounded-md hover:bg-[#F7F7F7] text-[#9C958A] disabled:opacity-20 cursor-pointer transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onMove(idx, 'down')}
                  disabled={idx === priorityOrder.length - 1}
                  className="p-1 rounded-md hover:bg-[#F7F7F7] text-[#9C958A] disabled:opacity-20 cursor-pointer transition-colors"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onFinish}
        className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-4 rounded-xl text-base transition-colors cursor-pointer mt-8"
      >
        Ver meu resultado <ChevronRight size={18} />
      </button>
    </FadeIn>
  )
}
