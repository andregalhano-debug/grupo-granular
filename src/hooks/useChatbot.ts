import { useState, useCallback, useRef } from 'react'
import { getAgentInfo } from '../data/chatbotFaq'
import {
  emptyChatState,
  isUsableLlmReply,
  nextChatTurn,
  openingLine,
  splitBubbles,
  type ChatLead,
  type ChatSdrState,
} from '../lib/chatSdr'

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  ctaUrl?: string
  ctaLabel?: string
  whatsappUrl?: string
  whatsappLabel?: string
}

const SDR_EF_URL = 'https://owoazrrnjsvzycranzur.supabase.co/functions/v1/agente-sdr'
const SDR_TIMEOUT_MS = 8000

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function typingMs(text: string): number {
  const base = 380 + text.length * 12
  const jitter = 80 + Math.floor(Math.random() * 180)
  return Math.min(Math.max(base + jitter, 450), 1400)
}

function uid() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

async function tryFoodSdr(
  agentName: string,
  sessionId: string,
  history: { role: string; content: string }[],
): Promise<string | null> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), SDR_TIMEOUT_MS)
    const res = await fetch(SDR_EF_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'chat',
        agentName,
        session_id: sessionId,
        messages: history,
      }),
      signal: ctrl.signal,
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const data = await res.json()
    const reply = typeof data?.text === 'string' ? data.text.trim() : ''
    return isUsableLlmReply(reply) ? reply : null
  } catch {
    return null
  }
}

async function persistChatLead(lead: ChatLead) {
  try {
    await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template: 'novo-agendamento-demo',
        nome: lead.nome,
        email: '',
        whatsapp: lead.whatsapp,
        empresa: lead.empresa,
        segmento: lead.segmento,
        faturamento: '—',
        data: '—',
        horario: '—',
        origem: 'chat',
        notas: lead.dor,
      }),
    })
  } catch (err) {
    console.error('[chat] falha ao enviar lead:', err)
  }
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [agent] = useState(() => getAgentInfo())
  const [sessionId] = useState(() =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  )
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'bot', text: openingLine(agent.name) },
  ])
  const stateRef = useRef<ChatSdrState>(emptyChatState())
  const busyRef = useRef(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const pushBot = useCallback(async (texts: string[], extra?: Partial<ChatMessage>) => {
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i]
      setIsTyping(true)
      await sleep(typingMs(text))
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'bot',
          text,
          ...(i === texts.length - 1 ? extra : {}),
        },
      ])
      if (i < texts.length - 1) await sleep(320)
    }
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || busyRef.current) return
      busyRef.current = true

      const userMsg: ChatMessage = { id: uid(), role: 'user', text: trimmed }
      const snapshot = [...messages, userMsg]
      setMessages(snapshot)
      setIsTyping(true)

      const history = snapshot.map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }))

      const llm = await tryFoodSdr(agent.name, sessionId, history)
      if (llm) {
        const { state, turn } = nextChatTurn(stateRef.current, trimmed)
        stateRef.current = state
        if (turn.lead) void persistChatLead(turn.lead)
        await pushBot(splitBubbles(llm), {
          ctaUrl: turn.ctaUrl,
          ctaLabel: turn.ctaLabel,
        })
        busyRef.current = false
        return
      }

      const { state, turn } = nextChatTurn(stateRef.current, trimmed)
      stateRef.current = state
      if (turn.lead) void persistChatLead(turn.lead)
      await pushBot(turn.replies, {
        ctaUrl: turn.ctaUrl,
        ctaLabel: turn.ctaLabel,
      })
      busyRef.current = false
    },
    [agent.name, messages, pushBot, sessionId],
  )

  return { isOpen, isTyping, messages, toggle, sendMessage, agentName: agent.name }
}
