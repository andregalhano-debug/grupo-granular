import { useT } from '../../i18n/useT'

export function SecuritySection() {
  const t = useT()
  return (
    <div id="seguranca" className="grid md:grid-cols-3 gap-6 md:gap-8">
      {t.home.security.map((i) => (
        <div key={i.k} className="flex flex-col gap-2">
          <span
            className="text-[11px] tracking-[.2em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {i.k}
          </span>
          <span className="text-[15.5px] leading-relaxed text-[#5f5248]">
            <strong className="text-[#2c241f] font-semibold">{i.t}</strong>
            {i.d}
          </span>
        </div>
      ))}
    </div>
  )
}
