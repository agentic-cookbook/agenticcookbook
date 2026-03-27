import { Link } from 'react-router'
import { useContent } from '../../contexts/ContentContext'

const SECTIONS = [
  { key: 'principles', label: 'Principles', description: 'How to think about engineering. Foundational ideas that guide all technical decisions.', path: '/principles' },
  { key: 'guidelines', label: 'Guidelines', description: 'What rules apply. Topic-organized guidelines for testing, security, UI, networking, and more.', path: '/guidelines' },
  { key: 'recipes', label: 'Recipes', description: 'What to build. Concrete UI component, panel, and window specifications.', path: '/recipes' },
  { key: 'workflow', label: 'Workflow', description: 'How to work. Branching, planning, implementation, verification, and review processes.', path: '/workflow' },
  { key: 'reference', label: 'Reference', description: 'External best-practices links organized by platform and topic.', path: '/reference' },
]

export default function HomePage() {
  const { getBySection } = useContent()

  return (
    <div className="px-6 py-12 lg:px-10 max-w-3xl">
      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
        Agentic Cookbook
      </h1>
      <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-xl">
        Principles, guidelines, recipes, and workflows for AI-assisted multi-platform development.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map(({ key, label, description, path }) => {
          const count = getBySection(key).length
          return (
            <Link
              key={key}
              to={path}
              className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 hover:border-[var(--color-accent)]/40 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {label}
                </h2>
                <span className="font-mono text-xs text-[var(--color-text-dim)]">
                  {count} {count === 1 ? 'file' : 'files'}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {description}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
