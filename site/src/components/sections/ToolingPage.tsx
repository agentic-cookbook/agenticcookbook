const SKILL_GROUPS = [
  {
    label: 'Setup & Configuration',
    description: 'Get the cookbook installed and configured in your project.',
    skills: [
      {
        command: '/import-cookbook',
        version: '6.0.3',
        summary: 'First-time onboarding — installs cookbook.md into your project\'s .claude/rules/, updates CLAUDE.md, and offers recommended plugins.',
        example: '/import-cookbook',
      },
      {
        command: '/configure-cookbook',
        version: '2.0.0',
        summary: 'Manage cookbook preferences — toggle recipe prompts, contribution prompts, and install optional rules like committing.md and auto-lint.md.',
        example: '/configure-cookbook',
      },
    ],
  },
  {
    label: 'Review & Linting',
    description: 'Lint your implementation, extensions, and compliance against cookbook standards.',
    skills: [
      {
        command: '/lint-with-cookbook',
        version: '1.0.0',
        summary: 'Lint an implementation against the full guideline checklist or a specific recipe. Produces a PASS/WARN/FAIL report across 20+ categories.',
        example: '/lint-with-cookbook guidelines',
      },
      {
        command: '/lint-skill',
        version: '1.0.1',
        summary: 'Lint a Claude Code skill against best practices — frontmatter, structure, content quality, and error handling.',
        example: '/lint-skill .claude/skills/my-skill/',
      },
      {
        command: '/lint-rule',
        version: '1.0.1',
        summary: 'Lint a rule file for clarity, single responsibility, explicit file paths, and MUST/MUST NOT sections.',
        example: '/lint-rule .claude/rules/my-rule.md',
      },
      {
        command: '/lint-agent',
        version: '1.0.1',
        summary: 'Lint a Claude Code agent for tool permissions, bounded execution (maxTurns), description quality, and best practices.',
        example: '/lint-agent .claude/agents/my-agent.md',
      },
      {
        command: '/lint-compliance',
        version: '1.0.0',
        summary: 'Evaluate a recipe or guideline against 10 compliance categories — security, accessibility, privacy, performance, and more.',
        example: '/lint-compliance cookbook/recipes/ui/component/status-bar.md',
      },
    ],
  },
  {
    label: 'Authoring & Contributing',
    description: 'Design new recipes and contribute them back to the cookbook.',
    skills: [
      {
        command: '/plan-cookbook-recipe',
        version: '2.2.0',
        summary: 'Interactive recipe design through guided conversation. Walks through all 17 sections — requirements, states, appearance, accessibility, logging, and more.',
        example: '/plan-cookbook-recipe file-browser-panel',
      },
      {
        command: '/contribute-to-cookbook',
        version: '2.2.0',
        summary: 'Create a PR to the cookbook. Auto-detects push access vs. fork-based workflow, handles worktree setup, and creates the PR.',
        example: '/contribute-to-cookbook',
      },
    ],
  },
  {
    label: 'Validation',
    description: 'Verify cookbook integrity across all content.',
    skills: [
      {
        command: '/validate-cookbook',
        version: '1.0.1',
        summary: 'Validate frontmatter, cross-references, indexes, skills, rules, and file placement. Runs 7 validation categories in parallel with optional --fix mode.',
        example: '/validate-cookbook --fix',
      },
    ],
  },
  {
    label: 'Help & Feedback',
    description: 'Get help, report bugs, and suggest improvements.',
    skills: [
      {
        command: '/cookbook-help',
        version: '1.0.0',
        summary: 'Interactive guide — installation status, content overview, available skills, searching, contributing, and troubleshooting.',
        example: '/cookbook-help',
      },
      {
        command: '/cookbook-bug',
        version: '1.0.0',
        summary: 'File a structured bug report as a GitHub issue with category, severity, and affected files.',
        example: '/cookbook-bug',
      },
      {
        command: '/cookbook-suggestion',
        version: '1.0.0',
        summary: 'Suggest new content or improvements. Checks for duplicate issues before creating.',
        example: '/cookbook-suggestion new recipe for onboarding flow',
      },
    ],
  },
]

