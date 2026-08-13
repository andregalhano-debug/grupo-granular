import { Link } from 'react-router-dom'
import { FadeIn } from '../FadeIn'
import { GranuDualPhones } from '../granu/GranuWhatsApp'

const BULLETS = [
  { t: 'Botões que executam', d: ' — aprovar, rejeitar, iniciar checklist, direto na conversa.' },
  { t: 'O mesmo cérebro do app', d: ' — posse do número verificada, permissão por perfil, silêncio noturno.' },
  { t: 'Resposta com evidência', d: ' — número, fonte e próximo passo, nunca opinião solta.' },
]

export function HomeGranuSection() {
  return (
    <section id="granu" className="px-[clamp(18px,4vw,44px)] py-[clamp(64px,7vw,112px)] bg-[#f0ede8]">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[auto_1fr] gap-[clamp(28px,4vw,64px)] items-center">
        <FadeIn className="justify-self-center lg:justify-self-start">
          <GranuDualPhones />
        </FadeIn>

        <FadeIn delay={80} className="max-w-xl">
          <p
            className="text-[11.5px] tracking-[.24em] uppercase text-[#7c2d3e]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            A Granu · a IA do sistema
          </p>
          <h2 className="mt-4 text-[clamp(40px,5.6vw,76px)] leading-[.98] tracking-[-.035em] font-semibold text-[#2c241f]">
            Eu sou a Granu.
          </h2>
          <p className="mt-[22px] text-[clamp(17px,1.6vw,21px)] leading-relaxed text-[#5f5248] max-w-[52ch] text-pretty">
            Não sou chatbot. Estou ligada a cada venda, cada item de estoque e cada centavo de repasse — em tempo real.
            Você pergunta e eu respondo com número e evidência. E quando algo importa, eu te chamo primeiro — no WhatsApp.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5f5248] max-w-[52ch]">
            No WhatsApp, eu te chamo. Na plataforma, a mesma conversa — com a conta aberta e a evidência do cubo.
          </p>
          <div className="flex flex-col gap-3 mt-[26px] text-[15.5px] leading-relaxed text-[#5f5248]">
            {BULLETS.map((b) => (
              <div key={b.t} className="flex gap-2.5">
                <span className="flex-none w-1.5 h-1.5 rounded-full bg-[#7c2d3e] mt-2.5" />
                <span>
                  <strong className="text-[#2c241f] font-semibold">{b.t}</strong>
                  {b.d}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 mt-8">
            <Link
              to="/agendar-demo"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[52px] px-[30px] rounded-full bg-[#7c2d3e] hover:bg-[#5f2130] text-[#f7f2ee] font-medium text-base transition-colors"
            >
              Quero a Granu na minha operação
            </Link>
            <Link to="/granu" className="inline-flex items-center justify-center min-h-11 text-sm font-medium text-[#7c2d3e] hover:text-[#5f2130]">
              Conhecer a Granu →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
