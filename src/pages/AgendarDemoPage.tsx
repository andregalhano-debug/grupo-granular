import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, CheckCircle2, Send } from 'lucide-react'
import { GranularLogo } from '../components/GranularLogo'
import { saveDemoBooking } from '../data/demoSlots'

const SEGMENTOS = [
  'Restaurante',
  'Mercado',
  'Atacado',
  'Atacarejo',
  'Farmácia',
  'Pet Shop',
  'Outros',
]

const FAIXAS_FATURAMENTO = [
  'Iniciando no Delivery',
  'Até 50k',
  '50k a 150k',
  '150k a 300k',
  '300k a 500k',
  '500k a 1M',
  'Acima de 1M',
]

const inputClass = (hasError: boolean) =>
  `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm outline-none transition-colors ${
    hasError ? 'border-red-400' : 'border-[#9C958A]/20 focus:border-[#A31631]'
  }`

export function AgendarDemoPage() {
  const [company, setCompany] = useState('')
  const [segmento, setSegmento] = useState('')
  const [segmentoOutro, setSegmentoOutro] = useState('')
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [faturamento, setFaturamento] = useState('')
  const [datePreferences, setDatePreferences] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { if (submitted) window.scrollTo({ top: 0, behavior: 'smooth' }) }, [submitted])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!company.trim()) e.company = 'Informe o nome da empresa'
    if (!segmento) e.segmento = 'Selecione o segmento'
    if (segmento === 'Outros' && !segmentoOutro.trim()) e.segmentoOutro = 'Descreva o segmento'
    if (!name.trim()) e.name = 'Informe seu nome'
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe um WhatsApp válido'
    if (!email.trim() || !email.includes('@')) e.email = 'Informe um e-mail válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    saveDemoBooking({
      id: `demo-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      company: company.trim(),
      segmento,
      segmentoOutro: segmento === 'Outros' ? segmentoOutro.trim() : undefined,
      units: faturamento || '-',
      date: datePreferences.trim() || '-',
      time: '',
      status: 'pendente',
      createdAt: new Date().toISOString(),
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <GranularLogo size={28} color="#0E0E0F" />
              <span className="text-base font-semibold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Granular</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#0E0E0F] mb-2">Dados recebidos!</h1>
            <p className="text-sm text-[#9C958A] mb-6">
              Nossa equipe entrará em contato pelo WhatsApp em breve para confirmar a melhor data para a sua demonstração.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors">
              Voltar ao site
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-base font-semibold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Granular</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-1">Agendar demonstração</h1>
          <p className="text-xs sm:text-sm text-[#9C958A]">
            Preencha seus dados e nossa equipe entrará em contato para confirmar a demonstração.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Dados */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-[#0E0E0F]">Seus dados</h2>

            {/* Empresa */}
            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Empresa</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                className={inputClass(!!errors.company)}
                placeholder="Nome do estabelecimento ou rede" autoFocus />
              {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
            </div>

            {/* Segmento */}
            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Segmento</label>
              <select
                value={segmento}
                onChange={(e) => { setSegmento(e.target.value); setSegmentoOutro('') }}
                className={`${inputClass(!!errors.segmento)} cursor-pointer ${!segmento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}
              >
                <option value="">Selecione o segmento</option>
                {SEGMENTOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.segmento && <p className="text-xs text-red-500 mt-1">{errors.segmento}</p>}
              {segmento === 'Outros' && (
                <div className="mt-2">
                  <input type="text" value={segmentoOutro} onChange={(e) => setSegmentoOutro(e.target.value)}
                    className={inputClass(!!errors.segmentoOutro)}
                    placeholder="Descreva o segmento" />
                  {errors.segmentoOutro && <p className="text-xs text-red-500 mt-1">{errors.segmentoOutro}</p>}
                </div>
              )}
            </div>

            {/* Nome completo */}
            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">Nome completo</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className={inputClass(!!errors.name)}
                placeholder="Seu nome e sobrenome" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">WhatsApp</label>
              <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                className={inputClass(!!errors.whatsapp)}
                placeholder="(31) 99999-9999" />
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={inputClass(!!errors.email)}
                placeholder="seu@email.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Faixa de faturamento */}
            <div>
              <label className="block text-xs font-medium text-[#0E0E0F] mb-1.5">
                Faixa de faturamento <span className="text-[#9C958A] font-normal">(opcional)</span>
              </label>
              <select
                value={faturamento}
                onChange={(e) => setFaturamento(e.target.value)}
                className={`${inputClass(false)} cursor-pointer ${!faturamento ? 'text-[#9C958A]' : 'text-[#0E0E0F]'}`}
              >
                <option value="">Selecione a faixa</option>
                {FAIXAS_FATURAMENTO.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* Horário + submit */}
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-[#0E0E0F] mb-0.5">
                Sugestão de horário{' '}
                <span className="text-[#9C958A] font-normal">(opcional)</span>
              </h2>
              <p className="text-xs text-[#9C958A]">
                Não se preocupe — nossa equipe entrará em contato pelo WhatsApp para confirmar o melhor horário para você.
              </p>
            </div>

            {/* Campo de sugestão */}
            <div className="rounded-xl border border-[#9C958A]/20 p-4 bg-[#F7F7F7]/50">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={14} className="text-[#A31631] flex-shrink-0" />
                <p className="text-xs font-medium text-[#0E0E0F]">
                  Sugira até 3 datas e horários de preferência
                </p>
              </div>
              <textarea
                value={datePreferences}
                onChange={(e) => setDatePreferences(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-[#9C958A]/20 text-sm outline-none transition-colors focus:border-[#A31631] bg-white resize-none text-[#0E0E0F] placeholder:text-[#9C958A]"
                placeholder={`Ex:\n1ª opção: Terça, 08/07, às 10h\n2ª opção: Quarta, 09/07, às 14h\n3ª opção: Quinta, 10/07, às 16h`}
              />
              <p className="text-[11px] text-[#9C958A] mt-2">
                Faremos o possível para encaixar em uma das suas sugestões.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-3.5 sm:py-4 px-6 rounded-xl text-sm transition-colors cursor-pointer"
            >
              <Send size={16} /> Enviar — Entraremos em contato
            </button>

            <p className="text-[11px] text-[#9C958A] text-center">
              Nossa equipe entrará em contato pelo WhatsApp em até 1 dia útil para confirmar a demonstração.
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
