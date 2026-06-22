import { useState, useRef, useEffect } from 'react'
import {
  PhoneCall, Package,
  Camera, Shield, Lock, Zap, Settings, BarChart3, ChevronRight,
  X, CalendarDays, ZoomIn, UtensilsCrossed, ShoppingCart, Check, Plus
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { modulesDataRestaurantes, modulesDataMercados } from '../data/modulesData'
import type { ModuleDetail } from '../data/modulesData'
import { useCategoryAccent } from '../stores/CategoryContext'
import { useT } from '../i18n/useT'

// ─── CFTV modules (exclusivos do Market, não presentes no Food) ────────────
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

// ─── Grupos temáticos do Market ────────────────────────────────────────────
interface MarketTheme {
  key: string
  icon: typeof Camera
  label: string
  pitch: string
  modules: ModuleDetail[]
}

// indices modulesDataMercados: 0=Televendas 1=iFood 2=Pessoas 3=Relatórios
// 4=Estoque 5=Financeiro 6=Produção&Padaria 7=KDS 8=CRM 9=Checklists
// 10=IA 11=Integrações
const marketThemes: MarketTheme[] = [
  {
    key: 'operacao',
    icon: Zap,
    label: 'Operação',
    pitch: 'Do recebimento de pedidos ao controle da cozinha e da padaria: sem papel, sem retrabalho.',
    modules: [
      modulesDataMercados[1],  // iFood & Pedidos
      modulesDataMercados[6],  // Produção & Padaria
      modulesDataMercados[7],  // KDS - Kitchen Display
      modulesDataMercados[9],  // Checklists Operacionais
    ],
  },
  {
    key: 'estoque',
    icon: Package,
    label: 'Estoque',
    pitch: 'Cada produto rastreado, cada compra otimizada. CMV e cobertura sempre visíveis em tempo real.',
    modules: [modulesDataMercados[4]], // Estoque Inteligente
  },
  {
    key: 'gestao',
    icon: BarChart3,
    label: 'Gestão',
    pitch: 'Financeiro, pessoas e performance em uma visão integrada. Decisão baseada em dado real.',
    modules: [
      modulesDataMercados[3],  // Relatórios
      modulesDataMercados[5],  // Financeiro & DRE
      modulesDataMercados[8],  // CRM & Clientes
      modulesDataMercados[2],  // Pessoas (RH)
      modulesDataMercados[10], // 15 Agentes de IA
    ],
  },
  {
    key: 'televendas',
    icon: PhoneCall,
    label: 'Televendas',
    pitch: 'Do pedido verbal ao orçamento enviado em menos de 2 minutos. Zero planilha, zero retrabalho.',
    modules: [modulesDataMercados[0]], // Televendas
  },
  {
    key: 'cftv',
    icon: Shield,
    label: 'CFTV e Segurança',
    pitch: 'Câmeras, alarmes e controle de acesso integrados ao painel de gestão da loja.',
    modules: cftvModules,
  },
  {
    key: 'config',
    icon: Settings,
    label: 'Configurações',
    pitch: 'Conecte seu ecossistema e ajuste o sistema à realidade da sua operação.',
    modules: [modulesDataMercados[11]], // Integrações
  },
]

// ─── Helper ────────────────────────────────────────────────────────────────
function getRowEndIndex(clickedIndex: number, cols: number): number {
  return Math.floor(clickedIndex / cols) * cols + (cols - 1)
}

const badgeIconMap = [
  { icon: PhoneCall, text: 'Versão mobile nativa' },
  { icon: Shield, text: 'Multi-lojas com visões apartadas' },
  { icon: BarChart3, text: 'Benchmark entre unidades' },
]

// ─── Component ─────────────────────────────────────────────────────────────
export function ModulesMercados() {
  useCategoryAccent()
  const t = useT()

  const [activePane, setActivePane] = useState<'food' | 'market' | null>(null)

  // Food grid state
  const [openFoodIdx, setOpenFoodIdx] = useState<number | null>(null)
  const [foodCols, setFoodCols] = useState(4)

  // Market theme state
  const [openThemeKey, setOpenThemeKey] = useState<string | null>(null)

  const [lightbox, setLightbox] = useState<string | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const foodDetailRef = useRef<HTMLDivElement>(null)
  const themeDetailRef = useRef<HTMLDivElement>(null)
  const expandedPanelRef = useRef<HTMLDivElement>(null)

  // Detect food grid columns
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setFoodCols(w >= 1024 ? 4 : w >= 640 ? 2 : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Scroll to expanded panel when pane changes
  useEffect(() => {
    if (activePane && expandedPanelRef.current) {
      setTimeout(() => {
        expandedPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }, [activePane])

  // Scroll to food detail when a food module is clicked
  useEffect(() => {
    if (openFoodIdx !== null && foodDetailRef.current) {
      setTimeout(() => {
        foodDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [openFoodIdx])

  // Scroll to theme detail when a theme is clicked
  useEffect(() => {
    if (openThemeKey !== null && themeDetailRef.current) {
      setTimeout(() => {
        themeDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [openThemeKey])

  const togglePane = (pane: 'food' | 'market') => {
    if (activePane === pane) {
      setActivePane(null)
      setOpenFoodIdx(null)
      setOpenThemeKey(null)
    } else {
      setActivePane(pane)
      setOpenFoodIdx(null)
      setOpenThemeKey(null)
    }
  }

  // ── Food grid renderer (same expand-in-row logic as Modules.tsx) ──────────
  const foodInsertAfter = openFoodIdx !== null
    ? Math.min(getRowEndIndex(openFoodIdx, foodCols), modulesDataRestaurantes.length - 1)
    : -1
  const openFoodMod = openFoodIdx !== null ? modulesDataRestaurantes[openFoodIdx] : null

  const renderFoodGrid = () => {
    const items: React.ReactNode[] = []

    modulesDataRestaurantes.forEach((mod, i) => {
      items.push(
        <FadeIn key={mod.title} delay={i * 55}>
          <button
            data-module
            onClick={() => setOpenFoodIdx(prev => prev === i ? null : i)}
            className={`group relative rounded-2xl border p-5 transition-all duration-300 h-full w-full text-left cursor-pointer ${
              openFoodIdx === i
                ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-lg -translate-y-1'
                : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/25 hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            {mod.standalone && (
              <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-full">
                {t.modules.availableSeparately}
              </span>
            )}
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-3">
                <mod.icon size={20} className="text-[var(--accent)]" />
              </div>
              <ChevronRight
                size={15}
                className={`text-[#9C958A] transition-transform duration-300 mt-1 ${openFoodIdx === i ? 'rotate-90 text-[var(--accent)]' : 'group-hover:text-[var(--accent)]'}`}
              />
            </div>
            <h3 className="font-semibold text-sm text-[#0E0E0F] mb-1">{mod.title}</h3>
            <p className="text-xs text-[#9C958A] leading-relaxed line-clamp-2">{mod.desc}</p>
          </button>
        </FadeIn>
      )

      // Insert detail panel after last item in the open module's row
      if (openFoodMod && i === foodInsertAfter) {
        items.push(
          <div
            key="food-detail"
            ref={foodDetailRef}
            className="col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden"
            style={{ animation: 'slideDown 0.35s ease forwards' }}
          >
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-white shadow-xl overflow-hidden">
              <div className="flex items-start justify-between px-5 sm:px-8 py-4 border-b border-[#0E0E0F]/5 gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    <openFoodMod.icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#0E0E0F]">{openFoodMod.title}</h3>
                    <p className="text-xs text-[#9C958A] line-clamp-1">{openFoodMod.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenFoodIdx(null)}
                  className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className={openFoodMod.screenshot ? 'grid lg:grid-cols-2' : ''}>
                <div className="p-5 sm:p-8">
                  {openFoodMod.detailPoints ? (
                    <ul className="space-y-1.5 mb-5">
                      {openFoodMod.detailPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#0E0E0F]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[#0E0E0F] mb-5">{openFoodMod.detailText}</p>
                  )}
                  <div className="mb-5">
                    <p className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {t.modules.features}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {openFoodMod.features.map(f => (
                        <span key={f} className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-1 rounded-full font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/checkout?plano=saas-2"
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      {t.modules.startNow} <ChevronRight size={14} />
                    </Link>
                    <Link
                      to="/agendar-demo"
                      className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      <CalendarDays size={14} /> {t.modules.scheduleDemo}
                    </Link>
                  </div>
                </div>
                {openFoodMod.screenshot && (
                  <div className="bg-[#F7F7F7] p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[#0E0E0F]/5">
                    <div
                      className="relative group w-full max-w-lg cursor-pointer"
                      onClick={() => setLightbox(openFoodMod.screenshot)}
                    >
                      <img
                        src={openFoodMod.screenshot}
                        alt={`Tela ${openFoodMod.title}`}
                        className="rounded-xl shadow-lg w-full object-cover transition-all group-hover:brightness-75"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow">
                          <ZoomIn size={14} className="text-[var(--accent)]" />
                          <span className="text-xs font-medium">Ampliar</span>
                        </div>
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

    return items
  }

  // ── Active theme ──────────────────────────────────────────────────────────
  const activeTheme = marketThemes.find(th => th.key === openThemeKey) ?? null
  const themeModuleCols = activeTheme
    ? activeTheme.modules.length === 1 ? 'grid-cols-1' : activeTheme.modules.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
    : ''

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

        {/* ── Level 1: Two entry cards ── */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">

          {/* Food card */}
          <FadeIn delay={80}>
            <button
              onClick={() => togglePane('food')}
              className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 cursor-pointer w-full h-full ${
                activePane === 'food'
                  ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-xl -translate-y-1'
                  : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/30 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activePane === 'food' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]/10'}`}>
                  <UtensilsCrossed size={22} className={activePane === 'food' ? 'text-white' : 'text-[var(--accent)]'} />
                </div>
                <div>
                  <p className="font-bold text-[#0E0E0F]">Módulos Food</p>
                  <p className="text-xs text-[#9C958A]">Base food service · 12 módulos</p>
                </div>
              </div>
              <p className="text-sm text-[#9C958A] mb-4 leading-relaxed">
                Todos os módulos da plataforma Granular Food: pedidos, produção, estoque, financeiro, IA e mais.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['iFood', 'Produção', 'Estoque', 'Financeiro', 'KDS', 'CRM', 'IA', '+5'].map(tag => (
                  <span key={tag} className="text-[10px] bg-[#0E0E0F]/6 text-[#9C958A] px-2 py-0.5 rounded-full font-medium">{tag}</span>
                ))}
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-semibold ${activePane === 'food' ? 'text-[var(--accent)]' : 'text-[#9C958A]'}`}>
                <span>{activePane === 'food' ? 'Ocultar módulos' : 'Ver todos os módulos'}</span>
                <ChevronRight size={14} className={`transition-transform duration-300 ${activePane === 'food' ? 'rotate-90' : ''}`} />
              </div>
            </button>
          </FadeIn>

          {/* Market card */}
          <FadeIn delay={150}>
            <button
              onClick={() => togglePane('market')}
              className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 cursor-pointer w-full h-full ${
                activePane === 'market'
                  ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-xl -translate-y-1'
                  : 'border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/3 to-[var(--accent)]/8 hover:border-[var(--accent)]/50 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <span className="absolute -top-2.5 left-4 text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-full">
                Completo
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                  <ShoppingCart size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#0E0E0F]">Granular Market</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[10px] bg-[#0E0E0F]/8 text-[#0E0E0F] px-1.5 py-0.5 rounded font-medium">
                      <UtensilsCrossed size={8} /> Food
                    </span>
                    <Plus size={9} className="text-[var(--accent)]" />
                    <span className="text-[10px] text-[var(--accent)] font-bold">exclusivos Market</span>
                  </div>
                </div>
              </div>
              {/* "Food included" callout */}
              <div className="flex items-center gap-2 text-xs text-[#0E0E0F]/70 bg-white/70 rounded-xl px-3 py-2 mb-4 border border-[var(--accent)]/15">
                <Check size={12} className="text-[var(--accent)] flex-shrink-0" />
                <span>Inclui todos os Módulos Food</span>
                <span className="ml-auto inline-flex items-center gap-0.5 text-[var(--accent)] font-semibold">
                  <Plus size={9} /> Market
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Operação', 'Estoque', 'Gestão', 'Televendas', 'CFTV', 'Config'].map(tag => (
                  <span key={tag} className="text-[10px] bg-[var(--accent)]/12 text-[var(--accent)] px-2 py-0.5 rounded-full font-semibold">{tag}</span>
                ))}
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]`}>
                <span>{activePane === 'market' ? 'Ocultar áreas' : 'Ver 6 grandes áreas'}</span>
                <ChevronRight size={14} className={`transition-transform duration-300 ${activePane === 'market' ? 'rotate-90' : ''}`} />
              </div>
            </button>
          </FadeIn>
        </div>

        {/* ── Level 2a: Food expanded panel ── */}
        {activePane === 'food' && (
          <div ref={expandedPanelRef} style={{ animation: 'slideDown 0.35s ease forwards' }}>
            <div className="flex items-center gap-3 mb-6 px-1">
              <div className="h-px flex-1 bg-[#9C958A]/15" />
              <span className="text-xs text-[#9C958A] font-medium flex items-center gap-1.5 px-3">
                <UtensilsCrossed size={11} /> 12 Módulos Food
              </span>
              <div className="h-px flex-1 bg-[#9C958A]/15" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderFoodGrid()}
            </div>
          </div>
        )}

        {/* ── Level 2b: Market expanded panel ── */}
        {activePane === 'market' && (
          <div ref={expandedPanelRef} style={{ animation: 'slideDown 0.35s ease forwards' }}>
            {/* "Food included" strip */}
            <div className="flex items-center gap-3 bg-[#0E0E0F]/3 border border-[#0E0E0F]/8 rounded-2xl px-5 py-3.5 mb-7">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <Check size={16} className="text-[var(--accent)]" />
              </div>
              <p className="text-sm text-[#0E0E0F]">
                <strong>Granular Market inclui todos os Módulos Food</strong>
                {' '}— e adiciona as 6 grandes áreas exclusivas de mercado detalhadas abaixo.
              </p>
            </div>

            {/* Theme cards grid */}
            <div className="flex items-center gap-3 mb-5 px-1">
              <div className="h-px flex-1 bg-[#9C958A]/15" />
              <span className="text-xs text-[#9C958A] font-medium flex items-center gap-1.5 px-3">
                <ShoppingCart size={11} /> 6 Grandes Áreas do Market
              </span>
              <div className="h-px flex-1 bg-[#9C958A]/15" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketThemes.map((theme, i) => (
                <FadeIn key={theme.key} delay={i * 70}>
                  <button
                    onClick={() => setOpenThemeKey(prev => prev === theme.key ? null : theme.key)}
                    className={`relative rounded-2xl border-2 p-6 text-left transition-all duration-300 w-full cursor-pointer ${
                      openThemeKey === theme.key
                        ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-lg -translate-y-1'
                        : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[var(--accent)]/30 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${openThemeKey === theme.key ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]/10'}`}>
                        <theme.icon size={21} className={openThemeKey === theme.key ? 'text-white' : 'text-[var(--accent)]'} />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-[#9C958A] font-medium">
                          {theme.modules.length} módulo{theme.modules.length > 1 ? 's' : ''}
                        </span>
                        <ChevronRight
                          size={13}
                          className={`text-[#9C958A] transition-transform duration-300 ${openThemeKey === theme.key ? 'rotate-90 text-[var(--accent)]' : ''}`}
                        />
                      </div>
                    </div>
                    <h3 className={`font-bold mb-1.5 ${openThemeKey === theme.key ? 'text-[var(--accent)]' : 'text-[#0E0E0F]'}`}>
                      {theme.label}
                    </h3>
                    <p className="text-xs text-[#9C958A] leading-relaxed">{theme.pitch}</p>
                  </button>
                </FadeIn>
              ))}
            </div>

            {/* ── Level 3: Theme detail panel ── */}
            {activeTheme && (
              <div
                ref={themeDetailRef}
                className="mt-5 overflow-hidden"
                style={{ animation: 'slideDown 0.35s ease forwards' }}
              >
                <div className="rounded-2xl border border-[var(--accent)]/20 bg-white shadow-xl overflow-hidden">
                  {/* Theme header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#0E0E0F]/5 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                        <activeTheme.icon size={20} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#0E0E0F]">{activeTheme.label}</h3>
                        <p className="text-xs text-[#9C958A] line-clamp-1">{activeTheme.pitch}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenThemeKey(null)}
                      className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] flex-shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Modules within theme */}
                  <div className={`grid divide-y sm:divide-y-0 sm:divide-x divide-[#0E0E0F]/6 ${themeModuleCols}`}>
                    {activeTheme.modules.map((mod) => (
                      <div key={mod.title} className="p-6">
                        {/* Module header */}
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                            <mod.icon size={18} className="text-[var(--accent)]" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#0E0E0F] leading-tight">{mod.title}</p>
                            {mod.standalone && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded">
                                {t.modules.availableSeparately}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#9C958A] mb-3 leading-relaxed">{mod.desc}</p>

                        {/* Detail points */}
                        {mod.detailPoints && (
                          <ul className="space-y-1 mb-3">
                            {mod.detailPoints.slice(0, 5).map((pt, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-[#0E0E0F]">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-1">
                          {mod.features.slice(0, 5).map(f => (
                            <span
                              key={f}
                              className="text-[10px] bg-[var(--accent)]/8 text-[var(--accent)] px-2 py-0.5 rounded-full font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="px-6 py-4 border-t border-[#0E0E0F]/5 bg-[#F7F7F7]/50 flex flex-wrap items-center gap-3">
                    <Link
                      to="/checkout?plano=saas-2"
                      className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      {t.modules.startNow} <ChevronRight size={14} />
                    </Link>
                    <Link
                      to="/agendar-demo"
                      className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/5 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      <CalendarDays size={14} /> {t.modules.scheduleDemo}
                    </Link>
                    <p className="text-xs text-[#9C958A] ml-auto hidden sm:block">
                      Inclui toda a área <strong className="text-[#0E0E0F]">{activeTheme.label}</strong> + todos os demais módulos
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Badges ── */}
        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-6 mt-14">
          {badgeIconMap.map(({ icon: Icon, text }) => (
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
          to   { opacity: 1; max-height: 3000px; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
