import { Link } from 'react-router'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  onOpenSearch: () => void
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="text-xl text-[var(--color-text-primary)]">Developer Tools</span>
        </Link>

        {/* Subtitle */}
        <a
          href="https://agenticcookbook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] transition-colors"
        >
          Agentic Cookbook
        </a>

        {/* Nav tabs */}
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          <NavTab to="/" label="Home" />
          <NavTab to="/tools" label="Browse" />
          <NavTab to="/news" label="News" />
          <NavTab to="/api-docs" label="API" />
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-dim)] hover:border-[var(--color-text-dim)] transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="hidden sm:inline font-mono text-xs">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-dim)]">
            ⌘K
          </kbd>
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com/mikefullerton/agentic-cookbook"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </a>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

function NavTab({ to, label }: { to: string; label: string }) {
  // Simple active detection — check if current path starts with `to`
  const isActive = to === '/'
    ? window.location.pathname === '/'
    : window.location.pathname.startsWith(to)

  return (
    <Link
      to={to}
      className={`px-3 py-1 rounded-md font-mono text-xs font-medium transition-colors ${
        isActive
          ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)]'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
      }`}
    >
      {label}
    </Link>
  )
}
