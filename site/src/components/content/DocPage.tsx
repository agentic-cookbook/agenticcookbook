import { useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import type { CookbookEntry } from '../../types/cookbook'


/** Metadata block */
function EntryMeta({ entry }: { entry: CookbookEntry }) {
  const fm = entry.frontmatter
  const rows: [string, string][] = []

  if (fm.summary) rows.push(['summary', fm.summary])
  rows.push(['version', fm.version])
  if (fm.status !== 'accepted') rows.push(['status', fm.status])
  if (fm.platforms.length > 0) rows.push(['platforms', fm.platforms.join(', ')])
  if (fm.tags.length > 0) rows.push(['tags', fm.tags.join(', ')])
  if (fm.author) rows.push(['author', fm.author])
  rows.push(['modified', fm.modified])
  if (fm.references.length > 0) rows.push(['references', fm.references.join(', ')])

  return (
    <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] px-4 py-3 mb-4">
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[11px]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-[var(--color-text-dim)] text-right">{label}</dt>
            <dd className="text-[var(--color-text-secondary)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Single entry — metadata block then full content */
function EntryView({ entry }: { entry: CookbookEntry }) {
  return (
    <div>
      <EntryMeta entry={entry} />
      <article
        className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </div>
  )
}

export default function DocPage() {
  const { pathname } = useLocation()
  const { getBySlug } = useContent()

  const slug = pathname === '/' ? '/' : pathname.replace(/\/$/, '')

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
        <EntryView entry={entry} />
      </div>
      <TableOfContents headings={entry.headings} />
    </div>
  )
}
