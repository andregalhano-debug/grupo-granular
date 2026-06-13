async function post(template: string, payload: Record<string, string>) {
  const res = await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ template, ...payload }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('[EMAIL] Falha:', err)
  }
}

export async function sendConfirmacaoCadastro(payload: { to: string; nome: string }) {
  await post('confirmacao-cadastro', payload)
}

export async function sendConviteMentor(payload: { to: string; nome: string; loginUrl: string }) {
  await post('convite-mentor', payload)
}

export async function sendLembreteCompletarPerfil(payload: { to: string; nome: string; completude: number }) {
  await post('lembrete-perfil', { ...payload, completude: String(payload.completude) })
}

export async function sendBoasVindasComunidade(payload: { to: string; nome: string }) {
  await post('boas-vindas', payload)
}

export async function sendResumoSemanal(payload: { to: string; nome: string; visualizacoes: number; contatos: number }) {
  await post('resumo-semanal', {
    ...payload,
    visualizacoes: String(payload.visualizacoes),
    contatos: String(payload.contatos),
  })
}
