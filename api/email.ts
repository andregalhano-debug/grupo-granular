import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Granular <contato@grupogranular.com.br>'
const TEAM_INBOX = process.env.DEMO_LEADS_EMAIL || 'contato@grupogranular.com.br'

/* ── Templates ────────────────────────────────────────────────── */

const LOGO_URL = 'https://www.grupogranular.com.br/granular-logo-email.png'

function confirmacaoCadastroHtml(nome: string) {
  const portalUrl = 'https://www.grupogranular.com.br/painel-consultor'
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5E5E5">
        <!-- Header -->
        <tr>
          <td style="background:#0E0E0F;padding:28px 40px;text-align:center">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto">
              <tr>
                <td style="vertical-align:middle;padding-right:12px">
                  <img src="${LOGO_URL}" width="36" height="36" alt="Granular" style="display:block;border:0">
                </td>
                <td style="vertical-align:middle">
                  <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;font-family:'Helvetica Neue',Arial,sans-serif">Granular</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Candidatura recebida</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">Olá, ${nome}!</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Recebemos sua candidatura para a <strong>Rede de Mentores Granular</strong>. Você já pode acessar o portal do mentor para adicionar mais detalhes do seu perfil e ativar seu anúncio na plataforma.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Estamos em processo de candidatura nas cidades. Assim que atingirmos uma cota interessante de mentores, faremos uma divulgação nos nossos canais para conectar você com empreendedores e pessoas interessadas.
            </p>
            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px">
              <tr><td align="center">
                <a href="${portalUrl}" style="display:inline-block;background:#A31631;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;font-family:'Helvetica Neue',Arial,sans-serif">
                  Acessar o portal do mentor →
                </a>
              </td></tr>
            </table>
            <!-- Card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:28px">
              <tr><td style="padding:24px 28px">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:1px">Próximos passos</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['✅', 'Candidatura recebida', 'Seu perfil foi salvo na plataforma.'],
                    ['🧭', 'Faça a avaliação', 'Em 3 minutos identificamos suas forças: https://www.grupogranular.com.br/assessment'],
                    ['📝', 'Complete seu perfil', 'Acesse o portal e adicione bio, LinkedIn, foto, valor hora e disponibilidade.'],
                    ['🚀', 'Ative seu anúncio', 'Finalize o cadastro para que seu perfil apareça para os empreendedores.'],
                    ['📣', 'Divulgação nos canais', 'Quando atingirmos a cota de mentores na sua cidade, conectamos você com empreendedores e pessoas interessadas.'],
                  ].map(([icon, title, desc]) => `
                  <tr>
                    <td width="32" style="padding:6px 0;vertical-align:top;font-size:16px">${icon}</td>
                    <td style="padding:6px 0 6px 8px;vertical-align:top">
                      <p style="margin:0;font-size:13px;font-weight:600;color:#0E0E0F">${title}</p>
                      <p style="margin:2px 0 0;font-size:12px;color:#9C958A;line-height:1.5">${desc}</p>
                    </td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>
            <p style="margin:0;font-size:14px;color:#4B4B4B;line-height:1.6">
              Dúvidas? Responda este e-mail ou acesse
              <a href="https://www.grupogranular.com.br" style="color:#A31631;text-decoration:none;font-weight:600">grupogranular.com.br</a>.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F7F7F7;padding:24px 40px;border-top:1px solid #E5E5E5">
            <p style="margin:0;font-size:12px;color:#9C958A;line-height:1.6;text-align:center">
              Granular · São Paulo, SP · Brasil<br>
              <a href="https://www.grupogranular.com.br" style="color:#9C958A">grupogranular.com.br</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function conviteMentorHtml(nome: string, loginUrl: string) {
  const fullUrl = `https://www.grupogranular.com.br${loginUrl}`
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5E5E5">
        <tr>
          <td style="background:#0E0E0F;padding:28px 40px;text-align:center">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto">
              <tr>
                <td style="vertical-align:middle;padding-right:12px">
                  <img src="${LOGO_URL}" width="36" height="36" alt="Granular" style="display:block;border:0">
                </td>
                <td style="vertical-align:middle">
                  <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;font-family:'Helvetica Neue',Arial,sans-serif">Granular</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Você foi aprovado!</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">${nome}, bem-vindo à Rede Granular 🎉</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Sua candidatura foi analisada e você foi <strong>aprovado como Mentor Granular</strong>. A partir de agora você faz parte de uma rede seleta de profissionais que ajudam gestores e empreendedores a crescerem suas operações.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Clique no botão abaixo para acessar sua área e completar seu perfil:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
              <tr><td align="center">
                <a href="${fullUrl}" style="display:inline-block;background:#A31631;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px">
                  Acessar minha área →
                </a>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:28px">
              <tr><td style="padding:24px 28px">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:1px">Próximos passos</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['📝', 'Complete seu perfil', 'Adicione LinkedIn, foto, bio, valor hora e disponibilidade.'],
                    ['📅', 'Configure sua agenda', 'Defina os horários em que você está disponível para sessões.'],
                    ['🤝', 'Receba seu primeiro mentorado', 'Quando houver match, você será notificado por e-mail.'],
                  ].map(([icon, title, desc]) => `
                  <tr>
                    <td width="32" style="padding:6px 0;vertical-align:top;font-size:16px">${icon}</td>
                    <td style="padding:6px 0 6px 8px;vertical-align:top">
                      <p style="margin:0;font-size:13px;font-weight:600;color:#0E0E0F">${title}</p>
                      <p style="margin:2px 0 0;font-size:12px;color:#9C958A;line-height:1.5">${desc}</p>
                    </td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#9C958A;line-height:1.6">
              Se o botão não funcionar, copie e cole este link no navegador:<br>
              <a href="${fullUrl}" style="color:#A31631;word-break:break-all">${fullUrl}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F7F7;padding:24px 40px;border-top:1px solid #E5E5E5">
            <p style="margin:0;font-size:12px;color:#9C958A;line-height:1.6;text-align:center">
              Granular · São Paulo, SP · Brasil<br>
              <a href="https://www.grupogranular.com.br" style="color:#9C958A">grupogranular.com.br</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

const TIPO_CONTRATACAO_LABEL: Record<string, string> = {
  sistema: 'Sistema Granular',
  especialista: 'Especialista sob demanda',
  mentoria: 'Mentoria',
}

function confirmacaoAceiteHtml(nome: string, empresa: string, tipo: string) {
  const primeiroNome = nome.split(' ')[0] || nome
  const tipoLabel = TIPO_CONTRATACAO_LABEL[tipo] || tipo
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5E5E5">
        <!-- Header -->
        <tr>
          <td style="background:#0E0E0F;padding:28px 40px;text-align:center">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto">
              <tr>
                <td style="vertical-align:middle;padding-right:12px">
                  <img src="${LOGO_URL}" width="36" height="36" alt="Granular" style="display:block;border:0">
                </td>
                <td style="vertical-align:middle">
                  <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;font-family:'Helvetica Neue',Arial,sans-serif">Granular</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Aceite confirmado</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">Olá, ${primeiroNome}!</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Confirmamos o aceite dos Termos de Uso e da Política de Privacidade da Granular em nome de <strong>${empresa}</strong>, referente à contratação de <strong>${tipoLabel}</strong>. Nossa equipe já foi avisada e vai entrar em contato para dar início à sua utilização.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:28px">
              <tr><td style="padding:24px 28px">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:1px">Contratação</p>
                <p style="margin:0 0 16px;font-size:13px;color:#4B4B4B">${tipoLabel}</p>
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:1px">Documentos aceitos</p>
                <p style="margin:0;font-size:13px;color:#4B4B4B;line-height:1.6">
                  <a href="https://www.grupogranular.com.br/termos" style="color:#A31631;text-decoration:none;font-weight:600">Termos e Condições de Uso</a><br>
                  <a href="https://www.grupogranular.com.br/privacidade" style="color:#A31631;text-decoration:none;font-weight:600">Política de Privacidade</a>
                </p>
              </td></tr>
            </table>
            <p style="margin:0;font-size:14px;color:#4B4B4B;line-height:1.6">
              Dúvidas? Responda este e-mail ou acesse
              <a href="https://www.grupogranular.com.br" style="color:#A31631;text-decoration:none;font-weight:600">grupogranular.com.br</a>.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F7F7F7;padding:24px 40px;border-top:1px solid #E5E5E5">
            <p style="margin:0;font-size:12px;color:#9C958A;line-height:1.6;text-align:center">
              Granular · São Paulo, SP · Brasil<br>
              <a href="https://www.grupogranular.com.br" style="color:#9C958A">grupogranular.com.br</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function waMe(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, '')
  if (!digits) return ''
  return digits.startsWith('55') ? `https://wa.me/${digits}` : `https://wa.me/55${digits}`
}

