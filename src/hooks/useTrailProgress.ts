import { useState, useEffect, useCallback, useRef } from 'react'
import { trailModules } from '../data/trailData'
import type { Lesson } from '../data/trailData'

const STORAGE_KEY = 'granular-trail-progress'

interface LessonProgress {
  completed: boolean
  timeSpentSeconds: number
}

type ProgressMap = Record<string, LessonProgress>

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {}
}

function saveProgress(progress: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {}
}

export function useTrailProgress() {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isVisibleRef = useRef(true)

  // Persist on change
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  // Visibility API — pause timer when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Timer: count seconds while lesson is active and page is visible
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    if (!activeLessonId) return

    timerRef.current = setInterval(() => {
      if (!isVisibleRef.current) return
      setProgress((prev) => {
        const current = prev[activeLessonId] || { completed: false, timeSpentSeconds: 0 }
        return {
          ...prev,
          [activeLessonId]: { ...current, timeSpentSeconds: current.timeSpentSeconds + 1 },
        }
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeLessonId])

  const openLesson = useCallback((lessonId: string) => {
    setActiveLessonId(lessonId)
  }, [])

  const closeLesson = useCallback(() => {
    setActiveLessonId(null)
  }, [])

  const getTimeSpent = useCallback(
    (lessonId: string) => progress[lessonId]?.timeSpentSeconds || 0,
    [progress]
  )

  const isCompleted = useCallback(
    (lessonId: string) => progress[lessonId]?.completed || false,
    [progress]
  )

  const canComplete = useCallback(
    (lesson: Lesson) => {
      const spent = progress[lesson.id]?.timeSpentSeconds || 0
      const requiredSeconds = lesson.durationMinutes * 60 * 0.8 // 80% of estimated time
      return spent >= requiredSeconds
    },
    [progress]
  )

  const markCompleted = useCallback((lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      [lessonId]: { ...prev[lessonId], completed: true, timeSpentSeconds: prev[lessonId]?.timeSpentSeconds || 0 },
    }))
  }, [])

  // Stats
  const allLessons = trailModules.flatMap((m) => m.lessons)
  const totalLessons = allLessons.length
  const completedCount = allLessons.filter((l) => progress[l.id]?.completed).length
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const getModuleProgress = useCallback(
    (moduleId: string) => {
      const mod = trailModules.find((m) => m.id === moduleId)
      if (!mod) return { completed: 0, total: 0, percent: 0 }
      const total = mod.lessons.length
      const completed = mod.lessons.filter((l) => progress[l.id]?.completed).length
      return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 }
    },
    [progress]
  )

  return {
    activeLessonId,
    openLesson,
    closeLesson,
    getTimeSpent,
    isCompleted,
    canComplete,
    markCompleted,
    totalLessons,
    completedCount,
    overallPercent,
    getModuleProgress,
  }
}
