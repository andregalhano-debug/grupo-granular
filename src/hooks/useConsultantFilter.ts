import { useState, useMemo } from 'react'
import { consultants } from '../data/consultants'
import type { ConsultantCategory } from '../data/consultants'

export function useConsultantFilter() {
  const [selectedCategory, setSelectedCategory] = useState<ConsultantCategory | null>(null)
  const [search, setSearch] = useState('')

  const filteredConsultants = useMemo(() => {
    let result = consultants
    if (selectedCategory) {
      result = result.filter((c) => c.specialty === selectedCategory)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q) ||
          c.expertises.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [selectedCategory, search])

  return { selectedCategory, setSelectedCategory, search, setSearch, filteredConsultants }
}
