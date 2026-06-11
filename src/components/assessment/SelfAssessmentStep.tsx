import { ChevronRight } from 'lucide-react'
import { Settings, TrendingUp, Megaphone, UtensilsCrossed, ShoppingBag, Users } from 'lucide-react'
import { FadeIn } from '../FadeIn'
import type { ConsultantCategory } from '../../data/consultants'
import type { SelfScores } from '../../hooks/useAssessment'
import { categoryLabels } from '../../data/assessmentQuestions'

const icons: Record<ConsultantCategory, typeof Settings> = {
  operacao: Settings,
  financeiro: TrendingUp,
  marketing: Megaphone,
  cardapio: UtensilsCrossed,
  marketplaces: ShoppingBag,
  rh: Users,
  estoque: Settings,
  precificacao: TrendingUp,
  atendimento: Users,
  tecnologia: Settings,
  franquias: Settings,
  mercado: ShoppingBag,
  farmacia: Settings,
  petshop: Users,
  outros: Settings,
}

const categories: ConsultantCategory[] = ['operacao', 'financeiro', 'marketing', 'cardapio', 'marketplaces', 'rh']

const levelLabels = ['', 'Básico', 'Intermediário', 'Bom', 'Avançado', 'Expert']

interface Props {
  selfScores: SelfScores
  onUpdate: (cat: ConsultantCategory, score: number) => void
  onNext: () => void
}

export function SelfAssessmentStep({ selfScores, onUpdate, onNext }: Props) {
  return (
    <FadeIn>
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-2">
          Como você se avalia em cada área?
        </h2>
        <p className="text-sm text-[#9C958A]">
          Seja honesto — na próxima etapa validamos com cenários reais.
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => {
          const Icon = icons[cat]
          const score = selfScores[cat]
          return (
            <FadeIn key={cat} delay={idx * 60}>
              <div className="rounded-xl border border-[#0E0E0F]/10 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#A31631]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#A31631]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0E0E0F]">{categoryLabels[cat]}</p>
                  </div>
                  <span className="text-xs font-medium text-[#A31631] bg-[#A31631]/10 px-2 py-0.5 rounded-full">
                    {levelLabels[score]}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onUpdate(cat, val)}
                      className={`flex-1 h-10 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        val <= score
                          ? 'bg-[#A31631] text-white shadow-sm'
                          : 'bg-[#F7F7F7] text-[#9C958A] hover:bg-[#0E0E0F]/5'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-4 rounded-xl text-base transition-colors cursor-pointer mt-8"
      >
        Próximo: Cenários reais <ChevronRight size={18} />
      </button>
    </FadeIn>
  )
}
