import { Package, ChefHat, Monitor, TrendingUp, ShoppingBag, Users, ClipboardCheck, Bot, Smartphone, Shield, BarChart3 } from 'lucide-react'
import { FadeIn } from './FadeIn'

const modules = [
  { icon: Package, title: 'Estoque Inteligente', desc: 'Controle total de insumos, compras e inventário com alertas automáticos de reposição.' },
  { icon: ChefHat, title: 'Produção & Fichas Técnicas', desc: 'Fichas técnicas detalhadas com custo automático e controle de rendimento.' },
  { icon: Monitor, title: 'KDS - Kitchen Display', desc: 'Painel digital para cozinha com tempos, prioridades e status em tempo real.' },
  { icon: TrendingUp, title: 'Financeiro & DRE', desc: 'DRE automático, contas a pagar/receber e conciliação bancária integrada.' },
  { icon: ShoppingBag, title: 'iFood & Pedidos', desc: 'Integração nativa com iFood para gestão centralizada de todos os pedidos.' },
  { icon: Users, title: 'CRM & Clientes', desc: 'Base unificada de clientes com histórico de pedidos e segmentação.' },
  { icon: ClipboardCheck, title: 'Checklists Operacionais', desc: 'Rotinas diárias digitalizadas com fotos, evidências e acompanhamento.' },
  { icon: Bot, title: '15 Agentes de IA', desc: 'Assistentes inteligentes para compras, precificação, previsão e mais.' },
]

const badges = [
  { icon: Smartphone, text: 'App mobile nativo incluso' },
  { icon: Shield, text: 'Multi-tenant com isolamento total' },
  { icon: BarChart3, text: 'Benchmark entre unidades' },
]

export function Modules() {
  return (
    <section id="modulos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Tudo que sua operação precisa, em um só lugar
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Módulos integrados que eliminam planilhas e unificam sua gestão.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => (
            <FadeIn key={mod.title} delay={i * 80}>
              <div className="group rounded-2xl border border-[#EAE5D9] bg-white p-6 hover:border-[#5C1A2B]/20 hover:shadow-lg hover:shadow-[#5C1A2B]/5 transition-all duration-300 h-full">
                <div className="w-11 h-11 rounded-xl bg-[#5C1A2B]/10 flex items-center justify-center mb-4">
                  <mod.icon size={22} className="text-[#5C1A2B]" />
                </div>
                <h3 className="font-semibold text-[#0E0E0F] mb-2">{mod.title}</h3>
                <p className="text-sm text-[#9C958A] leading-relaxed">{mod.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {badges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-[#9C958A]">
              <badge.icon size={16} className="text-[#5C1A2B]" />
              {badge.text}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
