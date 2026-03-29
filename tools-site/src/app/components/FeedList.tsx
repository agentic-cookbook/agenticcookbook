import { useEffect, useRef } from 'react'
import type { FeedItem } from '../lib/api'

const TYPE_META: Record<string, { label: string; color: string }> = {
  'new-tool': { label: 'New', color: 'var(--color-success)' },
  'update': { label: 'Update', color: 'var(--color-info)' },
  'deprecation': { label: 'Deprecated', color: 'var(--color-error)' },
  'breaking-change': { label: 'Breaking', color: 'var(--color-error)' },
}

interface FeedListProps {
  items: FeedItem[]
  selectedId: number | null
  onSelect: (id: number) => void
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const day = date.getDate()
  if (date.getFullYear() === now.getFullYear()) {
    return `${month} ${day}`
  }
  return `${month} ${day}, ${date.getFullYear()}`
}

export function FeedList({ items, selectedId, onSelect }: FeedListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)

  // Scroll selected item into view when it changes
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selectedId])

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-[var(--color-text-dim)]">
        No entries match the current filters.
      </div>
    )
  }

  return (
    <div ref={listRef}>
      {items.map((item) => {
        const isSelected = item.id === selectedId
        const meta = TYPE_META[item.type] ?? { label: item.type, color: 'var(--color-text-dim)' }

        return (
          <div
            key={item.id}
            ref={isSelected ? selectedRef : undefined}
            onClick={() => onSelect(item.id)}
            className={`px-4 py-3 border-b border-[var(--color-border-subtle)] cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors border-l-2 ${
              isSelected
                ? 'bg-[var(--color-surface-hover)] border-l-[var(--color-accent)]'
                : 'border-l-transparent'
            }`}
          >
            {/* Line 1: date + type badge */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[11px] text-[var(--color-text-dim)]">
                {formatDate(item.published_at)}
              </span>
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `color-mix(in srgb, ${meta.color} 15%, transparent)`,
                  color: meta.color,
                }}
              >
                {meta.label}
              </span>
            </div>

            {/* Line 2: title */}
            <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
              {item.title}
            </div>

            {/* Line 3: summary */}
            <div className="text-xs text-[var(--color-text-secondary)] line-clamp-1 mt-0.5">
              {item.body}
            </div>
          </div>
        )
      })}
    </div>
  )
}
