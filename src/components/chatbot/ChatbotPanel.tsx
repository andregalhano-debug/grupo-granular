import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import type { ChatMessage } from '../../hooks/useChatbot'
import { GranularLogo } from '../GranularLogo'

interface ChatbotPanelProps {
  messages: ChatMessage[]
  onSend: (text: string) => void
  agentName: string
}

export function ChatbotPanel({ messages, onSend, agentName }: ChatbotPanelProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[360px] max-sm:w-[calc(100vw-48px)] max-h-[500px] rounded-2xl border border-[#0E0E0F]/10 bg-white shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--accent)] px-4 py-3 flex items-center gap-3">
        <GranularLogo size={24} color="#FFFFFF" />
        <span className="text-sm font-semibold text-white">{agentName} — Granular</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px] max-h-[360px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[var(--accent-10)] text-[#0E0E0F]'
                  : 'bg-[#F7F7F7] text-[#0E0E0F]'
              }`}
            >
              <p>{msg.text}</p>
              {msg.whatsappUrl && (
                <a
                  href={msg.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-[#25D366] hover:underline"
                >
                  {msg.whatsappLabel}
                </a>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-[#0E0E0F]/10 px-3 py-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua dúvida..."
          className="flex-1 text-sm px-3 py-2 rounded-lg border border-[#0E0E0F]/10 outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white transition-colors cursor-pointer"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
