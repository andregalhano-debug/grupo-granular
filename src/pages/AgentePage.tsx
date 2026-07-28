import { Link } from 'react-router-dom'
import { ArrowRight, TriangleAlert, MessageSquare } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'

export function AgentePage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <Header />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 bg-[#0E0E0F] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-4">
              Inteligência que trabalha por você · 24/7
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Um agente que conhece o seu negócio e fala a sua língua.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-lg">
              Ele te avisa quando algo precisa da sua atenção — e responde quando você pergunta.
            </p>
            <Link
              to="/agendar-demo"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] px-6 py-3 rounded-xl transition-colors"
            >
              Agendar demonstração <ArrowRight size={16} />
            </Link>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 bg-[#221a0c] border border-[#4a3a17] rounded-2xl px-4 py-3">
                <TriangleAlert size={18} className="text-[#F6B93B] mt-0.5 shrink-0" />
                <p className="text-sm text-[#EDE6D8]">O item do seu prato campeão está prestes a acabar.</p>
              </div>
              <div className="self-end max-w-[80%] bg-white text-[#0E0E0F] rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-medium">
                Como estão minhas vendas agora?
              </div>
              <div className="self-start max-w-[80%] bg-white/10 text-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                R$ 4.180 até agora — 15% acima de quarta passada.
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Duas formas */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold mb-3">Duas formas de trabalhar por você</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">O agente atua de duas formas.</h2>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-5 mt-10 items-start">
            <FadeIn>
              <div className="rounded-2xl border border-[#9C958A]/20 p-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  <TriangleAlert size={14} /> 01 · Alertas — ele te avisa
                </div>
                <h3 className="text-xl font-semibold mt-3 text-[#0E0E0F]">Recebe o que precisa da sua atenção, sem você pedir.</h3>
                <p className="mt-2 text-sm text-[#9C958A]">
                  Alertas no WhatsApp quando aparece um ponto de atenção que pede ação rápida.
                </p>
                <div className="mt-4 flex items-start gap-3 bg-[#FBF3E4] border border-[#EED9AE] rounded-xl px-4 py-3">
                  <TriangleAlert size={16} className="text-[#B97810] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#0E0E0F]">Suas vendas estão mais baixas do que ontem no mesmo horário.</p>
                </div>
                <p className="mt-4 pt-3 border-t border-[#9C958A]/15 text-sm text-[#0E0E0F]"><b>Ele vigia.</b> Detecta anomalias, variações e desvios sem você pedir.</p>
                <p className="pt-3 text-sm text-[#0E0E0F]"><b>Ele avisa.</b> Alerta quando algo saiu do lugar — venda fora da curva, preparo lento, item acabando.</p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="rounded-2xl border border-[#9C958A]/20 p-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-bold">
                  <MessageSquare size={14} /> 02 · Chat — você pergunta
                </div>
                <h3 className="text-xl font-semibold mt-3 text-[#0E0E0F]">Pergunte como quem fala com um gerente.</h3>
                <p className="mt-2 text-sm text-[#9C958A]">
                  No chat, você pergunta em linguagem natural e recebe o número certo em segundos — sem montar planilha nem esperar o relatório do mês.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="self-end max-w-[85%] bg-[#0E0E0F] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">Compare com a semana passada.</div>
                  <div className="self-start max-w-[85%] bg-[#F5F6F3] text-[#0E0E0F] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">Vendas +15%, margem estável. Preparo 3 min mais lento.</div>
                </div>
                <p className="mt-4 pt-3 border-t border-[#9C958A]/15 text-sm text-[#0E0E0F]"><b>Ele explica.</b> Responde com o número certo e o porquê.</p>
                <p className="pt-3 text-sm text-[#0E0E0F]"><b>Ele compara.</b> Hoje vs. semana passada, esta semana vs. o mês passado.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-[#F5F6F3]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">É como ter um analista que nunca dorme.</h2>
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
