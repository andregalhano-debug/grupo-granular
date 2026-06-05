import { TrendingUp, Clock, Users, CalendarCheck } from 'lucide-react'
import { FadeIn } from './FadeIn'

const items = [
  {
    icon: TrendingUp,
    title: 'Controle total de margem e lucro',
    desc: 'Acompanhe os KPIs do seu negócio de forma consolidada e simples, com planos de ação automatizados para proteger sua rentabilidade.',
  },
  {
    icon: Clock,
    title: 'Gestão simplificada, mais tempo de qualidade',
    desc: 'Acompanhe a operação via dados e resultados, com ações direcionadas aos problemas identificados — sem perder horas em planilhas.',
  },
  {
    icon: Users,
    title: 'Tempo para construir Cultura',
    desc: 'O mais importante na operação são as pessoas. A gestão otimizada libera tempo para atuar na estratégia e no desenvolvimento da equipe.',
  },
  {
    icon: CalendarCheck,
    title: 'Rituais e disciplina na rotina',
    desc: 'Garanta que os rituais e combinados sejam cumpridos pela equipe, fortalecendo a cultura construída com o tempo ganho na Granular.',
  },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-4">
            Por que escolher o Grupo Granular?
          </h2>
          <p className="text-[#FAF7F0]/50 text-base sm:text-lg max-w-2xl mx-auto">
            Transforme a produtividade do seu negócio com gestão simplificada e tenha mais tempo de vida.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div className="rounded-2xl border border-[#FAF7F0]/[0.08] bg-[#FAF7F0]/[0.03] p-8 hover:bg-[#FAF7F0]/[0.06] transition-colors h-full">
                <div className="w-11 h-11 rounded-xl bg-[#A31631]/40 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-[#C4223D]" />
                </div>
                <h3 className="text-lg font-semibold text-[#FAF7F0] mb-3">{item.title}</h3>
                <p className="text-sm text-[#FAF7F0]/40 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
