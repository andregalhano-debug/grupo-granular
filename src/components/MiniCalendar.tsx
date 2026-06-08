import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TimeSlot } from '../data/consultants'

interface MiniCalendarProps {
  slots: TimeSlot[]
  selectedSlot: string | null
  onSelectSlot: (key: string) => void
  compact?: boolean
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function parseSlotDate(dateStr: string): Date | null {
  // Format: "seg. 09/06" or "seg 09/06"
  const match = dateStr.match(/(\d{2})\/(\d{2})/)
  if (!match) return null
  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10) - 1
  const now = new Date()
  let year = now.getFullYear()
  // If month is before current month, it's next year
  if (month < now.getMonth()) year++
  return new Date(year, month, day)
}

export function MiniCalendar({ slots, selectedSlot, onSelectSlot, compact }: MiniCalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => {
    // Start on the month of the first slot
    if (slots.length > 0) {
      const d = parseSlotDate(slots[0].date)
      if (d) return { year: d.getFullYear(), month: d.getMonth() }
    }
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  const [selectedDate, setSelectedDate] = useState<string | null>(() => {
    if (!selectedSlot) return null
    // Extract date part from "seg. 09/06-14:00"
    const parts = selectedSlot.split('-')
    // Find the slot that matches
    for (const slot of slots) {
      const key = `${slot.date}-${slot.time}`
      if (key === selectedSlot) return slot.date
    }
    return parts.length > 1 ? parts.slice(0, -1).join('-') : null
  })

  // Map slot dates to Date objects and group times by date
  const slotMap = useMemo(() => {
    const map = new Map<string, { dateObj: Date; dateStr: string; slots: TimeSlot[] }>()
    for (const slot of slots) {
      const dateObj = parseSlotDate(slot.date)
      if (!dateObj) continue
      const dayKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`
      const existing = map.get(dayKey)
      if (existing) {
        existing.slots.push(slot)
      } else {
        map.set(dayKey, { dateObj, dateStr: slot.date, slots: [slot] })
      }
    }
    return map
  }, [slots])

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewMonth.year, viewMonth.month, 1)
    const lastDay = new Date(viewMonth.year, viewMonth.month + 1, 0)
    const startPad = firstDay.getDay()
    const days: (number | null)[] = []
    for (let i = 0; i < startPad; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
    return days
  }, [viewMonth])

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  function getDayKey(day: number) {
    return `${viewMonth.year}-${viewMonth.month}-${day}`
  }

  function getDayData(day: number) {
    return slotMap.get(getDayKey(day))
  }

  function hasAvailableSlots(day: number) {
    const data = getDayData(day)
    return data ? data.slots.some((s) => s.available) : false
  }

  const today = new Date()
  const isToday = (day: number) =>
    viewMonth.year === today.getFullYear() && viewMonth.month === today.getMonth() && day === today.getDate()

  // Time slots for selected date
  const selectedDateSlots = useMemo(() => {
    if (!selectedDate) return []
    for (const entry of slotMap.values()) {
      if (entry.dateStr === selectedDate) return entry.slots
    }
    return []
  }, [selectedDate, slotMap])

  const prevMonth = () => {
    setViewMonth((prev) => {
      const m = prev.month - 1
      return m < 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: m }
    })
  }

  const nextMonth = () => {
    setViewMonth((prev) => {
      const m = prev.month + 1
      return m > 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: m }
    })
  }

  const cellSize = compact ? 'w-7 h-7 text-[10px]' : 'w-8 h-8 text-xs'

  return (
    <div className="space-y-3">
      {/* Calendar header */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={prevMonth} className="p-1 rounded-md hover:bg-[#F7F7F7] text-[#9C958A] transition-colors cursor-pointer">
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-semibold text-[#0E0E0F] capitalize">{monthLabel}</span>
        <button type="button" onClick={nextMonth} className="p-1 rounded-md hover:bg-[#F7F7F7] text-[#9C958A] transition-colors cursor-pointer">
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((wd, i) => (
          <div key={i} className="text-center text-[9px] font-medium text-[#9C958A] py-0.5">{wd}</div>
        ))}

        {/* Day cells */}
        {calendarDays.map((day, i) => {
          if (day === null) return <div key={`pad-${i}`} />
          const available = hasAvailableSlots(day)
          const dayData = getDayData(day)
          const isSelected = dayData && dayData.dateStr === selectedDate

          return (
            <button
              key={day}
              type="button"
              disabled={!available}
              onClick={() => {
                if (dayData) setSelectedDate(isSelected ? null : dayData.dateStr)
              }}
              className={`${cellSize} rounded-md flex items-center justify-center transition-all ${
                !available
                  ? 'text-[#9C958A]/30 cursor-default'
                  : isSelected
                    ? 'bg-[#A31631] text-white font-bold shadow-sm'
                    : 'text-[#0E0E0F] hover:bg-[#A31631]/10 cursor-pointer font-medium'
              } ${isToday(day) && !isSelected ? 'ring-1 ring-[#A31631]/40' : ''}`}
            >
              {day}
              {available && !isSelected && (
                <span className="absolute mt-5 w-1 h-1 rounded-full bg-[#A31631]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Time slots for selected date */}
      {selectedDate && selectedDateSlots.length > 0 && (
        <div>
          <p className="text-[10px] font-medium text-[#9C958A] mb-1.5 capitalize">{selectedDate}</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedDateSlots.map((slot) => {
              const key = `${slot.date}-${slot.time}`
              const isSlotSelected = selectedSlot === key
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectSlot(key)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    !slot.available
                      ? 'bg-[#F7F7F7] text-[#9C958A]/40 cursor-not-allowed line-through'
                      : isSlotSelected
                        ? 'bg-[#A31631] text-white shadow-sm'
                        : 'border border-[#9C958A]/20 text-[#0E0E0F] hover:border-[#A31631]/40 hover:bg-[#A31631]/5'
                  }`}
                >
                  {slot.time}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
