import { useState } from 'react'
import { Link } from 'react-router'
import type { FeedItem } from '../lib/api'

const TYPE_META: Record<string, { label: string; color: string }> = {
  'new-tool': { label: 'New', color: 'var(--color-success)' },
  'update': { label: 'Update', color: 'var(--color-info)' },
  'deprecation': { label: 'Deprecated', color: 'var(--color-error)' },
  'breaking-change': { label: 'Breaking', color: 'var(--color-error)' },
}

interface FeedDetailProps {
  item: FeedItem | null
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

export function FeedDetail({ item }: FeedDetailProps) {
  const [copied, setCopied] = useState(false)

  if (!item) {
    return (
      <div className="flex-1 min-w-0 flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <span className="text-sm text-[var(--color-text-dim)]">
          Select an entry to view details
        </span>
      </div>
    )
  }

  const meta = TYPE_META[item.type] ?? { label: item.type, color: 'var(--color-text-dim)' }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may fail in some contexts
    }
  }

  return (
    <div className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-3.5rem)] px-8 py-6">
      {/* Title */}
      <h1
        className="text-2xl font-medium tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {item.title}
      </h1>

      {/* Metadata row */}
      <div className="flex items-center gap-3 font-mono text-xs text-[var(--color-text-dim)] mt-2 mb-6">
        <span>{formatDate(item.published_at)}</span>
        <span
          className="px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: `color-mix(in srgb, ${meta.color} 15%, transparent)`,
            color: meta.color,
          }}
        >
          {meta.label}
        </span>
        {item.tool_category && (
          <Link
            to={`/categories/${item.tool_category}`}
            className="px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {item.tool_category}
          </Link>
        )}
      </div>

      {/* Description */}
      <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
        {item.body}
      </div>

      {/* Tool description if different from body */}
      {item.tool_description && item.tool_description !== item.body && (
        <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 border-l-2 border-[var(--color-border)] pl-4">
          {item.tool_description}
        </div>
      )}

      {/* Install command */}
      {item.tool_install_command && (
        <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] rounded-md p-3 font-mono text-sm mb-6 relative">
          <button
            onClick={() => handleCopy(item.tool_install_command!)}
            className="absolute top-2 right-2 p-1 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <code className="text-[var(--color-text-secondary)]">{item.tool_install_command}</code>
        </div>
      )}

      {/* Links */}
      {(item.tool_url || item.tool_github_url) && (
        <div className="flex flex-col gap-2 mb-6">
          {item.tool_url && (
            <a
              href={item.tool_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              {item.tool_url}
            </a>
          )}
          {item.tool_github_url && (
            <a
              href={item.tool_github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {item.tool_github_url}
            </a>
          )}
        </div>
      )}

      {/* Platforms */}
      {item.tool_platforms && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {item.tool_platforms.split(',').map((p) => (
            <span
              key={p.trim()}
              className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]"
            >
              {p.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
