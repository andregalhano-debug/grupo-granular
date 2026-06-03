import { useEffect } from 'react'
import { X, Star, Clock, MapPin } from 'lucide-react'
import type { Consultant } from '../../data/consultants'

interface ConsultantModalProps {
  consultant: Consultant | null
  onClose: () => void
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function ConsultantModal({ consultant, onClose }: ConsultantModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!consultant) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer z-10">
          <X size={20} />
        </button>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-[#EA1D2C]">{getInitials(consultant.name)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0E0E0F]">{consultant.name}</h2>
              <p className="text-sm text-[#9C958A]">{consultant.title}</p>
              <p className="text-sm text-[#9C958A]">{consultant.company}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(consultant.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'} />
                  ))}
                  <span className="text-xs text-[#9C958A] ml-1">{consultant.rating} ({consultant.reviewCount} avaliações)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preço + Disponibilidade */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-xl">
              <span className="text-lg font-bold text-[#0E0E0F]">R$ {consultant.hourlyRate}</span>
              <span className="text-xs text-[#9C958A]">/hora</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-xl text-sm text-[#9C958A]">
              <Clock size={14} />
              {consultant.availability.join(' • ')}
            </div>
            <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-xl text-sm text-[#9C958A]">
              <MapPin size={14} />
              {consultant.experienceYears} anos de experiência
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-sm font-semibold text-[#0E0E0F] mb-2">Sobre</h3>
            <p className="text-sm text-[#9C958A] leading-relaxed">{consultant.bio}</p>
          </div>

          {/* Expertises */}
          <div>
            <h3 className="text-sm font-semibold text-[#0E0E0F] mb-3">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {consultant.expertises.map((exp) => (
                <span key={exp} className="text-xs bg-[#EA1D2C]/10 text-[#EA1D2C] px-3 py-1.5 rounded-full font-medium">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {consultant.reviews.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#0E0E0F] mb-3">Avaliações</h3>
              <div className="space-y-3">
                {consultant.reviews.map((review) => (
                  <div key={review.author} className="rounded-xl bg-[#F7F7F7] p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'} />
                      ))}
                    </div>
                    <p className="text-sm text-[#9C958A] mb-2">"{review.text}"</p>
                    <p className="text-xs text-[#0E0E0F] font-medium">{review.author} — <span className="text-[#9C958A] font-normal">{review.role}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <a
            href={`https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20sessão%20com%20${encodeURIComponent(consultant.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#EA1D2C] hover:bg-[#C8101E] text-white font-medium py-4 rounded-xl text-base transition-colors"
          >
            Agendar sessão — R$ {consultant.hourlyRate}/hora
          </a>
        </div>
      </div>
    </div>
  )
}
