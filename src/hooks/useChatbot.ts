import { useState, useCallback, useEffect, useRef } from 'react'
import { faqEntries, fallbackMessage, getAgentInfo } from '../data/chatbotFaq'
import { findBestMatch, isGreeting } from '../utils/fuzzyMatch'

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  whatsappUrl?: string
  whatsappLabel?: string
}

// ── IA do vendedor (SDR) ─────────────────────────────────────────────────────
// Bot inteligente: chama a Edge Function `agente-sdr` (projeto Granular Food
// zmmendamtlyqipdjypmw), cascata Haiku→Groq, prompt persuasivo+humano. Se a IA
// cair/demorar, degrada pro FAQ por palavra-chave. anon key é PÚBLICA (ok no front).
const SDR_EF_URL = 'https://zmmendamtlyqipdjypmw.supabase.co/functions/v1/agente-sdr'
const SDR_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbWVuZGFtdGx5cWlwZGp5cG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NDg4NDEsImV4cCI6MjA4ODAyNDg0MX0.B5ifOYrGIP-DJ1GDgsHWGZn_-fakExaO9JtxvOv5CTk'

// Mensagem do "consultor que chega" (simula atendimento humano após a espera).
function consultorChega(name: string): string {
  return `Oi, tudo bem? 😊 Aqui é a ${name}, da Granular. A gente cuida da operação inteira do restaurante com IA — do iFood ao estoque, produção e cozinha. Me conta: qual o maior perrengue da sua operação hoje?`
}

const GREETING_RESPONSES = [
  'Opa! Como posso te ajudar? 😊 Me conta um pouco do seu restaurante.',
  'Oi! Fico feliz em te atender. Sobre o que você quer saber — operação, vendas, estoque, equipe?',
  'Olá! Pode falar à vontade. 😊 Qual o maior desafio do seu restaurante hoje?',
]

const CLARIFYING_RESPONSE =
  'Hmm, me conta um pouco mais pra eu te ajudar direito 😊 — é algo de vendas, estoque, produção, equipe, ou a parte financeira/iFood?'

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [agent] = useState(() => getAgentInfo())
  const [unmatchedCount, setUnmatchedCount] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'bot', text: agent.welcomeMessage },
  ])

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  // "Aguarde que um consultor vai te atender": após a welcome, mostra o typing e
  // o consultor "chega" (mensagem humana). Roda 1x.
  const arrivedRef = useRef(false)
  useEffect(() => {
    if (arrivedRef.current) return
    arrivedRef.current = true
    setIsTyping(true)
    const timer = setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: 'consultor-chega', role: 'bot', text: consultorChega(agent.name) },
      ])
    }, 3800)
    return () => clearTimeout(timer)
  }, [agent.name])

  // Fallback determinístico (FAQ por palavra-chave) — se a IA falhar.
  const faqFallback = useCallback(
    (trimmed: string): ChatMessage => {
      if (isGreeting(trimmed)) {
        setUnmatchedCount(0)
        return { id: `bot-${Date.now()}`, role: 'bot', text: randomItem(GREETING_RESPONSES) }
      }
      const match = findBestMatch(trimmed, faqEntries)
      if (match) {
        setUnmatchedCount(0)
        return { id: `bot-${Date.now()}`, role: 'bot', text: match.answer }
      }
      if (unmatchedCount === 0) {
        setUnmatchedCount(1)
        return { id: `bot-${Date.now()}`, role: 'bot', text: CLARIFYING_RESPONSE }
      }
      setUnmatchedCount(0)
      return {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: fallbackMessage.text,
        whatsappUrl: fallbackMessage.whatsappUrl,
        whatsappLabel: fallbackMessage.whatsappLabel,
      }
    },
    [unmatchedCount],
  )

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: 'user', text: trimmed }
      const snapshot = [...messages, userMsg]
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      // Histórico p/ a IA: descarta a welcome (UI de espera); mantém o "consultor
      // chega" como turno do assistente; mapeia bot→assistant (user-first).
      const historico = snapshot
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }))

      try {
        const ctrl = new AbortController()
        const timer = setTimeout(() => ctrl.abort(), 30000)
        const res = await fetch(SDR_EF_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SDR_ANON,
            Authorization: `Bearer ${SDR_ANON}`,
          },
          body: JSON.stringify({ action: 'chat', agentName: agent.name, messages: historico }),
          signal: ctrl.signal,
        })
        clearTimeout(timer)
        if (!res.ok) throw new Error(`ef_${res.status}`)
        const data = await res.json()
        const reply = typeof data?.text === 'string' ? data.text.trim() : ''
        if (!reply) throw new Error('empty')
        setUnmatchedCount(0)
        setIsTyping(false)
        setMessages((prev) => [...prev, { id: `bot-${Date.now()}`, role: 'bot', text: reply }])
      } catch {
        const fb = faqFallback(trimmed)
        setIsTyping(false)
        setMessages((prev) => [...prev, fb])
      }
    },
    [messages, agent.name, faqFallback],
  )

  return { isOpen, isTyping, messages, toggle, sendMessage, agentName: agent.name }
}
