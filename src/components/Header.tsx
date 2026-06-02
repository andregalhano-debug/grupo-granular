import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Módulos', href: '#modulos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Preços', href: '#precos' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#e5e5e3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#4D1520] flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Maestro<span className="text-[#4D1520]">Food</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#666] hover:text-[#212121] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm text-[#666] hover:text-[#212121] transition-colors">
            Login
          </a>
          <a
            href="#precos"
            className="text-sm font-medium text-white bg-[#4D1520] hover:bg-[#6b2230] px-5 py-2.5 rounded-xl transition-colors"
          >
            Começar Grátis
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[#212121]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e5e3]/60 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-[#666] hover:text-[#212121] py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#e5e5e3] space-y-2">
            <a href="#" className="block text-sm text-[#666] py-2">Login</a>
            <a
              href="#precos"
              className="block text-center text-sm font-medium text-white bg-[#4D1520] px-5 py-2.5 rounded-xl"
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