const CAL_TZ = 'America/Sao_Paulo'
const CAL_MINUTES = 60

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function parseSlot(dateIso: string, horario: string): { startStamp: string; endStamp: string; startIso: string; endIso: string } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso || '')) return null
  const tm = (horario || '').match(/^(\d{1,2}):(\d{2})$/)
  if (!tm) return null
  const [y, mo, d] = dateIso.split('-').map(Number)
  const hh = Number(tm[1])
  const mm = Number(tm[2])
  const start = new Date(y, mo - 1, d, hh, mm, 0, 0)
  if (Number.isNaN(start.getTime())) return null
  const end = new Date(start.getTime() + CAL_MINUTES * 60 * 1000)
  const stamp = (dt: Date) =>
    `${dt.getFullYear()}${pad2(dt.getMonth() + 1)}${pad2(dt.getDate())}T${pad2(dt.getHours())}${pad2(dt.getMinutes())}00`
  const iso = (dt: Date) =>
    `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}T${pad2(dt.getHours())}:${pad2(dt.getMinutes())}:00`
  return { startStamp: stamp(start), endStamp: stamp(end), startIso: iso(start), endIso: iso(end) }
}

function calendarLinks(dateIso: string, horario: string, empresa: string) {
  const slot = parseSlot(dateIso, horario)
  if (!slot) return null
  const title = empresa ? `Demonstração Granular — ${empresa}` : 'Demonstração Granular'
  const details = 'Demonstração da plataforma Granular. Nossa equipe confirma pelo WhatsApp e envia o link da reunião.\n\nhttps://www.grupogranular.com.br'
  const location = 'Online — link no WhatsApp'
  const google = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${slot.startStamp}/${slot.endStamp}`,
    ctz: CAL_TZ,
    details,
    location,
  })
  const outlook = new URLSearchParams({
    rru: 'addevent',
    subject: title,
    startdt: slot.startIso,
    enddt: slot.endIso,
    body: details,
    location,
    path: '/calendar/action/compose',
  })
  const icsQs = new URLSearchParams({ ics: '1', date: dateIso, time: horario, empresa })
  return {
    title,
    details,
    location,
    slot,
    google: `https://calendar.google.com/calendar/render?${google.toString()}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?${outlook.toString()}`,
    ics: `https://www.grupogranular.com.br/api/email?${icsQs.toString()}`,
  }
}

