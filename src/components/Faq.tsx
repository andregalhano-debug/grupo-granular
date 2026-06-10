import { useState } from 'react'
import { ChevronDown, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'

const faqs = [
  {
    q: 'Qual a diferença entre consultoria e mentoria?',
    a: 'Na Granular, usamos o modelo de mentoria: o mentor não executa por você, ele orienta, diagnostica e constrói junto o plano de ação. A diferença é que o mentor transfere conhecimento para que sua equipe ganhe autonomia, enquanto a consultoria tradicional cria dependência. O objetivo é que, ao final do período, sua operação funcione sem precisar do mentor.',
  },
  {
    q: 'Todos os blocos estão disponíveis em qualquer pacote de mentoria?',
    a: 'Sim. Operação, financeiro, estoque, cardápio, iFood e RH podem ser trabalhados em qualquer um dos 3 pacotes (1, 3 ou 6 meses). Após o diagnóstico inicial, mentor e cliente definem juntos quais blocos serão priorizados de acordo com a necessidade do negócio e o tempo contratado.',
  },
  {
    q: 'O que está incluso nos pacotes de mentoria?',
    a: '4 horas mensais de mentoria, diagnóstico completo da operação, plano de ação com metas e responsáveis, relatório semanal de evolução, suporte contínuo durante o período e o Módulo 1 do sistema incluso. A visita in loco é negociada à parte.',
  },
  {
    q: 'O sistema é obrigatório para contratar a mentoria?',
    a: 'Não. Você pode contratar a mentoria sem o sistema. No entanto, o Módulo 1 já está incluso em todos os pacotes de mentoria para que o mentor tenha acesso aos dados da sua operação e possa fazer um diagnóstico mais preciso.',
  },
  {
    q: 'Posso contratar somente o sistema sem mentoria?',
    a: 'Sim. O sistema Granular pode ser contratado de forma independente nos Módulos 1, 2 ou 3. Cada módulo amplia as funcionalidades disponíveis, desde dashboard e KDS até estoque, checklist, RH e produção.',
  },
  {
    q: 'Qual a diferença entre os Módulos 1, 2 e 3 do sistema?',
    a: 'Módulo 1 (R$ 89/mês): Dashboard, operações, KDS e relatórios. Módulo 2 (R$ 489/mês): tudo do 1 + controle de estoque e checklists operacionais. Módulo 3 (R$ 3.899/mês): tudo do 2 + gestão de pessoas (RH), produção com fichas técnicas, CMV e suporte técnico.',
  },
  {
    q: 'O módulo Pessoas (RH) pode ser contratado separadamente?',
    a: 'Sim. O módulo Pessoas (RH) está disponível de forma avulsa por R$ 599/mês, com recrutamento, controle de entrevistas, escalas, documentos, avaliação de desempenho e gestão de turnover.',
  },
  {
    q: 'O que é a integração com a Foozi?',
    a: 'A Foozi é nossa parceira em atendimento digital e gestão de compras. Com a integração, você acessa +2.000 fornecedores homologados com cotação e negociação gerenciadas na Granular. Há duas opções: somente o sistema (350/mês) ou com Executivo de Compras dedicado (1.500/mês, sistema incluso).',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'O sistema é cobrado mensalmente por cartão de crédito ou Pix. A mentoria pode ser paga no cartão (mensal) ou via Pix à vista com 3% de desconto. Ao final da mentoria, o sistema continua ativo no mesmo cartão já autorizado.',
  },
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim. Os planos de sistema podem ser cancelados a qualquer momento. Os pacotes de mentoria têm o período contratado (1, 3 ou 6 meses) com compromisso durante a vigência.',
  },
  {
    q: 'Quanto tempo leva para ver resultados?',
    a: 'Depende do estado atual da operação, mas clientes com diagnóstico claro e execução do plano de ação costumam ver impacto nos KPIs já nas primeiras semanas. Operações com CMV descontrolado, por exemplo, conseguem reduzir 3-5 pontos percentuais no primeiro mês.',
  },
  {
    q: 'O sistema funciona para qualquer tipo de negócio?',
    a: 'Sim. O Grupo Granular atende restaurantes, supermercados, atacarejos, farmácias, pet shops, dentre outros segmentos. Com foco na transformação do delivery e da gestão consolidada dos canais e operações. O sistema é multi-loja com visões apartadas e benchmark entre unidades.',
  },
]

const VISIBLE_COUNT = 3

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)

  const visibleFaqs = expanded ? faqs : faqs.slice(0, VISIBLE_COUNT)

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg">
            Tire suas dúvidas sobre sistema, mentoria e integrações.
          </p>
        </FadeIn>

        <div className="space-y-2">
          {visibleFaqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 30}>
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

        {!expanded && (
          <FadeIn delay={VISIBLE_COUNT * 30}>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-6 mx-auto flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors cursor-pointer"
            >
              Ver mais {faqs.length - VISIBLE_COUNT} perguntas
              <ChevronDown size={16} />
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
              <h3 className="text-base font-bold text-[#0E0E0F] mb-1">Quer fazer parte do time Granular?</h3>
              <p className="text-sm text-[#9C958A]">Seja um consultor credenciado e ajude operações de delivery a crescerem com inteligência.</p>
            </div>
            <Link
              to="/seja-consultor"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              Seja Consultor
              <ChevronDown size={14} className="rotate-[-90deg]" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
