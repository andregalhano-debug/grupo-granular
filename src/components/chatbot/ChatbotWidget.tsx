import { useChatbot } from '../../hooks/useChatbot'
import { ChatbotButton } from './ChatbotButton'
import { ChatbotPanel } from './ChatbotPanel'

export function ChatbotWidget() {
  const { isOpen, isTyping, messages, toggle, sendMessage, agentName } = useChatbot()

  return (
    <>
      {isOpen && <ChatbotPanel messages={messages} isTyping={isTyping} onSend={sendMessage} agentName={agentName} />}
      <ChatbotButton isOpen={isOpen} onClick={toggle} />
    </>
  )
}
