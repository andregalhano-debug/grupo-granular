import { useState, useCallback, useMemo } from 'react'
import type { ConsultantCategory } from '../data/consultants'
import type { Scenario, Tier, ProfileDefinition } from '../data/assessmentQuestions'
import {
  selectAdaptiveScenarios,
  calculatePriorityScore,
  calculateSpecialtyScore,
  getTier,
  classifyProfile,
  priorityExercise,
} from '../data/assessmentQuestions'

/* ── Types ── */

export type AssessmentStep = 'contact' | 'self-assessment' | 'scenarios' | 'priority' | 'result'

const STEPS: AssessmentStep[] = ['contact', 'self-assessment', 'scenarios', 'priority', 'result']

export interface ContactData {
  nome: string
  email: string
  whatsapp: string
  linkedin: string
}

export type SelfScores = Record<ConsultantCategory, number>

export interface ScenarioAnswer {
  scenarioId: string
  optionId: string
  points: number
}

export interface SpecialtyResult {
  category: ConsultantCategory
  selfScore: number
  scenarioScore: number
  finalScore: number
  tier: Tier
}

export interface AssessmentResult {
  specialties: SpecialtyResult[]
  profile: ProfileDefinition
  topCategories: ConsultantCategory[]
}

const STORAGE_KEY = 'granular-assessment'
const REGISTRATION_KEY = 'granular-consultant-registration'

const defaultSelfScores: SelfScores = {
  operacao: 3, financeiro: 3, marketing: 3, cardapio: 3, marketplaces: 3, rh: 3,
  estoque: 3, precificacao: 3, atendimento: 3, tecnologia: 3,
  franquias: 3, mercado: 3, farmacia: 3, petshop: 3, outros: 3,
}

interface SavedState {
  step: AssessmentStep
  contact: ContactData
  selfScores: SelfScores
  scenarioAnswers: ScenarioAnswer[]
  scenarioIndex: number
  priorityOrder: string[]
}

