import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'
import { SejaConsultorForm } from '../components/seja-consultor/SejaConsultorForm'
import { SejaConsultorSuccess } from '../components/seja-consultor/SejaConsultorSuccess'
import { useSejaConsultorForm } from '../hooks/useSejaConsultorForm'
import { useT } from '../i18n/useT'

export function SejaConsultorPage() {
  const t = useT()
  const { form, errors, submitted, isProcessing, submitError, updateField, toggleSegment, toggleSpecialty, submit } = useSejaConsultorForm()

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { if (submitted) window.scrollTo({ top: 0, behavior: 'smooth' }) }, [submitted])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            {submitted ? (
              <SejaConsultorSuccess nome={form.nome} email={form.email} />
            ) : (
              <>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-[#A31631]/10 text-[#A31631] px-4 py-2 rounded-full text-xs font-medium mb-6 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {t.sejaConsultor.badge}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-3">
                    {t.sejaConsultor.title}
                  </h1>
                  <p className="text-sm text-[#9C958A]">
                    {t.sejaConsultor.subtitle}
                  </p>
                </div>
                <SejaConsultorForm
                  form={form}
                  errors={errors}
                  isProcessing={isProcessing}
                  submitError={submitError}
                  onUpdate={updateField}
                  onToggleSegment={toggleSegment}
                  onToggleSpecialty={toggleSpecialty}
                  onSubmit={submit}
                />
              </>
            )}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
