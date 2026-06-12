// Serviço de e-mail transacional — stubs prontos para conectar Resend / SendGrid / AWS SES
// Para ativar: implemente cada função chamando POST /api/email/<template>

export async function sendConfirmacaoCadastro(payload: { to: string; nome: string }): Promise<void> {
  console.info('[EMAIL] Confirmação de cadastro →', payload.to)
  // TODO: conectar Resend
  // await resend.emails.send({
  //   from: 'Granular <noreply@grupogranular.com.br>',
  //   to: payload.to,
  //   subject: 'Recebemos sua candidatura de mentor — Granular',
  //   html: confirmacaoTemplate(payload),
  // })
}

export async function sendConviteMentor(payload: {
  to: string
  nome: string
  loginUrl: string
}): Promise<void> {
  console.info('[EMAIL] Convite mentor →', payload.to)
  // TODO: conectar Resend
  // await resend.emails.send({
  //   from: 'Granular <noreply@grupogranular.com.br>',
  //   to: payload.to,
  //   subject: `${payload.nome}, você foi aprovado como Mentor Granular 🎉`,
  //   html: conviteTemplate(payload),
  // })
}

export async function sendLembreteCompletarPerfil(payload: {
  to: string
  nome: string
  completude: number
}): Promise<void> {
  console.info('[EMAIL] Lembrete perfil →', payload.to, `${payload.completude}%`)
  // Template: incentiva completar foto, bio, certificações e valor hora
}

export async function sendBoasVindasComunidade(payload: {
  to: string
  nome: string
}): Promise<void> {
  console.info('[EMAIL] Boas-vindas comunidade →', payload.to)
  // Template: orienta como a comunidade funciona, cronograma de entrada, sessões de onboarding
}

export async function sendResumoSemanal(payload: {
  to: string
  nome: string
  visualizacoes: number
  contatos: number
}): Promise<void> {
  console.info('[EMAIL] Resumo semanal →', payload.to)
  // Template: mostra quantas vezes o perfil foi visualizado e quantos contatos recebeu
}
