import { useEffect } from 'react'
import { Monitor, Users, ArrowRight, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'
import { FadeIn } from '../components/FadeIn'

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

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Login Sistema — Cliente */}
            <FadeIn delay={100}>
              <a
                href="https://maestrofood.vercel.app/auth"
                className="group block rounded-2xl border border-[#9C958A]/20 bg-white p-8 hover:border-[#EA1D2C]/30 hover:shadow-lg hover:shadow-[#EA1D2C]/5 transition-all h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#EA1D2C]/10 flex items-center justify-center mb-5">
                  <Monitor size={28} className="text-[#EA1D2C]" />
                </div>
                <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">Sou Cliente</h2>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-6">
                  Acesse o sistema Granular para gerenciar sua operação de delivery — dashboard, pedidos, estoque, financeiro e muito mais.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-[#EA1D2C] group-hover:gap-3 transition-all">
                  Acessar sistema
                  <ArrowRight size={16} />
                </div>
              </a>
            </FadeIn>

            {/* Login Consultor */}
            <FadeIn delay={200}>
              <a
                href="https://maestrofood.vercel.app/auth?role=consultor"
                className="group block rounded-2xl border border-[#9C958A]/20 bg-white p-8 hover:border-[#EA1D2C]/30 hover:shadow-lg hover:shadow-[#EA1D2C]/5 transition-all h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0E0E0F]/5 flex items-center justify-center mb-5">
                  <Users size={28} className="text-[#0E0E0F]" />
                </div>
                <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">Sou Consultor</h2>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-4">
                  Gerencie seus clientes, atendimentos e agenda. Receba o briefing e resumo automático de cada parceiro com base nas conversas com a IA.
                </p>
                <ul className="space-y-1.5 mb-6">
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
                <div className="flex items-center gap-2 text-sm font-medium text-[#EA1D2C] group-hover:gap-3 transition-all">
                  Acessar painel do consultor
                  <ArrowRight size={16} />
                </div>
              </a>
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
