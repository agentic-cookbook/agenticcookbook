import { Link } from 'react-router'
import type { CookbookEntry } from '../../types/cookbook'
import StatusBadge from '../content/StatusBadge'

interface SectionIndexProps {
  title: string
  entries: CookbookEntry[]
}

export default function SectionIndex({ title, entries }: SectionIndexProps) {
  return (
    <div className="px-4 py-8 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{title}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.domain}
            to={entry.slug}
            className="group block rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                {entry.frontmatter.title}
              </h3>
              <StatusBadge status={entry.frontmatter.status} />
            </div>
            {entry.frontmatter.summary && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {entry.frontmatter.summary}
              </p>
            )}
            {entry.frontmatter.platforms.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {entry.frontmatter.platforms.map((p) => (
                  <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {p}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
