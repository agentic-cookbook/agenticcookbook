import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { fetchTool, fetchTools, type Tool } from '../lib/api'

const phaseColors: Record<string, string> = {
  plan: 'var(--color-info)',
  implement: 'var(--color-success)',
  verify: 'var(--color-accent)',
}

export function ToolDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tool, setTool] = useState<Tool | null>(null)
  const [related, setRelated] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)

    fetchTool(id)
      .then(t => {
        setTool(t)
        // Fetch related tools in the same category
        return fetchTools({ category: t.category, limit: '7' })
      })
      .then(res => {
        setRelated(res.data.filter(t => t.id !== id).slice(0, 6))
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (loading) {
    return (
      <div className="px-6 py-8 lg:px-10 max-w-3xl">
        <div className="h-8 w-48 rounded bg-[var(--color-surface-raised)] animate-pulse mb-4" />
        <div className="h-4 w-96 rounded bg-[var(--color-surface-raised)] animate-pulse mb-2" />
        <div className="h-4 w-72 rounded bg-[var(--color-surface-raised)] animate-pulse" />
      </div>
    )
  }

  if (error || !tool) {
    return (
      <div className="px-6 py-8 lg:px-10 max-w-3xl">
        <h1
          className="text-4xl mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Tool Not Found
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          The tool you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/tools"
          className="font-mono text-xs text-[var(--color-accent)] hover:underline"
        >
          Browse all tools
        </Link>
      </div>
    )
  }

  const phases = tool.loop_phases.split(',').map(p => p.trim()).filter(Boolean)
  const platforms = tool.platforms?.split(',').map(p => p.trim()).filter(Boolean) ?? []
  const languages = tool.languages?.split(',').map(l => l.trim()).filter(Boolean) ?? []

  return (
    <div className="px-6 py-8 lg:px-10 max-w-3xl">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1 font-mono text-xs text-[var(--color-text-dim)]">
          <li>
            <Link to="/tools" className="hover:text-[var(--color-text-secondary)]">
              Tools
            </Link>
          </li>
          <li className="text-[var(--color-border)]">/</li>
          <li>
            <Link
              to={`/categories/${tool.category}`}
              className="hover:text-[var(--color-text-secondary)]"
            >
              {tool.category}
            </Link>
          </li>
          <li className="text-[var(--color-border)]">/</li>
          <li className="text-[var(--color-text-secondary)]">{tool.name}</li>
        </ol>
      </nav>

      {/* Title */}
      <h1
        className="text-4xl lg:text-5xl mb-3 tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {tool.name}
      </h1>

      {/* Description */}
      <p className="text-lg text-[var(--color-text-secondary)] mb-6" style={{ lineHeight: 1.8 }}>
        {tool.description}
      </p>

      {/* Metadata */}
      <dl className="flex flex-col gap-3 mb-8">
        <MetaRow label="Category">
          <Link
            to={`/categories/${tool.category}`}
            className="hover:text-[var(--color-text-primary)] underline"
          >
            {tool.category}
          </Link>
          {tool.subcategory && (
            <span className="text-[var(--color-text-dim)]"> / {tool.subcategory}</span>
          )}
        </MetaRow>

        <MetaRow label="Phases">
          <div className="flex flex-wrap gap-1.5">
            {phases.map(phase => (
              <span
                key={phase}
                className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                style={{
                  color: phaseColors[phase] ?? 'var(--color-text-dim)',
                  borderColor: `color-mix(in srgb, ${phaseColors[phase] ?? 'var(--color-text-dim)'} 30%, transparent)`,
                  backgroundColor: `color-mix(in srgb, ${phaseColors[phase] ?? 'var(--color-text-dim)'} 8%, transparent)`,
                }}
              >
                {phase}
              </span>
            ))}
          </div>
        </MetaRow>

        {platforms.length > 0 && (
          <MetaRow label="Platforms">
            <div className="flex flex-wrap gap-1">
              {platforms.map(p => (
                <span
                  key={p}
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]"
                >
                  {p}
                </span>
              ))}
            </div>
          </MetaRow>
        )}

        {languages.length > 0 && (
          <MetaRow label="Languages">
            <div className="flex flex-wrap gap-1">
              {languages.map(l => (
                <span
                  key={l}
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]"
                >
                  {l}
                </span>
              ))}
            </div>
          </MetaRow>
        )}

        {tool.integration_method && (
          <MetaRow label="Integration">
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]">
              {tool.integration_method}
            </span>
          </MetaRow>
        )}

        {tool.license && (
          <MetaRow label="License">
            <span>{tool.license}</span>
          </MetaRow>
        )}

        <MetaRow label="Maintained">
          <span style={{ color: tool.maintained ? 'var(--color-success)' : 'var(--color-error)' }}>
            {tool.maintained ? 'Yes' : 'No'}
          </span>
        </MetaRow>

        {tool.last_verified && (
          <MetaRow label="Verified">
            <span>{new Date(tool.last_verified).toLocaleDateString()}</span>
          </MetaRow>
        )}
      </dl>

      {/* Install command */}
      {tool.install_command && (
        <div className="mb-8">
          <h2
            className="text-lg mb-2 font-medium"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Install
          </h2>
          <div className="relative group">
            <pre className="p-4 rounded-md bg-[var(--color-surface-raised)] border border-[var(--color-border-subtle)] overflow-x-auto font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
              {tool.install_command}
            </pre>
            <button
              onClick={() => handleCopy(tool.install_command!)}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-all"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3 mb-10">
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-dim)] transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Official Site
          </a>
        )}
        {tool.github_url && (
          <a
            href={tool.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-dim)] transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>
        )}
      </div>

      {/* Related tools */}
      {related.length > 0 && (
        <>
          <div className="border-t border-[var(--color-border-subtle)] pt-8">
            <h2
              className="text-lg mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Related Tools
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map(t => (
                <Link
                  key={t.id}
                  to={`/tools/${t.id}`}
                  className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200"
                >
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate mb-1">
                    {t.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <dt className="font-mono text-xs text-[var(--color-text-dim)] w-24 shrink-0 pt-0.5">
        {label}
      </dt>
      <dd className="text-sm text-[var(--color-text-secondary)]">
        {children}
      </dd>
    </div>
  )
}
