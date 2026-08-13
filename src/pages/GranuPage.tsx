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
  { v: '4', l: 'Frentes', accent: true },
  { v: '14+', l: 'Módulos' },
  { v: '~140', l: 'Ferramentas' },
  { v: '1', l: 'Resposta' },
]

export function GranuPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      <Header />

      <section className="pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <FadeIn className="relative h-[300px] sm:h-[420px] lg:h-[520px] -mx-4 sm:mx-0 overflow-hidden order-first lg:order-last">
            <GranuGrain className="absolute inset-0 w-full h-full" zoom={1.4} />
          </FadeIn>
          <FadeIn>
            <p
              className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[#7c2d3e] mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              A Granu
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-.035em] text-[#2c241f] leading-[1.02] mb-5"
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

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E4DDD2]">
        <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center">
          <FadeIn className="justify-self-center lg:justify-self-start">
            <GranuDualPhones />
          </FadeIn>
          <FadeIn delay={80} className="max-w-md lg:pt-2">
            <p
              className="text-[11.5px] font-medium uppercase tracking-[0.24em] text-[#7c2d3e] mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              No seu bolso · e no sistema
            </p>
            <h2
              className="text-3xl sm:text-[2.15rem] font-semibold tracking-[-.03em] text-[#2c241f] leading-[1.08] mb-4"
            >
              Pergunte como quem pergunta a um sócio.
            </h2>
            <p className="text-[#5D5148] text-[15px] leading-relaxed mb-3">
              No WhatsApp, eu te chamo — resumo do dia e um botão para resolver. Na plataforma, a mesma conversa, com a conta aberta e a evidência do cubo.
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
            <div className="mt-[clamp(28px,4vw,52px)] pt-[26px] border-t border-[#e4ddd2] grid grid-cols-2 sm:grid-cols-4 gap-5">
              {METRICAS.map((m) => (
                <div
                  key={m.l}
                  className={`flex flex-col gap-1.5 pl-4 border-l-2 ${m.accent ? 'border-[#7c2d3e]' : 'border-[#e4ddd2]'}`}
                >
                  <span
                    className="text-[clamp(24px,2.6vw,32px)] leading-none text-[#2c241f] tabular-nums"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {m.v}
                  </span>
                  <span className="text-[13px] text-[#8a7a6e]">{m.l}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-24">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center rounded-[22px] bg-[#241d1a] px-6 py-12 sm:px-12 sm:py-16">
            <p
              className="text-[11.5px] tracking-[.24em] uppercase text-[#c9a27a] mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Próximo passo
            </p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-.03em] text-[#f0ede8] mb-3">
              Quero a Granu na minha operação.
            </h2>
            <p className="text-[15px] text-[#bdb0a4] mb-8 max-w-md mx-auto leading-relaxed">
              Uma conversa de 30 minutos. Você vê o grão rodando com dado real.
            </p>
            <Link
              to="/agendar-demo"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-[#f0ede8] hover:bg-white text-[#241d1a] font-medium px-8 min-h-[52px] rounded-full text-[15px] transition-colors"
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
