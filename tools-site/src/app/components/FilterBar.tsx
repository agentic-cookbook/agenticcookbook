import { useEffect, useState } from 'react'
import { fetchCategories, type Category } from '../lib/api'

interface FilterBarProps {
  filters: {
    category: string
    phase: string
    platform: string
    integration: string
  }
  onChange: (key: string, value: string) => void
  onClear: () => void
}

const PHASES = ['plan', 'implement', 'verify']
const PLATFORMS = ['macos', 'linux', 'windows', 'web', 'ios', 'android']
const INTEGRATIONS = ['cli', 'library', 'plugin', 'saas', 'api', 'mcp-server']

export function FilterBar({ filters, onChange, onClear }: FilterBarProps) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {})
  }, [])

  const activeCount = Object.values(filters).filter(v => v !== '').length

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Category */}
      <select
        value={filters.category}
        onChange={e => onChange('category', e.target.value)}
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] outline-none hover:border-[var(--color-text-dim)] transition-colors"
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      {/* Phase toggles */}
      <div className="flex items-center gap-1">
        {PHASES.map(p => (
          <button
            key={p}
            onClick={() => onChange('phase', filters.phase === p ? '' : p)}
            className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors border ${
              filters.phase === p
                ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)] border-[var(--color-accent)]/30'
                : 'text-[var(--color-text-dim)] border-[var(--color-border)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-dim)]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Platform */}
      <select
        value={filters.platform}
        onChange={e => onChange('platform', e.target.value)}
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] outline-none hover:border-[var(--color-text-dim)] transition-colors"
      >
        <option value="">All Platforms</option>
        {PLATFORMS.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* Integration */}
      <select
        value={filters.integration}
        onChange={e => onChange('integration', e.target.value)}
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] outline-none hover:border-[var(--color-text-dim)] transition-colors"
      >
        <option value="">All Integrations</option>
        {INTEGRATIONS.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* Active filter count + clear */}
      {activeCount > 0 && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] transition-colors"
        >
          <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[var(--color-accent-dim)] text-[var(--color-accent)] text-[10px] font-medium">
            {activeCount}
          </span>
          Clear all
        </button>
      )}
    </div>
  )
}