const RULES = [
  {
    name: 'cookbook.md',
    badge: 'primary',
    summary: 'The full cookbook — principles, guidelines, recipes, and contribution prompts.',
    details: 'Enforces reading all 18 principles before planning, running the guideline checklist with the user, searching for matching recipes, three-phase implementation (Make It Work → Make It Right → Make It Fast), and verification including tests, lint, accessibility, and recipe conformance.',
    snippet: `## Planning
### 1. Read All 18 Principles
Before making any design decision, you MUST read ALL
of the following files...

### 2. Run the Guideline Checklist
Walk through every item in the checklist with the user:
1. "Always" items: Note as applicable. Non-negotiable.
2. "Opt-in" items: Present as included by default.
3. "Opt-out" items: Ask the user if they want to opt in.

### 3. Search for Matching Recipes
Search cookbook/recipes/ recursively for any recipe
that matches the feature being planned.`,
  },
  {
    name: 'committing.md',
    badge: 'optional',
    summary: 'Structured git workflow — worktree, draft PR, atomic commits, squash merge.',
    details: 'Every change flows through a worktree and draft PR. Commits are atomic and pushed immediately. PRs start as drafts and are explicitly marked ready when complete.',
    snippet: `## Setup: Worktree and Draft PR
1. Create a worktree from the project's main branch.
   All work happens in the worktree. Never commit
   directly to the main branch.
2. Create a draft PR immediately — before any code
   is written.
3. Verify the draft PR URL was returned and the
   remote branch exists.

## Working: Commit, Document, Push
1. Commit — small, atomic commits. One logical change
   per commit.
2. Push — push after every commit.
3. Document — add a PR comment for any commit that
   changes a public interface.`,
  },
  {
    name: 'auto-lint.md',
    badge: 'optional',
    summary: 'Auto-lint skills, agents, and rules on creation or modification.',
    details: 'After creating or modifying any Claude Code extension, the appropriate linter must run. FAIL items must be fixed; WARN items must be documented.',
    snippet: `## When to Lint
You MUST run the linter after ANY of these actions:
- Creating a new skill
- Modifying an existing skill's SKILL.md
- Creating a new agent or rule file

## What to Do with Results
1. FAIL items: Fix all before considering work complete.
2. WARN items: Present to the user and document which
   are accepted as-is.
3. PASS items: No action needed.`,
  },
  {
    name: 'permissions.md',
    badge: 'reference',
    summary: 'Atomic permission prompts — one yes/no before implementation, zero interruptions after.',
    details: 'Audit the plan for all permissions needed and present them as a single prompt. The goal is zero mid-execution permission prompts so the user can walk away.',
    snippet: `=== Permissions Required ===

This implementation needs the following.
Approve all or decline all.

Files:
- Write .claude/rules/cookbook.md — install rule
- Edit CLAUDE.md — add Agentic Cookbook section

Commands:
- mkdir -p .claude/rules — create rules directory
- git add/commit/push — commit changes

Approve all? (yes / no)`,
  },
  {
    name: 'skill-authoring.md',
    badge: 'reference',
    summary: 'Check inventory before creating skills, prevent duplicates, update docs after.',
    details: 'Read the skill inventory, check for naming conflicts, follow the structure reference, use $ARGUMENTS for input, and update CLAUDE.md and README after creation.',
    snippet: null,
  },
  {
    name: 'skill-versioning.md',
    badge: 'reference',
    summary: 'Semver versioning — every change gets a bump, --version support, session staleness checks.',
    details: 'Skills use a version field in frontmatter. Every modification requires a version bump. Skills must support --version, print version on invocation, and detect stale loaded versions.',
    snippet: null,
  },
  {
    name: 'extension-authoring.md',
    badge: 'reference',
    summary: 'Optional best practices for creating skills, agents, and rules in your project.',
    details: 'Covers duplicate checking, versioning, atomic permissions, error handling, imperative tone for rules, and tool restrictions for agents.',
    snippet: null,
  },
]

