import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GranularLogo } from '../components/GranularLogo'

/** Painel real do mentor vive no Food. Este form antigo batia num Supabase sem DNS. */
const MENTOR_PANEL = 'https://granularfood.vercel.app/consultor'

export function MentorLoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <GranularLogo size={32} color="#0E0E0F" />
            <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Granular
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#0E0E0F] mb-2">Painel do Mentor</h1>
          <p className="text-sm text-[#9C958A]">Acesse sua área exclusiva</p>
        </div>

        <a
          href={MENTOR_PANEL}
          className="flex items-center justify-center gap-2 w-full bg-[#7c2d3e] hover:bg-[#5f2130] text-white font-medium py-3 px-6 rounded-xl text-sm transition-colors"
        >
          Entrar
          <ArrowRight size={16} />
        </a>

        <p className="text-xs text-center text-[#9C958A] mt-6">
          Ainda não é mentor?{' '}
          <Link to="/seja-consultor" className="text-[#7c2d3e] hover:underline">Candidate-se aqui</Link>
        </p>
      </div>
    </div>
  )
}
