import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, TrendingUp, Package, ChefHat, ShoppingBag } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'

const highlights = [
  {
    icon: TrendingUp,
    title: 'Financeiro & DRE',
    desc: 'DRE automático com margem por produto, CMV controlado e fluxo de caixa em tempo real. Chega de planilha.',
  },
  {
    icon: Package,
    title: 'Estoque Inteligente',
    desc: 'Curva ABC, alertas de ruptura e custo automático por insumo. Reduza desperdício e controle o CMV.',
  },
  {
    icon: ChefHat,
    title: 'Cardápio & Fichas Técnicas',
    desc: 'Precificação automática, custo por prato e simulação de margem. Cada item com rentabilidade clara.',
  },
  {
    icon: ShoppingBag,
    title: 'iFood & KDS',
    desc: 'Integração nativa com iFood, dashboard de performance e KDS para cozinha — sem comanda de papel.',
  },
]

const benefits = [
  'Dashboard iFood completo com KPIs em tempo real',
  'DRE automático — sem montar planilha',
  'Controle de estoque com curva ABC e alertas',
  'Fichas técnicas com custo por prato atualizado',
  'KDS para cozinha — tempos e status em tempo real',
  'Checklists operacionais digitais com foto',
  '15 agentes de IA trabalhando 24/7',
  'Relatórios gerenciais gerados automaticamente',
]

export function RestaurantesPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}
    >
      <title>Sistema de Gestão para Restaurantes | Grupo Granular</title>

      <Header category="restaurantes" />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[#E63946] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Para Restaurantes & Delivery
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Gestão completa para restaurantes,{' '}
            <span className="text-[#E63946]">com IA de ponta a ponta</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Do DRE ao cardápio, do estoque ao iFood — tudo em um só sistema.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/checkout?plano=saas-2&segmento=restaurante"
              className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#7d101f] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Ver planos para restaurantes
              <ArrowRight size={18} />
            </Link>
            <a
              href="#modulos"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Ver funcionalidades
            </a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="modulos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
              Os módulos que fazem diferença para restaurantes
            </h2>
            <p className="text-[#9C958A] text-base max-w-2xl mx-auto">
              Cada módulo foi desenhado para resolver problemas reais de quem opera restaurante.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-[#F7F7F7] rounded-2xl p-6 border border-[#9C958A]/15"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#E63946]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0E0E0F] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9C958A] leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits list */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
                Tudo que um restaurante precisa
              </h2>
              <p className="text-[#9C958A] text-base mb-6 leading-relaxed">
                Da operação ao financeiro — o Granular Food é o sistema completo para restaurantes, bares, lanchonetes e dark kitchens.
              </p>
              <Link
                to="/checkout?plano=saas-2&segmento=restaurante"
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#7d101f] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Ver planos para restaurantes
                <ArrowRight size={16} />
              </Link>
            </div>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#E63946] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0E0E0F]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faq category="restaurantes" />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Pronto para transformar sua operação?
          </h2>
          <p className="text-white/50 text-base mb-8">
            Comece com R$89/mês e veja o impacto nos primeiros 30 dias.
          </p>
          <Link
            to="/checkout?plano=saas-2&segmento=restaurante"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F7F7] text-[#E63946] font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Ver planos para restaurantes
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
