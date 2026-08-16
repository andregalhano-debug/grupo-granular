import { Link } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'
import { SitePrefs } from '../components/SitePrefs'
import { useT } from '../i18n/useT'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-[#0E0E0F] mb-4 pb-2 border-b border-[#0E0E0F]/8">{title}</h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-[#0E0E0F] mb-2">{title}</h3>
      {children}
    </div>
  )
}

function Audience({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mr-2 mb-2 ${color}`}>
      {label}
    </span>
  )
}

const p = "text-sm text-[#4B4B4B] leading-relaxed mb-3"
const li = "text-sm text-[#4B4B4B] leading-relaxed"

export function TermosPage() {
  const { legal } = useT()
  const n = legal.nav
  const t = legal.terms

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="bg-white border-b border-[#0E0E0F]/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-sm font-semibold text-[#0E0E0F]">Granular</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-[#9C958A]">
            <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">{n.privacy}</Link>
            <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">{n.cookies}</Link>
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
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
            {t.notice}
          </div>
        </div>

        <Section title={t.s1Title}>
          <p className={p}>{t.s1Intro}</p>
          <ul className="space-y-2 list-none pl-0">
            {t.defs.map(([term, def]) => (
              <li key={term} className="flex gap-3 text-sm text-[#4B4B4B] leading-relaxed">
                <span className="font-semibold text-[#0E0E0F] min-w-[180px] flex-shrink-0">{term}</span>
                <span>{def}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t.s2Title}>
          <div className="mb-4">
            <Audience label={t.s2Audience} color="text-blue-700 bg-blue-50 border-blue-200" />
          </div>
          <SubSection title={t.s21Title}><p className={p}>{t.s21}</p></SubSection>
          <SubSection title={t.s22Title}>
            <ul className="space-y-1.5 list-disc pl-5">
              {t.s22.map((item) => <li key={item} className={li}>{item}</li>)}
            </ul>
          </SubSection>
          <SubSection title={t.s23Title}>
            <p className={p}>{t.s23a}</p>
            <p className={p}>{t.s23b}</p>
            <p className={p}>{t.s23c}</p>
          </SubSection>
          <SubSection title={t.s24Title}><p className={p}>{t.s24}</p></SubSection>
          <SubSection title={t.s25Title}><p className={p}>{t.s25}</p></SubSection>
          <SubSection title={t.s26Title}>
            <p className={p}>{t.s26a}</p>
            <p className={p}>{t.s26b}</p>
          </SubSection>
        </Section>

        <Section title={t.s3Title}>
          <div className="mb-4">
            <Audience label={t.s3Audience} color="text-purple-700 bg-purple-50 border-purple-200" />
          </div>
          <SubSection title={t.s31Title}><p className={p}>{t.s31}</p></SubSection>
          <SubSection title={t.s32Title}>
            <ul className="space-y-1.5 list-disc pl-5">
              {t.s32.map((item) => <li key={item} className={li}>{item}</li>)}
            </ul>
          </SubSection>
          <SubSection title={t.s33Title}>
            <p className={p}>{t.s33a}</p>
            <p className={p}>{t.s33b}</p>
          </SubSection>
          <SubSection title={t.s34Title}><p className={p}>{t.s34}</p></SubSection>
          <SubSection title={t.s35Title}><p className={p}>{t.s35}</p></SubSection>
        </Section>

        <Section title={t.s4Title}>
          <div className="mb-4">
            <Audience label={t.s4AudienceMentor} color="text-emerald-700 bg-emerald-50 border-emerald-200" />
            <Audience label={t.s4AudiencePartner} color="text-orange-700 bg-orange-50 border-orange-200" />
          </div>
          <SubSection title={t.s41Title}>
            <p className={p}>{t.s41a}</p>
            <p className={p}>{t.s41b}</p>
          </SubSection>
          <SubSection title={t.s42Title}>
            <ul className="space-y-1.5 list-disc pl-5">
              {t.s42.map((item) => <li key={item} className={li}>{item}</li>)}
            </ul>
          </SubSection>
          <SubSection title={t.s43Title}>
            <p className={p}>{t.s43a}</p>
            <p className={p}>{t.s43b}</p>
          </SubSection>
          <SubSection title={t.s44Title}><p className={p}>{t.s44}</p></SubSection>
          <SubSection title={t.s45Title}><p className={p}>{t.s45}</p></SubSection>
        </Section>

        <Section title={t.s5Title}>
          <p className={p}>{t.s5a}</p>
          <p className={p}>{t.s5b}</p>
        </Section>

        <Section title={t.s6Title}>
          <p className={p}>{t.s6Intro}</p>
          <ul className="space-y-1.5 list-disc pl-5 mb-3">
            {t.s6.map((item) => <li key={item} className={li}>{item}</li>)}
          </ul>
          <p className={p}>{t.s6Limit}</p>
        </Section>

        <Section title={t.s7Title}>
          <p className={p}>{t.s7a}</p>
          <p className={p}>{t.s7b}</p>
        </Section>

        <Section title={t.s8Title}>
          <p className={p}>
            {t.s8Before}
            <Link to="/privacidade" className="text-[#A31631] hover:underline font-medium">{n.privacyPolicy}</Link>
            {t.s8After}
          </p>
        </Section>

        <Section title={t.s9Title}><p className={p}>{t.s9}</p></Section>
        <Section title={t.s10Title}>
          <p className={p}>{t.s10a}</p>
          <p className={p}>{t.s10b}</p>
          <p className={p}>{t.s10c}</p>
          <p className={p}>{t.s10d}</p>
        </Section>
        <Section title={t.s11Title}><p className={p}>{t.s11}</p></Section>

        <Section title={t.s12Title}>
          <p className={p}>{t.s12Intro}</p>
          <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1">
            <p><strong>{t.company}</strong></p>
            <p>{t.cnpj}</p>
            <p>{t.emailLabel} <a href="mailto:contato@grupogranular.com.br" className="text-[#A31631] hover:underline">contato@grupogranular.com.br</a></p>
            <p>{t.cities}</p>
            <p>{t.siteLabel} <a href="https://www.grupogranular.com.br" className="text-[#A31631] hover:underline">www.grupogranular.com.br</a></p>
          </div>
        </Section>

        <div className="border-t border-[#0E0E0F]/8 pt-8 flex flex-wrap gap-4 text-xs text-[#9C958A]">
          <Link to="/" className="hover:text-[#0E0E0F] transition-colors">{n.back}</Link>
          <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">{n.privacyPolicy}</Link>
          <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">{n.cookiesPolicy}</Link>
        </div>
      </div>
    </div>
  )
}
