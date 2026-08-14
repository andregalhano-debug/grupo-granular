import { CTA_ORIGEM, CTA_ORIGEM_LABEL, parseCtaOrigem } from '../data/ctaOrigem'

export const GA_MEASUREMENT_ID = 'G-T7MFTLV7Y4'

function debugMode(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.location.hostname === 'localhost' ||
    window.location.search.includes('ga_debug=1')
  )
}

function gtagEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
    ...(debugMode() ? { debug_mode: true } : {}),
  })
}

export function origemFromHref(href: string): string | null {
  try {
    const url = new URL(href, 'https://www.grupogranular.com.br')
    if (!url.pathname.includes('agendar-demo')) return null
    return parseCtaOrigem(url.searchParams.get('origem'))
  } catch {
    return null
  }
}

function origemPayload(origem: string) {
  return {
    cta_origem: origem,
    cta_label: CTA_ORIGEM_LABEL[origem] || origem,
  }
}

/** Page view after a client-side navigation (SPA). Skip the first load — gtag config already sent it. */
export function trackSpaPageView(path: string) {
  const origem = origemFromHref(path)
  gtagEvent('page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
    ...(origem ? origemPayload(origem) : {}),
  })
}

export function trackCtaClick(origem: string, linkUrl: string, linkText: string) {
  gtagEvent('cta_click', {
    ...origemPayload(origem),
    link_url: linkUrl,
    link_text: linkText.slice(0, 100),
  })
}

export function trackGenerateLead(origemRaw: string) {
  const origem = parseCtaOrigem(origemRaw || CTA_ORIGEM.demo)
  gtagEvent('generate_lead', {
    ...origemPayload(origem),
    currency: 'BRL',
    value: 0,
  })
}

export function bindCtaClickTracking(): () => void {
  if (typeof document === 'undefined') return () => {}

  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const anchor = target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    if (!href) return
    const origem = origemFromHref(href)
    if (!origem) return
    const text = (anchor.textContent || '').replace(/\s+/g, ' ').trim()
    trackCtaClick(origem, href, text)
  }

  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
