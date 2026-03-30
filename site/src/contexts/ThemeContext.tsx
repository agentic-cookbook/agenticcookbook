import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ThemeMode = 'auto' | 'light' | 'dark'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  theme: ResolvedTheme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const MQ = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'
  try {
    const stored = localStorage.getItem('theme-mode')
    if (stored === 'light' || stored === 'dark') return stored
    const legacy = localStorage.getItem('theme')
    if (legacy === 'dark' || legacy === 'light') {
      localStorage.removeItem('theme')
      return legacy
    }
  } catch {
    // localStorage unavailable — default to auto
  }
  return 'auto'
}

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

const CYCLE: ThemeMode[] = ['auto', 'dark', 'light']

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always track what the OS says, regardless of mode
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(
    () => MQ?.matches ? 'dark' : 'light'
  )
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  // Resolve: auto uses systemTheme, forced uses mode directly
  const theme: ResolvedTheme = mode === 'auto' ? systemTheme : mode

  // Always listen for OS theme changes
  useEffect(() => {
    if (!MQ) return
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light')
    MQ.addEventListener('change', handler)
    return () => MQ.removeEventListener('change', handler)
  }, [])

  // Apply dark class and persist whenever the resolved theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Persist mode to localStorage
  useEffect(() => {
    try {
      if (mode === 'auto') {
        localStorage.removeItem('theme-mode')
        localStorage.removeItem('theme')
      } else {
        localStorage.setItem('theme-mode', mode)
      }
    } catch {
      // localStorage unavailable
    }
  }, [mode])

  const toggle = () => {
    const next = CYCLE[(CYCLE.indexOf(mode) + 1) % CYCLE.length]
    // Apply class synchronously before React re-renders
    const resolved = next === 'auto' ? systemTheme : next
    applyTheme(resolved)
    setMode(next)
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