function buildIcsFile(dateIso: string, horario: string, empresa: string) {
  const links = calendarLinks(dateIso, horario, empresa)
  if (!links) return null
  const icsEscape = (v: string) => v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Granular//Demo//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:demo-${links.slot.startStamp}@grupogranular.com.br`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${CAL_TZ}:${links.slot.startStamp}`,
    `DTEND;TZID=${CAL_TZ}:${links.slot.endStamp}`,
    `SUMMARY:${icsEscape(links.title)}`,
    `DESCRIPTION:${icsEscape(links.details)}`,
    `LOCATION:${icsEscape(links.location)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}

function emailShell(inner: string) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5E5E5">
        <tr>
          <td style="background:#0E0E0F;padding:28px 40px;text-align:center">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto">
              <tr>
                <td style="vertical-align:middle;padding-right:12px">
                  <img src="${LOGO_URL}" width="36" height="36" alt="Granular" style="display:block;border:0">
                </td>
                <td style="vertical-align:middle">
                  <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;font-family:'Helvetica Neue',Arial,sans-serif">Granular</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ${inner}
        <tr>
          <td style="background:#F7F7F7;padding:24px 40px;border-top:1px solid #E5E5E5">
            <p style="margin:0;font-size:12px;color:#9C958A;line-height:1.6;text-align:center">
              Granular · São Paulo, SP · Brasil<br>
              <a href="https://www.grupogranular.com.br" style="color:#9C958A">grupogranular.com.br</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;vertical-align:top;width:140px">
      <p style="margin:0;font-size:11px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:0.6px">${label}</p>
    </td>
    <td style="padding:8px 0;vertical-align:top">
      <p style="margin:0;font-size:14px;color:#0E0E0F;line-height:1.5">${value}</p>
    </td>
  </tr>`
}

