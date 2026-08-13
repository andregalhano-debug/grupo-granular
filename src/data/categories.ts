import type { Category } from '../components/Modules'

export const CATEGORY_LINKS: {
  id: Category
  label: string
  href: string
  desc: string
}[] = [
  { id: 'restaurantes', label: 'Restaurantes', href: '/restaurantes', desc: 'Bares, lanchonetes, fast food e delivery' },
  { id: 'mercados',     label: 'Mercados',     href: '/mercados',     desc: 'Supermercados, atacarejos e atacados' },
  { id: 'farmacias',    label: 'Farmácias',    href: '/farmacias',    desc: 'Redes farmacêuticas e drogarias' },
  { id: 'petshop',      label: 'Pet Shop',     href: '/petshop',      desc: 'Clínicas veterinárias e pet shops' },
  { id: 'shopping',     label: 'Shopping',     href: '/shopping',     desc: 'Brinquedos, floricultura, presenteáveis e utilidades' },
]

export const SEGMENTO_TO_PATH: Record<string, string> = {
  restaurantes: '/restaurantes',
  restaurante: '/restaurantes',
  food: '/restaurantes',
  mercados: '/mercados',
  mercado: '/mercados',
  farmacias: '/farmacias',
  farmacia: '/farmacias',
  farma: '/farmacias',
  petshop: '/petshop',
  pet: '/petshop',
  shopping: '/shopping',
}
