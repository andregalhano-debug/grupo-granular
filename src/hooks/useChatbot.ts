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

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

// Pausa "humana": simula a consultora LENDO a mensagem + DIGITANDO a resposta.
// ~lê 1,2s + digita ~16ms/caractere, com piso de ~2s e teto de ~5,5s. Some um
// jitter pequeno pra não soar mecânico (nunca o mesmo tempo).
function humanDelayMs(text: string): number {
  const base = 1200 + text.length * 16
  const jitter = 200 + Math.floor(Math.random() * 700)
  return Math.min(Math.max(base + jitter, 2000), 5500)
}

// Mensagem do "consultor que chega" (simula atendimento humano após a espera).
function consultorChega(name: string): string {
  return `Olá, tudo bem? 😊 Aqui é a ${name}, da Granular. Trabalhamos com a operação inteira do restaurante apoiada por IA — do iFood ao estoque, produção e cozinha. Me conta: qual é o maior desafio da sua operação hoje?`
}

const GREETING_RESPONSES = [
  'Olá! Como posso te ajudar? 😊 Me conta um pouco sobre o seu restaurante.',
  'Olá! Será um prazer te ajudar. Sobre o que você gostaria de saber — operação, vendas, estoque, equipe?',
  'Olá! Fique à vontade. 😊 Qual é o maior desafio do seu restaurante hoje?',
]

const CLARIFYING_RESPONSE =
  'Me conta um pouco mais para eu te ajudar melhor 😊 — é algo ligado a vendas, estoque, produção, equipe, ou à parte financeira/iFood?'

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [agent] = useState(() => getAgentInfo())
  // Identificador da sessão de chat — usado pela EF p/ gravar/atualizar o lead em
  // ml_leads (upsert idempotente). Gerado 1x por abertura do widget.
  const [sessionId] = useState(() =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  )
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
      setIsTyping(true) // mostra "digitando..." enquanto a consultora "lê e digita"
      const startedAt = Date.now()

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
          body: JSON.stringify({ action: 'chat', agentName: agent.name, session_id: sessionId, messages: historico }),
          signal: ctrl.signal,
        })
        clearTimeout(timer)
        if (!res.ok) throw new Error(`ef_${res.status}`)
        const data = await res.json()
        const reply = typeof data?.text === 'string' ? data.text.trim() : ''
        if (!reply) throw new Error('empty')
        // Ritmo humano: segura o "digitando..." até completar o tempo de ler+digitar
        // (descontando o que a IA já demorou). Nunca responde instantâneo.
        await sleep(Math.max(0, humanDelayMs(reply) - (Date.now() - startedAt)))
        setUnmatchedCount(0)
        setIsTyping(false)
        setMessages((prev) => [...prev, { id: `bot-${Date.now()}`, role: 'bot', text: reply }])
      } catch {
        const fb = faqFallback(trimmed)
        await sleep(Math.max(0, humanDelayMs(fb.text) - (Date.now() - startedAt)))
        setIsTyping(false)
        setMessages((prev) => [...prev, fb])
      }
    },
    [messages, agent.name, faqFallback, sessionId],
  )

  return { isOpen, isTyping, messages, toggle, sendMessage, agentName: agent.name }
}
