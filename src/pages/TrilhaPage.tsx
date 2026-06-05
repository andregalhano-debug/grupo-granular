import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Clock, ChevronDown, Lock, Trophy, X } from 'lucide-react'
import { trailModules } from '../data/trailData'
import type { Lesson } from '../data/trailData'
import { useTrailProgress } from '../hooks/useTrailProgress'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function LessonViewer({ lesson, onClose, timeSpent, canComplete, completed, onComplete }: {
  lesson: Lesson
  onClose: () => void
  timeSpent: number
  canComplete: boolean
  completed: boolean
  onComplete: () => void
}) {
  const requiredSeconds = lesson.durationMinutes * 60 * 0.8
  const progressPercent = Math.min(100, Math.round((timeSpent / requiredSeconds) * 100))

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header fixo */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer">
            <ArrowLeft size={16} /> Voltar à trilha
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[#9C958A]">
              <Clock size={12} />
              {formatTime(timeSpent)} / {lesson.durationMinutes} min
            </div>
            {!completed && (
              <div className="w-24 h-1.5 rounded-full bg-[#0E0E0F]/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${canComplete ? 'bg-green-500' : 'bg-[#A31631]'}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
            {completed && (
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle2 size={14} /> Concluído
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
            lesson.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-[#A31631]/10 text-[#A31631]'
          }`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {lesson.type === 'video' ? 'Vídeo' : 'Leitura'}
          </span>
          <span className="text-[10px] text-[#9C958A]">{lesson.durationMinutes} min</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E0F] mb-8">{lesson.title}</h1>

        {lesson.type === 'video' && lesson.videoUrl && (
          <div className="aspect-video rounded-xl overflow-hidden bg-black mb-8">
            <iframe
              src={lesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="prose prose-sm max-w-none text-[#0E0E0F] leading-relaxed">
          {lesson.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('|')) {
              const rows = paragraph.split('\n').filter((r) => r.trim() && !r.match(/^\|[-\s|]+\|$/))
              return (
                <div key={i} className="overflow-x-auto my-4">
                  <table className="w-full text-xs border-collapse">
                    {rows.map((row, ri) => {
                      const cells = row.split('|').filter(Boolean).map((c) => c.trim())
                      const Tag = ri === 0 ? 'th' : 'td'
                      return (
                        <tr key={ri} className={ri === 0 ? 'bg-[#F7F7F7]' : ri % 2 === 0 ? 'bg-[#F7F7F7]/50' : ''}>
                          {cells.map((cell, ci) => (
                            <Tag key={ci} className={`px-3 py-2 text-left border border-[#0E0E0F]/10 ${ri === 0 ? 'font-semibold text-[#0E0E0F]' : 'text-[#9C958A]'}`}>
                              {cell}
                            </Tag>
                          ))}
                        </tr>
                      )
                    })}
                  </table>
                </div>
              )
            }

            if (paragraph.startsWith('- [ ]') || paragraph.includes('\n- [ ]')) {
              const items = paragraph.split('\n').filter((l) => l.startsWith('- [ ]'))
              return (
                <div key={i} className="my-4 space-y-2">
                  {items.map((item, ii) => (
                    <div key={ii} className="flex items-start gap-2 text-sm text-[#9C958A]">
                      <Circle size={14} className="mt-0.5 text-[#A31631] flex-shrink-0" />
                      {item.replace('- [ ] ', '')}
                    </div>
                  ))}
                </div>
              )
            }

            return (
              <p key={i} className="mb-4 text-sm leading-relaxed whitespace-pre-line">
                {paragraph.split(/(\*\*[^*]+\*\*)/).map((part, pi) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pi} className="font-semibold text-[#0E0E0F]">{part.slice(2, -2)}</strong>
                  }
                  return <span key={pi}>{part}</span>
                })}
              </p>
            )
          })}
        </div>
      </div>

      {/* Footer fixo — botão de concluir */}
      <div className="sticky bottom-0 bg-white border-t border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {completed ? (
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <CheckCircle2 size={18} />
              Etapa concluída
            </div>
          ) : canComplete ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 size={16} />
              Marcar como concluído
            </button>
          ) : (
            <div className="flex items-center gap-2 text-sm text-[#9C958A]">
              <Lock size={14} />
              Continue lendo para liberar a conclusão ({progressPercent}%)
            </div>
          )}
          <button onClick={onClose} className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function TrilhaPage() {
  const trail = useTrailProgress()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const activeLesson = trail.activeLessonId
    ? trailModules.flatMap((m) => m.lessons).find((l) => l.id === trail.activeLessonId) || null
    : null

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#0E0E0F]/10 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/painel-consultor" className="text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-[#0E0E0F]">Trilha de Conhecimento</h1>
              <p className="text-xs text-[#9C958A]">Plataforma e Metodologia de Consultoria</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-[#0E0E0F]">{trail.overallPercent}%</p>
              <p className="text-[10px] text-[#9C958A]">{trail.completedCount}/{trail.totalLessons} etapas</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#A31631]/10 flex items-center justify-center">
              {trail.overallPercent === 100 ? (
                <Trophy size={18} className="text-[#A31631]" />
              ) : (
                <BookOpen size={18} className="text-[#A31631]" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Barra de progresso geral */}
      <div className="bg-white border-b border-[#0E0E0F]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="w-full h-2 rounded-full bg-[#0E0E0F]/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#A31631] transition-all duration-500"
              style={{ width: `${trail.overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Módulos */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {trail.overallPercent === 100 && (
          <div className="rounded-2xl bg-[#A31631]/5 border border-[#A31631]/20 p-6 text-center">
            <Trophy size={32} className="text-[#A31631] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#0E0E0F] mb-1">Trilha concluída!</h2>
            <p className="text-sm text-[#9C958A]">Você completou toda a trilha de conhecimento. Está pronto para atender com a metodologia Granular.</p>
          </div>
        )}

        {trailModules.map((mod) => {
          const modProgress = trail.getModuleProgress(mod.id)
          return (
            <ModuleCard
              key={mod.id}
              module={mod}
              progress={modProgress}
              trail={trail}
            />
          )
        })}
      </main>

      {/* Lesson viewer overlay */}
      {activeLesson && (
        <LessonViewer
          lesson={activeLesson}
          onClose={trail.closeLesson}
          timeSpent={trail.getTimeSpent(activeLesson.id)}
          canComplete={trail.canComplete(activeLesson)}
          completed={trail.isCompleted(activeLesson.id)}
          onComplete={() => trail.markCompleted(activeLesson.id)}
        />
      )}
    </div>
  )
}

function ModuleCard({ module, progress, trail }: {
  module: typeof trailModules[0]
  progress: { completed: number; total: number; percent: number }
  trail: ReturnType<typeof useTrailProgress>
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="rounded-2xl bg-white border border-[#0E0E0F]/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 sm:p-6 cursor-pointer"
      >
        <div className="text-left">
          <h2 className="text-base font-bold text-[#0E0E0F]">{module.title}</h2>
          <p className="text-xs text-[#9C958A] mt-1">{module.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0E0E0F]">{progress.completed}/{progress.total}</p>
            <div className="w-16 h-1.5 rounded-full bg-[#0E0E0F]/10 mt-1 overflow-hidden">
              <div className="h-full rounded-full bg-[#A31631] transition-all" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
          <ChevronDown size={16} className={`text-[#9C958A] transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#0E0E0F]/5">
          {module.lessons.map((lesson, i) => {
            const completed = trail.isCompleted(lesson.id)
            const timeSpent = trail.getTimeSpent(lesson.id)
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => trail.openLesson(lesson.id)}
                className={`w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left transition-colors cursor-pointer ${
                  i < module.lessons.length - 1 ? 'border-b border-[#0E0E0F]/5' : ''
                } ${completed ? 'bg-green-50/50' : 'hover:bg-[#F7F7F7]'}`}
              >
                <div className="flex-shrink-0">
                  {completed ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Circle size={20} className="text-[#9C958A]/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${completed ? 'text-green-700' : 'text-[#0E0E0F]'}`}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[10px] font-medium uppercase tracking-wider ${
                      lesson.type === 'video' ? 'text-purple-500' : 'text-[#9C958A]'
                    }`}>
                      {lesson.type === 'video' ? 'Vídeo' : 'Leitura'}
                    </span>
                    <span className="text-[10px] text-[#9C958A]">{lesson.durationMinutes} min</span>
                    {timeSpent > 0 && !completed && (
                      <span className="text-[10px] text-[#A31631]">{formatTime(timeSpent)} lidos</span>
                    )}
                  </div>
                </div>
                <ChevronDown size={14} className="text-[#9C958A] -rotate-90 flex-shrink-0" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

