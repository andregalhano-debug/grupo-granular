import { createContext, useContext } from 'react'

interface CategoryAccentCtx {
  accent: string
  accentDark: string
}

export const CategoryContext = createContext<CategoryAccentCtx>({
  accent: '#A31631',
  accentDark: '#7A1025',
})

export const useCategoryAccent = () => useContext(CategoryContext)
