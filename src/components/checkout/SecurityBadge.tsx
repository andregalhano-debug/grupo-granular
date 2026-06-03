import { Lock, ShieldCheck, Landmark } from 'lucide-react'

const badges = [
  { icon: Lock, text: 'Ambiente seguro' },
  { icon: ShieldCheck, text: 'Dados criptografados' },
  { icon: Landmark, text: 'Pagamento 100% nacional' },
]

export function SecurityBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      {badges.map((b) => (
        <div key={b.text} className="flex items-center gap-1.5 text-xs text-[#9C958A]">
          <b.icon size={14} />
          {b.text}
        </div>
      ))}
    </div>
  )
}
