import { useState } from 'react'
import { useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import type { CookbookEntry, HeadingEntry } from '../../types/cookbook'

/** Sections to show in the recipe summary (before "Details") */
const RECIPE_SUMMARY_SECTIONS = new Set([
  'overview',
  'terminology',
  'appearance',
])

/**
 * Split recipe HTML into summary (overview, terminology, appearance)
 * and details (everything else). Splits at h2 boundaries.
 */
function splitRecipeHtml(html: string): { summary: string; details: string } {
  // Split HTML at h2 tags, keeping the tags
  const parts = html.split(/(?=<h2[\s>])/i)

  let summary = ''
  let details = ''

  for (const part of parts) {
    // Extract the heading id to determine which section this is
    const idMatch = part.match(/<h2[^>]*id="([^"]*)"/)
    const id = idMatch?.[1]?.toLowerCase() ?? ''

    if (!id) {
      // Content before the first h2 (the h1 title) — always summary
      summary += part
    } else if (RECIPE_SUMMARY_SECTIONS.has(id)) {
      summary += part
    } else {
      details += part
    }
  }

  return { summary, details }
}

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

  // Directory — collect only direct child entries, sorted by slug
  const dirEntries = entries
    .filter((e) => {
      if (!e.slug.startsWith(slug + '/')) return false
      const rest = e.slug.slice(slug.length + 1)
      return !rest.includes('/')
    })
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

/** Recipe metadata header */
function RecipeMeta({ entry }: { entry: CookbookEntry }) {
  const fm = entry.frontmatter
  const rows: [string, string][] = []

  rows.push(['version', fm.version])
  if (fm.status !== 'accepted') rows.push(['status', fm.status])
  if (fm.platforms.length > 0) rows.push(['platforms', fm.platforms.join(', ')])
  if (fm.tags.length > 0) rows.push(['tags', fm.tags.join(', ')])
  if (fm.author) rows.push(['author', fm.author])
  rows.push(['modified', fm.modified])
  if (fm.references.length > 0) rows.push(['references', fm.references.join(', ')])

  return (
    <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)] px-4 py-3 mb-6">
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

/** A single recipe entry with summary/details split */
function RecipeEntry({ entry }: { entry: CookbookEntry }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const { summary, details } = splitRecipeHtml(entry.html)

  return (
    <div>
      <article
        className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <RecipeMeta entry={entry} />
      {details && (
        <div className="mt-2">
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-accent)] hover:underline"
          >
            <svg
              className={`h-3 w-3 transition-transform duration-150 ${detailsOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Details
          </button>
          {detailsOpen && (
            <article
              className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none mt-4"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          )}
        </div>
      )}
    </div>
  )
}

/** Renders one or more entries as a single scrolling page */
function ContentPage({ entries, slug }: { entries: CookbookEntry[]; slug: string }) {
  const allHeadings: HeadingEntry[] = entries.flatMap((e) => e.headings)
  const isRecipeSection = slug.startsWith('/recipes')
  const isMultiple = entries.length > 1

  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-6 py-8 lg:px-10 max-w-3xl">
        <Breadcrumbs slug={slug} />
        <div className="space-y-12">
          {entries.map((entry) =>
            isRecipeSection && isMultiple ? (
              <RecipeEntry key={entry.slug} entry={entry} />
            ) : (
              <article
                key={entry.slug}
                className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: entry.html }}
              />
            ),
          )}
        </div>
      </div>
      <TableOfContents headings={allHeadings} />
    </div>
  )
}
