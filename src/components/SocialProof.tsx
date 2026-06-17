import { useEffect, useRef, useState } from 'react'
import type { Category } from './Modules'

interface Props {
  category?: Category
}

function useCountUp(target: number, duration = 1500, active = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return value
}

const metrics = [
  { value: 47, suffix: '+', label: 'avaliações', prefix: '' },
  { value: 15, suffix: '', label: 'agentes de IA', prefix: '' },
  { value: 4.8, suffix: '★', label: 'nota média', prefix: '', isDecimal: true },
  { value: 89, suffix: '', label: 'a partir de R$', prefix: 'R$' },
]

function MetricItem({ value, suffix, label, prefix, isDecimal }: typeof metrics[0] & { isDecimal?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(isDecimal ? value * 10 : value, 1200, active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const display = isDecimal ? (count / 10).toFixed(1) : count

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {prefix}{display}{suffix}
      </div>
      <div className="text-xs text-[#9C958A] mt-0.5">{label}</div>
    </div>
  )
}

export function SocialProof({ category = 'restaurantes' }: Props) {
  const brands = ['Vista Delivery', 'Bistrogonoff', 'Parmegiana Bistro']

  if (category !== 'restaurantes') {
    return <div className="border-t border-[#9C958A]/15" />
  }

  return (
    <section className="border-t border-b border-[#9C958A]/20 bg-[#F7F7F7] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contadores */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mb-8">
          {metrics.map((m) => (
            <MetricItem key={m.label} {...m} />
          ))}
        </div>

        {/* Marcas */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 border-t border-[#9C958A]/15 pt-6">
          <span className="text-xs text-[#9C958A] whitespace-nowrap tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Usado por marcas como</span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-semibold text-[#0E0E0F]/30 tracking-wide uppercase">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
