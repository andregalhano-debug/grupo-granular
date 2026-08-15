import { useT } from '../i18n/useT'
import type { Category } from './Modules'

interface Props {
  category?: Category
}

export function SocialProof({ category = 'restaurantes' }: Props) {
  const brands = ['Vista Delivery', 'Bistrogonoff', 'Parmegiana Bistro']
  const t = useT()

  if (category !== 'restaurantes') {
    return <div className="border-t border-[#9C958A]/15" />
  }

  return (
    <section className="border-y border-[#e4ddd2] bg-[#e9e4da] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <span className="text-xs text-[#8a7a6e] whitespace-nowrap tracking-widest uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{t.socialProof.usedBy}</span>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {brands.map((brand) => (
            <span key={brand} className="text-sm font-semibold text-[#5f5248] tracking-wide uppercase">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
