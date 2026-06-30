import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Package, TrendingUp, PhoneCall, Bot } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Testimonials } from '../components/Testimonials'
import { Faq } from '../components/Faq'

const highlights = [
  {
    icon: Package,
    title: 'Estoque por Seção',
    desc: 'Açougue, padaria, FLV, mercearia — cada departamento com controle próprio, ruptura de gôndola e alertas de vencimento.',
  },
  {
    icon: TrendingUp,
    title: 'Precificação Inteligente (MIDAS)',
    desc: 'Agente MIDAS monitora margem por produto e sugere ajustes de preço com base em custo e concorrência.',
  },
  {
    icon: PhoneCall,
    title: 'Televendas UltraFast',
    desc: 'Do pedido verbal à proposta comercial enviada em menos de 2 minutos. Busca por EAN, controle de alçada e exportação por WhatsApp.',
  },
  {
    icon: Bot,
    title: 'Compras Automáticas',
    desc: 'IA de compras sugere reposição automática baseada em consumo histórico, sazonalidade e nível mínimo de estoque.',
  },
]

const benefits = [
  'Gestão multi-loja com visões apartadas por unidade',
  'Benchmark de performance entre filiais',
  'Controle de estoque por seção e departamento',
  'Precificação dinâmica com simulações de margem',
  'Televendas: proposta em menos de 2 minutos',
  'CRM com histórico completo de clientes',
  'Financeiro & DRE automático',
  '15 agentes de IA trabalhando 24/7',
]

export function MercadosPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--accent': '#0A4D68', '--accent-dark': '#073748' } as React.CSSProperties}
    >
      <title>Sistema de Gestão para Supermercados | Grupo Granular</title>

      <Header category="mercados" />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[#0A4D68] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Para Supermercados & Atacarejos
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Gestão completa para supermercados e atacados,{' '}
            <span style={{ color: '#0A4D68' }}>com IA</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Controle de estoque, precificação inteligente e integração com delivery — em um só sistema.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/checkout?plano=saas-2&segmento=mercado"
              className="inline-flex items-center gap-2 text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
              style={{ backgroundColor: '#0A4D68' }}
            >
              Ver planos para mercados
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
              Os módulos que fazem diferença para mercados
            </h2>
            <p className="text-[#9C958A] text-base max-w-2xl mx-auto">
              Granular Market foi desenhado para supermercados, atacarejos e atacados — com a complexidade do varejo alimentar.
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#0A4D6815' }}>
                    <Icon size={24} style={{ color: '#0A4D68' }} />
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
                Tudo que um mercado precisa
              </h2>
              <p className="text-[#9C958A] text-base mb-6 leading-relaxed">
                Do estoque ao televendas — o Granular Market é a plataforma completa para supermercados, atacarejos e atacados de todos os tamanhos.
              </p>
              <Link
                to="/checkout?plano=saas-2&segmento=mercado"
                className="inline-flex items-center gap-2 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                style={{ backgroundColor: '#0A4D68' }}
              >
                Ver planos para mercados
                <ArrowRight size={16} />
              </Link>
            </div>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#0A4D68' }} />
                  <span className="text-sm text-[#0E0E0F]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faq category="mercados" />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Pronto para transformar seu mercado?
          </h2>
          <p className="text-white/50 text-base mb-8">
            Sistema precificado sob consulta de acordo com o porte da operação e módulos contratados.
          </p>
          <Link
            to="/checkout?plano=saas-2&segmento=mercado"
            className="inline-flex items-center gap-2 bg-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            style={{ color: '#0A4D68' }}
          >
            Ver planos para mercados
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
