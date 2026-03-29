import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { fetchTools, type Tool } from '../lib/api'
import { ToolCard } from '../components/ToolCard'
import { FilterBar } from '../components/FilterBar'

const PAGE_SIZE = 30

export function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const filters = {
    category: searchParams.get('category') ?? '',
    phase: searchParams.get('phase') ?? '',
    platform: searchParams.get('platform') ?? '',
    integration: searchParams.get('integration') ?? '',
  }
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const offset = (page - 1) * PAGE_SIZE

  const loadTools = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = {
        limit: String(PAGE_SIZE),
        offset: String(offset),
      }
      if (filters.category) params.category = filters.category
      if (filters.phase) params.phase = filters.phase
      if (filters.platform) params.platform = filters.platform
      if (filters.integration) params.integration = filters.integration

      const res = await fetchTools(params)
      setTools(res.data)
      setTotal(res.total)
    } catch {
      setTools([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [filters.category, filters.phase, filters.platform, filters.integration, offset])

  useEffect(() => {
    loadTools()
  }, [loadTools])

  const handleFilterChange = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    next.delete('page') // reset to page 1
    setSearchParams(next)
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const goToPage = (p: number) => {
    const next = new URLSearchParams(searchParams)
    if (p > 1) {
      next.set('page', String(p))
    } else {
      next.delete('page')
    }
    setSearchParams(next)
  }

  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Browse Tools
        </h1>
        <p className="font-mono text-sm text-[var(--color-text-dim)]">
          {total} {total === 1 ? 'tool' : 'tools'}
        </p>
      </div>

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] animate-pulse"
            />
          ))}
        </div>
      ) : tools.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[var(--color-text-dim)]">No tools match your filters.</p>
          <button
            onClick={handleClearFilters}
            className="mt-3 font-mono text-xs text-[var(--color-accent)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 rounded-md border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-dim)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                Prev
              </button>
              <span className="font-mono text-xs text-[var(--color-text-dim)]">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1 rounded-md border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-dim)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
