import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Briefcase } from 'lucide-react'
import { GranularLogo } from './GranularLogo'
import { useCart } from '../stores/useCartStore'
import type { Category } from './Modules'

const navLinks = [
  { label: 'Módulos', href: '/#modulos' },
  { label: 'Integrações', href: '/#integracoes' },
  { label: 'Diferenciais', href: '/#diferenciais' },
  { label: 'Preços', href: '/#precos' },
  // { label: 'Mentores', href: '/consultores' }, // temporariamente oculto
  { label: 'FAQ', href: '/#faq' },
]

const categoryBadge: Record<Category, { emoji: string; label: string; color: string; bg: string }> = {
  restaurantes: { emoji: '🍽️', label: 'Restaurantes', color: '#A31631', bg: '#A31631/10' },
  mercados:     { emoji: '🛒', label: 'Mercados',     color: '#0A4D68', bg: '#0A4D68/10' },
  farmacias:    { emoji: '💊', label: 'Farmácias',    color: '#1B6B3A', bg: '#1B6B3A/10' },
  petshop:      { emoji: '🐾', label: 'Pet Shop',     color: '#8B4513', bg: '#8B4513/10' },
}

interface Props {
  category?: Category
}

export function Header({ category }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const cart = useCart()
  const badge = category ? categoryBadge[category] : null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#9C958A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Logo + categoria ativa */}
        <a href="/" className="flex items-center gap-3">
          <GranularLogo size={36} color="#0E0E0F" />
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Granular
            </span>
            {badge && (
              <a
                href="#hero"
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors hover:opacity-80"
                style={{ color: badge.color, borderColor: `${badge.color}30`, backgroundColor: `${badge.color}12` }}
                title="Trocar segmento"
              >
                {badge.emoji} {badge.label}
              </a>
            )}
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/seja-consultor" className="text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent-05)] px-3 py-1.5 rounded-lg transition-colors">
            Seja um Mentor
          </Link>
          <a href="/login" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            Login
          </a>

          {cart.itemCount > 0 && (
            <Link to="/checkout" className="relative p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
              <Briefcase size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {cart.itemCount}
              </span>
            </Link>
          )}

          <Link
            to="/checkout?plano=saas-2"
            className="text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-5 py-2.5 rounded-xl transition-colors"
          >
            Começar Agora
          </Link>
        </div>

        {/* Mobile: carrinho + menu */}
        <div className="md:hidden flex items-center gap-2">
          {cart.itemCount > 0 && (
            <Link to="/checkout" className="relative p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
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
          {/* Categoria ativa no mobile */}
          {badge && (
            <a
              href="#hero"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg border"
              style={{ color: badge.color, borderColor: `${badge.color}30`, backgroundColor: `${badge.color}12` }}
            >
              {badge.emoji} {badge.label} · Trocar segmento
            </a>
          )}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-[#9C958A] hover:text-[#0E0E0F] py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#9C958A]/20 space-y-2">
            <Link to="/seja-consultor" className="block text-sm text-[var(--accent)] font-medium py-2" onClick={() => setMenuOpen(false)}>Seja um Mentor</Link>
            <a href="/login" className="block text-sm text-[#9C958A] py-2">Login</a>
            <Link
              to="/checkout?plano=saas-2"
              className="block text-center text-sm font-medium text-white bg-[var(--accent)] px-5 py-2.5 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              Começar Agora
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
