import { useChatbot } from '../../hooks/useChatbot'
import { ChatbotButton } from './ChatbotButton'
import { ChatbotPanel } from './ChatbotPanel'

export function ChatbotWidget() {
  const { isOpen, messages, toggle, sendMessage } = useChatbot()

  return (
    <>
      {isOpen && <ChatbotPanel messages={messages} onSend={sendMessage} />}
      <ChatbotButton isOpen={isOpen} onClick={toggle} />
    </>
  )
}
