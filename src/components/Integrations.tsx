import { FadeIn } from './FadeIn'
import { Plus } from 'lucide-react'

const integrations = [
  { name: 'iFood', logo: 'https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-0.png' },
  { name: 'Saipos', logo: '/logos/saipos.svg' },
  { name: 'Open Delivery', logo: '/logos/opendelivery.webp' },
  { name: 'Omie', logo: '/logos/omie.png' },
  { name: 'Foozi', logo: '/logos/foozi.svg' },
]

export function Integrations() {
  return (
    <section id="integracoes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p
            className="text-[10px] font-medium text-[#A31631] uppercase tracking-widest mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Ecossistema conectado
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Integrações que potencializam sua operação
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Conecte as ferramentas que você já usa ao ecossistema Granular.
          </p>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {integrations.map((item, i) => (
            <FadeIn key={item.name} delay={i * 100}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-[#9C958A]/20 shadow-sm flex items-center justify-center hover:shadow-lg hover:border-[#A31631]/20 transition-all duration-300 overflow-hidden p-4">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </FadeIn>
          ))}

          {/* Em breve */}
          <FadeIn delay={integrations.length * 100}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed border-[#9C958A]/30 flex items-center justify-center">
              <Plus size={28} className="text-[#9C958A]/40" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
