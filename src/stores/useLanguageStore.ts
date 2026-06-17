import { useSyncExternalStore } from 'react'

export type Language = 'pt' | 'en'

function getStored(): Language {
  if (typeof window === 'undefined') return 'pt'
  const stored = localStorage.getItem('granular-lang') as Language | null
  if (stored === 'pt' || stored === 'en') return stored
  return 'pt' // default to Portuguese
}

let _lang: Language = getStored()
const _listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  _listeners.add(cb)
  return () => _listeners.delete(cb)
}

function getSnapshot(): Language {
  return _lang
}

function setLang(l: Language) {
  _lang = l
  localStorage.setItem('granular-lang', l)
  document.documentElement.lang = l
  _listeners.forEach((cb) => cb())
}

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => 'pt' as Language)
  const toggle = () => setLang(lang === 'pt' ? 'en' : 'pt')
  return { lang, toggle, setLang }
}
