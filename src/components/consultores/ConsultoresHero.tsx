import { FadeIn } from '../FadeIn'

export function ConsultoresHero() {
  return (
    <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <FadeIn className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-xs font-medium mb-8 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Marketplace de Mentores
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-[#FAF7F0] mb-6">
          Encontre o{' '}
          <span className="text-[#A31631] italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            especialista ideal
          </span>{' '}
          para sua operação
        </h1>
        <p className="text-base sm:text-lg text-[#FAF7F0]/50 max-w-2xl mx-auto">
          Mentores com experiência real em delivery e food service.
        </p>
      </FadeIn>
    </section>
  )
}
