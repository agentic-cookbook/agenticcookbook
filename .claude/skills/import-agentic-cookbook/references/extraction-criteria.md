# Component Extraction Criteria

## When to extract a component into a cookbook recipe

A component is a good candidate for extraction when it meets **at least 3** of these criteria:

### Reusability
- [ ] Used (or could be used) in 2+ projects
- [ ] Not tightly coupled to app-specific data models
- [ ] Has a clear, generic purpose (not "UserProfileHeader" but "DetailHeader")

### Complexity
- [ ] Has meaningful behavior beyond simple display (state, interaction, animation)
- [ ] Has 2+ visual states (default, loading, error, empty, etc.)
- [ ] Involves platform-specific implementation differences worth documenting

### Quality
- [ ] The existing implementation is production-quality or close to it
- [ ] Accessibility has been considered
- [ ] The component handles edge cases (empty data, long text, RTL, etc.)

### Value
- [ ] Specifying it once would save significant re-implementation time
- [ ] Cross-platform consistency matters for this component
- [ ] The component embodies design decisions worth preserving

## When NOT to extract

- Trivial wrappers (a styled `Text`, a colored `Divider`)
- App-specific screens with domain logic embedded
- Components that are likely to change significantly before stabilizing
- One-off prototypes or experiments

## Bundling criteria

The most common mistake is extracting individual files as separate recipes when they form a single feature bundle. **Bundle related things together.**

### How to identify a bundle

A bundle is a group of files that:
- [ ] Have a **call chain** — one component calls or creates the others (use LSP callHierarchy to verify)
- [ ] Share **settings** — they are configured by the same settings keys or options
- [ ] Are **co-created** — they were added in the same git commits or Roadmap
- [ ] Are **useless alone** — the core view doesn't function without the supporting manager/provider/model

### Examples of correct bundling

| Wrong (separate recipes) | Right (one bundled recipe) |
|------------------------|--------------------------|
| FileTreeView + DirectoryWatchCoordinator + FileSystemWatcher + FileTreeCache | `file-tree-browser.md` (recipe that includes all four + settings) |
| TerminalSession + SessionManager + TerminalViewRepresentable + TerminalProfile | `terminal-pane.md` (recipe that includes all four) |
| SettingsView + SettingsKeys + GeneralSettingsView + ProfilesSettingsView | `settings-window.md` (recipe with categories) |

### What stays separate

- Components that are genuinely independent building blocks used by multiple bundles (e.g., `empty-state.md`, `status-bar.md`, `metadata-line.md`)
- Cross-cutting utilities (e.g., `window-frame-persistence.md`)
- Data patterns (e.g., `color-profile.md` — used by terminal AND editor)

### How to reference between recipes

Use the `dependencies` frontmatter field:
```yaml
dependencies:
  - cookbook.recipes.ui.component.status-bar
  - cookbook.recipes.infrastructure.directory-sync
```

And reference in the Overview: "This recipe uses the `cookbook.recipes.ui.component.status-bar` component for sync progress indication."

## Naming guidelines for extracted recipes

- Use generic, descriptive names: `detail-card.md` not `user-profile-card.md`
- Use kebab-case for filenames
- Prefix recipes with their domain: `settings-window.md`, `onboarding-flow.md`
- If a component is a variant of an existing recipe, propose adding options to the existing recipe rather than creating a new one
