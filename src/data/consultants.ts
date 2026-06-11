import type { LucideIcon } from 'lucide-react'
import { Settings, TrendingUp, Megaphone, UtensilsCrossed, ShoppingBag, Users, Package, BarChart2, Smartphone, Star, Store, Pill, PawPrint, Building2, MoreHorizontal } from 'lucide-react'

export type ConsultantCategory = 'operacao' | 'financeiro' | 'marketing' | 'cardapio' | 'marketplaces' | 'rh' | 'estoque' | 'precificacao' | 'atendimento' | 'tecnologia' | 'franquias' | 'mercado' | 'farmacia' | 'petshop' | 'outros'

export interface Review {
  author: string
  role: string
  text: string
  rating: number
}

export interface TimeSlot {
  date: string
  time: string
  available: boolean
}

export interface Consultant {
  id: string
  name: string
  googleEmail: string
  specialty: ConsultantCategory
  title: string
  company: string
  bio: string
  experienceYears: number
  rating: number
  reviewCount: number
  hourlyRate: number
  expertises: string[]
  availability: string[]
  reviews: Review[]
  linkedin?: string
  slots: TimeSlot[]
}

export const consultantCategories: { id: ConsultantCategory | null; label: string; icon: LucideIcon }[] = [
  { id: null, label: 'Todos', icon: Settings },
  { id: 'operacao', label: 'Operação', icon: Settings },
  { id: 'financeiro', label: 'Financeiro', icon: TrendingUp },
  { id: 'marketing', label: 'Marketing Digital', icon: Megaphone },
  { id: 'cardapio', label: 'Cardápio & Menu Engineering', icon: UtensilsCrossed },
  { id: 'marketplaces', label: 'Marketplaces (iFood, 99, Keeta, Rappi, outros)', icon: ShoppingBag },
  { id: 'rh', label: 'Recursos Humanos', icon: Users },
  { id: 'estoque', label: 'Estoque & CMV', icon: Package },
  { id: 'precificacao', label: 'Precificação & Markup', icon: BarChart2 },
  { id: 'atendimento', label: 'Atendimento ao Cliente', icon: Star },
  { id: 'tecnologia', label: 'Tecnologia & Sistemas', icon: Smartphone },
  { id: 'franquias', label: 'Gestão de Franquias', icon: Building2 },
  { id: 'mercado', label: 'Mercado, Atacado e Atacarejo', icon: Store },
  { id: 'farmacia', label: 'Farmácia e Drogaria', icon: Pill },
  { id: 'petshop', label: 'Pet Shop e Clínica Veterinária', icon: PawPrint },
  { id: 'outros', label: 'Outros', icon: MoreHorizontal },
]

/** Segmentos de mercado — campo "Categoria" no formulário de candidatura */
export const segmentOptions: { id: string; label: string }[] = [
  { id: 'restaurantes', label: 'Restaurantes & Delivery' },
  { id: 'mercados', label: 'Mercado, Atacado e Atacarejo' },
  { id: 'farmacias', label: 'Farmácia e Drogaria' },
  { id: 'petshop', label: 'Pet Shop e Clínica Veterinária' },
  { id: 'franquias', label: 'Gestão de Franquias' },
  { id: 'outros', label: 'Outros' },
]

/** Especialidades funcionais — campo "Especialidade" no formulário de candidatura */
export const specialtyOptions: { id: string; label: string }[] = [
  { id: 'operacao', label: 'Operação' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'marketing', label: 'Marketing Digital' },
  { id: 'cardapio', label: 'Cardápio & Menu Engineering' },
  { id: 'marketplaces', label: 'Marketplaces (iFood, 99, Keeta, Rappi, outros)' },
  { id: 'rh', label: 'Recursos Humanos' },
  { id: 'estoque', label: 'Estoque & CMV' },
  { id: 'precificacao', label: 'Precificação & Markup' },
  { id: 'atendimento', label: 'Atendimento ao Cliente' },
  { id: 'tecnologia', label: 'Tecnologia & Sistemas' },
  { id: 'outros', label: 'Outros' },
]

// Gera slots simulados para os próximos 5 dias úteis
function generateSlots(): TimeSlot[] {
  const slots: TimeSlot[] = []
  const now = new Date()
  let daysAdded = 0
  const d = new Date(now)
  while (daysAdded < 5) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const dateStr = d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
    for (const time of ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']) {
      slots.push({ date: dateStr, time, available: Math.random() > 0.35 })
    }
    daysAdded++
  }
  return slots
}

