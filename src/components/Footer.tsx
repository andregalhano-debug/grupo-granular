import { Link } from 'react-router-dom'
import { GranularLogo } from './GranularLogo'
import { useT } from '../i18n/useT'
import { SitePrefs } from './SitePrefs'

const PRODUCT_ITEMS = [
  { label: 'A Granu',           href: '/granu',         badge: null },
  { label: 'Granular Food',     href: '/restaurantes',  badge: null },
  { label: 'Granular Market',   href: '/mercados',      badge: null },
  { label: 'Granular Farma',    href: '/farmacias',     badge: null },
  { label: 'Granular Pet',      href: '/petshop',       badge: null },
  { label: 'Granular Shopping', href: '/shopping',      badge: null },
  { label: 'Módulo Televendas', href: '/#precos',       badge: 'avulso' },
  { label: 'Módulo Pessoas',    href: '/#pessoas',      badge: 'avulso' },
]

export function Footer() {
  const t = useT()

  return (
    <footer className="bg-[#5a1e2c] text-[#dcb9ad]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] pt-[clamp(44px,5vw,64px)] pb-7">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          <div>
            <a href="/" className="flex items-center gap-3 mb-4">
              <GranularLogo size={28} color="#f7f2ee" />
              <span className="text-[22px] font-semibold tracking-tight text-[#f7f2ee]">
                Granular
              </span>
            </a>
            <p className="text-[14.5px] leading-relaxed max-w-[34ch]">
              <span className="block">{t.footer.tagline}</span>
              <span className="block">{t.footer.taglineMid}</span>
              <span className="block mt-1.5 text-[#f7f2ee] font-semibold">
                {t.footer.taglineAccent}
              </span>
            </p>
          </div>

          <div>
            <h4
              className="font-medium text-[#c48d7e] mb-4 tracking-[.2em] uppercase text-[11px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.footer.sections.product}
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  {item.href.startsWith('/') && !item.href.includes('#') ? (
                    <Link to={item.href} className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">
                      {item.label}
                    </a>
                  )}
                  {item.badge && (
                    <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full leading-none bg-[#7c2d3e] text-[#f6ece6]">
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-medium text-[#c48d7e] mb-4 tracking-[.2em] uppercase text-[11px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.footer.sections.company}
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/especialista" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">Especialista sob demanda</Link></li>
              <li><Link to="/comunidade-mentores" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">Comunidade Mentores</Link></li>
              <li><a href="/#integracoes" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">Integrações</a></li>
              <li><a href="/#faq" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">Perguntas frequentes</a></li>
              <li><a href="/#seguranca" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">Segurança</a></li>
              <li><a href="/#contato" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">{t.footer.links.contact}</a></li>
              <li><Link to="/aceite" className="text-[14.5px] text-[#dcb9ad] hover:text-[#f7f2ee] transition-colors">Aceite de termos</Link></li>
            </ul>
          </div>

          <div>
            <h4
              className="font-medium text-[#c48d7e] mb-4 tracking-[.2em] uppercase text-[11px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.footer.sections.contact}
            </h4>
            <ul className="space-y-2.5 text-[14.5px] text-[#dcb9ad]">
              <li>
                <a href="mailto:contato@grupogranular.com.br" className="hover:text-[#f7f2ee] transition-colors">
                  contato@grupogranular.com.br
                </a>
              </li>
              <li>{t.footer.city}</li>
              <li className="pt-1">
                <a
                  href="https://wa.me/5531984355542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#7dcea0] hover:text-[#f7f2ee] transition-colors font-medium"
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

      <div className="border-t border-[rgba(236,217,205,.22)]">
        <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11.5px] tracking-[.16em] uppercase text-[#c48d7e]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {t.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <Link to="/termos" className="text-[11.5px] tracking-[.08em] uppercase text-[#c48d7e] hover:text-[#f7f2ee] transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{t.footer.links.terms}</Link>
            <Link to="/privacidade" className="text-[11.5px] tracking-[.08em] uppercase text-[#c48d7e] hover:text-[#f7f2ee] transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{t.footer.links.privacy}</Link>
            <Link to="/cookies" className="text-[11.5px] tracking-[.08em] uppercase text-[#c48d7e] hover:text-[#f7f2ee] transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{t.footer.links.cookies}</Link>
            <Link to="/aceite" className="text-[11.5px] tracking-[.08em] uppercase text-[#c48d7e] hover:text-[#f7f2ee] transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Aceite</Link>
            <SitePrefs tone="footer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
