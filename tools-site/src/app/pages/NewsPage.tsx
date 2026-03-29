import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router'
import { fetchNews, type NewsItem } from '../lib/api'

const PAGE_SIZE = 25

const NEWS_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'new-tool': { label: 'New Tool', color: 'var(--color-success)' },
  'update': { label: 'Update', color: 'var(--color-info)' },
  'deprecation': { label: 'Deprecated', color: 'var(--color-error)' },
  'breaking-change': { label: 'Breaking Change', color: 'var(--color-error)' },
}

export function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const loadNews = useCallback(async () => {
    setLoading(true)
    try {
      const offset = (page - 1) * PAGE_SIZE
      const res = await fetchNews({ limit: String(PAGE_SIZE), offset: String(offset) })
      setNews(res.data)
      setTotal(res.total)
    } catch {
      setNews([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          News
        </h1>
        <p className="font-mono text-sm text-[var(--color-text-dim)]">
          {total} {total === 1 ? 'item' : 'items'}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] animate-pulse"
            />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[var(--color-text-dim)]">No news items yet.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {news.map(item => {
              const meta = NEWS_TYPE_LABELS[item.type] ?? { label: item.type, color: 'var(--color-text-dim)' }
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                      style={{
                        color: meta.color,
                        borderColor: `color-mix(in srgb, ${meta.color} 30%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${meta.color} 8%, transparent)`,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
                      {new Date(item.published_at).toLocaleDateString()}
                    </span>
                    {item.tool_id && (
                      <>
                        <span className="text-[var(--color-border)]">|</span>
                        <Link
                          to={`/tools/${item.tool_id}`}
                          className="font-mono text-[10px] text-[var(--color-accent)] hover:underline"
                        >
                          {item.tool_id}
                        </Link>
                      </>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              )
            })}
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
