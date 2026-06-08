import { useState } from 'react'
import { ArrowRight, UtensilsCrossed, ShoppingCart, Warehouse, Pill, PawPrint, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import telaSistema from '../assets/Tela Maestro.jpg'

export function Hero() {
  const [lightbox, setLightbox] = useState(false)

  return (
    <section id="hero" className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn className="text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#0E0E0F] max-w-4xl mx-auto mb-8">
          Cada pedido é um dado.{' '}
          <span className="text-[#A31631]">
            Cada dado, uma decisão.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#9C958A] max-w-2xl mx-auto mb-10 leading-relaxed">
          Consultoria e gestão em delivery, potencializadas por IA e especialistas.
        </p>

        {/* Segmentos */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          {[
            { icon: UtensilsCrossed, label: 'Restaurantes' },
            { icon: ShoppingCart, label: 'Mercados' },
            { icon: Warehouse, label: 'Atacarejos' },
            { icon: Pill, label: 'Farmácias' },
            { icon: PawPrint, label: 'Pet Shop' },
          ].map((seg) => (
            <div
              key={seg.label}
              className="flex items-center gap-2 bg-[#A31631]/5 border border-[#A31631]/15 px-4 py-2 rounded-full"
            >
              <seg.icon size={16} className="text-[#A31631]" />
              <span className="text-sm font-medium text-[#0E0E0F]">{seg.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Link
            to="/checkout?plano=saas-2"
            className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Começar Agora
            <ArrowRight size={18} />
          </Link>
          <a
            href="#modulos"
            className="inline-flex items-center gap-2 border border-[#9C958A]/30 hover:border-[#A31631]/30 text-[#0E0E0F] font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Ver Módulos
          </a>
        </div>
      </FadeIn>

      {/* Screenshot real do sistema */}
      <FadeIn delay={200} className="mt-20 sm:mt-28">
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
            className="w-full block cursor-pointer hover:opacity-90 transition-opacity"
            fetchPriority="high"
            onClick={() => setLightbox(true)}
            title="Clique para ampliar"
          />
        </div>
      </FadeIn>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setLightbox(false)}
          style={{ animation: 'fadeInHero 0.2s ease' }}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={telaSistema}
            alt="Dashboard Granular ampliado"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeInHero {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
