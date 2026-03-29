import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router'
import { fetchTools, fetchCategories, type Tool, type Category } from '../lib/api'
import { ToolCard } from '../components/ToolCard'

const PAGE_SIZE = 30

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [tools, setTools] = useState<Tool[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetchCategories()
      .then(cats => {
        const found = cats.find(c => c.slug === slug)
        setCategory(found ?? null)
      })
      .catch(() => {})
  }, [slug])

  const loadTools = useCallback(async () => {
    if (!slug) return
    setLoading(true)
    try {
      const offset = (page - 1) * PAGE_SIZE
      const res = await fetchTools({
        category: slug,
        limit: String(PAGE_SIZE),
        offset: String(offset),
      })
      setTools(res.data)
      setTotal(res.total)
    } catch {
      setTools([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [slug, page])

  useEffect(() => {
    loadTools()
  }, [loadTools])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1 font-mono text-xs text-[var(--color-text-dim)]">
          <li>
            <Link to="/tools" className="hover:text-[var(--color-text-secondary)]">
              Tools
            </Link>
          </li>
          <li className="text-[var(--color-border)]">/</li>
          <li className="text-[var(--color-text-secondary)]">
            {category?.name ?? slug}
          </li>
        </ol>
      </nav>

      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {category?.icon && <span className="mr-2">{category.icon}</span>}
          {category?.name ?? slug}
        </h1>
        {category?.description && (
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            {category.description}
          </p>
        )}
        <p className="font-mono text-sm text-[var(--color-text-dim)]">
          {total} {total === 1 ? 'tool' : 'tools'}
        </p>
      </div>

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
          <p className="text-sm text-[var(--color-text-dim)]">No tools in this category yet.</p>
          <Link
            to="/tools"
            className="mt-3 inline-block font-mono text-xs text-[var(--color-accent)] hover:underline"
          >
            Browse all tools
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page <= 1}
                className="px-3 py-1 rounded-md border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-dim)] transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                Prev
              </button>
              <span className="font-mono text-xs text-[var(--color-text-dim)]">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
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
