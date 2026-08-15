const CARDS = [
  {
    k: 'Economize',
    t: 'Funções que o sistema absorve',
    items: ['Analista de relatórios', 'Conciliação manual', 'Planilheiro de compras'],
    foot: 'horas devolvidas, todo dia',
  },
  {
    k: 'Venda mais',
    t: 'Receita que o sistema destrava',
    items: ['Cardápio reposicionado por turno', 'Promoção com ROI medido, sem campanha zumbi', 'Cliente em alerta recuperado antes de sumir'],
    foot: 'o item certo, na vitrine certa',
  },
  {
    k: 'Compre melhor',
    t: 'Custo que o sistema corta',
    items: ['Lista de compras pela previsão, não pelo susto', 'Zero ruptura = zero venda perdida', 'CMV real e capital parado à mostra'],
    foot: 'margem defendida na compra',
  },
]

export function GanhosSection() {
  return (
    <section id="ganhos" className="bg-[#e9e4da] px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)]">
      <div className="max-w-[1240px] mx-auto">
        <div className="section-head">
        <p
          className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          O que você ganha
        </p>
        <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#2c241f] text-balance">
          O sistema que se paga.
          <br />
          E ainda, sobra.
        </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-[clamp(16px,2vw,24px)] mt-[clamp(32px,4vw,52px)]">
          {CARDS.map((c) => (
            <div
              key={c.k}
              className="bg-[#faf9f7] border border-[#e4ddd2] rounded-2xl p-[clamp(22px,2.4vw,32px)] flex flex-col gap-3.5"
            >
              <span
                className="text-[11px] tracking-[.2em] uppercase text-[#7c2d3e]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {c.k}
              </span>
              <span className="text-[21px] leading-snug tracking-[-.02em] font-semibold text-[#2c241f]">{c.t}</span>
              <div className="flex flex-col gap-2 text-[15.5px] leading-snug text-[#5f5248]">
                {c.items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
              <span
                className="mt-auto pt-2.5 text-[11.5px] tracking-[.1em] uppercase text-[#6b5d52]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {c.foot}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
