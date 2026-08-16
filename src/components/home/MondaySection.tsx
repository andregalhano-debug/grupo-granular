import { useT } from '../../i18n/useT'

export function MondaySection() {
  const t = useT()
  return (
    <section className="bg-[#241d1a] text-[#f0ede8] px-[clamp(18px,4vw,44px)] py-[clamp(48px,5.5vw,80px)]">
      <div className="max-w-[1240px] mx-auto">
        <p
          className="text-[11.5px] tracking-[.24em] uppercase text-[#c9a27a]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {t.home.mondayEyebrow}
        </p>
        <div className="grid md:grid-cols-3 gap-[clamp(18px,2.5vw,32px)] mt-7">
          {t.home.monday.map((item) => (
            <div key={item.before} className="flex flex-col gap-3">
              <span
                className="text-[12.5px] tracking-[.12em] uppercase text-[#8d7d70] line-through"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {item.before}
              </span>
              <span className="text-[clamp(19px,1.9vw,24px)] leading-snug tracking-[-.02em] text-[#f0ede8]">
                {item.after}{' '}
                <strong className="font-semibold text-[#ecd9cd]">{item.accent}</strong>
                {item.suffix ?? '.'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