function conversaExpandivel(raw?: string) {
  if (!raw?.trim()) return ''
  let items: { role?: string; text?: string }[] = []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) items = parsed
  } catch {
    items = [{ role: 'user', text: raw }]
  }
  items = items.filter((m) => typeof m.text === 'string' && m.text.trim())
  if (items.length === 0) return ''

  const count = items.length
  const bubbles = items.map((m) => {
    const lead = m.role === 'user'
    return `<tr>
      <td align="${lead ? 'right' : 'left'}" style="padding:4px 0">
        <p style="margin:0 0 2px;font-size:10px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:0.5px">${lead ? 'Lead' : 'Granular'}</p>
        <div style="display:inline-block;max-width:92%;text-align:left;background:${lead ? '#F3E6E8' : '#F7F7F7'};border-radius:12px;padding:10px 12px;font-size:13px;color:#0E0E0F;line-height:1.5;white-space:pre-wrap">${escapeHtml(m.text || '')}</div>
      </td>
    </tr>`
  }).join('')

  return `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #E5E5E5;border-radius:12px;overflow:hidden">
              <tr><td style="padding:16px 20px">
                <details>
                  <summary style="cursor:pointer;list-style:none;font-size:13px;font-weight:700;color:#A31631">
                    Ver conversa completa · ${count} ${count === 1 ? 'mensagem' : 'mensagens'}
                  </summary>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px">
                    ${bubbles}
                  </table>
                </details>
              </td></tr>
            </table>`
}

function novoAgendamentoDemoHtml(p: {
  nome: string; email: string; whatsapp: string; empresa: string
  segmento: string; faturamento: string; data: string; horario: string; origem: string
  notas?: string
  conversa?: string
}) {
  const wa = waMe(p.whatsapp)
  const whatsappCell = wa
    ? `<a href="${wa}" style="color:#A31631;font-weight:600;text-decoration:none">${escapeHtml(p.whatsapp)}</a>`
    : escapeHtml(p.whatsapp)
  const temSlot = p.data && p.data !== '-' && p.horario && p.horario !== '-'
  const doChat = p.origem === 'chat'
  const origemLabelMap: Record<string, string> = {
    'especialista-sob-demanda': 'Especialista sob demanda',
    chat: 'Chat do site',
    'home-contato': 'Home — Veja rodando',
    checkout: 'Checkout',
    'modulo-televendas': 'Módulo Televendas',
    'modulo-pessoas': 'Módulo Pessoas (RH)',
    'plano-modulo-1': 'Planos — Módulo 1',
    'plano-modulo-2': 'Planos — Módulo 2',
    'plano-modulo-3': 'Planos — Módulo 3',
    'agendar-demo': 'Demonstração do sistema',
  }
  const origemLabel = origemLabelMap[p.origem] || p.origem || 'Demonstração do sistema'
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Novo lead</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">${escapeHtml(p.empresa)}</h1>
            ${!temSlot && !doChat ? `<p style="margin:0 0 24px;font-size:15px;color:#4B4B4B;line-height:1.6">Enviou os dados sem escolher data. Entrar em contato para agendar.</p>` : ''}
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:24px">
              <tr><td style="padding:20px 24px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('Frente', escapeHtml(origemLabel))}
                  ${row('Nome', escapeHtml(p.nome))}
                  ${row('Empresa', escapeHtml(p.empresa))}
                  ${row('Segmento', escapeHtml(p.segmento))}
                  ${row('Faturamento', escapeHtml(p.faturamento || '—'))}
                  ${row('WhatsApp', whatsappCell)}
                  ${p.email ? row('E-mail', `<a href="mailto:${escapeHtml(p.email)}" style="color:#A31631;text-decoration:none">${escapeHtml(p.email)}</a>`) : ''}
                  ${doChat ? row('Canal', 'Chat do site') : ''}
                  ${doChat ? '' : row('Data', escapeHtml(p.data || '—'))}
                  ${doChat ? '' : row('Horário', escapeHtml(p.horario || '—'))}
                </table>
              </td></tr>
            </table>
            ${conversaExpandivel(p.conversa || p.notas)}
            ${wa ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px">
              <tr><td align="center">
                <a href="${wa}" style="display:inline-block;background:#25D366;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px">
                  Abrir WhatsApp do lead
                </a>
              </td></tr>
            </table>` : ''}
          </td>
        </tr>`)
}

