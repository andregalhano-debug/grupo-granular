export function validateWhatsApp(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'Informe seu WhatsApp'
  if (digits.length < 10 || digits.length > 11) return 'WhatsApp invalido. Use DDD + numero'
  return null
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Informe seu e-mail'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail invalido'
  return null
}

export function validateNome(value: string): string | null {
  if (!value.trim()) return 'Informe seu nome'
  if (value.trim().split(/\s+/).length < 2) return 'Informe nome e sobrenome'
  return null
}
