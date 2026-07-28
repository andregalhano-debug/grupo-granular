import { LayoutDashboard, Headset, GraduationCap } from 'lucide-react'
import { FadeIn } from './FadeIn'

const pillars = [
  {
    badge: '01',
    icon: LayoutDashboard,
    title: 'Sistema de Gestão',
    desc: 'Plataforma especializada por segmento — Food, Market, Farma ou Pet. Controle total da operação, integrado e pronto para o dia a dia.',
    accent: true,
    href: '#modulos',
  },
  {
    badge: '02',
    icon: Headset,
    title: 'Especialista Sob Demanda',
    desc: 'Acesse um profissional do seu setor quando precisar. Orientação real, sem ticket de suporte e sem espera.',
    accent: false,
  },
  {
    badge: '03',
    icon: GraduationCap,
    title: 'Mentorias',
    desc: 'Programas estruturados de crescimento para evoluir gestão, equipe e resultados — com quem já escalou negócios como o seu.',
    accent: false,
  },
]

export function EcosystemSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Mais do que software. Um ecossistema completo.
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Tecnologia, suporte humano e desenvolvimento — integrados numa única plataforma.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, i) => {
            const Content = (
              <div
                className={`group relative h-full rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                  pillar.accent
                    ? 'border-[var(--accent)] bg-[var(--accent-08)] hover:shadow-xl hover:shadow-[var(--accent-10)] hover:-translate-y-1'
                    : 'border-[#9C958A]/20 bg-white hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                <span
                  className={`absolute -top-2 left-6 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    pillar.accent ? 'bg-[var(--accent)] text-white' : 'bg-[#9C958A]/20 text-[#9C958A]'
                  }`}
                >
                  {pillar.badge}
                </span>
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                    pillar.accent ? 'bg-[var(--accent)]/10' : 'bg-[#9C958A]/10'
                  }`}
                >
                  <pillar.icon size={22} className={pillar.accent ? 'text-[var(--accent)]' : 'text-[#9C958A]'} />
                </div>
                <h3 className="font-semibold text-[#0E0E0F] mb-2">{pillar.title}</h3>
                <p className="text-sm text-[#9C958A] leading-relaxed">{pillar.desc}</p>
              </div>
            )

            return (
              <FadeIn key={pillar.title} delay={i * 100}>
                {pillar.href ? (
                  <a href={pillar.href} className="block h-full cursor-pointer">
                    {Content}
                  </a>
                ) : (
                  Content
                )}
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
