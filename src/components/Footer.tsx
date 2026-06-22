import { Link } from 'react-router-dom'
import { GranularLogo } from './GranularLogo'
import { useTheme } from '../stores/useThemeStore'
import { useT } from '../i18n/useT'

const PRODUCT_ITEMS = [
  { label: 'Granular Food',    href: '/?segmento=restaurantes', badge: null },
  { label: 'Granular Market',  href: '/?segmento=mercados',     badge: null },
  { label: 'Granular Farma',   href: null,                      badge: 'em breve' },
  { label: 'Granular Pet',     href: null,                      badge: 'em breve' },
  { label: 'Módulo Televendas', href: '/#planos',               badge: 'avulso' },
  { label: 'Módulo Pessoas',   href: '/#planos',                badge: 'avulso' },
]

export function Footer() {
  const { theme } = useTheme()
  const logoColor = theme === 'dark' ? '#F0EFED' : '#0E0E0F'
  const t = useT()

  return (
    <footer className="bg-white border-t border-[#9C958A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Logo + descrição */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-4">
              <GranularLogo size={36} color={logoColor} />
              <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]">
                Granular
              </span>
            </a>
            <p className="text-sm text-[#9C958A] leading-relaxed">
              {t.footer.tagline}{' '}
              <span className="text-[var(--accent)] font-semibold whitespace-nowrap">
                {t.footer.taglineAccent}
              </span>.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4
              className="font-semibold text-[#0E0E0F] mb-4 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}
            >
              {t.footer.sections.product}
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-[#9C958A]/50 cursor-default">
                      {item.label}
                    </span>
                  )}
                  {item.badge && (
                    <span
                      className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full leading-none ${
                        item.badge === 'em breve'
                          ? 'bg-[#9C958A]/10 text-[#9C958A]'
                          : 'bg-[var(--accent-10)] text-[var(--accent)]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4
              className="font-semibold text-[#0E0E0F] mb-4 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}
            >
              {t.footer.sections.company}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.about}</a></li>
              <li><Link to="/seja-consultor" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.beMentor}</Link></li>
              <li><a href="#integracoes" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Integrações</a></li>
              <li><a href="#faq" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Perguntas frequentes</a></li>
              <li><a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">{t.footer.links.contact}</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4
              className="font-semibold text-[#0E0E0F] mb-4 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}
            >
              {t.footer.sections.contact}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9C958A]">
              <li>
                <a
                  href="mailto:contato@grupogranular.com.br"
                  className="hover:text-[#0E0E0F] transition-colors"
                >
                  contato@grupogranular.com.br
                </a>
              </li>
              <li>{t.footer.city}</li>
              <li className="pt-1">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe5d] transition-colors font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
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
