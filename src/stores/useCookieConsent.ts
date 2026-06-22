import { useState, useEffect, useCallback } from 'react'

export interface CookiePreferences {
  analytics: boolean
  functional: boolean
  marketing: boolean
}

interface ConsentState {
  decided: boolean
  preferences: CookiePreferences
}

const STORAGE_KEY = 'cookie_consent'

function load(): ConsentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { decided: false, preferences: { analytics: false, functional: false, marketing: false } }
    const parsed = JSON.parse(raw)
    return {
      decided: true,
      preferences: {
        analytics: !!parsed.analytics,
        functional: !!parsed.functional,
        marketing: !!parsed.marketing,
      },
    }
  } catch {
    return { decided: false, preferences: { analytics: false, functional: false, marketing: false } }
  }
}

function persist(prefs: CookiePreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, savedAt: new Date().toISOString() }))
}

// Global singleton state — shared across components without Context overhead
let globalState = load()
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((fn) => fn())
}

function getState() {
  return globalState
}

function setConsent(prefs: CookiePreferences) {
  persist(prefs)
  globalState = { decided: true, preferences: prefs }
  notify()
}

// Global modal state
let globalModalOpen = false
const modalListeners = new Set<() => void>()

function notifyModal() {
  modalListeners.forEach((fn) => fn())
}

export function openCookieModal() {
  globalModalOpen = true
  notifyModal()
}

export function closeCookieModal() {
  globalModalOpen = false
  notifyModal()
}

export function acceptAllCookies() {
  setConsent({ analytics: true, functional: true, marketing: true })
  closeCookieModal()
}

export function rejectAllCookies() {
  setConsent({ analytics: false, functional: false, marketing: false })
  closeCookieModal()
}

export function saveCookiePreferences(prefs: CookiePreferences) {
  setConsent(prefs)
  closeCookieModal()
}

export function useCookieConsent() {
  const [state, setState] = useState<ConsentState>(getState)
  const [modalOpen, setModalOpenLocal] = useState(globalModalOpen)

  useEffect(() => {
    const listener = () => setState({ ...getState() })
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  }, [])

  useEffect(() => {
    const listener = () => setModalOpenLocal(globalModalOpen)
    modalListeners.add(listener)
    return () => { modalListeners.delete(listener) }
  }, [])

  const setModalOpen = useCallback((open: boolean) => {
    if (open) openCookieModal()
    else closeCookieModal()
  }, [])

  return {
    decided: state.decided,
    preferences: state.preferences,
    modalOpen,
    setModalOpen,
    acceptAll: acceptAllCookies,
    rejectAll: rejectAllCookies,
    savePreferences: saveCookiePreferences,
  }
}
