const BOOKINGS_KEY = 'granular-demo-bookings'
const CONFIG_KEY = 'granular-demo-config'

export interface DemoSlot {
  date: string
  time: string
  available: boolean
}

export interface DemoBooking {
  id: string
  name: string
  email: string
  whatsapp: string
  company: string
  units: string
  date: string
  time: string
  status: 'pendente' | 'confirmada' | 'cancelada'
  createdAt: string
}

export interface DemoConfig {
  days: number[] // 0=dom, 1=seg, ..., 6=sab
  times: string[]
}

const defaultConfig: DemoConfig = {
  days: [1, 2, 3, 4, 5], // seg a sex
  times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
}

export function getDemoConfig(): DemoConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return defaultConfig
}

export function saveDemoConfig(config: DemoConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

export function getDemoBookings(): DemoBooking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

export function saveDemoBooking(booking: DemoBooking) {
  const bookings = getDemoBookings()
  bookings.push(booking)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

export function updateDemoBookingStatus(id: string, status: DemoBooking['status']) {
  const bookings = getDemoBookings()
  const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b))
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated))
}

export function generateDemoSlots(): DemoSlot[] {
  const config = getDemoConfig()
  const bookings = getDemoBookings()
  const bookedKeys = new Set(bookings.filter((b) => b.status !== 'cancelada').map((b) => `${b.date}-${b.time}`))

  const slots: DemoSlot[] = []
  const today = new Date()

  for (let d = 1; d <= 14; d++) {
    const date = new Date(today)
    date.setDate(date.getDate() + d)

    if (!config.days.includes(date.getDay())) continue

    const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })

    for (const time of config.times) {
      const key = `${dateStr}-${time}`
      slots.push({
        date: dateStr,
        time,
        available: !bookedKeys.has(key),
      })
    }
  }

  return slots
}
