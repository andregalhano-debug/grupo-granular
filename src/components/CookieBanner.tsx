import { useCookieConsent } from '../stores/useCookieConsent'
import { CookiePreferencesModal } from './CookiePreferencesModal'
import { useT } from '../i18n/useT'

export function CookieBanner() {
  const { decided, acceptAll, rejectAll, setModalOpen } = useCookieConsent()
  const { cookiesUi: c } = useT()

  if (decided) return <CookiePreferencesModal />

  return (
    <>
      <CookiePreferencesModal />

      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:pb-6">
        <div className="max-w-2xl mx-auto bg-[#0E0E0F] text-white rounded-2xl shadow-2xl p-4 sm:p-5">
          <div className="mb-3">
            <p className="text-sm font-semibold mb-1">{c.title}</p>
            <p className="text-xs text-white/70 leading-relaxed">
              {c.body}{' '}
              <a href="/cookies" className="text-white/90 underline underline-offset-2 hover:text-white">
                {c.learnMore}
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <button
              type="button"
              onClick={rejectAll}
              className="min-h-11 text-sm font-medium px-4 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              {c.reject}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="min-h-11 text-sm font-medium px-4 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              {c.manage}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="min-h-11 text-sm font-semibold px-4 rounded-xl bg-[#A31631] hover:bg-[#7A1025] text-white transition-colors"
            >
              {c.accept}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
