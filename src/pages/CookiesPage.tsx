import { Link } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'
import { SitePrefs } from '../components/SitePrefs'
import { useCookieConsent } from '../stores/useCookieConsent'
import { CookiePreferencesModal } from '../components/CookiePreferencesModal'
import { useT } from '../i18n/useT'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-[#0E0E0F] mb-4 pb-2 border-b border-[#0E0E0F]/8">{title}</h2>
      {children}
    </section>
  )
}

const p = "text-sm text-[#4B4B4B] leading-relaxed mb-3"
const li = "text-sm text-[#4B4B4B] leading-relaxed"

const CAT_COLORS = [
  'text-emerald-700 bg-emerald-50 border-emerald-200',
  'text-blue-700 bg-blue-50 border-blue-200',
  'text-amber-700 bg-amber-50 border-amber-200',
  'text-purple-700 bg-purple-50 border-purple-200',
]

export function CookiesPage() {
  const { setModalOpen } = useCookieConsent()
  const { legal } = useT()
  const n = legal.nav
  const t = legal.cookies

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <CookiePreferencesModal />
      <header className="bg-white border-b border-[#0E0E0F]/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-sm font-semibold text-[#0E0E0F]">Granular</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-[#9C958A]">
            <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">{n.terms}</Link>
            <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">{n.privacy}</Link>
            <SitePrefs />
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#A31631] uppercase tracking-widest mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {t.kicker}
          </p>
          <h1 className="text-3xl font-bold text-[#0E0E0F] mb-3">{t.title}</h1>
          <p className={p}>{t.updated}</p>
          <div className="bg-[#F7F7F7] border border-[#0E0E0F]/10 rounded-xl p-4 text-sm text-[#4B4B4B] leading-relaxed">
            {t.notice}
          </div>
        </div>

        <Section title={t.s1Title}>
          <p className={p}>{t.s1a}</p>
          <p className={p}>{t.s1b}</p>
        </Section>

        <Section title={t.s2Title}>
          <p className={p}>{t.s2Intro}</p>
          <div className="space-y-6">
            {t.cats.map((cat, idx) => (
              <div key={cat.name} className="bg-white rounded-2xl border border-[#0E0E0F]/10 overflow-hidden">
                <div className="px-5 py-4 border-b border-[#0E0E0F]/8 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${CAT_COLORS[idx]}`}>
                        {cat.name}
                      </span>
                      {idx === 0 && (
                        <span className="text-[10px] text-emerald-600 font-semibold">{t.alwaysOn}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#9C958A] leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F7F7F7]/80">
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8 whitespace-nowrap">{t.colName}</th>
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8">{t.colPurpose}</th>
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8 whitespace-nowrap">{t.colDuration}</th>
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8 whitespace-nowrap">{t.colOrigin}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.cookies.map((cookie, i) => (
                        <tr key={cookie.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/40'}>
                          <td className="px-4 py-2.5 border-b border-[#0E0E0F]/5 font-mono text-[#0E0E0F] whitespace-nowrap align-top">{cookie.name}</td>
                          <td className="px-4 py-2.5 border-b border-[#0E0E0F]/5 text-[#4B4B4B] align-top">{cookie.purpose}</td>
                          <td className="px-4 py-2.5 border-b border-[#0E0E0F]/5 text-[#9C958A] whitespace-nowrap align-top">{cookie.duration}</td>
                          <td className="px-4 py-2.5 border-b border-[#0E0E0F]/5 text-[#9C958A] whitespace-nowrap align-top">{cookie.origin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t.s3Title}>
          <p className={p}>{t.s3Intro}</p>
          <div className="space-y-4 mb-4">
            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4">
              <p className="text-sm font-semibold text-[#0E0E0F] mb-2">{t.panelTitle}</p>
              <p className="text-sm text-[#4B4B4B] leading-relaxed mb-3">{t.panelBody}</p>
              <button
                className="text-xs font-medium text-white bg-[#A31631] hover:bg-[#7A1025] transition-colors px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                {t.panelCta}
              </button>
            </div>
            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4">
              <p className="text-sm font-semibold text-[#0E0E0F] mb-2">{t.browserTitle}</p>
              <p className="text-sm text-[#4B4B4B] leading-relaxed mb-2">{t.browserBody}</p>
              <ul className="space-y-1">
                {t.browsers.map(([browser, path]) => (
                  <li key={browser} className="text-xs text-[#4B4B4B] flex gap-2">
                    <span className="font-semibold text-[#0E0E0F] min-w-[130px]">{browser}:</span>
                    <span className="text-[#9C958A]">{path}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#9C958A] mt-3">{t.browserWarn}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4">
              <p className="text-sm font-semibold text-[#0E0E0F] mb-2">{t.optoutTitle}</p>
              <ul className="space-y-1.5">
                {[
                  ['Google Analytics', 'https://tools.google.com/dlpage/gaoptout'],
                  ['Google Ads', 'https://adssettings.google.com'],
                  ['Meta / Facebook Ads', 'https://www.facebook.com/adpreferences'],
                  ['TikTok Ads', 'https://www.tiktok.com/legal/page/global/privacy-policy'],
                ].map(([name, url]) => (
                  <li key={name} className="text-xs flex gap-2 items-center">
                    <span className="font-semibold text-[#0E0E0F] min-w-[150px]">{name}:</span>
                    <a href={url} target="_blank" rel="noreferrer" className="text-[#A31631] hover:underline truncate">{url}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title={t.s4Title}>
          <p className={p}>{t.s4Intro}</p>
          <ul className="space-y-1.5 list-disc pl-5">
            {[
              ['Google', 'policies.google.com/privacy'],
              ['Meta (Facebook/Instagram)', 'www.facebook.com/policy'],
              ['Stripe', 'stripe.com/privacy'],
              ['TikTok', 'www.tiktok.com/legal/privacy-policy'],
            ].map(([name, url]) => (
              <li key={name} className={li}>
                <strong>{name}:</strong> <a href={`https://${url}`} target="_blank" rel="noreferrer" className="text-[#A31631] hover:underline">{url}</a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.s5Title}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F7F7F7]">
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">{t.impactCat}</th>
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">{t.impactCol}</th>
                </tr>
              </thead>
              <tbody>
                {t.impact.map(([cat, impact], i) => (
                  <tr key={cat} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#0E0E0F] font-medium align-top">{cat}</td>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B] align-top">{impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title={t.s6Title}><p className={p}>{t.s6}</p></Section>
        <Section title={t.s7Title}>
          <p className={p}>{t.s7Intro}</p>
          <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1">
            <p><strong>{t.emailLabel}</strong> <a href="mailto:contato@grupogranular.com.br" className="text-[#A31631] hover:underline">contato@grupogranular.com.br</a></p>
            <p><strong>{t.subjectLabel}</strong> {t.subjectValue}</p>
          </div>
        </Section>

        <div className="border-t border-[#0E0E0F]/8 pt-8 flex flex-wrap gap-4 text-xs text-[#9C958A]">
          <Link to="/" className="hover:text-[#0E0E0F] transition-colors">{n.back}</Link>
          <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">{n.terms}</Link>
          <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">{n.privacyPolicy}</Link>
        </div>
      </div>
    </div>
  )
}
