import { Star } from 'lucide-react'
import { FadeIn } from './FadeIn'

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Proprietário — Dark Kitchen SP',
    text: 'Reduzi meu CMV de 38% para 31% em apenas 3 meses usando o Maestro. O controle de estoque automatizado e as fichas técnicas mudaram completamente minha operação.',
  },
  {
    name: 'Ana Paula Ribeiro',
    role: 'Gerente de Operações — Grupo Sabor',
    text: 'O KDS transformou nossa cozinha. Os tempos de preparo caíram 40% e os erros de pedido praticamente zeraram. A equipe adora a interface.',
  },
  {
    name: 'Roberto Alves',
    role: 'CEO — Rede Delivery Norte',
    text: 'Antes usava 4 sistemas separados. Com o Maestro, tenho tudo em um lugar só. A IA de precificação sozinha já pagou a assinatura no primeiro mês.',
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#212121] mb-4">
            Quem usa, recomenda
          </h2>
          <p className="text-[#666] text-base sm:text-lg max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre o Maestro.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 120}>
              <div className="rounded-2xl border border-[#e5e5e3] p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
                <p className="text-sm text-[#666] leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm text-[#212121]">{t.name}</p>
                  <p className="text-xs text-[#999]">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
