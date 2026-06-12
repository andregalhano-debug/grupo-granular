import { useMemo } from 'react'
import { TrendingUp, TrendingDown, Users, Star, AlertTriangle, CheckCircle } from 'lucide-react'
import type { MentorLead, MentorStatus } from '../../types/mentor'
import { getMentorLeads } from '../../services/mentorService'
import { SENIORIDADE_RANGES, isValorForaDaFaixa, desvioPercentual } from '../../utils/seniorityScore'
import { specialtyOptions, segmentOptions } from '../../data/consultants'

function KpiCard({ label, value, sub, icon: Icon, color = 'text-[#A31631]' }: {
  label: string; value: string | number; sub?: string; icon: typeof Users; color?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#9C958A] mb-1">{label}</p>
          <p className="text-2xl font-bold text-[#0E0E0F]">{value}</p>
          {sub && <p className="text-xs text-[#9C958A] mt-0.5">{sub}</p>}
        </div>
        <div className={`w-9 h-9 rounded-xl bg-[#A31631]/8 flex items-center justify-center`}>
          <Icon size={18} className={color} />
        </div>
      </div>
    </div>
  )
}

function HBar({ label, value, max, color = 'bg-[#A31631]', sub }: {
  label: string; value: number; max: number; color?: string; sub?: string
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#0E0E0F] font-medium truncate max-w-[60%]">{label}</span>
        <span className="text-[#9C958A] flex-shrink-0">{value} {sub && `· ${sub}`}</span>
      </div>
      <div className="h-2 bg-[#0E0E0F]/6 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function FunnelStep({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 flex-shrink-0">
        <p className="text-xs text-[#9C958A] truncate">{label}</p>
      </div>
      <div className="flex-1 h-7 bg-[#0E0E0F]/6 rounded-lg overflow-hidden relative">
        <div className={`h-full rounded-lg ${color} transition-all`} style={{ width: `${Math.max(pct, 3)}%` }} />
        <span className="absolute inset-0 flex items-center px-2 text-xs font-bold text-[#0E0E0F]">{count}</span>
      </div>
      <span className="text-xs text-[#9C958A] w-10 text-right">{pct}%</span>
    </div>
  )
}

