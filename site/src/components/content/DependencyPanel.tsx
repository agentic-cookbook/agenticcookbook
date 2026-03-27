import { Link } from 'react-router'
import { useContent } from '../../contexts/ContentContext'

interface DependencyPanelProps {
  dependsOn: string[]
  related: string[]
}

export default function DependencyPanel({ dependsOn, related }: DependencyPanelProps) {
  const { getByDomain } = useContent()

  const deps = dependsOn
    .map((d) => getByDomain(d))
    .filter((e) => e !== undefined)
  const rels = related
    .map((d) => getByDomain(d))
    .filter((e) => e !== undefined)

  if (deps.length === 0 && rels.length === 0) return null

  return (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 space-y-6">
      {deps.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Prerequisites</h3>
          <ul className="space-y-1">
            {deps.map((entry) => (
              <li key={entry.domain}>
                <Link
                  to={entry.slug}
                  className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
                >
                  {entry.frontmatter.title}
                </Link>
                {entry.frontmatter.summary && (
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                    — {entry.frontmatter.summary}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {rels.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Related</h3>
          <ul className="space-y-1">
            {rels.map((entry) => (
              <li key={entry.domain}>
                <Link
                  to={entry.slug}
                  className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
                >
                  {entry.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
