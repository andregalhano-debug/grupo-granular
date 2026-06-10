import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardCheck, RotateCcw, Target, TrendingUp, BookOpen, Lightbulb,
  GraduationCap, Star, ArrowUpRight,
} from 'lucide-react'
import { FadeIn } from '../FadeIn'
import type { ConsultantCategory } from '../../data/consultants'
import {
  categoryLabels, tierLabels, tierColors,
  type Tier,
} from '../../data/assessmentQuestions'

/* ── Types for stored assessment result ── */

interface StoredSpecialty {
  category: ConsultantCategory
  selfScore: number
  scenarioScore: number
  finalScore: number
  tier: Tier
}

interface StoredResult {
  specialties: StoredSpecialty[]
  profile: { id: string; label: string; description: string; matchClients: string[] }
  topCategories: ConsultantCategory[]
}

const RESULT_KEY = 'granular-assessment-result'

function loadResult(): StoredResult | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

/* ── Radar Chart (reused from ResultStep) ── */

function RadarChart({ specialties }: { specialties: StoredSpecialty[] }) {
  const size = 260
  const cx = size / 2
  const cy = size / 2
  const r = 95
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
      {levels.map((level) => {
        const points = Array.from({ length: 6 }, (_, i) => getPoint(i, level))
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
        return <path key={level} d={path} fill="none" stroke="#0E0E0F" strokeOpacity={0.07} strokeWidth={1} />
      })}
      {specialties.map((_, i) => {
        const p = getPoint(i, 100)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#0E0E0F" strokeOpacity={0.07} strokeWidth={1} />
      })}
      <path d={dataPath} fill="#A31631" fillOpacity={0.15} stroke="#A31631" strokeWidth={2} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#A31631" />
      ))}
      {specialties.map((s, i) => {
        const p = getPoint(i, 125)
        return (
          <text key={s.category} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-semibold fill-[#0E0E0F]">
            {categoryLabels[s.category]}
          </text>
        )
      })}
    </svg>
  )
}

/* ── Recomendações de desenvolvimento por área ── */

const developmentTips: Record<ConsultantCategory, { strong: string; grow: string }> = {
  operacao: {
    strong: 'Você domina processos operacionais. Explore cases de padronização multi-unidades e documente seus frameworks de diagnóstico.',
    grow: 'Aprofunde em KDS digital, mise en place avançada e gestão de dark kitchens multi-marca.',
  },
  financeiro: {
    strong: 'Sua visão financeira é diferenciada. Use isso para construir diagnósticos rápidos baseados em DRE e CMV real.',
    grow: 'Estude precificação dinâmica, análise de break-even por canal e conciliação automatizada.',
  },
  marketing: {
    strong: 'Marketing é seu forte. Desenvolva playbooks replicáveis de growth para delivery em diferentes segmentos.',
    grow: 'Aprofunde em algoritmo do iFood, estratégias de CRM para recorrência e análise de ROI por campanha.',
  },
  cardapio: {
    strong: 'Engenharia de cardápio é sua especialidade. Crie frameworks de análise popularidade x margem para diferentes formatos.',
    grow: 'Estude food cost engineering, fotografia gastronômica para delivery e menu digital com upsell inteligente.',
  },
  ifood: {
    strong: 'Seu conhecimento de iFood é profundo. Documente estratégias de ranking e compartilhe com a rede Granular.',
    grow: 'Acompanhe as mudanças constantes do algoritmo, estude Super Restaurante e domine métricas avançadas do painel.',
  },
  rh: {
    strong: 'Gestão de pessoas no food service é sua força. Crie modelos de escala e onboarding replicáveis.',
    grow: 'Aprofunde em cálculo de custo real CLT (1.6-1.8x), programas de retenção e produtividade por função.',
  },
}

/* ── Livros e estudos recomendados por área ── */

interface Recommendation {
  title: string
  author: string
  type: 'livro' | 'estudo' | 'curso' | 'pesquisa'
  relevance: string
}

