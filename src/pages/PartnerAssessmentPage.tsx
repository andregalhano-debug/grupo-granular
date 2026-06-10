import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, User, Mail, MessageCircle, ChevronRight, ChevronLeft, Check, RotateCcw, AlertTriangle, Lightbulb, BarChart3, FileText } from 'lucide-react'
import { GranularLogo } from '../components/GranularLogo'
import { FadeIn } from '../components/FadeIn'
import { usePartnerAssessment } from '../hooks/usePartnerAssessment'
import type { AssessmentQuestion } from '../data/partnerAssessment'

/* ── Question renderers ── */

function SingleSelect({ q, value, onSelect }: { q: AssessmentQuestion; value: string; onSelect: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {q.options!.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${
            value === opt.id
              ? 'border-[#A31631] bg-[#A31631]/5 text-[#A31631] font-medium'
              : 'border-[#0E0E0F]/10 bg-white hover:border-[#A31631]/30 text-[#0E0E0F]'
          }`}
        >
          {opt.icon && <span className="text-base">{opt.icon}</span>}
          <span className="text-xs leading-snug">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}

function MultiSelect({ q, values, onToggle }: { q: AssessmentQuestion; values: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {q.options!.map((opt) => {
        const selected = values.includes(opt.id)
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${
              selected
                ? 'border-[#A31631] bg-[#A31631]/5 text-[#A31631] font-medium'
                : 'border-[#0E0E0F]/10 bg-white hover:border-[#A31631]/30 text-[#0E0E0F]'
            }`}
          >
            {opt.icon && <span className="text-base">{opt.icon}</span>}
            <span className="text-xs leading-snug flex-1">{opt.label}</span>
            {selected && <Check size={14} className="flex-shrink-0" />}
          </button>
        )
      })}
    </div>
  )
}

function ScaleInput({ q, value, onSelect }: { q: AssessmentQuestion; value: number; onSelect: (v: string) => void }) {
  const min = q.scaleMin || 1
  const max = q.scaleMax || 5
  return (
    <div>
      <div className="flex gap-2">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => onSelect(String(val))}
            className={`flex-1 h-12 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              val <= value
                ? 'bg-[#A31631] text-white shadow-sm'
                : 'bg-[#F7F7F7] text-[#9C958A] hover:bg-[#0E0E0F]/5'
            }`}
          >
            {val}
          </button>
        ))}
      </div>
      {q.scaleLabels && (
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[#9C958A]">{q.scaleLabels[0]}</span>
          <span className="text-[10px] text-[#9C958A]">{q.scaleLabels[1]}</span>
        </div>
      )}
    </div>
  )
}

function TextInput({ q, value, onChange }: { q: AssessmentQuestion; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={q.placeholder}
      rows={3}
      className="w-full px-4 py-3 rounded-xl border border-[#0E0E0F]/15 text-sm bg-white outline-none focus:border-[#A31631] transition-colors resize-none"
    />
  )
}

/* ── Briefing result ── */

