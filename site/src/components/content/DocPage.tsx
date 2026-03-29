import { useState } from 'react'
import { useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import HomePage from '../sections/HomePage'
import SectionIndex from '../sections/SectionIndex'
import ToolingPage from '../sections/ToolingPage'
import type { CookbookEntry, NavNode } from '../../types/cookbook'

const SECTION_LABELS: Record<string, string> = {
  principles: 'Principles',
  guidelines: 'Guidelines',
  recipes: 'Recipes',
  compliance: 'Compliance',
  workflow: 'Workflow',
  reference: 'Reference',
}

/** Walk the nav tree to find a node by path */
function findNavNode(nodes: NavNode[], path: string): NavNode | undefined {
  for (const node of nodes) {
    if (node.path === path) return node
    const found = findNavNode(node.children, path)
    if (found) return found
  }
  return undefined
}

/** Right-justified metadata, no background box */
function EntryMeta({ entry }: { entry: CookbookEntry }) {
  const fm = entry.frontmatter
  const rows: [string, string | string[]][] = []

  rows.push(['version', fm.version])
  if (fm.status !== 'accepted') rows.push(['status', fm.status])
  if (fm.platforms.length > 0) rows.push(['platforms', fm.platforms.join(', ')])
  if (fm.tags.length > 0) rows.push(['tags', fm.tags.join(', ')])
  if (fm.author) rows.push(['author', fm.author])
  rows.push(['modified', fm.modified])
  if (fm.references.length > 0) rows.push(['references', fm.references])

  return (
    <dl className="flex flex-col items-end gap-0.5 font-mono text-[11px] mb-6">
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-2">
          <dt className="text-[var(--color-text-dim)]">{label}</dt>
          <dd className="text-[var(--color-text-secondary)]">
            {Array.isArray(value) ? (
              <span className="flex flex-wrap justify-end gap-x-3">
                {value.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-text-primary)] underline"
                  >
                    {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>
                ))}
              </span>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Raw markdown viewer toggle */
function RawMarkdownToggle({ raw }: { raw: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-8 border-t border-[var(--color-border-subtle)] pt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)]"
      >
        <svg
          className={`h-3 w-3 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        View source
      </button>
      {open && (
        <pre className="mt-3 p-4 rounded-md bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] overflow-x-auto font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
          {raw}
        </pre>
      )}
    </div>
  )
}

/**
 * Split HTML to insert metadata before Change History.
 * Returns [beforeChangeHistory, changeHistoryAndAfter].
 */
function splitAtChangeHistory(html: string): [string, string] {
  const marker = /<h2[^>]*id="change-history"[^>]*>/i
  const match = html.match(marker)
  if (!match || match.index === undefined) return [html, '']
  return [html.slice(0, match.index), html.slice(match.index)]
}

/** Single entry view */
function EntryView({ entry }: { entry: CookbookEntry }) {
  const [before, changeHistory] = splitAtChangeHistory(entry.html)

  return (
    <div>
      <article
        className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: before }}
      />
      <EntryMeta entry={entry} />
      {changeHistory && (
        <article
          className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: changeHistory }}
        />
      )}
      <RawMarkdownToggle raw={entry.raw} />
    </div>
  )
}

export default function DocPage() {
  const { pathname } = useLocation()
  const { getBySlug, navTree } = useContent()

  const slug = pathname === '/' ? '/' : pathname.replace(/\/$/, '')

  if (slug === '/') {
    return <HomePage />
  }

  if (slug === '/tooling') {
    return <ToolingPage />
  }

  // Section index pages get a card grid instead of raw markdown
  const sectionKey = slug.replace(/^\//, '')
  if (sectionKey in SECTION_LABELS && !sectionKey.includes('/')) {
    return <SectionIndex section={sectionKey} title={SECTION_LABELS[sectionKey]} />
  }

  const entry = getBySlug(slug)

  if (!entry) {
    // Check if this is a directory node in the nav tree (subsection like /guidelines/language)
    const dirNode = findNavNode(navTree, slug)
    if (dirNode && dirNode.children.length > 0) {
      return <SectionIndex section={slug.replace(/^\//, '')} title={dirNode.label} />
    }

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
