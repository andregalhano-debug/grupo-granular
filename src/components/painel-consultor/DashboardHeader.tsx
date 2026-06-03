import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { GranularLogo } from '../GranularLogo'
import { mockConsultantName } from '../../data/dashboardMock'

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function DashboardHeader() {
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#0E0E0F]/10 h-16">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-base font-semibold tracking-tight text-[#0E0E0F] hidden sm:inline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Granular
            </span>
          </Link>
          <span className="hidden md:block text-xs text-[#9C958A] capitalize" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {today}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A31631]/10 flex items-center justify-center">
              <span className="text-xs font-bold text-[#A31631]">{getInitials(mockConsultantName)}</span>
            </div>
            <span className="text-sm font-medium text-[#0E0E0F] hidden sm:inline">{mockConsultantName}</span>
          </div>
          <Link to="/" className="flex items-center gap-1 text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Sair</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
