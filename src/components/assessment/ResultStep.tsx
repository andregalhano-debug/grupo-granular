import { Award, Target, Users, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from '../FadeIn'
import type { AssessmentResult, ContactData } from '../../hooks/useAssessment'
import { categoryLabels, tierLabels, tierColors, type Tier } from '../../data/assessmentQuestions'
import type { ConsultantCategory } from '../../data/consultants'

interface Props {
  result: AssessmentResult
  contact: ContactData
  onReset: () => void
}

const categoryColors: Record<ConsultantCategory, string> = {
  operacao: '#6366f1',
  financeiro: '#22c55e',
  marketing: '#f59e0b',
  cardapio: '#ef4444',
  ifood: '#ec4899',
  rh: '#06b6d4',
}

function RadarChart({ specialties }: { specialties: AssessmentResult['specialties'] }) {
  const size = 240
  const cx = size / 2
  const cy = size / 2
  const r = 90
  const levels = [25, 50, 75, 100]

  const angleStep = (Math.PI * 2) / 6
  const startAngle = -Math.PI / 2

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + angleStep * index
    const dist = (value / 100) * r
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) }
  }

  const dataPoints = specialties.map((s, i) => getPoint(i, s.finalScore))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* Grid levels */}
      {levels.map((level) => {
        const points = Array.from({ length: 6 }, (_, i) => getPoint(i, level))
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return <path key={level} d={path} fill="none" stroke="#0E0E0F" strokeOpacity={0.07} strokeWidth={1} />
      })}

      {/* Axis lines */}
      {specialties.map((_, i) => {
        const p = getPoint(i, 100)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#0E0E0F" strokeOpacity={0.07} strokeWidth={1} />
      })}

      {/* Data polygon */}
      <path d={dataPath} fill="#A31631" fillOpacity={0.15} stroke="#A31631" strokeWidth={2} />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#A31631" />
      ))}

      {/* Labels */}
      {specialties.map((s, i) => {
        const p = getPoint(i, 120)
        return (
          <text
            key={s.category}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[9px] font-semibold fill-[#0E0E0F]"
          >
            {categoryLabels[s.category]}
          </text>
        )
      })}
    </svg>
  )
}

function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${tierColors[tier]}`}>
      {tierLabels[tier]}
    </span>
  )
}

export function ResultStep({ result, contact, onReset }: Props) {
  const sortedSpecialties = [...result.specialties].sort((a, b) => b.finalScore - a.finalScore)

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#A31631]/10 flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-[#A31631]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-2">
            {contact.nome.split(' ')[0]}, seu perfil é:
          </h2>
          <p className="text-xl font-bold text-[#A31631] mb-2">{result.profile.label}</p>
          <p className="text-sm text-[#9C958A] max-w-md mx-auto">{result.profile.description}</p>
        </div>
      </FadeIn>

      {/* Radar Chart */}
      <FadeIn delay={100}>
        <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-6">
          <RadarChart specialties={result.specialties} />
        </div>
      </FadeIn>

      {/* Scores por especialidade */}
      <FadeIn delay={200}>
        <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Score por Área</h3>
          </div>
          <div className="space-y-3">
            {sortedSpecialties.map((s) => (
              <div key={s.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#0E0E0F]">{categoryLabels[s.category]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0E0E0F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {s.finalScore}
                    </span>
                    <TierBadge tier={s.tier} />
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#0E0E0F]/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${s.finalScore}%`, backgroundColor: categoryColors[s.category] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Matches recomendados */}
      <FadeIn delay={300}>
        <div className="rounded-2xl border border-[#A31631]/15 bg-[#A31631]/[0.03] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Parceiros Ideais</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.profile.matchClients.map((match) => (
              <span key={match} className="text-xs bg-white border border-[#A31631]/15 text-[#0E0E0F] px-3 py-1.5 rounded-full">
                {match}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* CTAs */}
      <FadeIn delay={400}>
        <div className="space-y-3">
          <Link
            to="/consultores"
            className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-4 rounded-xl text-base transition-colors"
          >
            Ver consultores Granular
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 border border-[#0E0E0F]/15 text-[#0E0E0F] hover:bg-[#F7F7F7] font-medium py-3 rounded-xl text-sm transition-colors"
          >
            Voltar ao site
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer py-2"
          >
            <RotateCcw size={14} /> Refazer avaliação
          </button>
        </div>
      </FadeIn>
    </div>
  )
}
