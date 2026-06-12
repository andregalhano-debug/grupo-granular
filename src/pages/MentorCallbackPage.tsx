import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function MentorCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/painel-consultor', { replace: true })
      } else {
        navigate('/mentor/entrar', { replace: true })
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#A31631] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#9C958A]">Autenticando...</p>
      </div>
    </div>
  )
}
