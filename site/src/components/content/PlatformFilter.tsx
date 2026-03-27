import { useState, useRef, useEffect } from 'react'

const ALL_PLATFORMS = [
  'swift', 'kotlin', 'typescript', 'csharp', 'python',
  'windows', 'macos', 'ios', 'web',
]

interface PlatformFilterProps {
  selected: string[]
  onChange: (platforms: string[]) => void
}

export default function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggle(platform: string) {
    if (selected.includes(platform)) {
      onChange(selected.filter((p) => p !== platform))
    } else {
      onChange([...selected, platform])
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-sm transition-colors ${
          selected.length > 0
            ? 'border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/20'
            : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="hidden sm:inline">
          {selected.length > 0 ? `${selected.length} platform${selected.length > 1 ? 's' : ''}` : 'Platforms'}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 z-50">
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Clear all
            </button>
          )}
          {ALL_PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => toggle(platform)}
              className="w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className={`h-4 w-4 rounded border flex items-center justify-center ${
                selected.includes(platform)
                  ? 'bg-sky-500 border-sky-500 text-white'
                  : 'border-slate-300 dark:border-slate-600'
              }`}>
                {selected.includes(platform) && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-slate-700 dark:text-slate-300">{platform}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
