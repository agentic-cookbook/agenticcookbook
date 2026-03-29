import type { Category } from '../lib/api'

const TYPE_FILTERS: ReadonlyArray<{ value: string | null; label: string; color?: string }> = [
  { value: null, label: 'All' },
  { value: 'new-tool', label: 'New', color: 'var(--color-success)' },
  { value: 'update', label: 'Update', color: 'var(--color-info)' },
  { value: 'deprecation', label: 'Deprecated', color: 'var(--color-error)' },
  { value: 'breaking-change', label: 'Breaking', color: 'var(--color-error)' },
]

interface FeedFilterBarProps {
  typeFilter: string | null
  onTypeFilter: (type: string | null) => void
  categoryFilter: string | null
  onCategoryFilter: (category: string | null) => void
  categories: Category[]
  activeCount: number
}

export function FeedFilterBar({
  typeFilter,
  onTypeFilter,
  categoryFilter,
  onCategoryFilter,
  categories,
  activeCount,
}: FeedFilterBarProps) {
  const hasFilters = typeFilter !== null || categoryFilter !== null

  return (
    <div className="px-4 py-2 border-b border-[var(--color-border-subtle)] flex items-center gap-2 shrink-0">
      {/* Type filter pills */}
      {TYPE_FILTERS.map((filter) => {
        const isActive = typeFilter === filter.value
        return (
          <button
            key={filter.label}
            onClick={() => onTypeFilter(filter.value)}
            className="font-mono text-[10px] px-2 py-1 rounded cursor-pointer transition-colors"
            style={
              isActive && filter.color
                ? {
                    backgroundColor: `color-mix(in srgb, ${filter.color} 20%, transparent)`,
                    color: filter.color,
                  }
                : isActive
                  ? {
                      backgroundColor: 'var(--color-surface-hover)',
                      color: 'var(--color-text-primary)',
                    }
                  : {
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-dim)',
                    }
            }
          >
            {filter.label}
          </button>
        )
      })}

      {/* Category dropdown */}
      <select
        value={categoryFilter ?? ''}
        onChange={(e) => onCategoryFilter(e.target.value || null)}
        className="font-mono text-[10px] px-2 py-1 rounded border border-[var(--color-border)] bg-transparent text-[var(--color-text-dim)] cursor-pointer transition-colors hover:text-[var(--color-text-secondary)] outline-none"
        style={{ appearance: 'auto' }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Active filter count + clear */}
      {hasFilters && (
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
            {activeCount} result{activeCount !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => {
              onTypeFilter(null)
              onCategoryFilter(null)
            }}
            className="font-mono text-[10px] px-1.5 py-0.5 rounded text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
