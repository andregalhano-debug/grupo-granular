import { useEffect } from 'react'
import { Search } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ConsultoresHero } from '../components/consultores/ConsultoresHero'
import { CategoryFilter } from '../components/consultores/CategoryFilter'
import { ConsultantGrid } from '../components/consultores/ConsultantGrid'
import { SejaConsultorCta } from '../components/consultores/SejaConsultorCta'
import { useConsultantFilter } from '../hooks/useConsultantFilter'

export function ConsultoresPage() {
  const { selectedCategory, setSelectedCategory, search, setSearch, filteredConsultants } = useConsultantFilter()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ConsultoresHero />

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

          <div className="max-w-md mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9C958A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, especialidade ou tema..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#9C958A]/20 bg-[#F7F7F7] text-sm text-[#0E0E0F] placeholder:text-[#9C958A]/60 focus:outline-none focus:border-[#A31631]/30 focus:ring-1 focus:ring-[#A31631]/10 transition-colors"
            />
          </div>

          <ConsultantGrid consultants={filteredConsultants} />
        </div>
      </section>

      <SejaConsultorCta />
      <Footer />
    </div>
  )
}
