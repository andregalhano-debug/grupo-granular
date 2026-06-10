import { useState, useRef, useEffect } from 'react'
import { X, Plus, Info, Handshake } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { integrationsData } from '../data/integrationsData'
import { useCategoryAccent } from '../stores/CategoryContext'

export function Integrations() {
  const { accent } = useCategoryAccent()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (openIndex !== null && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [openIndex])

  // Fechar ao clicar fora do painel
  useEffect(() => {
    if (openIndex === null) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (sectionRef.current && !sectionRef.current.contains(target)) {
        setOpenIndex(null)
        return
      }
      if (detailRef.current && !detailRef.current.contains(target)) {
        // Verificar se clicou em um dos botões de integração (não fechar nesse caso)
        const btn = (e.target as HTMLElement).closest('button[data-integration]')
        if (!btn) setOpenIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openIndex])

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const openIntegration = openIndex !== null ? integrationsData[openIndex] : null

  return (
    <section ref={sectionRef} id="integracoes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p
            className="text-[10px] font-medium text-[var(--accent)] uppercase tracking-widest mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Ecossistema conectado
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Integrações que potencializam sua operação
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Conecte as ferramentas que você já usa ao ecossistema Granular.
          </p>
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white border border-[var(--accent)]/15 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-sm">
            <img
              src="https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-0.png"
              alt="iFood"
              className="w-6 h-6 object-contain"
            />
            <p className="text-sm text-[#0E0E0F]">
              Ativação com <strong>1 clique</strong> direto no{' '}
              <span className="text-[var(--accent)] font-semibold">Portal do Parceiro iFood</span>
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-6">
          {integrationsData.map((item, i) => (
            <FadeIn key={item.name} delay={i * 100}>
              <button
                data-integration
                onClick={() => handleToggle(i)}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-300 cursor-pointer w-24 h-24 sm:w-28 sm:h-28 ${
                  openIndex === i
                    ? 'border-[var(--accent)] bg-white shadow-lg'
                    : 'border-[#9C958A]/20 bg-white shadow-sm hover:shadow-lg hover:border-[var(--accent-20)]'
                }`}
                style={openIndex === i ? { boxShadow: `0 10px 30px ${accent}1a` } : {}}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  loading="lazy"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <span className={`flex items-center gap-1 text-[10px] mt-2 font-medium transition-colors ${
                  openIndex === i ? 'text-[var(--accent)]' : 'text-[#9C958A] group-hover:text-[var(--accent)]'
                }`}>
                  <Info size={10} />
                  Saiba mais
                </span>
              </button>
            </FadeIn>
          ))}

          {/* Em breve */}
          <FadeIn delay={integrationsData.length * 100}>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed border-[#9C958A]/30 flex items-center justify-center">
              <Plus size={28} className="text-[#9C958A]/40" />
            </div>
          </FadeIn>
        </div>

        {/* Painel expandido inline */}
        {openIntegration && (
          <div
            ref={detailRef}
            className="mt-6 overflow-hidden"
            style={{ animation: 'integrationSlideDown 0.4s ease forwards' }}
          >
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-white overflow-hidden" style={{ boxShadow: `0 20px 60px ${accent}1a` }}>
              {/* Header */}
              <div className="flex items-start justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-[#0E0E0F]/5 gap-3">
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F7F7F7] flex items-center justify-center overflow-hidden p-1.5 sm:p-2 flex-shrink-0">
                    <img src={openIntegration.logo} alt={openIntegration.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#0E0E0F]">{openIntegration.name}</h3>
                      {openIntegration.partner && (
                        <span className="flex items-center gap-1 bg-[var(--accent-10)] text-[var(--accent)] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <Handshake size={10} />
                          Parceiro
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#9C958A] line-clamp-2">{openIntegration.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] hover:text-[#0E0E0F] transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6 sm:p-8">
                <p className="text-sm text-[#0E0E0F] leading-relaxed mb-6">
                  {openIntegration.detailText}
                </p>

                <div className="mb-6">
                  <p
                    className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Recursos da integração
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {openIntegration.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[var(--accent-10)] text-[var(--accent)] px-3 py-1.5 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes integrationSlideDown {
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
      `}</style>
    </section>
  )
}