function BriefingResult({ briefing, nome, onReset }: { briefing: NonNullable<ReturnType<typeof usePartnerAssessment>['briefing']>; nome: string; onReset: () => void }) {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#0E0E0F] mb-2">{nome.split(' ')[0]}, diagnóstico concluído!</h2>
          <p className="text-sm text-[#9C958A] max-w-md mx-auto">
            Seu mentor receberá este resumo automaticamente antes da primeira reunião.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Perfil da Operação</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><span className="text-[#9C958A]">Segmento</span><p className="font-medium text-[#0E0E0F]">{briefing.segmento}</p></div>
            <div><span className="text-[#9C958A]">Operação</span><p className="font-medium text-[#0E0E0F]">{briefing.operacao}</p></div>
            <div><span className="text-[#9C958A]">Faturamento</span><p className="font-medium text-[#0E0E0F]">{briefing.faturamento}</p></div>
            <div><span className="text-[#9C958A]">Equipe</span><p className="font-medium text-[#0E0E0F]">{briefing.funcionarios}</p></div>
            <div><span className="text-[#9C958A]">CMV</span><p className="font-medium text-[#0E0E0F]">{briefing.cmv || '—'}</p></div>
            <div><span className="text-[#9C958A]">Nota iFood</span><p className="font-medium text-[#0E0E0F]">{briefing.notaIfood || '—'}</p></div>
            <div><span className="text-[#9C958A]">Fichas Técnicas</span><p className="font-medium text-[#0E0E0F]">{briefing.fichaTecnica || '—'}</p></div>
            <div><span className="text-[#9C958A]">Controle Financeiro</span><p className="font-medium text-[#0E0E0F]">{briefing.controleFinanceiro || '—'}</p></div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="rounded-2xl border border-[#A31631]/15 bg-[#A31631]/[0.03] p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Dores Identificadas</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {briefing.doresPrincipais.map((d) => (
              <span key={d} className="text-xs bg-[#A31631]/10 text-[#A31631] px-3 py-1.5 rounded-full font-medium">{d}</span>
            ))}
          </div>
          {briefing.dorPrioritaria && (
            <div className="rounded-xl bg-white border border-[#A31631]/10 p-3">
              <p className="text-[10px] text-[#9C958A] uppercase tracking-wider mb-1 font-medium">Prioridade declarada</p>
              <p className="text-sm text-[#0E0E0F] italic">"{briefing.dorPrioritaria}"</p>
            </div>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="rounded-2xl border border-[#0E0E0F]/10 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={18} className="text-[#A31631]" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Resumo para o Mentor</h3>
          </div>
          <p className="text-sm text-[#0E0E0F]/80 leading-relaxed">{briefing.resumoIA}</p>
        </div>
      </FadeIn>

      <FadeIn delay={250}>
        <div className="rounded-2xl border border-green-200 bg-green-50/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-green-600" />
            <h3 className="text-sm font-bold text-[#0E0E0F] uppercase tracking-wider">Recomendações de Ação</h3>
          </div>
          <ol className="space-y-2">
            {briefing.recomendacoes.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#0E0E0F]/80">
                <span className="w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                {r}
              </li>
            ))}
          </ol>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="space-y-3">
          <Link
            to="/checkout?plano=consultoria-1"
            className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-4 rounded-xl text-base transition-colors"
          >
            Agendar mentoria
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 border border-[#0E0E0F]/15 text-[#0E0E0F] hover:bg-[#F7F7F7] font-medium py-3 rounded-xl text-sm transition-colors"
          >
            Voltar ao site
          </Link>
          <button type="button" onClick={onReset} className="w-full flex items-center justify-center gap-2 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer py-2">
            <RotateCcw size={14} /> Refazer diagnóstico
          </button>
        </div>
      </FadeIn>
    </div>
  )
}

/* ── Página principal ── */

