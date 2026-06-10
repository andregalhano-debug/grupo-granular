import { useState, useCallback, useMemo } from 'react'
import { partnerSections, generateBriefing, type PartnerBriefing } from '../data/partnerAssessment'

const STORAGE_KEY = 'granular-partner-assessment'
const RESULT_KEY = 'granular-partner-briefing'

interface SavedState {
  sectionIndex: number
  answers: Record<string, string | string[]>
  contact: { nome: string; email: string; whatsapp: string }
}

function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveState(state: SavedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export type PartnerStep = 'contact' | 'questions' | 'result'

export function usePartnerAssessment() {
  const saved = useMemo(() => loadState(), [])

  const [step, setStep] = useState<PartnerStep>(saved ? 'questions' : 'contact')
  const [contact, setContact] = useState(saved?.contact || { nome: '', email: '', whatsapp: '' })
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({})
  const [sectionIndex, setSectionIndex] = useState(saved?.sectionIndex || 0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(saved?.answers || {})
  const [briefing, setBriefing] = useState<PartnerBriefing | null>(null)

  const totalSections = partnerSections.length
  const currentSection = partnerSections[sectionIndex]
  const progressPercent = step === 'result' ? 100 : Math.round(((sectionIndex) / totalSections) * 100)

  const persist = useCallback((overrides: Partial<SavedState> = {}) => {
    saveState({ sectionIndex, answers, contact, ...overrides })
  }, [sectionIndex, answers, contact])

  const updateContact = useCallback((field: keyof typeof contact, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }))
    setContactErrors((prev) => ({ ...prev, [field]: '' }))
  }, [])

  const validateContact = useCallback((): boolean => {
    const errs: Record<string, string> = {}
    if (!contact.nome.trim()) errs.nome = 'Informe seu nome'
    if (!contact.email.trim()) errs.email = 'Informe seu e-mail'
    if (!contact.whatsapp.trim()) errs.whatsapp = 'Informe seu WhatsApp'
    setContactErrors(errs)
    return Object.keys(errs).length === 0
  }, [contact])

  const goToQuestions = useCallback(() => {
    if (!validateContact()) return
    setStep('questions')
    persist({ sectionIndex: 0, contact })
  }, [validateContact, persist, contact])

  const setAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const toggleMulti = useCallback((questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [questionId]: next }
    })
  }, [])

  const nextSection = useCallback(() => {
    if (sectionIndex + 1 < totalSections) {
      const next = sectionIndex + 1
      setSectionIndex(next)
      persist({ sectionIndex: next, answers })
    } else {
      // Gerar briefing
      const result = generateBriefing(answers)
      setBriefing(result)
      setStep('result')
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(RESULT_KEY, JSON.stringify({ ...result, contact }))
    }
  }, [sectionIndex, totalSections, answers, persist, contact])

  const prevSection = useCallback(() => {
    if (sectionIndex > 0) setSectionIndex(sectionIndex - 1)
  }, [sectionIndex])

  const resetAssessment = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setStep('contact')
    setContact({ nome: '', email: '', whatsapp: '' })
    setSectionIndex(0)
    setAnswers({})
    setBriefing(null)
    setContactErrors({})
  }, [])

  return {
    step, contact, contactErrors, sectionIndex, totalSections,
    currentSection, answers, briefing, progressPercent,
    updateContact, goToQuestions, setAnswer, toggleMulti,
    nextSection, prevSection, resetAssessment,
  }
}
