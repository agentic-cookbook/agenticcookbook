import { useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import FrontmatterDisplay from './FrontmatterDisplay'
import DependencyPanel from './DependencyPanel'
import HomePage from '../sections/HomePage'

export default function DocPage() {
  const { pathname } = useLocation()
  const { getBySlug } = useContent()

  // Home route gets a designed landing page
  if (pathname === '/') {
    return <HomePage />
  }

  const slug = pathname.replace(/\/$/, '')
  const entry = getBySlug(slug)

  if (!entry) {
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
