import { useEffect, useState } from 'react'
import { Monitor, Users, ArrowRight, ArrowLeft, Settings, Eye, EyeOff, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'
import { FadeIn } from '../components/FadeIn'

const CONSULTOR_PASSWORD = 'granular2026'

function ConsultorCard() {
  const navigate = useNavigate()
  const [showField, setShowField] = useState(false)
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CONSULTOR_PASSWORD) {
      navigate('/painel-consultor')
    } else {
      setError('Senha incorreta. Tente novamente.')
      setPassword('')
    }
  }

  return (
    <div className="flex flex-col rounded-2xl border border-[#9C958A]/20 bg-white p-8 h-full">
      <div className="w-14 h-14 rounded-xl bg-[#0E0E0F]/5 flex items-center justify-center mb-5">
        <Users size={28} className="text-[#0E0E0F]" />
      </div>
      <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">Sou Mentor</h2>
      <p className="text-sm text-[#9C958A] leading-relaxed mb-4">
        Gerencie seus clientes, atendimentos e agenda. Receba o briefing e resumo automático de cada parceiro com base nas conversas com a IA.
      </p>
      <ul className="space-y-1.5">
        <li className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="w-1 h-1 rounded-full bg-[#9C958A]" />
          Briefing e resumo dos clientes via IA
        </li>
        <li className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="w-1 h-1 rounded-full bg-[#9C958A]" />
          Gestão de agenda e atendimentos
        </li>
        <li className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="w-1 h-1 rounded-full bg-[#9C958A]" />
          Histórico e dados dos parceiros
        </li>
      </ul>

      <div className="mt-auto pt-6">
        {!showField ? (
          <div className="space-y-2">
            <a
              href="https://granularfood.vercel.app/consultor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#0E0E0F] hover:bg-[#2a2a2a] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Acessar painel do mentor
              <ArrowRight size={16} />
            </a>
            <button
              type="button"
              onClick={() => setShowField(true)}
              className="w-full text-center text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer py-1"
            >
              Ver demonstração
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#9C958A] mb-1">
              <Lock size={12} />
              Informe a senha de acesso
            </div>
            <div className="relative">
              <input
                autoFocus
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Senha"
                className="w-full px-4 py-3 pr-10 rounded-xl border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#0E0E0F]/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setShowField(false); setPassword(''); setError('') }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-sm text-[#9C958A] hover:text-[#0E0E0F] hover:border-[#0E0E0F]/30 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E0E0F] hover:bg-[#2a2a2a] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Entrar
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export function LoginPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header mínimo */}
      <header className="border-b border-[#0E0E0F]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <GranularLogo size={32} color="#0E0E0F" />
            <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Granular
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-3xl w-full">
          <FadeIn className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-3">
              Acessar a plataforma
            </h1>
            <p className="text-sm sm:text-base text-[#9C958A]">
              Selecione o tipo de acesso para continuar.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Login Sistema — Cliente */}
            <FadeIn delay={100}>
              <a
                href="https://granularfood.vercel.app/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-[#9C958A]/20 bg-white p-8 hover:border-[#A31631]/30 hover:shadow-lg hover:shadow-[#A31631]/5 transition-all h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#A31631]/10 flex items-center justify-center mb-5">
                  <Monitor size={28} className="text-[#A31631]" />
                </div>
                <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">Sou Cliente</h2>
                <p className="text-sm text-[#9C958A] leading-relaxed">
                  Acesse o sistema Granular para gerenciar sua operação de delivery — dashboard, pedidos, estoque, financeiro e muito mais.
                </p>
                <div className="mt-auto pt-6">
                  <span className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#A31631] text-white text-sm font-semibold group-hover:bg-[#8a1229] transition-colors">
                    Acessar sistema
                    <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            </FadeIn>

            {/* Login Consultor — com senha */}
            <FadeIn delay={200}>
              <ConsultorCard />
            </FadeIn>

            {/* Admin */}
            <FadeIn delay={300}>
              <Link
                to="/admin"
                className="group flex flex-col rounded-2xl border border-[#9C958A]/20 bg-white p-8 hover:border-[#A31631]/30 hover:shadow-lg hover:shadow-[#A31631]/5 transition-all h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#9C958A]/10 flex items-center justify-center mb-5">
                  <Settings size={28} className="text-[#9C958A]" />
                </div>
                <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">Administração</h2>
                <p className="text-sm text-[#9C958A] leading-relaxed">
                  Gerencie agendas de demonstração, configure horários disponíveis e integre com o Google Agenda.
                </p>
                <div className="mt-auto pt-6">
                  <span className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#9C958A] text-white text-sm font-semibold group-hover:bg-[#857f75] transition-colors">
                    Acessar admin
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-[#0E0E0F]/10 py-6 text-center">
        <p className="text-xs text-[#9C958A]">© 2026 Granular. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
