import { useEffect } from 'react'
import { Monitor, Users, ArrowRight, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'
import { FadeIn } from '../components/FadeIn'
import { useT } from '../i18n/useT'

function ConsultorCard() {
  const t = useT()
  return (
    <div className="flex flex-col rounded-2xl border border-[#9C958A]/20 bg-white p-8 h-full">
      <div className="w-14 h-14 rounded-xl bg-[#0E0E0F]/5 flex items-center justify-center mb-5">
        <Users size={28} className="text-[#0E0E0F]" />
      </div>
      <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">{t.login.isMentor}</h2>
      <p className="text-sm text-[#9C958A] leading-relaxed mb-4">
        {t.login.mentorDesc}
      </p>
      <ul className="space-y-1.5">
        <li className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="w-1 h-1 rounded-full bg-[#9C958A]" />
          {t.login.mentorBullet1}
        </li>
        <li className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="w-1 h-1 rounded-full bg-[#9C958A]" />
          {t.login.mentorBullet2}
        </li>
        <li className="flex items-center gap-2 text-xs text-[#9C958A]">
          <span className="w-1 h-1 rounded-full bg-[#9C958A]" />
          {t.login.mentorBullet3}
        </li>
      </ul>

      <div className="mt-auto pt-6">
        <a
          href="https://granularfood.vercel.app/consultor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#0E0E0F] hover:bg-[#2a2a2a] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          {t.login.accessPanel}
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}

export function LoginPage() {
  const t = useT()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header mínimo */}
      <header className="border-b border-[#0E0E0F]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <GranularLogo size={32} color="#0E0E0F" />
            <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Granular
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
            <ArrowLeft size={16} />
            {t.login.backToSite}
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-3xl w-full">
          <FadeIn className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-3">
              {t.login.title}
            </h1>
            <p className="text-sm sm:text-base text-[#9C958A]">
              {t.login.subtitle}
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Login Sistema — Cliente */}
            <FadeIn delay={100}>
              <a
                href="https://granularfood.vercel.app/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-[#9C958A]/20 bg-white p-8 hover:border-[#A31631]/30 hover:shadow-lg hover:shadow-[#A31631]/5 transition-all h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#A31631]/10 flex items-center justify-center mb-5">
                  <Monitor size={28} className="text-[#A31631]" />
                </div>
                <h2 className="text-lg font-bold text-[#0E0E0F] mb-2">{t.login.isClient}</h2>
                <p className="text-sm text-[#9C958A] leading-relaxed">
                  {t.login.clientDesc}
                </p>
                <div className="mt-auto pt-6">
                  <span className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#A31631] text-white text-sm font-semibold group-hover:bg-[#8a1229] transition-colors">
                    {t.login.accessSystem}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            </FadeIn>

            {/* Login Consultor — com senha */}
            <FadeIn delay={200}>
              <ConsultorCard />
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Footer mínimo */}
      <footer className="border-t border-[#0E0E0F]/10 py-6 text-center">
        <p className="text-xs text-[#9C958A]">{t.login.copyright}</p>
      </footer>
    </div>
  )
}
