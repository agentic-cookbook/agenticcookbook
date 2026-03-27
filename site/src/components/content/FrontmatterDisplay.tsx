import type { CookbookFrontmatter } from '../../types/cookbook'
import StatusBadge from './StatusBadge'

interface FrontmatterDisplayProps {
  frontmatter: CookbookFrontmatter
}

const TYPE_LABELS: Record<string, string> = {
  principle: 'Principle',
  guideline: 'Guideline',
  recipe: 'Recipe',
  workflow: 'Workflow',
  reference: 'Reference',
}

export default function FrontmatterDisplay({ frontmatter }: FrontmatterDisplayProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {TYPE_LABELS[frontmatter.type] ?? frontmatter.type}
        </span>
        <StatusBadge status={frontmatter.status} />
        <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
          v{frontmatter.version}
        </span>
      </div>
      {frontmatter.summary && (
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {frontmatter.summary}
        </p>
      )}
      {frontmatter.platforms.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {frontmatter.platforms.map((p) => (
            <span
              key={p}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
