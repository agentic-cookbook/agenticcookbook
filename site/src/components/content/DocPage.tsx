import { useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import type { CookbookEntry, HeadingEntry } from '../../types/cookbook'

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
          Use the navigation on the left to browse sections.
        </p>
      </div>
    )
  }

  // Check for a direct file match first
  const entry = getBySlug(slug)
  if (entry) {
    return <ContentPage entries={[entry]} slug={slug} />
  }

  // Directory — collect all entries under this path, sorted by slug
  const dirEntries = entries
    .filter((e) => e.slug.startsWith(slug + '/'))
    .sort((a, b) => a.slug.localeCompare(b.slug))

  if (dirEntries.length === 0) {
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

  return <ContentPage entries={dirEntries} slug={slug} />
}

/** Renders one or more entries as a single scrolling page */
function ContentPage({ entries, slug }: { entries: CookbookEntry[]; slug: string }) {
  // Collect all headings across all entries for the TOC
  const allHeadings: HeadingEntry[] = entries.flatMap((e) => e.headings)

  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-6 py-8 lg:px-10 max-w-3xl">
        <Breadcrumbs slug={slug} />
        <div className="space-y-12">
          {entries.map((entry) => (
            <article
              key={entry.slug}
              className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: entry.html }}
            />
          ))}
        </div>
      </div>
      <TableOfContents headings={allHeadings} />
    </div>
  )
}
