import { useState } from 'react'
import { Check, Square, ChevronDown, Mic, MicOff, Plus, Calendar, CircleCheck, Circle, Database, ClipboardList, MessageSquare, PenLine, ListTodo } from 'lucide-react'
import type { ConsultingSession } from '../../data/dashboardMock'
import { typeLabels } from '../../data/dashboardMock'
import { useVoiceNotes } from '../../hooks/useVoiceNotes'

interface PreparationCardProps {
  session: ConsultingSession
  defaultOpen?: boolean
}

const deadlineOptions = ['Imediato', 'Amanhã', 'Esta semana', 'Próxima semana', 'Este mês', 'Próximo mês', 'A definir']

export function PreparationCard({ session, defaultOpen = false }: PreparationCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(
    () => Object.fromEntries(session.preparation.previousActionItems.map((item, i) => [i, item.completed]))
  )
  const [notes, setNotes] = useState(session.preparation.notes)
  const [newAction, setNewAction] = useState('')
  const voice = useVoiceNotes(session.id)
  const p = session.preparation
  const c = session.client

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handleAddAction = () => {
    if (newAction.trim()) {
      voice.addManualAction(newAction.trim())
      setNewAction('')
    }
  }

  return (
    <div className="rounded-2xl border border-[#9C958A]/20 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-[#F7F7F7]/50 transition-colors"
      >
        <div>
          <h3 className="text-sm font-semibold text-[#0E0E0F]">{c.businessName}</h3>
          <p className="text-xs text-[#9C958A]">{session.date} às {session.time} — {typeLabels[session.type]}</p>
        </div>
        <div className="flex items-center gap-3">
          {voice.actionItems.length > 0 && (
            <span className="text-[10px] font-medium text-[#A31631] bg-[#A31631]/10 px-2 py-0.5 rounded-full">
              {voice.completedCount}/{voice.actionItems.length} ações
            </span>
          )}
          <ChevronDown size={18} className={`text-[#9C958A] transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-[#0E0E0F]/5 pt-5 divide-y divide-[#0E0E0F]/5">
          {/* Dados-chave */}
          <div className="pb-5">
            <div className="flex items-center gap-2 mb-3">
              <Database size={18} className="text-[#A31631]" />
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Dados-chave</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {p.keyDataPoints.map((dp) => (
                <div key={dp.label} className="bg-[#F7F7F7] rounded-lg px-3 py-2">
                  <p className="text-[10px] text-[#9C958A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{dp.label}</p>
                  <p className="text-sm font-bold text-[#0E0E0F]">{dp.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ações anteriores */}
          {p.previousActionItems.length > 0 && (
            <div className="py-5">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={18} className="text-[#A31631]" />
                <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Ações Anteriores</h4>
              </div>
              <div className="space-y-2">
                {p.previousActionItems.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleItem(i)}
                    className="w-full flex items-start gap-2 text-left cursor-pointer group"
                  >
                    {checkedItems[i] ? (
                      <Check size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Square size={16} className="mt-0.5 text-[#9C958A]/40 group-hover:text-[#9C958A] flex-shrink-0" />
                    )}
                    <span className={`text-xs leading-relaxed ${checkedItems[i] ? 'text-[#9C958A] line-through' : 'text-[#0E0E0F]'}`}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tópicos sugeridos */}
          <div className="py-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={18} className="text-[#A31631]" />
              <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Tópicos Sugeridos</h4>
            </div>
            <ol className="space-y-1.5">
              {p.suggestedTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#0E0E0F]">
                  <span className="text-[10px] font-bold text-[#A31631] w-4 flex-shrink-0">{i + 1}.</span>
                  {topic}
                </li>
              ))}
            </ol>
          </div>

          {/* ─── ANOTAÇÕES COM IA DE VOZ ─── */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PenLine size={18} className="text-[#A31631]" />
                <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Anotações em Tempo Real</h4>
              </div>
              {voice.isSupported ? (
                <button
                  type="button"
                  onClick={voice.toggleRecording}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    voice.isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#A31631]/10 text-[#A31631] hover:bg-[#A31631]/20'
                  }`}
                >
                  {voice.isRecording ? (
                    <><MicOff size={14} /> Parar gravação</>
                  ) : (
                    <><Mic size={14} /> Gravar anotação</>
                  )}
                </button>
              ) : (
                <span className="text-[10px] text-[#9C958A]">Microfone não suportado neste navegador</span>
              )}
            </div>

            {/* Live transcript indicator */}
            {voice.isRecording && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-red-600 uppercase tracking-wider">Gravando...</span>
                </div>
                {voice.liveTranscript && (
                  <p className="text-xs text-red-700 italic">{voice.liveTranscript}</p>
                )}
              </div>
            )}

            {/* Transcript */}
            {voice.transcript && (
              <div className="rounded-xl bg-[#F7F7F7] p-3 mb-3">
                <p className="text-[10px] font-medium text-[#9C958A] mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Transcrição</p>
                <p className="text-xs text-[#0E0E0F] leading-relaxed">{voice.transcript}</p>
              </div>
            )}

            {/* Manual notes */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione suas notas manualmente..."
              className="w-full text-xs text-[#0E0E0F] bg-[#F7F7F7] rounded-xl p-3 border border-[#0E0E0F]/10 outline-none focus:border-[#A31631] transition-colors resize-none min-h-[60px]"
            />
          </div>

          {/* ─── PLANO DE AÇÃO AUTOMÁTICO ─── */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ListTodo size={18} className="text-[#A31631]" />
                <h4 className="text-xs font-bold text-[#0E0E0F] uppercase tracking-wider">Plano de Ação</h4>
              </div>
              {voice.actionItems.length > 0 && (
                <span className="text-xs text-[#9C958A]">{voice.progressPercent}% concluído</span>
              )}
            </div>

            {/* Progress bar */}
            {voice.actionItems.length > 0 && (
              <div className="w-full h-2 rounded-full bg-[#0E0E0F]/10 mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${voice.progressPercent}%` }}
                />
              </div>
            )}

            {/* Action items */}
            <div className="space-y-2 mb-3">
              {voice.actionItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-3 transition-all ${
                    item.completed ? 'bg-green-50/50 border-green-200' : 'bg-white border-[#0E0E0F]/10'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => voice.toggleActionItem(item.id)}
                      className="mt-0.5 flex-shrink-0 cursor-pointer"
                    >
                      {item.completed ? (
                        <CircleCheck size={16} className="text-green-500" />
                      ) : (
                        <Circle size={16} className="text-[#9C958A]/40 hover:text-[#A31631]" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${item.completed ? 'text-[#9C958A] line-through' : 'text-[#0E0E0F]'}`}>
                        {item.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Calendar size={10} className="text-[#9C958A] flex-shrink-0" />
                        <select
                          value={item.deadline}
                          onChange={(e) => voice.updateDeadline(item.id, e.target.value)}
                          className="text-[10px] text-[#9C958A] bg-transparent border-none outline-none cursor-pointer font-medium"
                        >
                          {deadlineOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add manual action */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddAction()}
                placeholder="Adicionar ação manualmente..."
                className="flex-1 text-xs text-[#0E0E0F] bg-[#F7F7F7] rounded-lg px-3 py-2 border border-[#0E0E0F]/10 outline-none focus:border-[#A31631] transition-colors"
              />
              <button
                type="button"
                onClick={handleAddAction}
                disabled={!newAction.trim()}
                className="p-2 rounded-lg bg-[#A31631]/10 text-[#A31631] hover:bg-[#A31631]/20 disabled:opacity-30 transition-colors cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            {voice.actionItems.length === 0 && !voice.isRecording && (
              <p className="text-[11px] text-[#9C958A] text-center mt-3">
                Grave uma anotação por voz ou adicione ações manualmente. A IA organiza automaticamente.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
