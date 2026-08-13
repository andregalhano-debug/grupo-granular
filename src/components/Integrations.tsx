import { useState, useRef, useEffect } from 'react'
import { X, Handshake } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { integrationsData } from '../data/integrationsData'
import { useCategoryAccent } from '../stores/CategoryContext'
import { useT } from '../i18n/useT'

export function Integrations() {
  const { accent } = useCategoryAccent()
  const t = useT()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const closePanel = () => {
    setOpenIndex(null)
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

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
        closePanel()
        return
      }
      if (detailRef.current && !detailRef.current.contains(target)) {
        const btn = (e.target as HTMLElement).closest('button[data-integration]')
        if (!btn) closePanel()
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
    <section ref={sectionRef} id="integracoes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#e9e4da] border-y border-[#e4ddd2]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 sm:mb-16">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {t.integrations.eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#2c241f] text-balance">
            {t.integrations.sectionTitle}
          </h2>
          <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#5f5248] max-w-[46ch] text-pretty">
            {t.integrations.sectionSubtitle}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 sm:gap-3 bg-white border border-[var(--accent)]/15 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#F2F2F2] flex items-center justify-center p-1.5 flex-shrink-0">
              <img src="/logos/ifood.png" alt="iFood" className="w-full h-full object-contain" />
            </div>
            <p className="text-sm text-[#0E0E0F]">
              {t.integrations.oneClick} <strong>{t.integrations.oneClickBold}</strong> {t.integrations.oneClickSuffix}{' '}
              <span className="text-[var(--accent)] font-semibold">{t.integrations.ifoodPartner}</span>
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {integrationsData.map((item, i) => (
            <FadeIn key={item.name} delay={i * 100}>
              <button
                data-integration
                onClick={() => handleToggle(i)}
                className={`group relative flex flex-col items-center gap-2.5 rounded-2xl border px-4 py-5 transition-all duration-300 cursor-pointer w-28 sm:w-32 ${
                  openIndex === i
                    ? 'border-[var(--accent)] bg-white shadow-lg'
                    : 'border-[#9C958A]/20 bg-white shadow-sm hover:shadow-lg hover:border-[var(--accent-20)]'
                }`}
                style={openIndex === i ? { boxShadow: `0 10px 30px ${accent}1a` } : {}}
              >
                {/* Ícone em quadrado pequeno com bordas arredondadas */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center p-1.5 transition-all"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain"
                    style={{ filter: item.logoFilter }}
                  />
                </div>
                {/* Nome da integração */}
                <span className={`text-[11px] font-semibold text-center leading-tight transition-colors ${
                  openIndex === i
                    ? 'text-[var(--accent)]'
                    : 'text-[#0E0E0F] group-hover:text-[var(--accent)]'
                }`}>
                  {item.name}
                </span>
              </button>
            </FadeIn>
          ))}

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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center overflow-hidden p-1 sm:p-1.5 flex-shrink-0" style={{ backgroundColor: openIntegration.iconBg }}>
                    <img src={openIntegration.logo} alt={openIntegration.name} className="w-full h-full object-contain" style={{ filter: openIntegration.logoFilter }} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#0E0E0F]">{openIntegration.name}</h3>
                      {openIntegration.partner && (
                        <span className="flex items-center gap-1 bg-[var(--accent-10)] text-[var(--accent)] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          <Handshake size={10} />
                          {t.integrations.partner}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#9C958A] line-clamp-2">{openIntegration.desc}</p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#9C958A] hover:text-[#0E0E0F] transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6 sm:p-8">
                {openIntegration.detailPoints ? (
                  <ul className="space-y-2 mb-6">
                    {openIntegration.detailPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#0E0E0F]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#0E0E0F] leading-relaxed mb-6">
                    {openIntegration.detailText}
                  </p>
                )}

                <div className="mb-6">
                  <p
                    className="text-[10px] font-medium text-[#9C958A] uppercase tracking-wider mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t.integrations.integrationFeatures}
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
