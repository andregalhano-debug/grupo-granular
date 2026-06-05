import { CheckCircle2, MessageCircle, Calendar, Plug, BarChart3, Users, Rocket, FileText } from 'lucide-react'

interface TimelineStep {
  icon: typeof CheckCircle2
  title: string
  desc: string
  time: string
  done: boolean
}

const steps: TimelineStep[] = [
  {
    icon: CheckCircle2,
    title: 'Pedido confirmado',
    desc: 'Seu pedido foi registrado com sucesso. Você receberá um e-mail de confirmação.',
    time: 'Agora',
    done: true,
  },
  {
    icon: MessageCircle,
    title: 'Contato pelo WhatsApp',
    desc: 'Um especialista Granular entrará em contato para alinhar os próximos passos e agendar o onboarding.',
    time: 'Em até 2 horas',
    done: false,
  },
  {
    icon: Calendar,
    title: 'Reunião de onboarding',
    desc: 'Apresentação do sistema, configuração da conta e definição do plano de implantação personalizado.',
    time: 'Em até 24 horas',
    done: false,
  },
  {
    icon: Plug,
    title: 'Integração iFood',
    desc: 'Ativação com 1 clique no Portal do Parceiro iFood. Pedidos, métricas e avaliações integrados ao painel Granular.',
    time: 'Dia 1-2',
    done: false,
  },
  {
    icon: BarChart3,
    title: 'Configuração do sistema',
    desc: 'Cadastro de produtos, fichas técnicas, estoque inicial e configuração do financeiro conforme sua operação.',
    time: 'Dia 2-5',
    done: false,
  },
  {
    icon: Users,
    title: 'Treinamento da equipe',
    desc: 'Treinamento prático para a equipe no KDS, checklists e rotinas operacionais do dia a dia.',
    time: 'Dia 5-7',
    done: false,
  },
  {
    icon: FileText,
    title: 'Primeiro relatório semanal',
    desc: 'Receba o primeiro relatório com KPIs da operação: CMV, ticket médio, tempo de preparo e nota iFood.',
    time: 'Dia 7',
    done: false,
  },
  {
    icon: Rocket,
    title: 'Operação rodando com a Granular',
    desc: 'Sistema integrado, equipe treinada, dados fluindo. Sua operação no controle com gestão por dados.',
    time: 'Dia 10',
    done: false,
  },
]

export function OnboardingTimeline() {
  return (
    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-4 sm:p-6">
      <h3 className="font-bold text-[#0E0E0F] mb-2">Cronograma de implantação</h3>
      <p className="text-xs text-[#9C958A] mb-6">Acompanhe cada etapa até sua operação estar 100% no ar.</p>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.done ? 'bg-green-100' : 'bg-[#A31631]/10'
              }`}>
                <step.icon size={16} className={step.done ? 'text-green-600' : 'text-[#A31631]'} />
              </div>
              {i < steps.length - 1 && (
                <div className={`w-px h-full min-h-[24px] my-1 ${step.done ? 'bg-green-300' : 'bg-[#0E0E0F]/10'}`} />
              )}
            </div>
            <div className="pb-5 sm:pb-6 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium text-[#0E0E0F]">{step.title}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  step.done
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#0E0E0F]/5 text-[#9C958A]'
                }`}>
                  {step.time}
                </span>
              </div>
              <p className="text-xs text-[#9C958A] mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
