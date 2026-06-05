import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './stores/CartProvider'
import { LandingPage } from './pages/LandingPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmacaoPage } from './pages/ConfirmacaoPage'
import { ConsultoresPage } from './pages/ConsultoresPage'
import { SejaConsultorPage } from './pages/SejaConsultorPage'
import { LoginPage } from './pages/LoginPage'
import { PainelConsultorPage } from './pages/PainelConsultorPage'
import { TrilhaPage } from './pages/TrilhaPage'
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/painel-consultor" element={<PainelConsultorPage />} />
        <Route path="/trilha" element={<TrilhaPage />} />
      </Routes>
      <ChatbotWidget />
    </CartProvider>
  )
}

export default App
