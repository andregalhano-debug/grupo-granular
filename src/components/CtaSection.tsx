import { FadeIn } from './FadeIn'

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0f0709]">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
          Pronto para transformar sua operação?
        </h2>
        <p className="text-white/60 text-base sm:text-lg mb-10">
          Junte-se a centenas de operações que já usam o Maestro para crescer com inteligência.
        </p>
        <a
          href="#precos"
          className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#4D1520] font-medium px-8 py-4 rounded-xl text-base transition-colors"
        >
          Começar Free Trial de 14 dias
        </a>
      </FadeIn>
    </section>
  )
}
