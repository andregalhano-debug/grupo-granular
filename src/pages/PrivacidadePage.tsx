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

function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#F7F7F7]">
            {headers.map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([dado, finalidade, base], i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}>
              <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#0E0E0F] font-medium align-top">{dado}</td>
              <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B] align-top">{finalidade}</td>
              <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B] align-top">{base}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const p = "text-sm text-[#4B4B4B] leading-relaxed mb-3"
const li = "text-sm text-[#4B4B4B] leading-relaxed"

export function PrivacidadePage() {
  const { legal } = useT()
  const n = legal.nav
  const t = legal.privacy
  const th = [t.tableData, t.tablePurpose, t.tableLegal]

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="bg-white border-b border-[#0E0E0F]/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-sm font-semibold text-[#0E0E0F]">Granular</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-[#9C958A]">
            <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">{n.terms}</Link>
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
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
            {t.notice}
          </div>
        </div>

        <Section title={t.s1Title}>
          <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1 mb-4">
            <p><strong>{t.controller}</strong> {t.controllerName}</p>
            <p><strong>{t.cnpj}</strong> 67.771.869/0001-00</p>
            <p><strong>{t.email}</strong> <a href="mailto:contato@grupogranular.com.br" className="text-[#A31631] hover:underline">contato@grupogranular.com.br</a></p>
            <p><strong>{t.address}</strong> {t.addressValue}</p>
          </div>
          <SubSection title={t.s11Title}>
            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1 mb-3">
              <p><strong>{t.channel}</strong> <a href="mailto:contato@grupogranular.com.br?subject=Privacidade" className="text-[#A31631] hover:underline">contato@grupogranular.com.br</a></p>
              <p><strong>{t.subject}</strong> {t.subjectValue}</p>
            </div>
            <p className={p}>{t.s11}</p>
          </SubSection>
          <SubSection title={t.s12Title}><p className={p}>{t.s12}</p></SubSection>
        </Section>

        <Section title={t.s2Title}>
          <SubSection title={t.s21Title}>
            <div className="mb-3"><Audience label={t.s21Audience} color="text-blue-700 bg-blue-50 border-blue-200" /></div>
            <p className={p}>{t.s21Lead}</p>
            <DataTable headers={th} rows={t.s21Rows} />
          </SubSection>
          <SubSection title={t.s22Title}>
            <div className="mb-3"><Audience label={t.s22Audience} color="text-purple-700 bg-purple-50 border-purple-200" /></div>
            <p className={p}>{t.s22Lead}</p>
            <DataTable headers={th} rows={t.s22Rows} />
            <p className="text-xs text-[#9C958A] mt-2">{t.s22Note}</p>
          </SubSection>
          <SubSection title={t.s23Title}>
            <div className="mb-3"><Audience label={t.s23Audience} color="text-emerald-700 bg-emerald-50 border-emerald-200" /></div>
            <p className={p}>{t.s23Lead}</p>
            <DataTable headers={th} rows={t.s23Rows} />
          </SubSection>
          <SubSection title={t.s24Title}>
            <div className="mb-3"><Audience label={t.s24Audience} color="text-orange-700 bg-orange-50 border-orange-200" /></div>
            <p className={p}>{t.s24Lead}</p>
            <DataTable headers={th} rows={t.s24Rows} />
          </SubSection>
          <SubSection title={t.s25Title}>
            <div className="mb-3"><Audience label={t.s25Audience} color="text-slate-700 bg-slate-50 border-slate-200" /></div>
            <p className={p}>{t.s25Lead}</p>
            <DataTable headers={th} rows={t.s25Rows} />
          </SubSection>
        </Section>

        <Section title={t.s3Title}>
          <p className={p}>{t.s3Intro}</p>
          <ul className="space-y-2 list-disc pl-5 mb-3">
            {t.s3.map((item) => <li key={item} className="text-sm text-[#4B4B4B] leading-relaxed">{item}</li>)}
          </ul>
          <p className={p}>{t.s3Outro}</p>
        </Section>

        <Section title={t.s4Title}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="bg-[#F7F7F7]">
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">{t.tableType}</th>
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">{t.tableRetention}</th>
                </tr>
              </thead>
              <tbody>
                {t.s4Rows.map(([tipo, prazo], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#0E0E0F]">{tipo}</td>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B]">{prazo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>{t.s4Outro}</p>
        </Section>

        <Section title={t.s5Title}>
          <p className={p}>{t.s5Intro}</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {t.s5Rights.map(([right, desc]) => (
              <div key={right} className="bg-white rounded-xl border border-[#0E0E0F]/10 p-3">
                <p className="text-xs font-bold text-[#0E0E0F] mb-1">{right}</p>
                <p className="text-xs text-[#9C958A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#A31631]/5 border border-[#A31631]/20 rounded-xl p-4 text-sm text-[#0E0E0F] mb-3">
            {t.s5Box}
          </div>
          <p className="text-xs text-[#9C958A] leading-relaxed">{t.s5Note}</p>
        </Section>

        <Section title={t.s6Title}>
          <p className={p}>{t.s6Intro}</p>
          <ul className="space-y-1.5 list-disc pl-5 mb-3">
            {t.s6.map((item) => <li key={item} className={li}>{item}</li>)}
          </ul>
          <p className={p}>{t.s6Outro}</p>
        </Section>

        <Section title={t.s7Title}><p className={p}>{t.s7}</p></Section>
        <Section title={t.s8Title}><p className={p}>{t.s8}</p></Section>
        <Section title={t.s9Title}><p className={p}>{t.s9}</p></Section>
        <Section title={t.s10Title}><p className={p}>{t.s10}</p></Section>
        <Section title={t.cookieTitle}>
          <p className={p}>
            {t.cookieBefore}
            <Link to="/cookies" className="text-[#A31631] hover:underline font-medium">{n.cookiesPolicy}</Link>
            {t.cookieAfter}
          </p>
        </Section>
        <Section title={t.updateTitle}><p className={p}>{t.updateBody}</p></Section>

        <div className="border-t border-[#0E0E0F]/8 pt-8 flex flex-wrap gap-4 text-xs text-[#9C958A]">
          <Link to="/" className="hover:text-[#0E0E0F] transition-colors">{n.back}</Link>
          <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">{n.terms}</Link>
          <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">{n.cookiesPolicy}</Link>
        </div>
      </div>
    </div>
  )
}
