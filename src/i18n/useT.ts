import { useLanguage } from '../stores/useLanguageStore'
import { pt } from './pt'
import { en } from './en'

export function useT() {
  const { lang } = useLanguage()
  return lang === 'pt' ? pt : en
}
