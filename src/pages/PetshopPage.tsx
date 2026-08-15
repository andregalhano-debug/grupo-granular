import { Package, PawPrint, ShoppingBag, Heart } from 'lucide-react'
import { CategoryLanding } from './CategoryLanding'

export function PetshopPage() {
  return (
    <CategoryLanding
      config={{
        category: 'petshop',
        title: 'Sistema de Gestão para Pet Shops | Grupo Granular',
        kicker: 'Para Pet Shops & Clínicas Veterinárias',
        headline: 'Gestão completa para pet shops e clínicas,',
        headlineAccent: 'com IA de ponta a ponta',
        subtitle: 'Produtos, banho, tosa, delivery e financeiro em um só sistema — da clínica completa ao pet shop de rua.',
        modulesTitle: 'Os módulos que fazem diferença para pet shops',
        modulesSubtitle: 'Granular PET foi desenhado para a rotina de pet shops e clínicas veterinárias.',
        highlights: [
          { icon: ShoppingBag, title: 'iFood & Pedidos', desc: 'Ração, acessórios e farmácia pet no mesmo painel de delivery. Status e métricas sem alternar de app.' },
          { icon: Package, title: 'Estoque Inteligente', desc: 'Giro de ração, medicamentos e acessórios. Alerta antes de faltar o SKU que o cliente já compra todo mês.' },
          { icon: PawPrint, title: 'CRM & Recorrência', desc: 'Tutor, pet e histórico de compra no mesmo cadastro. Recupera quem parou de vir no banho e tosa.' },
          { icon: Heart, title: 'Pessoas & Rotina', desc: 'Escala de tosadores e atendentes, checklist de abertura e DRE da loja — sem planilha.' },
        ],
        benefitsTitle: 'Tudo que um pet shop precisa',
        benefitsLead: 'Da clínica veterinária completa ao pet shop focado em produtos, banho e tosa — o Granular PET roda a operação.',
        benefits: [
          'Pedidos de delivery centralizados em um painel',
          'Estoque de ração, acessórios e medicamentos',
          'DRE automático — sem montar planilha',
          'CRM de tutores e recorrência de serviços',
          'Checklists de abertura, fechamento e higiene',
          'Pessoas (RH) com escalas e documentos',
          'Monitor de pedidos para expedição',
          'Granu | A sua IA no sistema inteiro',
        ],
        ctaTitle: 'Pronto para transformar seu pet shop?',
        ctaSubtitle: 'Fale com a gente e veja o sistema rodando com os seus números.',
      }}
    />
  )
}
