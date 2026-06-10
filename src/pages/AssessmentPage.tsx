import { useEffect } from 'react'
import { useAssessment } from '../hooks/useAssessment'
import { AssessmentShell } from '../components/assessment/AssessmentShell'
import { ContactStep } from '../components/assessment/ContactStep'
import { SelfAssessmentStep } from '../components/assessment/SelfAssessmentStep'
import { ScenarioStep } from '../components/assessment/ScenarioStep'
import { PriorityStep } from '../components/assessment/PriorityStep'
import { ResultStep } from '../components/assessment/ResultStep'

export function AssessmentPage() {
  const a = useAssessment()

  useEffect(() => { window.scrollTo(0, 0) }, [a.step])

  return (
    <AssessmentShell step={a.step} progressPercent={a.progressPercent}>
      {a.step === 'contact' && (
        <ContactStep
          contact={a.contact}
          errors={a.contactErrors}
          onUpdate={a.updateContact}
          onNext={a.goToSelfAssessment}
        />
      )}

      {a.step === 'self-assessment' && (
        <SelfAssessmentStep
          selfScores={a.selfScores}
          onUpdate={a.updateSelfScore}
          onNext={a.goToScenarios}
        />
      )}

      {a.step === 'scenarios' && a.currentScenario && (
        <ScenarioStep
          scenario={a.currentScenario}
          scenarioIndex={a.scenarioIndex}
          totalScenarios={a.selectedScenarios.length}
          onAnswer={a.answerScenario}
        />
      )}

      {a.step === 'priority' && (
        <PriorityStep
          priorityOrder={a.priorityOrder}
          onMove={a.movePriorityItem}
          onFinish={a.finishAssessment}
        />
      )}

      {a.step === 'result' && a.result && (
        <ResultStep
          result={a.result}
          contact={a.contact}
          onReset={a.resetAssessment}
        />
      )}
    </AssessmentShell>
  )
}
