import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SejaConsultorSuccess() {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
        <CheckCircle2 size={32} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-[#0E0E0F]">Candidatura enviada!</h2>
      <p className="text-[#9C958A] text-sm max-w-md mx-auto leading-relaxed">
        Obrigado pelo interesse em ser um consultor Granular. Nossa equipe analisará seu perfil e entrará em contato pelo WhatsApp em até 48 horas.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to="/consultores" className="inline-flex items-center gap-2 border border-[#0E0E0F]/15 text-[#0E0E0F] font-medium px-6 py-3 rounded-xl text-sm transition-colors hover:bg-[#F7F7F7]">
          Ver consultores
        </Link>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#EA1D2C] hover:bg-[#C8101E] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors">
          Voltar ao site
        </Link>
      </div>
    </div>
  )
}
