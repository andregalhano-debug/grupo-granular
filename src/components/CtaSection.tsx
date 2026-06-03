import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-6">
          Pronto para transformar sua operacao?
        </h2>
        <p className="text-[#FAF7F0]/50 text-base sm:text-lg mb-10">
          Junte-se a centenas de operacoes que ja usam a Granular para crescer com inteligencia.
        </p>
        <Link
          to="/checkout?plano=saas-2"
          className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F7F7] text-[#EA1D2C] font-medium px-8 py-4 rounded-xl text-base transition-colors"
        >
          Comecar teste gratis de 14 dias
        </Link>
      </FadeIn>
    </section>
  )
}
