import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ThemeMode = 'auto' | 'light' | 'dark'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  theme: ResolvedTheme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'
  const stored = localStorage.getItem('theme-mode')
  if (stored === 'auto' || stored === 'light' || stored === 'dark') return stored
  // Migrate old 'theme' key
  const legacy = localStorage.getItem('theme')
  if (legacy === 'dark' || legacy === 'light') {
    localStorage.removeItem('theme')
    return legacy
  }
  return 'auto'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'auto') return getSystemTheme()
  return mode
}

const CYCLE: ThemeMode[] = ['auto', 'dark', 'light']

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolveTheme(getInitialMode()))

  useEffect(() => {
    setTheme(resolveTheme(mode))
    if (mode === 'auto') {
      localStorage.removeItem('theme-mode')
    } else {
      localStorage.setItem('theme-mode', mode)
    }
  }, [mode])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Follow device theme changes in auto mode
  useEffect(() => {
    if (mode !== 'auto') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const toggle = () => {
    setMode((m) => CYCLE[(CYCLE.indexOf(m) + 1) % CYCLE.length])
  }

  return (
    <ThemeContext.Provider value={{ mode, theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
