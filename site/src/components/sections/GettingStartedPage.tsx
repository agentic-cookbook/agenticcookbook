export default function GettingStartedPage() {
  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Getting Started
        </h1>
      </div>

      <div className="flex flex-col gap-8 max-w-2xl">
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          Clone the cookbook repository, then run the import skill from your project directory. That's it.
        </p>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] px-5 py-3">
            <code className="font-mono text-sm text-[var(--color-text-secondary)]">
              git clone git@github.com:mikefullerton/agentic-cookbook.git
            </code>
          </div>
          <div className="rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] px-5 py-3">
            <code className="font-mono text-sm text-[var(--color-accent)]">
              /import-cookbook
            </code>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <p>
            The import skill installs <code className="font-mono text-xs bg-[var(--color-surface-raised)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">cookbook.md</code> into your project's <code className="font-mono text-xs bg-[var(--color-surface-raised)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">.claude/rules/</code> directory, updates your CLAUDE.md, and offers recommended plugins.
          </p>
          <p>
            From that point on, Claude reads the cookbook rule automatically at session start. It reads principles before planning, walks through guideline checklists, searches for matching recipes, and verifies implementations against the full standard.
          </p>
          <p>
            Run <code className="font-mono text-xs bg-[var(--color-surface-raised)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">/configure-cookbook</code> to customize — toggle recipe prompts, contribution prompts, and install optional rules for structured git workflows and auto-linting.
          </p>
        </div>
      </div>
    </div>
  )
}
