export const CTA_ORIGEM = {
  demo: 'agendar-demo',
  home: 'home-contato',
  especialista: 'especialista-sob-demanda',
  televendas: 'modulo-televendas',
  pessoas: 'modulo-pessoas',
  plano1: 'plano-modulo-1',
  plano2: 'plano-modulo-2',
  plano3: 'plano-modulo-3',
} as const

export type CtaOrigem = (typeof CTA_ORIGEM)[keyof typeof CTA_ORIGEM]

export const CTA_ORIGEM_LABEL: Record<string, string> = {
  'agendar-demo': 'Demonstração do sistema',
  'home-contato': 'Home — Veja rodando',
  checkout: 'Checkout',
  chat: 'Chat do site',
  'especialista-sob-demanda': 'Especialista sob demanda',
  'modulo-televendas': 'Módulo Televendas',
  'modulo-pessoas': 'Módulo Pessoas (RH)',
  'plano-modulo-1': 'Planos — Módulo 1',
  'plano-modulo-2': 'Planos — Módulo 2',
  'plano-modulo-3': 'Planos — Módulo 3',
}

const KNOWN = new Set(Object.keys(CTA_ORIGEM_LABEL))

export function parseCtaOrigem(raw: string | null | undefined): string {
  if (!raw) return CTA_ORIGEM.demo
  return KNOWN.has(raw) ? raw : CTA_ORIGEM.demo
}

export function ctaOrigemLabel(origem: string): string {
  return CTA_ORIGEM_LABEL[origem] || origem
}

export function demoHref(origem: string): string {
  return `/agendar-demo?origem=${encodeURIComponent(origem)}`
}

export function planoOrigem(planId: string): string {
  if (planId === 'saas-1') return CTA_ORIGEM.plano1
  if (planId === 'saas-2') return CTA_ORIGEM.plano2
  if (planId === 'saas-3') return CTA_ORIGEM.plano3
  return CTA_ORIGEM.demo
}