export function PartnerAssessmentPage() {
  const a = usePartnerAssessment()

  useEffect(() => { window.scrollTo(0, 0) }, [a.step, a.sectionIndex])

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white outline-none transition-colors ${
      a.contactErrors[field] ? 'border-[#A31631]' : 'border-[#0E0E0F]/15 focus:border-[#A31631]'
    }`

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#0E0E0F]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <GranularLogo size={32} color="#0E0E0F" />
            <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Granular</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={16} /> Voltar
          </Link>
        </div>
      </header>

      {/* Progress */}
      {a.step !== 'result' && (
        <div className="border-b border-[#0E0E0F]/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-[#A31631] uppercase tracking-wider">
                {a.step === 'contact' ? 'Seus dados' : `${a.sectionIndex + 1} de ${a.totalSections}`}
              </span>
              <span className="text-xs font-bold text-[#0E0E0F]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{a.progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#0E0E0F]/10 overflow-hidden">
              <div className="h-full rounded-full bg-[#A31631] transition-all duration-500" style={{ width: `${a.progressPercent}%` }} />
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-xl w-full">

          {/* Contact step */}
          {a.step === 'contact' && (
            <FadeIn>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#A31631]/10 text-[#A31631] px-4 py-2 rounded-full text-xs font-medium mb-5 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Diagnóstico gratuito
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-3">
                  Descubra o que sua operação precisa
                </h1>
                <p className="text-sm text-[#9C958A]">
                  Em 2 minutos, identificamos suas dores e preparamos um briefing automático para o mentor.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><User size={16} className="text-[#9C958A]" /> Nome</label>
                  <input type="text" placeholder="Seu nome" value={a.contact.nome} onChange={(e) => a.updateContact('nome', e.target.value)} className={inputClass('nome')} />
                  {a.contactErrors.nome && <p className="text-xs text-[#A31631] mt-1">{a.contactErrors.nome}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><Mail size={16} className="text-[#9C958A]" /> E-mail</label>
                  <input type="email" placeholder="seu@email.com" value={a.contact.email} onChange={(e) => a.updateContact('email', e.target.value)} className={inputClass('email')} />
                  {a.contactErrors.email && <p className="text-xs text-[#A31631] mt-1">{a.contactErrors.email}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#0E0E0F] mb-1.5"><MessageCircle size={16} className="text-[#25D366]" /> WhatsApp</label>
                  <input type="tel" placeholder="(11) 99999-9999" value={a.contact.whatsapp} onChange={(e) => a.updateContact('whatsapp', e.target.value)} className={inputClass('whatsapp')} />
                  {a.contactErrors.whatsapp && <p className="text-xs text-[#A31631] mt-1">{a.contactErrors.whatsapp}</p>}
                </div>
                <button type="button" onClick={a.goToQuestions} className="w-full flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium py-4 rounded-xl text-base transition-colors cursor-pointer mt-4">
                  Começar diagnóstico <ChevronRight size={18} />
                </button>
              </div>
            </FadeIn>
          )}

          {/* Questions step */}
          {a.step === 'questions' && a.currentSection && (
            <FadeIn key={a.currentSection.id}>
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-1">{a.currentSection.title}</h2>
                <p className="text-sm text-[#9C958A]">{a.currentSection.subtitle}</p>
              </div>

              <div className="space-y-6">
                {a.currentSection.questions.map((q) => (
                  <div key={q.id}>
                    <p className="text-sm font-medium text-[#0E0E0F] mb-3">{q.question}</p>

                    {q.type === 'single' && (
                      <SingleSelect q={q} value={(a.answers[q.id] as string) || ''} onSelect={(v) => a.setAnswer(q.id, v)} />
                    )}
                    {q.type === 'multi' && (
                      <MultiSelect q={q} values={(a.answers[q.id] as string[]) || []} onToggle={(id) => a.toggleMulti(q.id, id)} />
                    )}
                    {q.type === 'scale' && (
                      <ScaleInput q={q} value={Number(a.answers[q.id]) || 0} onSelect={(v) => a.setAnswer(q.id, v)} />
                    )}
                    {q.type === 'text' && (
                      <TextInput q={q} value={(a.answers[q.id] as string) || ''} onChange={(v) => a.setAnswer(q.id, v)} />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 gap-4">
                {a.sectionIndex > 0 ? (
                  <button type="button" onClick={a.prevSection} className="flex items-center gap-1 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer">
                    <ChevronLeft size={16} /> Voltar
                  </button>
                ) : <div />}
                <button type="button" onClick={a.nextSection} className="flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer">
                  {a.sectionIndex + 1 < a.totalSections ? 'Próximo' : 'Ver resultado'} <ChevronRight size={16} />
                </button>
              </div>
            </FadeIn>
          )}

          {/* Result */}
          {a.step === 'result' && a.briefing && (
            <BriefingResult briefing={a.briefing} nome={a.contact.nome} onReset={a.resetAssessment} />
          )}
        </div>
      </main>
    </div>
  )
}