function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function loadRegistration(): ContactData | null {
  try {
    const raw = localStorage.getItem(REGISTRATION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return { nome: data.nome || '', email: data.email || '', whatsapp: data.whatsapp || '', linkedin: data.linkedin || '' }
  } catch { return null }
}

function saveState(state: SavedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

/* ── Hook ── */

export function useAssessment() {
  const saved = useMemo(() => loadState(), [])
  const registration = useMemo(() => loadRegistration(), [])

  // Se tem cadastro prévio e não tem assessment salvo, pula direto para auto-avaliação
  const initialStep = saved?.step || (registration ? 'self-assessment' : 'contact')
  const initialContact = saved?.contact || registration || { nome: '', email: '', whatsapp: '', linkedin: '' }

  const [step, setStep] = useState<AssessmentStep>(initialStep)
  const [contact, setContact] = useState<ContactData>(initialContact)
  const [selfScores, setSelfScores] = useState<SelfScores>(saved?.selfScores || defaultSelfScores)
  const [scenarioAnswers, setScenarioAnswers] = useState<ScenarioAnswer[]>(saved?.scenarioAnswers || [])
  const [scenarioIndex, setScenarioIndex] = useState(saved?.scenarioIndex || 0)
  const [priorityOrder, setPriorityOrder] = useState<string[]>(
    saved?.priorityOrder || priorityExercise.items.map((it) => it.id)
  )
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({})

  const persist = useCallback((overrides: Partial<SavedState> = {}) => {
    saveState({
      step,
      contact,
      selfScores,
      scenarioAnswers,
      scenarioIndex,
      priorityOrder,
      ...overrides,
    })
  }, [step, contact, selfScores, scenarioAnswers, scenarioIndex, priorityOrder])

  // Cenários adaptativos selecionados
  const selectedScenarios: Scenario[] = useMemo(
    () => selectAdaptiveScenarios(selfScores),
    [selfScores],
  )

  const currentScenario = selectedScenarios[scenarioIndex] || null

  const stepIndex = STEPS.indexOf(step)
  const totalSteps = STEPS.length
  const progressPercent = Math.round((stepIndex / (totalSteps - 1)) * 100)

  // ── Navegação ──

  const updateContact = useCallback((field: keyof ContactData, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }))
    setContactErrors((prev) => ({ ...prev, [field]: '' }))
  }, [])

  const validateContact = useCallback((): boolean => {
    const errs: Record<string, string> = {}
    if (!contact.nome.trim()) errs.nome = 'Informe seu nome'
    if (!contact.email.trim()) errs.email = 'Informe seu e-mail'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = 'E-mail inválido'
    if (!contact.whatsapp.trim()) errs.whatsapp = 'Informe seu WhatsApp'
    setContactErrors(errs)
    return Object.keys(errs).length === 0
  }, [contact])

  const goToSelfAssessment = useCallback(() => {
    if (!validateContact()) return
    setStep('self-assessment')
    persist({ step: 'self-assessment', contact })
  }, [validateContact, persist, contact])

  const updateSelfScore = useCallback((cat: ConsultantCategory, score: number) => {
    setSelfScores((prev) => ({ ...prev, [cat]: score }))
  }, [])

  const goToScenarios = useCallback(() => {
    setScenarioIndex(0)
    setScenarioAnswers([])
    setStep('scenarios')
    persist({ step: 'scenarios', selfScores, scenarioIndex: 0, scenarioAnswers: [] })
  }, [persist, selfScores])

  const answerScenario = useCallback((optionId: string, points: number) => {
    if (!currentScenario) return
    const answer: ScenarioAnswer = { scenarioId: currentScenario.id, optionId, points }
    const newAnswers = [...scenarioAnswers, answer]
    setScenarioAnswers(newAnswers)

    if (scenarioIndex + 1 < selectedScenarios.length) {
      const nextIdx = scenarioIndex + 1
      setScenarioIndex(nextIdx)
      persist({ scenarioAnswers: newAnswers, scenarioIndex: nextIdx })
    } else {
      setStep('priority')
      persist({ step: 'priority', scenarioAnswers: newAnswers })
    }
  }, [currentScenario, scenarioAnswers, scenarioIndex, selectedScenarios.length, persist])

  const movePriorityItem = useCallback((index: number, direction: 'up' | 'down') => {
    const newOrder = [...priorityOrder]
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= newOrder.length) return
    ;[newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]]
    setPriorityOrder(newOrder)
  }, [priorityOrder])

  const finishAssessment = useCallback(() => {
    const priScore = calculatePriorityScore(priorityOrder)
    const categories: ConsultantCategory[] = ['operacao', 'financeiro', 'marketing', 'cardapio', 'marketplaces', 'rh']
    const scores: Record<ConsultantCategory, number> = {} as any

    const specialties: SpecialtyResult[] = categories.map((cat) => {
      const catAnswers = scenarioAnswers.filter((a) => {
        const scenario = selectedScenarios.find((s) => s.id === a.scenarioId)
        return scenario?.category === cat
      })
      const scenarioAvg = catAnswers.length > 0
        ? (catAnswers.reduce((sum, a) => sum + a.points, 0) / catAnswers.length) / 5 * 100
        : 0
      const finalScore = calculateSpecialtyScore(selfScores[cat], scenarioAvg, priScore)
      scores[cat] = finalScore
      return {
        category: cat,
        selfScore: selfScores[cat],
        scenarioScore: scenarioAvg,
        finalScore,
        tier: getTier(finalScore),
      }
    })

    const profile = classifyProfile(scores)
    const sorted = [...specialties].sort((a, b) => b.finalScore - a.finalScore)
    const topCategories = sorted.slice(0, 3).filter((s) => s.finalScore >= 31).map((s) => s.category)

    const assessmentResult: AssessmentResult = { specialties, profile, topCategories }
    setResult(assessmentResult)
    setStep('result')
    localStorage.removeItem(STORAGE_KEY)
    // Salva resultado para a trilha de conhecimento reutilizar
    localStorage.setItem('granular-assessment-result', JSON.stringify(assessmentResult))
  }, [priorityOrder, scenarioAnswers, selfScores, selectedScenarios])

  const resetAssessment = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setStep('contact')
    setContact({ nome: '', email: '', whatsapp: '', linkedin: '' })
    setSelfScores(defaultSelfScores)
    setScenarioAnswers([])
    setScenarioIndex(0)
    setPriorityOrder(priorityExercise.items.map((it) => it.id))
    setResult(null)
    setContactErrors({})
  }, [])

  return {
    // State
    step,
    stepIndex,
    totalSteps,
    progressPercent,
    contact,
    contactErrors,
    selfScores,
    selectedScenarios,
    scenarioIndex,
    currentScenario,
    scenarioAnswers,
    priorityOrder,
    result,

    // Actions
    updateContact,
    goToSelfAssessment,
    updateSelfScore,
    goToScenarios,
    answerScenario,
    movePriorityItem,
    finishAssessment,
    resetAssessment,
  }
}
