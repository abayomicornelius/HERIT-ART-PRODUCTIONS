import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  const [light, setLight] = useState(() => localStorage.getItem('hap_theme') === 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('light', light)
    localStorage.setItem('hap_theme', light ? 'light' : 'dark')
  }, [light])

  return (
    <ThemeContext.Provider value={{ light, toggle: () => setLight(l => !l) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
