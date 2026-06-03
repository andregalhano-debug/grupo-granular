export interface FaqEntry {
  id: string
  keywords: string[]
  question: string
  answer: string
}

export const faqEntries: FaqEntry[] = [
  {
    id: 'o-que-e',
    keywords: ['granular', 'o que', 'empresa', 'quem', 'sobre'],
    question: 'O que é a Granular?',
    answer: 'A Granular é uma empresa de consultoria e gestão em delivery, potencializada por IA. Ajudamos restaurantes, farmácias e atacarejos a otimizarem suas operações com tecnologia e especialistas.',
  },
  {
    id: 'planos-sistema',
    keywords: ['plano', 'pacote', 'sistema', 'preco', 'valor', 'quanto', 'custa'],
    question: 'Quais são os planos do sistema?',
    answer: 'Temos 3 pacotes: Pacote 1 (R$ 89/mês, até 3 IDs), Pacote 2 (R$ 489/mês, até 10 IDs) e Pacote 3 (R$ 3.899/mês, até 20 IDs). Todos incluem o Portal Granular e dashboard completo.',
  },
  {
    id: 'consultoria',
    keywords: ['consultoria', 'consultor', 'especialista', 'in loco'],
    question: 'Como funciona a consultoria?',
    answer: 'Nossa consultoria é realizada in loco por especialistas. Oferecemos planos de 1 mês (R$ 3.890), 3 meses (R$ 3.590/mês) e 6 meses (R$ 2.990/mês). Inclui diagnóstico, estratégias e acompanhamento.',
  },
  {
    id: 'teste-gratis',
    keywords: ['teste', 'gratis', 'gratuito', 'trial', 'experimentar'],
    question: 'Tem teste grátis?',
    answer: 'Sim! Oferecemos 14 dias de teste grátis nos planos de sistema. Sem cartão de crédito, cancele quando quiser.',
  },
  {
    id: 'pagamento',
    keywords: ['pagamento', 'pagar', 'pix', 'cartao', 'forma'],
    question: 'Quais formas de pagamento?',
    answer: 'Para o sistema aceitamos Pix e Cartão de Crédito (mensal). A consultoria é paga via Pix à vista com 3% de desconto sobre o valor total.',
  },
  {
    id: 'cancelar',
    keywords: ['cancelar', 'cancelamento', 'sair', 'desistir'],
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Você pode cancelar o plano do sistema a qualquer momento, sem multa ou fidelidade.',
  },
  {
    id: 'modulos',
    keywords: ['modulo', 'funcionalidade', 'recurso', 'estoque', 'kds', 'financeiro'],
    question: 'Quais módulos estão inclusos?',
    answer: 'Dependendo do pacote: Vendas e Operação, Estoque e Checklist, RH e Produção, KDS (Kitchen Display), Dashboard de performance, CRM e integração iFood. Além de 15 agentes de IA.',
  },
  {
    id: 'ia',
    keywords: ['ia', 'inteligencia', 'artificial', 'agente', 'automatico'],
    question: 'Como funciona a IA da Granular?',
    answer: 'Temos 15 agentes de IA que automatizam compras, precificação, previsão de demanda e muito mais. É uma tecnologia exclusiva que nenhum concorrente oferece.',
  },
  {
    id: 'ifood',
    keywords: ['ifood', 'marketplace', 'integracao', 'pedido'],
    question: 'Integra com o iFood?',
    answer: 'Sim! Temos integração nativa com o iFood para gestão centralizada de todos os pedidos, avaliação de visitas e estratégias de rankeamento.',
  },
  {
    id: 'cmv',
    keywords: ['cmv', 'custo', 'mercadoria', 'ficha tecnica'],
    question: 'Como funciona o controle de CMV?',
    answer: 'O CMV é calculado automaticamente em tempo real, a cada venda. Inclui fichas técnicas detalhadas com custo automático e controle de rendimento.',
  },
  {
    id: 'multi-loja',
    keywords: ['multi', 'loja', 'unidade', 'filial', 'rede'],
    question: 'Funciona para várias lojas?',
    answer: 'Sim! Temos suporte multi-lojas com visões apartadas por unidade e benchmark entre elas. Ideal para redes e franquias.',
  },
  {
    id: 'onboarding',
    keywords: ['onboarding', 'comecar', 'inicio', 'implementacao', 'cronograma'],
    question: 'Como é o processo de onboarding?',
    answer: 'Após o pagamento, um consultor entra em contato pelo WhatsApp em até 2h. Em 24h agendamos a reunião de onboarding, e em até 7 dias sua operação estará rodando.',
  },
  {
    id: 'suporte',
    keywords: ['suporte', 'ajuda', 'atendimento', 'problema'],
    question: 'Como funciona o suporte?',
    answer: 'Oferecemos suporte técnico e atualizações contínuas. Nosso time está disponível para ajudar via WhatsApp e e-mail.',
  },
  {
    id: 'app',
    keywords: ['app', 'celular', 'mobile', 'aplicativo'],
    question: 'Tem aplicativo mobile?',
    answer: 'Sim! Todos os planos incluem app mobile nativo para acompanhar sua operação de qualquer lugar.',
  },
  {
    id: 'consultores-marketplace',
    keywords: ['marketplace', 'consultores', 'especialistas', 'contratar'],
    question: 'Como encontrar um consultor?',
    answer: 'Acesse nosso marketplace de consultores em /consultores. Lá você encontra especialistas verificados em diversas áreas do delivery, com perfis, avaliações e preços.',
  },
]

export const fallbackMessage = {
  text: 'Não encontrei uma resposta exata para sua pergunta. Que tal falar com nosso time?',
  whatsappUrl: 'https://wa.me/5511999999999?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20Granular.',
  whatsappLabel: 'Falar pelo WhatsApp',
}

export const welcomeMessage = 'Olá! Sou o assistente da Granular. Pergunte sobre nossos planos, consultoria, módulos ou qualquer dúvida. 😊'
