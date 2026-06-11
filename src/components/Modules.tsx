import { useState, useRef, useEffect } from 'react'
import { Smartphone, Shield, BarChart3, X, ChevronRight, CalendarDays, Clock, ShoppingCart, UtensilsCrossed, Pill, PawPrint, ZoomIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { modulesDataRestaurantes, modulesDataMercados } from '../data/modulesData'
import { useCategoryAccent } from '../stores/CategoryContext'

export type Category = 'restaurantes' | 'mercados' | 'farmacias' | 'petshop'

const categoryLabels: Record<Category, { emoji: string; label: string; icon: typeof UtensilsCrossed }> = {
  restaurantes: { emoji: '🍽️', label: 'Restaurantes', icon: UtensilsCrossed },
  mercados: { emoji: '🛒', label: 'Mercados', icon: ShoppingCart },
  farmacias: { emoji: '💊', label: 'Farmácias', icon: Pill },
  petshop: { emoji: '🐾', label: 'Pet Shop', icon: PawPrint },
}

interface Props {
  category?: Category
}

const badges = [
  { icon: Smartphone, text: 'Versão mobile nativa' },
  { icon: Shield, text: 'Multi-lojas com visões apartadas' },
  { icon: BarChart3, text: 'Benchmark entre unidades' },
]

/* Calcula após qual índice inserir o painel, de acordo com colunas visíveis */
function getRowEndIndex(clickedIndex: number, cols: number): number {
  return Math.floor(clickedIndex / cols) * cols + (cols - 1)
}

const categoryConfig = {
  farmacias: {
    label: 'Farmácias',
    emoji: '💊',
    desc: 'Estamos desenvolvendo uma jornada completa para o segmento farmacêutico, com módulos específicos para controle de medicamentos, receituário e regulatório.',
  },
  petshop: {
    label: 'Pet Shop',
    emoji: '🐾',
    desc: 'Em breve você poderá ver todos os módulos e funcionalidades especialmente desenvolvidos para clínicas veterinárias e pet shops.',
  },
}

export function Modules({ category = 'restaurantes' }: Props) {
  useCategoryAccent() // ensures context is consumed; CSS vars on root drive styling
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [cols, setCols] = useState(4)

  const modules = category === 'mercados' ? modulesDataMercados : modulesDataRestaurantes

  /* Reset open panel when category changes */
  useEffect(() => {
    setOpenIndex(null)
  }, [category])

  /* Detecta quantas colunas o grid exibe */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setCols(w >= 1024 ? 4 : w >= 640 ? 2 : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (openIndex !== null && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [openIndex])

  // Fechar ao clicar fora do painel de detalhes (e fora de um botão de módulo)
  useEffect(() => {
    if (openIndex === null) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Se clicou num botão de módulo, o handleToggle já cuida
      if (target.closest('button[data-module]')) return
      // Se clicou dentro do painel de detalhes, não fechar
      if (detailRef.current && detailRef.current.contains(target)) return
      // Qualquer outro clique fecha e volta ao início dos módulos
      setOpenIndex(null)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openIndex])

  const handleToggle = (i: number) => {
    if (openIndex === i) {
      setOpenIndex(null)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setOpenIndex(i)
    }
  }

  /* Em breve — Farmácias e Pet Shop */
  if (category === 'farmacias' || category === 'petshop') {
    const cfg = categoryConfig[category]
    return (
      <section ref={sectionRef} id="modulos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
              Tudo que sua operação precisa, em um só lugar
            </h2>
            <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto mb-6">
              Módulos integrados que eliminam planilhas e unificam sua gestão.
            </p>
            <a
              href="#hero"
              className="inline-flex items-center gap-2 bg-[#F7F7F7] border border-[#9C958A]/20 hover:border-[var(--accent-30)] px-4 py-2 rounded-full text-xs text-[#9C958A] transition-colors group"
            >
              <span>{categoryLabels[category].emoji}</span>
              <span className="font-medium text-[#0E0E0F]">{categoryLabels[category].label}</span>
              <span className="text-[#9C958A]/60">·</span>
              <span className="text-[var(--accent)] group-hover:underline">Trocar segmento ↑</span>
            </a>
          </FadeIn>
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center py-16 px-6 rounded-3xl border-2 border-dashed border-[#9C958A]/25 bg-[#F7F7F7]">
              <div className="text-5xl mb-6">{cfg.emoji}</div>
              <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                <Clock size={12} />
                Em breve
              </div>
              <h3 className="text-2xl font-bold text-[#0E0E0F] mb-3">{cfg.label}</h3>
              <p className="text-[#9C958A] leading-relaxed mb-8">{cfg.desc}</p>
              <Link
                to="/agendar-demo"
                className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
              >
                <CalendarDays size={16} />
                Agendar demonstração
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  /* Índice do último item da linha do módulo aberto */
  const insertAfter = openIndex !== null ? Math.min(getRowEndIndex(openIndex, cols), modules.length - 1) : -1
  const openModule = openIndex !== null ? modules[openIndex] : null

  /* Monta os itens do grid intercalando o painel na posição certa */
  const renderGridItems = () => {
    const items: React.ReactNode[] = []

    modules.forEach((mod, i) => {
      items.push(
        <FadeIn key={mod.title} delay={i * 80}>
          <button
            data-module
            onClick={() => handleToggle(i)}
            className={`group relative rounded-2xl border p-6 transition-all duration-300 h-full w-full text-left cursor-pointer ${
              openIndex === i
                ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-lg shadow-[var(--accent-10)]'
                : mod.standalone
                  ? 'border-[var(--accent)]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/20 hover:shadow-lg hover:shadow-[var(--accent-05)]'
                  : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/20 hover:shadow-lg hover:shadow-[var(--accent-05)]'
            }`}
          >
            {mod.standalone && (
              <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-full">
                Disponível avulso
              </span>
            )}
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <mod.icon size={22} className="text-[var(--accent)]" />
              </div>
              <ChevronRight
                size={18}
                className={`text-[#9C958A] transition-transform duration-300 mt-1 ${
                  openIndex === i ? 'rotate-90 text-[var(--accent)]' : 'group-hover:text-[var(--accent)]'
                }`}
              />
            </div>
            <h3 className="font-semibold text-[#0E0E0F] mb-2">{mod.title}</h3>
            <p className="text-sm text-[#9C958A] leading-relaxed">{mod.desc}</p>
          </button>
        </FadeIn>
      )

      /* Insere o painel de detalhes após o último item da linha */
      if (openModule && i === insertAfter) {
        items.push(
          <div
            key="detail-panel"
            ref={detailRef}
            className="col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden"
            style={{ animation: 'slideDown 0.4s ease forwards' }}
          >
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-white shadow-xl shadow-[var(--accent-05)] overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-[#0E0E0F]/5 gap-3">
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    <openModule.icon size={20} className="text-[var(--accent)] sm:hidden" />
                    <openModule.icon size={24} className="text-[var(--accent)] hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#0E0E0F]">{openModule.title}</h3>
                    <p className="text-xs sm:text-sm text-[#9C958A] line-clamp-2">{openModule.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] hover:text-[#0E0E0F] transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Lado esquerdo — texto e funcionalidades */}
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                  {openModule.detailPoints ? (
                    <ul className="space-y-2 mb-6">
                      {openModule.detailPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#0E0E0F]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[#0E0E0F] leading-relaxed mb-6">
                      {openModule.detailText}
                    </p>
                  )}

                  <div className="mb-6">
                    <p
                      className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Funcionalidades
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {openModule.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-full font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs por tipo de módulo */}
                  {openModule.standalone && openModule.title.includes('Televendas') ? (
                    <div className="flex flex-col gap-3 self-start w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#0E0E0F] mb-1">
                            Módulo disponível avulso
                          </p>
                          <p className="text-xs text-[#9C958A] leading-relaxed">
                            O módulo Televendas pode ser contratado de forma independente por <strong className="text-[#0E0E0F]">R$ 419/mês</strong>. Central de vendas por telefone e WhatsApp totalmente integrada ao Granular Market.
                          </p>
                        </div>
                        <Link
                          to="/checkout?plano=modulo-televendas"
                          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
                        >
                          <ShoppingCart size={15} />
                          Adicionar ao carrinho
                        </Link>
                      </div>
                    </div>
                  ) : openModule.standalone && openModule.title.includes('Pessoas') ? (
                    <div className="flex flex-col gap-3 self-start">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#0E0E0F] mb-1">
                            Contrate este módulo separadamente
                          </p>
                          <p className="text-xs text-[#9C958A] leading-relaxed">
                            O módulo Pessoas (RH) pode ser adquirido de forma independente por <strong className="text-[#0E0E0F]">R$ 599/mês</strong>. Ideal para operações que já possuem ERP mas precisam de gestão de equipe especializada em food service.
                          </p>
                        </div>
                        <Link
                          to="/checkout?plano=modulo-pessoas"
                          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
                        >
                          Começar Agora — R$ 599/mês
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                      <Link
                        to="/checkout?plano=saas-3"
                        className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-dark)] font-medium text-xs transition-colors self-start"
                      >
                        Ou veja o Módulo 3 completo (RH + Produção) →
                      </Link>
                    </div>
                  ) : openModule.title.includes('Foozi') ? (
                    /* Foozi: apenas descrição, sem CTAs */
                    null
                  ) : (
                    <div className="flex flex-wrap items-center gap-3 self-start">
                      <Link
                        to="/checkout?plano=saas-2"
                        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                      >
                        Começar Agora
                        <ChevronRight size={16} />
                      </Link>
                      <Link
                        to="/agendar-demo"
                        className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                      >
                        <CalendarDays size={16} />
                        Agendar demonstração
                      </Link>
                    </div>
                  )}
                </div>

                {/* Lado direito — screenshot */}
                <div className="bg-[#F7F7F7] p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[#0E0E0F]/5">
                  {openModule.screenshot ? (
                    <div
                      className="relative group w-full max-w-lg cursor-pointer"
                      onClick={() => setLightbox(openModule.screenshot)}
                    >
                      <img
                        src={openModule.screenshot}
                        alt={`Tela do módulo ${openModule.title}`}
                        className="rounded-xl shadow-lg w-full object-cover transition-all duration-300 group-hover:brightness-75"
                        loading="lazy"
                      />
                      {/* Overlay de zoom */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg">
                          <ZoomIn size={16} className="text-[var(--accent)]" />
                          <span className="text-sm font-medium text-[#0E0E0F]">Clique para ampliar</span>
                        </div>
                      </div>
                      {/* Badge estático sempre visível */}
                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                        <ZoomIn size={12} className="text-white" />
                        <span className="text-[10px] text-white font-medium">Ampliar</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-lg aspect-video rounded-xl bg-[#9C958A]/10 flex items-center justify-center">
                      <div className="text-center">
                        <openModule.icon size={48} className="text-[#9C958A]/30 mx-auto mb-3" />
                        <p className="text-sm text-[#9C958A]">Screenshot em breve</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    })

    return items
  }

  return (
    <section ref={sectionRef} id="modulos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Tudo que sua operação precisa, em um só lugar
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Módulos integrados que eliminam planilhas e unificam sua gestão.
          </p>
          {/* Indicador de segmento ativo + trocar */}
          <a
            href="#hero"
            className="inline-flex items-center gap-2 bg-[#F7F7F7] border border-[#9C958A]/20 hover:border-[var(--accent-30)] px-4 py-2 rounded-full text-xs text-[#9C958A] transition-colors group"
          >
            <span>{categoryLabels[category].emoji}</span>
            <span className="font-medium text-[#0E0E0F]">{categoryLabels[category].label}</span>
            <span className="text-[#9C958A]/60">·</span>
            <span className="text-[var(--accent)] group-hover:underline">Trocar segmento ↑</span>
          </a>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderGridItems()}
        </div>

        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {badges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-[#9C958A]">
              <badge.icon size={16} className="text-[var(--accent)]" />
              {badge.text}
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={500} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to="/checkout?plano=saas-2"
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Começar Agora
          </Link>
          <Link
            to="/agendar-demo"
            className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            <CalendarDays size={18} />
            Agendar demonstração
          </Link>
        </FadeIn>
      </div>

      {/* Lightbox — ampliar screenshot */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setLightbox(null)}
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Screenshot ampliado"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            max-height: 1200px;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
