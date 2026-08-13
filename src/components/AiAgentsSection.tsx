import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { GranuGrain } from './granu/GranuGrain'

export function AiAgentsSection() {
  return (
    <section id="granu" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F3EB]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
        <FadeIn className="relative h-[280px] sm:h-[360px] lg:h-[420px] -mx-4 sm:mx-0">
          <GranuGrain className="absolute inset-0 w-full h-full" zoom={1.55} />
        </FadeIn>

        <FadeIn delay={80} className="lg:pl-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A31631] mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            A Granu
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#0E0E0F] leading-[1.08] mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Eu sou a Granu.
          </h2>
          <p className="text-base sm:text-lg text-[#5D5148] leading-relaxed max-w-[44ch] mb-4">
            A IA do sistema inteiro. Conectada a cada venda, cada item de estoque, cada centavo de repasse — em tempo real. Este grão sou eu.
          </p>
          <p className="text-[#6B3F1F] italic text-[17px] leading-snug max-w-[42ch] mb-8">
            “Você não abre dashboard às 8 da manhã. Eu te mando o dia — e você resolve com um toque.”
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/granu"
              className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-5 py-3 rounded-xl text-sm transition-colors"
            >
              Conhecer a Granu <ArrowRight size={16} />
            </Link>
            <Link
              to="/agendar-demo"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0E0E0F] hover:text-[#A31631] transition-colors"
            >
              Quero ela na minha operação
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
