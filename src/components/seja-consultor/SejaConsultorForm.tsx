import { useState } from 'react'
import { User, Mail, MessageCircle, Briefcase, Clock, Link2, FileText, Tag, ChevronDown } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { segmentOptions, specialtyOptions } from '../../data/consultants'

interface SejaConsultorFormProps {
  form: {
    nome: string; email: string; whatsapp: string
    segments: string[]; specialties: string[]; specialtyOther: string
    experienceYears: string; linkedin: string; bio: string
  }
  errors: { [key: string]: string | undefined }
  isProcessing: boolean
  onUpdate: (field: 'nome' | 'email' | 'whatsapp' | 'specialtyOther' | 'experienceYears' | 'linkedin' | 'bio', value: string) => void
  onToggleSegment: (seg: string) => void
  onToggleSpecialty: (spec: string) => void
  onSubmit: () => void
}

function CheckboxItem({ id, label, checked, onToggle }: { id: string; label: string; checked: boolean; onToggle: () => void }) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors select-none text-sm ${
        checked
          ? 'border-[#A31631]/40 bg-[#A31631]/5 text-[#A31631] font-medium'
          : 'border-[#0E0E0F]/12 bg-white text-[#0E0E0F] hover:border-[#0E0E0F]/25'
      }`}
    >
      <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
        checked ? 'bg-[#A31631] border-[#A31631]' : 'border-[#9C958A]/50'
      }`}>
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span>{label}</span>
    </label>
  )
}

function CollapsibleField({
  icon, label, hint, count, error, open, onToggle, children,
}: {
  icon: React.ReactNode
  label: string
  hint: string
  count: number
  error?: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-xl border transition-colors ${error ? 'border-[#A31631]' : open ? 'border-[#0E0E0F]/20' : 'border-[#0E0E0F]/12'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <span className="text-sm font-medium text-[#0E0E0F]">{label}</span>
          {count > 0 && (
            <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#A31631] text-white text-[10px] font-bold">
              {count}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {count === 0 && !open && (
            <span className="text-xs text-[#9C958A]">{hint}</span>
          )}
          <ChevronDown size={16} className={`text-[#9C958A] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-[#0E0E0F]/8">
          <p className="text-xs text-[#9C958A] mt-3 mb-3">{hint}</p>
          {children}
        </div>
      )}
      {error && <p className="text-xs text-[#A31631] px-4 pb-3">{error}</p>}
    </div>
  )
}

export function SejaConsultorForm({ form, errors, isProcessing, onUpdate, onToggleSegment, onToggleSpecialty, onSubmit }: SejaConsultorFormProps) {
  const [segOpen, setSegOpen] = useState(false)
  const [specOpen, setSpecOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  // Ao enviar com erro, abre o painel que tem erro
  const handleSubmitWithExpand = (e: React.FormEvent) => {
    handleSubmit(e)
    if (form.segments.length === 0) setSegOpen(true)
    if (form.specialties.length === 0) setSpecOpen(true)
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
      errors[field] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
    }`

  return (
    <form onSubmit={handleSubmitWithExpand} className="space-y-5">
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
          <Mail size={16} className="text-[#9C958A]" /> E-mail
        </label>
        <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => onUpdate('email', e.target.value)} className={inputClass('email')} />
        {errors.email && <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp
        </label>
        <input type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => onUpdate('whatsapp', e.target.value)} className={inputClass('whatsapp')} />
        {errors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>}
      </div>

      {/* Categorias (segmentos) — recolhido */}
      <CollapsibleField
        icon={<Tag size={16} className="text-[#9C958A]" />}
        label="Categoria"
        hint="Selecione os segmentos em que atua"
        count={form.segments.length}
        error={errors.segments}
        open={segOpen}
        onToggle={() => setSegOpen((v) => !v)}
      >
        <div className="flex flex-col gap-2">
          {segmentOptions.map((opt) => (
            <CheckboxItem
              key={opt.id}
              id={`seg-${opt.id}`}
              label={opt.label}
              checked={form.segments.includes(opt.id)}
              onToggle={() => onToggleSegment(opt.id)}
            />
          ))}
        </div>
      </CollapsibleField>

      {/* Especialidades (funcionais) — recolhido */}
      <CollapsibleField
        icon={<Briefcase size={16} className="text-[#9C958A]" />}
        label="Especialidade"
        hint="Selecione as áreas em que pode orientar"
        count={form.specialties.length}
        error={errors.specialties}
        open={specOpen}
        onToggle={() => setSpecOpen((v) => !v)}
      >
        <div className="flex flex-col gap-2">
          {specialtyOptions.map((opt) => (
            <CheckboxItem
              key={opt.id}
              id={`spec-${opt.id}`}
              label={opt.label}
              checked={form.specialties.includes(opt.id)}
              onToggle={() => onToggleSpecialty(opt.id)}
            />
          ))}
        </div>
        {form.specialties.includes('outros') && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Descreva sua especialidade"
              value={form.specialtyOther}
              onChange={(e) => onUpdate('specialtyOther', e.target.value)}
              className={inputClass('specialtyOther')}
            />
            {errors.specialtyOther && <p className="text-xs text-[#A31631] mt-1">{errors.specialtyOther}</p>}
          </div>
        )}
      </CollapsibleField>

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
          <Link2 size={16} className="text-[#9C958A]" /> LinkedIn
        </label>
        <input type="url" placeholder="https://linkedin.com/in/seu-perfil" value={form.linkedin} onChange={(e) => onUpdate('linkedin', e.target.value)} className={inputClass('linkedin')} />
        {errors.linkedin && <p className="text-xs text-[#A31631] mt-1">{errors.linkedin}</p>}
      </div>

      {/* Bio */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <FileText size={16} className="text-[#9C958A]" /> Sobre você <span className="text-xs text-[#9C958A]">(opcional)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Descreva sua experiência profissional, empresas onde atuou e como pode ajudar operações..."
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
