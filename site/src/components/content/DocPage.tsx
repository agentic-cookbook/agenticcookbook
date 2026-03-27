import { useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import Breadcrumbs from '../layout/Breadcrumbs'
import TableOfContents from '../layout/TableOfContents'
import FrontmatterDisplay from './FrontmatterDisplay'
import DependencyPanel from './DependencyPanel'

export default function DocPage() {
  const { pathname } = useLocation()
  const { getBySlug } = useContent()

  const slug = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  const entry = getBySlug(slug)

  if (!entry) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            No content at <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{pathname}</code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-4 py-8 lg:px-8">
        <Breadcrumbs slug={entry.slug} />
        <FrontmatterDisplay frontmatter={entry.frontmatter} />
        <article
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-code:before:content-none prose-code:after:content-none"
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
