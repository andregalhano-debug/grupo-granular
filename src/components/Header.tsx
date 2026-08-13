import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Briefcase, Sun, Moon, ChevronDown } from 'lucide-react'
import { GranularLogo } from './GranularLogo'
import { useCart } from '../stores/useCartStore'
import { useTheme } from '../stores/useThemeStore'
import { useLanguage } from '../stores/useLanguageStore'
import { useT } from '../i18n/useT'
import { CATEGORY_LINKS } from '../data/categories'
import type { Category } from './Modules'

const categoryName: Record<Category, string> = {
  restaurantes: 'Food',
  mercados:     'Market',
  farmacias:    'Farma',
  petshop:      'PET',
  shopping:     'Shopping',
}

const CATEGORY_PATHS = new Set(CATEGORY_LINKS.map((c) => c.href))

interface Props {
  category?: Category
}

function NavAnchor({
  href,
  children,
  onClick,
  className = '',
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  const cls = `text-[14.5px] text-[#5f5248] hover:text-[#7c2d3e] transition-colors ${className}`
  if (href.startsWith('/') && !href.includes('#')) {
    return (
      <Link to={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} onClick={onClick} className={cls}>
      {children}
    </a>
  )
}

export function Header({ category }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const [mobileCats, setMobileCats] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const catsRef = useRef<HTMLDivElement>(null)
  const cart = useCart()
  const { theme, toggle } = useTheme()
  const { lang, toggle: toggleLang } = useLanguage()
  const t = useT()
  const { pathname } = useLocation()
  const suffix = category ? categoryName[category] : ''
  const logoColor = theme === 'dark' ? '#f7f2ee' : '#2c241f'

  const localSections = pathname === '/' || CATEGORY_PATHS.has(pathname)
  const sectionHref = (id: string) => (localSections ? `#${id}` : `/#${id}`)

  const navLinks = [
    { label: t.nav.granu, href: '/granu' },
    { label: t.nav.modules, href: sectionHref('modulos') },
    { label: t.nav.integrations, href: sectionHref('integracoes') },
    { label: t.nav.pricing, href: sectionHref('precos') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (catsRef.current && !catsRef.current.contains(e.target as Node)) {
        setCatsOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setCatsOpen(false)
    setMobileCats(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-[rgba(240,237,232,.88)] backdrop-blur-xl border-b border-[#e4ddd2]">
      <div className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,44px)] h-[68px] flex items-center gap-5">
        <Link to="/" className="flex items-center gap-2.5 font-semibold text-[19px] tracking-tight text-[#2c241f]">
          <GranularLogo size={36} color={logoColor} />
          <span>
            Granular
            {scrolled && suffix && (
              <span className="ml-1 text-[#7c2d3e] font-medium">{suffix}</span>
            )}
          </span>
        </Link>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-[clamp(14px,2vw,28px)]">
          <NavAnchor href="/granu">{t.nav.granu}</NavAnchor>

          <div ref={catsRef} className="relative">
            <button
              type="button"
              onClick={() => setCatsOpen((v) => !v)}
              className={`inline-flex items-center gap-1 text-[14.5px] transition-colors ${
                catsOpen || category ? 'text-[#7c2d3e]' : 'text-[#5f5248] hover:text-[#7c2d3e]'
              }`}
              aria-expanded={catsOpen}
              aria-haspopup="true"
            >
              {t.nav.categories}
              <ChevronDown size={14} className={`transition-transform ${catsOpen ? 'rotate-180' : ''}`} />
            </button>
            {catsOpen && (
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[320px] bg-[#faf9f7] border border-[#e4ddd2] rounded-2xl shadow-[0_18px_40px_-22px_rgba(44,36,31,.45)] p-2 z-50">
                {CATEGORY_LINKS.map((c) => (
                  <Link
                    key={c.id}
                    to={c.href}
                    onClick={() => setCatsOpen(false)}
                    className={`block rounded-xl px-3.5 py-2.5 transition-colors ${
                      category === c.id ? 'bg-[#efdfd8]' : 'hover:bg-[#f0ede8]'
                    }`}
                  >
                    <span className="block text-[14.5px] font-medium text-[#2c241f]">{c.label}</span>
                    <span className="block text-[12.5px] text-[#8a7a6e] leading-snug">{c.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <NavAnchor key={link.href} href={link.href}>
              {link.label}
            </NavAnchor>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-2">
          <Link to="/seja-consultor" className="text-xs font-medium text-[#7c2d3e] hover:text-[#5f2130] px-2 py-1.5">
            {t.nav.beMentor}
          </Link>
          <a href="/login" className="text-[14.5px] text-[#5f5248] hover:text-[#7c2d3e] transition-colors">
            {t.nav.login}
          </a>
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="p-2 rounded-lg text-[#8a7a6e] hover:text-[#2c241f] hover:bg-[#e4ddd2]/60 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={toggleLang}
            className="text-xs font-semibold text-[#8a7a6e] hover:text-[#2c241f] px-2 py-1 rounded-lg hover:bg-[#e4ddd2]/60 transition-colors"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          {cart.itemCount > 0 && (
            <Link to="/agendar-demo" className="relative p-2 text-[#8a7a6e] hover:text-[#2c241f] transition-colors">
              <Briefcase size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#7c2d3e] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cart.itemCount}
              </span>
            </Link>
          )}
          <Link
            to="/agendar-demo"
            className="inline-flex items-center min-h-10 px-5 rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-medium text-[14.5px] whitespace-nowrap transition-colors"
          >
            {t.nav.startNow}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="p-2 text-[#8a7a6e] hover:text-[#2c241f] transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {cart.itemCount > 0 && (
            <Link to="/agendar-demo" className="relative p-2 text-[#8a7a6e] hover:text-[#2c241f] transition-colors">
              <Briefcase size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#7c2d3e] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cart.itemCount}
              </span>
            </Link>
          )}
          <button className="p-2 text-[#2c241f]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#f0ede8] border-t border-[#e4ddd2] px-4 py-4 space-y-1">
          <NavAnchor href="/granu" onClick={() => setMenuOpen(false)} className="block py-2.5">
            {t.nav.granu}
          </NavAnchor>
          <button
            type="button"
            onClick={() => setMobileCats((v) => !v)}
            className="flex w-full items-center justify-between py-2.5 text-[14.5px] text-[#5f5248]"
          >
            {t.nav.categories}
            <ChevronDown size={16} className={mobileCats ? 'rotate-180' : ''} />
          </button>
          {mobileCats && (
            <div className="pl-3 pb-2 space-y-1">
              {CATEGORY_LINKS.map((c) => (
                <Link
                  key={c.id}
                  to={c.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-[#2c241f]"
                >
                  {c.label}
                  <span className="block text-[12px] text-[#8a7a6e]">{c.desc}</span>
                </Link>
              ))}
            </div>
          )}
          {navLinks.slice(1).map((link) => (
            <NavAnchor key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-2.5">
              {link.label}
            </NavAnchor>
          ))}
          <div className="pt-3 border-t border-[#e4ddd2] space-y-2">
            <Link to="/seja-consultor" className="block text-sm text-[#7c2d3e] font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t.nav.beMentor}
            </Link>
            <a href="/login" className="block text-sm text-[#5f5248] py-2">{t.nav.login}</a>
            <button onClick={toggleLang} className="block text-sm text-[#5f5248] py-2 text-left">
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <Link
              to="/agendar-demo"
              className="block text-center text-sm font-medium text-[#f7f2ee] bg-[#7c2d3e] px-5 py-2.5 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.startNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
