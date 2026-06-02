import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GranularLogo } from './GranularLogo'

const navLinks = [
  { label: 'Módulos', href: '#modulos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Preços', href: '#precos' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/90 backdrop-blur-xl border-b border-[#EAE5D9]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <GranularLogo size={36} color="#0E0E0F" />
          <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Granular
          </span>
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
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            Login
          </a>
          <a
            href="#precos"
            className="text-sm font-medium text-white bg-[#5C1A2B] hover:bg-[#3A1019] px-5 py-2.5 rounded-xl transition-colors"
          >
            Começar Grátis
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#0E0E0F]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-t border-[#EAE5D9]/60 px-4 py-4 space-y-3">
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
          <div className="pt-3 border-t border-[#EAE5D9] space-y-2">
            <a href="#" className="block text-sm text-[#9C958A] py-2">Login</a>
            <a
              href="#precos"
              className="block text-center text-sm font-medium text-white bg-[#5C1A2B] px-5 py-2.5 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              Começar Grátis
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
