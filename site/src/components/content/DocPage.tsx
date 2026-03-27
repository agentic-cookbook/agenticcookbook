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

  // Overview page
  if (slug === '/') {
    return (
      <div className="px-6 py-8 lg:px-10 max-w-3xl">
        <h1 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>Agentic Cookbook</h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
          A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents and rendered here for humans.
        </p>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          Use the navigation on the left to browse sections. Each section contains topics you can click to explore in detail.
        </p>
      </div>
    )
  }

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
  const dirPath = slug

  // Direct child files
  const childFiles = entries.filter((e) => {
    const rest = e.slug.slice(dirPath.length)
    return e.slug.startsWith(dirPath + '/') && rest.split('/').filter(Boolean).length === 1
  })

  // Child subdirectories (derived from entries deeper than one level)
  const childDirPaths = new Map<string, string>() // path -> label
  for (const e of entries) {
    if (!e.slug.startsWith(dirPath + '/')) continue
    const rest = e.slug.slice(dirPath.length + 1)
    const parts = rest.split('/').filter(Boolean)
    if (parts.length >= 2) {
      const subdir = dirPath + '/' + parts[0]
      if (!childDirPaths.has(subdir)) {
        childDirPaths.set(subdir, parts[0].split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
      }
    }
  }

  const hasContent = childFiles.length > 0 || childDirPaths.size > 0

  if (!hasContent) {
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

  const dirName = slug.split('/').filter(Boolean).pop()!
    .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div className="px-6 py-8 lg:px-10 max-w-3xl">
      <Breadcrumbs slug={slug} />
      <h1 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>{dirName}</h1>
      <div className="flex flex-col">
        {/* Subdirectories */}
        {Array.from(childDirPaths.entries()).map(([path, label]) => (
          <Link
            key={path}
            to={path}
            className="group flex items-center gap-3 py-2.5 border-b border-[var(--color-border-subtle)] last:border-b-0"
          >
            <span className="text-sm text-[var(--color-accent)] group-hover:underline">
              {label}
            </span>
          </Link>
        ))}
        {/* Files */}
        {childFiles.map((child) => (
          <Link
            key={child.slug}
            to={child.slug}
            className="group flex items-center gap-3 py-2.5 border-b border-[var(--color-border-subtle)] last:border-b-0"
          >
            <span className="text-sm text-[var(--color-accent)] group-hover:underline">
              {child.frontmatter.title}
            </span>
            {child.frontmatter.status !== 'accepted' && (
              <StatusBadge status={child.frontmatter.status} />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
