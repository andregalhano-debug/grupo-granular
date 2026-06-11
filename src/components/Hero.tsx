import { useState } from 'react'
import { ArrowRight, UtensilsCrossed, ShoppingCart, Pill, PawPrint, X, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import telaSistema from '../assets/Tela Maestro.jpg'
import telaMarket from '../assets/TEla sistema televendas Granular 2 para Market.jpg'
import type { Category } from './Modules'

interface Props {
  category: Category
  setCategory: (c: Category) => void
}

const systemNames: Record<Category, string> = {
  restaurantes: 'Granular Food',
  mercados: 'Granular Market',
  farmacias: 'Granular Farma',
  petshop: 'Granular PET',
}

const systemDescs: Record<Category, string> = {
  restaurantes: 'Visão completa da sua operação em um só painel — faturamento, pedidos, promoções e clientes em tempo real.',
  mercados: 'Gestão completa do seu mercado — estoque, televendas, financeiro e clientes em um único painel.',
  farmacias: 'Em desenvolvimento. Módulos específicos para o segmento farmacêutico chegando em breve.',
  petshop: 'Em desenvolvimento. Solução completa para clínicas veterinárias e pet shops chegando em breve.',
}

// Cor de acento por categoria — usada no card ativo e no restante do site via Header
export const categoryAccent: Record<Category, { primary: string; light: string; border: string }> = {
  restaurantes: { primary: '#A31631', light: '#A31631/10', border: '#A31631/20' },
  mercados:     { primary: '#0A4D68', light: '#0A4D68/10', border: '#0A4D68/20' },
  farmacias:    { primary: '#1B6B3A', light: '#1B6B3A/10', border: '#1B6B3A/20' },
  petshop:      { primary: '#8B4513', light: '#8B4513/10', border: '#8B4513/20' },
}

const categories: {
  id: Category
  icon: typeof UtensilsCrossed
  label: string
  description: string
  comingSoon?: boolean
}[] = [
  { id: 'restaurantes', icon: UtensilsCrossed, label: 'Restaurantes', description: 'Bares, lanchonetes, fast food e delivery' },
  { id: 'mercados', icon: ShoppingCart, label: 'Mercados', description: 'Supermercados, atacarejos e atacados' },
  { id: 'farmacias', icon: Pill, label: 'Farmácias', description: 'Redes farmacêuticas e drogarias', comingSoon: true },
  { id: 'petshop', icon: PawPrint, label: 'Pet Shop', description: 'Clínicas veterinárias e pet shops', comingSoon: true },
]

const mercadoSubs = ['Atacarejo', 'Supermercado', 'Atacado']

export function Hero({ category, setCategory }: Props) {
  const [lightbox, setLightbox] = useState(false)

  const isComingSoon = category === 'farmacias' || category === 'petshop'
  const showContent = !isComingSoon

  return (
    <section id="hero" className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn className="text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#0E0E0F] max-w-4xl mx-auto mb-8">
          Cada pedido é um dado.{' '}
          <span className="text-[var(--accent)]">
            Cada dado, uma decisão.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#9C958A] max-w-2xl mx-auto mb-10 leading-relaxed">
          Gestão completa para delivery, <span className="text-[var(--accent)] font-semibold whitespace-nowrap">com IA de ponta a ponta</span>.
        </p>

        {/* ── Seleção de categoria — foco principal ── */}
        <div className="mb-12">
          {/* Prompt proeminente */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0E0E0F] mb-2">
              Para qual segmento você quer ver a solução?
            </h2>
            <p className="text-sm text-[#9C958A]">Selecione abaixo para personalizar toda a navegação</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-3xl mx-auto">
            {categories.map((cat) => {
              const isActive = category === cat.id
              const accent = categoryAccent[cat.id]
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`relative group rounded-2xl border-2 p-5 sm:p-6 text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'shadow-xl scale-[1.03]'
                      : cat.comingSoon
                        ? 'border-[#9C958A]/15 bg-[#F7F7F7] opacity-60 hover:opacity-75'
                        : 'border-[#9C958A]/20 bg-white hover:shadow-lg hover:scale-[1.01]'
                  }`}
                  style={isActive ? {
                    borderColor: accent.primary,
                    backgroundColor: `${accent.primary}0d`,
                    boxShadow: `0 8px 30px ${accent.primary}20`,
                  } : {}}
                >
                  {cat.comingSoon && (
                    <span className="absolute -top-2.5 right-3 text-[9px] font-bold uppercase tracking-wider bg-[#9C958A] text-white px-2 py-0.5 rounded-full">
                      Em breve
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="absolute -top-2.5 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: accent.primary }}
                    >
                      Selecionado
                    </span>
                  )}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors`}
                    style={isActive
                      ? { backgroundColor: accent.primary }
                      : { backgroundColor: '#9C958A20' }
                    }
                  >
                    <cat.icon size={20} className={isActive ? 'text-white' : 'text-[#9C958A]'} />
                  </div>
                  <p
                    className="text-sm font-bold mb-1"
                    style={isActive ? { color: accent.primary } : { color: '#0E0E0F' }}
                  >
                    {cat.label}
                  </p>
                  <p className="text-[11px] text-[#9C958A] leading-snug">{cat.description}</p>
                  {isActive && (
                    <div className="flex items-center gap-1 mt-3 text-[10px] font-semibold" style={{ color: accent.primary }}>
                      <ChevronRight size={10} /> Ver solução
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Mercados: subcategorias informativas (sem CTAs) */}
          {category === 'mercados' && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <span className="text-xs text-[#9C958A]">Abrange:</span>
              {mercadoSubs.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-[var(--accent-08)] text-[var(--accent)] px-3 py-1 rounded-full border border-[var(--accent-15)] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Em breve: mensagem inline */}
          {isComingSoon && (
            <div className="mt-5 inline-flex items-center gap-2 bg-[#F7F7F7] border border-[#9C958A]/20 px-4 py-2.5 rounded-xl text-sm text-[#9C958A]">
              <Clock size={14} />
              Estamos desenvolvendo essa jornada — em breve disponível.
            </div>
          )}
        </div>

        {/* CTAs — visíveis apenas para categorias ativas */}
        {showContent && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              to="/checkout?plano=saas-2"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Começar Agora
              <ArrowRight size={18} />
            </Link>
            <a
              href="#modulos"
              className="inline-flex items-center gap-2 border border-[#9C958A]/30 hover:border-[var(--accent-30)] text-[#0E0E0F] font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Ver Módulos
            </a>
          </div>
        )}
      </FadeIn>

      {/* Screenshot do sistema — apenas para categorias ativas */}
      {showContent && (
        <FadeIn delay={200} className="mt-20 sm:mt-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
              {systemNames[category]}
            </h2>
            <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
              {systemDescs[category]}
            </p>
          </div>

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

            {/* Imagem por segmento */}
            {(category === 'restaurantes' || category === 'mercados') ? (
              <img
                src={category === 'mercados' ? telaMarket : telaSistema}
                alt={`Dashboard ${systemNames[category]} — Visão geral da operação`}
                className="w-full block cursor-pointer hover:opacity-90 transition-opacity"
                fetchPriority="high"
                onClick={() => setLightbox(true)}
                title="Clique para ampliar"
              />
            ) : (
              <div className="w-full bg-[#F7F7F7] flex items-center justify-center" style={{ minHeight: '340px' }}>
                <div className="text-center px-6 py-12">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-10)] flex items-center justify-center mx-auto mb-4">
                    {category === 'petshop' && <PawPrint size={28} className="text-[var(--accent)]" />}
                  </div>
                  <p className="text-sm font-semibold text-[#0E0E0F] mb-1">Screenshot {systemNames[category]}</p>
                  <p className="text-xs text-[#9C958A]">Aguardando validação do print de tela</p>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      )}

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
            src={category === 'mercados' ? telaMarket : telaSistema}
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
