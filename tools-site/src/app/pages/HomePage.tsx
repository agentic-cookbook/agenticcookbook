import { useEffect, useState } from 'react'
import { fetchCategories, fetchNews, fetchTools, type Category, type NewsItem } from '../lib/api'
import { CategoryCard } from '../components/CategoryCard'
import { Link } from 'react-router'

const NEWS_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'new-tool': { label: 'New', color: 'var(--color-success)' },
  'update': { label: 'Update', color: 'var(--color-info)' },
  'deprecation': { label: 'Deprecated', color: 'var(--color-error)' },
  'breaking-change': { label: 'Breaking', color: 'var(--color-error)' },
}

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [totalTools, setTotalTools] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchCategories(),
      fetchNews({ limit: '5' }),
      fetchTools({ limit: '1' }),
    ])
      .then(([cats, newsRes, toolsRes]) => {
        setCategories(cats)
        setNews(newsRes.data)
        setTotalTools(toolsRes.total)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      {/* Hero */}
      <h1
        className="text-5xl lg:text-6xl mb-8 tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Developer Tools Directory
      </h1>

      <div className="max-w-2xl mb-8 text-lg text-[var(--color-text-secondary)]" style={{ lineHeight: 1.8 }}>
        <p className="mb-7">
          A curated, searchable directory of developer tools organized for the
          plan/implement/verify loop. Browse by category, filter by platform,
          or search across everything.
        </p>
        <p className="text-[var(--color-text-primary)] font-medium">
          Built for the Agentic Cookbook.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 font-mono text-sm text-[var(--color-text-dim)] mb-10">
        <span>{totalTools} tools</span>
        <span className="text-[var(--color-border)]">|</span>
        <span>{categories.length} categories</span>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--color-border-subtle)] mb-10" />

      {/* Category cards */}
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <h2
            className="text-xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Categories
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {categories.map(cat => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>

          {/* Latest News */}
          {news.length > 0 && (
            <>
              <div className="flex items-baseline justify-between mb-4">
                <h2
                  className="text-xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Latest News
                </h2>
                <Link
                  to="/news"
                  className="font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {news.map(item => {
                  const meta = NEWS_TYPE_LABELS[item.type] ?? { label: item.type, color: 'var(--color-text-dim)' }
                  return (
                    <div
                      key={item.id}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4"
                    >
                      <div className="flex items-center gap-2 mb-1">
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
            </>
          )}
        </>
      )}
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="h-20 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] animate-pulse"
        />
      ))}
    </div>
  )
}
