import { Link } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'

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

const cookieCategories = [
  {
    name: 'Estritamente Necessários',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    canDisable: false,
    desc: 'Essenciais para o funcionamento básico da plataforma. Sem eles o site não funciona corretamente. Não requerem consentimento.',
    cookies: [
      { name: 'session_id', purpose: 'Mantém a sessão autenticada do usuário', duration: 'Sessão (encerra ao fechar o navegador)', origin: 'Granular (1ª parte)' },
      { name: 'csrf_token', purpose: 'Proteção contra ataques CSRF (Cross-Site Request Forgery)', duration: 'Sessão', origin: 'Granular (1ª parte)' },
      { name: 'auth_token', purpose: 'Autenticação persistente (lembrar login)', duration: '30 dias', origin: 'Granular (1ª parte)' },
      { name: 'cookie_consent', purpose: 'Armazena as preferências de cookies do usuário', duration: '365 dias', origin: 'Granular (1ª parte)' },
      { name: '__stripe_mid', purpose: 'Prevenção a fraudes no processamento de pagamentos', duration: '1 ano', origin: 'Stripe (3ª parte)' },
      { name: '__stripe_sid', purpose: 'Sessão segura para transações financeiras', duration: '30 minutos', origin: 'Stripe (3ª parte)' },
    ],
  },
  {
    name: 'Analíticos e de Desempenho',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    canDisable: true,
    desc: 'Ajudam a entender como os usuários interagem com a plataforma — quais páginas visitam, onde encontram dificuldades e como melhorar a experiência. Os dados são agregados e anonimizados.',
    cookies: [
      { name: '_ga, _ga_*', purpose: 'Google Analytics — análise de tráfego, comportamento de navegação e origem de acesso', duration: '2 anos', origin: 'Google (3ª parte)' },
      { name: '_gid', purpose: 'Google Analytics — distingue usuários únicos (sessões de 24h)', duration: '24 horas', origin: 'Google (3ª parte)' },
      { name: '_gat', purpose: 'Google Analytics — controle de taxa de requisições', duration: '1 minuto', origin: 'Google (3ª parte)' },
      { name: 'granular_session_data', purpose: 'Métricas internas de uso de módulos e funcionalidades (dados anonimizados)', duration: '90 dias', origin: 'Granular (1ª parte)' },
    ],
  },
  {
    name: 'Funcionais e de Preferências',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    canDisable: true,
    desc: 'Permitem que a plataforma lembre suas preferências (idioma, layout, configurações) e ofereça uma experiência mais personalizada.',
    cookies: [
      { name: 'granular_category', purpose: 'Lembra o segmento selecionado pelo usuário (restaurante, mercado, etc.)', duration: '30 dias', origin: 'Granular (1ª parte)' },
      { name: 'granular_theme', purpose: 'Preferência de tema e layout da interface', duration: '1 ano', origin: 'Granular (1ª parte)' },
      { name: 'granular_onboarding', purpose: 'Controla quais dicas e tutoriais já foram exibidos ao usuário', duration: '1 ano', origin: 'Granular (1ª parte)' },
    ],
  },
  {
    name: 'Marketing e Rastreamento',
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    canDisable: true,
    desc: 'Utilizados para exibir anúncios relevantes e medir a efetividade de campanhas de marketing. Podem ser compartilhados com plataformas de publicidade.',
    cookies: [
      { name: '_fbp', purpose: 'Facebook Pixel — rastreamento de conversões e retargeting', duration: '90 dias', origin: 'Meta (3ª parte)' },
      { name: 'fr', purpose: 'Facebook — entrega de anúncios relevantes', duration: '90 dias', origin: 'Meta (3ª parte)' },
      { name: 'ttclid, _ttp', purpose: 'TikTok Ads — rastreamento de conversões em campanhas', duration: '13 meses', origin: 'TikTok (3ª parte)' },
      { name: 'granular_utm', purpose: 'Armazena parâmetros UTM para atribuição de campanha de marketing', duration: '30 dias', origin: 'Granular (1ª parte)' },
    ],
  },
]

