import { CalendarDays, FileText, Zap, ClipboardList, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { DashboardTab } from '../../hooks/useDashboardTab'
import { mockSessions } from '../../data/dashboardMock'

interface DashboardSidebarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

const tabs = [
  { id: 'agenda' as const, icon: CalendarDays, label: 'Agenda' },
  { id: 'briefings' as const, icon: FileText, label: 'Briefings' },
  { id: 'preparacao' as const, icon: Zap, label: 'Preparação' },
  { id: 'modelo' as const, icon: ClipboardList, label: 'Modelo' },
]

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const todaySessions = mockSessions.filter((s) => s.date === mockSessions[0].date).length
  const nextSession = mockSessions[0]

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-[#0E0E0F]/10 flex-col z-30">
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#A31631]/10 text-[#A31631]'
                  : 'text-[#9C958A] hover:text-[#0E0E0F] hover:bg-[#F7F7F7]'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}

          <div className="pt-2 mt-2 border-t border-[#0E0E0F]/5">
            <Link
              to="/trilha"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#9C958A] hover:text-[#A31631] hover:bg-[#A31631]/5 transition-all"
            >
              <BookOpen size={18} />
              Trilha de Conhecimento
            </Link>
          </div>
        </nav>

        {/* Stats */}
        <div className="p-4 border-t border-[#0E0E0F]/10 space-y-3">
          <div className="text-xs text-[#9C958A]">
            <span className="block font-medium text-[#0E0E0F]">{todaySessions} sessões hoje</span>
            Próxima: {nextSession.time} — {nextSession.client.businessName}
          </div>
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-[#0E0E0F]/10 z-30 overflow-x-auto">
        <div className="flex px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#A31631] border-[#A31631]'
                  : 'text-[#9C958A] border-transparent hover:text-[#0E0E0F]'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
          <Link
            to="/trilha"
            className="flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap text-[#9C958A] border-b-2 border-transparent hover:text-[#A31631] transition-colors"
          >
            <BookOpen size={14} />
            Trilha
          </Link>
        </div>
      </div>
    </>
  )
}
