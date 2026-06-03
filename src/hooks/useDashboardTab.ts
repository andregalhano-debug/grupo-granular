import { useState } from 'react'

export type DashboardTab = 'agenda' | 'briefings' | 'preparacao' | 'modelo'

export function useDashboardTab(initial: DashboardTab = 'agenda') {
  const [tab, setTab] = useState<DashboardTab>(initial)
  return { tab, setTab }
}
