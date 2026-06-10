import type { Category } from '../components/Modules'

export const categoryAccent: Record<Category, { primary: string; dark: string }> = {
  restaurantes: { primary: '#A31631', dark: '#7A1025' },
  mercados:     { primary: '#0A4D68', dark: '#083A4F' },
  farmacias:    { primary: '#1B6B3A', dark: '#14502C' },
  petshop:      { primary: '#8B4513', dark: '#6B340F' },
}

/** Appends hex alpha to a hex color (alphaPercent: 0-100) */
export function withAlpha(hex: string, alphaPercent: number): string {
  const alpha = Math.round((alphaPercent / 100) * 255).toString(16).padStart(2, '0')
  return hex + alpha
}
