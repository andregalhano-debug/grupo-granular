import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import type { Category } from './Modules'

interface FaqItem { q: string; a: string }

const faqsByCategory: Record<Category, FaqItem[]> = {
  restaurantes: [
    {
      q: 'O que é o Especialista sob demanda?',
      a: 'Na Granular, o Especialista sob demanda orienta, diagnostica e constrói junto o plano de ação. O objetivo é que, ao final do período, sua operação funcione com autonomia — sem criar dependência.',
    },
    {
      q: 'Todos os blocos estão disponíveis em qualquer pacote do Especialista sob demanda?',
      a: 'Sim. Operação, financeiro, estoque, cardápio, iFood e RH podem ser trabalhados em qualquer um dos 3 pacotes (1, 3 ou 6 meses). Após o diagnóstico inicial, especialista e cliente definem juntos quais blocos serão priorizados.',
    },
    {
      q: 'O que está incluso nos pacotes do Especialista sob demanda?',
      a: '4 horas mensais com especialista, diagnóstico completo da operação, plano de ação com metas e responsáveis, relatório semanal de evolução, suporte contínuo durante o período e o Módulo 1 do sistema incluso. A visita in loco é negociada à parte.',
    },
    {
      q: 'O sistema é obrigatório para contratar o Especialista sob demanda?',
      a: 'Não. Você pode contratar o Especialista sob demanda sem o sistema. No entanto, o Módulo 1 já está incluso em todos os pacotes para que o especialista tenha acesso aos dados da sua operação e faça um diagnóstico mais preciso.',
    },
    {
      q: 'Posso contratar somente o sistema sem Especialista sob demanda?',
      a: 'Sim. O Granular Food pode ser contratado de forma independente nos Módulos 1, 2 ou 3. Cada módulo amplia as funcionalidades disponíveis, desde dashboard e KDS até estoque, checklist, RH e produção.',
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
      q: 'Como funciona o pagamento?',
      a: 'O sistema é cobrado mensalmente por cartão de crédito ou Pix. O acompanhamento com especialista pode ser pago no cartão (mensal) ou via Pix à vista com 3% de desconto. Ao final do período, o sistema continua ativo no mesmo cartão já autorizado.',
    },
    {
      q: 'Posso cancelar a qualquer momento?',
      a: 'Sim. Os planos de sistema podem ser cancelados a qualquer momento. Os pacotes de Especialista sob demanda têm o período contratado (1, 3 ou 6 meses) com compromisso durante a vigência.',
    },
    {
      q: 'Quanto tempo leva para ver resultados?',
      a: 'Clientes com diagnóstico claro e execução do plano de ação costumam ver impacto nos KPIs já nas primeiras semanas. Operações com CMV descontrolado, por exemplo, conseguem reduzir 3–5 pontos percentuais no primeiro mês.',
    },
  ],

  mercados: [
    {
      q: 'O que é o Granular Market?',
      a: 'O Granular Market é a solução de gestão completa para supermercados, atacarejos e atacados. Centraliza operação, financeiro, estoque, televendas e gestão de pessoas em um único painel, com visão multi-loja e benchmark entre unidades.',
    },
    {
      q: 'Como funciona a precificação do sistema para mercados?',
      a: 'O sistema é precificado sob consulta, de acordo com o porte da operação, número de PDVs e módulos contratados. Agende uma demonstração para receber uma proposta personalizada.',
    },
    {
      q: 'O módulo Televendas está incluso no sistema base?',
      a: 'Não. O Televendas é um módulo avulso disponível por R$ 419/mês. Ele pode ser contratado de forma independente e transforma a produtividade dos vendedores: do pedido verbal à proposta comercial enviada em menos de 2 minutos, integrado diretamente ao Granular Market.',
    },
    {
      q: 'O que o módulo Televendas inclui?',
      a: 'Sistema de aceleração de propostas comerciais: busca de produtos por nome, código ou EAN, edição inline de preço e desconto com controle de alçada por cargo, exportação por WhatsApp ou PDF, Modo UltraFast (pedido verbal → proposta em menos de 2 min), dashboard de performance por vendedor, CRM com histórico de clientes e agentes de IA para apoio comercial — tudo integrado ao Granular Market.',
    },
    {
      q: 'O sistema suporta múltiplos PDVs e filiais?',
      a: 'Sim. O Granular Market é multi-loja, com visões apartadas por unidade e benchmark consolidado entre filiais. Ideal para redes de supermercados, atacarejos com múltiplos pontos e operações de atacado.',
    },
    {
      q: 'O módulo Pessoas (RH) pode ser contratado separadamente?',
      a: 'Sim. O módulo Pessoas (RH) está disponível de forma avulsa por R$ 599/mês, com recrutamento, escalas, documentos, avaliação de desempenho e controle de turnover para equipes de mercado.',
    },
    {
      q: 'O sistema funciona para atacarejo e atacado?',
      a: 'Sim. O Granular Market atende supermercados, atacarejos e atacados. A solução é adaptada ao modelo de operação de cada formato, incluindo gestão de grandes volumes, compras e vendas no atacado.',
    },
    {
      q: 'Como funciona o Especialista sob demanda para o segmento de mercados?',
      a: 'O Especialista sob demanda para mercados foca em rentabilidade, gestão de compras, mix de produtos, perdas e gestão de equipe. Os pacotes são personalizados (1, 3 ou 6 meses) após um diagnóstico inicial da operação.',
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'O sistema é precificado sob consulta e formalizado em contrato. Módulos avulsos (Televendas e Pessoas) são cobrados mensalmente. Entre em contato para detalhar as condições do seu projeto.',
    },
    {
      q: 'Posso cancelar a qualquer momento?',
      a: 'Os módulos avulsos podem ser cancelados a qualquer momento. O sistema base e o Especialista sob demanda seguem os termos do contrato firmado. Nossa equipe orienta as melhores condições para o seu porte.',
    },
  ],

  farmacias: [
    {
      q: 'Quando o Granular Farma estará disponível?',
      a: 'O Granular Farma está em desenvolvimento com previsão de lançamento em breve. Estamos construindo módulos específicos para o segmento farmacêutico, incluindo controle de medicamentos, receituário e regulatório. Agende uma demonstração para ser avisado no lançamento.',
    },
    {
      q: 'O que estará incluso no Granular Farma?',
      a: 'O Granular Farma incluirá gestão de estoque de medicamentos com rastreabilidade, controle de receituário, integração com regulatório, financeiro, gestão de pessoas e relatórios operacionais — tudo em um único painel adaptado ao segmento farmacêutico.',
    },
    {
      q: 'O módulo Pessoas (RH) já está disponível para farmácias?',
      a: 'Sim. O módulo Pessoas (RH) já pode ser contratado de forma avulsa por R$ 599/mês, independentemente do sistema. Inclui recrutamento, escalas, documentos, avaliação de desempenho e gestão de turnover.',
    },
    {
      q: 'Posso agendar uma demonstração agora?',
      a: 'Sim. Mesmo com o sistema em desenvolvimento, você pode agendar uma demonstração para conhecer a solução, tirar dúvidas e garantir condições especiais de early adopter no lançamento.',
    },
    {
      q: 'Como funciona o Especialista sob demanda para o segmento farmacêutico?',
      a: 'O Especialista sob demanda Granular já está disponível para farmácias. Nossa equipe orienta gestão operacional, financeiro, equipe e processos regulatórios — com pacotes de 1, 3 ou 6 meses, definidos após diagnóstico da operação.',
    },
    {
      q: 'Vocês atendem redes farmacêuticas e drogarias independentes?',
      a: 'Sim. A solução será adaptada tanto para redes com múltiplas unidades quanto para drogarias independentes. A estrutura multi-loja com visões apartadas e benchmark entre unidades estará disponível desde o lançamento.',
    },
  ],

  petshop: [
    {
      q: 'Quando o Granular PET estará disponível?',
      a: 'O Granular PET está em desenvolvimento com previsão de lançamento em breve. Estamos construindo módulos específicos para clínicas veterinárias e pet shops, com foco em agendamentos, prontuários e gestão da operação. Agende uma demonstração para ser avisado no lançamento.',
    },
    {
      q: 'O que estará incluso no Granular PET?',
      a: 'O Granular PET incluirá gestão de agendamentos (banho, tosa, consultas), prontuário veterinário digital, controle de estoque de produtos e medicamentos, financeiro, gestão de pessoas e relatórios de performance — adaptados à realidade de clínicas e pet shops.',
    },
    {
      q: 'O módulo Pessoas (RH) já está disponível para pet shops?',
      a: 'Sim. O módulo Pessoas (RH) já pode ser contratado de forma avulsa por R$ 599/mês. Inclui recrutamento, escalas, documentos, avaliação de desempenho e controle de turnover — ideal para equipes de pet shops e clínicas veterinárias.',
    },
    {
      q: 'Posso agendar uma demonstração agora?',
      a: 'Sim. Mesmo com o sistema em desenvolvimento, você pode agendar uma demonstração para conhecer a solução, tirar dúvidas e garantir condições especiais de early adopter no lançamento.',
    },
    {
      q: 'Como funciona o Especialista sob demanda para clínicas veterinárias e pet shops?',
      a: 'O Especialista sob demanda Granular já está disponível para o segmento. Nossa equipe orienta gestão da operação, financeiro, atendimento e equipe. Pacotes de 1, 3 ou 6 meses, definidos após diagnóstico inicial do negócio.',
    },
    {
      q: 'Vocês atendem tanto clínicas veterinárias quanto pet shops?',
      a: 'Sim. O Granular PET atenderá ambos os formatos, com adaptações para as especificidades de cada operação — desde uma clínica veterinária completa até um pet shop focado em serviços de banho e tosa.',
    },
  ],
}

