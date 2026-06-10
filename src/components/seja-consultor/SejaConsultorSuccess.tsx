import { CheckCircle2, Mail, ClipboardCheck, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
  nome: string
  email: string
}

export function SejaConsultorSuccess({ nome, email }: Props) {
  const firstName = nome.split(' ')[0] || 'Consultor'

  return (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
        <CheckCircle2 size={32} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-[#0E0E0F]">Cadastro enviado, {firstName}!</h2>
      <p className="text-[#9C958A] text-sm max-w-md mx-auto leading-relaxed">
        Nossa equipe analisará seu perfil e entrará em contato pelo WhatsApp em até 48 horas.
      </p>

      {/* Email enviado */}
      <div className="rounded-xl bg-[#F7F7F7] border border-[#0E0E0F]/10 p-4 max-w-md mx-auto">
        <div className="flex items-center gap-2 justify-center text-sm text-[#0E0E0F]">
          <Mail size={16} className="text-[#A31631]" />
          <span>Link da avaliação enviado para <strong>{email}</strong></span>
        </div>
      </div>

      {/* CTA Assessment */}
      <div className="rounded-2xl border border-[#A31631]/15 bg-[#A31631]/[0.03] p-6 max-w-md mx-auto text-left">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#A31631]/10 flex items-center justify-center flex-shrink-0">
            <ClipboardCheck size={24} className="text-[#A31631]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#0E0E0F] mb-1">Descubra seu perfil de consultor</h3>
            <p className="text-xs text-[#9C958A] leading-relaxed mb-3">
              Em 3 minutos, identificamos suas forças e o melhor encaixe com parceiros Granular. Cenários reais do food service.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Fazer avaliação agora <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#9C958A]">
        Pode fazer depois — o link também foi enviado por e-mail.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to="/consultores" className="inline-flex items-center gap-2 border border-[#0E0E0F]/15 text-[#0E0E0F] font-medium px-6 py-3 rounded-xl text-sm transition-colors hover:bg-[#F7F7F7]">
          Ver consultores
        </Link>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
          Voltar ao site
        </Link>
      </div>
    </div>
  )
}
