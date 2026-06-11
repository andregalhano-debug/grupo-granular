import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import type { ChatMessage } from '../../hooks/useChatbot'
import { GranularLogo } from '../GranularLogo'

interface ChatbotPanelProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSend: (text: string) => void
  agentName: string
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#F7F7F7] rounded-xl px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#9C958A] animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-[#9C958A] animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-[#9C958A] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

export function ChatbotPanel({ messages, isTyping, onSend, agentName }: ChatbotPanelProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[360px] max-sm:w-[calc(100vw-48px)] max-h-[500px] rounded-2xl border border-[#0E0E0F]/10 bg-white shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--accent)] px-4 py-3 flex items-center gap-3">
        <div className="relative">
          <GranularLogo size={24} color="#FFFFFF" />
          {/* Indicador online */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[var(--accent)]" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white block leading-tight">{agentName} — Granular</span>
          <span className="text-[10px] text-white/70 leading-tight">
            {isTyping ? 'digitando...' : 'online agora'}
          </span>
        </div>
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
              <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
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

        {/* Indicador de digitação */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-[#0E0E0F]/10 px-3 py-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isTyping ? 'Aguarde...' : 'Digite sua dúvida...'}
          disabled={isTyping}
          className="flex-1 text-sm px-3 py-2 rounded-lg border border-[#0E0E0F]/10 outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="p-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