const subtitleByCategory: Record<Category, string> = {
  restaurantes: 'Tire suas dúvidas sobre sistema, especialista sob demanda e módulos.',
  mercados:     'Tire suas dúvidas sobre o Granular Market, Televendas e módulos.',
  farmacias:    'Tire suas dúvidas sobre o Granular Farma e o que está por vir.',
  petshop:      'Tire suas dúvidas sobre o Granular PET e o que está por vir.',
}

const VISIBLE_COUNT = 4

interface Props {
  category?: Category
}

export function Faq({ category = 'restaurantes' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const faqs = faqsByCategory[category]
  const visibleFaqs = expanded ? faqs : faqs.slice(0, VISIBLE_COUNT)
  const remaining = faqs.length - VISIBLE_COUNT

  return (
    <section ref={sectionRef} id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0E0F] mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-[#9C958A] text-base sm:text-lg">
            {subtitleByCategory[category]}
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
              Ver mais {remaining} {remaining === 1 ? 'pergunta' : 'perguntas'}
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
              Recolher perguntas
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
              <p className="text-sm text-[#9C958A]">Seja um especialista credenciado e ajude operações a crescerem com inteligência.</p>
            </div>
            <Link
              to="/seja-consultor"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap flex-shrink-0"
            >
              Seja um Mentor
              <ChevronDown size={14} className="rotate-[-90deg]" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
