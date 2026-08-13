import { Gift, Flower2, Package, Home } from 'lucide-react'
import { CategoryLanding } from './CategoryLanding'

export function ShoppingPage() {
  return (
    <CategoryLanding
      config={{
        category: 'shopping',
        title: 'Sistema de Gestão para Shopping | Grupo Granular',
        kicker: 'Para Shopping · Brinquedos, Floricultura e Presentes',
        headline: 'Gestão completa para lojas de shopping,',
        headlineAccent: 'com IA de ponta a ponta',
        subtitle: 'Brinquedos, floricultura, presenteáveis e utilidades domésticas — estoque, vendas, delivery e financeiro em um só sistema.',
        modulesTitle: 'Os módulos que fazem diferença para o shopping',
        modulesSubtitle: 'Granular Shopping fala a língua da loja: mix longo, validade curta e datas comemorativas.',
        highlights: [
          { icon: Gift, title: 'Brinquedos', desc: 'Mix de brinquedos com curva ABC, ruptura de gôndola e giro por faixa etária. Saiba o que para na prateleira e o que falta no fim de semana.' },
          { icon: Flower2, title: 'Floricultura', desc: 'Validade curta, perda e reposição sob controle. Alertas antes da flor murchar e do pedido de casamento ficar sem estoque.' },
          { icon: Package, title: 'Presenteáveis', desc: 'Cestas, kits e sazonais (Dia das Mães, Natal) com precificação e campanha medidas. CRM para quem compra presente o ano inteiro.' },
          { icon: Home, title: 'Utilidades domésticas', desc: 'Mix longo, SKU demais, margem escondida. DRE por família de produto e reposição pela previsão, não pelo susto.' },
        ],
        benefitsTitle: 'Tudo que a loja de shopping precisa',
        benefitsLead: 'Da loja de brinquedos à floricultura, do presenteável às utilidades domésticas — o Granular Shopping roda a operação inteira.',
        benefits: [
          'Controle de estoque por categoria da loja (brinquedos, flores, presentes, utilidades)',
          'Validade e perda na floricultura e perecíveis da loja',
          'Precificação e kits presenteáveis com margem por item',
          'iFood e delivery para quem vende no shopping e no app',
          'DRE automático — sem planilha no fechamento',
          'Checklists de abertura e fechamento da loja',
          'CRM de clientes recorrentes (aniversário e datas comemorativas)',
          '15 agentes de IA trabalhando 24/7',
        ],
        ctaTitle: 'Pronto para transformar sua loja?',
        ctaSubtitle: 'Fale com a gente e veja o sistema rodando com os seus números — brinquedos, flores, presentes e utilidades no mesmo painel.',
      }}
    />
  )
}
