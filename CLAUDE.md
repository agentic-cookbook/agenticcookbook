# Litterbox

A library of UI component specifications for Claude Code. This repo contains no code — only markdown specs that describe how components should look, behave, and be implemented on each platform.

## Guidelines

This project follows the shared guidelines installed from [cat-herding](../cat-herding) at `~/.claude/guidelines/`. Before implementing any spec, read:

- `~/.claude/guidelines/general.md` — Rules 1-21 (native controls, testing, verification, accessibility, privacy, etc.)
- `~/.claude/guidelines/specs.md` — Spec writing format (frontmatter, REQ-NNN, test vectors, standard sections)
- `~/.claude/guidelines/engineering-principles.md` — Core engineering principles
- `~/.claude/guidelines/best-practices-references.md` — Platform best practices for code review
- Platform-specific guideline matching the target platform (`swift.md`, `kotlin.md`, `typescript.md`)

Also read the local [`engineering-principles.md`](engineering-principles.md) which has expanded rationale and sources for each principle. The review skill (`/litterbox-review`) checks compliance.

### Recipe Domain Scheme

Recipes use path-derived domain identifiers per [`recipes/INDEX.md`](recipes/INDEX.md). The domain is derived from the filesystem path: `recipes/ui/panel/file-tree-browser.md` → `recipe.ui.panel.file-tree-browser`.

| Domain | Path |
|--------|------|
| recipe.ui.component.empty-state | recipes/ui/component/empty-state.md |
| recipe.ui.component.collapsible-pane-header | recipes/ui/component/collapsible-pane-header.md |
| recipe.ui.component.metadata-line | recipes/ui/component/metadata-line.md |
| recipe.ui.component.status-bar | recipes/ui/component/status-bar.md |
| recipe.ui.component.git-status-indicator | recipes/ui/component/git-status-indicator.md |
| recipe.ui.component.color-profile | recipes/ui/component/color-profile.md |
| recipe.ui.component.ai-chat-control | recipes/ui/component/ai-chat-control.md |
| recipe.ui.panel.file-tree-browser | recipes/ui/panel/file-tree-browser.md |
| recipe.ui.panel.code-editor-pane | recipes/ui/panel/code-editor-pane.md |
| recipe.ui.panel.terminal-pane | recipes/ui/panel/terminal-pane.md |
| recipe.ui.panel.inspector-panel | recipes/ui/panel/inspector-panel.md |
| recipe.ui.panel.ai-settings-panel | recipes/ui/panel/ai-settings-panel.md |
| recipe.ui.panel.debug-panel | recipes/ui/panel/debug-panel.md |
| recipe.ui.window.project-window | recipes/ui/window/project-window.md |
| recipe.ui.window.workspace-window | recipes/ui/window/workspace-window.md |
| recipe.ui.window.settings-window | recipes/ui/window/settings-window.md |
| recipe.ui.window.standalone-terminal-window | recipes/ui/window/standalone-terminal-window.md |
| recipe.infrastructure.logging | recipes/infrastructure/logging.md |
| recipe.infrastructure.settings-keys | recipes/infrastructure/settings-keys.md |
| recipe.infrastructure.window-frame-persistence | recipes/infrastructure/window-frame-persistence.md |
| recipe.infrastructure.directory-sync | recipes/infrastructure/directory-sync.md |
| recipe.infrastructure.package-document | recipes/infrastructure/package-document.md |
| recipe.app.lifecycle | recipes/app/lifecycle.md |
| recipe.app.menu-commands | recipes/app/menu-commands.md |

Cross-reference using the domain: "See `recipe.ui.window.project-window`". New categories are added by creating subdirectories under `recipes/`.

### Workflow Specs

Process-oriented recipes describing how Claude Code AI sessions should develop code in consuming projects. These live in `workflow/` and use `WF-` numbering per [`workflow/INDEX.md`](workflow/INDEX.md):

| ID | Spec |
|----|------|
| WF-1 | branching-strategy.md |
| WF-2 | code-planning.md |
| WF-3 | code-implementation.md |
| WF-4 | code-verification.md |
| WF-5 | code-review.md |

Cross-reference using `WF-` notation: "See WF-2" means code-planning.md. "See WF-2.3" means code-planning.md Phase 3. The shared [guideline-checklist.md](workflow/guideline-checklist.md) maps all GUIDE-x.y guidelines to workflow phases.

### Litterbox-specific additions

These supplement the global guidelines for UI component work:

**Instant responsiveness** — UI must feel instantly responsive. Tap targets should react on press (not on release), transitions should begin immediately, and layouts should never visibly reflow after appearing.

