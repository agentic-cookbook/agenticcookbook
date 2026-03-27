import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import { search } from '../../lib/search'
import type { CookbookEntry } from '../../types/cookbook'
import StatusBadge from './StatusBadge'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

const SECTION_LABELS: Record<string, string> = {
  principles: 'Principles',
  guidelines: 'Guidelines',
  recipes: 'Recipes',
  workflow: 'Workflow',
  reference: 'Reference',
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CookbookEntry[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { entries } = useContent()
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
      // Focus after dialog renders
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) {
          onClose()
        } else {
          // Parent handles opening
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  function handleQueryChange(value: string) {
    setQuery(value)
    setSelectedIndex(0)
    setResults(search(value, entries))
  }

  function handleSelect(entry: CookbookEntry) {
    navigate(entry.slug)
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Group results by section
  const grouped = new Map<string, CookbookEntry[]>()
  for (const entry of results.slice(0, 20)) {
    const section = entry.section || 'other'
    if (!grouped.has(section)) grouped.set(section, [])
    grouped.get(section)!.push(entry)
  }

  if (!open) return null

  let flatIndex = 0

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/20 dark:bg-black/50" onClick={onClose} />
      <div className="fixed inset-x-4 top-20 mx-auto max-w-xl">
        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-700">
            <svg className="h-5 w-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 py-3 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400"
            />
            <kbd className="text-xs text-slate-400 border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5">
              Esc
            </kbd>
          </div>

          {/* Results */}
          {query && (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                Array.from(grouped.entries()).map(([section, sectionEntries]) => (
                  <div key={section}>
                    <div className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {SECTION_LABELS[section] ?? section}
                    </div>
                    {sectionEntries.map((entry) => {
                      const idx = flatIndex++
                      return (
                        <button
                          key={entry.domain}
                          onClick={() => handleSelect(entry)}
                          className={`w-full text-left px-4 py-2 flex items-center gap-2 ${
                            idx === selectedIndex
                              ? 'bg-sky-50 dark:bg-sky-900/20'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {entry.frontmatter.title}
                            </div>
                            {entry.frontmatter.summary && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {entry.frontmatter.summary}
                              </div>
                            )}
                          </div>
                          <StatusBadge status={entry.frontmatter.status} />
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
