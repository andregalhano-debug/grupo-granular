import { consultantCategories } from '../../data/consultants'
import type { ConsultantCategory } from '../../data/consultants'

interface CategoryFilterProps {
  selected: ConsultantCategory | null
  onSelect: (cat: ConsultantCategory | null) => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {consultantCategories.map((cat) => {
        const isActive = selected === cat.id
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? 'bg-[#EA1D2C] text-white shadow-sm'
                : 'border border-[#9C958A]/30 text-[#9C958A] hover:border-[#EA1D2C]/30 hover:text-[#0E0E0F]'
            }`}
          >
            <cat.icon size={16} />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
