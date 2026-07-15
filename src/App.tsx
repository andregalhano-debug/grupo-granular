import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CartProvider } from './stores/CartProvider'
import { useMentorAuth } from './hooks/useMentorAuth'

const LandingPage          = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })))
const CheckoutPage         = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })))
const ConfirmacaoPage      = lazy(() => import('./pages/ConfirmacaoPage').then(m => ({ default: m.ConfirmacaoPage })))
const ConsultoresPage      = lazy(() => import('./pages/ConsultoresPage').then(m => ({ default: m.ConsultoresPage })))
const SejaConsultorPage    = lazy(() => import('./pages/SejaConsultorPage').then(m => ({ default: m.SejaConsultorPage })))
const AssessmentPage       = lazy(() => import('./pages/AssessmentPage').then(m => ({ default: m.AssessmentPage })))
const PartnerAssessmentPage = lazy(() => import('./pages/PartnerAssessmentPage').then(m => ({ default: m.PartnerAssessmentPage })))
const LoginPage            = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })))
const PainelConsultorPage  = lazy(() => import('./pages/PainelConsultorPage').then(m => ({ default: m.PainelConsultorPage })))
const MentorLoginPage      = lazy(() => import('./pages/MentorLoginPage').then(m => ({ default: m.MentorLoginPage })))
const MentorCallbackPage   = lazy(() => import('./pages/MentorCallbackPage').then(m => ({ default: m.MentorCallbackPage })))
const TrilhaPage           = lazy(() => import('./pages/TrilhaPage').then(m => ({ default: m.TrilhaPage })))
const AgendarDemoPage      = lazy(() => import('./pages/AgendarDemoPage').then(m => ({ default: m.AgendarDemoPage })))
const AdminPage            = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })))
const AceitePage           = lazy(() => import('./pages/AceitePage').then(m => ({ default: m.AceitePage })))
const TermosPage           = lazy(() => import('./pages/TermosPage').then(m => ({ default: m.TermosPage })))
const PrivacidadePage      = lazy(() => import('./pages/PrivacidadePage').then(m => ({ default: m.PrivacidadePage })))
const CookiesPage          = lazy(() => import('./pages/CookiesPage').then(m => ({ default: m.CookiesPage })))
const RestaurantesPage     = lazy(() => import('./pages/RestaurantesPage').then(m => ({ default: m.RestaurantesPage })))
const MercadosPage         = lazy(() => import('./pages/MercadosPage').then(m => ({ default: m.MercadosPage })))
const ComparativoPage      = lazy(() => import('./pages/ComparativoPage').then(m => ({ default: m.ComparativoPage })))
const ChatbotWidget        = lazy(() => import('./components/chatbot/ChatbotWidget').then(m => ({ default: m.ChatbotWidget })))
const CookieBanner         = lazy(() => import('./components/CookieBanner').then(m => ({ default: m.CookieBanner })))

function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#A31631] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function ProtectedMentorRoute() {
  const { user, loading } = useMentorAuth()
  if (loading) return <PageLoader />
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
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/aceite" element={<AceitePage />} />
          <Route path="/termos" element={<TermosPage />} />
          <Route path="/privacidade" element={<PrivacidadePage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/restaurantes" element={<RestaurantesPage />} />
          <Route path="/mercados" element={<MercadosPage />} />
          <Route path="/comparativo" element={<ComparativoPage />} />
        </Routes>
        {showChat && <ChatbotWidget />}
        <CookieBanner />
      </Suspense>
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
