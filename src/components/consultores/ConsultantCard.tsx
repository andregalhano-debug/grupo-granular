import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Consultant } from '../../data/consultants'
import { consultantCategories } from '../../data/consultants'

interface ConsultantCardProps {
  consultant: Consultant
  onClick: () => void
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function ConsultantCard({ consultant, onClick }: ConsultantCardProps) {
  const cat = consultantCategories.find((c) => c.id === consultant.specialty)

  return (
    <div className="rounded-2xl border border-[#9C958A]/20 bg-white p-6 hover:shadow-lg hover:shadow-[#EA1D2C]/5 hover:border-[#EA1D2C]/20 transition-all h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar iniciais */}
        <div className="w-14 h-14 rounded-full bg-[#EA1D2C]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-[#EA1D2C]">{getInitials(consultant.name)}</span>
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-[#0E0E0F] text-sm">{consultant.name}</h3>
          <p className="text-xs text-[#9C958A] truncate">{consultant.title}</p>
          <p className="text-xs text-[#9C958A]">{consultant.company}</p>
        </div>
      </div>

      {/* Specialty badge */}
      {cat && (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#EA1D2C] bg-[#EA1D2C]/10 px-2.5 py-1 rounded-full w-fit mb-3">
          <cat.icon size={12} />
          {cat.label}
        </span>
      )}

      {/* Experience */}
      <p className="text-xs text-[#9C958A] mb-3">{consultant.experienceYears} anos de experiência</p>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(consultant.rating) ? 'fill-[#f5a623] text-[#f5a623]' : 'text-[#9C958A]/30'}
            />
          ))}
        </div>
        <span className="text-xs text-[#9C958A]">{consultant.rating} ({consultant.reviewCount})</span>
      </div>

      {/* Preço + CTA */}
      <div className="mt-auto pt-4 border-t border-[#0E0E0F]/5 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-[#0E0E0F]">R$ {consultant.hourlyRate}</span>
          <span className="text-xs text-[#9C958A]">/hora</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClick}
            className="text-sm font-medium border border-[#9C958A]/30 text-[#9C958A] hover:border-[#0E0E0F]/30 hover:text-[#0E0E0F] px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Ver perfil
          </button>
          <Link
            to={`/checkout?consultor=${consultant.id}`}
            className="text-sm font-medium bg-[#EA1D2C] hover:bg-[#C8101E] text-white px-4 py-2 rounded-xl transition-colors"
          >
            Contratar
          </Link>
        </div>
      </div>
    </div>
  )
}
