import { MessageCircle, Mail, User } from 'lucide-react'

interface ContactFormProps {
  nome: string
  whatsapp: string
  email: string
  errors: { nome?: string; whatsapp?: string; email?: string }
  onUpdate: (field: 'nome' | 'whatsapp' | 'email', value: string) => void
}

export function ContactForm({ nome, whatsapp, email, errors, onUpdate }: ContactFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Seus dados de contato</h2>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <MessageCircle size={16} className="text-[#25D366]" />
          WhatsApp
        </label>
        <input
          type="tel"
          autoFocus
          placeholder="(11) 99999-9999"
          value={whatsapp}
          onChange={(e) => onUpdate('whatsapp', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
            errors.whatsapp ? 'border-[#EA1D2C]' : 'border-[#0E0E0F]/15 focus:border-[#EA1D2C]'
          }`}
        />
        {errors.whatsapp ? (
          <p className="text-xs text-[#EA1D2C] mt-1">{errors.whatsapp}</p>
        ) : (
          <p className="text-xs text-[#9C958A] mt-1">Usaremos para entrar em contato e verificar sua conta</p>
        )}
      </div>

      {/* Nome */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <User size={16} className="text-[#9C958A]" />
          Nome completo
        </label>
        <input
          type="text"
          placeholder="Seu nome e sobrenome"
          value={nome}
          onChange={(e) => onUpdate('nome', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
            errors.nome ? 'border-[#EA1D2C]' : 'border-[#0E0E0F]/15 focus:border-[#EA1D2C]'
          }`}
        />
        {errors.nome && <p className="text-xs text-[#EA1D2C] mt-1">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Mail size={16} className="text-[#9C958A]" />
          E-mail
        </label>
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => onUpdate('email', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
            errors.email ? 'border-[#EA1D2C]' : 'border-[#0E0E0F]/15 focus:border-[#EA1D2C]'
          }`}
        />
        {errors.email ? (
          <p className="text-xs text-[#EA1D2C] mt-1">{errors.email}</p>
        ) : (
          <p className="text-xs text-[#9C958A] mt-1">Enviaremos a confirmacao do pedido</p>
        )}
      </div>
    </div>
  )
}
