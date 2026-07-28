import { Link } from 'react-router-dom'
import { ArrowRight, Users, GraduationCap, ClipboardCheck, UserCog } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'

const mentorLinks = [
  { to: '/consultores', icon: Users, title: 'Rede de mentores', desc: 'Operadores experientes que vivem o dia a dia como você.' },
  { to: '/seja-consultor', icon: UserCog, title: 'Seja um mentor', desc: 'Faça parte da rede de operadores da Granular.' },
  { to: '/trilha', icon: GraduationCap, title: 'Trilha de formação', desc: 'O caminho de capacitação dos mentores.' },
  { to: '/diagnostico', icon: ClipboardCheck, title: 'Diagnóstico', desc: 'Avalie a maturidade da sua operação.' },
]

export function EnterprisePage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <Header />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 bg-[#0E0E0F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-4">
              Para operações com mais de 20 mil pedidos/mês
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Quando a operação é grande demais para ligar sozinho, um especialista entra com você.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl">
              Um profissional sênior entra na sua operação, implementa junto e sai deixando você andar sozinho — sem criar dependência.
            </p>
            <Link
              to="/agendar-demo"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-6 py-3 rounded-xl transition-colors"
            >
              Falar com o time enterprise <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Não é consultoria genérica */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xl sm:text-2xl font-medium text-[#0E0E0F] max-w-2xl leading-snug">
              Não é consultoria genérica. É alguém que já operou delivery de verdade, dentro da sua operação,
              por tempo determinado, com desmame planejado desde o primeiro dia.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Rede de mentores */}
      <section className="py-16 sm:py-24 bg-[#F5F6F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">O valor da experiência humana</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-xl">Você não fica sozinho com o dado na mão.</h2>
            <p className="mt-4 text-lg text-[#9C958A] max-w-2xl">
              Quando precisar de um humano, você tem acesso a uma rede de mentores — operadores experientes, que vivem o dia a dia como você.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {mentorLinks.map((m, i) => (
              <FadeIn key={m.to} delay={i * 80}>
                <Link to={m.to} className="group flex items-start gap-4 rounded-2xl border border-[#9C958A]/20 bg-white p-5 hover:shadow-lg transition-shadow">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                    <m.icon size={20} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0E0E0F] flex items-center gap-1.5">
                      {m.title} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-sm text-[#9C958A] mt-1">{m.desc}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
