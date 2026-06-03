import { CheckCircle2, MessageCircle, Calendar, Rocket } from 'lucide-react'

const steps = [
  { icon: CheckCircle2, title: 'Pedido confirmado', time: 'Agora mesmo', done: true },
  { icon: MessageCircle, title: 'Consultor entra em contato via WhatsApp', time: 'Em ate 2 horas', done: false },
  { icon: Calendar, title: 'Reuniao de onboarding agendada', time: 'Em ate 24 horas', done: false },
  { icon: Rocket, title: 'Sua operacao comeca a decolar', time: 'Em ate 7 dias', done: false },
]

export function OnboardingTimeline() {
  return (
    <div className="rounded-2xl border border-[#0E0E0F]/10 bg-[#F7F7F7] p-6">
      <h3 className="font-bold text-[#0E0E0F] mb-6">Proximas etapas</h3>
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            {/* Linha vertical + icone */}
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.done ? 'bg-green-100' : 'bg-[#EA1D2C]/10'
              }`}>
                <step.icon size={18} className={step.done ? 'text-green-600' : 'text-[#EA1D2C]'} />
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-8 bg-[#0E0E0F]/10 my-1" />
              )}
            </div>
            {/* Texto */}
            <div className="pb-6">
              <p className="text-sm font-medium text-[#0E0E0F]">{step.title}</p>
              <p className="text-xs text-[#9C958A]">{step.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
