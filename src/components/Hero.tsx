import { ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'
import telaSistema from '../assets/Tela Maestro.jpg'

export function Hero() {
  return (
    <section id="hero" className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#5C1A2B]/10 text-[#5C1A2B] px-4 py-2 rounded-full text-xs font-medium mb-8 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Consultoria e Gestão em Delivery
        </div>

        {/* Headline — Instrument Serif italic for editorial feel */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#0E0E0F] max-w-4xl mx-auto mb-6">
          Cada pedido é um dado.{' '}
          <span className="text-[#5C1A2B] italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Cada dado, uma decisão.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#9C958A] max-w-2xl mx-auto mb-10 leading-relaxed">
          Consultoria e gestão em delivery, potencializadas por IA — para restaurantes, farmácias e atacarejos.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <a
            href="#precos"
            className="inline-flex items-center gap-2 bg-[#5C1A2B] hover:bg-[#3A1019] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Começar Free Trial de 14 dias
            <ArrowRight size={18} />
          </a>
          <a
            href="#modulos"
            className="inline-flex items-center gap-2 border border-[#9C958A]/30 hover:border-[#5C1A2B]/30 text-[#0E0E0F] font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Ver Módulos
          </a>
        </div>
        <p className="text-xs text-[#9C958A] mb-16">
          Sem cartão de crédito. Cancele quando quiser.
        </p>
      </FadeIn>

      {/* Screenshot real do sistema */}
      <FadeIn delay={200}>
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#9C958A]/20 overflow-hidden shadow-2xl shadow-black/10">
          {/* Browser Chrome */}
          <div className="bg-[#0E0E0F] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-[#2A2622] rounded-lg px-4 py-1.5 text-xs text-[#9C958A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              app.granular.com.br/dashboard
            </div>
          </div>

          {/* Imagem real */}
          <img
            src={telaSistema}
            alt="Dashboard Granular — Visão geral de faturamento, pedidos, promoções e clientes"
            className="w-full block"
          />
        </div>
      </FadeIn>
    </section>
  )
}
