export type LessonType = 'reading' | 'video'

export interface Lesson {
  id: string
  title: string
  type: LessonType
  durationMinutes: number
  content: string
  videoUrl?: string
}

export interface TrailModule {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export const trailModules: TrailModule[] = [
  {
    id: 'mod-1',
    title: '1. Conheça a Granular',
    description: 'Visão geral da plataforma, módulos e como a tecnologia transforma a operação.',
    lessons: [
      {
        id: 'l-1-1',
        title: 'O que é a Granular e para quem serve',
        type: 'reading',
        durationMinutes: 3,
        content: `A Granular é uma plataforma completa de gestão para food service — restaurantes, dark kitchens, redes de franquias e operações de delivery. Nosso objetivo é simples: dar ao operador visibilidade total do negócio, eliminando planilhas e unificando estoque, financeiro, produção, pessoas e vendas em um só lugar.\n\n**Para quem serve:**\n- Donos de restaurantes e dark kitchens que querem sair das planilhas\n- Redes com múltiplas unidades que precisam de visão consolidada e benchmark\n- Operações de delivery que dependem de iFood e precisam de controle de margem\n- Gestores que querem tomar decisões baseadas em dados, não em intuição\n\n**Módulos disponíveis:**\n1. **Estoque Inteligente** — controle de insumos, compras, inventário e alertas de reposição\n2. **Produção & Fichas Técnicas** — custo por porção, rendimento e simulador de preço\n3. **KDS (Kitchen Display)** — painel digital para cozinha com fila de pedidos em tempo real\n4. **Financeiro & DRE** — DRE automático, contas a pagar/receber, conciliação bancária\n5. **iFood & Pedidos** — gestão centralizada de todos os IDs e marcas\n6. **CRM & Clientes** — base unificada com histórico e segmentação\n7. **Checklists Operacionais** — rotinas digitalizadas com fotos e evidências\n8. **15 Agentes de IA** — compras, precificação, previsão de demanda e mais\n9. **Pessoas (RH)** — recrutamento, escalas, documentos, desempenho\n10. **Relatórios** — gerenciais automatizados com visão multi-lojas\n11. **Emissão de NF** — NF-e e NFC-e integradas ao fluxo`,
      },
      {
        id: 'l-1-2',
        title: 'Navegando pelo painel e primeiros passos',
        type: 'reading',
        durationMinutes: 4,
        content: `Ao acessar a Granular, o consultor encontra o **Painel do Consultor** — sua central de trabalho.\n\n**Agenda:** Veja as sessões do dia e da semana. Cada sessão mostra o cliente, horário, tipo (diagnóstico, primeira sessão ou acompanhamento) e status.\n\n**Briefings:** Antes de cada sessão, a IA gera um briefing completo do cliente: métricas-chave, tendências, pontos de dor identificados e abordagem recomendada. Use isso para chegar preparado.\n\n**Preparação:** Itens de ação da sessão anterior, dados-chave atualizados e tópicos sugeridos para a conversa.\n\n**Modelo de Consultoria:** Nossa metodologia padrão em 4 fases:\n1. **Diagnóstico** (20 min) — entender a situação e alinhar expectativas\n2. **Análise** (15 min) — comparar benchmarks, priorizar e identificar quick wins\n3. **Plano de Ação** (15 min) — definir 3-5 ações com prazos, responsáveis e métricas\n4. **Acompanhamento** (10 min) — resumir, confirmar próximos passos e agendar follow-up\n\n**Dica:** Sempre inicie pela agenda do dia. Os briefings de IA são atualizados automaticamente com os dados mais recentes do cliente.`,
      },
    ],
  },
  {
    id: 'mod-2',
    title: '2. Metodologia 5S na Operação',
    description: 'Aplique os 5 sensos para organizar, padronizar e disciplinar a operação do cliente.',
    lessons: [
      {
        id: 'l-2-1',
        title: 'SEIRI — Senso de Utilização',
        type: 'reading',
        durationMinutes: 4,
        content: `O primeiro S foca em separar o necessário do desnecessário. Na operação de food service, isso significa:\n\n**Na cozinha:**\n- Remover equipamentos que não são usados (ocupam espaço e acumulam sujeira)\n- Identificar insumos parados há mais de 15 dias (potencial desperdício)\n- Eliminar utensílios duplicados ou quebrados\n\n**No estoque:**\n- Aplicar a **Curva ABC**: 20% dos itens geram 80% do faturamento — foque neles\n- Estoque perecível: giro máximo 5 dias para proteínas, 3 dias para hortifruti\n- Identificar itens com baixo giro e avaliar retirada do cardápio\n\n**No cardápio:**\n- **Cardápio enxuto = menos estoque = menos desperdício = mais margem**\n- Cada item no cardápio custa: insumo, espaço, tempo de preparo e complexidade\n- Se um prato vende menos de 5% do total, questione se deve continuar\n\n**Na Granular:** Use o módulo de Estoque Inteligente para identificar itens Classe C e o relatório de CMV por produto para encontrar o que está sobrando.\n\n**Como avaliar no cliente:**\n- [ ] Existem equipamentos não utilizados na cozinha?\n- [ ] Há insumos parados há mais de 15 dias?\n- [ ] O cardápio tem itens que vendem menos de 5% do total?\n- [ ] O estoque tem produtos vencidos ou próximos do vencimento?`,
      },
      {
        id: 'l-2-2',
        title: 'SEITON — Senso de Organização',
        type: 'reading',
        durationMinutes: 4,
        content: `Após eliminar o desnecessário, organize o que ficou. Cada coisa no seu lugar.\n\n**Na cozinha:**\n- Organização por estação de trabalho (chapa, fritura, montagem, expedição)\n- **Mise en place**: tudo cortado, porcionado e posicionado ANTES de abrir\n- Utensílios na altura certa, insumos do dia na geladeira de linha (não no estoque geral)\n\n**No estoque:**\n- PVPS (Primeiro que Vence, Primeiro que Sai) — etiquetas com data visível\n- Zonas definidas: refrigerado, congelado, secos, descartáveis, limpeza\n- Prateleiras identificadas por categoria\n\n**Nos processos:**\n- Rotina de abertura padronizada (checklist no sistema)\n- Rotina de fechamento padronizada (checklist no sistema)\n- Escala visível e acessível para toda equipe\n\n**Na Granular:** Use os Checklists Operacionais para digitalizar as rotinas de abertura e fechamento. O módulo de Produção organiza as fichas técnicas por estação.\n\n**Rotina de abertura sugerida:**\n1. Verificar estoque crítico (alertas no Maestro)\n2. Conferir escalas — quem está, quem faltou\n3. Iniciar mise en place por estação\n4. Verificar equipamentos (geladeira, chapa, fritadeira — temperaturas ok?)\n5. Abrir marcas no iFood no horário correto\n6. Verificar promoções ativas`,
      },
      {
        id: 'l-2-3',
        title: 'SEISO — Senso de Limpeza',
        type: 'reading',
        durationMinutes: 3,
        content: `Limpeza como prevenção, não como reação. Ambiente limpo reduz contaminação, melhora a nota da vigilância sanitária e aumenta a vida útil dos equipamentos.\n\n**Protocolo diário:**\n- Limpeza de bancadas a cada troca de insumo\n- Piso da cozinha: varrer entre picos, lavar no fechamento\n- Equipamentos: limpar externamente a cada turno\n- Geladeiras: verificar temperatura e organização a cada abertura\n\n**Protocolo semanal:**\n- Limpeza profunda de coifas, exaustores e fritadeiras\n- Limpeza interna de geladeiras e freezers\n- Verificar armadilhas de pragas\n\n**Na Granular:** Crie checklists de limpeza com exigência de foto como evidência. O gestor da rede consegue verificar remotamente se a rotina foi cumprida em todas as unidades.\n\n**Impacto nos KPIs:**\n- Nota iFood > 4.5 depende de higiene percebida pelo cliente\n- Vigilância sanitária: multa pode chegar a R$ 75 mil\n- Equipamento limpo = vida útil 2-3x maior`,
      },
      {
        id: 'l-2-4',
        title: 'SEIKETSU — Senso de Padronização',
        type: 'reading',
        durationMinutes: 4,
        content: `Padronizar é tornar os 3 primeiros S's parte da rotina, não esforço pontual.\n\n**Fichas técnicas são lei:**\n- Sem ficha técnica, não existe controle de CMV\n- Cada prato deve ter: ingredientes, quantidades exatas, modo de preparo, foto do prato final\n- Custo por porção calculado automaticamente no sistema\n- Se o preço do insumo muda, o custo da ficha atualiza em tempo real\n\n**Benchmarks que o consultor deve conhecer:**\n\n| Indicador | Ideal | Alerta | Crítico |\n|-----------|-------|--------|----------|\n| CMV | 28-32% | 33-36% | >36% |\n| Labor Cost | 20-25% | 26-30% | >30% |\n| Prime Cost (CMV + Labor) | 55-60% | 61-65% | >65% |\n| Margem Operacional | >15% | 10-14% | <10% |\n| Nota iFood | >4.5 | 4.0-4.4 | <4.0 |\n| Taxa cancelamento | <3% | 3-5% | >5% |\n\n**Regra dos 3 terços:** 1/3 CMV + 1/3 mão de obra + 1/3 despesas/lucro\n\n**Na Granular:** O módulo de Produção & Fichas Técnicas garante que todas as unidades sigam o mesmo padrão. O DRE automático compara os indicadores reais com os benchmarks.`,
      },
      {
        id: 'l-2-5',
        title: 'SHITSUKE — Senso de Disciplina',
        type: 'reading',
        durationMinutes: 3,
        content: `O último S é o mais difícil e o mais importante: manter a disciplina sem precisar de supervisão constante.\n\n**Como construir disciplina na operação:**\n1. **Rituais diários** — abertura e fechamento sempre com checklist\n2. **Rituais semanais** — reunião de 15 min com a equipe (números da semana + ações)\n3. **Visibilidade** — painel com KPIs acessível a todos (meta do dia, pedidos, nota)\n4. **Reconhecimento** — bonificar equipes que mantêm padrão (% do faturamento ou meta de desperdício)\n5. **Plano de carreira simples** — auxiliar → cozinheiro → chefe (motivação natural)\n\n**Como reduzir turnover (60-100% ao ano no setor):**\n- Salário competitivo (pesquisar mercado local)\n- Escala justa (folgas respeitadas, sem hora extra abusiva)\n- Ambiente organizado (resultado dos outros 4S's)\n- Bonificação por resultado\n\n**Na Granular:** Os Checklists garantem que rituais sejam cumpridos com evidência. O módulo de Pessoas (RH) acompanha desempenho, escala e plano de carreira. Os Relatórios semanais automatizados alimentam a reunião de equipe sem esforço manual.\n\n**O papel do consultor:** Seu trabalho é criar o sistema (5S + Granular) e garantir que o dono consiga manter sozinho após a consultoria. Se depender de você para funcionar, não é sustentável.`,
      },
    ],
  },
  {
    id: 'mod-3',
    title: '3. Playbooks de Consultoria',
    description: 'Diagnósticos rápidos e planos de ação para os problemas mais comuns.',
    lessons: [
      {
        id: 'l-3-1',
        title: 'CMV alto e margem apertada',
        type: 'reading',
        durationMinutes: 4,
        content: `Quando o cliente reclama que "sobra pouco no final do mês", o CMV quase sempre é o vilão.\n\n**Diagnóstico (nessa ordem):**\n1. Verificar se houve aumento de preço de fornecedor (comparar NF-e)\n2. Verificar se ficha técnica está sendo seguida (porcionamento na cozinha)\n3. Verificar desperdício (contagem de lixo vs produção)\n4. Verificar se há furto (contagem física vs sistema)\n5. Verificar se mix de vendas mudou (vendendo mais itens de CMV alto)\n\n**Ações imediatas:**\n- Renegociar com fornecedor ou buscar alternativo (sempre 3 cotações)\n- Retreinar equipe no porcionamento (balança obrigatória)\n- Revisar ficha técnica — substituir insumo caro por alternativa\n- Ajustar preço de venda (markup 3.5x do novo custo)\n- Se mix mudou: promover itens de maior margem no iFood\n\n**Na Granular:** O módulo de Estoque mostra o CMV real atualizado a cada venda. O comparativo de custo fiscal vs custo móvel identifica drift de preço de fornecedor. A IA de precificação sugere ajustes de preço automaticamente.\n\n**Preço mínimo delivery:** Ticket mínimo deve cobrir embalagem + taxa + margem — nunca abaixo de R$ 25.\n\n**Promoção que dá prejuízo não é promoção:** Sempre calcular margem REAL após desconto.`,
      },
      {
        id: 'l-3-2',
        title: 'Queda de vendas e nota iFood baixa',
        type: 'reading',
        durationMinutes: 4,
        content: `**Diagnóstico de queda de vendas:**\n1. É sazonal? (janeiro, julho = normal cair 10-20%)\n2. Concorrente novo na região?\n3. Nota iFood caiu? (abaixo de 4.5 = queda de ranking)\n4. Tempo de preparo aumentou? (iFood penaliza)\n5. Promoção do concorrente atraiu clientes?\n\n**Ações para vendas:**\n- Ativar cupom de recompra para clientes inativos 15+ dias\n- Criar combo agressivo (aparente desconto, margem real ok)\n- Reduzir tempo de preparo (revisar mise en place)\n- Investir em destaque iFood por 7 dias (testar ROI)\n\n**Diagnóstico nota iFood baixa (<4.5):**\n1. Ler TODAS as avaliações negativas dos últimos 7 dias\n2. Classificar: atraso? frio? errado? qualidade? porção?\n3. Identificar o problema #1 (>30% das reclamações)\n\n**Ações por problema:**\n- **Atraso**: Reduzir cardápio temporariamente, aumentar mise en place\n- **Frio**: Trocar embalagem (térmica), reduzir tempo no balcão\n- **Pedido errado**: Implementar dupla conferência antes de selar\n- **Porção pequena**: Revisar ficha técnica, padronizar com balança\n\n**Na Granular:** O módulo iFood & Pedidos consolida avaliações e métricas. A IA identifica padrões de reclamação e sugere ações. O KDS ajuda a reduzir tempo de preparo organizando a fila por prioridade.`,
      },
      {
        id: 'l-3-3',
        title: 'Gestão de pessoas e turnover',
        type: 'reading',
        durationMinutes: 4,
        content: `O setor de food service tem turnover de 60-100% ao ano. Cada saída custa 1.5-2x o salário mensal.\n\n**Custo real de um funcionário (CLT):**\n- Salário base: R$ 1.800 (cozinheiro BH, 2025)\n- Custo real mensal (com encargos): ~R$ 2.450 (1.36x)\n- Custo total (com benefícios): ~R$ 2.950/mês\n- **Regra rápida:** salário × 1.6 a 1.8\n\n**Produtividade por função:**\n\n| Função | Meta pedidos/hora | Salário BH |\n|--------|-------------------|------------|\n| Chapeiro | 8-12 | R$ 1.800-2.200 |\n| Fritador | 10-15 | R$ 1.600-1.900 |\n| Montador/expedição | 12-18 | R$ 1.500-1.800 |\n| Auxiliar | Apoio geral | R$ 1.412-1.600 |\n| Cozinheiro chefe | Supervisão + preparo | R$ 2.500-3.500 |\n\n**Escala ideal (operação 12h, 10h-22h):**\n- 2 turnos de 4 pessoas cada\n- Escala 6x1 (6 trabalhando, 1 folga)\n- 1 folguista para cada 6 funcionários\n\n**Na Granular:** O módulo Pessoas (RH) faz recrutamento, controle de entrevistas, escalas inteligentes, custo real por colaborador e gestão de turnover. O consultor usa esses dados para diagnosticar se o cliente está gastando demais com pessoas ou se tem equipe subdimensionada.\n\n**Plano de carreira simples:** auxiliar → cozinheiro → chefe. Isso reduz turnover em até 60%.`,
      },
    ],
  },
]
