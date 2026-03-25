# Litterbox

A library of UI component specifications for Claude Code. This repo contains no code — only markdown specs that describe how components should look, behave, and be implemented on each platform.

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

### Spec format

All specs (components and recipes) follow the same format. Specs are plain Markdown with a YAML frontmatter block. The primary consumer is an LLM reading prose + examples, not a code generator parsing a schema.

#### Frontmatter

```yaml
---
version: 1.0.0
status: draft | review | accepted | deprecated
created: YYYY-MM-DD
last-updated: YYYY-MM-DD
author: Name or claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, iOS, watchOS, tvOS, visionOS, Android, Web]
tags: [category, feature-area]
dependencies:
  - ui/other-component.md@1.0.0
---
```

- **version**: Semver. Bump major for breaking changes, minor for new requirements, patch for clarifications.
- **status**: `draft` (work in progress), `review` (ready for feedback), `accepted` (stable, safe to implement), `deprecated` (superseded).
- **created**: Date the spec was first written (immutable).
- **last-updated**: Date of the most recent change.
- **author**: Who wrote the spec — a person's name or `claude-code`.
- **copyright**: Always `YYYY Mike Fullerton / Temporal` with the current year.
- **platforms**: Which platforms this spec targets. Helps the LLM skip irrelevant platform notes.
- **tags**: Freeform labels for discoverability.
- **dependencies**: Other specs this spec references, with version pins. Omit if none.

#### Requirements

