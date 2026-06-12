import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function MentorLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)
    if (err) {
      setError(`Erro: ${err.message}`)
    } else {
      navigate('/painel-consultor')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-2 mb-8">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#A31631"/>
              <path d="M8 24V14L16 8L24 14V24H19V19H13V24H8Z" fill="white"/>
            </svg>
            <span className="text-lg font-bold text-[#0E0E0F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>granular</span>
          </a>
          <h1 className="text-xl font-bold text-[#0E0E0F] mb-2">Painel do Mentor</h1>
          <p className="text-sm text-[#9C958A]">Acesse sua área exclusiva</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
              <Mail size={14} className="text-[#9C958A]" /> E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#0E0E0F]/15 text-sm bg-white outline-none transition-colors focus:border-[#A31631]"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
              <Lock size={14} className="text-[#9C958A]" /> Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#0E0E0F]/15 text-sm bg-white outline-none transition-colors focus:border-[#A31631]"
            />
          </div>

          {error && (
            <p className="text-xs text-[#A31631]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-3 px-6 rounded-xl text-sm transition-colors"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Entrando...</> : 'Entrar'}
          </button>
        </form>

        <p className="text-xs text-center text-[#9C958A] mt-6">
          Ainda não é mentor?{' '}
          <a href="/seja-consultor" className="text-[#A31631] hover:underline">Candidate-se aqui</a>
        </p>
      </div>
    </div>
  )
}