function confirmacaoAgendamentoDemoHtml(
  nome: string,
  data: string,
  horario: string,
  empresa: string,
  dateIso: string,
) {
  const primeiro = nome.split(' ')[0] || nome
  const temSlot = data && data !== '-' && horario && horario !== '-'
  const cal = temSlot ? calendarLinks(dateIso, horario, empresa) : null
  const calBlock = cal
    ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin:0 0 24px">
              <tr><td style="padding:20px 24px">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#0E0E0F">Salvar na agenda</p>
                <p style="margin:0 0 14px;font-size:12px;color:#9C958A;line-height:1.5">1 hora · horário de Brasília. O link da reunião chega no WhatsApp.</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:0 0 8px">
                    <a href="${cal.google}" style="display:block;text-align:center;background:#A31631;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 16px;border-radius:10px">Google Agenda</a>
                  </td></tr>
                  <tr><td style="padding:0 0 8px">
                    <a href="${cal.outlook}" style="display:block;text-align:center;background:#0E0E0F;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 16px;border-radius:10px">Outlook</a>
                  </td></tr>
                  <tr><td>
                    <a href="${cal.ics}" style="display:block;text-align:center;border:1px solid #D9D4CC;color:#0E0E0F;font-size:13px;font-weight:700;text-decoration:none;padding:12px 16px;border-radius:10px">Apple Calendar e outros (.ics)</a>
                  </td></tr>
                </table>
              </td></tr>
            </table>`
    : ''
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Pedido recebido</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">Olá, ${escapeHtml(primeiro)}!</h1>
            <p style="margin:0 0 20px;font-size:15px;color:#4B4B4B;line-height:1.6">
              ${temSlot
                ? `Recebemos seu pedido de demonstração para <strong>${escapeHtml(data)}</strong> às <strong>${escapeHtml(horario)}</strong>. Nossa equipe confirma pelo WhatsApp em breve.`
                : 'Recebemos seus dados. Nossa equipe entra em contato pelo WhatsApp em até 1 dia útil para agendar a melhor data.'}
            </p>
            ${calBlock}
            <p style="margin:0;font-size:14px;color:#4B4B4B;line-height:1.6">
              Dúvidas? Responda este e-mail ou fale no
              <a href="https://wa.me/5531984355542" style="color:#A31631;text-decoration:none;font-weight:600">WhatsApp</a>.
            </p>
          </td>
        </tr>`)
}

