import { Package, Pill, ShoppingBag, Bot } from 'lucide-react'
import { CategoryLanding } from './CategoryLanding'

export function FarmaciasPage() {
  return (
    <CategoryLanding
      config={{
        category: 'farmacias',
        title: 'Sistema de Gestão para Farmácias | Grupo Granular',
        kicker: 'Para Farmácias & Drogarias',
        headline: 'Gestão completa para farmácias,',
        headlineAccent: 'com IA de ponta a ponta',
        subtitle: 'Estoque, delivery, financeiro e RH em um só sistema — da drogaria independente à rede.',
        modulesTitle: 'Os módulos que fazem diferença para farmácias',
        modulesSubtitle: 'Granular Farma centraliza pedidos, estoque, DRE e equipe — sem planilha no meio.',
        highlights: [
          { icon: ShoppingBag, title: 'iFood & Pedidos', desc: 'Todos os pedidos de delivery em um painel. Status, avaliações e taxa de cancelamento sem alternar entre apps.' },
          { icon: Package, title: 'Estoque Inteligente', desc: 'Saldo em tempo real, alerta antes da ruptura e inventário guiado — incluindo controlados e alto giro.' },
          { icon: Pill, title: 'Monitor de Pedidos', desc: 'Fila de delivery com tempos, prioridades e alerta de atraso. Separação e expedição no ritmo da farmácia.' },
          { icon: Bot, title: 'Agente Granular', desc: 'Pergunte o que vai faltar, o DRE do mês ou o ticket do iFood. Resposta com número e evidência.' },
        ],
        benefitsTitle: 'Tudo que uma farmácia precisa',
        benefitsLead: 'Da rede com várias unidades à drogaria independente — o Granular Farma roda a operação inteira.',
        benefits: [
          'Pedidos de delivery centralizados em um painel',
          'Estoque com alerta de ruptura e validade',
          'DRE automático — sem montar planilha',
          'Monitor de pedidos para separação e expedição',
          'CRM com histórico de clientes',
          'Checklists de abertura e fechamento',
          'Pessoas (RH) com escalas e documentos',
          '15 agentes de IA trabalhando 24/7',
        ],
        ctaTitle: 'Pronto para transformar sua farmácia?',
        ctaSubtitle: 'Fale com a gente e veja o sistema rodando com os seus números.',
      }}
    />
  )
}
