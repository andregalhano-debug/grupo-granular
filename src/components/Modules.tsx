import { useState, useRef, useEffect } from 'react'
import { Smartphone, Shield, BarChart3, X, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { modulesData } from '../data/modulesData'

const badges = [
  { icon: Smartphone, text: 'Versão mobile nativa' },
  { icon: Shield, text: 'Multi-lojas com visões apartadas' },
  { icon: BarChart3, text: 'Benchmark entre unidades' },
]

export function Modules() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (openIndex !== null && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [openIndex])

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const openModule = openIndex !== null ? modulesData[openIndex] : null

  return (
    <section id="modulos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Tudo que sua operação precisa, em um só lugar
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto">
            Módulos integrados que eliminam planilhas e unificam sua gestão.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modulesData.map((mod, i) => (
            <FadeIn key={mod.title} delay={i * 80}>
              <button
                onClick={() => handleToggle(i)}
                className={`group rounded-2xl border p-6 transition-all duration-300 h-full w-full text-left cursor-pointer ${
                  openIndex === i
                    ? 'border-[#A31631] bg-[#A31631]/5 shadow-lg shadow-[#A31631]/10'
                    : 'border-[#9C958A]/20 bg-[#F7F7F7] hover:border-[#A31631]/20 hover:shadow-lg hover:shadow-[#A31631]/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#A31631]/10 flex items-center justify-center mb-4">
                    <mod.icon size={22} className="text-[#A31631]" />
                  </div>
                  <ChevronRight
                    size={18}
                    className={`text-[#9C958A] transition-transform duration-300 mt-1 ${
                      openIndex === i ? 'rotate-90 text-[#A31631]' : 'group-hover:text-[#A31631]'
                    }`}
                  />
                </div>
                <h3 className="font-semibold text-[#0E0E0F] mb-2">{mod.title}</h3>
                <p className="text-sm text-[#9C958A] leading-relaxed">{mod.desc}</p>
              </button>
            </FadeIn>
          ))}
        </div>

        {/* Painel expandido inline — estilo Prosus */}
        {openModule && (
          <div
            ref={detailRef}
            className="mt-6 overflow-hidden animate-in"
            style={{
              animation: 'slideDown 0.4s ease forwards',
            }}
          >
            <div className="rounded-2xl border border-[#A31631]/20 bg-white shadow-xl shadow-[#A31631]/5 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#0E0E0F]/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#A31631]/10 flex items-center justify-center">
                    <openModule.icon size={24} className="text-[#A31631]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0E0E0F]">{openModule.title}</h3>
                    <p className="text-sm text-[#9C958A]">{openModule.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] hover:text-[#0E0E0F] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Lado esquerdo — texto e funcionalidades */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <p className="text-sm text-[#0E0E0F] leading-relaxed mb-6">
                    {openModule.detailText}
                  </p>

                  <div className="mb-6">
                    <p
                      className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-3"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Funcionalidades
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {openModule.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-[#A31631]/10 text-[#A31631] px-3 py-1.5 rounded-full font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/checkout?plano=saas-2"
                    className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors self-start"
                  >
                    Começar Agora
                    <ChevronRight size={16} />
                  </Link>
                </div>

                {/* Lado direito — screenshot */}
                <div className="bg-[#F7F7F7] p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[#0E0E0F]/5">
                  {openModule.screenshot ? (
                    <img
                      src={openModule.screenshot}
                      alt={`Tela do módulo ${openModule.title}`}
                      className="rounded-xl shadow-lg w-full max-w-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightbox(openModule.screenshot)}
                      title="Clique para ampliar"
                    />
                  ) : (
                    <div className="w-full max-w-lg aspect-video rounded-xl bg-[#9C958A]/10 flex items-center justify-center">
                      <div className="text-center">
                        <openModule.icon size={48} className="text-[#9C958A]/30 mx-auto mb-3" />
                        <p className="text-sm text-[#9C958A]">Screenshot em breve</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <FadeIn delay={400} className="flex flex-wrap items-center justify-center gap-6 mt-12">
          {badges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-[#9C958A]">
              <badge.icon size={16} className="text-[#A31631]" />
              {badge.text}
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={500} className="text-center mt-10">
          <Link
            to="/checkout?plano=saas-2"
            className="inline-flex items-center gap-2 bg-[#A31631] hover:bg-[#7A1025] text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            Começar Agora
          </Link>
        </FadeIn>
      </div>

      {/* Lightbox — ampliar screenshot */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setLightbox(null)}
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Screenshot ampliado"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            max-height: 1200px;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
