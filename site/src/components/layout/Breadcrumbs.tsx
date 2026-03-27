import { Link } from 'react-router'
import { slugToBreadcrumbs } from '../../lib/domain-utils'

interface BreadcrumbsProps {
  slug: string
}

export default function Breadcrumbs({ slug }: BreadcrumbsProps) {
  const crumbs = slugToBreadcrumbs(slug)
  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <li>
          <Link to="/" className="hover:text-slate-700 dark:hover:text-slate-300">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {i === crumbs.length - 1 ? (
              <span className="text-slate-700 dark:text-slate-300 font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-slate-700 dark:hover:text-slate-300">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
