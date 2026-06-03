import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { GranularLogo } from '../GranularLogo'

export function CheckoutHeader() {
  return (
    <header className="border-b border-[#0E0E0F]/10 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <GranularLogo size={32} color="#0E0E0F" />
          <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Granular
          </span>
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
          <ArrowLeft size={16} />
          Voltar ao site
        </Link>
      </div>
    </header>
  )
}
