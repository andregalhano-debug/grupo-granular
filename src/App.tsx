import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmacaoPage } from './pages/ConfirmacaoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/confirmacao" element={<ConfirmacaoPage />} />
    </Routes>
  )
}

export default App
