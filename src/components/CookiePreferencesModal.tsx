import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useCookieConsent, type CookiePreferences } from '../stores/useCookieConsent'

interface Category {
  key: keyof CookiePreferences
  label: string
  desc: string
}

const CATEGORIES: Category[] = [
  {
    key: 'analytics',
    label: 'Analíticos e de Desempenho',
    desc: 'Nos ajudam a entender como você usa o site para melhorar a experiência. Dados agregados e anônimos.',
  },
  {
    key: 'functional',
    label: 'Funcionais e de Preferências',
    desc: 'Permitem que o site lembre suas preferências, como idioma e segmento selecionado.',
  },
  {
    key: 'marketing',
    label: 'Marketing e Rastreamento',
    desc: 'Usados para exibir anúncios relevantes e medir campanhas. Podem ser compartilhados com parceiros.',
  },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-[#A31631]' : 'bg-[#9C958A]/30'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition duration-200 ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export function CookiePreferencesModal() {
  const { modalOpen, setModalOpen, preferences, acceptAll, rejectAll, savePreferences } = useCookieConsent()
  const [local, setLocal] = useState<CookiePreferences>(preferences)

  useEffect(() => {
    if (modalOpen) setLocal(preferences)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  if (!modalOpen) return null

  const toggle = (key: keyof CookiePreferences, value: boolean) => {
    setLocal((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-0 sm:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#0E0E0F]/10 shrink-0">
          <div>
            <p className="text-sm font-bold text-[#0E0E0F]">Preferências de Cookies</p>
            <p className="text-xs text-[#9C958A] mt-0.5">Personalize quais cookies aceitar</p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="p-2 rounded-xl text-[#9C958A] hover:bg-[#F7F7F7] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          {/* Always on */}
          <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-800">Estritamente Necessários</p>
              <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                Essenciais para o funcionamento do site. Não podem ser desativados.
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-full uppercase tracking-wide">
              Sempre ativo
            </span>
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="flex items-start justify-between gap-4 p-3 rounded-xl border border-[#0E0E0F]/10">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0E0E0F]">{cat.label}</p>
                <p className="text-xs text-[#9C958A] mt-0.5 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="shrink-0 pt-0.5">
                <Toggle checked={local[cat.key]} onChange={(v) => toggle(cat.key, v)} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#0E0E0F]/10 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={() => { rejectAll() }}
            className="flex-1 text-xs font-medium px-4 py-2.5 rounded-xl border border-[#0E0E0F]/15 text-[#9C958A] hover:bg-[#F7F7F7] transition-colors"
          >
            Recusar todos
          </button>
          <button
            type="button"
            onClick={() => savePreferences(local)}
            className="flex-1 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#A31631] text-[#A31631] hover:bg-[#A31631]/5 transition-colors"
          >
            Salvar preferências
          </button>
          <button
            type="button"
            onClick={() => { acceptAll() }}
            className="flex-1 text-xs font-semibold px-4 py-2.5 rounded-xl bg-[#A31631] hover:bg-[#7A1025] text-white transition-colors"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  )
}
