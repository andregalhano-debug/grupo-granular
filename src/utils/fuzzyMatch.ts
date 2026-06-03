import type { FaqEntry } from '../data/chatbotFaq'

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
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
