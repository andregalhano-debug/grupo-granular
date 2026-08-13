import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Briefcase, Sun, Moon } from 'lucide-react'
import { GranularLogo } from './GranularLogo'
import { useCart } from '../stores/useCartStore'
import { useTheme } from '../stores/useThemeStore'
import { useLanguage } from '../stores/useLanguageStore'
import { useT } from '../i18n/useT'
import type { Category } from './Modules'

const categoryName: Record<Category, string> = {
  restaurantes: 'Food',
  mercados:     'Market',
  farmacias:    'Farma',
  petshop:      'PET',
}

interface Props {
  category?: Category
}

export function Header({ category }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cart = useCart()
  const { theme, toggle } = useTheme()
  const { lang, toggle: toggleLang } = useLanguage()
  const t = useT()
  const suffix = category ? categoryName[category] : ''
  const logoColor = theme === 'dark' ? '#F0EFED' : '#0E0E0F'

  const navLinks = [
    { label: t.nav.granu, href: '/granu' },
    { label: t.nav.modules, href: '/#modulos' },
    { label: t.nav.integrations, href: '/#integracoes' },
    { label: t.nav.pricing, href: '/#precos' },
    // { label: 'Mentores', href: '/consultores' }, // temporariamente oculto
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#9C958A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Logo + nome do sistema */}
        <a href="/" className="flex items-center gap-3">
          <GranularLogo size={36} color={logoColor} />
          <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Granular
            {scrolled && suffix && (
              <span className="ml-1 transition-opacity duration-300 opacity-100">{suffix}</span>
            )}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/seja-consultor" className="text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent-05)] px-3 py-1.5 rounded-lg transition-colors">
            {t.nav.beMentor}
          </Link>
          <a href="/login" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            {t.nav.login}
          </a>

          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="p-2 rounded-lg text-[#9C958A] hover:text-[#0E0E0F] hover:bg-[#F7F7F7] transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button onClick={toggleLang} className="text-xs font-semibold text-[#9C958A] hover:text-[#0E0E0F] px-2 py-1 rounded-lg hover:bg-[#F7F7F7] transition-colors">{lang === 'pt' ? 'EN' : 'PT'}</button>

          {cart.itemCount > 0 && (
            <Link to="/agendar-demo" className="relative p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
              <Briefcase size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cart.itemCount}
              </span>
            </Link>
          )}

          <Link
            to="/agendar-demo"
            className="text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-5 py-2.5 rounded-xl transition-colors"
          >
            {t.nav.startNow}
          </Link>
        </div>

        {/* Mobile: carrinho + tema + menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {cart.itemCount > 0 && (
            <Link to="/agendar-demo" className="relative p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
              <Briefcase size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cart.itemCount}
              </span>
            </Link>
          )}
          <button
            className="p-2 text-[#0E0E0F]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#9C958A]/20 px-4 py-4 space-y-3">
          {/* Link para trocar segmento no mobile */}
          <a
            href="#hero"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-xs font-medium text-[#9C958A] hover:text-[#0E0E0F] py-1 transition-colors"
            style={{ animation: 'menuSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) both' }}
          >
            {t.nav.changeSegment}
          </a>
          {navLinks.map((link, i) => (
            link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-[#9C958A] hover:text-[#0E0E0F] py-2 transition-colors"
                onClick={() => setMenuOpen(false)}
                style={{ animation: `menuSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 50}ms both` }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-[#9C958A] hover:text-[#0E0E0F] py-2 transition-colors"
                onClick={() => setMenuOpen(false)}
                style={{ animation: `menuSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 50}ms both` }}
              >
                {link.label}
              </a>
            )
          ))}
          <div
            className="pt-3 border-t border-[#9C958A]/20 space-y-2"
            style={{ animation: `menuSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) ${(navLinks.length + 1) * 50}ms both` }}
          >
            <Link to="/seja-consultor" className="block text-sm text-[var(--accent)] font-medium py-2" onClick={() => setMenuOpen(false)}>{t.nav.beMentor}</Link>
            <a href="/login" className="block text-sm text-[#9C958A] py-2">{t.nav.login}</a>
            <button onClick={toggleLang} className="block text-sm text-[#9C958A] py-2 text-left">{lang === 'pt' ? 'EN' : 'PT'}</button>
            <Link
              to="/agendar-demo"
              className="block text-center text-sm font-medium text-white bg-[var(--accent)] px-5 py-2.5 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.startNow}
            </Link>
          </div>
        </div>
      )}
      <style>{`
        @keyframes menuSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  )
}
