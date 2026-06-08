import { MessageCircle, Mail, User, TrendingUp } from 'lucide-react'

const FAIXAS_FATURAMENTO = [
  'Iniciando Delivery',
  'Até 50k',
  'Entre 50k e 150k',
  '150k a 300k',
  '300k a 500k',
  '500k a 1M',
  'Acima de 1M',
]

interface ContactFormProps {
  nome: string
  faturamento: string
  whatsapp: string
  email: string
  errors: { nome?: string; faturamento?: string; whatsapp?: string; email?: string }
  onUpdate: (field: 'nome' | 'faturamento' | 'whatsapp' | 'email', value: string) => void
}

export function ContactForm({ nome, faturamento, whatsapp, email, errors, onUpdate }: ContactFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-[#0E0E0F]">Seus dados de contato</h2>

      {/* Nome */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <User size={16} className="text-[#9C958A]" />
          Nome completo
        </label>
        <input
          type="text"
          autoFocus
          placeholder="Seu nome e sobrenome"
          value={nome}
          onChange={(e) => onUpdate('nome', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
            errors.nome ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
          }`}
        />
        {errors.nome && <p className="text-xs text-[#A31631] mt-1">{errors.nome}</p>}
      </div>

      {/* Faixa de faturamento */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <TrendingUp size={16} className="text-[#9C958A]" />
          Faixa de faturamento
        </label>
        <select
          value={faturamento}
          onChange={(e) => onUpdate('faturamento', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors cursor-pointer ${
            errors.faturamento ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
          } ${!faturamento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}
        >
          <option value="">Selecione a faixa</option>
          {FAIXAS_FATURAMENTO.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        {errors.faturamento && <p className="text-xs text-[#A31631] mt-1">{errors.faturamento}</p>}
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
