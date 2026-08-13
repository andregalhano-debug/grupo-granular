import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../stores/useThemeStore'
import { useLanguage } from '../stores/useLanguageStore'

type Tone = 'light' | 'footer'

const tones: Record<Tone, { btn: string; active: string }> = {
  light: {
    btn: 'text-[#5f5248] hover:text-[#2c241f] hover:bg-[#e4ddd2]/70',
    active: 'bg-[#e4ddd2] text-[#2c241f]',
  },
  footer: {
    btn: 'text-[#dcb9ad] hover:text-[#f7f2ee] hover:bg-white/10',
    active: 'bg-white/15 text-[#f7f2ee]',
  },
}

export function SitePrefs({ tone = 'light' }: { tone?: Tone }) {
  const { theme, toggle } = useTheme()
  const { lang, toggle: toggleLang } = useLanguage()
  const c = tones[tone]

  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label="Idioma e aparência">
      <button
        type="button"
        onClick={toggle}
        title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        className={`p-2 rounded-lg transition-colors ${c.btn}`}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      <button
        type="button"
        onClick={toggleLang}
        title={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
        aria-label={lang === 'pt' ? 'Mudar idioma para inglês' : 'Mudar idioma para português'}
        className={`min-w-9 px-2 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-colors ${c.btn} ${c.active}`}
      >
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>
    </div>
  )
}
