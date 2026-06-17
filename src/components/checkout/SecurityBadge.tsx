import { Lock, ShieldCheck, Landmark } from 'lucide-react'
import { useT } from '../../i18n/useT'

export function SecurityBadge() {
  const { checkout: { security: s } } = useT()

  const badges = [
    { icon: ShieldCheck, title: s.badge1Title, desc: s.badge1Desc },
    { icon: Lock, title: s.badge2Title, desc: s.badge2Desc },
    { icon: Landmark, title: s.badge3Title, desc: s.badge3Desc },
  ]

  return (
    <div className="rounded-2xl border border-[#0E0E0F]/8 bg-[#F7F7F7] px-5 py-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
          <Lock size={14} className="text-white" />
        </div>
        <p className="text-sm font-semibold text-[#0E0E0F]">{s.title}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-white border border-[#0E0E0F]/6">
            <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
              <b.icon size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#0E0E0F] leading-tight">{b.title}</p>
              <p className="text-[10px] text-[#9C958A] leading-tight mt-0.5">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
