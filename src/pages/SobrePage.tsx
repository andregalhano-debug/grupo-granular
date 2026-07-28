import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const values = [
  {
    title: 'Dados com contexto',
    desc: 'Não basta ter número. Precisamos entender o que ele significa para a operação — e o que fazer com ele.',
    icon: '📊',
  },
  {
    title: 'IA com propósito',
    desc: 'Cada agente resolve um problema real. Nada de buzzword — a inteligência artificial aqui tem responsabilidade e resultado.',
    icon: '🤖',
  },
  {
    title: 'Resultado mensurável',
    desc: 'O que não é medido, não é gerenciado. Toda solução que entregamos tem KPI claro e impacto visível na operação.',
    icon: '📈',
  },
]

const teamPlaceholders = [
  { initials: 'GG', name: 'Fundador', role: 'CEO & Produto' },
  { initials: 'TG', name: 'Co-fundador', role: 'Tecnologia & IA' },
  { initials: 'MG', name: 'Membro do Time', role: 'Operações & Growth' },
]

export function SobrePage() {
  return (
    <div className="min-h-screen bg-white" style={{ '--accent': '#A31631', '--accent-dark': '#7d101f' } as React.CSSProperties}>
      <Header />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6">
            Sobre o{' '}
            <span className="text-[#E63946]">Grupo Granular</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Tecnologia com propósito para quem opera na prática.
          </p>
        </div>
      </section>

      {/* Missão */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E63946] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Nossa Missão
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-6">
                Transformar dados em decisões
              </h2>
              <p className="text-[#9C958A] text-base leading-relaxed">
                Transformar dados em decisões para gestores de food service e delivery no Brasil. Acreditamos que todo operador — do dono de restaurante ao gerente de supermercado — merece ter acesso às mesmas ferramentas que grandes redes têm, com a simplicidade de quem opera no dia a dia.
              </p>
            </div>
            <div className="bg-[#F7F7F7] rounded-2xl p-8 border border-[#9C958A]/15">
              <div className="text-4xl font-black text-[#E63946] mb-2">15+</div>
              <div className="text-sm font-semibold text-[#0E0E0F] mb-4">Agentes de IA trabalhando pela sua operação</div>
              <div className="text-4xl font-black text-[#E63946] mb-2">26</div>
              <div className="text-sm font-semibold text-[#0E0E0F] mb-4">Módulos integrados no sistema</div>
              <div className="text-2xl font-black text-[#E63946] mb-2">Sob consulta</div>
              <div className="text-sm font-semibold text-[#0E0E0F]">Plano de entrada para começar hoje</div>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E63946] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Nossa História
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-6">
            De onde viemos
          </h2>
          <p className="text-[#9C958A] text-base leading-relaxed">
            O Grupo Granular nasceu da percepção de que gestores de restaurantes e delivery precisavam de ferramentas que falassem a língua do negócio — não da TI. Vimos de perto operações perdendo margem por falta de visibilidade, tomando decisões no escuro, dependendo de planilhas para gerir o que deveria ser gerido por dados em tempo real. {' '}
            <span className="text-[#0E0E0F] font-medium">[Conteúdo em breve]</span>
          </p>
        </div>
      </section>

      {/* Time */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E63946] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              O Time
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
              Quem está por trás da Granular
            </h2>
            <p className="text-[#9C958A]">Pessoas que já operaram e entendem o problema na prática.</p>
          </div>

          {/* TODO: adicionar fotos e bios reais do time */}
          <div className="grid sm:grid-cols-3 gap-6">
            {teamPlaceholders.map((member) => (
              <div key={member.initials} className="bg-[#F7F7F7] rounded-2xl p-6 text-center border border-[#9C958A]/15">
                <div className="w-16 h-16 rounded-full bg-[#E63946]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#E63946]">{member.initials}</span>
                </div>
                <p className="font-semibold text-[#0E0E0F] mb-1">{member.name}</p>
                <p className="text-sm text-[#9C958A]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E63946] mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Nossos Valores
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              O que guia nossas decisões
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-6">
            Pronto para transformar sua operação?
          </h2>
          <p className="text-[#9C958A] text-base mb-8">
            Comece hoje com o plano ideal para o seu negócio.
          </p>
          <Link
            to="/agendar-demo"
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#7d101f] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Falar com a gente
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
