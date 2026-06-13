import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Granular <contato@grupogranular.com.br>'

/* ── Templates ────────────────────────────────────────────────── */

function confirmacaoCadastroHtml(nome: string) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E5E5E5">
        <!-- Header -->
        <tr>
          <td style="background:#0E0E0F;padding:32px 40px;text-align:center">
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px">Granular</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px">
            <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#A31631;text-transform:uppercase;letter-spacing:1.5px">Candidatura recebida</p>
            <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0E0E0F;line-height:1.3">Olá, ${nome}!</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Recebemos sua candidatura para fazer parte da <strong>Rede de Mentores Granular</strong>. Fico feliz que você queira contribuir com nossa comunidade de gestores e empreendedores.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#4B4B4B;line-height:1.6">
              Nossa equipe analisa cada perfil individualmente. Em até <strong>3 dias úteis</strong> você receberá um retorno sobre sua candidatura.
            </p>
            <!-- Card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;border-radius:12px;margin-bottom:28px">
              <tr><td style="padding:24px 28px">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#9C958A;text-transform:uppercase;letter-spacing:1px">O que acontece agora?</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ['✅', 'Candidatura registrada', 'Seu perfil foi salvo e está em fila de análise.'],
                    ['🔍', 'Análise do perfil', 'Nossa equipe avalia experiência, segmento e especialidades.'],
                    ['📧', 'Retorno em até 3 dias úteis', 'Você receberá um e-mail com o resultado.'],
                    ['🎉', 'Aprovação e convite', 'Se aprovado, você recebe o link de acesso à plataforma.'],
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
              Dúvidas? Responda este e-mail ou entre em contato pelo
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
          <td style="background:#0E0E0F;padding:32px 40px;text-align:center">
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px">Granular</span>
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

    } else {
      return res.status(400).json({ error: `Template desconhecido: ${template}` })
    }

    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('[email] Erro ao enviar:', err)
    return res.status(500).json({ error: 'Falha ao enviar e-mail' })
  }
}
