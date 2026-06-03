import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './stores/CartProvider'
import { LandingPage } from './pages/LandingPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmacaoPage } from './pages/ConfirmacaoPage'
import { ConsultoresPage } from './pages/ConsultoresPage'
import { SejaConsultorPage } from './pages/SejaConsultorPage'
import { ChatbotWidget } from './components/chatbot/ChatbotWidget'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmacao" element={<ConfirmacaoPage />} />
        <Route path="/consultores" element={<ConsultoresPage />} />
        <Route path="/seja-consultor" element={<SejaConsultorPage />} />
      </Routes>
      <ChatbotWidget />
    </CartProvider>
  )
}

export default App
