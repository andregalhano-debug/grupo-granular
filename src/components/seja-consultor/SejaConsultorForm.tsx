import { useState, useRef, useEffect } from 'react'
import { User, Mail, MessageCircle, Briefcase, Tag, ChevronDown, Loader2, ShieldCheck, ChevronUp } from 'lucide-react'
import { segmentOptions, specialtyOptions } from '../../data/consultants'
import { useT } from '../../i18n/useT'

interface FormProps {
  form: {
    nome: string; email: string; whatsapp: string
    cargoAtual: string
    segmentos: string[]; segmentoOutro: string; especialidades: string[]; especialidadeOutra: string
  }
  errors: { [key: string]: string | undefined }
  isProcessing: boolean
  onUpdate: (field: 'nome' | 'email' | 'whatsapp' | 'cargoAtual' | 'segmentoOutro' | 'especialidadeOutra', value: string) => void
  onToggleSegment: (seg: string) => void
  onToggleSpecialty: (spec: string) => void
  onSubmit: () => void
}

function CheckboxItem({ id, label, checked, onToggle }: { id: string; label: string; checked: boolean; onToggle: () => void }) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors select-none text-sm ${checked ? 'border-[#A31631]/40 bg-[#A31631]/5 text-[#A31631] font-medium' : 'border-[#0E0E0F]/12 bg-white text-[#0E0E0F] hover:border-[#0E0E0F]/25'}`}>
      <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${checked ? 'bg-[#A31631] border-[#A31631]' : 'border-[#9C958A]/50'}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span>{label}</span>
    </label>
  )
}

function CollapsibleField({ icon, label, hint, count, error, open, onToggle, children }: {
  icon: React.ReactNode; label: string; hint: string; count?: number
  error?: string; open: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <div className={`rounded-xl border transition-colors ${error ? 'border-[#A31631]' : open ? 'border-[#0E0E0F]/20' : 'border-[#0E0E0F]/12'}`}>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <span className="text-sm font-medium text-[#0E0E0F]">{label}</span>
          {count !== undefined && count > 0 && (
            <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#A31631] text-white text-[10px] font-bold">{count}</span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {(count === undefined || count === 0) && !open && <span className="text-xs text-[#9C958A]">{hint}</span>}
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


export function SejaConsultorForm({ form, errors, isProcessing, onUpdate, onToggleSegment, onToggleSpecialty, onSubmit }: FormProps) {
  const { sejaConsultor: { form: tf } } = useT()
  const [openField, setOpenField] = useState<'seg' | 'spec' | 'termos' | null>(null)
  const segOpen = openField === 'seg'
  const specOpen = openField === 'spec'
  const termosOpen = openField === 'termos'
  const segRef = useRef<HTMLDivElement>(null)
  const specRef = useRef<HTMLDivElement>(null)
  const termosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openField) return
    const ref = openField === 'seg' ? segRef : openField === 'spec' ? specRef : termosRef
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [openField])

  const setSegOpen = (v: boolean) => setOpenField(v ? 'seg' : null)
  const setSpecOpen = (v: boolean) => setOpenField(v ? 'spec' : null)
  const setTermosOpen = (v: boolean) => setOpenField(v ? 'termos' : null)
  const [termosAceitos, setTermosAceitos] = useState(false)
  const [termosError, setTermosError] = useState(false)

  const ic = (f: string) => `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${errors[f] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.segmentos.length === 0) setSegOpen(true)
    if (form.especialidades.length === 0) setSpecOpen(true)
    if (!termosAceitos) {
      setTermosError(true)
      return
    }
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Nome */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><User size={15} className="text-[#9C958A]" /> {tf.fullName}</label>
        <input type="text" placeholder={tf.namePlaceholder} value={form.nome} onChange={(e) => onUpdate('nome', e.target.value)} className={ic('nome')} />
        {errors.nome && <p className="text-xs text-[#A31631] mt-1">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><Mail size={15} className="text-[#9C958A]" /> {tf.email}</label>
        <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => onUpdate('email', e.target.value)} className={ic('email')} />
        {errors.email && <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><MessageCircle size={15} className="text-[#25D366]" /> {tf.whatsapp}</label>
        <input type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => onUpdate('whatsapp', e.target.value)} className={ic('whatsapp')} />
        {errors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>}
      </div>

      {/* Cargo atual */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><Briefcase size={15} className="text-[#9C958A]" /> {tf.currentRole}</label>
        <input type="text" placeholder={tf.rolePlaceholder} value={form.cargoAtual} onChange={(e) => onUpdate('cargoAtual', e.target.value)} className={ic('cargoAtual')} />
        {errors.cargoAtual && <p className="text-xs text-[#A31631] mt-1">{errors.cargoAtual}</p>}
      </div>

      {/* Segmentos */}
      <div ref={segRef}><CollapsibleField icon={<Tag size={15} className="text-[#9C958A]" />} label={tf.segments} hint={tf.segmentsHint} count={form.segmentos.length} error={errors.segmentos} open={segOpen} onToggle={() => setSegOpen(!segOpen)}>
        <div className="flex flex-col gap-2">
          {segmentOptions.map((opt) => (
            <CheckboxItem key={opt.id} id={`seg-${opt.id}`} label={tf.segmentLabels[opt.id] || opt.label} checked={form.segmentos.includes(opt.id)} onToggle={() => onToggleSegment(opt.id)} />
          ))}
        </div>
        {form.segmentos.includes('outros') && (
          <div className="mt-3">
            <input type="text" placeholder={tf.segmentOtherPlaceholder} value={form.segmentoOutro} onChange={(e) => onUpdate('segmentoOutro', e.target.value)} className={ic('segmentoOutro')} />
            {errors.segmentoOutro && <p className="text-xs text-[#A31631] mt-1">{errors.segmentoOutro}</p>}
          </div>
        )}
      </CollapsibleField></div>

      {/* Especialidades */}
      <div ref={specRef}><CollapsibleField icon={<Briefcase size={15} className="text-[#9C958A]" />} label={tf.specialties} hint={tf.specialtiesHint} count={form.especialidades.length} error={errors.especialidades} open={specOpen} onToggle={() => setSpecOpen(!specOpen)}>
        <div className="flex flex-col gap-2">
          {specialtyOptions.map((opt) => (
            <CheckboxItem key={opt.id} id={`spec-${opt.id}`} label={tf.specialtyLabels[opt.id] || opt.label} checked={form.especialidades.includes(opt.id)} onToggle={() => onToggleSpecialty(opt.id)} />
          ))}
        </div>
        {form.especialidades.includes('outros') && (
          <div className="mt-3">
            <input type="text" placeholder={tf.specialtyOtherPlaceholder} value={form.especialidadeOutra} onChange={(e) => onUpdate('especialidadeOutra', e.target.value)} className={ic('especialidadeOutra')} />
            {errors.especialidadeOutra && <p className="text-xs text-[#A31631] mt-1">{errors.especialidadeOutra}</p>}
          </div>
        )}
      </CollapsibleField></div>

      {/* Compliance */}
      <div ref={termosRef} className={`rounded-xl border transition-colors ${termosError ? 'border-[#A31631]' : 'border-[#0E0E0F]/12'}`}>
        <button
          type="button"
          onClick={() => setTermosOpen(!termosOpen)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className={termosAceitos ? 'text-emerald-500' : 'text-[#9C958A]'} />
            <span className="text-sm font-medium text-[#0E0E0F]">{tf.termsTitle}</span>
            {termosAceitos && (
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">{tf.termsAccepted}</span>
            )}
          </div>
          {termosOpen ? <ChevronUp size={16} className="text-[#9C958A] flex-shrink-0" /> : <ChevronDown size={16} className="text-[#9C958A] flex-shrink-0" />}
        </button>

        {termosOpen && (
          <div className="px-4 pb-4 border-t border-[#0E0E0F]/8">
            <div className="mt-3 mb-4 rounded-xl bg-[#F7F7F7] p-4 max-h-48 overflow-y-auto">
              {tf.termsText.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-xs text-[#9C958A] leading-relaxed mb-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors ${termosAceitos ? 'bg-[#A31631] border-[#A31631]' : 'border-[#9C958A]/50 hover:border-[#A31631]/50'}`}
                onClick={() => { setTermosAceitos((v) => !v); setTermosError(false) }}
              >
                {termosAceitos && <svg width="11" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span className="text-sm text-[#0E0E0F] leading-snug" onClick={() => { setTermosAceitos((v) => !v); setTermosError(false) }}>
                {tf.termsCheckbox}
              </span>
            </label>
          </div>
        )}

        {termosError && (
          <p className="text-xs text-[#A31631] px-4 pb-3">
            {tf.termsError}
          </p>
        )}
      </div>

      {/* Aviso: perfil completo após cadastro */}
      <div className="rounded-xl bg-[#F7F7F7] border border-[#0E0E0F]/8 px-4 py-3 text-xs text-[#9C958A] leading-relaxed">
        {tf.confirmationNote}
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
      >
        {isProcessing ? <><Loader2 size={20} className="animate-spin" /> {tf.submitting}</> : tf.submitButton}
      </button>

      <p className="text-xs text-center text-[#9C958A]">{tf.reviewNote}</p>
    </form>
  )
}
