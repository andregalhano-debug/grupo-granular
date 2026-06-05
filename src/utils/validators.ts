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

export function validateCpf(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) return 'Informe seu CPF'
  if (digits.length !== 11) return 'CPF deve ter 11 dígitos'
  if (/^(\d)\1{10}$/.test(digits)) return 'CPF inválido'
  // Validação dígitos verificadores
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
  let check = 11 - (sum % 11)
  if (check >= 10) check = 0
  if (parseInt(digits[9]) !== check) return 'CPF inválido'
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i)
  check = 11 - (sum % 11)
  if (check >= 10) check = 0
  if (parseInt(digits[10]) !== check) return 'CPF inválido'
  return null
}

export function validateNome(value: string): string | null {
  if (!value.trim()) return 'Informe seu nome'
  if (value.trim().split(/\s+/).length < 2) return 'Informe nome e sobrenome'
  return null
}
