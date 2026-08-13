import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'
import { GranuGrain } from '../components/granu/GranuGrain'
import { GranuDualPhones } from '../components/granu/GranuWhatsApp'

const FAZ = [
  { t: 'Eu vejo o caixa', d: 'DRE, margem e CMV em tempo real — não no fechamento do mês.' },
  { t: 'Eu aviso antes', d: 'Ruptura, anomalia, queda de faturamento. Do jeito que você configurar.' },
  { t: 'Eu executo com o seu ok', d: 'Lista de compras, checklist, aprovar ou rejeitar — direto na conversa.' },
  { t: 'Eu não decido sozinha', d: 'Proponho com evidência. Ação sensível passa por você.' },
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

      <section className="bg-[#A31631] text-[#FAF7F0] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="max-w-2xl mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F7F3EB]/70 mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              No seu bolso · e no sistema
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.08] mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Eu te chamo no WhatsApp.<br />E respondo dentro da plataforma.
            </h2>
            <p className="italic text-[#F7F3EB]/85 text-lg leading-snug max-w-[46ch] mb-6">
              “Você não abre dashboard às 8 da manhã. Eu te mando o dia — e você resolve com um toque.”
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-[#F7F3EB]/80 max-w-[48ch]">
              <li><strong className="text-white font-medium">WhatsApp</strong> — resumo, alerta e botão de aprovar, no celular.</li>
              <li><strong className="text-white font-medium">Plataforma</strong> — a mesma Granu, com tabela e evidência do cubo.</li>
            </ul>
          </FadeIn>
          <FadeIn delay={80}>
            <GranuDualPhones />
          </FadeIn>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A31631] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              O que eu faço
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Um sistema. Um grão.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4 items-stretch">
            {FAZ.map((item) => (
              <FadeIn key={item.t} className="h-full">
                <div className="h-full min-h-[148px] rounded-2xl bg-white/70 border border-[#E4DDD2] p-5 sm:p-6 flex flex-col">
                  <p className="text-base font-semibold text-[#0E0E0F] mb-1.5">{item.t}</p>
                  <p className="text-sm text-[#5D5148] leading-relaxed flex-1">{item.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
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
