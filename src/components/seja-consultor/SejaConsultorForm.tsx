import { useState } from 'react'
import { User, Mail, MessageCircle, Briefcase, Link2, FileText, Tag, ChevronDown, Plus, Trash2, MapPin, Building2, History, Loader2 } from 'lucide-react'
import { segmentOptions, specialtyOptions } from '../../data/consultants'
import type { HistoricoProfissional } from '../../types/mentor'

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

interface FormProps {
  form: {
    nome: string; email: string; whatsapp: string
    cidade: string; estado: string; linkedin: string
    cargoAtual: string; empresaAtual: string
    segmentos: string[]; especialidades: string[]; especialidadeOutra: string
    historicoProfissional: HistoricoProfissional[]; bio: string
  }
  errors: { [key: string]: string | undefined }
  isProcessing: boolean
  onUpdate: (field: 'nome' | 'email' | 'whatsapp' | 'cidade' | 'estado' | 'linkedin' | 'cargoAtual' | 'empresaAtual' | 'especialidadeOutra' | 'bio', value: string) => void
  onToggleSegment: (seg: string) => void
  onToggleSpecialty: (spec: string) => void
  addHistorico: () => void
  removeHistorico: (id: string) => void
  updateHistorico: (id: string, field: keyof Omit<HistoricoProfissional, 'id'>, value: string) => void
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

function Section({ icon, label, hint, count, error, open, onToggle, children }: {
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

export function SejaConsultorForm({ form, errors, isProcessing, onUpdate, onToggleSegment, onToggleSpecialty, addHistorico, removeHistorico, updateHistorico, onSubmit }: FormProps) {
  const [segOpen, setSegOpen] = useState(false)
  const [specOpen, setSpecOpen] = useState(false)
  const [histOpen, setHistOpen] = useState(true)
  const [bioOpen, setBioOpen] = useState(false)

  const ic = (f: string) => `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${errors[f] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.segmentos.length === 0) setSegOpen(true)
    if (form.especialidades.length === 0) setSpecOpen(true)
    if (errors.historicoProfissional) setHistOpen(true)
    onSubmit()
  }

  const filledHistorico = form.historicoProfissional.filter((h) => h.empresa || h.cargo).length

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Nome */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><User size={15} className="text-[#9C958A]" /> Nome completo</label>
        <input type="text" placeholder="Seu nome e sobrenome" value={form.nome} onChange={(e) => onUpdate('nome', e.target.value)} className={ic('nome')} />
        {errors.nome && <p className="text-xs text-[#A31631] mt-1">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><Mail size={15} className="text-[#9C958A]" /> E-mail</label>
        <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => onUpdate('email', e.target.value)} className={ic('email')} />
        {errors.email && <p className="text-xs text-[#A31631] mt-1">{errors.email}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><MessageCircle size={15} className="text-[#25D366]" /> WhatsApp</label>
        <input type="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => onUpdate('whatsapp', e.target.value)} className={ic('whatsapp')} />
        {errors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{errors.whatsapp}</p>}
      </div>

      {/* Cidade + Estado */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><MapPin size={15} className="text-[#9C958A]" /> Cidade</label>
          <input type="text" placeholder="São Paulo" value={form.cidade} onChange={(e) => onUpdate('cidade', e.target.value)} className={ic('cidade')} />
          {errors.cidade && <p className="text-xs text-[#A31631] mt-1">{errors.cidade}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-[#0E0E0F] mb-1.5 block">Estado</label>
          <select value={form.estado} onChange={(e) => onUpdate('estado', e.target.value)} className={`${ic('estado')} cursor-pointer`}>
            <option value="">UF</option>
            {ESTADOS_BR.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </div>
      </div>

      {/* Cargo atual */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><Briefcase size={15} className="text-[#9C958A]" /> Cargo atual</label>
        <input type="text" placeholder="Ex: Diretor de Operações" value={form.cargoAtual} onChange={(e) => onUpdate('cargoAtual', e.target.value)} className={ic('cargoAtual')} />
        {errors.cargoAtual && <p className="text-xs text-[#A31631] mt-1">{errors.cargoAtual}</p>}
      </div>

      {/* Empresa atual (opcional) */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5">
          <Building2 size={15} className="text-[#9C958A]" /> Empresa atual <span className="text-xs text-[#9C958A] font-normal">(opcional)</span>
        </label>
        <input type="text" placeholder="Nome da empresa" value={form.empresaAtual} onChange={(e) => onUpdate('empresaAtual', e.target.value)} className={ic('empresaAtual')} />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><Link2 size={15} className="text-[#9C958A]" /> LinkedIn</label>
        <input type="url" placeholder="https://linkedin.com/in/seu-perfil" value={form.linkedin} onChange={(e) => onUpdate('linkedin', e.target.value)} className={ic('linkedin')} />
        {errors.linkedin && <p className="text-xs text-[#A31631] mt-1">{errors.linkedin}</p>}
      </div>

      {/* Segmentos */}
      <Section icon={<Tag size={15} className="text-[#9C958A]" />} label="Segmentos de atuação" hint="Selecione os mercados em que tem experiência" count={form.segmentos.length} error={errors.segmentos} open={segOpen} onToggle={() => setSegOpen((v) => !v)}>
        <div className="flex flex-col gap-2">
          {segmentOptions.map((opt) => (
            <CheckboxItem key={opt.id} id={`seg-${opt.id}`} label={opt.label} checked={form.segmentos.includes(opt.id)} onToggle={() => onToggleSegment(opt.id)} />
          ))}
        </div>
      </Section>

      {/* Especialidades */}
      <Section icon={<Briefcase size={15} className="text-[#9C958A]" />} label="Especialidades" hint="Selecione as áreas funcionais em que pode orientar" count={form.especialidades.length} error={errors.especialidades} open={specOpen} onToggle={() => setSpecOpen((v) => !v)}>
        <div className="flex flex-col gap-2">
          {specialtyOptions.map((opt) => (
            <CheckboxItem key={opt.id} id={`spec-${opt.id}`} label={opt.label} checked={form.especialidades.includes(opt.id)} onToggle={() => onToggleSpecialty(opt.id)} />
          ))}
        </div>
        {form.especialidades.includes('outros') && (
          <div className="mt-3">
            <input type="text" placeholder="Descreva sua especialidade" value={form.especialidadeOutra} onChange={(e) => onUpdate('especialidadeOutra', e.target.value)} className={ic('especialidadeOutra')} />
            {errors.especialidadeOutra && <p className="text-xs text-[#A31631] mt-1">{errors.especialidadeOutra}</p>}
          </div>
        )}
      </Section>

      {/* Histórico profissional */}
      <Section icon={<History size={15} className="text-[#9C958A]" />} label="Histórico profissional" hint="Adicione suas experiências — quanto mais completo, maior sua visibilidade" count={filledHistorico} error={errors.historicoProfissional} open={histOpen} onToggle={() => setHistOpen((v) => !v)}>
        <div className="space-y-4">
          {form.historicoProfissional.map((h, idx) => (
            <div key={h.id} className="rounded-xl border border-[#0E0E0F]/10 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Experiência {idx + 1}</span>
                {form.historicoProfissional.length > 1 && (
                  <button type="button" onClick={() => removeHistorico(h.id)} className="p-1 rounded text-[#9C958A] hover:text-red-500 transition-colors cursor-pointer"><Trash2 size={14} /></button>
                )}
              </div>
              <input type="text" placeholder="Empresa" value={h.empresa} onChange={(e) => updateHistorico(h.id, 'empresa', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white" />
              <input type="text" placeholder="Cargo" value={h.cargo} onChange={(e) => updateHistorico(h.id, 'cargo', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Início (MM/AAAA)" value={h.inicio} onChange={(e) => updateHistorico(h.id, 'inicio', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white" />
                <input type="text" placeholder='Saída (MM/AAAA ou "atual")' value={h.fim} onChange={(e) => updateHistorico(h.id, 'fim', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white" />
              </div>
            </div>
          ))}
          <button type="button" onClick={addHistorico} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-[#A31631]/30 text-sm text-[#A31631] hover:bg-[#A31631]/5 transition-colors cursor-pointer">
            <Plus size={15} /> Adicionar experiência
          </button>
        </div>
      </Section>

      {/* Bio (opcional) */}
      <Section icon={<FileText size={15} className="text-[#9C958A]" />} label="Sobre você" hint="Uma apresentação que aparecerá no seu perfil público (opcional)" open={bioOpen} onToggle={() => setBioOpen((v) => !v)}>
        <textarea rows={4} placeholder="Descreva sua trajetória, resultados que entregou e como pode ajudar operações..." value={form.bio} onChange={(e) => onUpdate('bio', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#0E0E0F]/15 text-sm bg-white outline-none focus:border-[#A31631] resize-none" />
      </Section>

      <button type="submit" disabled={isProcessing} className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-70 text-white font-medium py-4 px-8 rounded-xl text-base transition-colors cursor-pointer">
        {isProcessing ? <><Loader2 size={20} className="animate-spin" /> Enviando...</> : 'Enviar candidatura'}
      </button>

      <p className="text-xs text-center text-[#9C958A]">Nossa equipe analisa cada candidatura e entra em contato em até 3 dias úteis.</p>
    </form>
  )
}
