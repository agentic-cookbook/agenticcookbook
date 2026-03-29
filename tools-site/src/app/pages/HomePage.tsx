import { useEffect, useState, useCallback, useMemo } from 'react'
import { fetchFeed, fetchCategories, type FeedItem, type Category } from '../lib/api'
import { FeedFilterBar } from '../components/FeedFilterBar'
import { FeedList } from '../components/FeedList'
import { FeedDetail } from '../components/FeedDetail'

export function HomePage() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Load data
  useEffect(() => {
    Promise.all([
      fetchFeed({ limit: '200' }),
      fetchCategories(),
    ])
      .then(([feedRes, cats]) => {
        setItems(feedRes.data)
        setCategories(cats)
        setSelectedIndex(0)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (typeFilter && item.type !== typeFilter) return false
      if (categoryFilter && item.tool_category !== categoryFilter) return false
      return true
    })
  }, [items, typeFilter, categoryFilter])

  // Selected item
  const selectedItem = filteredItems[selectedIndex] ?? null

  // Reset selection when filters change
  const handleTypeFilter = useCallback((type: string | null) => {
    setTypeFilter(type)
    setSelectedIndex(0)
  }, [])

  const handleCategoryFilter = useCallback((category: string | null) => {
    setCategoryFilter(category)
    setSelectedIndex(0)
  }, [])

  const handleSelect = useCallback(
    (id: number) => {
      const idx = filteredItems.findIndex((item) => item.id === id)
      if (idx >= 0) setSelectedIndex(idx)
    },
    [filteredItems]
  )

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [filteredItems.length])

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <span className="text-sm text-[var(--color-text-dim)]">Loading feed...</span>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left pane */}
      <div className="w-[40%] shrink-0 border-r border-[var(--color-border-subtle)] flex flex-col">
        <FeedFilterBar
          typeFilter={typeFilter}
          onTypeFilter={handleTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryFilter={handleCategoryFilter}
          categories={categories}
          activeCount={filteredItems.length}
        />
        <div className="flex-1 overflow-y-auto">
          <FeedList
            items={filteredItems}
            selectedId={selectedItem?.id ?? null}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {/* Right pane */}
      <FeedDetail item={selectedItem} />
    </div>
  )
}
