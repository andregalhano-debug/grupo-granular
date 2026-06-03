import { MessageCircle, X } from 'lucide-react'

interface ChatbotButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function ChatbotButton({ isOpen, onClick }: ChatbotButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#EA1D2C] hover:bg-[#C8101E] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer"
      aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  )
}
