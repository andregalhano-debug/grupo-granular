import { Link } from 'react-router-dom'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import { GranularLogo } from '../GranularLogo'
import { useTheme } from '../../stores/useThemeStore'
import { useLanguage } from '../../stores/useLanguageStore'
import { useT } from '../../i18n/useT'

export function CheckoutHeader() {
  const { theme, toggle } = useTheme()
  const { lang, toggle: toggleLang } = useLanguage()
  const t = useT()
  const logoColor = theme === 'dark' ? '#F0EFED' : '#0E0E0F'

  return (
    <header className="border-b border-[#0E0E0F]/10 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <GranularLogo size={32} color={logoColor} />
          <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Granular
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="p-2 rounded-lg text-[#9C958A] hover:text-[#0E0E0F] hover:bg-[#F7F7F7] transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={toggleLang}
            className="text-xs font-semibold text-[#9C958A] hover:text-[#0E0E0F] px-2 py-1 rounded-lg hover:bg-[#F7F7F7] transition-colors"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          <Link to="/" className="flex items-center gap-1.5 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={16} />
            {t.pricing.checkoutBack}
          </Link>
        </div>
      </div>
    </header>
  )
}
