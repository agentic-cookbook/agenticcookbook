import { Link, useLocation, useSearchParams } from 'react-router'
import { useTheme } from '../../contexts/ThemeContext'
import PlatformFilter from '../content/PlatformFilter'

const SECTIONS = [
  { label: 'Principles', path: '/principles' },
  { label: 'Guidelines', path: '/guidelines' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Compliance', path: '/compliance' },
  { label: 'Workflow', path: '/workflow' },
  { label: 'Reference', path: '/reference' },
  { label: 'Usage', path: '/usage' },
]

interface HeaderProps {
  onMenuToggle: () => void
  onSearchOpen: () => void
}

export default function Header({ onMenuToggle, onSearchOpen }: HeaderProps) {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeSection = '/' + pathname.split('/').filter(Boolean)[0]
  const selectedPlatforms = searchParams.get('platform')?.split(',').filter(Boolean) ?? []

  function handlePlatformChange(platforms: string[]) {
    setSearchParams((prev) => {
      if (platforms.length === 0) {
        prev.delete('platform')
      } else {
        prev.set('platform', platforms.join(','))
      }
      return prev
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden -ml-2 p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]"
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="text-xl text-[var(--color-text-primary)]">Agentic Cookbook</span>
        </Link>

        {/* Section tabs */}
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {SECTIONS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-1 rounded-md font-mono text-xs font-medium transition-colors ${
                activeSection === path
                  ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* GitHub link */}
        <a
          href="https://github.com/mikefullerton/agentic-cookbook"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label="View on GitHub"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* Search trigger */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-dim)] hover:border-[var(--color-text-dim)] transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline font-mono text-xs">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-dim)]">
            <span>&#8984;</span>K
          </kbd>
        </button>

        {/* Platform filter */}
        <PlatformFilter selected={selectedPlatforms} onChange={handlePlatformChange} />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]"
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
