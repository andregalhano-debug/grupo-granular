import { FadeIn } from './FadeIn'

const skills = [
  { icon: '🧠', name: 'Gestão Operacional', output: 'Alertas de KPIs, plano de ação e prioridades do dia' },
  { icon: '💰', name: 'Análise Financeira', output: 'DRE automático, margem por produto e alertas de custo' },
  { icon: '🔮', name: 'Previsão de Demanda', output: 'Previsão de vendas por produto, canal e período' },
  { icon: '📊', name: 'Inteligência de Vendas', output: 'Simulações de preço, markup e mix de produtos' },
  { icon: '⚖️', name: 'Anti-canibalização', output: 'Relatório de sobreposição e recomendação de mix' },
  { icon: '📦', name: 'Gestão de Estoque', output: 'Sugestão de compra baseada no consumo histórico' },
  { icon: '🏷️', name: 'Precificação Dinâmica', output: 'Ajuste de preços com simulações de margem em tempo real' },
  { icon: '✅', name: 'Conformidade Operacional', output: 'Score de conformidade e alertas de não-execução' },
  { icon: '👥', name: 'CRM e Retenção', output: 'Segmentação automática e campanhas de recompra' },
  { icon: '🛵', name: 'Performance iFood', output: 'Diagnóstico de avaliações e ações para recuperação' },
  { icon: '🍽️', name: 'Otimização de Cardápio', output: 'Recomendação de cortes e destaques por rentabilidade' },
  { icon: '👷', name: 'Gestão de RH', output: 'Análise de produtividade e custo real por função' },
  { icon: '⏱️', name: 'Nível de Serviço (SLA)', output: 'Painel de SLA por canal e ação recomendada' },
  { icon: '🛒', name: 'Compras Automatizadas', output: 'Cotação automática e seleção do melhor fornecedor' },
  { icon: '📋', name: 'Relatórios Automáticos', output: 'Relatório semanal completo gerado e enviado automaticamente' },
]

export function AiAgentsSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Inteligência Artificial
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Agente Granular — mais de 15 habilidades trabalhando pela sua operação
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] transition-colors"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{skill.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white leading-snug">{skill.name}</p>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{skill.output}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/30 text-xs">
                Opera 24/7, aprende com os dados da sua operação e nunca falta ao trabalho.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