export function MentorReportsView() {
  const leads: MentorLead[] = getMentorLeads()

  const stats = useMemo(() => {
    const total = leads.length
    const ativos = leads.filter((l) => l.status === 'ativo').length
    const aprovados = leads.filter((l) => ['aprovado', 'convidado', 'ativo'].includes(l.status)).length
    const novos = leads.filter((l) => l.status === 'novo').length
    const rejeitados = leads.filter((l) => l.status === 'rejeitado').length

    // Completude média
    const completude = total > 0 ? Math.round(leads.reduce((s, l) => s + l.perfilCompletude, 0) / total) : 0

    // Aprovação %
    const aprovacaoPct = total > 0 ? Math.round((aprovados / total) * 100) : 0

    // Valor hora análise
    const comValor = leads.filter((l) => l.valorHora && l.valorHora > 0)
    const foraFaixa = comValor.filter((l) => isValorForaDaFaixa(l))
    const foraFaixaPct = comValor.length > 0 ? Math.round((foraFaixa.length / comValor.length) * 100) : 0
    const avgValor = comValor.length > 0 ? Math.round(comValor.reduce((s, l) => s + (l.valorHora || 0), 0) / comValor.length) : 0
    const sortedValores = comValor.map((l) => l.valorHora || 0).sort((a, b) => a - b)
    const medianValor = sortedValores.length > 0 ? sortedValores[Math.floor(sortedValores.length / 2)] : 0
    const desvios = foraFaixa.map((l) => Math.abs(desvioPercentual(l) || 0))
    const avgDesvio = desvios.length > 0 ? Math.round(desvios.reduce((s, v) => s + v, 0) / desvios.length) : 0

    // Score médio
    const avgScore = total > 0 ? Math.round(leads.reduce((s, l) => s + l.scoreSenioridade, 0) / total) : 0

    // Por senioridade
    const porNivel = SENIORIDADE_RANGES.map((r) => ({
      ...r,
      count: leads.filter((l) => l.faixaSenioridade === r.nivel).length,
    }))

    // Por especialidade (top 8)
    const porEspec: Record<string, number> = {}
    for (const l of leads) for (const e of l.especialidades) porEspec[e] = (porEspec[e] || 0) + 1
    const topEspec = Object.entries(porEspec).sort((a, b) => b[1] - a[1]).slice(0, 8)

    // Por segmento
    const porSeg: Record<string, number> = {}
    for (const l of leads) for (const s of l.segmentos) porSeg[s] = (porSeg[s] || 0) + 1
    const topSeg = Object.entries(porSeg).sort((a, b) => b[1] - a[1]).slice(0, 6)

    // Por estado
    const porEstado: Record<string, number> = {}
    for (const l of leads) if (l.estado) porEstado[l.estado] = (porEstado[l.estado] || 0) + 1
    const topEstados = Object.entries(porEstado).sort((a, b) => b[1] - a[1]).slice(0, 6)

    // Valor hora por faixa vs sugerido
    const valorPorNivel = SENIORIDADE_RANGES.map((r) => {
      const desse = comValor.filter((l) => l.faixaSenioridade === r.nivel)
      const avg = desse.length > 0 ? Math.round(desse.reduce((s, l) => s + (l.valorHora || 0), 0) / desse.length) : null
      const foraCount = desse.filter((l) => isValorForaDaFaixa(l)).length
      return { ...r, avg, foraCount, total: desse.length }
    })

    // Cadastros por semana (últimas 8)
    const weeks: { label: string; count: number }[] = []
    for (let w = 7; w >= 0; w--) {
      const start = new Date(); start.setDate(start.getDate() - w * 7 - 6)
      const end = new Date(); end.setDate(end.getDate() - w * 7)
      const count = leads.filter((l) => {
        const d = new Date(l.criadoEm)
        return d >= start && d <= end
      }).length
      weeks.push({ label: `S-${w === 0 ? 'atual' : w}`, count })
    }

    const statusCounts: Partial<Record<MentorStatus, number>> = {}
    for (const s of ['novo','em_analise','aprovado','convidado','ativo','pausado','rejeitado'] as MentorStatus[]) {
      statusCounts[s] = leads.filter((l) => l.status === s).length
    }

    return {
      total, ativos, aprovados, novos, rejeitados, completude, aprovacaoPct,
      foraFaixa: foraFaixa.length, foraFaixaPct, avgValor, medianValor, avgDesvio,
      avgScore, porNivel, topEspec, topSeg, topEstados, valorPorNivel, weeks, statusCounts, comValor: comValor.length,
    }
  }, [leads])

  const maxEspec = Math.max(...stats.topEspec.map(([, v]) => v), 1)
  const maxSeg = Math.max(...stats.topSeg.map(([, v]) => v), 1)
  const maxEstado = Math.max(...stats.topEstados.map(([, v]) => v), 1)
  const maxWeek = Math.max(...stats.weeks.map((w) => w.count), 1)

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-[#0E0E0F]/10 p-12 text-center">
        <Users size={40} className="text-[#9C958A]/30 mx-auto mb-3" />
        <p className="text-sm text-[#9C958A]">Nenhum mentor cadastrado ainda.</p>
        <p className="text-xs text-[#9C958A] mt-1">Use "Gerar dados de teste" para visualizar o dashboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0E0E0F]">Relatórios — Comunidade Granular</h2>
        <p className="text-xs text-[#9C958A]">Atualizado agora · {stats.total} mentor{stats.total !== 1 ? 'es' : ''} no sistema</p>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Total de mentores" value={stats.total} sub={`${stats.novos} novos pendentes`} icon={Users} />
        <KpiCard label="Mentores ativos" value={stats.ativos} sub={`${stats.aprovacaoPct}% taxa de aprovação`} icon={CheckCircle} color="text-emerald-600" />
        <KpiCard label="Score médio" value={stats.avgScore} sub="de 100 pontos" icon={Star} color="text-amber-600" />
        <KpiCard label="Completude média" value={`${stats.completude}%`} sub="do perfil preenchido" icon={TrendingUp} />
      </div>

      {/* Funil de status */}
      <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5">
        <h3 className="text-sm font-bold text-[#0E0E0F] mb-4">Funil de pipeline</h3>
        <div className="space-y-2">
          <FunnelStep label="Novo"        count={stats.statusCounts.novo || 0}        total={stats.total} color="bg-blue-200" />
          <FunnelStep label="Em análise"  count={stats.statusCounts.em_analise || 0}  total={stats.total} color="bg-amber-300" />
          <FunnelStep label="Aprovado"    count={stats.statusCounts.aprovado || 0}    total={stats.total} color="bg-green-300" />
          <FunnelStep label="Convidado"   count={stats.statusCounts.convidado || 0}   total={stats.total} color="bg-purple-300" />
          <FunnelStep label="Ativo"       count={stats.statusCounts.ativo || 0}       total={stats.total} color="bg-emerald-400" />
          <FunnelStep label="Pausado"     count={stats.statusCounts.pausado || 0}     total={stats.total} color="bg-gray-300" />
          <FunnelStep label="Rejeitado"   count={stats.statusCounts.rejeitado || 0}   total={stats.total} color="bg-red-300" />
        </div>
      </div>

      {/* Senioridade + Valor hora */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Distribuição por senioridade */}
        <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#0E0E0F]">Distribuição por senioridade</h3>
          {stats.porNivel.map((r) => (
            <HBar
              key={r.nivel}
              label={r.label}
              value={r.count}
              max={stats.total}
              sub={`${stats.total > 0 ? Math.round((r.count / stats.total) * 100) : 0}%`}
              color={r.bg.includes('blue') ? 'bg-blue-400' : r.bg.includes('green') ? 'bg-green-400' : r.bg.includes('purple') ? 'bg-purple-400' : r.bg.includes('orange') ? 'bg-orange-400' : r.bg.includes('[#A31631]') ? 'bg-[#A31631]' : 'bg-yellow-400'}
            />
          ))}
        </div>

        {/* Análise de valor hora */}
        <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#0E0E0F]">Análise — Valor hora</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#F7F7F7] p-3 text-center">
              <p className="text-xs text-[#9C958A]">Média</p>
              <p className="text-lg font-bold text-[#0E0E0F]">R$ {stats.avgValor || '—'}</p>
            </div>
            <div className="rounded-xl bg-[#F7F7F7] p-3 text-center">
              <p className="text-xs text-[#9C958A]">Mediana</p>
              <p className="text-lg font-bold text-[#0E0E0F]">R$ {stats.medianValor || '—'}</p>
            </div>
            <div className={`rounded-xl p-3 text-center ${stats.foraFaixaPct > 30 ? 'bg-amber-50 border border-amber-200' : 'bg-[#F7F7F7]'}`}>
              <div className="flex items-center justify-center gap-1 mb-0.5">
                {stats.foraFaixaPct > 30 && <AlertTriangle size={12} className="text-amber-500" />}
                <p className="text-xs text-[#9C958A]">Fora da faixa</p>
              </div>
              <p className={`text-lg font-bold ${stats.foraFaixaPct > 30 ? 'text-amber-600' : 'text-[#0E0E0F]'}`}>{stats.foraFaixaPct}%</p>
              <p className="text-[10px] text-[#9C958A]">{stats.foraFaixa} de {stats.comValor}</p>
            </div>
            <div className="rounded-xl bg-[#F7F7F7] p-3 text-center">
              <p className="text-xs text-[#9C958A]">Desvio médio</p>
              <p className="text-lg font-bold text-[#0E0E0F]">{stats.avgDesvio > 0 ? `+${stats.avgDesvio}` : stats.avgDesvio}%</p>
            </div>
          </div>

          {/* Valor por nível */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-[#9C958A] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Valor médio por faixa</p>
            {stats.valorPorNivel.filter((r) => r.total > 0).map((r) => (
              <div key={r.nivel} className="flex items-center justify-between text-xs py-1 border-b border-[#0E0E0F]/5 last:border-0">
                <span className={`font-medium ${r.color}`}>{r.label}</span>
                <div className="flex items-center gap-3 text-[#9C958A]">
                  <span>sugerido R$ {r.valorMin}–{r.valorMax}</span>
                  {r.avg && <span className="text-[#0E0E0F] font-semibold">média R$ {r.avg}</span>}
                  {r.foraCount > 0 && (
                    <span className="flex items-center gap-0.5 text-amber-600">
                      <AlertTriangle size={11} /> {r.foraCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Especialidades + Segmentos */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#0E0E0F]">Top especialidades</h3>
          {stats.topEspec.map(([id, count]) => {
            const opt = specialtyOptions.find((o) => o.id === id)
            return (
              <HBar
                key={id}
                label={opt?.label || id}
                value={count}
                max={maxEspec}
                sub={`${Math.round((count / stats.total) * 100)}%`}
              />
            )
          })}
        </div>

        <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#0E0E0F]">Segmentos</h3>
          {stats.topSeg.map(([id, count]) => {
            const opt = segmentOptions.find((o) => o.id === id)
            return (
              <HBar
                key={id}
                label={opt?.label || id}
                value={count}
                max={maxSeg}
                sub={`${Math.round((count / stats.total) * 100)}%`}
                color="bg-purple-400"
              />
            )
          })}
        </div>
      </div>

      {/* Distribuição geográfica + Tendência semanal */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#0E0E0F]">Distribuição geográfica</h3>
          {stats.topEstados.length === 0 ? (
            <p className="text-sm text-[#9C958A]">Nenhum estado informado.</p>
          ) : stats.topEstados.map(([estado, count]) => (
            <HBar
              key={estado}
              label={estado}
              value={count}
              max={maxEstado}
              sub={`${Math.round((count / stats.total) * 100)}%`}
              color="bg-teal-400"
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#0E0E0F]/10 p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#0E0E0F]">Novos cadastros — últimas 8 semanas</h3>
          <div className="flex items-end gap-1 h-24">
            {stats.weeks.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#A31631]/70 rounded-t-sm transition-all"
                  style={{ height: maxWeek > 0 ? `${(w.count / maxWeek) * 80}px` : '2px', minHeight: w.count > 0 ? '4px' : '2px' }}
                />
                <span className="text-[9px] text-[#9C958A] rotate-[-45deg] origin-left mt-1">{w.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-[#9C958A] pt-2">
            <span>Total período: <strong className="text-[#0E0E0F]">{stats.weeks.reduce((s, w) => s + w.count, 0)}</strong></span>
            {stats.weeks[stats.weeks.length - 1].count > (stats.weeks[stats.weeks.length - 2]?.count || 0) ? (
              <span className="flex items-center gap-1 text-emerald-600"><TrendingUp size={12} /> Crescendo</span>
            ) : stats.weeks[stats.weeks.length - 1].count < (stats.weeks[stats.weeks.length - 2]?.count || 0) ? (
              <span className="flex items-center gap-1 text-red-500"><TrendingDown size={12} /> Caindo</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Faixas Premium/Elite destaque */}
      {(stats.porNivel.find((r) => r.nivel === 'premium')?.count || 0) + (stats.porNivel.find((r) => r.nivel === 'elite')?.count || 0) > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-[#A31631]/5 rounded-2xl border border-yellow-200 p-5">
          <h3 className="text-sm font-bold text-[#0E0E0F] mb-3">Mentores Premium & Elite</h3>
          <div className="grid grid-cols-2 gap-4">
            {['premium','elite'].map((nivel) => {
              const r = stats.porNivel.find((x) => x.nivel === nivel)
              if (!r || r.count === 0) return null
              const vr = stats.valorPorNivel.find((x) => x.nivel === nivel)
              return (
                <div key={nivel} className={`rounded-xl p-4 ${r.bg} border ${r.border}`}>
                  <p className={`text-sm font-bold ${r.color}`}>{r.label}</p>
                  <p className="text-2xl font-bold text-[#0E0E0F]">{r.count}</p>
                  <p className="text-xs text-[#9C958A]">R$ {r.valorMin}–{r.valorMax}/h</p>
                  {vr?.avg && <p className="text-xs font-semibold text-[#0E0E0F] mt-1">Praticando R$ {vr.avg}/h em média</p>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
