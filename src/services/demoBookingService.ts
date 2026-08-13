import { saveDemoBooking, type DemoBooking } from '../data/demoSlots'

export interface DemoBookingInput {
  name: string
  email: string
  whatsapp: string
  company: string
  segmento: string
  segmentoOutro?: string
  faturamento: string
  date: string
  time: string
  dateIso?: string
  source: 'agendar-demo' | 'checkout'
}

function segmentoLabel(input: DemoBookingInput) {
  if (input.segmento === 'Outros' && input.segmentoOutro) {
    return `Outros (${input.segmentoOutro})`
  }
  return input.segmento
}

export async function submitDemoBooking(input: DemoBookingInput): Promise<DemoBooking> {
  const booking: DemoBooking = {
    id: `demo-${Date.now()}`,
    name: input.name,
    email: input.email,
    whatsapp: input.whatsapp,
    company: input.company,
    segmento: input.segmento,
    segmentoOutro: input.segmentoOutro,
    units: input.faturamento || '-',
    date: input.date || '-',
    time: input.time || '-',
    status: 'pendente',
    createdAt: new Date().toISOString(),
  }

  const res = await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      template: 'novo-agendamento-demo',
      nome: booking.name,
      email: booking.email,
      whatsapp: booking.whatsapp,
      empresa: booking.company,
      segmento: segmentoLabel(input),
      faturamento: booking.units,
      data: booking.date,
      horario: booking.time,
      dateIso: input.dateIso || '',
      origem: input.source,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('[demo] Falha ao enviar lead:', err)
    throw new Error('Falha ao enviar o agendamento')
  }

  // Cache local: o admin neste navegador continua vendo o teste.
  // A fonte de verdade do lead é o e-mail da equipe (+ Supabase, quando a tabela existir).
  saveDemoBooking(booking)
  return booking
}
