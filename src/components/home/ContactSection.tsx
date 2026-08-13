import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIAS = [
  { value: 'Restaurante', label: 'Food' },
  { value: 'Farmácia', label: 'Farma' },
  { value: 'Mercado', label: 'Mercado' },
  { value: 'Pet Shop', label: 'Pet' },
  { value: 'Shopping', label: 'Shopping' },
  { value: 'Outros', label: 'Outro' },
]

const STEPS = [
  {
    n: '01',
    t: 'Você traz uma loja ou a rede inteira.',
    d: 'A conversa acontece sobre a sua realidade, não sobre um caso genérico.',
  },
  {
    n: '02',
    t: 'A Granu responde na hora.',
    d: 'Repasse, ruptura, cardápio — você pergunta e vê o sistema trabalhar ao vivo.',
  },
  {
    n: '03',
    t: 'Você sai com a conta.',
    d: 'Quanto o Granular se paga na sua operação — e em quanto tempo.',
  },
]

function maskWhatsApp(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    const nome = String(data.get('nome') || '').trim()
    const email = String(data.get('email') || '').trim()
    const empresa = String(data.get('empresa') || '').trim()
    const segmento = String(data.get('categoria') || '').trim()
    const notas = String(data.get('msg') || '').trim()
    const wa = whatsapp.replace(/\D/g, '')

    if (!nome || !email || !empresa || wa.length < 10) {
      setError('Preencha nome, e-mail, empresa e um WhatsApp válido.')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: 'novo-agendamento-demo',
          nome,
          email,
          whatsapp: wa,
          empresa,
          segmento,
          faturamento: '—',
          data: 'A combinar',
          horario: 'A combinar',
          origem: 'site-contato',
          notas,
        }),
      })
      if (!res.ok) throw new Error('fail')
      setSent(true)
      form.reset()
      setWhatsapp('')
    } catch {
      setError('Não foi possível enviar. Tente de novo ou fale no WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  const field =
    'min-h-12 px-3.5 border border-[#e4ddd2] rounded-xl bg-white text-[15.5px] text-[#2c241f] outline-none focus:border-[#7c2d3e]'

  return (
    <section id="contato" className="bg-[#7c2d3e] text-[#f7f2ee] px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-2 gap-[clamp(28px,4vw,64px)] items-stretch">
        <div className="flex flex-col">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#ecd9cd]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Granular · Digital as a Service
          </p>
          <h2 className="mt-4 text-[clamp(32px,4.4vw,60px)] leading-none tracking-[-.032em] font-semibold text-[#f7f2ee] text-balance">
            Veja rodando
            <br />
            com os seus números.
          </h2>
          <p className="mt-5 text-[clamp(16px,1.5vw,19px)] leading-relaxed text-[#ecd9cd] max-w-[46ch] text-pretty">
            A demonstração acontece no sistema real, em produção — não em slide.
          </p>

          <div className="mt-[clamp(28px,3vw,40px)]">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-4 py-[18px] border-t border-[rgba(236,217,205,.28)] ${
                  i === STEPS.length - 1 ? 'border-b' : ''
                }`}
              >
                <span
                  className="text-xs tracking-[.08em] text-[#ecd9cd] mt-0.5"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {s.n}
                </span>
                <span className="text-base leading-relaxed">
                  <strong className="font-semibold">{s.t}</strong>{' '}
                  <span className="text-[#ecd9cd]">{s.d}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-7">
            <p
              className="text-[11px] tracking-[.16em] uppercase text-[#ecd9cd]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Escritórios em São Paulo e Belo Horizonte
            </p>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="bg-white/10 border border-white/25 rounded-[18px] p-8">
              <strong className="text-[19px] font-semibold">Recebemos seu interesse.</strong>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#ecd9cd]">
                Obrigado. O time comercial retorna por e-mail. Enquanto isso, conheça a{' '}
                <Link to="/granu" className="text-white underline">
                  Granu
                </Link>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-[#faf9f7] rounded-[18px] p-[clamp(22px,2.6vw,34px)] flex flex-col gap-3.5">
              <label className="flex flex-col gap-1.5 text-[13px] tracking-wide text-[#6b5d52]">
                Nome
                <input name="nome" type="text" required autoComplete="name" placeholder="Seu nome" className={field} />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] tracking-wide text-[#6b5d52]">
                E-mail
                <input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com" className={field} />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] tracking-wide text-[#6b5d52]">
                Empresa
                <input name="empresa" type="text" required autoComplete="organization" placeholder="Grupo / rede" className={field} />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] tracking-wide text-[#6b5d52]">
                WhatsApp
                <input
                  name="whatsapp"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(31) 99999-0000"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(maskWhatsApp(e.target.value))}
                  className={field}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] tracking-wide text-[#6b5d52]">
                Categoria
                <select name="categoria" className={`${field} cursor-pointer`}>
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] tracking-wide text-[#6b5d52]">
                Como podemos ajudar?
                <textarea
                  name="msg"
                  rows={3}
                  placeholder="Quero conhecer o sistema / agendar uma demo…"
                  className="px-3.5 py-3 border border-[#e4ddd2] rounded-xl bg-white text-[15.5px] leading-snug text-[#2c241f] outline-none focus:border-[#7c2d3e] resize-vertical"
                />
              </label>
              {error && <p className="text-sm text-[#7c2d3e]">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="min-h-[52px] rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] disabled:opacity-60 text-[#f7f2ee] text-base font-medium transition-colors"
              >
                {sending ? 'Enviando…' : 'Agendar demonstração'}
              </button>
              <span className="text-[12.5px] leading-snug text-[#8a7a6e]">
                O pedido chega no e-mail da equipe e você recebe a confirmação. Também pode{' '}
                <Link to="/agendar-demo" className="text-[#7c2d3e] underline">
                  escolher data e horário
                </Link>
                .
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
