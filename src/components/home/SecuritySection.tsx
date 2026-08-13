const ITEMS = [
  {
    k: 'Seu dado é seu',
    t: 'Isolamento por empresa',
    d: ' — Row-Level Security no banco: ver dado de outro grupo é impossível por construção.',
  },
  {
    k: 'Alçada humana',
    t: 'Permissão por perfil',
    d: ' — cada resposta respeita o papel de quem pergunta; ação sensível passa pela sua aprovação.',
  },
  {
    k: 'Auditoria',
    t: 'Cada ação registrada',
    d: ' — quem perguntou, o que foi respondido, que dado foi usado.',
  },
]

export function SecuritySection() {
  return (
    <div id="seguranca" className="mt-[clamp(38px,4.5vw,64px)] pt-7 border-t border-[#e4ddd2]">
      <div className="grid md:grid-cols-3 gap-[clamp(18px,2.4vw,32px)]">
        {ITEMS.map((i) => (
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
    </div>
  )
}
