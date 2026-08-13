import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'
import { GranuGrain } from '../components/granu/GranuGrain'
import { GranuDualPhones } from '../components/granu/GranuWhatsApp'

const FAZ = [
  { n: '01', t: 'Conciliação automática', d: 'Pedido a pedido, batendo no banco.' },
  { n: '02', t: 'Vitrine por turno', d: 'Sobe ou desce posição, com evidência.' },
  { n: '03', t: 'Avaliações e SLA vigiados', d: 'Alerta antes do dano na nota.' },
  { n: '04', t: 'Promo com ROI medido', d: 'Campanhas zumbis detectadas.' },
  { n: '05', t: 'Cardápio inteligente', d: 'Atualização massiva e reordenação de itens.' },
]

const METRICAS = [
  { v: '4', l: 'Frentes' },
  { v: '14+', l: 'Módulos' },
  { v: '~140', l: 'Ferramentas' },
  { v: '1', l: 'Resposta' },
]

export function GranuPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#F7F3EB]">
      <Header />

      <section className="pt-28 sm:pt-36 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <FadeIn className="relative h-[300px] sm:h-[420px] lg:h-[520px] -mx-4 sm:mx-0 order-first lg:order-last">
            <GranuGrain className="absolute inset-0 w-full h-full" zoom={1.4} />
          </FadeIn>
          <FadeIn>
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A31631] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              A Granu
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E0E0F] leading-[1.02] mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Eu sou<br />a Granu.
            </h1>
            <p className="text-base sm:text-lg text-[#5D5148] leading-relaxed max-w-[44ch] mb-4">
              A IA responsável pelo sistema inteiro. Conectada a cada venda, cada item de estoque, cada centavo de repasse — em tempo real. Este grão ao lado sou eu.
            </p>
            <p className="text-[#6B3F1F] italic text-lg sm:text-xl leading-snug max-w-[42ch]">
              Não sou um chatbot em cima de relatório. Sou o sistema, e conheço cada grão dele.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#E4DDD2]">
        <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center">
          <FadeIn className="justify-self-center lg:justify-self-start">
            <GranuDualPhones />
          </FadeIn>
          <FadeIn delay={80} className="max-w-md lg:pt-2">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A31631] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              No seu bolso · e no sistema
            </p>
            <h2
              className="text-3xl sm:text-[2.15rem] font-bold tracking-tight text-[#0E0E0F] leading-[1.08] mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Pergunte como quem pergunta a um sócio.
            </h2>
            <p className="text-[#5D5148] text-[15px] leading-relaxed mb-3">
              À esquerda, eu te chamo no WhatsApp — resumo do dia e um botão para resolver. Ao lado, a mesma conversa dentro da plataforma, com a conta aberta e a evidência do cubo.
            </p>
            <p className="text-[#6B3F1F] italic text-[16px] leading-snug mb-8">
              “Você não abre dashboard às 8 da manhã. Eu te mando o dia — e você resolve com um toque.”
            </p>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A2968A] mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              A Granu faz
            </p>
            <div className="divide-y divide-[#DDD4C8]">
              {FAZ.map((item) => (
                <div key={item.n} className="grid grid-cols-[28px_1fr] gap-3 py-3">
                  <span className="text-[12px] text-[#A2968A] pt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.n}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-[#241D1A] tracking-tight">{item.t}</p>
                    <p className="text-sm text-[#5F544C] mt-0.5 leading-snug">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

          <FadeIn>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-[#DDD4C8] border-t border-[#DDD4C8] pt-8">
              {METRICAS.map((m) => (
                <div key={m.l} className="sm:px-6 first:sm:pl-0">
                  <p className="text-3xl font-semibold text-[#A31631] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{m.v}</p>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#A2968A] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.l}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center rounded-3xl bg-[#0E0E0F] px-6 py-12 sm:py-14">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Quero a Granu na minha operação.
            </h2>
            <p className="text-sm text-white/50 mb-7 max-w-md mx-auto">
              Uma conversa de 30 minutos. Você vê o grão rodando com dado real.
            </p>
            <Link
              to="/agendar-demo"
              className="inline-flex items-center justify-center bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3.5 rounded-xl text-sm transition-colors"
            >
              Agendar demonstração
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  )
}
