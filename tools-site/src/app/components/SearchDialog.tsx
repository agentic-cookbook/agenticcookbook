import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { searchTools, type Tool } from '../lib/api'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await searchTools(query.trim())
        setResults(res.data)
        setSelectedIndex(0)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const navigateToResult = useCallback(
    (tool: Tool) => {
      onClose()
      navigate(`/tools/${tool.id}`)
    },
    [navigate, onClose]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigateToResult(results[selectedIndex])
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />

      {/* Dialog */}
      <div className="fixed inset-x-4 top-20 mx-auto max-w-xl">
        <div className="rounded-xl bg-[var(--color-surface-raised)] shadow-2xl border border-[var(--color-border)] overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border-subtle)]">
            <svg className="h-4 w-4 shrink-0 text-[var(--color-text-dim)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tools..."
              className="flex-1 py-3 text-sm bg-transparent outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-dim)]"
            />
            {loading && (
              <span className="text-xs text-[var(--color-text-dim)]">...</span>
            )}
            <kbd className="rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-dim)]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {results.length === 0 && query.trim() && !loading && (
              <p className="px-4 py-6 text-center text-sm text-[var(--color-text-dim)]">
                No tools found for "{query}"
              </p>
            )}
            {results.length === 0 && !query.trim() && (
              <p className="px-4 py-6 text-center text-sm text-[var(--color-text-dim)]">
                Type to search tools...
              </p>
            )}
            {results.map((tool, i) => (
              <button
                key={tool.id}
                onClick={() => navigateToResult(tool)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 ${
                  i === selectedIndex
                    ? 'bg-[var(--color-accent-dim)]'
                    : 'hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                      {tool.name}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)] shrink-0">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-dim)] truncate mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
