import { Link } from 'react-router'
import type { Category } from '../lib/api'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-1.5">
        {category.icon && (
          <span className="text-base shrink-0">{category.icon}</span>
        )}
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
          {category.name}
        </h3>
        <span className="font-mono text-xs text-[var(--color-text-dim)] ml-auto shrink-0">
          {category.tool_count}
        </span>
      </div>
      {category.description && (
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  )
}
