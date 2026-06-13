import { FadeIn } from './FadeIn'
import type { Category } from './Modules'

type MercadoSub = 'atacarejo' | 'supermercado' | 'atacado'

interface Props {
  category: Category
  setCategory: (c: Category) => void
  mercadoSub: MercadoSub
  setMercadoSub: (s: MercadoSub) => void
}

const categories: {
  id: Category
  emoji: string
  label: string
  description: string
  comingSoon?: boolean
}[] = [
  {
    id: 'restaurantes',
    emoji: '🍽️',
    label: 'Restaurantes',
    description: 'Bares, lanchonetes, fast food, delivery',
  },
  {
    id: 'mercados',
    emoji: '🛒',
    label: 'Mercados',
    description: 'Supermercados, atacarejos e atacados',
  },
  {
    id: 'farmacias',
    emoji: '💊',
    label: 'Farmácias',
    description: 'Redes farmacêuticas e drogarias',
    comingSoon: true,
  },
  {
    id: 'petshop',
    emoji: '🐾',
    label: 'Pet Shops',
    description: 'Clínicas veterinárias e pet shops',
    comingSoon: true,
  },
]

const mercadoSubs: { id: MercadoSub; label: string }[] = [
  { id: 'atacarejo', label: 'Atacarejo' },
  { id: 'supermercado', label: 'Supermercado' },
  { id: 'atacado', label: 'Atacado' },
]

export function CategorySelector({ category, setCategory, mercadoSub, setMercadoSub }: Props) {
  const handleCategoryClick = (id: Category, comingSoon?: boolean) => {
    if (comingSoon) {
      setCategory(id)
      return
    }
    setCategory(id)
  }

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] border-b border-[#9C958A]/10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10">
          <p
            className="text-[10px] font-medium text-[#A31631] uppercase tracking-widest mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Escolha seu segmento
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E0F]">
            Para qual operação você quer ver a solução?
          </h2>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isActive = category === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id, cat.comingSoon)}
                  className={`relative group rounded-2xl border-2 p-5 sm:p-6 text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-[#A31631] bg-white shadow-lg shadow-[#A31631]/10'
                      : cat.comingSoon
                        ? 'border-[#9C958A]/15 bg-white/60 opacity-70 hover:opacity-90'
                        : 'border-[#9C958A]/20 bg-white hover:border-[#A31631]/30 hover:shadow-md'
                  }`}
                >
                  {cat.comingSoon && (
                    <span className="absolute -top-2.5 right-3 text-[9px] font-bold uppercase tracking-wider bg-[#9C958A] text-white px-2.5 py-0.5 rounded-full">
                      Em breve
                    </span>
                  )}
                  <div className="text-2xl sm:text-3xl mb-3">{cat.emoji}</div>
                  <p className={`text-sm font-bold mb-1 ${isActive ? 'text-[#A31631]' : 'text-[#0E0E0F]'}`}>
                    {cat.label}
                  </p>
                  <p className="text-xs text-[#9C958A] leading-snug">{cat.description}</p>
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Subcategorias de Mercados */}
        {category === 'mercados' && (
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-xs text-[#9C958A] mr-1">Subcategoria:</span>
              {mercadoSubs.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setMercadoSub(sub.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    mercadoSub === sub.id
                      ? 'border-[#A31631] bg-[#A31631] text-white'
                      : 'border-[#9C958A]/25 bg-white text-[#9C958A] hover:border-[#A31631]/40 hover:text-[#A31631]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
