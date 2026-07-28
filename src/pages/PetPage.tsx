import { Link } from 'react-router-dom'
import { ArrowRight, PawPrint } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'

export function PetPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <Header category="petshop" />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 bg-[#0E0E0F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-4">
              Para pet shops que vendem no delivery
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Seu delivery de pet, sob controle.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl">
              A mesma lógica que organiza restaurantes e farmácias serve para quem vende pet no delivery:
              ver a operação inteira, em tempo real, e decidir por dado.
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

      {/* Conteúdo */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
              <PawPrint size={22} />
            </span>
            <p className="mt-6 text-xl sm:text-2xl font-medium text-[#0E0E0F] max-w-2xl leading-snug">
              A Granular reúne pedidos, estoque e financeiro do seu delivery de pet num lugar só —
              para você parar de operar no escuro e saber, com dado, o que dá resultado.
            </p>
            <Link
              to="/agendar-demo"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-6 py-3 rounded-xl transition-colors"
            >
              Falar com a Granular <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
