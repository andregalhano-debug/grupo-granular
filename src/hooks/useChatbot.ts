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

function typingDelay(text: string): number {
  // 400ms base + 12ms por caractere, máximo 1400ms
  return Math.min(400 + text.length * 12, 1400)
}

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

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    let botMsg: ChatMessage

    if (isGreeting(trimmed)) {
      // Respond to greeting with a welcoming probing question
      botMsg = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: randomItem(GREETING_RESPONSES),
      }
      setUnmatchedCount(0)
    } else {
      const match = findBestMatch(trimmed, faqEntries)

      if (match) {
        botMsg = { id: `bot-${Date.now()}`, role: 'bot', text: match.answer }
        setUnmatchedCount(0)
      } else if (unmatchedCount === 0) {
        // First miss: ask a clarifying question
        botMsg = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: CLARIFYING_RESPONSE,
        }
        setUnmatchedCount(1)
      } else {
        // Second miss: fall back to WhatsApp
        botMsg = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: fallbackMessage.text,
          whatsappUrl: fallbackMessage.whatsappUrl,
          whatsappLabel: fallbackMessage.whatsappLabel,
        }
        setUnmatchedCount(0)
      }
    }

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, typingDelay(botMsg.text))
  }, [unmatchedCount])

  return { isOpen, isTyping, messages, toggle, sendMessage, agentName: agent.name }
}