async function persistDemoBooking(payload: Record<string, string>) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
  const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
  if (!url.includes('supabase.co') || !key || key === 'placeholder') return

  const bookedDate = /^\d{4}-\d{2}-\d{2}$/.test(payload.dateIso || '') ? payload.dateIso : null
  const bookedTime = payload.horario && payload.horario !== '-' ? payload.horario : null

  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/demo_bookings`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      nome: payload.nome,
      email: payload.email,
      whatsapp: payload.whatsapp.replace(/\D/g, ''),
      empresa: payload.empresa,
      segmento: payload.segmento,
      faturamento: payload.faturamento || null,
      booked_date: bookedDate,
      booked_time: bookedTime,
      date_label: payload.data || null,
      time_label: payload.horario || null,
      origem: payload.origem || 'agendar-demo',
      status: 'pendente',
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[email] persist demo_bookings falhou:', res.status, body)
  }
}

function confirmacaoAssessmentHtml(p: {
  nome: string
  perfil: string
  perfilDesc: string
  matchClientes: string
  top: string
  especialidades: string
}) {
  const primeiro = p.nome.split(' ')[0] || p.nome
  const portalUrl = 'https://www.grupogranular.com.br/painel-consultor'
  const trilhaUrl = 'https://www.grupogranular.com.br/trilha'
  let scoreRows = ''
  try {
    const items = JSON.parse(p.especialidades || '[]') as { label: string; final: string; tier: string }[]
    scoreRows = items.map((it) => `
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:13px;color:#0E0E0F">${escapeHtml(it.label)}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:13px;color:#0E0E0F;font-weight:700;text-align:center">${escapeHtml(it.final)}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:12px;color:#A31631;text-align:right">${escapeHtml(it.tier)}</td>
                  </tr>`).join('')
  } catch {
    scoreRows = ''
  }
  const matches = p.matchClientes
    ? p.matchClientes.split(' · ').map((m) => m.trim()).filter(Boolean)
    : []
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Seu resultado</p>
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">${escapeHtml(primeiro)}, seu perfil é:</h1>
            <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#A31631;line-height:1.3">${escapeHtml(p.perfil || '—')}</p>
            ${p.perfilDesc ? `<p style="margin:0 0 20px;font-size:15px;color:#4B4B4B;line-height:1.6">${escapeHtml(p.perfilDesc)}</p>` : ''}
            ${p.top ? `
            <p style="margin:0 0 20px;font-size:14px;color:#4B4B4B;line-height:1.6">
              <strong style="color:#0E0E0F">Top especialidades:</strong> ${escapeHtml(p.top)}
            </p>` : ''}
            ${scoreRows ? `
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:0.6px">Score por área</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
              <tr>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700">Área</td>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700;text-align:center">Score</td>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700;text-align:right">Nível</td>
              </tr>
              ${scoreRows}
            </table>` : ''}
            ${matches.length ? `
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:0.6px">Parceiros ideais</p>
            <p style="margin:0 0 24px;font-size:14px;color:#4B4B4B;line-height:1.7">${matches.map((m) => escapeHtml(m)).join(' · ')}</p>` : ''}
            <p style="margin:0 0 24px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Nossa equipe analisa o perfil e fala com você pelo WhatsApp em até 48 horas.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:28px">
              <tr><td style="padding:24px 28px">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:1px">Próximos passos</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['1', 'Análise do perfil', 'O time revisa sua avaliação e o cadastro.'],
                    ['2', 'Contato no WhatsApp', 'Alguém da Granular te chama em até 48 horas.'],
                    ['3', 'Complete o portal', 'Bio, LinkedIn, foto e disponibilidade deixam o anúncio pronto.'],
                  ].map(([n, title, desc]) => `
                  <tr>
                    <td width="28" style="padding:6px 0;vertical-align:top;font-size:13px;font-weight:700;color:#A31631">${n}</td>
                    <td style="padding:6px 0 6px 4px;vertical-align:top">
                      <p style="margin:0;font-size:13px;font-weight:600;color:#0E0E0F">${title}</p>
                      <p style="margin:2px 0 0;font-size:12px;color:#9C958A;line-height:1.5">${desc}</p>
                    </td>
                  </tr>`).join('')}
                </table>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px">
              <tr><td align="center">
                <a href="${portalUrl}" style="display:inline-block;background:#A31631;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px">Abrir o portal do mentor</a>
              </td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#9C958A;line-height:1.6;text-align:center">
              Quer ir adiante na trilha? <a href="${trilhaUrl}" style="color:#A31631;text-decoration:none;font-weight:600">grupogranular.com.br/trilha</a>
            </p>
          </td>
        </tr>`)
}