export const consultants: Consultant[] = [
  {
    id: 'c1',
    name: 'Rafael Mendes',
    googleEmail: 'rafael.mendes@gmail.com',
    specialty: 'operacao',
    title: 'Especialista em Operações de Delivery',
    company: 'Ex-Gerente iFood',
    bio: 'Mais de 8 anos otimizando operações de delivery em grandes redes. Especialista em redução de tempo de preparo, logística de entrega e processos de cozinha. Já ajudou +50 restaurantes a reduzirem custos operacionais em até 30%.',
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 47,
    hourlyRate: 350,
    expertises: ['Logística de entrega', 'KDS e fluxo de cozinha', 'Redução de desperdício', 'SLA de pedidos', 'Gestão de equipe operacional'],
    availability: ['Seg-Sex', '09h-18h'],
    reviews: [
      { author: 'Carlos M.', role: 'Dono de Dark Kitchen', text: 'O Rafael transformou nossa operação. Reduzimos o tempo médio de preparo em 40%.', rating: 5 },
      { author: 'Patrícia R.', role: 'Gerente de Rede', text: 'Consultoria muito prática e focada em resultados. Recomendo demais.', rating: 5 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c2',
    name: 'Camila Santos',
    googleEmail: 'camila.santos@gmail.com',
    specialty: 'financeiro',
    title: 'Consultora Financeira para Food Service',
    company: 'Ex-Controller Grupo Habib\'s',
    bio: 'Especialista em DRE, CMV e gestão financeira para restaurantes. Experiência em redes com faturamento acima de R$ 5M/mês. Foco em rentabilidade e controle de custos.',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 38,
    hourlyRate: 400,
    expertises: ['DRE e análise financeira', 'Controle de CMV', 'Precificação de cardápio', 'Conciliação bancária', 'Planejamento tributário'],
    availability: ['Seg-Sex', '08h-17h'],
    reviews: [
      { author: 'Roberto A.', role: 'CEO de Rede', text: 'A Camila nos ajudou a identificar onde estávamos perdendo dinheiro. CMV caiu 7 pontos.', rating: 5 },
      { author: 'Juliana F.', role: 'Proprietária', text: 'Finalmente entendi meus números. Consultoria clara e objetiva.', rating: 4 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c3',
    name: 'Lucas Oliveira',
    googleEmail: 'lucas.oliveira.mkt@gmail.com',
    specialty: 'marketing',
    title: 'Estrategista de Marketing para Delivery',
    company: 'Ex-Head de Marketing Rappi',
    bio: 'Especialista em growth marketing para delivery. Domina estratégias de aquisição, retenção e engajamento em marketplaces. Já gerenciou campanhas com ROI de 12x.',
    experienceYears: 6,
    rating: 4.7,
    reviewCount: 29,
    hourlyRate: 300,
    expertises: ['Marketing no iFood', 'Social selling', 'Gestão de avaliações', 'Campanhas de aquisição', 'Programa de fidelidade'],
    availability: ['Seg-Sáb', '10h-19h'],
    reviews: [
      { author: 'Ana P.', role: 'Dona de Restaurante', text: 'Nossas vendas no iFood triplicaram em 2 meses seguindo as estratégias do Lucas.', rating: 5 },
      { author: 'Marcos L.', role: 'Sócio-fundador', text: 'Muito conhecimento prático sobre marketplaces. Vale cada centavo.', rating: 5 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c4',
    name: 'Fernanda Costa',
    googleEmail: 'fernanda.costa.chef@gmail.com',
    specialty: 'cardapio',
    title: 'Especialista em Engenharia de Cardápio',
    company: 'Chef e Consultora Independente',
    bio: 'Chef formada pelo Senac com MBA em Gestão de Negócios. Especialista em engenharia de cardápio, fichas técnicas e posicionamento de produtos. Foco em aumentar ticket médio e margem.',
    experienceYears: 10,
    rating: 5.0,
    reviewCount: 52,
    hourlyRate: 280,
    expertises: ['Engenharia de cardápio', 'Fichas técnicas', 'Fotografia de alimentos', 'Posicionamento de preço', 'Menu digital'],
    availability: ['Seg-Sex', '09h-17h'],
    reviews: [
      { author: 'Diego S.', role: 'Dono de Hamburgueria', text: 'A Fernanda reestruturou nosso cardápio e o ticket médio subiu 35%. Incrível.', rating: 5 },
      { author: 'Luana M.', role: 'Gerente', text: 'Trabalho impecável nas fichas técnicas. Agora temos controle total dos custos.', rating: 5 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c5',
    name: 'Thiago Barbosa',
    googleEmail: 'thiago.barbosa.ifood@gmail.com',
    specialty: 'marketplaces',
    title: 'Consultor Especializado em iFood',
    company: 'Ex-Account Manager iFood',
    bio: 'Trabalhou 5 anos dentro do iFood como account manager. Conhece profundamente o algoritmo, sistema de rankeamento e estratégias para maximizar visibilidade e vendas na plataforma.',
    experienceYears: 7,
    rating: 4.9,
    reviewCount: 63,
    hourlyRate: 320,
    expertises: ['Algoritmo iFood', 'Rankeamento e visibilidade', 'Promoções e cupons', 'Super Restaurante', 'Análise de métricas iFood'],
    availability: ['Seg-Sex', '08h-18h'],
    reviews: [
      { author: 'Ricardo T.', role: 'Proprietário', text: 'O Thiago conhece o iFood por dentro. Saímos da página 3 para o top 10 em 1 mês.', rating: 5 },
      { author: 'Sabrina K.', role: 'Gerente de Delivery', text: 'Estratégias certeiras. Nossas avaliações subiram de 4.2 para 4.8.', rating: 5 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c6',
    name: 'Mariana Alves',
    googleEmail: 'mariana.alves.rh@gmail.com',
    specialty: 'rh',
    title: 'Consultora de RH para Food Service',
    company: 'Ex-RH Grupo Madero',
    bio: 'Especialista em gestão de pessoas para o setor de alimentação. Experiência em recrutamento, treinamento, planos de carreira e retenção de talentos em ambientes de alta rotatividade.',
    experienceYears: 9,
    rating: 4.6,
    reviewCount: 24,
    hourlyRate: 250,
    expertises: ['Recrutamento para cozinha', 'Treinamento operacional', 'Plano de carreira', 'Gestão de turnos', 'Redução de turnover'],
    availability: ['Seg-Sex', '09h-18h'],
    reviews: [
      { author: 'Felipe G.', role: 'Dono de Rede', text: 'Nosso turnover caiu 60% depois da consultoria da Mariana. Time muito mais estável.', rating: 5 },
      { author: 'Amanda R.', role: 'Gerente de Operações', text: 'Ótima visão de processos de RH adaptados ao food service.', rating: 4 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c7',
    name: 'Pedro Henrique Lima',
    googleEmail: 'pedro.lima.ops@gmail.com',
    specialty: 'operacao',
    title: 'Consultor de Expansão e Multi-lojas',
    company: 'Ex-Diretor de Operações Subway BR',
    bio: 'Especialista em expansão de redes e padronização de processos multi-unidades. Já liderou a abertura de +30 unidades de food service com processos replicáveis.',
    experienceYears: 15,
    rating: 4.8,
    reviewCount: 31,
    hourlyRate: 500,
    expertises: ['Expansão de rede', 'Padronização de processos', 'Manuais operacionais', 'Benchmark entre unidades', 'Treinamento de gestores'],
    availability: ['Seg-Qui', '08h-16h'],
    reviews: [
      { author: 'Eduardo V.', role: 'CEO', text: 'Consultoria essencial para quem quer crescer. O Pedro nos ajudou a abrir 5 novas unidades sem perder qualidade.', rating: 5 },
    ],
    slots: generateSlots(),
  },
  {
    id: 'c8',
    name: 'Isabela Rocha',
    googleEmail: 'isabela.rocha.brand@gmail.com',
    specialty: 'marketing',
    title: 'Especialista em Branding para Delivery',
    company: 'Fundadora da Agência FoodBrand',
    bio: 'Especialista em posicionamento de marca e identidade visual para restaurantes e dark kitchens. Ajuda operações a se destacarem nos marketplaces com branding estratégico.',
    experienceYears: 5,
    rating: 4.7,
    reviewCount: 19,
    hourlyRate: 220,
    expertises: ['Branding de restaurante', 'Identidade visual', 'Embalagens', 'Experiência do cliente', 'Redes sociais'],
    availability: ['Seg-Sex', '10h-18h'],
    reviews: [
      { author: 'Gustavo N.', role: 'Dono de Dark Kitchen', text: 'A Isabela transformou nossa marca. As embalagens e o perfil no iFood ficaram profissionais.', rating: 5 },
      { author: 'Letícia B.', role: 'Sócia', text: 'Excelente trabalho de branding. Os clientes elogiam muito a nova identidade.', rating: 4 },
    ],
    slots: generateSlots(),
  },
]

export function getConsultantById(id: string): Consultant | undefined {
  return consultants.find((c) => c.id === id)
}