Use RFC 2119 keywords (`MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, `MAY`) for all behavioral requirements. Each requirement is numbered sequentially as `REQ-001`, `REQ-002`, etc. This makes requirements unambiguous, testable, and referenceable from test vectors.

#### Placeholder tokens

Use `{{placeholder}}` tokens for values that are app-specific and resolved at implementation time. Examples: `{{bundle_id}}`, `{{app_name}}`, `{{primary_color}}`.

#### Test vectors

Each spec includes a **Conformance Test Vectors** section with concrete input/output pairs linked to REQ-NNN numbers. This is the machine-verifiable part of the spec — the LLM can implement these as unit tests to confirm correct behavior.

For complex components, test vectors may also be published as separate JSON files in a `vectors/` directory for machine consumption.

#### Standard sections

Specs SHOULD include these sections in order (omit sections that don't apply):

1. **Overview** — purpose, scope, when to use
2. **Terminology** — domain-specific terms (if any)
3. **Behavioral Requirements** — REQ-NNN with RFC 2119 keywords
4. **Appearance** — visual spec with concrete values
5. **States** — state table with appearance/behavior changes
6. **Accessibility** — roles, labels, keyboard nav, tap targets
7. **Conformance Test Vectors** — input/output pairs linked to REQ-NNN
8. **Edge Cases** — boundary conditions, error states
9. **Logging** — spec-defined log messages (see Rule 9)
10. **Platform Notes** — Swift, Kotlin, TypeScript guidance
11. **Design Decisions** — LLM-made choices that need user approval (see Rule 6)
12. **Changelog** — version history

## Rules

All projects consuming this repo must follow these rules when implementing components.

### 1. Prefer native controls

Always use the platform's built-in controls, views, view controllers, behaviors, and layout primitives before implementing custom versions. Examples: `NavigationSplitView` over a custom sidebar, `UIAlertController` over a custom dialog, `Material3` components over custom Compose widgets.

When generating a component, explicitly note in the output which native controls are being used and why. If there is any ambiguity about whether a native control fits the spec, ask the user before proceeding.

### 1.1. For novel components, prefer proven open-source solutions

When no native control exists, research battle-tested open-source libraries and present options to the user before building a custom solution. A custom implementation can always be chosen instead, but it should be a deliberate decision, not a default.

### 2. Instant responsiveness

UI must feel instantly responsive. Tap targets should react on press (not on release), transitions should begin immediately, and layouts should never visibly reflow after appearing.

### 3. No blocking the main thread

All lengthy work must run on background threads or tasks using the platform's best-in-class async primitives — Swift Concurrency (`async`/`await`, `Task`, actors), Kotlin Coroutines (`viewModelScope`, `Dispatchers.IO`), Web Workers, `Promise`/`async` in JS/TS. Never block the main/UI thread.

### 4. Always show progress

When the UI is waiting on an async task:
- Show **determinate progress** (progress bar with percentage) when the total work is known
- Show **indeterminate progress** (spinner, skeleton, shimmer) when it is not
- Never show a frozen or unresponsive UI during a wait

### 5. Comprehensive unit testing

All implementations should be unit tested as thoroughly as possible. UI tests are notoriously difficult and fragile — prioritize unit tests over UI tests. Test component logic, state transitions, edge cases, and accessibility properties. Every component implementation should include a corresponding test file.

### 6. Surface all design decisions

When generating a component, any decision made by the LLM that contributes to the visual or behavioral outcome must be explicitly noted and approved by the user. Examples:
- Choosing a gear icon for a settings button
- Picking a specific animation curve or duration
- Selecting a particular layout pattern when the spec is ambiguous

These decisions must be recorded in the component spec under a **Design Decisions** section so that repeated generations — or generations on other platforms — produce consistent results.

### 7. Small, atomic commits

Commits in this repo must be small and represent exactly one logical or conceptual change. A single change may touch multiple spec files if they are part of the same concept. Commits should happen automatically as work progresses — do not batch up multiple unrelated changes.

### 9. Instrumented logging for all flows

Every component and flow must be instrumented with structured logging using the platform's best-in-class logging framework:

- **Apple**: `os.log` (`Logger` from the `os` module) — use a subsystem matching the bundle ID and a category per component/flow
- **Android/Kotlin**: `Timber` (or `android.util.Log` if no dependency is desired)
- **Web/JS/TS**: `console` with structured prefixes, or a logger like `pino`/`winston` in Node contexts

**Log level**: Use `debug` level for all UI flow instrumentation. This keeps logs silent in production but visible when an LLM (or developer) is iterating on the component in a debug build.

**What to log**: State transitions, user interactions, async task start/completion/failure, and any branching logic. Example for a button:

```
[Debug] PrimaryButton: tapped, starting async action
[Debug] PrimaryButton: async action completed (success, 230ms)
[Debug] PrimaryButton: state changed to disabled
```

**Spec-defined log messages**: Each component spec must define the exact log messages in a **Logging** section. This eliminates ambiguity — the LLM can build, run, and grep for expected log output to verify correct behavior without visual inspection. Example spec section:

```markdown
## Logging

Subsystem: `{{bundle_id}}` | Category: `PrimaryButton`

| Event | Level | Message |
|-------|-------|---------|
| Tap | debug | `PrimaryButton: tapped, starting async action` |
| Action success | debug | `PrimaryButton: async action completed (success, {duration}ms)` |
| Action failure | debug | `PrimaryButton: async action failed ({error})` |
| State change | debug | `PrimaryButton: state changed to {state}` |
```

This logging output becomes a verification tool — after running the test app, the LLM can check logs to confirm the component executed the correct flow.

### 8. Post-generation verification

Every generated artifact must be verified. The verification method depends on what was generated:

- **Component code**: Build the project for all target platforms (`xcodebuild`, `./gradlew build`, `npm run build`). A component that doesn't compile is not done.
- **Unit tests**: Run the full test suite. All tests must pass.
- **Lint/format**: Run the platform's standard linter (`swiftlint`, `ktlint`, `eslint`) if configured in the project.
- **Accessibility audit**: Verify VoiceOver/TalkBack labels exist, tap targets meet platform minimums (44pt iOS, 48dp Android), contrast ratios are sufficient.
- **Preview rendering**: For SwiftUI, verify `#Preview` blocks render without crashes. For Compose, verify `@Preview` functions compile.
- **Catalog entry**: Build and run the test app from `Tests/` to visually confirm the component renders correctly in all states.
- **Snapshot tests**: Capture reference images of each component in all states. On subsequent generations, compare against reference snapshots to detect visual regressions. Use the platform-appropriate snapshot library:
  - **Swift**: [swift-snapshot-testing](https://github.com/pointfreeco/swift-snapshot-testing) — captures SwiftUI views as images, supports per-device and per-OS snapshots
  - **Compose/Android**: [Paparazzi](https://github.com/cashapp/paparazzi) — renders Compose components off-device, no emulator required
  - **Web/React**: [Playwright](https://playwright.dev/) screenshot comparison or [Storybook](https://storybook.js.org/) visual tests
  - Reference snapshots are stored in the test project alongside the component catalog. On first run, snapshots are recorded. On subsequent runs, differences are flagged for review.

- **Run and verify logs**: After building, run the test app and verify that spec-defined log messages appear in the output. Use `log stream --predicate 'subsystem == "{{bundle_id}}"' --level debug` (macOS), `adb logcat` (Android), or browser console (Web) to capture and grep for expected messages.
- **Code review against best practices**: Review the implementation against the platform's best practices references (see Best Practices References section below). Check for: HIG/Material compliance, accessibility guideline adherence, security best practices (OWASP), and coding convention conformance.

If any verification step fails, fix the issue before considering the work complete.

### 10. Deep linking

All significant feature points and views MUST be deep linkable using the platform's native URL/deep link mechanism. This ensures features are reachable from external sources (notifications, widgets, other apps, web links).

- **Apple**: Universal Links + custom URL schemes. Use `onOpenURL` in SwiftUI, `NavigationPath` for state restoration.
- **Android**: App Links + intent filters. Use Navigation component deep link support.
- **Web**: URL routing (React Router, Next.js routing, etc.). Every view should have a unique, shareable URL.

Each spec SHOULD include a **Deep Linking** section defining the URL patterns for the component or flow.

### 11. Scriptable and automatable

Components and flows SHOULD be scriptable and automatable where the platform supports it. Automation-first design enables power users, testing, and accessibility.

- **macOS**: Expose actions via `AppIntents` for Shortcuts. Support AppleScript via `NSScriptCommand` where appropriate.
- **iOS**: `AppIntents` framework for Shortcuts and Siri integration.
- **Android**: `AppActions` for Google Assistant. `Intent`-based automation support.
- **Web**: Exposed API endpoints or query parameter-driven actions.

### 12. Accessibility from day one

All components MUST integrate with platform accessibility APIs from the initial implementation — not as a follow-up task. This includes:

- Semantic roles and labels on all interactive elements
- VoiceOver (Apple) / TalkBack (Android) / screen reader (Web) full support
- Keyboard and switch control navigation for all interactive elements
- Dynamic Type / font scaling support — layouts MUST NOT break at larger text sizes
- Sufficient color contrast (WCAG AA minimum: 4.5:1 for text, 3:1 for large text)
- Meaningful focus order that follows visual layout

If any verification step fails, fix the issue before considering the work complete.

## Testing components

Test app specs live in `Tests/Apps/`. Each spec describes how to generate an IDE project for a platform to visually test components in a catalog app.

- **Apple**: `Tests/Apps/apple.md` — XcodeGen project with iOS, macOS, watchOS, tvOS, visionOS targets
- Generated projects go in `Tests/Projects/` (gitignored — no generated code in the repo)

To test a component: generate the project per the platform spec, implement the component from its `ui/` spec, add a catalog view showing all states, then build.
