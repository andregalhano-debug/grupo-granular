import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { useT } from '../i18n/useT'
import type { Category } from './Modules'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é o Especialista sob demanda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na Granular, o Especialista sob demanda orienta, diagnostica e constrói junto o plano de ação. O objetivo é que, ao final do período, sua operação funcione com autonomia — sem criar dependência.',
      },
    },
    {
      '@type': 'Question',
      name: 'Todos os blocos estão disponíveis em qualquer pacote do Especialista sob demanda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Operação, financeiro, estoque, cardápio, iFood e RH podem ser trabalhados em qualquer um dos 3 pacotes (1, 3 ou 6 meses). Após o diagnóstico inicial, especialista e cliente definem juntos quais blocos serão priorizados.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que está incluso nos pacotes do Especialista sob demanda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '4 horas mensais com especialista, diagnóstico completo da operação, plano de ação com metas e responsáveis, relatório semanal de evolução, suporte contínuo durante o período e o Módulo 1 do sistema incluso. A visita in loco é negociada à parte.',
      },
    },
    {
      '@type': 'Question',
      name: 'O sistema é obrigatório para contratar o Especialista sob demanda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Você pode contratar o Especialista sob demanda sem o sistema. No entanto, o Módulo 1 já está incluso em todos os pacotes para que o especialista tenha acesso aos dados da sua operação e faça um diagnóstico mais preciso.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso contratar somente o sistema sem Especialista sob demanda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O Granular Food pode ser contratado de forma independente nos Módulos 1, 2 ou 3. Cada módulo amplia as funcionalidades disponíveis, desde dashboard e KDS até estoque, checklist, RH e produção.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre os Módulos 1, 2 e 3 do sistema?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Módulo 1: Dashboard, operações, KDS e relatórios. Módulo 2: tudo do 1 + controle de estoque e checklists operacionais. Módulo 3: tudo do 2 + gestão de pessoas (RH), produção com fichas técnicas, CMV e suporte técnico. Os três módulos estão com valores sob consulta — fale com a gente para um orçamento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona o pagamento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O sistema é cobrado mensalmente por cartão de crédito ou Pix. O acompanhamento com especialista pode ser pago no cartão (mensal) ou via Pix à vista com 3% de desconto. Ao final do período, o sistema continua ativo no mesmo cartão já autorizado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso cancelar a qualquer momento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Os planos de sistema podem ser cancelados a qualquer momento. Os pacotes de Especialista sob demanda têm o período contratado (1, 3 ou 6 meses) com compromisso durante a vigência.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo leva para ver resultados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clientes com diagnóstico claro e execução do plano de ação costumam ver impacto nos KPIs já nas primeiras semanas. Operações com CMV descontrolado, por exemplo, conseguem reduzir 3–5 pontos percentuais no primeiro mês.',
      },
    },
  ],
}

const VISIBLE_COUNT = 4

interface Props {
  category?: Category
}

export function Faq({ category = 'restaurantes' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useT()

  // Reset ao trocar de categoria
  useEffect(() => {
    setOpenIndex(null)
    setExpanded(false)
  }, [category])

  const collapse = () => {
    setExpanded(false)
    setOpenIndex(null)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const faqs = t.faqItems[category]
  const visibleFaqs = expanded ? faqs : faqs.slice(0, VISIBLE_COUNT)
  const remaining = faqs.length - VISIBLE_COUNT

  return (
    <section ref={sectionRef} id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            {t.faq.sectionTitle}
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg">
            {t.faq.subtitles[category]}
          </p>
        </FadeIn>

        <div className="space-y-2">
          {visibleFaqs.map((faq, i) => (
            <FadeIn key={`${category}-${i}`} delay={i * 30}>
              <div className="rounded-xl border border-[#9C958A]/15 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left cursor-pointer hover:bg-[#F7F7F7]/50 transition-colors"
                >
                  <span className="text-sm font-medium text-[#0E0E0F]">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#9C958A] flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-4 sm:px-5 pb-3.5 sm:pb-4">
                    <p className="text-sm text-[#9C958A] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {!expanded && remaining > 0 && (
          <FadeIn delay={VISIBLE_COUNT * 30}>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-6 mx-auto flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors cursor-pointer"
            >
              {t.faq.showMore} {remaining} {remaining === 1 ? t.faq.question : t.faq.questions}
              <ChevronDown size={16} />
            </button>
          </FadeIn>
        )}

        {expanded && (
          <FadeIn delay={0}>
            <button
              type="button"
              onClick={collapse}
              className="mt-6 mx-auto flex items-center gap-2 text-sm font-medium text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer"
            >
              <ChevronUp size={16} />
              {t.faq.collapse}
            </button>
          </FadeIn>
        )}

        {/* CTA Seja Consultor */}
        <FadeIn delay={200}>
          <div className="mt-12 rounded-2xl border border-[var(--accent-15)] bg-[var(--accent-05)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-10)] flex items-center justify-center flex-shrink-0">
              <GraduationCap size={28} className="text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#0E0E0F] mb-1">{t.faq.joinTeam.title}</h3>
              <p className="text-sm text-[#9C958A]">{t.faq.joinTeam.desc}</p>
            </div>
            <Link
              to="/seja-consultor"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              {t.faq.joinTeam.cta}
              <ChevronDown size={14} className="rotate-[-90deg]" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
