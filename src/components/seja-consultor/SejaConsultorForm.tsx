import { User, Mail, MessageCircle, Briefcase, Clock, Link2, FileText } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { consultantCategories } from '../../data/consultants'

interface SejaConsultorFormProps {
  form: {
    nome: string; email: string; whatsapp: string; specialty: string
    experienceYears: string; linkedin: string; bio: string
  }
  errors: { [key: string]: string | undefined }
  isProcessing: boolean
  onUpdate: (field: 'nome' | 'email' | 'whatsapp' | 'specialty' | 'experienceYears' | 'linkedin' | 'bio', value: string) => void
  onSubmit: () => void
}

export function SejaConsultorForm({ form, errors, isProcessing, onUpdate, onSubmit }: SejaConsultorFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
      errors[field] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <User size={16} className="text-[#9C958A]" /> Nome completo
        </label>
        <input type="text" placeholder="Seu nome e sobrenome" value={form.nome} onChange={(e) => onUpdate('nome', e.target.value)} className={inputClass('nome')} />
        {errors.nome && <p className="text-xs text-[#A31631] mt-1">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Mail size={16} className="text-[#9C958A]" /> E-mail Google <span className="text-xs text-[#A31631]">*obrigatório</span>
        </label>
        <input type="email" placeholder="seu@gmail.com" value={form.email} onChange={(e) => onUpdate('email', e.target.value)} className={inputClass('email')} />
        {errors.email ? (
          <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>
        ) : (
          <p className="text-xs text-[#9C958A] mt-1">Necessário para integração com Google Calendar</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp
        </label>
        <input type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => onUpdate('whatsapp', e.target.value)} className={inputClass('whatsapp')} />
        {errors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>}
      </div>

      {/* Especialidade */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Briefcase size={16} className="text-[#9C958A]" /> Especialidade
        </label>
        <select value={form.specialty} onChange={(e) => onUpdate('specialty', e.target.value)} className={inputClass('specialty')}>
          <option value="">Selecione sua área</option>
          {consultantCategories.filter((c) => c.id !== null).map((cat) => (
            <option key={cat.id} value={cat.id!}>{cat.label}</option>
          ))}
        </select>
        {errors.specialty && <p className="text-xs text-[#A31631] mt-1">{errors.specialty}</p>}
      </div>

      {/* Anos de experiência */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Clock size={16} className="text-[#9C958A]" /> Anos de experiência
        </label>
        <input type="number" min="1" placeholder="Ex: 5" value={form.experienceYears} onChange={(e) => onUpdate('experienceYears', e.target.value)} className={inputClass('experienceYears')} />
        {errors.experienceYears && <p className="text-xs text-[#A31631] mt-1">{errors.experienceYears}</p>}
      </div>

      {/* LinkedIn */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Link2 size={16} className="text-[#9C958A]" /> LinkedIn <span className="text-xs text-[#9C958A]">(opcional)</span>
        </label>
        <input type="url" placeholder="https://linkedin.com/in/seu-perfil" value={form.linkedin} onChange={(e) => onUpdate('linkedin', e.target.value)} className={inputClass('linkedin')} />
      </div>

      {/* Bio */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <FileText size={16} className="text-[#9C958A]" /> Sobre você
        </label>
        <textarea
          rows={4}
          placeholder="Descreva sua experiência profissional, empresas onde atuou e como pode ajudar operações de delivery..."
          value={form.bio}
          onChange={(e) => onUpdate('bio', e.target.value)}
          className={`${inputClass('bio')} resize-none`}
        />
        {errors.bio && <p className="text-xs text-[#A31631] mt-1">{errors.bio}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
      >
        {isProcessing ? (
          <><Loader2 size={20} className="animate-spin" /> Enviando...</>
        ) : (
          'Enviar candidatura'
        )}
      </button>
    </form>
  )
}
