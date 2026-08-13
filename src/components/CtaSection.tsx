import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'
import type { Category } from './Modules'

interface Props {
  category?: Category
}

export function CtaSection({}: Props) {
  const t = useT()
  return (
    <section className="py-[clamp(56px,6vw,96px)] px-[clamp(18px,4vw,44px)] bg-[#241d1a]">
      <FadeIn className="text-center max-w-[1240px] mx-auto">
        <h2 className="text-[clamp(30px,4vw,52px)] font-semibold tracking-[-.032em] leading-[1.02] text-[#f0ede8] text-balance">
          {t.cta.title}
        </h2>
        <p className="mt-4 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#bdb0a4] max-w-[60ch] mx-auto text-pretty">
          {t.cta.joinUs}
        </p>
        <div className="flex justify-center mt-[30px]">
          <Link
            to="/agendar-demo"
            className="inline-flex items-center min-h-[52px] px-8 rounded-full bg-[#f0ede8] hover:bg-white text-[#241d1a] font-medium text-base transition-colors"
          >
            {t.cta.startNow}
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
