import { useState, useCallback } from 'react'
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
// O bot agora é INTELIGENTE: chama a Edge Function `agente-sdr` (projeto Granular
// Food zmmendamtlyqipdjypmw), que roda a cascata Haiku→Groq com o prompt persuasivo
// (não inventa preço, ancora valor nos números do lead). Se a IA cair/demorar, o
// bot degrada GRACIOSAMENTE pro FAQ por palavra-chave (resposta nunca falta).
// anon key é PÚBLICA por design (seguro no front).
const SDR_EF_URL = 'https://zmmendamtlyqipdjypmw.supabase.co/functions/v1/agente-sdr'
const SDR_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbWVuZGFtdGx5cWlwZGp5cG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NDg4NDEsImV4cCI6MjA4ODAyNDg0MX0.B5ifOYrGIP-DJ1GDgsHWGZn_-fakExaO9JtxvOv5CTk'

const GREETING_RESPONSES = [
  'Olá! Como posso te ajudar hoje? 😊 Pode me contar o que você precisa — sobre planos, módulos, especialistas ou qualquer dúvida sobre a Granular.',
  'Oi! Fico feliz em te atender. O que você gostaria de saber? Posso te ajudar com planos, funcionalidades, integração com iFood, consultoria e muito mais.',
  'Olá! Pode falar à vontade. 😊 Sobre o que você gostaria de saber?',
]

const CLARIFYING_RESPONSE =
  'Hmm, não entendi muito bem. Pode me contar um pouco mais? Por exemplo, você tem dúvidas sobre:\n\n• Planos e preços\n• Módulos e funcionalidades\n• Especialistas sob demanda\n• Integração com iFood\n• Como começar (onboarding)'

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

  // Fallback determinístico (FAQ por palavra-chave) — usado se a IA falhar.
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

      // Histórico p/ a IA: descarta o welcome (UI), mapeia bot→assistant (user-first).
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
        // IA indisponível → FAQ por palavra-chave (resposta nunca falta).
        const fb = faqFallback(trimmed)
        setIsTyping(false)
        setMessages((prev) => [...prev, fb])
      }
    },
    [messages, agent.name, faqFallback],
  )

  return { isOpen, isTyping, messages, toggle, sendMessage, agentName: agent.name }
}
