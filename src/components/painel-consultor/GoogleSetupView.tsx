import { useState, useEffect } from 'react'
import { Mail, Check, ChevronRight, AlertCircle, Video, Calendar, Shield, User, MessageCircle, Link2, Briefcase, Clock, FileText, Save } from 'lucide-react'

const GOOGLE_EMAIL_KEY = 'granular-mentor-google-email'
const REGISTRATION_KEY = 'granular-consultant-registration'

interface MentorData {
  nome: string
  email: string
  whatsapp: string
  linkedin: string
  specialty: string
  experienceYears: string
  bio: string
}

function loadGoogleEmail(): string {
  return localStorage.getItem(GOOGLE_EMAIL_KEY) || ''
}

function saveGoogleEmail(email: string) {
  localStorage.setItem(GOOGLE_EMAIL_KEY, email)
}

function loadMentorData(): MentorData {
  try {
    const raw = localStorage.getItem(REGISTRATION_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { nome: '', email: '', whatsapp: '', linkedin: '', specialty: '', experienceYears: '', bio: '' }
}

function saveMentorData(data: MentorData) {
  localStorage.setItem(REGISTRATION_KEY, JSON.stringify(data))
}

const specialtyLabels: Record<string, string> = {
  operacao: 'Operação',
  financeiro: 'Financeiro',
  marketing: 'Marketing Digital',
  cardapio: 'Cardápio',
  ifood: 'iFood',
  rh: 'Recursos Humanos',
}

/* ── Seção: Meus Dados ── */

function MeusDadosSection() {
  const [data, setData] = useState<MentorData>(loadMentorData)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const hasData = !!data.nome

  const handleSave = () => {
    saveMentorData(data)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-sm bg-white outline-none transition-colors focus:border-[#A31631]'

  if (!hasData && !editing) {
    return (
      <div className="rounded-2xl border border-dashed border-[#9C958A]/30 bg-[#F7F7F7] p-6 text-center">
        <User size={28} className="mx-auto text-[#9C958A]/40 mb-3" />
        <p className="text-sm text-[#9C958A] mb-3">Nenhum dado cadastrado ainda.</p>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-sm font-medium text-[#A31631] hover:underline cursor-pointer"
        >
          Preencher meus dados
        </button>
      </div>
    )
  }

  if (!editing) {
    return (
      <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <User size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Meus Dados</h3>
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs font-medium text-[#A31631] hover:bg-[#A31631]/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Editar
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <InfoRow icon={<User size={14} />} label="Nome" value={data.nome} />
          <InfoRow icon={<Mail size={14} />} label="E-mail" value={data.email} />
          <InfoRow icon={<MessageCircle size={14} />} label="WhatsApp" value={data.whatsapp} />
          <InfoRow icon={<Link2 size={14} />} label="LinkedIn" value={data.linkedin ? data.linkedin.replace('https://', '').replace('www.', '') : '—'} />
          <InfoRow icon={<Briefcase size={14} />} label="Especialidade" value={specialtyLabels[data.specialty] || data.specialty || '—'} />
          <InfoRow icon={<Clock size={14} />} label="Experiência" value={data.experienceYears ? `${data.experienceYears} anos` : '—'} />
        </div>

        {data.bio && (
          <div className="mt-4 pt-4 border-t border-[#0E0E0F]/5">
            <div className="flex items-center gap-1.5 text-[#9C958A] mb-1.5">
              <FileText size={14} />
              <span className="text-[10px] font-medium uppercase tracking-wider">Sobre</span>
            </div>
            <p className="text-xs text-[#0E0E0F]/70 leading-relaxed">{data.bio}</p>
          </div>
        )}

        {saved && (
          <div className="mt-4 flex items-center gap-2 text-xs text-green-600 font-medium">
            <Check size={14} /> Dados salvos com sucesso
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#A31631]/15 bg-white p-6">
      <div className="flex items-center gap-2 mb-5">
        <User size={18} className="text-[#A31631]" />
        <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Editar Dados</h3>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[#9C958A] mb-1 block">Nome completo</label>
            <input type="text" value={data.nome} onChange={(e) => setData({ ...data, nome: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-[#9C958A] mb-1 block">E-mail</label>
            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-[#9C958A] mb-1 block">WhatsApp</label>
            <input type="tel" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-[#9C958A] mb-1 block">LinkedIn</label>
            <input type="url" value={data.linkedin} onChange={(e) => setData({ ...data, linkedin: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-[#9C958A] mb-1 block">Especialidade</label>
            <select value={data.specialty} onChange={(e) => setData({ ...data, specialty: e.target.value })} className={inputClass}>
              <option value="">Selecione</option>
              {Object.entries(specialtyLabels).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[#9C958A] mb-1 block">Anos de experiência</label>
            <input type="number" min="1" value={data.experienceYears} onChange={(e) => setData({ ...data, experienceYears: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-[#9C958A] mb-1 block">Sobre você (opcional)</label>
          <textarea rows={3} value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleSave} className="flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer">
            <Save size={16} /> Salvar dados
          </button>
          <button type="button" onClick={() => { setData(loadMentorData()); setEditing(false) }} className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[#9C958A] mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider">{label}</p>
        <p className="text-sm text-[#0E0E0F]">{value || '—'}</p>
      </div>
    </div>
  )
}

/* ── Seção: Google Email ── */

function GoogleEmailSection() {
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    const stored = loadGoogleEmail()
    if (stored) { setEmail(stored); setSaved(true) }
  }, [])

  const handleSave = () => {
    const trimmed = email.trim()
    if (!trimmed) { setError('Informe seu e-mail'); return }
    if (!trimmed.includes('@')) { setError('Informe um e-mail válido'); return }
    setError('')
    saveGoogleEmail(trimmed)
    setSaved(true)
  }

  return (
    <>
      <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#A31631]/10 flex items-center justify-center">
            <Mail size={22} className="text-[#A31631]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0E0E0F]">E-mail Google</h3>
            <p className="text-xs text-[#9C958A]">Necessário para Google Calendar e Google Meet</p>
          </div>
        </div>

        {saved ? (
          <div className="flex items-center justify-between rounded-xl bg-green-50 border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">{email}</p>
                <p className="text-xs text-green-600">Conectado</p>
              </div>
            </div>
            <button type="button" onClick={() => setSaved(false)} className="text-xs font-medium text-green-700 hover:text-green-900 transition-colors cursor-pointer">Alterar</button>
          </div>
        ) : (
          <div className="space-y-3">
            <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }}
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${error ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'}`} />
            {error && <p className="text-xs text-[#A31631] mt-1">{error}</p>}
            <button type="button" onClick={handleSave} className="flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer">
              Salvar e-mail <ChevronRight size={16} />
            </button>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          <div className="flex items-center gap-2 text-xs text-[#9C958A]"><Calendar size={14} className="text-[#A31631] flex-shrink-0" />Google Calendar</div>
          <div className="flex items-center gap-2 text-xs text-[#9C958A]"><Video size={14} className="text-[#A31631] flex-shrink-0" />Google Meet</div>
          <div className="flex items-center gap-2 text-xs text-[#9C958A]"><Shield size={14} className="text-[#A31631] flex-shrink-0" />Dados protegidos</div>
        </div>
      </div>

      {/* Guia Google */}
      <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white overflow-hidden">
        <button type="button" onClick={() => setShowGuide(!showGuide)} className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-[#F7F7F7]/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center"><AlertCircle size={22} className="text-amber-600" /></div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-[#0E0E0F]">Não tem uma conta Google?</h3>
              <p className="text-xs text-[#9C958A]">Veja como criar gratuitamente ou usar seu e-mail atual com o Google</p>
            </div>
          </div>
          <ChevronRight size={18} className={`text-[#9C958A] transition-transform ${showGuide ? 'rotate-90' : ''}`} />
        </button>

        {showGuide && (
          <div className="px-6 pb-6 border-t border-[#0E0E0F]/5 pt-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#A31631] text-white text-xs font-bold flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold text-[#0E0E0F]">Criar uma nova conta Gmail</h4>
              </div>
              <ol className="space-y-2 ml-8">
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#A31631] font-bold">1.</span>Acesse <strong>accounts.google.com/signup</strong></li>
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#A31631] font-bold">2.</span>Preencha nome, usuário e senha</li>
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#A31631] font-bold">3.</span>Confirme o telefone (SMS)</li>
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#A31631] font-bold">4.</span>Pronto! Seu @gmail.com já funciona</li>
              </ol>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#0E0E0F] text-white text-xs font-bold flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold text-[#0E0E0F]">Usar seu e-mail atual como conta Google</h4>
              </div>
              <div className="rounded-xl bg-[#F7F7F7] p-4 ml-8 mb-3">
                <p className="text-xs text-[#0E0E0F]/70 leading-relaxed">Crie uma conta Google <strong>usando qualquer e-mail</strong> (Outlook, Yahoo, corporativo) sem criar um Gmail novo.</p>
              </div>
              <ol className="space-y-2 ml-8">
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#0E0E0F] font-bold">1.</span>Acesse <strong>accounts.google.com/signup</strong></li>
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#0E0E0F] font-bold">2.</span>Clique em <strong>"Usar meu endereço de e-mail atual"</strong></li>
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#0E0E0F] font-bold">3.</span>Insira seu e-mail existente</li>
                <li className="text-xs text-[#0E0E0F]/70 flex items-start gap-2"><span className="text-[#0E0E0F] font-bold">4.</span>Confirme o código enviado por e-mail</li>
              </ol>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 ml-8 mt-3">
                <p className="text-xs text-amber-700"><strong>Importante:</strong> Na Granular, informe o @gmail.com associado à conta.</p>
              </div>
            </div>
            <div className="rounded-xl bg-[#A31631]/5 border border-[#A31631]/10 p-4">
              <p className="text-xs text-[#0E0E0F] leading-relaxed"><strong>Dica:</strong> Crie um <strong>seunome.granular@gmail.com</strong> dedicado para separar agenda pessoal da profissional.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/* ── Componente principal ── */

export function GoogleSetupView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Configurações</h2>
        <p className="text-sm text-[#9C958A]">Gerencie seus dados pessoais e integrações.</p>
      </div>

      {/* Meus Dados */}
      <MeusDadosSection />

      {/* Separador */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#0E0E0F]/10" />
        <span className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider">Integrações</span>
        <div className="flex-1 h-px bg-[#0E0E0F]/10" />
      </div>

      {/* Google Email */}
      <GoogleEmailSection />
    </div>
  )
}
