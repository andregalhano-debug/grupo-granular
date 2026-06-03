import { useState } from 'react'
import type { Consultant } from '../../data/consultants'
import { FadeIn } from '../FadeIn'
import { ConsultantCard } from './ConsultantCard'
import { ConsultantModal } from './ConsultantModal'

interface ConsultantGridProps {
  consultants: Consultant[]
}

export function ConsultantGrid({ consultants }: ConsultantGridProps) {
  const [selected, setSelected] = useState<Consultant | null>(null)

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultants.map((c, i) => (
          <FadeIn key={c.id} delay={i * 80}>
            <ConsultantCard consultant={c} onClick={() => setSelected(c)} />
          </FadeIn>
        ))}
      </div>

      {consultants.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#9C958A]">Nenhum consultor encontrado nesta categoria.</p>
        </div>
      )}

      <ConsultantModal consultant={selected} onClose={() => setSelected(null)} />
    </>
  )
}
