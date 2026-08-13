import { CalendarDays, Download } from 'lucide-react'

const TZ = 'America/Sao_Paulo'
const DURATION_MIN = 60

export interface CalendarEvent {
  title: string
  description: string
  location?: string
  start: Date
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Local wall-clock as YYYYMMDDTHHMMSS (used with ctz / TZID). */
function localStamp(d: Date) {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  )
}

function isoLocal(d: Date) {
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  )
}

function endOf(start: Date) {
  return new Date(start.getTime() + DURATION_MIN * 60 * 1000)
}

function icsEscape(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function buildIcs(event: CalendarEvent) {
  const end = endOf(event.start)
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Granular//Demo//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:demo-${localStamp(event.start)}@grupogranular.com.br`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${TZ}:${localStamp(event.start)}`,
    `DTEND;TZID=${TZ}:${localStamp(end)}`,
    `SUMMARY:${icsEscape(event.title)}`,
    `DESCRIPTION:${icsEscape(event.description)}`,
    `LOCATION:${icsEscape(event.location || 'Online')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}

function googleUrl(event: CalendarEvent) {
  const end = endOf(event.start)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${localStamp(event.start)}/${localStamp(end)}`,
    ctz: TZ,
    details: event.description,
    location: event.location || 'Online',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function outlookUrl(event: CalendarEvent) {
  const end = endOf(event.start)
  const params = new URLSearchParams({
    rru: 'addevent',
    subject: event.title,
    startdt: isoLocal(event.start),
    enddt: isoLocal(end),
    body: event.description,
    location: event.location || 'Online',
    path: '/calendar/action/compose',
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

function downloadIcs(event: CalendarEvent) {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'demonstracao-granular.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const btnClass =
  'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-[#9C958A]/20 text-sm font-medium text-[#0E0E0F] hover:border-[#A31631]/40 hover:bg-[#A31631]/5 transition-colors'

export function AddToCalendar({ event }: { event: CalendarEvent }) {
  return (
    <div className="text-left rounded-2xl border border-[#9C958A]/15 bg-[#F7F7F7] p-4 mb-6">
      <p className="text-xs font-semibold text-[#0E0E0F] mb-1">Salvar na agenda</p>
      <p className="text-[11px] text-[#9C958A] mb-3">
        1 hora · horário de Brasília. O link da reunião chega no WhatsApp.
      </p>
      <div className="space-y-2">
        <a href={googleUrl(event)} target="_blank" rel="noopener noreferrer" className={btnClass}>
          <CalendarDays size={16} className="text-[#A31631]" />
          Google Agenda
        </a>
        <a href={outlookUrl(event)} target="_blank" rel="noopener noreferrer" className={btnClass}>
          <CalendarDays size={16} className="text-[#A31631]" />
          Outlook
        </a>
        <button type="button" onClick={() => downloadIcs(event)} className={`${btnClass} cursor-pointer`}>
          <Download size={16} className="text-[#A31631]" />
          Apple Calendar e outros (.ics)
        </button>
      </div>
    </div>
  )
}
