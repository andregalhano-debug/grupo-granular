import { useEffect } from 'react'
import { useDashboardTab } from '../hooks/useDashboardTab'
import { FadeIn } from '../components/FadeIn'
import { DashboardHeader } from '../components/painel-consultor/DashboardHeader'
import { DashboardSidebar } from '../components/painel-consultor/DashboardSidebar'
import { WeeklyOverview } from '../components/painel-consultor/WeeklyOverview'
import { AgendaView } from '../components/painel-consultor/AgendaView'
import { MinhaAgendaView } from '../components/painel-consultor/MinhaAgendaView'
import { BriefingView } from '../components/painel-consultor/BriefingView'
import { PreparationView } from '../components/painel-consultor/PreparationView'
import { ConsultationTemplate } from '../components/painel-consultor/ConsultationTemplate'
import { GoogleSetupView } from '../components/painel-consultor/GoogleSetupView'

export function PainelConsultorPage() {
  const { tab, setTab } = useDashboardTab()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <DashboardHeader />
      <DashboardSidebar activeTab={tab} onTabChange={setTab} />

      <main className="pt-28 lg:pt-20 lg:ml-60 p-4 sm:p-6 lg:p-8">
        <WeeklyOverview />
        <FadeIn key={tab}>
          {tab === 'agenda' && <AgendaView />}
          {tab === 'minha-agenda' && <MinhaAgendaView />}
          {tab === 'briefings' && <BriefingView />}
          {tab === 'preparacao' && <PreparationView />}
          {tab === 'modelo' && <ConsultationTemplate />}
          {tab === 'config' && <GoogleSetupView />}
        </FadeIn>
      </main>
    </div>
  )
}
