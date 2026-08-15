import { useState, useRef, useEffect } from 'react'
import { Smartphone, Shield, BarChart3, X, ChevronRight, CalendarDays, ShoppingCart, UtensilsCrossed, Pill, PawPrint, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { modulesDataRestaurantes, modulesDataMercados, modulesDataMercadosCFTV, modulesDataFarmacias, modulesDataPetshop, modulesDataShopping } from '../data/modulesData'
import { modulesDataRestaurantesEn, modulesDataMercadosEn } from '../data/modulesDataEn'
import { useCategoryAccent } from '../stores/CategoryContext'
import { useT } from '../i18n/useT'
import { CTA_ORIGEM, demoHref } from '../data/ctaOrigem'
import { useLanguage } from '../stores/useLanguageStore'

export type Category = 'restaurantes' | 'mercados' | 'farmacias' | 'petshop' | 'shopping'

const categoryLabels: Record<Category, { emoji: string; label: string; icon: typeof UtensilsCrossed }> = {
  restaurantes: { emoji: '🍽️', label: 'Restaurantes', icon: UtensilsCrossed },
  mercados: { emoji: '🛒', label: 'Mercados', icon: ShoppingCart },
  farmacias: { emoji: '💊', label: 'Farmácias', icon: Pill },
  petshop: { emoji: '🐾', label: 'Pet Shops', icon: PawPrint },
  shopping: { emoji: '🛍️', label: 'Shopping', icon: Store },
}

interface Props {
  category?: Category
}

const badgeIcons = [Smartphone, Shield, BarChart3]

/* Calcula após qual índice inserir o painel, de acordo com colunas visíveis */
function getRowEndIndex(clickedIndex: number, cols: number): number {
  return Math.floor(clickedIndex / cols) * cols + (cols - 1)
}


export function Modules({ category = 'restaurantes' }: Props) {
  useCategoryAccent() // ensures context is consumed; CSS vars on root drive styling
  const t = useT()
  const { lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [cols, setCols] = useState(4)

  const modules = lang === 'en'
    ? (category === 'mercados' ? modulesDataMercadosEn : modulesDataRestaurantesEn)
    : category === 'mercados' ? [...modulesDataMercados, ...modulesDataMercadosCFTV]
    : category === 'farmacias' ? modulesDataFarmacias
    : category === 'petshop' ? modulesDataPetshop
    : category === 'shopping' ? modulesDataShopping
    : modulesDataRestaurantes

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
            className={`group relative rounded-2xl border p-4 sm:p-6 transition-all duration-300 h-full w-full text-left cursor-pointer ${
              openIndex === i
                ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-lg shadow-[var(--accent-10)] -translate-y-1'
                : mod.standalone
                  ? 'border-[var(--accent)]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent-05)] hover:-translate-y-1'
                  : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent-05)] hover:-translate-y-1'
            }`}
          >
            {mod.standalone && (
              <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-full">
                {t.modules.availableSeparately}
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
              <div className="grid gap-0">
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
                      {t.modules.features}
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
                            {t.modules.moduleAvulso}
                          </p>
                          <p className="text-xs text-[#9C958A] leading-relaxed">
                            O módulo Televendas pode ser contratado de forma independente. Central de vendas por telefone e WhatsApp totalmente integrada ao Granular Market.
                          </p>
                        </div>
                        <Link
                          to={demoHref(CTA_ORIGEM.televendas)}
                          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
                        >
                          <CalendarDays size={15} />
                          Falar com a gente
                        </Link>
                      </div>
                    </div>
                  ) : openModule.standalone && openModule.title.includes('Pessoas') ? (
                    <div className="flex flex-col gap-3 self-start">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#0E0E0F] mb-1">
                            {t.modules.hireModule}
                          </p>
                          <p className="text-xs text-[#9C958A] leading-relaxed">
                            O módulo Pessoas (RH) pode ser adquirido de forma independente. Ideal para operações que já possuem ERP mas precisam de gestão de equipe especializada em food service.
                          </p>
                        </div>
                        <Link
                          to={demoHref(CTA_ORIGEM.pessoas)}
                          className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
                        >
                          {t.modules.startNow}
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                      <Link
                        to={demoHref(CTA_ORIGEM.plano3)}
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
                        to="/agendar-demo"
                        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                      >
                        {t.modules.startNow}
                        <ChevronRight size={16} />
                      </Link>
                      <Link
                        to="/agendar-demo"
                        className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                      >
                        <CalendarDays size={16} />
                        {t.modules.scheduleDemo}
                      </Link>
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
        <FadeIn className="mb-12 sm:mb-16">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {t.nav.modules}
          </p>
          <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#2c241f] text-balance">
            {t.modules.sectionTitle}
          </h2>
          <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#5f5248] max-w-[46ch] text-pretty">
            {t.modules.sectionSubtitle}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 bg-[#faf9f7] border border-[#e4ddd2] px-4 py-2 rounded-full text-xs text-[#8a7a6e]">
            <span>{categoryLabels[category].emoji}</span>
            <span className="font-medium text-[#2c241f]">{categoryLabels[category].label}</span>
          </span>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderGridItems()}
        </div>

        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {[t.modules.badges.mobile, t.modules.badges.multiStore, t.modules.badges.benchmark].map((text, idx) => {
            const Icon = badgeIcons[idx]
            return (
              <div key={text} className="flex items-center gap-2 text-sm text-[#9C958A]">
                <Icon size={16} className="text-[var(--accent)]" />
                {text}
              </div>
            )
          })}
        </FadeIn>

        <FadeIn delay={500} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to="/agendar-demo"
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            {t.modules.startNow}
          </Link>
          <Link
            to="/agendar-demo"
            className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            <CalendarDays size={18} />
            {t.modules.scheduleDemo}
          </Link>
        </FadeIn>
      </div>

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
