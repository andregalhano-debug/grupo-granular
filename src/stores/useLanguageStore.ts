import { useState, useEffect } from 'react'

export type Language = 'pt' | 'en'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'pt'
  const stored = localStorage.getItem('granular-lang') as Language | null
  if (stored === 'pt' || stored === 'en') return stored
  const browser = navigator.language.toLowerCase()
  return browser.startsWith('pt') ? 'pt' : 'en'
}

export function useLanguage() {
  const [lang, setLang] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('granular-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'))

  return { lang, toggle, setLang }
}
