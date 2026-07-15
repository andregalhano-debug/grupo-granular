import { CheckCircle2, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TIPO_CONTRATACAO_LABEL, type TipoContratacao } from '../../types/termosAceite'

interface Props {
  empresaNome: string
  representanteNome: string
  email: string
  tipoContratacao: TipoContratacao
}

const GRANULAR_WHATSAPP = '5531984355542'

export function AceiteSuccess({ empresaNome, representanteNome, email, tipoContratacao }: Props) {
  const primeiroNome = representanteNome.split(' ')[0] || representanteNome
  const tipoLabel = TIPO_CONTRATACAO_LABEL[tipoContratacao]

  const mensagemWhatsApp =
    `Olá! Sou ${primeiroNome}, representante da ${empresaNome}. ` +
    `Confirmo formalmente o aceite dos Termos de Uso e da Política de Privacidade da Granular, referente à contratação de: ${tipoLabel}.`
  const whatsappUrl = `https://wa.me/${GRANULAR_WHATSAPP}?text=${encodeURIComponent(mensagemWhatsApp)}`

  return (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
        <CheckCircle2 size={32} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-[#0E0E0F]">Aceite confirmado, {empresaNome}!</h2>
      <p className="text-[#9C958A] text-sm max-w-md mx-auto leading-relaxed">
        Seus dados foram registrados para <strong className="text-[#0E0E0F]">{tipoLabel}</strong>. Nossa equipe já foi avisada e vai entrar em contato para dar início à sua utilização da plataforma.
      </p>

      <div className="rounded-xl bg-[#F7F7F7] border border-[#0E0E0F]/10 p-4 max-w-md mx-auto space-y-3">
        <div className="flex items-center gap-2 justify-center text-sm text-[#0E0E0F]">
          <Mail size={16} className="text-[#A31631]" />
          <span>Confirmação enviada para <strong>{email}</strong></span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1FB855] text-white font-medium py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <MessageCircle size={17} /> Confirmar também por WhatsApp
        </a>
        <p className="text-[11px] text-[#9C958A] leading-relaxed">
          Abre o WhatsApp com a mensagem de confirmação já pronta — é só enviar.
        </p>
      </div>

      <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
        Voltar ao site
      </Link>
    </div>
  )
}
