import { TrendingUp, Package, ChefHat, ShoppingBag } from 'lucide-react'
import { CategoryLanding } from './CategoryLanding'

export function RestaurantesPage() {
  return (
    <CategoryLanding
      config={{
        category: 'restaurantes',
        title: 'Sistema de Gestão para Restaurantes | Grupo Granular',
        kicker: 'Para Restaurantes & Delivery',
        headline: 'Gestão completa para restaurantes,',
        headlineAccent: 'com IA de ponta a ponta',
        subtitle: 'Do DRE ao cardápio, do estoque ao iFood — tudo em um só sistema.',
        modulesTitle: 'Os módulos que fazem diferença para restaurantes',
        modulesSubtitle: 'Cada módulo foi desenhado para resolver problemas reais de quem opera restaurante.',
        highlights: [
          { icon: TrendingUp, title: 'Financeiro & DRE', desc: 'DRE automático com margem por produto, CMV controlado e fluxo de caixa em tempo real. Chega de planilha.' },
          { icon: Package, title: 'Estoque Inteligente', desc: 'Curva ABC, alertas de ruptura e custo automático por insumo. Reduza desperdício e controle o CMV.' },
          { icon: ChefHat, title: 'Cardápio & Fichas Técnicas', desc: 'Precificação automática, custo por prato e simulação de margem. Cada item com rentabilidade clara.' },
          { icon: ShoppingBag, title: 'iFood & KDS', desc: 'Integração nativa com iFood, dashboard de performance e KDS para cozinha — sem comanda de papel.' },
        ],
        benefitsTitle: 'Tudo que um restaurante precisa',
        benefitsLead: 'Da operação ao financeiro — o Granular Food é o sistema completo para restaurantes, bares, lanchonetes e dark kitchens.',
        benefits: [
          'Dashboard iFood completo com KPIs em tempo real',
          'DRE automático — sem montar planilha',
          'Controle de estoque com curva ABC e alertas',
          'Fichas técnicas com custo por prato atualizado',
          'KDS para cozinha — tempos e status em tempo real',
          'Checklists operacionais digitais com foto',
          'Granu | A sua IA no sistema inteiro',
          'Relatórios gerenciais gerados automaticamente',
        ],
        ctaTitle: 'Pronto para transformar sua operação?',
        ctaSubtitle: 'Fale com a gente e veja o impacto nos primeiros 30 dias.',
      }}
    />
  )
}