export function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#0E0E0F]/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-sm font-semibold text-[#0E0E0F]">Granular</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-[#9C958A]">
            <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">Privacidade</Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#A31631] uppercase tracking-widest mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Cookies
          </p>
          <h1 className="text-3xl font-bold text-[#0E0E0F] mb-3">Política de Cookies</h1>
          <p className={p}>Última atualização: 13 de junho de 2026.</p>
          <div className="bg-[#F7F7F7] border border-[#0E0E0F]/10 rounded-xl p-4 text-sm text-[#4B4B4B] leading-relaxed">
            Esta Política explica o que são cookies, quais utilizamos, para que servem e como você pode gerenciá-los. Ao continuar navegando em nosso site ou utilizando a plataforma, você concorda com o uso de cookies conforme descrito abaixo, exceto onde o seu consentimento for expressamente solicitado.
          </div>
        </div>

        {/* O que são cookies */}
        <Section title="1. O que são Cookies?">
          <p className={p}>Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) quando você acessa um site ou plataforma. Eles permitem que o site reconheça seu dispositivo em visitas futuras, lembre suas preferências e funcione de forma mais eficiente.</p>
          <p className={p}>Além de cookies, podemos usar tecnologias similares como <strong>web beacons</strong> (pixels de rastreamento), <strong>localStorage</strong> e <strong>sessionStorage</strong> do navegador. Nesta Política, tratamos todas essas tecnologias sob o termo genérico "cookies".</p>
        </Section>

        {/* Tipos de cookies */}
        <Section title="2. Tipos de Cookies que Utilizamos">
          <p className={p}>Organizamos nossos cookies em quatro categorias, conforme a finalidade e a necessidade de consentimento:</p>

          <div className="space-y-6">
            {cookieCategories.map((cat) => (
              <div key={cat.name} className="bg-white rounded-2xl border border-[#0E0E0F]/10 overflow-hidden">
                {/* Category Header */}
                <div className="px-5 py-4 border-b border-[#0E0E0F]/8 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.color}`}>
                        {cat.name}
                      </span>
                      {!cat.canDisable && (
                        <span className="text-[10px] text-emerald-600 font-semibold">Sempre ativo</span>
                      )}
                    </div>
                    <p className="text-xs text-[#9C958A] leading-relaxed">{cat.desc}</p>
                  </div>
                </div>

                {/* Cookies table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F7F7F7]/80">
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8 whitespace-nowrap">Nome</th>
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8">Finalidade</th>
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8 whitespace-nowrap">Duração</th>
                        <th className="text-left font-semibold text-[#9C958A] uppercase tracking-wider px-4 py-2.5 border-b border-[#0E0E0F]/8 whitespace-nowrap">Origem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.cookies.map((cookie, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/40'}>
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

        {/* Gerenciar */}
        <Section title="3. Como Gerenciar seus Cookies">
          <p className={p}>Você tem controle sobre os cookies que aceitamos. Existem três formas de gerenciá-los:</p>

          <div className="space-y-4 mb-4">
            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4">
              <p className="text-sm font-semibold text-[#0E0E0F] mb-2">Painel de Preferências da Granular</p>
              <p className="text-sm text-[#4B4B4B] leading-relaxed mb-3">Você pode revisar e atualizar suas preferências de cookies a qualquer momento clicando no link abaixo. Sua escolha será salva por 365 dias.</p>
              <button
                className="text-xs font-medium text-white bg-[#A31631] hover:bg-[#7A1025] transition-colors px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => alert('Painel de preferências de cookies — em breve')}
              >
                Gerenciar preferências
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4">
              <p className="text-sm font-semibold text-[#0E0E0F] mb-2">Configurações do Navegador</p>
              <p className="text-sm text-[#4B4B4B] leading-relaxed mb-2">Todos os navegadores modernos permitem bloquear ou deletar cookies. Veja como fazer em cada um:</p>
              <ul className="space-y-1">
                {[
                  ['Google Chrome', 'Configurações → Privacidade e Segurança → Cookies e outros dados do site'],
                  ['Mozilla Firefox', 'Configurações → Privacidade e Segurança → Cookies e dados de sites'],
                  ['Apple Safari', 'Preferências → Privacidade → Gerenciar Dados do Site'],
                  ['Microsoft Edge', 'Configurações → Cookies e permissões do site → Gerenciar e excluir cookies'],
                ].map(([browser, path]) => (
                  <li key={browser as string} className="text-xs text-[#4B4B4B] flex gap-2">
                    <span className="font-semibold text-[#0E0E0F] min-w-[130px]">{browser}:</span>
                    <span className="text-[#9C958A]">{path}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#9C958A] mt-3">⚠️ Bloquear cookies estritamente necessários pode impedir o funcionamento correto da plataforma.</p>
            </div>

            <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4">
              <p className="text-sm font-semibold text-[#0E0E0F] mb-2">Opt-out de Ferramentas de Terceiros</p>
              <ul className="space-y-1.5">
                {[
                  ['Google Analytics', 'https://tools.google.com/dlpage/gaoptout'],
                  ['Google Ads', 'https://adssettings.google.com'],
                  ['Meta / Facebook Ads', 'https://www.facebook.com/adpreferences'],
                  ['TikTok Ads', 'https://www.tiktok.com/legal/page/global/privacy-policy'],
                ].map(([name, url]) => (
                  <li key={name as string} className="text-xs flex gap-2 items-center">
                    <span className="font-semibold text-[#0E0E0F] min-w-[150px]">{name}:</span>
                    <a href={url as string} target="_blank" rel="noreferrer" className="text-[#A31631] hover:underline truncate">{url}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Cookies de terceiros */}
        <Section title="4. Cookies de Terceiros e Responsabilidade">
          <p className={p}>Alguns cookies são definidos por terceiros (Google, Meta, Stripe, TikTok) cujas políticas de privacidade são independentes das nossas. A Granular não controla o funcionamento desses cookies após sua definição e recomenda consultar as políticas de cada empresa:</p>
          <ul className="space-y-1.5 list-disc pl-5">
            {[
              ['Google', 'policies.google.com/privacy'],
              ['Meta (Facebook/Instagram)', 'www.facebook.com/policy'],
              ['Stripe', 'stripe.com/privacy'],
              ['TikTok', 'www.tiktok.com/legal/privacy-policy'],
            ].map(([name, url]) => (
              <li key={name as string} className={li}>
                <strong>{name}:</strong> <a href={`https://${url}`} target="_blank" rel="noreferrer" className="text-[#A31631] hover:underline">{url}</a>
              </li>
            ))}
          </ul>
        </Section>

        {/* Impacto de desativar */}
        <Section title="5. Impacto de Desativar Cookies">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F7F7F7]">
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Categoria</th>
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Impacto de Desativar</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Estritamente Necessários', 'Não é possível desativar. O site não funciona sem eles.'],
                  ['Analíticos', 'Não coletamos dados de navegação. Pode afetar melhorias futuras da plataforma.'],
                  ['Funcionais', 'Preferências não são salvas entre sessões. Necessário reconfigurar a cada visita.'],
                  ['Marketing', 'Anúncios continuam aparecendo, porém menos relevantes para o seu perfil.'],
                ].map(([cat, impact], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#0E0E0F] font-medium align-top">{cat}</td>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B] align-top">{impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Atualizações */}
        <Section title="6. Atualizações desta Política">
          <p className={p}>Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças nas tecnologias utilizadas, nas exigências regulatórias ou em nossos serviços. A data de "Última atualização" no topo da página indica quando a versão mais recente foi publicada. Recomendamos revisão periódica.</p>
        </Section>

        {/* Contato */}
        <Section title="7. Contato">
          <p className={p}>Para dúvidas sobre esta Política ou sobre o uso de cookies pela Granular, entre em contato com nosso Encarregado de Proteção de Dados:</p>
          <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1">
            <p><strong>E-mail:</strong> <a href="mailto:privacidade@grupogranular.com.br" className="text-[#A31631] hover:underline">privacidade@grupogranular.com.br</a></p>
            <p><strong>Assunto sugerido:</strong> "Cookies — [sua dúvida]"</p>
          </div>
        </Section>

        <div className="border-t border-[#0E0E0F]/8 pt-8 flex flex-wrap gap-4 text-xs text-[#9C958A]">
          <Link to="/" className="hover:text-[#0E0E0F] transition-colors">← Voltar ao site</Link>
          <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">Termos de Uso</Link>
          <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">Política de Privacidade</Link>
        </div>
      </div>
    </div>
  )
}
