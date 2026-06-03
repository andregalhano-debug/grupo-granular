import { useState, useCallback } from 'react'
import { faqEntries, fallbackMessage, welcomeMessage } from '../data/chatbotFaq'
import { findBestMatch } from '../utils/fuzzyMatch'

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  whatsappUrl?: string
  whatsappLabel?: string
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'bot', text: welcomeMessage },
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

    const match = findBestMatch(trimmed, faqEntries)

    const botMsg: ChatMessage = match
      ? { id: `bot-${Date.now()}`, role: 'bot', text: match.answer }
      : {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: fallbackMessage.text,
          whatsappUrl: fallbackMessage.whatsappUrl,
          whatsappLabel: fallbackMessage.whatsappLabel,
        }

    setMessages((prev) => [...prev, userMsg, botMsg])
  }, [])

  return { isOpen, messages, toggle, sendMessage }
}
