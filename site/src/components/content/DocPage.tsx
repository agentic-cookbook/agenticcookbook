import { Link, useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import FrontmatterDisplay from './FrontmatterDisplay'
import DependencyPanel from './DependencyPanel'
import StatusBadge from './StatusBadge'

export default function DocPage() {
  const { pathname } = useLocation()
  const { getBySlug, entries } = useContent()

  const slug = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  const entry = getBySlug(slug)

  // If we have a direct entry (a file), render its content
  if (entry) {
    return (
      <div className="flex">
        <div className="flex-1 min-w-0 px-6 py-8 lg:px-10 max-w-3xl">
          <Breadcrumbs slug={entry.slug} />
          <FrontmatterDisplay frontmatter={entry.frontmatter} />
          <article
            className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: entry.html }}
          />
          <DependencyPanel
            dependsOn={entry.frontmatter['depends-on']}
            related={entry.frontmatter.related}
          />
        </div>
        <TableOfContents headings={entry.headings} />
      </div>
    )
  }

  // No direct file match — treat as a directory listing
  // Find all entries whose slug starts with this path
  const dirPath = slug === '/' ? '/' : slug
  const children = entries.filter((e) => {
    if (dirPath === '/') return true
    // Direct children: slug starts with dirPath/ and has no further slashes beyond that
    const rest = e.slug.slice(dirPath.length)
    return e.slug.startsWith(dirPath + '/') && rest.split('/').filter(Boolean).length === 1
  })

  if (children.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-2xl text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Page not found</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            No content at <code className="text-sm bg-[var(--color-surface-raised)] px-1.5 py-0.5 rounded font-mono">{pathname}</code>
          </p>
        </div>
      </div>
    )
  }

  // Directory listing
  const dirName = slug === '/'
    ? 'Agentic Cookbook'
    : slug.split('/').filter(Boolean).pop()!
        .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div className="px-6 py-8 lg:px-10 max-w-3xl">
      <Breadcrumbs slug={slug} />
      <h1 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>{dirName}</h1>
      <div className="flex flex-col gap-1">
        {children.map((child) => (
          <Link
            key={child.slug}
            to={child.slug}
            className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-md hover:bg-[var(--color-surface-raised)] transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                {child.frontmatter.title}
              </div>
              {child.frontmatter.summary && (
                <div className="text-xs text-[var(--color-text-dim)] truncate mt-0.5">
                  {child.frontmatter.summary}
                </div>
              )}
            </div>
            {child.frontmatter.status !== 'accepted' && (
              <StatusBadge status={child.frontmatter.status} />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
