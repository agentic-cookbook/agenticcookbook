const GROUPS = [
  {
    label: 'Getting Started',
    items: [
      { name: '/import-cookbook', version: '6.0.3', summary: 'First-time onboarding — installs cookbook.md, updates CLAUDE.md, offers recommended plugins.' },
      { name: '/configure-cookbook', version: '2.0.0', summary: 'Manage preferences — toggle recipe prompts, contribution prompts, install optional rules.' },
    ],
  },
  {
    label: 'Skills',
    items: [
      { name: '/lint-with-cookbook', version: '1.0.0', summary: 'Lint implementation against the full guideline checklist or a specific recipe.' },
      { name: '/lint-skill', version: '1.0.1', summary: 'Lint a Claude Code skill — frontmatter, structure, content quality, error handling.' },
      { name: '/lint-rule', version: '1.0.1', summary: 'Lint a rule file for clarity, single responsibility, and MUST/MUST NOT sections.' },
      { name: '/lint-agent', version: '1.0.1', summary: 'Lint a Claude Code agent for tool permissions, bounded execution, and best practices.' },
      { name: '/lint-compliance', version: '1.0.0', summary: 'Evaluate a recipe or guideline against 10 compliance categories.' },
      { name: '/plan-cookbook-recipe', version: '2.2.0', summary: 'Interactive recipe design — walks through all 17 sections from requirements to logging.' },
      { name: '/contribute-to-cookbook', version: '2.2.0', summary: 'Create a PR to the cookbook with auto-detected push access or fork-based workflow.' },
      { name: '/validate-cookbook', version: '1.0.1', summary: 'Validate frontmatter, cross-references, indexes, skills, rules, and file placement.' },
      { name: '/cookbook-help', version: '1.0.0', summary: 'Interactive guide — status, content overview, skills, searching, troubleshooting.' },
      { name: '/cookbook-bug', version: '1.0.0', summary: 'File a structured bug report as a GitHub issue.' },
      { name: '/cookbook-suggestion', version: '1.0.0', summary: 'Suggest new content or improvements. Checks for duplicates before creating.' },
    ],
  },
  {
    label: 'Rules',
    items: [
      { name: 'cookbook.md', summary: 'The full cookbook — principles, guidelines, recipes, and contribution prompts.' },
      { name: 'committing.md', summary: 'Structured git workflow — worktree, draft PR, atomic commits, squash merge.' },
      { name: 'auto-lint.md', summary: 'Auto-lint skills, agents, and rules on creation or modification.' },
      { name: 'permissions.md', summary: 'Atomic permission prompts — one yes/no before implementation, zero interruptions after.' },
      { name: 'skill-authoring.md', summary: 'Check inventory before creating skills, prevent duplicates, update docs after.' },
      { name: 'skill-versioning.md', summary: 'Semver versioning — every change gets a bump, --version support, staleness checks.' },
      { name: 'extension-authoring.md', summary: 'Best practices for creating skills, agents, and rules in your project.' },
    ],
  },
]

function ItemCard({ name, version, summary }: { name: string; version?: string; summary: string }) {
  return (
    <div className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200">
      <div className="flex items-center gap-2 mb-1.5">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] truncate">
          {name}
        </h3>
        {version && (
          <span className="font-mono text-[10px] text-[var(--color-text-dim)] shrink-0">
            v{version}
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
        {summary}
      </p>
    </div>
  )
}

export default function ToolingPage() {
  const totalItems = GROUPS.reduce((n, g) => n + g.items.length, 0)

  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Usage
        </h1>
        <p className="font-mono text-sm text-[var(--color-text-dim)]">
          {totalItems} items
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {GROUPS.map(({ label, items }) => (
          <div key={label}>
            <h2
              className="text-xl mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {label}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
