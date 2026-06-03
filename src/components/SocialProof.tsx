export function SocialProof() {
  const brands = [
    'Vista Delivery',
    'Bistrogonoff',
    'Parmegiana Bistro',
  ]

  return (
    <section className="border-t border-b border-[#9C958A]/20 bg-[#F7F7F7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <span className="text-xs text-[#9C958A] whitespace-nowrap tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Usado por marcas como</span>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {brands.map((brand) => (
            <span key={brand} className="text-sm font-semibold text-[#0E0E0F]/30 tracking-wide uppercase">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
