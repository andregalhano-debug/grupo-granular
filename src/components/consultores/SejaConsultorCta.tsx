import { Link } from 'react-router-dom'
import { FadeIn } from '../FadeIn'

export function SejaConsultorCta() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-6">
          Seja um mentor da Granular
        </h2>
        <p className="text-[#FAF7F0]/50 text-base sm:text-lg mb-10">
          Compartilhe sua experiência e ajude operações de delivery a crescerem. Junte-se à nossa rede de mentores.
        </p>
        <Link
          to="/seja-consultor"
          className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F7F7] text-[#A31631] font-medium px-8 py-4 rounded-xl text-base transition-colors"
        >
          Candidatar-se agora
        </Link>
      </FadeIn>
    </section>
  )
}