const recommendations: Record<ConsultantCategory, Recommendation[]> = {
  operacao: [
    { title: 'Setting the Table', author: 'Danny Meyer', type: 'livro', relevance: 'Cultura de hospitalidade aplicada à operação' },
    { title: 'The Lean Restaurant', author: 'Jim Sullivan', type: 'livro', relevance: 'Lean management adaptado para food service' },
    { title: 'Kitchen Confidential', author: 'Anthony Bourdain', type: 'livro', relevance: 'Entender a realidade crua da cozinha profissional' },
  ],
  financeiro: [
    { title: 'Restaurant Financial Basics', author: 'Raymond Cote', type: 'livro', relevance: 'Fundamentos financeiros específicos para restaurantes' },
    { title: 'Food Cost Formula', author: 'Roger Fields', type: 'estudo', relevance: 'Metodologias de controle de CMV e food cost' },
    { title: 'Gestão Financeira para Restaurantes', author: 'ABRASEL', type: 'curso', relevance: 'Curso prático de DRE e fluxo de caixa no food service' },
  ],
  marketing: [
    { title: 'Contagious', author: 'Jonah Berger', type: 'livro', relevance: 'Por que as coisas viralizam — aplicável a marketing de delivery' },
    { title: 'Delivering Happiness', author: 'Tony Hsieh', type: 'livro', relevance: 'Experiência do cliente como motor de crescimento' },
    { title: 'Relatório Food Trends', author: 'Galunion / iFood', type: 'pesquisa', relevance: 'Tendências anuais de consumo em delivery no Brasil' },
  ],
  cardapio: [
    { title: 'Menu Engineering', author: 'Michael Kasavana', type: 'livro', relevance: 'A bíblia da engenharia de cardápio — matriz popularidade x margem' },
    { title: 'The Food Lab', author: 'J. Kenji López-Alt', type: 'livro', relevance: 'Ciência aplicada à cozinha para otimizar fichas técnicas' },
    { title: 'Pricing and Revenue Mgmt for Food', author: 'Cornell Hospitality', type: 'pesquisa', relevance: 'Precificação estratégica baseada em dados' },
  ],
  ifood: [
    { title: 'Guia do Super Restaurante iFood', author: 'iFood', type: 'estudo', relevance: 'Critérios oficiais e estratégias para selo Super' },
    { title: 'Marketplace Optimization', author: 'Harvard Business Review', type: 'pesquisa', relevance: 'Otimização de visibilidade em marketplaces — aplicável ao iFood' },
    { title: 'Platform Revolution', author: 'Parker, Van Alstyne & Choudary', type: 'livro', relevance: 'Entender a dinâmica de plataformas como iFood' },
  ],
  rh: [
    { title: 'Turnover and Retention in Fast Food', author: 'NRA (National Restaurant Association)', type: 'pesquisa', relevance: 'Dados e estratégias de retenção no setor' },
    { title: 'First, Break All the Rules', author: 'Marcus Buckingham', type: 'livro', relevance: 'Gestão baseada em pontos fortes — aplicável a equipes de cozinha' },
    { title: 'Escalas e Legislação Trabalhista no Food Service', author: 'ABRASEL', type: 'curso', relevance: 'CLT, 6x1, interjornada e custos reais de contratação' },
  ],
}

const typeIcons: Record<string, string> = {
  livro: '📖',
  estudo: '📋',
  curso: '🎓',
  pesquisa: '🔬',
}

/* ── Componente principal ── */

