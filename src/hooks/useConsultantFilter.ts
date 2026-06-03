import { useState, useMemo } from 'react'
import { consultants } from '../data/consultants'
import type { ConsultantCategory } from '../data/consultants'

export function useConsultantFilter() {
  const [selectedCategory, setSelectedCategory] = useState<ConsultantCategory | null>(null)

  const filteredConsultants = useMemo(() => {
    if (!selectedCategory) return consultants
    return consultants.filter((c) => c.specialty === selectedCategory)
  }, [selectedCategory])

  return { selectedCategory, setSelectedCategory, filteredConsultants }
}
