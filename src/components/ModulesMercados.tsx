import { useState, useRef, useEffect } from 'react'
import {
  Camera, Shield, Lock, ChevronRight,
  X, CalendarDays, ZoomIn, UtensilsCrossed, ShoppingCart, Plus, Smartphone, BarChart3
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { modulesDataRestaurantes, modulesDataMercados } from '../data/modulesData'
import type { ModuleDetail } from '../data/modulesData'
import { useCategoryAccent } from '../stores/CategoryContext'
import { useT } from '../i18n/useT'

// ─── CFTV modules ──────────────────────────────────────────────────────────
const cftvModules: ModuleDetail[] = [
  {
    icon: Camera,
    title: 'CFTV & Câmeras',
    desc: '16 câmeras integradas ao sistema, com foco em açougue, caixa e estoque.',
    features: ['Grade ao vivo 4/9/16', 'Anti-fraude no caixa', '5 câmeras açougue', 'Zonas configuráveis', 'Alertas automáticos', 'Auditoria de pesagem'],
    detailPoints: [
      'Grade ao vivo com 4, 9 ou 16 câmeras simultâneas no painel de gestão',
      'Câmera posicionada abaixo do caixa para conferência de carrinho e prevenção de fraude',
      '5 câmeras overhead no açougue: cada corte, pesagem e etiquetagem é registrado',
      'Cruzamento automático balança × etiqueta — alerta imediato em divergência acima de 5%',
      'Zonas independentes: frente/caixa, açougue, estoque, entrada, corredor, carregamento',
      'Clips exportáveis para auditoria, processos e treinamento de equipe',
    ],
    screenshot: '',
  },
  {
    icon: Shield,
    title: 'Alarmes & Zonas',
    desc: 'Arme e desarme por zona, com escalonamento automático de contatos em ocorrências.',
    features: ['8 zonas independentes', 'Sensores PIR e porta', 'Fumaça e pânico', 'Escalonamento automático', 'Painel de eventos', 'Histórico auditável'],
    detailPoints: [
      '8 zonas de segurança com arme e desarme independentes por área da loja',
      'Sensores PIR de movimento, abertura de porta, fumaça/incêndio e botão de pânico',
      'Escalonamento automático: Gerente → Coordenador → Central → Polícia → Bombeiros',
      'Painel de eventos em tempo real com histórico auditável por turno',
      'Registro preciso de horário, responsável e zona para cada ocorrência',
    ],
    screenshot: '',
  },
  {
    icon: Lock,
    title: 'Controle de Acesso',
    desc: 'RFID, biometria e PIN para áreas restritas, com log auditável de cada entrada e saída.',
    features: ['6 áreas restritas', 'RFID + biometria + PIN', 'Controle de lotação', 'Registro de visitantes', 'Log em tempo real', 'Permissões por cargo'],
    detailPoints: [
      '6 áreas restritas com autenticação por RFID, biometria ou biometria + PIN',
      'Controle de lotação em tempo real por área da loja',
      'Permissões configuradas por cargo: separador, coordenador, gestor, admin',
      'Registro de visitantes com entrada, saída e responsável identificados',
      'Log auditável completo: quem entrou, onde, quando e por quanto tempo',
    ],
    screenshot: '',
  },
]

// ─── 15 módulos do Market com área temática ────────────────────────────────
interface MarketModule extends ModuleDetail {
  area: string
}

const allMarketModules: MarketModule[] = [
  { ...modulesDataMercados[1],  area: 'Operação' },        // iFood & Pedidos
  { ...modulesDataMercados[2],  area: 'Gestão' },          // Pessoas (RH)
  { ...modulesDataMercados[0],  area: 'Televendas' },      // Televendas
  { ...modulesDataMercados[7],  area: 'Operação' },        // MDS - Market Display System
  { ...cftvModules[0],          area: 'CFTV e Segurança' }, // CFTV
  { ...cftvModules[1],          area: 'CFTV e Segurança' }, // Alarme
  { ...cftvModules[2],          area: 'CFTV e Segurança' }, // Controle de Acesso
  { ...modulesDataMercados[6],  area: 'Operação' },        // Produção & Padaria
  { ...modulesDataMercados[3],  area: 'Gestão' },          // Relatórios
  { ...modulesDataMercados[5],  area: 'Gestão' },          // Financeiro & DRE
  { ...modulesDataMercados[4],  area: 'Estoque' },         // Estoque Inteligente
  { ...modulesDataMercados[8],  area: 'Gestão' },          // CRM & Clientes
]

// ─── Helpers ───────────────────────────────────────────────────────────────
function getRowEndIndex(clickedIndex: number, cols: number): number {
  return Math.floor(clickedIndex / cols) * cols + (cols - 1)
}

const BADGES = [
  { icon: Smartphone, text: 'Versão mobile nativa' },
  { icon: Shield,     text: 'Multi-lojas com visões apartadas' },
  { icon: BarChart3,  text: 'Benchmark entre unidades' },
]

// ─── Shared module grid + detail panel ────────────────────────────────────
interface ModuleGridProps {
  modules: (ModuleDetail | MarketModule)[]
  openIdx: number | null
  cols: number
  detailRef: React.RefObject<HTMLDivElement | null>
  onToggle: (i: number) => void
  onClose: () => void
  onLightbox: (src: string) => void
  showAreaBadge?: boolean
  t: ReturnType<typeof useT>
}

function ModuleGrid({
  modules, openIdx, cols, detailRef, onToggle, onClose, onLightbox, showAreaBadge = false, t
}: ModuleGridProps) {
  const insertAfter = openIdx !== null
    ? Math.min(getRowEndIndex(openIdx, cols), modules.length - 1)
    : -1
  const openMod = openIdx !== null ? modules[openIdx] : null

  const items: React.ReactNode[] = []

  modules.forEach((mod, i) => {
    const area = (mod as MarketModule).area
    items.push(
      <FadeIn key={mod.title} delay={i * 50}>
        <button
          data-module
          onClick={() => onToggle(i)}
          className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 h-full w-full text-left cursor-pointer ${
            openIdx === i
              ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-lg shadow-[var(--accent-10)] -translate-y-1'
              : mod.standalone
                ? 'border-[var(--accent)]/20 bg-[#F7F7F7] hover:shadow-xl hover:-translate-y-1'
                : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/20 hover:shadow-xl hover:-translate-y-1'
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
                openIdx === i ? 'rotate-90 text-[var(--accent)]' : 'group-hover:text-[var(--accent)]'
              }`}
            />
          </div>
          {showAreaBadge && area && (
            <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full mb-1.5">
              {area}
            </span>
          )}
          <h3 className="font-semibold text-[#0E0E0F] mb-2">{mod.title}</h3>
          <p className="text-sm text-[#9C958A] leading-relaxed">{mod.desc}</p>
        </button>
      </FadeIn>
    )

    // Insert detail panel after last item in open module's row
    if (openMod && i === insertAfter) {
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
                  <openMod.icon size={22} className="text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  {showAreaBadge && (openMod as MarketModule).area && (
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full mb-1">
                      {(openMod as MarketModule).area}
                    </span>
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-[#0E0E0F]">{openMod.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9C958A] line-clamp-2">{openMod.desc}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] hover:text-[#0E0E0F] transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className={openMod.screenshot ? 'grid lg:grid-cols-2 gap-0' : 'grid gap-0'}>
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                {openMod.detailPoints ? (
                  <ul className="space-y-2 mb-6">
                    {openMod.detailPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#0E0E0F]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#0E0E0F] leading-relaxed mb-6">{openMod.detailText}</p>
                )}

                <div className="mb-6">
                  <p
                    className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t.modules.features}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {openMod.features.map(f => (
                      <span key={f} className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {openMod.standalone && openMod.title.includes('Televendas') ? (
                  <div className="flex flex-col gap-3 self-start w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0E0E0F] mb-1">{t.modules.moduleAvulso}</p>
                        <p className="text-xs text-[#9C958A] leading-relaxed">
                          O módulo Televendas pode ser contratado de forma independente por <strong className="text-[#0E0E0F]">R$ 419/mês</strong>. Central de vendas por telefone e WhatsApp totalmente integrada ao Granular Market.
                        </p>
                      </div>
                      <Link
                        to="/checkout?plano=modulo-televendas"
                        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        Adicionar ao carrinho
                      </Link>
                    </div>
                  </div>
                ) : openMod.standalone && openMod.title.includes('Pessoas') ? (
                  <div className="flex flex-col gap-3 self-start">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/10">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#0E0E0F] mb-1">{t.modules.hireModule}</p>
                        <p className="text-xs text-[#9C958A] leading-relaxed">
                          O módulo Pessoas (RH) pode ser adquirido de forma independente por <strong className="text-[#0E0E0F]">R$ 599/mês</strong>.
                        </p>
                      </div>
                      <Link
                        to="/checkout?plano=modulo-pessoas"
                        className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        {t.modules.startNow} — R$ 599/mês
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3 self-start">
                    <Link
                      to="/checkout?plano=saas-2"
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

              {openMod.screenshot && (
                <div className="bg-[#F7F7F7] p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[#0E0E0F]/5">
                  <div
                    className="relative group w-full max-w-lg cursor-pointer"
                    onClick={() => onLightbox(openMod.screenshot!)}
                  >
                    <img
                      src={openMod.screenshot}
                      alt={`Tela ${openMod.title}`}
                      className="rounded-xl shadow-lg w-full object-cover transition-all group-hover:brightness-75"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg">
                        <ZoomIn size={16} className="text-[var(--accent)]" />
                        <span className="text-sm font-medium text-[#0E0E0F]">Clique para ampliar</span>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                      <ZoomIn size={12} className="text-white" />
                      <span className="text-[10px] text-white font-medium">Ampliar</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
  })

  return <>{items}</>
}

// ─── Entry card (shared visual format) ────────────────────────────────────
interface EntryCardProps {
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  tags: string[]
  cta: string
  badge?: string
  foodPill?: boolean
}

function EntryCard({
  isActive, onClick, icon, title, subtitle, description, tags, cta, badge, foodPill
}: EntryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 cursor-pointer w-full h-full ${
        isActive
          ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-xl -translate-y-1'
          : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/30 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 left-4 text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]/10'}`}>
          <span className={isActive ? '[&>svg]:text-white' : '[&>svg]:text-[var(--accent)]'}>{icon}</span>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[#0E0E0F]">{title}</p>
          {foodPill ? (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] bg-[#0E0E0F]/8 text-[#0E0E0F] px-1.5 py-0.5 rounded font-medium">
                <UtensilsCrossed size={8} /> Food incluído
              </span>
              <Plus size={9} className="text-[var(--accent)]" />
              <span className="text-[10px] text-[var(--accent)] font-bold">Market</span>
            </div>
          ) : (
            <p className="text-xs text-[#9C958A]">{subtitle}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-[#9C958A] mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className={`flex items-center gap-1.5 text-sm font-semibold ${isActive ? 'text-[var(--accent)]' : 'text-[#9C958A]'}`}>
        <span>{cta}</span>
        <ChevronRight size={14} className={`transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
      </div>
    </button>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
export function ModulesMercados() {
  useCategoryAccent()
  const t = useT()

  const [activePane, setActivePane] = useState<'food' | 'market' | null>(null)

  // Food module grid
  const [openFoodIdx, setOpenFoodIdx] = useState<number | null>(null)
  const [foodCols, setFoodCols] = useState(4)
  const foodDetailRef = useRef<HTMLDivElement>(null)

  // Market module grid
  const [openMarketIdx, setOpenMarketIdx] = useState<number | null>(null)
  const [marketCols, setMarketCols] = useState(4)
  const marketDetailRef = useRef<HTMLDivElement>(null)

  const [lightbox, setLightbox] = useState<string | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const expandedRef = useRef<HTMLDivElement>(null)

  // Detect grid columns
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const cols = w >= 1024 ? 4 : w >= 640 ? 2 : 1
      setFoodCols(cols)
      setMarketCols(cols)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Scroll to expanded panel on pane open
  useEffect(() => {
    if (activePane && expandedRef.current) {
      setTimeout(() => expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 220)
    }
  }, [activePane])

  // Scroll to food detail on open
  useEffect(() => {
    if (openFoodIdx !== null && foodDetailRef.current) {
      setTimeout(() => foodDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
    }
  }, [openFoodIdx])

  // Scroll to market detail on open
  useEffect(() => {
    if (openMarketIdx !== null && marketDetailRef.current) {
      setTimeout(() => marketDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
    }
  }, [openMarketIdx])

  // Click-outside — close detail panel and scroll to start of expanded panel
  useEffect(() => {
    if (openFoodIdx === null && openMarketIdx === null) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button[data-module]')) return
      if (foodDetailRef.current?.contains(target)) return
      if (marketDetailRef.current?.contains(target)) return
      setOpenFoodIdx(null)
      setOpenMarketIdx(null)
      expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openFoodIdx, openMarketIdx])

  const togglePane = (pane: 'food' | 'market') => {
    setActivePane(prev => prev === pane ? null : pane)
    setOpenFoodIdx(null)
    setOpenMarketIdx(null)
  }

  const closeFoodDetail = () => {
    setOpenFoodIdx(null)
    expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const closeMarketDetail = () => {
    setOpenMarketIdx(null)
    expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={sectionRef} id="modulos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            {t.modules.sectionTitle}
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto mb-6">
            {t.modules.sectionSubtitle}
          </p>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 bg-[#F7F7F7] border border-[#9C958A]/20 hover:border-[var(--accent-30)] px-4 py-2 rounded-full text-xs text-[#9C958A] transition-colors group"
          >
            <span>🛒</span>
            <span className="font-medium text-[#0E0E0F]">Mercados</span>
            <span className="text-[#9C958A]/60">·</span>
            <span className="text-[var(--accent)] group-hover:underline">{t.modules.changeSegment}</span>
          </a>
        </FadeIn>

        {/* ── Level 1: Two entry cards (mesmo tamanho e formato) ── */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
          <FadeIn delay={80}>
            <EntryCard
              isActive={activePane === 'food'}
              onClick={() => togglePane('food')}
              icon={<UtensilsCrossed size={22} />}
              title="Granular Food"
              subtitle="Food service · 12 módulos"
              description="Todos os módulos da plataforma Granular Food: pedidos, produção, estoque, financeiro, IA e mais."
              tags={['iFood', 'Produção', 'Pessoas', 'Financeiro', 'Checklists', 'CRM', 'IA', '+5']}
              cta={activePane === 'food' ? 'Ocultar módulos' : 'Ver 12 módulos'}
            />
          </FadeIn>

          <FadeIn delay={150}>
            <EntryCard
              isActive={activePane === 'market'}
              onClick={() => togglePane('market')}
              icon={<ShoppingCart size={22} />}
              title="Granular Market"
              subtitle=""
              description="Tudo do Granular Food mais 15 módulos exclusivos organizados em 6 grandes áreas operacionais."
              tags={['Operação', 'Estoque', 'Gestão', 'Televendas', 'CFTV', 'Config']}
              cta={activePane === 'market' ? 'Ocultar módulos' : 'Ver 15 módulos'}
              badge="Completo"
              foodPill
            />
          </FadeIn>
        </div>

        {/* ── Level 2a: Granular Food expanded panel ── */}
        {activePane === 'food' && (
          <div ref={expandedRef} style={{ animation: 'slideDown 0.35s ease forwards' }}>
            <div className="flex items-center gap-3 mb-6 px-1">
              <div className="h-px flex-1 bg-[#9C958A]/15" />
              <span className="text-xs text-[#9C958A] font-medium flex items-center gap-1.5 px-3">
                <UtensilsCrossed size={11} /> 12 Módulos · Granular Food
              </span>
              <div className="h-px flex-1 bg-[#9C958A]/15" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModuleGrid
                modules={modulesDataRestaurantes}
                openIdx={openFoodIdx}
                cols={foodCols}
                detailRef={foodDetailRef}
                onToggle={i => setOpenFoodIdx(prev => prev === i ? null : i)}
                onClose={closeFoodDetail}
                onLightbox={setLightbox}
                t={t}
              />
            </div>
          </div>
        )}

        {/* ── Level 2b: Granular Market expanded panel ── */}
        {activePane === 'market' && (
          <div ref={expandedRef} style={{ animation: 'slideDown 0.35s ease forwards' }}>

            {/* Granular Food modules */}
            <div className="flex items-center gap-3 mb-6 px-1">
              <div className="h-px flex-1 bg-[#9C958A]/15" />
              <span className="text-xs text-[#9C958A] font-medium flex items-center gap-1.5 px-3">
                <UtensilsCrossed size={11} /> 12 Módulos · Granular Food
              </span>
              <div className="h-px flex-1 bg-[#9C958A]/15" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModuleGrid
                modules={modulesDataRestaurantes}
                openIdx={openFoodIdx}
                cols={foodCols}
                detailRef={foodDetailRef}
                onToggle={i => setOpenFoodIdx(prev => prev === i ? null : i)}
                onClose={closeFoodDetail}
                onLightbox={setLightbox}
                t={t}
              />
            </div>

            {/* "+" separator */}
            <div className="flex items-center gap-4 my-10 px-1">
              <div className="h-px flex-1 bg-[#9C958A]/20" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#9C958A] uppercase tracking-widest">Granular Food</span>
                <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-md shadow-[var(--accent)]/20 flex-shrink-0">
                  <Plus size={18} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest">Granular Market</span>
              </div>
              <div className="h-px flex-1 bg-[#9C958A]/20" />
            </div>

            {/* Granular Market exclusive modules */}
            <div className="flex items-center gap-3 mb-6 px-1">
              <div className="h-px flex-1 bg-[#9C958A]/15" />
              <span className="text-xs text-[#9C958A] font-medium flex items-center gap-1.5 px-3">
                <ShoppingCart size={11} /> 12 Módulos Exclusivos · Granular Market
              </span>
              <div className="h-px flex-1 bg-[#9C958A]/15" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModuleGrid
                modules={allMarketModules}
                openIdx={openMarketIdx}
                cols={marketCols}
                detailRef={marketDetailRef}
                onToggle={i => setOpenMarketIdx(prev => prev === i ? null : i)}
                onClose={closeMarketDetail}
                onLightbox={setLightbox}
                showAreaBadge
                t={t}
              />
            </div>
          </div>
        )}

        {/* ── Badges ── */}
        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-6 mt-14">
          {BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-[#9C958A]">
              <Icon size={16} className="text-[var(--accent)]" />
              {text}
            </div>
          ))}
        </FadeIn>

        {/* ── Bottom CTAs ── */}
        <FadeIn delay={500} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            to="/checkout?plano=saas-2"
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            {t.modules.startNow}
          </Link>
          <Link
            to="/agendar-demo"
            className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            <CalendarDays size={18} /> {t.modules.scheduleDemo}
          </Link>
        </FadeIn>
      </div>

      {/* ── Lightbox ── */}
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
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; transform: translateY(-10px); }
          to   { opacity: 1; max-height: 4000px; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