export function ProfileTab() {
  const [result, setResult] = useState<StoredResult | null>(null)

  useEffect(() => {
    setResult(loadResult())
  }, [])

  // Sem resultado ainda
  if (!result) {
    return (
      <div className="space-y-6">
        <FadeIn>
          <div className="rounded-2xl border border-dashed border-[#A31631]/30 bg-[#A31631]/[0.02] p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#A31631]/10 flex items-center justify-center mx-auto mb-4">
              <ClipboardCheck size={32} className="text-[#A31631]" />
            </div>
            <h3 className="text-lg font-bold text-[#0E0E0F] mb-2">Descubra seu perfil de consultor</h3>
            <p className="text-sm text-[#9C958A] max-w-md mx-auto mb-6">
              Faça a avaliação de perfil para descobrir suas forças, receber recomendações personalizadas de desenvolvimento e encontrar os melhores parceiros para seu perfil.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <ClipboardCheck size={16} /> Fazer avaliação de perfil
            </Link>
          </div>
        </FadeIn>
      </div>
    )
  }

  const sorted = [...result.specialties].sort((a, b) => b.finalScore - a.finalScore)
  const topAreas = sorted.slice(0, 2).filter((s) => s.finalScore >= 31)
  const growAreas = sorted.slice(-2).filter((s) => s.finalScore < 76)

  return (
    <div className="space-y-6">
      {/* Perfil header */}
      <FadeIn>
        <div className="rounded-2xl border border-[#A31631]/15 bg-white p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
              <Star size={28} className="text-[#A31631]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-[#9C958A] uppercase tracking-wider font-medium mb-1">Seu perfil</p>
              <h2 className="text-xl font-bold text-[#A31631] mb-1">{result.profile.label}</h2>
              <p className="text-sm text-[#9C958A] leading-relaxed">{result.profile.description}</p>
            </div>
            <Link
              to="/assessment"
              className="flex items-center gap-1.5 text-xs font-medium text-[#A31631] hover:bg-[#A31631]/5 px-3 py-2 rounded-lg transition-colors flex-shrink-0"
            >
              <RotateCcw size={14} /> Atualizar perfil
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Radar + scores */}
      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn delay={50}>
          <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target size={18} className="text-[#A31631]" />
              <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Mapa de Competências</h3>
            </div>
            <RadarChart specialties={result.specialties} />
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-[#A31631]" />
              <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Score por Área</h3>
            </div>
            <div className="space-y-3">
              {sorted.map((s) => (
                <div key={s.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#0E0E0F]">{categoryLabels[s.category]}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0E0E0F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.finalScore}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tierColors[s.tier]}`}>
                        {tierLabels[s.tier]}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0E0E0F]/10 overflow-hidden">
                    <div className="h-full rounded-full bg-[#A31631] transition-all duration-1000" style={{ width: `${s.finalScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Pontos fortes e desenvolvimento */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Pontos fortes */}
        <FadeIn delay={150}>
          <div className="rounded-2xl border border-green-200 bg-green-50/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpRight size={18} className="text-green-600" />
              <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Pontos Fortes</h3>
            </div>
            <div className="space-y-4">
              {topAreas.map((s) => (
                <div key={s.category}>
                  <p className="text-xs font-bold text-green-700 mb-1">{categoryLabels[s.category]}</p>
                  <p className="text-xs text-[#0E0E0F]/70 leading-relaxed">{developmentTips[s.category].strong}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Áreas para crescer */}
        <FadeIn delay={200}>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-amber-600" />
              <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Para Desenvolver</h3>
            </div>
            <div className="space-y-4">
              {growAreas.map((s) => (
                <div key={s.category}>
                  <p className="text-xs font-bold text-amber-700 mb-1">{categoryLabels[s.category]}</p>
                  <p className="text-xs text-[#0E0E0F]/70 leading-relaxed">{developmentTips[s.category].grow}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Parceiros ideais */}
      <FadeIn delay={250}>
        <div className="rounded-2xl border border-[#A31631]/15 bg-[#A31631]/[0.03] p-6">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Parceiros Ideais para seu Perfil</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.profile.matchClients.map((m) => (
              <span key={m} className="text-xs bg-white border border-[#A31631]/15 text-[#0E0E0F] px-3 py-1.5 rounded-full">{m}</span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Recomendações de leitura */}
      <FadeIn delay={300}>
        <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-6">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Leituras Recomendadas</h3>
          </div>
          <p className="text-xs text-[#9C958A] mb-5">
            Curadoria baseada nas suas áreas de maior potencial. Foque nas suas forças para se tornar referência.
          </p>

          {topAreas.slice(0, 2).map((area) => {
            const recs = recommendations[area.category]
            return (
              <div key={area.category} className="mb-6 last:mb-0">
                <p className="text-xs font-bold text-[#A31631] uppercase tracking-wider mb-3">
                  {categoryLabels[area.category]}
                </p>
                <div className="space-y-3">
                  {recs.map((rec) => (
                    <div key={rec.title} className="flex items-start gap-3 rounded-xl bg-[#F7F7F7] p-4">
                      <span className="text-lg flex-shrink-0 mt-0.5">{typeIcons[rec.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-[#0E0E0F]">{rec.title}</p>
                          <span className="text-[9px] font-medium uppercase tracking-wider text-[#9C958A] bg-[#0E0E0F]/5 px-1.5 py-0.5 rounded">
                            {rec.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#9C958A]">{rec.author}</p>
                        <p className="text-xs text-[#0E0E0F]/60 mt-1 leading-relaxed">{rec.relevance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Áreas para desenvolver */}
          {growAreas.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#0E0E0F]/5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">
                Para desenvolvimento
              </p>
              {growAreas.slice(0, 1).map((area) => {
                const recs = recommendations[area.category]
                return (
                  <div key={area.category} className="space-y-3">
                    {recs.slice(0, 2).map((rec) => (
                      <div key={rec.title} className="flex items-start gap-3 rounded-xl bg-amber-50/50 border border-amber-100 p-4">
                        <span className="text-lg flex-shrink-0 mt-0.5">{typeIcons[rec.type]}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0E0E0F]">{rec.title}</p>
                          <p className="text-xs text-[#9C958A]">{rec.author}</p>
                          <p className="text-xs text-[#0E0E0F]/60 mt-1 leading-relaxed">{rec.relevance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </FadeIn>

      {/* CTA atualizar */}
      <FadeIn delay={350}>
        <div className="text-center py-4">
          <p className="text-xs text-[#9C958A] mb-3">
            Assim como o perfil de investidor nos bancos, recomendamos atualizar sua avaliação periodicamente.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 border border-[#A31631] text-[#A31631] hover:bg-[#A31631]/5 font-medium px-6 py-3 rounded-xl text-sm transition-colors"
          >
            <RotateCcw size={16} /> Refazer avaliação de perfil
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
