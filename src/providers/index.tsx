import { IGlobalContext } from '@/typings'
import { createContext } from 'react'

export const GolbalConstext = createContext<IGlobalContext>({
  setUserInfo: () => {},
})

const themeContext = createContext({
  theme: null,
  setTheme: null,
})

export { themeContext }

