import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CartProvider } from './stores/CartProvider'
import { LandingPage } from './pages/LandingPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmacaoPage } from './pages/ConfirmacaoPage'
import { ConsultoresPage } from './pages/ConsultoresPage'
import { SejaConsultorPage } from './pages/SejaConsultorPage'
import { AssessmentPage } from './pages/AssessmentPage'
import { PartnerAssessmentPage } from './pages/PartnerAssessmentPage'
import { LoginPage } from './pages/LoginPage'
import { PainelConsultorPage } from './pages/PainelConsultorPage'
import { MentorLoginPage } from './pages/MentorLoginPage'
import { MentorCallbackPage } from './pages/MentorCallbackPage'
import { TrilhaPage } from './pages/TrilhaPage'
import { AgendarDemoPage } from './pages/AgendarDemoPage'
import { AdminPage } from './pages/AdminPage'
import { TermosPage } from './pages/TermosPage'
import { PrivacidadePage } from './pages/PrivacidadePage'
import { CookiesPage } from './pages/CookiesPage'
import { ChatbotWidget } from './components/chatbot/ChatbotWidget'
import { useMentorAuth } from './hooks/useMentorAuth'

function ProtectedMentorRoute() {
  const { user, loading } = useMentorAuth()
  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#A31631] border-t-transparent rounded-full animate-spin" />
    </div>
  )
  return user ? <PainelConsultorPage /> : <Navigate to="/mentor/entrar" replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation()
  const hideChatOn = ['/checkout', '/confirmacao']
  const showChat = !hideChatOn.includes(location.pathname)

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmacao" element={<ConfirmacaoPage />} />
        <Route path="/consultores" element={<ConsultoresPage />} />
        <Route path="/seja-consultor" element={<SejaConsultorPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/diagnostico" element={<PartnerAssessmentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/painel-consultor" element={<ProtectedMentorRoute />} />
        <Route path="/mentor/entrar" element={<MentorLoginPage />} />
        <Route path="/mentor/callback" element={<MentorCallbackPage />} />
        <Route path="/trilha" element={<TrilhaPage />} />
        <Route path="/agendar-demo" element={<AgendarDemoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
      {showChat && <ChatbotWidget />}
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
