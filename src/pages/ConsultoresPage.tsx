import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ConsultoresHero } from '../components/consultores/ConsultoresHero'
import { CategoryFilter } from '../components/consultores/CategoryFilter'
import { ConsultantGrid } from '../components/consultores/ConsultantGrid'
import { SejaConsultorCta } from '../components/consultores/SejaConsultorCta'
import { useConsultantFilter } from '../hooks/useConsultantFilter'

export function ConsultoresPage() {
  const { selectedCategory, setSelectedCategory, filteredConsultants } = useConsultantFilter()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ConsultoresHero />

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <ConsultantGrid consultants={filteredConsultants} />
        </div>
      </section>

      <SejaConsultorCta />
      <Footer />
    </div>
  )
}
