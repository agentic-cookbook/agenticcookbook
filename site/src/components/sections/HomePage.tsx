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
  {
    key: 'usage',
    label: 'Usage',
    description: '13 skills and 7 rules that enforce the cookbook during planning, implementation, and review.',
    path: '/usage',
    fixedCount: 20,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 5.384a2.025 2.025 0 01-2.864-2.864l5.384-5.384m2.864 2.864L18 21.75M12.75 3.26c-.142.232-.263.478-.357.736a3.75 3.75 0 01-.357-.736M21.75 12c-.232-.142-.478-.263-.736-.357a3.75 3.75 0 00.736-.357M3.26 12.75c.232.142.478.263.736.357a3.75 3.75 0 01-.736.357M12.75 21.75c.142-.232.263-.478.357-.736a3.75 3.75 0 00-.357.736" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.074 7.638l-3.712-3.712-9.637 9.637a4.5 4.5 0 00-1.08 1.808l-.85 2.478a.75.75 0 00.95.95l2.478-.85a4.5 4.5 0 001.808-1.08l9.637-9.637z" />
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
          className="text-5xl lg:text-6xl mb-8 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Agentic Cookbook
        </h1>

        {/* Narrative — cat-herding style */}
        <div className="max-w-2xl mb-8 italic text-lg text-[var(--color-text-secondary)]" style={{ lineHeight: 1.8 }}>
          <p className="mb-7">
            You're building a file browser panel. You open Claude Code and just start describing what you want — lazy loading, git status badges, ignore patterns. That's it. That's all you say.
          </p>
          <p className="mb-7">
            Before a single line of code is written, Claude reads 18 engineering principles, walks you through a guideline checklist — accessibility, keyboard navigation, progress indicators — and finds a recipe that already specifies everything: selection behavior, keyboard shortcuts, empty states, platform-specific appearance across Swift, Kotlin, TypeScript, and C#. All the things you would have eventually gotten around to thinking about. Already thought about.
          </p>
          <p className="mb-7">
            You approve it. Implementation begins in three phases — make it work, make it right, make it fast. No shortcuts, no "we'll add accessibility later." When it's done, the guideline checklist is green, the recipe is fully satisfied, and the tests pass. The file browser your users deserve, not the file browser you would have settled for.
          </p>
          <p className="not-italic text-[var(--color-text-primary)] font-medium">
            You didn't have to remember any of it. That's the cookbook.
          </p>
        </div>

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
        {SECTIONS.map(({ key, label, description, path, icon, fixedCount }) => {
          const count = fixedCount ?? getBySection(key).length
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

      {/* Contributors */}
      <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-10">
        <h2
          className="text-2xl mb-6 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Contributors
        </h2>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6">
          <h3 className="text-base font-medium text-[var(--color-text-primary)] mb-3">
            <a href="https://www.linkedin.com/in/michaelfullerton/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">Mike Fullerton</a>
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Software engineer in San Jose, CA with deep experience across the Apple ecosystem. Builds developer tools for AI-assisted workflows —{' '}
            <a href="https://github.com/mikefullerton/cat-herding" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Cat Herding</a> for automated roadmap planning and implementation in Claude Code,{' '}
            <a href="https://github.com/mikefullerton/Whippet" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Whippet</a> for real-time Claude Code session monitoring on macOS, and the Agentic Cookbook. Also a lifelong drummer and founder of{' '}
            <a href="http://scratchyfish.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Scratchy Fish</a>, an instrumental improvisation group.
          </p>
        </div>
      </div>
    </div>
  )
}
