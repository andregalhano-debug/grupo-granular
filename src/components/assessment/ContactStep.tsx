import { User, Mail, MessageCircle, Link2, ChevronRight } from 'lucide-react'
import { FadeIn } from '../FadeIn'
import type { ContactData } from '../../hooks/useAssessment'

interface Props {
  contact: ContactData
  errors: Record<string, string>
  onUpdate: (field: keyof ContactData, value: string) => void
  onNext: () => void
}

export function ContactStep({ contact, errors, onUpdate, onNext }: Props) {
  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
      errors[field] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
    }`

  return (
    <FadeIn>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#A31631]/10 text-[#A31631] px-4 py-2 rounded-full text-xs font-medium mb-5 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Avaliação de perfil
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-3">
          Descubra seu perfil de consultor
        </h1>
        <p className="text-sm text-[#9C958A]">
          Precisamos de alguns dados antes de começar. Em 3 minutos identificamos suas forças.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
            <User size={16} className="text-[#9C958A]" /> Nome completo
          </label>
          <input type="text" placeholder="Seu nome" value={contact.nome} onChange={(e) => onUpdate('nome', e.target.value)} className={inputClass('nome')} />
          {errors.nome && <p className="text-xs text-[#A31631] mt-1">{errors.nome}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
            <Mail size={16} className="text-[#9C958A]" /> E-mail
          </label>
          <input type="email" placeholder="seu@email.com" value={contact.email} onChange={(e) => onUpdate('email', e.target.value)} className={inputClass('email')} />
          {errors.email && <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
            <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp
          </label>
          <input type="tel" placeholder="(11) 99999-9999" value={contact.whatsapp} onChange={(e) => onUpdate('whatsapp', e.target.value)} className={inputClass('whatsapp')} />
          {errors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
            <Link2 size={16} className="text-[#9C958A]" /> LinkedIn <span className="text-xs text-[#9C958A]">(opcional)</span>
          </label>
          <input type="url" placeholder="https://linkedin.com/in/seu-perfil" value={contact.linkedin} onChange={(e) => onUpdate('linkedin', e.target.value)} className={inputClass('linkedin')} />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-4 rounded-xl text-base transition-colors cursor-pointer mt-6"
        >
          Começar avaliação <ChevronRight size={18} />
        </button>
      </div>
    </FadeIn>
  )
}
