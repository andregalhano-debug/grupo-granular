import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'
import type { Category } from './Modules'

interface Props {
  category?: Category
}

export function CtaSection({ category }: Props) {
  const t = useT()
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0E0E0F]">
      <FadeIn className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F0] mb-6">
          {t.cta.title}
        </h2>
        <p className="text-[#FAF7F0]/50 text-base sm:text-lg mb-10">
          {t.cta.joinUs}
        </p>
        <Link
          to={`/checkout?plano=saas-2&segmento=${category || 'restaurantes'}`}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#F7F7F7] text-[var(--accent)] font-medium px-8 py-4 rounded-xl text-base transition-colors"
        >
          {t.cta.startNow}
        </Link>
      </FadeIn>
    </section>
  )
}
