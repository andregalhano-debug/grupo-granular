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

function novoAgendamentoDemoHtml(p: {
  nome: string; email: string; whatsapp: string; empresa: string
  segmento: string; faturamento: string; data: string; horario: string; origem: string
}) {
  const wa = waMe(p.whatsapp)
  const whatsappCell = wa
    ? `<a href="${wa}" style="color:#A31631;font-weight:600;text-decoration:none">${escapeHtml(p.whatsapp)}</a>`
    : escapeHtml(p.whatsapp)
  const temSlot = p.data && p.data !== '-' && p.horario && p.horario !== '-'
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Novo lead · Demonstração</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">${escapeHtml(p.empresa)}</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#4B4B4B;line-height:1.6">
              ${temSlot
                ? `Pediu demonstração para <strong>${escapeHtml(p.data)}</strong> às <strong>${escapeHtml(p.horario)}</strong>.`
                : 'Enviou os dados sem escolher data. Entrar em contato para agendar.'}
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:24px">
              <tr><td style="padding:20px 24px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('Nome', escapeHtml(p.nome))}
                  ${row('Empresa', escapeHtml(p.empresa))}
                  ${row('Segmento', escapeHtml(p.segmento))}
                  ${row('Faturamento', escapeHtml(p.faturamento || '—'))}
                  ${row('WhatsApp', whatsappCell)}
                  ${row('E-mail', `<a href="mailto:${escapeHtml(p.email)}" style="color:#A31631;text-decoration:none">${escapeHtml(p.email)}</a>`)}
                  ${row('Data', escapeHtml(p.data || '—'))}
                  ${row('Horário', escapeHtml(p.horario || '—'))}
                  ${row('Origem', escapeHtml(p.origem))}
                </table>
              </td></tr>
            </table>
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

function confirmacaoAgendamentoDemoHtml(nome: string, data: string, horario: string) {
  const primeiro = nome.split(' ')[0] || nome
  const temSlot = data && data !== '-' && horario && horario !== '-'
  return emailShell(`
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Pedido recebido</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">Olá, ${escapeHtml(primeiro)}!</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#4B4B4B;line-height:1.6">
              ${temSlot
                ? `Recebemos seu pedido de demonstração para <strong>${escapeHtml(data)}</strong> às <strong>${escapeHtml(horario)}</strong>. Nossa equipe confirma pelo WhatsApp em breve.`
                : 'Recebemos seus dados. Nossa equipe entra em contato pelo WhatsApp em até 1 dia útil para agendar a melhor data.'}
            </p>
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

/* ── Handler ────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { template, ...payload } = req.body as Record<string, string>

  try {
    if (template === 'confirmacao-cadastro') {
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
      const { nome, email, whatsapp, empresa, segmento, faturamento, data, horario, origem } = payload
      if (!nome || !email || !whatsapp || !empresa) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
      }

      const temSlot = data && data !== '-' && horario && horario !== '-'
      const teamSubject = temSlot
        ? `Novo lead — Demo · ${empresa} · ${data} ${horario}`
        : `Novo lead — Demo · ${empresa}`

      const team = await resend.emails.send({
        from: FROM,
        to: TEAM_INBOX,
        replyTo: email,
        subject: teamSubject,
        html: novoAgendamentoDemoHtml({
          nome, email, whatsapp, empresa,
          segmento: segmento || '—',
          faturamento: faturamento || '—',
          data: data || '—',
          horario: horario || '—',
          origem: origem || 'agendar-demo',
        }),
      })
      if (team.error) {
        console.error('[email] Falha ao avisar a equipe:', team.error)
        return res.status(500).json({ error: 'Falha ao avisar a equipe' })
      }

      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: 'Recebemos seu pedido de demonstração — Granular',
          html: confirmacaoAgendamentoDemoHtml(nome, data || '-', horario || '-'),
        })
      } catch (err) {
        console.error('[email] Confirmação ao lead falhou:', err)
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
