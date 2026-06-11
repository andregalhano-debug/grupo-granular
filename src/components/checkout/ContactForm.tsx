import { MessageCircle, Mail, User, Building2, FileText, CheckCircle2, Loader2, XCircle } from 'lucide-react'
import type { DocumentoStatus } from '../../hooks/useCheckoutForm'

interface ContactFormProps {
  empresa: string
  documento: string
  documentoStatus: DocumentoStatus
  nome: string
  whatsapp: string
  email: string
  errors: { empresa?: string; documento?: string; nome?: string; whatsapp?: string; email?: string }
  onUpdate: (field: 'empresa' | 'documento' | 'nome' | 'whatsapp' | 'email', value: string) => void
}

export function ContactForm({ empresa, documento, documentoStatus, nome, whatsapp, email, errors, onUpdate }: ContactFormProps) {
  const digits = documento.replace(/\D/g, '')
  const isCnpj = digits.length === 14
  const isCpf = digits.length === 11

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Seus dados de contato</h2>

      {/* Nome da Empresa */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Building2 size={16} className="text-[#9C958A]" />
          Nome da empresa
        </label>
        <input
          type="text"
          autoFocus
          placeholder="Razão social ou nome fantasia"
          value={empresa}
          onChange={(e) => onUpdate('empresa', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
            errors.empresa ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
          }`}
        />
        {errors.empresa && <p className="text-xs text-[#A31631] mt-1">{errors.empresa}</p>}
      </div>

      {/* CNPJ / CPF */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <FileText size={16} className="text-[#9C958A]" />
          CNPJ / CPF
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            placeholder="00.000.000/0000-00 ou 000.000.000-00"
            value={documento}
            onChange={(e) => onUpdate('documento', e.target.value)}
            className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm bg-white outline-none transition-colors ${
              errors.documento ? 'border-[#A31631]' : documentoStatus === 'valid' ? 'border-green-500' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
            }`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {documentoStatus === 'loading' && <Loader2 size={16} className="text-[#9C958A] animate-spin" />}
            {documentoStatus === 'valid' && <CheckCircle2 size={16} className="text-green-500" />}
            {documentoStatus === 'invalid' && <XCircle size={16} className="text-[#A31631]" />}
          </div>
        </div>
        {errors.documento ? (
          <p className="text-xs text-[#A31631] mt-1">{errors.documento}</p>
        ) : documentoStatus === 'valid' && isCnpj ? (
          <p className="text-xs text-green-600 mt-1">CNPJ validado na Receita Federal</p>
        ) : documentoStatus === 'valid' && isCpf ? (
          <p className="text-xs text-green-600 mt-1">CPF válido</p>
        ) : (
          <p className="text-xs text-[#9C958A] mt-1">Digite CPF (pessoa física) ou CNPJ (pessoa jurídica)</p>
        )}
      </div>

      {/* Nome Completo */}
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
            errors.nome ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
          }`}
        />
        {errors.nome && <p className="text-xs text-[#A31631] mt-1">{errors.nome}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <MessageCircle size={16} className="text-[#25D366]" />
          WhatsApp
        </label>
        <input
          type="tel"
          placeholder="(11) 99999-9999"
          value={whatsapp}
          onChange={(e) => onUpdate('whatsapp', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
            errors.whatsapp ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
          }`}
        />
        {errors.whatsapp ? (
          <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>
        ) : (
          <p className="text-xs text-[#9C958A] mt-1">Usaremos para entrar em contato e verificar sua conta</p>
        )}
      </div>

      {/* E-mail */}
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
            errors.email ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
          }`}
        />
        {errors.email ? (
          <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>
        ) : (
          <p className="text-xs text-[#9C958A] mt-1">Enviaremos a confirmação do pedido</p>
        )}
      </div>
    </div>
  )
}
