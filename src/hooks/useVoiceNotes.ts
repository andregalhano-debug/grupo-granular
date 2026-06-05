import { useState, useRef, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'granular-voice-notes'

export interface ActionItem {
  id: string
  text: string
  deadline: string
  completed: boolean
}

export interface VoiceSession {
  sessionId: string
  transcript: string
  actionItems: ActionItem[]
  createdAt: string
}

type VoiceSessionsMap = Record<string, VoiceSession>

function loadSessions(): VoiceSessionsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {}
}

function saveSessions(sessions: VoiceSessionsMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {}
}

// Extract action items from transcript using simple keyword detection
function extractActionItems(transcript: string): ActionItem[] {
  const items: ActionItem[] = []
  const lines = transcript.split(/[.!?\n]+/).map((l) => l.trim()).filter(Boolean)

  const actionKeywords = [
    'precisa', 'precisamos', 'deve', 'devemos', 'fazer', 'implementar',
    'ajustar', 'corrigir', 'resolver', 'trocar', 'revisar', 'criar',
    'reduzir', 'aumentar', 'melhorar', 'negociar', 'contratar',
    'treinar', 'ação', 'plano', 'meta', 'objetivo', 'prazo',
    'até', 'semana que vem', 'próxima semana', 'amanhã', 'urgente',
  ]

  const deadlinePatterns: [RegExp, string][] = [
    [/urgente|imediato|hoje/i, 'Imediato'],
    [/amanh[aã]/i, 'Amanhã'],
    [/essa semana|esta semana/i, 'Esta semana'],
    [/semana que vem|próxima semana|proxima semana/i, 'Próxima semana'],
    [/esse m[eê]s|este m[eê]s/i, 'Este mês'],
    [/pr[oó]ximo m[eê]s/i, 'Próximo mês'],
    [/(\d{1,2})\s*(dias?)/i, '$1 dias'],
  ]

  for (const line of lines) {
    const lower = line.toLowerCase()
    const isAction = actionKeywords.some((kw) => lower.includes(kw))
    if (isAction && line.length > 10) {
      let deadline = 'A definir'
      for (const [pattern, label] of deadlinePatterns) {
        if (pattern.test(lower)) {
          deadline = line.match(pattern)?.[0]
            ? label.replace('$1', line.match(/(\d{1,2})/)?.[1] || '')
            : label
          break
        }
      }

      items.push({
        id: `ai-${Date.now()}-${items.length}`,
        text: line.charAt(0).toUpperCase() + line.slice(1),
        deadline,
        completed: false,
      })
    }
  }

  return items
}

export function useVoiceNotes(sessionId: string) {
  const [sessions, setSessions] = useState<VoiceSessionsMap>(loadSessions)
  const [isRecording, setIsRecording] = useState(false)
  const [liveTranscript, setLiveTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    saveSessions(sessions)
  }, [sessions])

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsSupported(false)
    }
  }, [])

  const currentSession = sessions[sessionId] || null
  const transcript = currentSession?.transcript || ''
  const actionItems = currentSession?.actionItems || []

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.continuous = true
    recognition.interimResults = true

    let finalTranscript = transcript

    recognition.onresult = (event: any) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += (finalTranscript ? ' ' : '') + t
          // Save incrementally
          const items = extractActionItems(finalTranscript)
          setSessions((prev) => ({
            ...prev,
            [sessionId]: {
              sessionId,
              transcript: finalTranscript,
              actionItems: items,
              createdAt: prev[sessionId]?.createdAt || new Date().toISOString(),
            },
          }))
        } else {
          interim += t
        }
      }
      setLiveTranscript(interim)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
      setLiveTranscript('')
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [sessionId, transcript])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsRecording(false)
    setLiveTranscript('')
  }, [])

  const toggleRecording = useCallback(() => {
    if (isRecording) stopRecording()
    else startRecording()
  }, [isRecording, startRecording, stopRecording])

  const toggleActionItem = useCallback((itemId: string) => {
    setSessions((prev) => {
      const session = prev[sessionId]
      if (!session) return prev
      return {
        ...prev,
        [sessionId]: {
          ...session,
          actionItems: session.actionItems.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        },
      }
    })
  }, [sessionId])

  const updateDeadline = useCallback((itemId: string, deadline: string) => {
    setSessions((prev) => {
      const session = prev[sessionId]
      if (!session) return prev
      return {
        ...prev,
        [sessionId]: {
          ...session,
          actionItems: session.actionItems.map((item) =>
            item.id === itemId ? { ...item, deadline } : item
          ),
        },
      }
    })
  }, [sessionId])

  const addManualAction = useCallback((text: string) => {
    setSessions((prev) => {
      const session = prev[sessionId] || {
        sessionId,
        transcript: '',
        actionItems: [],
        createdAt: new Date().toISOString(),
      }
      return {
        ...prev,
        [sessionId]: {
          ...session,
          actionItems: [
            ...session.actionItems,
            { id: `manual-${Date.now()}`, text, deadline: 'A definir', completed: false },
          ],
        },
      }
    })
  }, [sessionId])

  const completedCount = actionItems.filter((i) => i.completed).length
  const progressPercent = actionItems.length > 0 ? Math.round((completedCount / actionItems.length) * 100) : 0

  return {
    isSupported,
    isRecording,
    liveTranscript,
    transcript,
    actionItems,
    completedCount,
    progressPercent,
    toggleRecording,
    toggleActionItem,
    updateDeadline,
    addManualAction,
  }
}
