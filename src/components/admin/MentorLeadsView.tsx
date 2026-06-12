import { useState, useMemo } from 'react'
import { Search, X, ExternalLink, Check, AlertTriangle, Clock, Send, Trash2, FileText, History } from 'lucide-react'
import type { MentorLead, MentorStatus } from '../../types/mentor'
import { getMentorLeads, updateMentorStatus, updateMentorNotes, updateMentorValorHora, deleteMentorLead } from '../../services/mentorService'
import { sendConviteMentor } from '../../services/emailService'
import { getRangeBySenioridade, SENIORIDADE_RANGES, calcularScoreSenioridade, isValorForaDaFaixa } from '../../utils/seniorityScore'
import { segmentOptions, specialtyOptions } from '../../data/consultants'

const STATUS_CONFIG: Record<MentorStatus, { label: string; color: string; bg: string; border: string }> = {
  novo:        { label: 'Novo',        color: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  em_analise:  { label: 'Em análise',  color: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  aprovado:    { label: 'Aprovado',    color: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200' },
  convidado:   { label: 'Convidado',   color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  ativo:       { label: 'Ativo',       color: 'text-emerald-700',bg: 'bg-emerald-50',border: 'border-emerald-200' },
  pausado:     { label: 'Pausado',     color: 'text-gray-600',   bg: 'bg-gray-100',  border: 'border-gray-200' },
  rejeitado:   { label: 'Rejeitado',   color: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200' },
}

const ALL_STATUSES: MentorStatus[] = ['novo','em_analise','aprovado','convidado','ativo','pausado','rejeitado']

function StatusBadge({ status }: { status: MentorStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      {cfg.label}
    </span>
  )
}

function ScoreBar({ score, nivel }: { score: number; nivel: MentorLead['faixaSenioridade'] }) {
  const range = getRangeBySenioridade(nivel)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#0E0E0F]/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${range.bg.replace('bg-', 'bg-').replace('/10', '')}`} style={{ width: `${score}%`, backgroundColor: undefined }} />
      </div>
      <span className={`text-xs font-semibold ${range.color}`}>{score}/100</span>
    </div>
  )
}

function LeadCard({ lead, selected, onClick }: { lead: MentorLead; selected: boolean; onClick: () => void }) {
  const range = getRangeBySenioridade(lead.faixaSenioridade)
  const foraFaixa = isValorForaDaFaixa(lead)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${selected ? 'border-[#A31631] bg-[#A31631]/3 shadow-sm' : 'border-[#0E0E0F]/10 bg-white hover:border-[#0E0E0F]/25'}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#0E0E0F] truncate">{lead.nome}</p>
          <p className="text-xs text-[#9C958A] truncate">{lead.cargoAtual}{lead.empresaAtual ? ` · ${lead.empresaAtual}` : ''}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusBadge status={lead.status} />
          {foraFaixa && <AlertTriangle size={12} className="text-amber-500" />}
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${range.color} ${range.bg} ${range.border}`}>
          {range.label}
        </span>
        <span className="text-[10px] text-[#9C958A]">{lead.cidade}{lead.estado ? `/${lead.estado}` : ''}</span>
      </div>

      <ScoreBar score={lead.scoreSenioridade} nivel={lead.faixaSenioridade} />

      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1 flex-wrap">
          {lead.especialidades.slice(0, 2).map((e) => {
            const opt = specialtyOptions.find((o) => o.id === e)
            return opt ? <span key={e} className="text-[10px] bg-[#F7F7F7] border border-[#0E0E0F]/8 px-2 py-0.5 rounded-full text-[#9C958A]">{opt.label.split(' ')[0]}</span> : null
          })}
          {lead.especialidades.length > 2 && <span className="text-[10px] text-[#9C958A]">+{lead.especialidades.length - 2}</span>}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1 bg-[#0E0E0F]/8 rounded-full overflow-hidden">
            <div className="h-full bg-[#A31631]/60 rounded-full" style={{ width: `${lead.perfilCompletude}%` }} />
          </div>
          <span className="text-[10px] text-[#9C958A]">{lead.perfilCompletude}%</span>
        </div>
      </div>
    </button>
  )
}

function DetailPanel({ lead, onClose, onRefresh }: { lead: MentorLead; onClose: () => void; onRefresh: () => void }) {
  const [notes, setNotes] = useState(lead.adminNotes)
  const [valorHora, setValorHora] = useState(String(lead.valorHora || ''))
  const [saving, setSaving] = useState(false)
  const [inviting, setInviting] = useState(false)
  const [activeTab, setActiveTab] = useState<'perfil' | 'score' | 'historico'>('perfil')

  const range = getRangeBySenioridade(lead.faixaSenioridade)
  const foraFaixa = isValorForaDaFaixa(lead)

  const breakdown = useMemo(() =>
    calcularScoreSenioridade(lead.historicoProfissional, lead.linkedin, lead.especialidades),
  [lead])

  const handleSaveNotes = async () => {
    setSaving(true)
    updateMentorNotes(lead.id, notes)
    await new Promise((r) => setTimeout(r, 300))
    setSaving(false)
    onRefresh()
  }

  const handleSaveValor = () => {
    const v = parseFloat(valorHora)
    if (!isNaN(v) && v > 0) {
      updateMentorValorHora(lead.id, v)
      onRefresh()
    }
  }

  const handleStatus = (status: MentorStatus) => {
    updateMentorStatus(lead.id, status)
    onRefresh()
  }

  const handleInvite = async () => {
    setInviting(true)
    updateMentorStatus(lead.id, 'convidado', 'Convite enviado pelo admin')
    await sendConviteMentor({ to: lead.email, nome: lead.nome, loginUrl: '/painel-consultor' })
    await new Promise((r) => setTimeout(r, 800))
    setInviting(false)
    onRefresh()
  }

  const handleDelete = () => {
    if (confirm(`Excluir ${lead.nome}? Esta ação não pode ser desfeita.`)) {
      deleteMentorLead(lead.id)
      onClose()
      onRefresh()
    }
  }

  const tabs = [
    { id: 'perfil' as const, label: 'Perfil' },
    { id: 'score' as const, label: 'Score' },
    { id: 'historico' as const, label: 'Histórico' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-[#0E0E0F]/8">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[#0E0E0F] truncate">{lead.nome}</h3>
          <p className="text-xs text-[#9C958A]">{lead.cargoAtual}{lead.empresaAtual ? ` · ${lead.empresaAtual}` : ''}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <StatusBadge status={lead.status} />
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${range.color} ${range.bg} ${range.border}`}>{range.label}</span>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] cursor-pointer flex-shrink-0"><X size={18} /></button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#0E0E0F]/8">
        {tabs.map((t) => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
            className={`flex-1 text-xs font-medium py-2.5 transition-colors cursor-pointer ${activeTab === t.id ? 'text-[#A31631] border-b-2 border-[#A31631]' : 'text-[#9C958A] hover:text-[#0E0E0F]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">

        {activeTab === 'perfil' && (
          <>
            {/* Contato */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Contato</p>
              <div className="grid grid-cols-1 gap-1 text-sm">
                <div><span className="text-[#9C958A]">E-mail: </span><span className="text-[#0E0E0F]">{lead.email}</span></div>
                <div><span className="text-[#9C958A]">WhatsApp: </span><span className="text-[#0E0E0F]">{lead.whatsapp}</span></div>
                <div><span className="text-[#9C958A]">Local: </span><span className="text-[#0E0E0F]">{lead.cidade}{lead.estado ? `/${lead.estado}` : ''}</span></div>
                {lead.linkedin && (
                  <a href={lead.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#A31631] hover:underline text-xs">
                    <ExternalLink size={12} /> Ver LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Segmentos + Especialidades */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Segmentos</p>
              <div className="flex flex-wrap gap-1.5">
                {lead.segmentos.map((s) => {
                  const opt = segmentOptions.find((o) => o.id === s)
                  return <span key={s} className="text-xs bg-[#F7F7F7] border border-[#0E0E0F]/10 px-2.5 py-1 rounded-full text-[#0E0E0F]">{opt?.label || s}</span>
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Especialidades</p>
              <div className="flex flex-wrap gap-1.5">
                {lead.especialidades.map((e) => {
                  const opt = specialtyOptions.find((o) => o.id === e)
                  return <span key={e} className="text-xs bg-[#A31631]/8 border border-[#A31631]/20 px-2.5 py-1 rounded-full text-[#A31631]">{opt?.label || e}</span>
                })}
              </div>
            </div>

            {/* Valor hora */}
            <div className="rounded-xl border border-[#0E0E0F]/10 p-4 space-y-3">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Valor hora</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#9C958A]">Sugerido:</span>
                <span className={`font-semibold ${range.color}`}>R$ {lead.valorHoraSugeridoMin}–{lead.valorHoraSugeridoMax}/h</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${range.bg} ${range.color} border ${range.border}`}>{range.label}</span>
              </div>
              {lead.valorHora && (
                <div className={`flex items-center gap-2 text-sm ${foraFaixa ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {foraFaixa ? <AlertTriangle size={14} /> : <Check size={14} />}
                  <span>Pedido: <strong>R$ {lead.valorHora}/h</strong></span>
                  {foraFaixa && <span className="text-[10px]">(fora da faixa)</span>}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Definir valor R$/h"
                  value={valorHora}
                  onChange={(e) => setValorHora(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631]"
                />
                <button type="button" onClick={handleSaveValor} className="px-3 py-2 bg-[#0E0E0F] text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-[#0E0E0F]/80 transition-colors">
                  Salvar
                </button>
              </div>
            </div>

            {/* Bio */}
            {lead.bio && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Bio</p>
                <p className="text-sm text-[#0E0E0F] leading-relaxed">{lead.bio}</p>
              </div>
            )}

            {/* Notas admin */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Notas internas</p>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observações internas (não visíveis ao mentor)..."
                className="w-full px-3 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] resize-none"
              />
              <button type="button" onClick={handleSaveNotes} disabled={saving} className="flex items-center gap-1.5 text-xs font-medium text-[#A31631] hover:text-[#7A1025] cursor-pointer disabled:opacity-50">
                {saving ? <><Clock size={12} className="animate-spin" /> Salvando...</> : <><FileText size={12} /> Salvar notas</>}
              </button>
            </div>
          </>
        )}

        {activeTab === 'score' && (
          <div className="space-y-4">
            {/* Score total */}
            <div className={`rounded-xl p-4 text-center ${range.bg} border ${range.border}`}>
              <div className={`text-4xl font-bold ${range.color} mb-1`}>{lead.scoreSenioridade}</div>
              <div className={`text-sm font-semibold ${range.color}`}>{range.label}</div>
              <div className="text-xs text-[#9C958A] mt-1">R$ {range.valorMin}–{range.valorMax}/h sugerido</div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Detalhamento do score</p>
              {breakdown.detalhes.map((d) => (
                <div key={d.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0E0E0F] font-medium">{d.label}</span>
                    <span className="text-[#9C958A]"><strong className="text-[#0E0E0F]">{d.pts}</strong>/{d.max} pts · {d.desc}</span>
                  </div>
                  <div className="h-2 bg-[#0E0E0F]/8 rounded-full overflow-hidden">
                    <div className="h-full bg-[#A31631] rounded-full transition-all" style={{ width: `${(d.pts / d.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela de faixas */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Faixas de referência</p>
              {SENIORIDADE_RANGES.map((r) => (
                <div key={r.nivel} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${r.nivel === lead.faixaSenioridade ? `${r.bg} border ${r.border}` : ''}`}>
                  <span className={`font-medium ${r.nivel === lead.faixaSenioridade ? r.color : 'text-[#9C958A]'}`}>{r.label}</span>
                  <span className={r.nivel === lead.faixaSenioridade ? r.color : 'text-[#9C958A]'}>R$ {r.valorMin}–{r.valorMax}/h · {r.scoreMin}–{r.scoreMax} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'historico' && (
          <div className="space-y-4">
            {/* Histórico profissional */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Experiências</p>
              {lead.historicoProfissional.length === 0 ? (
                <p className="text-sm text-[#9C958A]">Nenhuma experiência informada.</p>
              ) : (
                lead.historicoProfissional.map((h) => (
                  <div key={h.id} className="border border-[#0E0E0F]/8 rounded-xl p-3 text-sm">
                    <p className="font-semibold text-[#0E0E0F]">{h.cargo}</p>
                    <p className="text-[#9C958A]">{h.empresa}</p>
                    <p className="text-xs text-[#9C958A] mt-0.5">{h.inicio} → {h.fim === 'atual' ? 'Atual' : h.fim}</p>
                    {h.descricao && <p className="text-xs text-[#9C958A] mt-1">{h.descricao}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Log de status */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Log de status</p>
              <div className="space-y-2">
                {[...lead.historicoStatus].reverse().map((log, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <History size={12} className="text-[#9C958A] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#0E0E0F]">{log.acao}</p>
                      {log.adminNota && <p className="text-[#9C958A] italic">{log.adminNota}</p>}
                      <p className="text-[#9C958A]">{new Date(log.data).toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions footer */}
      <div className="border-t border-[#0E0E0F]/8 p-4 space-y-3">
        {/* Status selector */}
        <div>
          <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Alterar status</p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_STATUSES.filter((s) => s !== lead.status).map((s) => {
              const cfg = STATUS_CONFIG[s]
              return (
                <button key={s} type="button" onClick={() => handleStatus(s)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer transition-colors hover:opacity-80 ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                  → {cfg.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Primary actions */}
        <div className="flex gap-2">
          {(lead.status === 'aprovado' || lead.status === 'em_analise') && (
            <button type="button" onClick={handleInvite} disabled={inviting}
              className="flex-1 flex items-center justify-center gap-2 bg-[#A31631] hover:bg-[#7A1025] disabled:opacity-60 text-white font-medium py-2.5 rounded-xl text-sm transition-colors cursor-pointer">
              {inviting ? <Clock size={14} className="animate-spin" /> : <Send size={14} />}
              {inviting ? 'Enviando...' : 'Enviar convite'}
            </button>
          )}
          <button type="button" onClick={handleDelete}
            className="p-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function MentorLeadsView() {
  const [allLeads, setAllLeads] = useState<MentorLead[]>(() => getMentorLeads())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<MentorStatus | 'todos'>('todos')
  const [filterEspec, setFilterEspec] = useState('')
  const [filterNivel, setFilterNivel] = useState('')

  const refresh = () => {
    const leads = getMentorLeads()
    setAllLeads(leads)
    if (selectedId && !leads.find((l) => l.id === selectedId)) setSelectedId(null)
  }

  const selectedLead = selectedId ? allLeads.find((l) => l.id === selectedId) : null

  const pipelineCount = useMemo(() => {
    const counts: Partial<Record<MentorStatus, number>> = {}
    for (const s of ALL_STATUSES) counts[s] = allLeads.filter((l) => l.status === s).length
    return counts
  }, [allLeads])

  const filtered = useMemo(() => {
    let result = allLeads
    if (filterStatus !== 'todos') result = result.filter((l) => l.status === filterStatus)
    if (filterEspec) result = result.filter((l) => l.especialidades.includes(filterEspec))
    if (filterNivel) result = result.filter((l) => l.faixaSenioridade === filterNivel)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((l) =>
        l.nome.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.cargoAtual.toLowerCase().includes(q) ||
        l.cidade.toLowerCase().includes(q),
      )
    }
    return result.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
  }, [allLeads, filterStatus, filterEspec, filterNivel, search])

  return (
    <div className="space-y-5">
      {/* Header + pipeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#0E0E0F]">Mentores — CRM</h2>
            <p className="text-xs text-[#9C958A]">{allLeads.length} cadastros totais</p>
          </div>
          <button type="button" onClick={refresh} className="text-xs text-[#A31631] font-medium cursor-pointer hover:underline">Atualizar</button>
        </div>

        {/* Pipeline pills */}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setFilterStatus('todos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${filterStatus === 'todos' ? 'bg-[#0E0E0F] text-white border-[#0E0E0F]' : 'bg-white text-[#9C958A] border-[#0E0E0F]/15 hover:border-[#0E0E0F]/30'}`}>
            Todos <span className="font-bold">{allLeads.length}</span>
          </button>
          {ALL_STATUSES.map((s) => {
            const cfg = STATUS_CONFIG[s]
            const cnt = pipelineCount[s] || 0
            if (cnt === 0) return null
            return (
              <button key={s} type="button" onClick={() => setFilterStatus(s)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${filterStatus === s ? `${cfg.bg} ${cfg.color} ${cfg.border}` : 'bg-white text-[#9C958A] border-[#0E0E0F]/15 hover:border-[#0E0E0F]/30'}`}>
                {cfg.label} <span className="font-bold">{cnt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-48 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C958A]" />
          <input
            type="text"
            placeholder="Buscar por nome, e-mail, cargo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white"
          />
        </div>
        <select value={filterEspec} onChange={(e) => setFilterEspec(e.target.value)} className="px-3 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white cursor-pointer">
          <option value="">Especialidade</option>
          {specialtyOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        <select value={filterNivel} onChange={(e) => setFilterNivel(e.target.value)} className="px-3 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-sm outline-none focus:border-[#A31631] bg-white cursor-pointer">
          <option value="">Senioridade</option>
          {SENIORIDADE_RANGES.map((r) => <option key={r.nivel} value={r.nivel}>{r.label}</option>)}
        </select>
      </div>

      {/* Layout: list + detail */}
      <div className={`grid gap-4 ${selectedLead ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Lista */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="rounded-xl bg-white border border-[#0E0E0F]/8 p-8 text-center">
              <p className="text-sm text-[#9C958A]">Nenhum mentor encontrado com esses filtros.</p>
            </div>
          ) : (
            filtered.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                selected={lead.id === selectedId}
                onClick={() => setSelectedId(lead.id === selectedId ? null : lead.id)}
              />
            ))
          )}
        </div>

        {/* Painel de detalhe */}
        {selectedLead && (
          <div className="lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-120px)]">
            <DetailPanel
              key={selectedLead.id}
              lead={selectedLead}
              onClose={() => setSelectedId(null)}
              onRefresh={refresh}
            />
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-center text-[#9C958A]">
          Exibindo {filtered.length} de {allLeads.length} mentores
          {selectedLead && <span> · <button type="button" onClick={() => setSelectedId(null)} className="text-[#A31631] cursor-pointer hover:underline">Fechar detalhe</button></span>}
        </p>
      )}
    </div>
  )
}
