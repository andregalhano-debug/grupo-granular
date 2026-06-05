import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Plan } from '../data/plans'
import type { Consultant } from '../data/consultants'

export interface CartConsultant {
  id: string
  name: string
  title: string
  specialty: string
  rating: number
  reviewCount: number
  hourlyRate: number
  slot: string | null
}

export interface CartAddon {
  id: string
  name: string
  description: string
}

interface CartState {
  plans: Plan[]
  consultants: CartConsultant[]
  addons: CartAddon[]
}

interface CartContextValue {
  plans: Plan[]
  consultants: CartConsultant[]
  addons: CartAddon[]
  addPlan: (plan: Plan) => void
  removePlan: (planId: string) => void
  addConsultant: (consultant: Consultant, slot: string | null) => void
  removeConsultant: (consultantId: string) => void
  updateConsultantSlot: (consultantId: string, slot: string | null) => void
  addAddon: (addon: CartAddon) => void
  removeAddon: (addonId: string) => void
  clearCart: () => void
  itemCount: number
}

const STORAGE_KEY = 'granular-cart'

function loadCart(): CartState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { plans: parsed.plans || [], consultants: parsed.consultants || [], addons: parsed.addons || [] }
    }
  } catch {}
  return { plans: [], consultants: [], addons: [] }
}

function saveCart(state: CartState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      plans: state.plans,
      consultants: state.consultants,
      addons: state.addons,
    }))
  } catch {}
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function useCartState(): CartContextValue {
  const [plans, setPlans] = useState<Plan[]>(() => loadCart().plans)
  const [consultants, setConsultants] = useState<CartConsultant[]>(() => loadCart().consultants)
  const [addons, setAddons] = useState<CartAddon[]>(() => loadCart().addons)

  useEffect(() => {
    saveCart({ plans, consultants, addons })
  }, [plans, consultants, addons])

  const addPlan = useCallback((plan: Plan) => {
    setPlans((prev) => {
      const filtered = prev.filter((p) => p.type !== plan.type)
      const updated = [...filtered, plan]
      return updated.sort((a, b) => (a.type === 'saas' ? -1 : 1) - (b.type === 'saas' ? -1 : 1))
    })
  }, [])

  const removePlan = useCallback((planId: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== planId))
  }, [])

  const addConsultant = useCallback((consultant: Consultant, slot: string | null) => {
    setConsultants((prev) => {
      // Evitar duplicata
      const filtered = prev.filter((c) => c.id !== consultant.id)
      return [...filtered, {
        id: consultant.id,
        name: consultant.name,
        title: consultant.title,
        specialty: consultant.specialty,
        rating: consultant.rating,
        reviewCount: consultant.reviewCount,
        hourlyRate: consultant.hourlyRate,
        slot,
      }]
    })
  }, [])

  const removeConsultant = useCallback((consultantId: string) => {
    setConsultants((prev) => prev.filter((c) => c.id !== consultantId))
  }, [])

  const updateConsultantSlot = useCallback((consultantId: string, slot: string | null) => {
    setConsultants((prev) => prev.map((c) => c.id === consultantId ? { ...c, slot } : c))
  }, [])

  const addAddon = useCallback((addon: CartAddon) => {
    setAddons((prev) => {
      if (prev.some((a) => a.id === addon.id)) return prev
      return [...prev, addon]
    })
  }, [])

  const removeAddon = useCallback((addonId: string) => {
    setAddons((prev) => prev.filter((a) => a.id !== addonId))
  }, [])

  const clearCart = useCallback(() => {
    setPlans([])
    setConsultants([])
    setAddons([])
  }, [])

  const itemCount = plans.length + consultants.length + addons.length

  return { plans, consultants, addons, addPlan, removePlan, addConsultant, removeConsultant, updateConsultantSlot, addAddon, removeAddon, clearCart, itemCount }
}
