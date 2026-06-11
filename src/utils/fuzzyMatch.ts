import type { FaqEntry } from '../data/chatbotFaq'

const GREETING_PATTERNS = [
  'oi', 'ola', 'ola!', 'oi!', 'hey', 'hello', 'bom dia', 'boa tarde', 'boa noite',
  'tudo bem', 'tudo bom', 'como vai', 'oi tudo', 'ola tudo', 'bom dia!', 'boa tarde!', 'boa noite!',
]

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function isGreeting(query: string): boolean {
  const normalized = normalize(query)
  // Exact match or very short message that starts with a greeting
  return GREETING_PATTERNS.some((g) => normalized === g || normalized.startsWith(g + ' ') || normalized.startsWith(g + ','))
}

export function findBestMatch(query: string, entries: FaqEntry[]): FaqEntry | null {
  const normalizedQuery = normalize(query)
  let bestEntry: FaqEntry | null = null
  let bestScore = 0

  for (const entry of entries) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(normalize(keyword))) {
        score++
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  return bestScore >= 1 ? bestEntry : null
}
