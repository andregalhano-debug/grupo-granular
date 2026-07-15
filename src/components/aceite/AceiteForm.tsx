import { Link } from 'react-router-dom'
import { Building2, FileText, User, IdCard, Mail, MessageCircle, Loader2, AlertCircle, Cpu, Sparkles, GraduationCap } from 'lucide-react'
import type { TipoContratacao } from '../../types/termosAceite'

interface FormProps {
  form: {
    empresaNome: string; cnpj: string; representanteNome: string; representanteCpf: string
    email: string; whatsapp: string; tipoContratacao: TipoContratacao | null; aceitou: boolean
  }
  errors: { [key: string]: string | undefined }
  isProcessing: boolean
  submitError: string | null
  onUpdate: (field: 'empresaNome' | 'cnpj' | 'representanteNome' | 'representanteCpf' | 'email' | 'whatsapp', value: string) => void
  onSelectTipo: (tipo: TipoContratacao) => void
  onToggleAceite: () => void
  onSubmit: () => void
}

const TIPO_OPTIONS: { id: TipoContratacao; label: string; hint: string; icon: typeof Cpu }[] = [
  { id: 'sistema', label: 'Sistema', hint: 'Gestão operacional via plataforma', icon: Cpu },
  { id: 'especialista', label: 'Especialista', hint: 'Especialista sob demanda', icon: Sparkles },
  { id: 'mentoria', label: 'Mentoria', hint: 'Pacote de mentoria contínua', icon: GraduationCap },
]

export function AceiteForm({ form, errors, isProcessing, submitError, onUpdate, onSelectTipo, onToggleAceite, onSubmit }: FormProps) {
  const ic = (f: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${errors[f] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipo de contratação */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-2">
          O que sua empresa está contratando?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TIPO_OPTIONS.map(({ id, label, hint, icon: Icon }) => {
            const selected = form.tipoContratacao === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectTipo(id)}
                className={`flex flex-col items-center text-center gap-1.5 rounded-xl border px-3 py-4 transition-colors cursor-pointer ${selected ? 'border-[#A31631] bg-[#A31631]/5' : 'border-[#0E0E0F]/12 bg-white hover:border-[#0E0E0F]/25'}`}
              >
                <Icon size={20} className={selected ? 'text-[#A31631]' : 'text-[#9C958A]'} />
                <span className={`text-sm font-semibold ${selected ? 'text-[#A31631]' : 'text-[#0E0E0F]'}`}>{label}</span>
                <span className="text-[11px] text-[#9C958A] leading-tight">{hint}</span>
              </button>
            )
          })}
        </div>
        {errors.tipoContratacao && <p className="text-xs text-[#A31631] mt-1.5">{errors.tipoContratacao}</p>}
      </div>

      {/* Empresa */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Building2 size={15} className="text-[#9C958A]" /> Nome da empresa
        </label>
        <input type="text" placeholder="Razão social ou nome fantasia" value={form.empresaNome}
          onChange={(e) => onUpdate('empresaNome', e.target.value)} className={ic('empresaNome')} />
        {errors.empresaNome && <p className="text-xs text-[#A31631] mt-1">{errors.empresaNome}</p>}
      </div>

      {/* CNPJ */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <FileText size={15} className="text-[#9C958A]" /> CNPJ
        </label>
        <input type="text" inputMode="numeric" placeholder="00.000.000/0000-00" value={form.cnpj}
          onChange={(e) => onUpdate('cnpj', e.target.value)} className={ic('cnpj')} />
        {errors.cnpj && <p className="text-xs text-[#A31631] mt-1">{errors.cnpj}</p>}
      </div>

      {/* Representante */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <User size={15} className="text-[#9C958A]" /> Nome do representante legal
        </label>
        <input type="text" placeholder="Nome completo" value={form.representanteNome}
          onChange={(e) => onUpdate('representanteNome', e.target.value)} className={ic('representanteNome')} />
        {errors.representanteNome && <p className="text-xs text-[#A31631] mt-1">{errors.representanteNome}</p>}
      </div>

      {/* CPF do representante */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <IdCard size={15} className="text-[#9C958A]" /> CPF do representante
        </label>
        <input type="text" inputMode="numeric" placeholder="000.000.000-00" value={form.representanteCpf}
          onChange={(e) => onUpdate('representanteCpf', e.target.value)} className={ic('representanteCpf')} />
        {errors.representanteCpf && <p className="text-xs text-[#A31631] mt-1">{errors.representanteCpf}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Mail size={15} className="text-[#9C958A]" /> E-mail
        </label>
        <input type="email" placeholder="seu@email.com" value={form.email}
          onChange={(e) => onUpdate('email', e.target.value)} className={ic('email')} />
        {errors.email && <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <MessageCircle size={15} className="text-[#25D366]" /> WhatsApp
        </label>
        <input type="tel" placeholder="(11) 99999-9999" value={form.whatsapp}
          onChange={(e) => onUpdate('whatsapp', e.target.value)} className={ic('whatsapp')} />
        {errors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>}
      </div>

      {/* Aceite */}
      <div className={`rounded-xl border p-4 transition-colors ${errors.aceitou ? 'border-[#A31631]' : 'border-[#0E0E0F]/12'}`}>
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <div
            className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors ${form.aceitou ? 'bg-[#A31631] border-[#A31631]' : 'border-[#9C958A]/50 hover:border-[#A31631]/50'}`}
            onClick={onToggleAceite}
          >
            {form.aceitou && <svg width="11" height="9" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <span className="text-sm text-[#0E0E0F] leading-snug" onClick={onToggleAceite}>
            Li e aceito os{' '}
            <Link to="/termos" target="_blank" className="text-[#A31631] hover:underline font-medium">Termos e Condições de Uso</Link>
            {' '}e a{' '}
            <Link to="/privacidade" target="_blank" className="text-[#A31631] hover:underline font-medium">Política de Privacidade</Link>
            {' '}da Granular, em nome da empresa acima.
          </span>
        </label>
        {errors.aceitou && <p className="text-xs text-[#A31631] mt-2 ml-8">{errors.aceitou}</p>}
      </div>

      {submitError && (
        <div className="flex items-start gap-2 rounded-xl bg-[#A31631]/5 border border-[#A31631]/20 px-4 py-3 text-sm text-[#A31631]">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer"
      >
        {isProcessing ? <><Loader2 size={20} className="animate-spin" /> Enviando...</> : 'Confirmar aceite e iniciar'}
      </button>

      <p className="text-xs text-center text-[#9C958A]">
        O aceite fica registrado com data, hora e a versão vigente dos documentos.
      </p>
    </form>
  )
}
