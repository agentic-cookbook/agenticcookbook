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
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-dim)]">
          {TYPE_LABELS[frontmatter.type] ?? frontmatter.type}
        </span>
        <StatusBadge status={frontmatter.status} />
        <span className="font-mono text-[10px] text-[var(--color-text-dim)] bg-[var(--color-surface-raised)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">
          v{frontmatter.version}
        </span>
      </div>
      {frontmatter.summary && (
        <p className="text-[var(--color-text-secondary)] text-sm">
          {frontmatter.summary}
        </p>
      )}
      {frontmatter.platforms.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {frontmatter.platforms.map((p) => (
            <span
              key={p}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
