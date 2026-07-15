import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'
import { AceiteForm } from '../components/aceite/AceiteForm'
import { AceiteSuccess } from '../components/aceite/AceiteSuccess'
import { useTermosAceiteForm } from '../hooks/useTermosAceiteForm'
import { isTipoContratacao } from '../types/termosAceite'

export function AceitePage() {
  const [searchParams] = useSearchParams()
  const parceiroRef = searchParams.get('ref') ?? undefined
  const tipoParam = searchParams.get('tipo')
  const tipoInicial = isTipoContratacao(tipoParam) ? tipoParam : null
  const { form, errors, submitted, isProcessing, submitError, updateField, selectTipo, toggleAceite, submit } =
    useTermosAceiteForm(parceiroRef, tipoInicial)

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { if (submitted) window.scrollTo({ top: 0, behavior: 'smooth' }) }, [submitted])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            {submitted && form.tipoContratacao ? (
              <AceiteSuccess
                empresaNome={form.empresaNome}
                representanteNome={form.representanteNome}
                email={form.email}
                tipoContratacao={form.tipoContratacao}
              />
            ) : (
              <>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-[#A31631]/10 text-[#A31631] px-4 py-2 rounded-full text-xs font-medium mb-6 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Início de utilização
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-3">
                    Vamos começar
                  </h1>
                  <p className="text-sm text-[#9C958A]">
                    Confirme os dados da sua empresa e o aceite dos Termos de Uso para liberar o acesso à plataforma Granular.
                  </p>
                </div>
                <AceiteForm
                  form={form}
                  errors={errors}
                  isProcessing={isProcessing}
                  submitError={submitError}
                  onUpdate={updateField}
                  onSelectTipo={selectTipo}
                  onToggleAceite={toggleAceite}
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
