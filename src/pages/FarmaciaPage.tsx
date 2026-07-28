import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Scale, Zap } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'

export function FarmaciaPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <Header category="farmacias" />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 bg-[#0E0E0F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-4">
              Para farmácias que vendem no delivery
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Veja, enfim, se o seu delivery dá lucro.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl">
              A maioria das farmácias vende no delivery sem saber se ganha ou perde com isso. A Granular acende a luz:
              a operação inteira em tempo real, com o número que hoje você não tem.
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

      {/* A dor */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">A dor, nomeada</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-xl">Você opera no escuro — e nem percebe.</h2>
            <p className="mt-6 text-lg text-[#9C958A]">
              O pedido entra, o motoboy sai, o dia acaba. No fim do mês, o caixa fechou — mas o delivery, sozinho,
              deu lucro ou consumiu a margem do balcão? Quase nenhuma farmácia sabe responder. A Granular responde:
              separa o que é delivery, mostra a margem real e dá segurança para decidir.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Como resolve */}
      <section className="py-16 sm:py-24 bg-[#F5F6F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">Entra fácil, mostra resultado cedo</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Por que a Granular funciona rápido na farmácia.</h2>
            <p className="mt-4 text-lg text-[#9C958A] max-w-lg">
              A operação da farmácia é mais direta que a de um restaurante — menos preparo, menos ficha técnica.
              A Granular entra com facilidade e mostra resultado cedo: em pouco tempo você já vê, com dado, se o delivery vale a pena.
            </p>
            <Link
              to="/agendar-demo"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-6 py-3 rounded-xl transition-colors"
            >
              Agendar demonstração <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <div className="grid gap-4">
            {[
              { icon: Eye, title: 'A operação em tempo real', desc: 'Pedidos, entregas e margem numa tela só — o que hoje você só vê no fechamento.' },
              { icon: Scale, title: 'Delivery separado do balcão', desc: 'O número que importa: o delivery, sozinho, dá lucro?' },
              { icon: Zap, title: 'Implantação rápida', desc: 'Menos complexidade que o food service. Resultado cedo.' },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-2xl border border-[#9C958A]/20 bg-white p-5">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                    <c.icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#0E0E0F]">{c.title}</h3>
                    <p className="text-sm text-[#9C958A] mt-1">{c.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