function resultadoAssessmentHtml(p: {
  nome: string; email: string; whatsapp: string; linkedin: string
  perfil: string; perfilDesc: string; matchClientes: string; top: string
  especialidades: string
}) {
  const wa = waMe(p.whatsapp)
  const whatsappCell = wa
    ? `<a href="${wa}" style="color:#A31631;font-weight:600;text-decoration:none">${escapeHtml(p.whatsapp)}</a>`
    : escapeHtml(p.whatsapp || '—')
  let rows = ''
  try {
    const items = JSON.parse(p.especialidades || '[]') as { label: string; self: string; scenario: string; final: string; tier: string }[]
    rows = items.map((it) => `
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:13px;color:#0E0E0F">${escapeHtml(it.label)}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:13px;color:#4B4B4B;text-align:center">${escapeHtml(it.self)}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:13px;color:#4B4B4B;text-align:center">${escapeHtml(it.scenario)}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:13px;color:#0E0E0F;font-weight:700;text-align:center">${escapeHtml(it.final)}</td>
                    <td style="padding:8px 0;border-bottom:1px solid #E5E5E5;font-size:12px;color:#A31631;text-align:right">${escapeHtml(it.tier)}</td>
                  </tr>`).join('')
  } catch {
    rows = ''
  }
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Avaliação de consultor</p>
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">${escapeHtml(p.nome)}</h1>
            <p style="margin:0 0 20px;font-size:15px;color:#4B4B4B;line-height:1.5"><strong>${escapeHtml(p.perfil)}</strong> — ${escapeHtml(p.perfilDesc)}</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:20px">
              <tr><td style="padding:20px 24px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('Nome', escapeHtml(p.nome))}
                  ${row('WhatsApp', whatsappCell)}
                  ${row('E-mail', p.email ? `<a href="mailto:${escapeHtml(p.email)}" style="color:#A31631;text-decoration:none">${escapeHtml(p.email)}</a>` : '—')}
                  ${p.linkedin ? row('LinkedIn', `<a href="${escapeHtml(p.linkedin)}" style="color:#A31631;text-decoration:none">${escapeHtml(p.linkedin)}</a>`) : ''}
                  ${p.top ? row('Top especialidades', escapeHtml(p.top)) : ''}
                  ${p.matchClientes ? row('Encaixa com', escapeHtml(p.matchClientes)) : ''}
                </table>
              </td></tr>
            </table>
            ${rows ? `
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:0.6px">Scores</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
              <tr>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700">Área</td>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700;text-align:center">Auto</td>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700;text-align:center">Cenário</td>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700;text-align:center">Final</td>
                <td style="padding:6px 0;font-size:11px;color:#9C958A;font-weight:700;text-align:right">Nível</td>
              </tr>
              ${rows}
            </table>` : ''}
            ${wa ? `
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center">
                <a href="${wa}" style="display:inline-block;background:#25D366;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px">Abrir WhatsApp</a>
              </td></tr>
            </table>` : ''}
          </td>
        </tr>`)
}

function novaCandidaturaConsultorHtml(p: {
  nome: string; email: string; whatsapp: string; cargo: string
  segmentos: string; especialidades: string
}) {
  const wa = waMe(p.whatsapp)
  const whatsappCell = wa
    ? `<a href="${wa}" style="color:#A31631;font-weight:600;text-decoration:none">${escapeHtml(p.whatsapp)}</a>`
    : escapeHtml(p.whatsapp)
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Novo consultor</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">${escapeHtml(p.nome)}</h1>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:24px">
              <tr><td style="padding:20px 24px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('Nome', escapeHtml(p.nome))}
                  ${row('Cargo', escapeHtml(p.cargo || '—'))}
                  ${row('WhatsApp', whatsappCell)}
                  ${row('E-mail', `<a href="mailto:${escapeHtml(p.email)}" style="color:#A31631;text-decoration:none">${escapeHtml(p.email)}</a>`)}
                  ${row('Segmentos', escapeHtml(p.segmentos || '—'))}
                  ${row('Especialidades', escapeHtml(p.especialidades || '—'))}
                </table>
              </td></tr>
            </table>
            ${wa ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px">
              <tr><td align="center">
                <a href="${wa}" style="display:inline-block;background:#25D366;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px">
                  Abrir WhatsApp
                </a>
              </td></tr>
            </table>` : ''}
          </td>
        </tr>`)
}

/* ── Handler ────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const q = req.query || {}
    if (q.ics === '1' || q.ics === 1) {
      const ics = buildIcsFile(String(q.date || ''), String(q.time || ''), String(q.empresa || ''))
      if (!ics) return res.status(400).send('Agendamento inválido')
      res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
      res.setHeader('Content-Disposition', 'attachment; filename="demonstracao-granular.ics"')
      return res.status(200).send(ics)
    }
    return res.status(404).json({ error: 'Not found' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { template, ...payload } = req.body as Record<string, string>

  try {
    if (template === 'resultado-assessment') {
      const { nome, email, whatsapp, linkedin, perfil, perfilDesc, matchClientes, top, especialidades } = payload
      if (!nome) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
      }
      const team = await resend.emails.send({
        from: FROM,
        to: TEAM_INBOX,
        replyTo: email || undefined,
        subject: `Avaliação de consultor — ${nome}`,
        html: resultadoAssessmentHtml({
          nome,
          email: email || '',
          whatsapp: whatsapp || '',
          linkedin: linkedin || '',
          perfil: perfil || '—',
          perfilDesc: perfilDesc || '',
          matchClientes: matchClientes || '',
          top: top || '',
          especialidades: especialidades || '[]',
        }),
      })
      if (team.error) {
        console.error('[email] Falha ao enviar assessment:', team.error)
        return res.status(500).json({ error: 'Falha ao avisar a equipe' })
      }
      if (email) {
        try {
          await resend.emails.send({
            from: FROM,
            to: email,
            subject: `Seu resultado: ${perfil || 'avaliação'} — Granular`,
            html: confirmacaoAssessmentHtml({
              nome,
              perfil: perfil || '—',
              perfilDesc: perfilDesc || '',
              matchClientes: matchClientes || '',
              top: top || '',
              especialidades: especialidades || '[]',
            }),
          })
        } catch (err) {
          console.error('[email] Confirmação da avaliação ao consultor falhou:', err)
        }
      }

    } else if (template === 'nova-candidatura-consultor') {
      const { nome, email, whatsapp, cargo, segmentos, especialidades } = payload
      if (!nome || !email || !whatsapp) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
      }
      const team = await resend.emails.send({
        from: FROM,
        to: TEAM_INBOX,
        replyTo: email,
        subject: `Novo consultor — ${nome}`,
        html: novaCandidaturaConsultorHtml({
          nome, email, whatsapp,
          cargo: cargo || '—',
          segmentos: segmentos || '—',
          especialidades: especialidades || '—',
        }),
      })
      if (team.error) {
        console.error('[email] Falha ao avisar a equipe (consultor):', team.error)
        return res.status(500).json({ error: 'Falha ao avisar a equipe' })
      }

    } else if (template === 'confirmacao-cadastro') {
      const { to, nome } = payload
      await resend.emails.send({
        from: FROM,
        to,
        subject: 'Recebemos sua candidatura — Granular',
        html: confirmacaoCadastroHtml(nome),
      })

    } else if (template === 'convite-mentor') {
      const { to, nome, loginUrl } = payload
      await resend.emails.send({
        from: FROM,
        to,
        subject: `${nome}, você foi aprovado como Mentor Granular 🎉`,
        html: conviteMentorHtml(nome, loginUrl),
      })

    } else if (template === 'confirmacao-aceite') {
      const { to, nome, empresa, tipo } = payload
      await resend.emails.send({
        from: FROM,
        to,
        subject: `Aceite confirmado — ${empresa} na Granular`,
        html: confirmacaoAceiteHtml(nome, empresa, tipo),
      })

    } else if (template === 'novo-agendamento-demo') {
      const { nome, email, whatsapp, empresa, segmento, faturamento, data, horario, origem, notas, conversa, dateIso } = payload
      if (!nome || !whatsapp || !empresa) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
      }
      if (origem !== 'chat' && !email) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
      }

      const origemAssunto: Record<string, string> = {
        'especialista-sob-demanda': 'Especialista sob demanda',
        'home-contato': 'Home',
        'modulo-televendas': 'Televendas',
        'modulo-pessoas': 'Pessoas (RH)',
        'plano-modulo-1': 'Módulo 1',
        'plano-modulo-2': 'Módulo 2',
        'plano-modulo-3': 'Módulo 3',
      }
      const teamSubject = origemAssunto[origem]
        ? `Novo lead — ${origemAssunto[origem]} — ${empresa}`
        : `Novo lead — ${empresa}`

      const team = await resend.emails.send({
        from: FROM,
        to: TEAM_INBOX,
        replyTo: email,
        subject: teamSubject,
        html: novoAgendamentoDemoHtml({
          nome, email: email || '', whatsapp, empresa,
          segmento: segmento || '—',
          faturamento: faturamento || '—',
          data: data || '—',
          horario: horario || '—',
          origem: origem || 'agendar-demo',
          notas,
          conversa,
        }),
      })
      if (team.error) {
        console.error('[email] Falha ao avisar a equipe:', team.error)
        return res.status(500).json({ error: 'Falha ao avisar a equipe' })
      }

      if (email) {
        try {
          const ics = buildIcsFile(dateIso || '', horario || '', empresa)
          await resend.emails.send({
            from: FROM,
            to: email,
            subject: 'Recebemos seu pedido de demonstração — Granular',
            html: confirmacaoAgendamentoDemoHtml(nome, data || '-', horario || '-', empresa, dateIso || ''),
            attachments: ics
              ? [{ filename: 'demonstracao-granular.ics', content: Buffer.from(ics).toString('base64') }]
              : undefined,
          })
        } catch (err) {
          console.error('[email] Confirmação ao lead falhou:', err)
        }
      }

      try {
        await persistDemoBooking(payload)
      } catch (err) {
        console.error('[email] Persistência demo_bookings falhou:', err)
      }

    } else {
      return res.status(400).json({ error: `Template desconhecido: ${template}` })
    }

    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('[email] Erro ao enviar:', err)
    return res.status(500).json({ error: 'Falha ao enviar e-mail' })
  }
}
