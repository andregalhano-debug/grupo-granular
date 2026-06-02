import { FadeIn } from './FadeIn'

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-6">
          Pronto para transformar sua operação?
        </h2>
        <p className="text-[#FAF7F0]/50 text-base sm:text-lg mb-10">
          Junte-se a centenas de operações que já usam a Granular para crescer com inteligência.
        </p>
        <a
          href="#precos"
          className="inline-flex items-center gap-2 bg-[#EAE5D9] hover:bg-[#FAF7F0] text-[#5C1A2B] font-medium px-8 py-4 rounded-xl text-base transition-colors"
        >
          Começar Free Trial de 14 dias
        </a>
      </FadeIn>
    </section>
  )
}
