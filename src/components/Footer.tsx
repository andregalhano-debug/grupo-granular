import { Link } from 'react-router-dom'
import { GranularLogo } from './GranularLogo'
import { useTheme } from '../stores/useThemeStore'
import { useT } from '../i18n/useT'

export function Footer() {
  const { theme } = useTheme()
  const logoColor = theme === 'dark' ? '#F0EFED' : '#0E0E0F'
  const t = useT()
  return (
    <footer className="bg-white border-t border-[#9C958A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Logo + Social */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-4">
              <GranularLogo size={36} color={logoColor} />
              <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]">
                Granular
              </span>
            </a>
            <p className="text-sm text-[#9C958A] leading-relaxed mb-4">
              {t.footer.tagline} <span className="text-[var(--accent)] font-semibold whitespace-nowrap">{t.footer.taglineAccent}</span>.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/grupogranular" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://linkedin.com/company/grupogranular" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>{t.footer.sections.product}</h4>
            <ul className="space-y-2.5">
              {['Estoque', 'Produção', 'Financeiro', 'iFood', 'KDS', 'Checklists', 'IA'].map((item) => (
                <li key={item}>
                  <a href="/#modulos" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/consultores" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                  {t.footer.links.consultants}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>{t.footer.sections.company}</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.about}</a></li>
              <li><Link to="/seja-consultor" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.beMentor}</Link></li>
              <li><a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.contact}</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>{t.footer.sections.contact}</h4>
            <ul className="space-y-2.5 text-sm text-[#9C958A]">
              <li>contato@grupogranular.com.br</li>
              <li>{t.footer.city}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#9C958A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9C958A]">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link to="/termos" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.terms}</Link>
            <Link to="/privacidade" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.privacy}</Link>
            <Link to="/cookies" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
