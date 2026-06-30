import { FadeIn } from './FadeIn'

interface Agent {
  name: string
  problem: string
  output: string
  icon: string
}

const agents: Agent[] = [
  {
    name: 'Johny — CEO de IA',
    problem: 'Gestão operacional diária — substitui gerente geral',
    output: 'Alertas de KPIs, plano de ação e prioridades do dia',
    icon: '🧠',
  },
  {
    name: 'CFO — Analista Financeiro',
    problem: 'Análise financeira e saúde do caixa',
    output: 'DRE automático, margem por produto e alertas de custo',
    icon: '💰',
  },
  {
    name: 'DIANA — Previsão de Demanda',
    problem: 'Incerteza sobre quanto produzir ou comprar',
    output: 'Previsão de vendas por produto, canal e período',
    icon: '🔮',
  },
  {
    name: 'MIDAS — Inteligência de Vendas',
    problem: 'Margem sacrificada por precificação inadequada',
    output: 'Simulações de preço, markup e mix de produtos',
    icon: '📊',
  },
  {
    name: 'TYCHE — Anti-canibalização',
    problem: 'Marcas próprias competindo entre si no iFood',
    output: 'Relatório de sobreposição e recomendação de mix',
    icon: '⚖️',
  },
  {
    name: 'Estoque IA',
    problem: 'Ruptura ou excesso de insumos no estoque',
    output: 'Sugestão de compra baseada no consumo histórico',
    icon: '📦',
  },
  {
    name: 'Precificação IA',
    problem: 'Preços fora do mercado ou abaixo do custo real',
    output: 'Ajuste dinâmico de preços com simulações de margem',
    icon: '🏷️',
  },
  {
    name: 'Checklist IA',
    problem: 'Rotinas operacionais descumpridas sem visibilidade',
    output: 'Score de conformidade e alertas de não-execução',
    icon: '✅',
  },
  {
    name: 'CRM IA',
    problem: 'Clientes inativos sem ação de reativação',
    output: 'Segmentação automática e campanhas de recompra',
    icon: '👥',
  },
  {
    name: 'iFood IA',
    problem: 'Queda de ranking sem causa identificada',
    output: 'Diagnóstico de avaliações e ações para recuperação',
    icon: '🛵',
  },
  {
    name: 'Cardápio IA',
    problem: 'Itens de baixa margem ocupando o cardápio',
    output: 'Recomendação de cortes e destaques por rentabilidade',
    icon: '🍽️',
  },
  {
    name: 'RH IA',
    problem: 'Turnover alto e custo de pessoal descontrolado',
    output: 'Análise de produtividade e alertas de custo real por função',
    icon: '👷',
  },
  {
    name: 'SLA IA',
    problem: 'Nível de serviço abaixo do esperado sem diagnóstico',
    output: 'Painel de SLA por canal e ação recomendada',
    icon: '⏱️',
  },
  {
    name: 'Compras IA',
    problem: 'Compras sem histórico ou comparação de fornecedores',
    output: 'Cotação automatizada e seleção do melhor fornecedor',
    icon: '🛒',
  },
  {
    name: 'Relatórios IA',
    problem: 'Gerentes gastando horas montando relatórios manualmente',
    output: 'Relatório semanal completo gerado e enviado automaticamente',
    icon: '📋',
  },
]

export function AiAgentsSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Inteligência Artificial
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            15 Agentes de IA trabalhando pela sua operação
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Cada agente resolve um problema real. Nada de buzzword — aqui você vê o que cada IA faz, com qual dado e qual resultado entrega.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, i) => (
            <FadeIn key={agent.name} delay={i * 40}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 rounded-xl">
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug">{agent.name}</h3>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] flex-shrink-0 mt-0.5">Problema</span>
                        <p className="text-xs text-white/50 leading-relaxed">{agent.problem}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 flex-shrink-0 mt-0.5">Entrega</span>
                        <p className="text-xs text-white/70 leading-relaxed">{agent.output}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="mt-10 text-center">
            <p className="text-white/30 text-xs">
              Todos os agentes operam 24/7, aprendem com os dados da sua operação e nunca faltam ao trabalho.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
