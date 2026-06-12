import { useState } from 'react'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function MentorLoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/mentor/callback`,
      },
    })
    setLoading(false)
    if (err) {
      setError('Não foi possível enviar o link. Tente novamente.')
    } else {
      setSent(true)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/mentor/callback`,
      },
    })
    if (err) {
      setError('Erro ao conectar com o Google. Tente novamente.')
      setGoogleLoading(false)
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

        {sent ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={48} className="text-emerald-500" />
            </div>
            <h2 className="text-base font-semibold text-[#0E0E0F] mb-2">Verifique seu e-mail</h2>
            <p className="text-sm text-[#9C958A] mb-6">
              Enviamos um link de acesso para <strong className="text-[#0E0E0F]">{email}</strong>. Clique no link para entrar.
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="text-sm text-[#A31631] hover:underline"
            >
              Usar outro e-mail
            </button>
          </div>
        ) : (
          <>
            {/* Magic link form */}
            <form onSubmit={handleMagicLink} className="space-y-3 mb-4">
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
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-3 px-6 rounded-xl text-sm transition-colors"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : 'Entrar com link mágico'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#0E0E0F]/10" />
              <span className="text-xs text-[#9C958A]">ou</span>
              <div className="flex-1 h-px bg-[#0E0E0F]/10" />
            </div>

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 border border-[#0E0E0F]/15 hover:border-[#0E0E0F]/30 bg-white text-[#0E0E0F] font-medium py-3 px-6 rounded-xl text-sm transition-colors disabled:opacity-70"
            >
              {googleLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
              )}
              Continuar com Google
            </button>

            {error && (
              <p className="text-xs text-[#A31631] text-center mt-3">{error}</p>
            )}

            <p className="text-xs text-center text-[#9C958A] mt-6">
              Ainda não é mentor?{' '}
              <a href="/seja-consultor" className="text-[#A31631] hover:underline">Candidate-se aqui</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
