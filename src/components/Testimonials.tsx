import { Star } from 'lucide-react'
import { FadeIn } from './FadeIn'

const testimonials = [
  {
    name: 'Andréa Ribeiro',
    role: 'Analista de RH',
    text: 'O sistema é simples de usar e fez uma diferença enorme na gestão de pessoas do grupo. Escalas, documentos, controle de entrevistas — tudo num lugar só. Ganhamos agilidade e reduziu muito o retrabalho.',
  },
  {
    name: 'Aline Silva',
    role: 'Gerente de Delivery',
    text: 'O KDS transformou nossa cozinha. Os tempos de preparo caíram 40% e os erros de pedido praticamente zeraram. O time todo aprovou.',
  },
  {
    name: 'Fabrício Silva',
    role: 'Gerente de Operações',
    text: 'Ter os KPIs operacionais consolidados mudou minha rotina. Parei de apagar incêndio e passei a atuar de forma estratégica. A Granular me devolveu tempo para pensar no negócio.',
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Quem usa, recomenda
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Veja o que dizem sobre a Granular.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 120}>
              <div className="rounded-2xl border border-[#9C958A]/20 bg-[#F7F7F7] p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
                <p className="text-sm text-[#9C958A] leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm text-[#0E0E0F]">{t.name}</p>
                  <p className="text-xs text-[#9C958A]">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
