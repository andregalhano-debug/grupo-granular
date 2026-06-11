import { Link } from 'react-router-dom'
import { GranularLogo } from './GranularLogo'

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#9C958A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Logo + Social */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-4">
              <GranularLogo size={36} color="#0E0E0F" />
              <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]">
                Granular
              </span>
            </a>
            <p className="text-sm text-[#9C958A] leading-relaxed mb-4">
              Gestão completa para delivery, <span className="text-[var(--accent)] font-semibold whitespace-nowrap">com IA de ponta a ponta</span>.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/grupogranular"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#9C958A] hover:text-[#0A66C2] transition-colors"
              >
                <LinkedInIcon size={14} />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/grupogranular"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#9C958A] hover:text-[#E4405F] transition-colors"
              >
                <InstagramIcon size={14} />
                Instagram
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>Produto</h4>
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
                  Consultores
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>Empresa</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Sobre</a></li>
              <li><Link to="/consultores" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Comunidade Granular</Link></li>
              <li><Link to="/seja-consultor" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Seja um Mentor Granular</Link></li>
              <li><a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>Contato</h4>
            <ul className="space-y-2.5 text-sm text-[#9C958A]">
              <li>contato@grupogranular.com.br</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#9C958A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9C958A]">
            © 2026 Granular. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Termos de Uso</a>
            <a href="#" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Privacidade</a>
            <a href="#" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
