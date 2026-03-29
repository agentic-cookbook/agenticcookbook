import { Link } from 'react-router'
import { useContent } from '../../contexts/ContentContext'

const SECTIONS = [
  {
    key: 'principles',
    label: 'Principles',
    description: 'Foundational ideas that guide all technical decisions. How to think about engineering.',
    path: '/principles',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    key: 'guidelines',
    label: 'Guidelines',
    description: 'Topic-organized rules for testing, security, UI, networking, data, and more.',
    path: '/guidelines',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    key: 'recipes',
    label: 'Recipes',
    description: 'Concrete component and pattern specs. Battle-tested blueprints you can build from.',
    path: '/recipes',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    key: 'compliance',
    label: 'Compliance',
    description: 'Automated checks for accessibility, security, privacy, performance, and platform compliance.',
    path: '/compliance',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    key: 'workflow',
    label: 'Workflow',
    description: 'Planning, implementation, verification, and review processes for AI-assisted development.',
    path: '/workflow',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    key: 'reference',
    label: 'Reference',
    description: 'Curated external best-practices links organized by platform and topic.',
    path: '/reference',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5-4.5 0 00-6.364 6.364L4.757 8.57" />
      </svg>
    ),
  },
]

export default function HomePage() {
  const { entries, getBySection } = useContent()

  return (
    <div className="px-6 py-10 lg:px-10 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <h1
          className="text-5xl lg:text-6xl mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Agentic Cookbook
        </h1>
        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-6">
          Principles, guidelines, recipes, and workflows for AI-assisted multi-platform development.
          All content is markdown consumed directly by AI agents — rendered here for humans.
        </p>
        <div className="flex items-center gap-6 font-mono text-sm text-[var(--color-text-dim)]">
          <span>{entries.length} documents</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>{SECTIONS.length} sections</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>MIT licensed</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--color-border-subtle)] mb-10" />

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map(({ key, label, description, path, icon }) => {
          const count = getBySection(key).length
          return (
            <Link
              key={key}
              to={path}
              className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5 text-[var(--color-text-dim)] group-hover:text-[var(--color-accent)] transition-colors">
                  {icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <h2
                      className="text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {label}
                    </h2>
                    <span className="font-mono text-xs text-[var(--color-text-dim)] ml-3 shrink-0">
                      {count}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
