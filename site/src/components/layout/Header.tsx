import { Link, useLocation } from 'react-router'
import { useTheme } from '../../contexts/ThemeContext'

const SECTIONS = [
  { label: 'Principles', path: '/principles' },
  { label: 'Guidelines', path: '/guidelines' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Workflow', path: '/workflow' },
  { label: 'Reference', path: '/reference' },
]

interface HeaderProps {
  onMenuToggle: () => void
  onSearchOpen: () => void
}

export default function Header({ onMenuToggle, onSearchOpen }: HeaderProps) {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  const activeSection = '/' + pathname.split('/').filter(Boolean)[0]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/75 dark:bg-slate-950/75 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-4 px-4 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden -ml-2 p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-slate-900 dark:text-white shrink-0">
          Agentic Cookbook
        </Link>

        {/* Section tabs */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {SECTIONS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeSection === path
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Search trigger */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 text-xs text-slate-400">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
