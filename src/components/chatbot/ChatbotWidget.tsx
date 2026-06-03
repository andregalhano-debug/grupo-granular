import { useChatbot } from '../../hooks/useChatbot'
import { ChatbotButton } from './ChatbotButton'
import { ChatbotPanel } from './ChatbotPanel'

export function ChatbotWidget() {
  const { isOpen, messages, toggle, sendMessage, agentName } = useChatbot()

  return (
    <>
      {isOpen && <ChatbotPanel messages={messages} onSend={sendMessage} agentName={agentName} />}
      <ChatbotButton isOpen={isOpen} onClick={toggle} />
    </>
  )
}
