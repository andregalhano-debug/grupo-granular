import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Boxes, LineChart, Store } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'

const modules = [
  {
    n: 'Módulo 1',
    icon: Truck,
    name: 'Delivery',
    tagline: 'Tudo que conversa com o iFood, ao vivo.',
    items: ['Pedidos', 'Monitor de Pedidos', 'Cardápio', 'Promoções', 'Avaliações', 'Clientes', 'Conciliação iFood', 'Saúde operacional'],
  },
  {
    n: 'Módulo 2',
    icon: Boxes,
    name: 'Operação',
    tagline: 'O coração, onde tudo acontece.',
    items: ['Estoque', 'Produção', 'Fichas Técnicas', 'Checklists Operacionais'],
  },
  {
    n: 'Módulo 3',
    icon: LineChart,
    name: 'Gestão',
    tagline: 'A visão ampla do negócio, além do delivery.',
    items: ['Financeiro', 'RH'],
  },
  {
    n: 'Módulo 4',
    icon: Store,
    name: 'Salão',
    tagline: 'Para integrar a visão do delivery com o salão na mesma ferramenta.',
    items: ['Recepção', 'Totem', 'Caixa', 'Gorjeta'],
  },
]

export function FerramentaPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <Header />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 bg-[#0E0E0F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-4">A plataforma</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
              A Granular unifica o que hoje está espalhado em vários sistemas.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl">
              E organiza tudo do jeito que você pensa a operação — em quatro módulos.
            </p>
            <Link
              to="/agendar-demo"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-6 py-3 rounded-xl transition-colors"
            >
              Agendar demonstração <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">A plataforma, módulo a módulo</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-xl">
              Comece pelo Delivery. Some os outros módulos quando precisar.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {modules.map((m, i) => (
              <FadeIn key={m.name} delay={i * 80}>
                <div className="h-full rounded-2xl border border-[#9C958A]/20 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                      <m.icon size={20} />
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9C958A] font-bold">{m.n}</span>
                  </div>
                  <h3 className="text-xl font-semibold mt-4 text-[#0E0E0F]">{m.name}</h3>
                  <p className="text-sm text-[#9C958A] mt-1">{m.tagline}</p>
                  <ul className="flex flex-wrap gap-2 mt-4">
                    {m.items.map((it) => (
                      <li key={it} className="text-xs font-mono text-[#0E0E0F] bg-[#F5F6F3] border border-[#9C958A]/20 rounded-full px-3 py-1.5">{it}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Relatoria + IA */}
      <section className="py-16 sm:py-24 bg-[#F5F6F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">Relatoria</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Os números que importam.</h2>
            <p className="mt-4 text-lg text-[#9C958A] max-w-lg">
              Painéis ao vivo, relatórios gerenciais e checklists operacionais — no formato e na frequência que você quer ver.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">A camada de IA</p>
              <h3 className="text-xl font-semibold text-[#0E0E0F]">Um agente que avisa antes de você perguntar.</h3>
              <p className="mt-2 text-sm text-[#9C958A]">
                A Granular não espera você abrir relatório. Ela vê o desvio e te avisa no WhatsApp.
              </p>
              <Link to="/agente" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all">
                Conhecer as habilidades do agente <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Veja por dentro, com os seus números.</h2>
          <Link
            to="/agendar-demo"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-6 py-3 rounded-xl transition-colors"
          >
            Agendar demonstração <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