**Component verification (extends Rule 8)** — In addition to the standard verification steps, component implementations require:
- **Preview rendering**: For SwiftUI, verify `#Preview` blocks render without crashes. For Compose, verify `@Preview` functions compile.
- **Catalog entry**: Build and run the test app from `Tests/` to visually confirm the component renders correctly in all states.
- **Snapshot tests**: Capture reference images in all states. Compare against reference snapshots on subsequent generations.
  - **Swift**: [swift-snapshot-testing](https://github.com/pointfreeco/swift-snapshot-testing)
  - **Compose/Android**: [Paparazzi](https://github.com/cashapp/paparazzi)
  - **Web/React**: [Playwright](https://playwright.dev/) screenshot comparison or [Storybook](https://storybook.js.org/) visual tests
  - Reference snapshots are stored in the test project alongside the component catalog.

### Litterbox-specific spec format overrides

The global `specs.md` guideline defines the canonical spec format. Litterbox specs use these overrides:

- **platforms**: Use Apple sub-platforms: `[macOS, iOS, watchOS, tvOS, visionOS, Android, Web]` (not the generic `[Apple, Android, Windows, Web]`)
- **dependencies**: Reference paths relative to this repo: `ui/other-component.md@1.0.0`

## Git Workflow

**Owner edits** (you, interactively) go direct to main. **Claude Code sessions and external contributions** go through a branch + PR via worktree.

### Branch naming

| Change type | Branch pattern | Example |
|---|---|---|
| New spec | `spec/<kebab-name>` | `spec/toolbar-buttons` |
| Spec revision | `revise/<kebab-name>` | `revise/settings-window` |
| Multi-spec change | `feature/<description>` | `feature/accessibility-audit` |
| Skill change | `skill/<skill-name>` | `skill/litterbox-plan-spec` |

### Worktree flow

Worktrees go in `../litterbox-wt/` so the main working tree always stays on main (consuming projects read `../litterbox/`).

1. `git worktree add ../litterbox-wt/<branch-name> -b <branch>`
2. Do all work in `../litterbox-wt/<branch-name>/`
3. Update `recipes/INDEX.md` and the CLAUDE.md recipe domain table on the branch
4. Commit, push, create PR with `gh pr create`
5. Review and merge: `gh pr merge --squash`
6. Clean up: `git worktree remove ../litterbox-wt/<branch-name>`
7. Pull main: `git -C /Users/mfullerton/projects/litterbox pull`

### Merge strategy

Squash merge to main. Commit message conventions:
- New spec: `Add <name> <component|recipe> spec`
- Revision: `Bump <name> to v<X.Y.Z>: <description>`

### INDEX.md rule

Every branch that adds, removes, or modifies a recipe MUST update `recipes/INDEX.md` and the CLAUDE.md recipe domain table before opening the PR. Domains are stable — never reuse a domain path, even if the recipe is removed. Merge conflicts in INDEX.md are resolved by keeping both additions.

## How to use this repo

### In consuming projects

Add this section to your project's `CLAUDE.md`:

```markdown
## Shared Component Specs

This project uses component specs from the [litterbox](https://github.com/mikefullerton/litterbox) repo.

- **Expected path**: `../litterbox/`
- **Repo**: `git@github.com:mikefullerton/litterbox.git`
- Before reading any spec, verify `../litterbox/` exists. If it doesn't, ask the user whether to clone it.
- Component specs are in `../litterbox/` — read the spec and implement idiomatically for this project's platform.
- When implementing any feature or component, first check for an existing spec. If none exists, offer to create one following `../litterbox/ui/_template.md` and save it back to that repo.
```

### Implementing a component from a spec

1. Read the spec file in `ui/`
2. Implement using the project's native UI framework (SwiftUI, Compose, React, etc.)
3. Follow the spec's appearance values, behavior, and states exactly
4. Apply platform-specific notes from the spec where applicable
5. Ensure accessibility requirements from the spec are met

### Writing new specs

Use `ui/_template.md` as a starting point. Each spec should be self-contained — include concrete values inline rather than referencing external tokens. A good spec is unambiguous enough that any LLM can implement it without follow-up questions.

### Recipes

Recipes live in `ui/Recipes/` and are specs that combine multiple individual components into a complete flow or feature. A recipe references component specs from `ui/` and describes how they compose together — layout, navigation, data flow, and interaction between components. When implementing a recipe, first implement any referenced components that don't already exist in the project, then assemble them per the recipe.

## Skill & Agent Conventions

All skills and agents created in this repo MUST follow these conventions:

- **Versioned**: Every skill MUST have a semantic version in its frontmatter (`version:` field) AND in the title heading (e.g., `# Skill Name v1.2.0`).
- **Bump on change**: Every modification to a skill MUST increment the version. Patch for fixes, minor for new features, major for breaking changes.
- **Print version on start**: When the skill begins execution, it MUST print the skill name and version as its first output (e.g., `litterbox-import v3.1.0`).
- **`--version` parameter**: Every skill MUST respond to a `--version` argument. If `--version` is passed, print the version and exit immediately — do not run the skill.

## Testing components

Test app specs live in `Tests/Apps/`. Each spec describes how to generate an IDE project for a platform to visually test components in a catalog app.

- **Apple**: `Tests/Apps/apple.md` — XcodeGen project with iOS, macOS, watchOS, tvOS, visionOS targets
- Generated projects go in `Tests/Projects/` (gitignored — no generated code in the repo)

To test a component: generate the project per the platform spec, implement the component from its `ui/` spec, add a catalog view showing all states, then build.
