import { useState } from 'react'
import { Check, Square, ChevronDown } from 'lucide-react'
import type { ConsultingSession } from '../../data/dashboardMock'
import { typeLabels } from '../../data/dashboardMock'

interface PreparationCardProps {
  session: ConsultingSession
  defaultOpen?: boolean
}

export function PreparationCard({ session, defaultOpen = false }: PreparationCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(
    () => Object.fromEntries(session.preparation.previousActionItems.map((item, i) => [i, item.completed]))
  )
  const [notes, setNotes] = useState(session.preparation.notes)
  const p = session.preparation
  const c = session.client

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }))
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
        <ChevronDown size={18} className={`text-[#9C958A] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-[#0E0E0F]/5 pt-5">
          {/* Dados-chave */}
          <div>
            <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Dados-chave</p>
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
            <div>
              <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Ações anteriores</p>
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
          <div>
            <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Tópicos sugeridos</p>
            <ol className="space-y-1.5">
              {p.suggestedTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#0E0E0F]">
                  <span className="text-[10px] font-bold text-[#A31631] w-4 flex-shrink-0">{i + 1}.</span>
                  {topic}
                </li>
              ))}
            </ol>
          </div>

          {/* Notas */}
          <div>
            <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Anotações</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione suas notas para esta sessão..."
              className="w-full text-xs text-[#0E0E0F] bg-[#F7F7F7] rounded-xl p-3 border border-[#0E0E0F]/10 outline-none focus:border-[#A31631] transition-colors resize-none min-h-[80px]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
