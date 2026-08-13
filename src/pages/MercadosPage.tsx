import { Package, TrendingUp, PhoneCall, Bot } from 'lucide-react'
import { CategoryLanding } from './CategoryLanding'

export function MercadosPage() {
  return (
    <CategoryLanding
      config={{
        category: 'mercados',
        title: 'Sistema de Gestão para Supermercados | Grupo Granular',
        kicker: 'Para Supermercados & Atacarejos',
        headline: 'Gestão completa para supermercados e atacados,',
        headlineAccent: 'com IA',
        subtitle: 'Controle de estoque, precificação inteligente e integração com delivery — em um só sistema.',
        modulesTitle: 'Os módulos que fazem diferença para mercados',
        modulesSubtitle: 'Granular Market foi desenhado para supermercados, atacarejos e atacados — com a complexidade do varejo alimentar.',
        highlights: [
          { icon: Package, title: 'Estoque por Seção', desc: 'Açougue, padaria, FLV, mercearia — cada departamento com controle próprio, ruptura de gôndola e alertas de vencimento.' },
          { icon: TrendingUp, title: 'Precificação Inteligente (MIDAS)', desc: 'Agente MIDAS monitora margem por produto e sugere ajustes de preço com base em custo e concorrência.' },
          { icon: PhoneCall, title: 'Televendas UltraFast', desc: 'Do pedido verbal à proposta comercial enviada em menos de 2 minutos. Busca por EAN, controle de alçada e exportação por WhatsApp.' },
          { icon: Bot, title: 'Compras Automáticas', desc: 'IA de compras sugere reposição automática baseada em consumo histórico, sazonalidade e nível mínimo de estoque.' },
        ],
        benefitsTitle: 'Tudo que um mercado precisa',
        benefitsLead: 'Do estoque ao televendas — o Granular Market é a plataforma completa para supermercados, atacarejos e atacados de todos os tamanhos.',
        benefits: [
          'Gestão multi-loja com visões apartadas por unidade',
          'Benchmark de performance entre filiais',
          'Controle de estoque por seção e departamento',
          'Precificação dinâmica com simulações de margem',
          'Televendas: proposta em menos de 2 minutos',
          'CRM com histórico completo de clientes',
          'Financeiro & DRE automático',
          '15 agentes de IA trabalhando 24/7',
        ],
        ctaTitle: 'Pronto para transformar seu mercado?',
        ctaSubtitle: 'Sistema precificado sob consulta de acordo com o porte da operação e módulos contratados.',
      }}
    />
  )
}
