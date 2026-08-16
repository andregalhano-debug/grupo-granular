import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../stores/useThemeStore'
import { useLanguage } from '../stores/useLanguageStore'
import { useT } from '../i18n/useT'

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
  const { prefs } = useT()
  const c = tones[tone]

  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={prefs.group}>
      <button
        type="button"
        onClick={toggle}
        title={theme === 'dark' ? prefs.darkOn : prefs.darkOff}
        aria-label={theme === 'dark' ? prefs.darkOn : prefs.darkOff}
        className={`inline-flex items-center justify-center min-h-11 min-w-11 p-2 rounded-lg transition-colors ${c.btn}`}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      <button
        type="button"
        onClick={toggleLang}
        title={lang === 'pt' ? prefs.langToEn : prefs.langToPt}
        aria-label={lang === 'pt' ? prefs.langToEn : prefs.langToPt}
        className={`inline-flex items-center justify-center min-h-11 min-w-11 px-2 rounded-lg text-[11px] font-semibold tracking-wide transition-colors ${c.btn} ${c.active}`}
      >
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>
    </div>
  )
}