function BadgeLabel({ type }: { type: string }) {
  const colors: Record<string, string> = {
    primary: 'text-[var(--color-accent)] bg-[var(--color-accent-dim)]',
    optional: 'text-[var(--color-info)] bg-[rgba(90,143,212,0.12)]',
    reference: 'text-[var(--color-text-dim)] bg-[var(--color-surface-hover)]',
  }
  return (
    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${colors[type] ?? colors.reference}`}>
      {type}
    </span>
  )
}

function SkillCard({ skill }: { skill: (typeof SKILL_GROUPS)[0]['skills'][0] }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <code className="text-sm font-semibold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
          {skill.command}
        </code>
        <span className="font-mono text-[10px] text-[var(--color-text-dim)]">
          v{skill.version}
        </span>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
        {skill.summary}
      </p>
      <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] px-3 py-1.5">
        <code className="font-mono text-[11px] text-[var(--color-text-dim)]">
          {skill.example}
        </code>
      </div>
    </div>
  )
}

function RuleCard({ rule }: { rule: (typeof RULES)[0] }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5">
      <div className="flex items-center gap-2.5 mb-2">
        <code className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-mono)' }}>
          {rule.name}
        </code>
        <BadgeLabel type={rule.badge} />
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-1">
        {rule.summary}
      </p>
      <p className="text-xs text-[var(--color-text-dim)] leading-relaxed">
        {rule.details}
      </p>
      {rule.snippet && (
        <pre className="mt-4 p-4 rounded-md bg-[var(--color-surface)] border border-[var(--color-border-subtle)] overflow-x-auto font-mono text-[11px] text-[var(--color-text-dim)] leading-relaxed whitespace-pre-wrap">
          {rule.snippet}
        </pre>
      )}
    </div>
  )
}

export default function ToolingPage() {
  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      {/* Hero */}
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Tooling
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-4">
          Skills and rules that enforce the cookbook during planning, implementation, and review.
          Skills are interactive slash commands. Rules are terse markdown files that activate automatically.
        </p>
        <div className="flex items-center gap-6 font-mono text-sm text-[var(--color-text-dim)]">
          <span>{SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0)} skills</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>{RULES.length} rules</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--color-border-subtle)] mb-10" />

      {/* Skills */}
      <section className="mb-16">
        <h2
          className="text-2xl mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Skills
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8 max-w-2xl">
          Slash commands you invoke in Claude Code. Each skill is a self-contained workflow with version tracking, argument handling, and error recovery.
        </p>

        <div className="flex flex-col gap-10">
          {SKILL_GROUPS.map(({ label, description, skills }) => (
            <div key={label}>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-0.5">
                  {label}
                </h3>
                <p className="text-xs text-[var(--color-text-dim)]">
                  {description}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <SkillCard key={skill.command} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section>
        <h2
          className="text-2xl mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Rules
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 max-w-2xl">
          Terse, imperative markdown files installed into your project's <code className="text-xs bg-[var(--color-surface-raised)] px-1.5 py-0.5 rounded font-mono border border-[var(--color-border-subtle)]">.claude/rules/</code> directory.
          Rules activate automatically — Claude reads them at session start and follows them throughout.
        </p>
        <p className="text-xs text-[var(--color-text-dim)] mb-8 max-w-2xl">
          The <BadgeLabel type="primary" /> rule is installed by <code className="font-mono text-[11px]">/import-cookbook</code>.{' '}
          <BadgeLabel type="optional" /> rules are offered during <code className="font-mono text-[11px]">/configure-cookbook</code>.{' '}
          <BadgeLabel type="reference" /> rules are used within the cookbook repo itself.
        </p>

        <div className="flex flex-col gap-4">
          {RULES.map((rule) => (
            <RuleCard key={rule.name} rule={rule} />
          ))}
        </div>
      </section>

      {/* Usage Example */}
      <section id="example" className="mt-16 border-t border-[var(--color-border-subtle)] pt-10">
        <h2
          className="text-2xl mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          What It Looks Like
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-8 max-w-2xl">
          A walkthrough of the cookbook in action on a real project.
        </p>

        <div className="prose max-w-none prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none text-sm leading-relaxed">
          <p>
            You're building a file browser panel for your IDE. You open Claude Code and say{' '}
            <em>"I need a file tree browser with lazy loading, git status badges, and ignore patterns."</em>
          </p>

          <p>
            Claude reads the <code>cookbook.md</code> rule automatically — no slash command needed. Before writing a single line of code, it reads all 18 principles, then walks you through the guideline checklist:
          </p>

          <blockquote>
            <p>
              <strong>Always items</strong> — accessibility labels, progress indicators, keyboard navigation. These are non-negotiable.
              <br />
              <strong>Opt-in items</strong> — deep linking, analytics, RTL support. Included by default — tell me if you want to skip any.
              <br />
              <strong>Opt-out items</strong> — mutation testing, property-based testing. Want to opt in?
            </p>
          </blockquote>

          <p>
            You say <em>"skip RTL for now, add property-based testing."</em> Claude notes it and moves on.
          </p>

          <p>
            Next it searches <code>cookbook/recipes/</code> and finds an exact match:{' '}
            <strong>File Tree Browser</strong> — a complete spec with requirements for lazy loading, git status indicators, selection behavior, keyboard shortcuts, empty states, accessibility, and platform-specific appearance guidance across Swift, Kotlin, TypeScript, and C#.
          </p>

          <p>
            Claude presents the recipe's requirements alongside your customizations and asks for confirmation. You approve, and implementation begins.
          </p>

          <h3>Make It Work, Make It Right, Make It Fast</h3>

          <p>
            The cookbook enforces a three-phase approach. First pass: get the feature working end-to-end. No premature optimization, no gold plating. Claude builds the tree view with basic file loading and selection. It compiles, it runs, it shows files.
          </p>

          <p>
            Second pass: apply the guidelines. Accessibility labels get added to every interactive element. The empty state gets its centered placeholder with an icon and action button — exactly as the recipe specifies. Keyboard navigation follows the platform's conventions (arrow keys expand/collapse on macOS, Enter opens on Windows). Git status badges use the recipe's color-coded character system with priority-based directory rollup.
          </p>

          <p>
            Third pass: performance. Lazy loading kicks in so the tree doesn't choke on a 50,000-file monorepo. Ignore patterns filter out <code>node_modules</code> and <code>.git</code> before they ever hit the UI.
          </p>

          <h3>Verification</h3>

          <p>
            Before Claude considers the work done, it runs through verification: build passes, tests pass, the guideline checklist is green, and the implementation conforms to the recipe. If you opted into property-based testing, those tests exist. If the recipe requires git status indicators, they're not just present — they match the spec's exact badge format and rollup behavior.
          </p>

          <p>
            The recipe said the panel needs a context menu with Reveal in Finder / Show in Explorer. It's there. The recipe said ignore patterns should support both <code>.gitignore</code> syntax and a custom ignore list. It's there. You didn't have to remember any of this — the cookbook did.
          </p>

          <h3>The Point</h3>

          <p>
            Without the cookbook, you'd get a file browser. It would probably work. But the accessibility labels would be an afterthought, the empty state would be a string literal, keyboard navigation would be "we'll add that later," and the git status badges would be whatever Claude felt like inventing.
          </p>

          <p>
            With the cookbook, you get the file browser your users deserve. Every decision backed by a principle, every requirement traceable to a guideline, every UI pattern matching a battle-tested recipe. And the best part — you didn't have to be the one remembering all of it.
          </p>

          <p>
            That's the cookbook. <strong>Good Claude.</strong>
          </p>
        </div>
      </section>

      {/* Installation callout */}
      <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-8">
        <h2
          className="text-xl mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Getting Started
        </h2>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
            Clone the cookbook, then run the onboarding wizard from your project directory:
          </p>
          <div className="flex flex-col gap-2">
            <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] px-4 py-2.5">
              <code className="font-mono text-sm text-[var(--color-text-dim)]">
                git clone git@github.com:mikefullerton/agentic-cookbook.git
              </code>
            </div>
            <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] px-4 py-2.5">
              <code className="font-mono text-sm text-[var(--color-text-dim)]">
                /import-cookbook
              </code>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-dim)] mt-4">
            This installs <code className="font-mono">cookbook.md</code> into your project's <code className="font-mono">.claude/rules/</code>, updates your CLAUDE.md, and offers recommended plugins.
            Customize with <code className="font-mono">/configure-cookbook</code> afterward.
          </p>
        </div>
      </div>
    </div>
  )
}
