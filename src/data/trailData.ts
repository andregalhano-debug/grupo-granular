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
  // ─── MÓDULO 1: MAPA MENTAL ───
  {
    id: 'mod-0',
    title: '1. Mapa Mental — Visão Geral',
    description: 'Entenda de forma rápida e visual como a Granular funciona e se conecta.',
    lessons: [
      {
        id: 'l-0-1',
        title: 'O ecossistema Granular em 1 minuto',
        type: 'reading',
        durationMinutes: 1,
        content: `**A Granular é o sistema operacional de food service.** Tudo que o restaurante precisa, em um lugar só.\n\n**Mapa do ecossistema:**\n\n**ENTRADA DE DADOS**\niFood (pedidos) → Granular\nOmie (financeiro) → Granular\nFoozi (+2k fornecedores) → Granular\nEquipe (checklists, estoque) → Granular\n\n**PROCESSAMENTO**\nGranular = 26 módulos + 15 agentes de IA + 92 tabelas\n\n**SAÍDA DE VALOR**\nDashboard → Dono vê KPIs em tempo real\nKDS → Cozinha recebe pedidos organizados\nRelatórios → Decisões baseadas em dados\nAlertas IA → Problemas antes de acontecer\nDRE automático → Saúde financeira sem planilha\n\n**QUEM USA:**\n- Dono/gestor → Dashboard, DRE, relatórios\n- Cozinha → KDS, fichas técnicas\n- Estoquista → Movimentações, contagem, NF-e\n- RH → Escalas, documentos, contratação\n- Consultor → Painel com briefings de IA`,
      },
      {
        id: 'l-0-2',
        title: 'Os 26 módulos — resumo rápido',
        type: 'reading',
        durationMinutes: 1,
        content: `**Módulos do sistema Maestro Food (produção):**\n\n| # | Módulo | O que faz |\n|---|--------|-----------|\n| 1 | Dashboard | KPIs consolidados, visão geral |\n| 2 | Operações | Gestão do dia a dia |\n| 3 | Cardápio | Itens, preços, categorias |\n| 4 | iFood | 6 sub-abas: pedidos, métricas, ranking, avaliações |\n| 5 | Financeiro | DRE, CMV, contas, conciliação, orçamento |\n| 6 | Estoque | Dashboard, itens, movimentações, NF-e, curva ABC, alertas |\n| 7 | Produção | Fichas técnicas, ordens, separação, precificação |\n| 8 | Pedidos | Kanban de pedidos em tempo real |\n| 9 | KDS | Tela da cozinha por estação |\n| 10 | CRM | Clientes, segmentação RFMTP, churn |\n| 11 | SLA | Gestão de nível de serviço |\n| 12 | 15 IAs | Johny (CEO), CFO, DIANA, MIDAS, TYCHE + 10 |\n| 13 | Vendas IA | Inteligência de vendas e margem |\n| 14 | Checklists | Templates, agendamento, fotos, scores |\n| 15 | Admin | Usuários, permissões, integrações |\n| 16 | Mobile | App React Native (12 telas) |\n\n**Stack:** React + TypeScript + Supabase (PostgreSQL) + Vercel\n**Integrações:** iFood (API + scraping diário 22:30) + Omie (ERP) + Foozi`,
      },
    ],
  },

  // ─── MÓDULO 2: SISTEMA NA PRÁTICA ───
  {
    id: 'mod-1',
    title: '2. Sistema na Prática',
    description: 'Como navegar, o que cada tela faz e o fluxo diário dentro do Maestro.',
    lessons: [
      {
        id: 'l-1-1',
        title: 'Estoque — o coração da operação',
        type: 'reading',
        durationMinutes: 1,
        content: `O estoque é onde tudo começa. Sem controle aqui, CMV explode.\n\n**O que o módulo faz:**\n- Dashboard com Valor Parado, CMV%, Cobertura e Desperdício\n- Curva ABC automática (20% dos itens = 80% do custo)\n- Alertas preditivos de ruptura\n- Movimentações de entrada/saída com NF-e\n- Etiquetas com data de validade\n\n**Controle por classe:**\n- **Classe A** (20% itens, 80% custo): controle DIÁRIO\n- **Classe B** (30% itens, 15% custo): controle SEMANAL\n- **Classe C** (50% itens, 5% custo): controle MENSAL\n\n**Regras de ouro:**\n- Proteína: giro máx 5 dias. Frango: 2-3 dias (crítico)\n- Hortifruti folhas: 2-3 dias, compra diária\n- FIFO sempre: etiquete tudo com data de recebimento\n- Perda aceitável: <2% do faturamento\n- Acuracidade: >95%`,
      },
      {
        id: 'l-1-2',
        title: 'Financeiro, DRE e precificação',
        type: 'reading',
        durationMinutes: 1,
        content: `O módulo financeiro gera o DRE automaticamente. O consultor precisa saber ler.\n\n**DRE típico dark kitchen (% faturamento):**\n- Receita Bruta: 100%\n- Impostos Simples: -6 a -12%\n- CMV (alimentos + embalagens): -28 a -33%\n- Mão de obra: -20 a -25%\n- Taxas iFood: -12 a -18%\n- Ocupação: -8 a -12%\n- **EBITDA saudável: 8-18%**\n- **Lucro líquido: 5-15%**\n\n**Precificação — Método Markup:**\nPreço = Custo do Prato ÷ (1 - Markup)\nMultiplicador rápido: **3.5x** (seguro) a **4x** (confortável). Nunca abaixo de 3x.\n\n**Atenção fluxo de caixa:**\niFood repassa em 15-30 dias. Fornecedor cobra em 7-28 dias. Salário dia 5. Gap de 15-30 dias exige capital de giro.\n\n**Quando matar uma marca:** margem contribuição negativa 3+ meses, <10 pedidos/dia, nota <4.0.`,
      },
      {
        id: 'l-1-3',
        title: 'iFood, KDS e fluxo de pedidos',
        type: 'reading',
        durationMinutes: 1,
        content: `**Algoritmo iFood (ordem de peso estimada):**\n1. Nota da loja (>4.5 bom, >4.7 excelente)\n2. Tempo de preparo (menor = melhor, meta <15 min)\n3. Taxa cancelamento (<3% mínimo, <1.5% top)\n4. Volume de pedidos recente\n5. Conversão (visualizações → pedidos)\n6. Investimento em promoções\n\n**KDS — Kitchen Display System:**\nSubstitui comandas de papel. Pedidos entram em tempo real por estação:\n- Grelha, Frituras, Frios, Montagem, Expedição\n- Cada estação vê só o que é dela\n- Alertas visuais de atraso\n\n**Multi-marca (modelo Grupo Vista — 8 marcas):**\n- 8 marcas = 8 posições no ranking iFood\n- Insumos compartilhados, cardápios diferentes\n- Máx 12-15 itens por marca no iFood\n- Monitorar canibalização entre marcas via agente TYCHE\n\n**Cardápio otimizado:**\n- Item âncora no topo (best-seller + boa margem)\n- Combo logo abaixo (+20-30% ticket)\n- Foto em tudo (30% menos vendas sem foto)`,
      },
      {
        id: 'l-1-4',
        title: 'Pessoas, Checklists e os 15 agentes de IA',
        type: 'reading',
        durationMinutes: 1,
        content: `**Módulo Pessoas (RH):**\nRecrutamento → Entrevistas → Contratação → Escalas → Desempenho\n- Custo real CLT: salário × 1.6 a 1.8\n- Escala 6x1, 2 turnos de 4 pessoas (operação 12h)\n- Turnover do setor: 60-100% ao ano\n\n**Checklists Operacionais:**\nSubstituem ferramentas como Konklui (economia R$ 199/mês)\n- Templates personalizados por unidade\n- Agendamento automático (abertura, fechamento, limpeza)\n- Exigência de foto como evidência\n- Score por equipe — gamificação\n\n**15 Agentes de IA (os diferenciais):**\n\n| Agente | Função | Substitui |\n|--------|--------|----------|\n| Johny (CEO) | Gestão operacional | Gerente (R$ 4-6k) |\n| CFO | Análise financeira | Analista (R$ 3-5k) |\n| Estoque | Gestão de insumos | Gerente estoque (R$ 2.5-3.5k) |\n| DIANA | Previsão de demanda | Analista dados |\n| MIDAS | Inteligência de vendas | Analista dados |\n| TYCHE | Canibalização entre marcas | Analista dados |\n\n**Economia total com IA: R$ 14.500-21.500/mês**\nIA opera 24/7 e nunca falta.`,
      },
    ],
  },

  // ─── MÓDULO 3: METODOLOGIA 5S ───
  {
    id: 'mod-2',
    title: '3. Metodologia 5S Aplicada',
    description: 'Os 5 sensos aplicados à operação de food service.',
    lessons: [
      {
        id: 'l-2-1',
        title: 'SEIRI (Utilização) e SEITON (Organização)',
        type: 'reading',
        durationMinutes: 1,
        content: `**SEIRI — Separar o necessário do desnecessário**\n\nNa cozinha: remover equipamentos não usados, identificar insumos parados >15 dias.\nNo cardápio: item que vende <5% do total — questione se deve continuar. Cardápio enxuto = menos estoque = mais margem.\nNo estoque: Curva ABC — foque nos 20% que geram 80% do custo.\n\n**SEITON — Cada coisa no seu lugar**\n\nCozinha organizada por estação (chapa, fritura, montagem, expedição).\nMise en place: tudo cortado e posicionado ANTES de abrir.\nEstoque: PVPS (Primeiro que Vence, Primeiro que Sai), etiquetas com data, zonas definidas.\n\n**Na Granular:**\n- Estoque Inteligente identifica itens Classe C e giro baixo\n- Checklists digitalizam a rotina de organização diária\n- Fichas Técnicas padronizam mise en place por estação\n\n**Checklist de avaliação:**\n- [ ] Equipamentos não utilizados na cozinha?\n- [ ] Insumos parados há mais de 15 dias?\n- [ ] Mise en place feito antes de abrir?\n- [ ] Estoque etiquetado com datas?`,
      },
      {
        id: 'l-2-2',
        title: 'SEISO (Limpeza) e SEIKETSU (Padronização)',
        type: 'reading',
        durationMinutes: 1,
        content: `**SEISO — Limpeza como prevenção**\n\nDiário: bancadas a cada troca de insumo, piso entre picos.\nSemanal: coifas, exaustores, geladeiras por dentro.\nImpacto: nota iFood >4.5, vigilância sanitária (multa até R$ 75k), vida útil equipamento 2-3x maior.\n\n**SEIKETSU — Tornar os 3 primeiros S's rotina**\n\nFicha técnica é lei: sem ficha = sem controle de CMV.\nCada prato: ingredientes, quantidades, modo de preparo, foto do prato final.\n\n**Benchmarks que o consultor PRECISA saber:**\n\n| Indicador | Ideal | Alerta | Crítico |\n|-----------|-------|--------|----------|\n| CMV | 28-32% | 33-36% | >36% |\n| Prime Cost | 55-60% | 61-65% | >65% |\n| Margem Operacional | >15% | 10-14% | <10% |\n| Nota iFood | >4.5 | 4.0-4.4 | <4.0 |\n| Cancelamento | <3% | 3-5% | >5% |\n\n**Regra dos 3 terços:** 1/3 CMV + 1/3 mão de obra + 1/3 despesas/lucro.`,
      },
      {
        id: 'l-2-3',
        title: 'SHITSUKE (Disciplina) — manter sem supervisão',
        type: 'reading',
        durationMinutes: 1,
        content: `O 5º S é o mais difícil: manter a disciplina quando ninguém está olhando.\n\n**Como construir:**\n1. Rituais diários — abertura e fechamento sempre com checklist\n2. Rituais semanais — reunião de 15 min (números + ações)\n3. Visibilidade — painel com KPIs acessível a todos\n4. Reconhecimento — bonificar equipes que mantêm padrão\n5. Carreira simples — auxiliar → cozinheiro → chefe\n\n**Reduzir turnover (60-100% ao ano):**\n- Salário competitivo\n- Escala justa (folgas respeitadas)\n- Ambiente organizado (resultado dos outros 4S's)\n- Bonificação por resultado\n\n**O papel do consultor:**\nCriar o sistema (5S + Granular) e garantir que o dono consiga manter SOZINHO após a consultoria. Se depender de você, não é sustentável.\n\n**Na Granular:** Checklists garantem rituais com evidência. Relatórios semanais automáticos alimentam a reunião. Módulo Pessoas acompanha desempenho e carreira.`,
      },
    ],
  },

  // ─── MÓDULO 4: PLAYBOOKS ───
  {
    id: 'mod-3',
    title: '4. Playbooks — Diagnóstico Rápido',
    description: 'O que fazer quando o cliente traz um problema. Decisões em minutos.',
    lessons: [
      {
        id: 'l-3-1',
        title: 'CMV alto e queda de vendas',
        type: 'reading',
        durationMinutes: 1,
        content: `**CMV subiu acima de 33%? Diagnóstico nessa ordem:**\n1. Fornecedor aumentou preço? (comparar NF-e)\n2. Ficha técnica está sendo seguida? (porcionamento)\n3. Desperdício? (contagem de lixo vs produção)\n4. Furto? (contagem física vs sistema)\n5. Mix de vendas mudou? (mais itens de CMV alto)\n\n**Ações:** 3 cotações, retreinar porcionamento (balança), revisar ficha, ajustar preço (markup 3.5x), promover itens de maior margem.\n\n**Vendas caíram mais de 15%?**\n1. Sazonal? (Jan/Jul = normal -10-20%)\n2. Concorrente novo?\n3. Nota iFood caiu? (<4.5 = ranking despenca)\n4. Tempo preparo aumentou?\n\n**Ações:** Cupom recompra 15+ dias inativos, combo agressivo (desconto aparente, margem real ok), reduzir tempo preparo, destaque iFood 7 dias.\n\n**Na Granular:** CMV atualizado a cada venda. IA de precificação sugere ajustes. Relatório compara custo fiscal vs custo móvel.`,
      },
      {
        id: 'l-3-2',
        title: 'Nota iFood baixa e gestão de crises',
        type: 'reading',
        durationMinutes: 1,
        content: `**Nota iFood abaixo de 4.5?**\n1. Ler TODAS as avaliações negativas dos últimos 7 dias\n2. Classificar: atraso? frio? errado? qualidade? porção?\n3. O problema #1 (>30% das reclamações) é o foco\n\n**Ações por problema:**\n- **Atraso (40% das reclamações):** reduzir cardápio, aumentar mise en place\n- **Frio (20%):** trocar embalagem térmica, reduzir tempo no balcão\n- **Pedido errado (15%):** dupla conferência antes de selar\n- **Porção pequena (10%):** revisar ficha, padronizar com balança\n- **Qualidade (15%):** retreinar cozinheiro, revisar insumos\n\n**Funcionário faltou?**\n1. Redistribuir funções\n2. Reduzir cardápio (manter 3 marcas de maior margem)\n3. Aumentar tempo preparo no iFood (evitar cancelamento)\n\n**Fornecedor aumentou preço?**\nNUNCA aceitar de primeira. 3 cotações. Negociar volume. À vista = 3-8% desconto. Se inevitável: repassar ao preço IMEDIATAMENTE.\n\n**Responder TODAS as avaliações negativas em <24h.**`,
      },
    ],
  },
]
