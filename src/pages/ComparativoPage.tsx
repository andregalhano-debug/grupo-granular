import { Link } from 'react-router-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

interface ComparisonRow {
  feature: string
  granular: boolean
  saipos: boolean
  anotaAi: boolean
}

const rows: ComparisonRow[] = [
  { feature: 'Agentes de IA nativos (15+)', granular: true, saipos: false, anotaAi: false },
  { feature: 'DRE automático', granular: true, saipos: false, anotaAi: false },
  { feature: 'Mentoria de negócios integrada', granular: true, saipos: false, anotaAi: false },
  { feature: 'Integração iFood', granular: true, saipos: true, anotaAi: true },
  { feature: 'Gestão de estoque', granular: true, saipos: true, anotaAi: false },
  { feature: 'Previsão de demanda com IA', granular: true, saipos: false, anotaAi: false },
  { feature: 'Suporte em português', granular: true, saipos: true, anotaAi: true },
  { feature: 'Planos sob consulta', granular: true, saipos: false, anotaAi: false },
]

function Cell({ value }: { value: boolean }) {
  return (
    <td className="px-4 py-4 text-center">
      {value ? (
        <div className="flex justify-center">
          <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
            <Check size={14} className="text-emerald-600" strokeWidth={2.5} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-7 h-7 rounded-full bg-[#F7F7F7] flex items-center justify-center">
            <X size={14} className="text-[#9C958A]" strokeWidth={2} />
          </div>
        </div>
      )}
    </td>
  )
}

export function ComparativoPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <title>Granular vs Saipos vs Anota AI — Comparativo | Grupo Granular</title>

      <Header />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[#E63946] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Comparativo
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Por que escolher o{' '}
            <span className="text-[#E63946]">Grupo Granular?</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Compare e veja por que gestores migram para a Granular.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
              Granular vs. concorrentes
            </h2>
            <p className="text-[#9C958A] text-base">
              Uma comparação honesta das funcionalidades que realmente fazem diferença na operação.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#9C958A]/15">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F7F7F7]">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-[#0E0E0F] w-1/2">
                    Funcionalidade
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-[#E63946]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base font-black">Granular</span>
                      <span className="text-[10px] font-semibold text-[#E63946]/70 uppercase tracking-wider bg-[#E63946]/10 px-2 py-0.5 rounded-full">Recomendado</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-[#9C958A]">
                    Saipos
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-[#9C958A]">
                    Anota AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-t border-[#9C958A]/10 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}`}
                  >
                    <td className="px-4 py-4 text-sm text-[#0E0E0F] font-medium">
                      {row.feature}
                    </td>
                    <Cell value={row.granular} />
                    <Cell value={row.saipos} />
                    <Cell value={row.anotaAi} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-[#9C958A] text-center">
            Informações baseadas em dados públicos disponíveis nos sites dos concorrentes. Atualizado em junho/2026.
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#0E0E0F] mb-4">
              O que só a Granular oferece
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: '15 Agentes de IA',
                desc: 'Johny, CFO, DIANA, MIDAS, TYCHE e outros 10 agentes operando 24/7 com dados reais da sua operação.',
                icon: '🤖',
              },
              {
                title: 'Mentoria integrada',
                desc: 'Especialistas reais em food service e varejo disponíveis sob demanda — não apenas suporte técnico.',
                icon: '🎓',
              },
              {
                title: 'Comece sob consulta',
                desc: 'Comece com o plano básico e expanda conforme cresce. Sem lock-in, sem instalação, cancele quando quiser.',
                icon: '💰',
              },
            ].map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-6 border border-[#9C958A]/15 text-center">
                <div className="text-3xl mb-3">{d.icon}</div>
                <h3 className="text-sm font-bold text-[#0E0E0F] mb-2">{d.title}</h3>
                <p className="text-xs text-[#9C958A] leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Pronto para fazer a troca?
          </h2>
          <p className="text-white/50 text-base mb-8">
            Fale com a gente. Sem instalação, sem fidelidade, cancele quando quiser.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/agendar-demo"
              className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#7d101f] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Falar com a gente
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/agendar-demo"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Agendar demonstração
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
