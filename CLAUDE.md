# Litterbox

A library of UI component specifications for Claude Code. This repo contains no code — only markdown specs that describe how components should look, behave, and be implemented on each platform.

## How to use this repo

### In consuming projects

Add these lines to your project's `CLAUDE.md`:

```
Component specs are at ../litterbox/ — when implementing a component from a spec, read the spec file and implement it idiomatically for this project's platform.

When implementing any feature or component, first check ../litterbox/ for an existing spec. If no spec exists for what you're building, offer to create a detailed spec following the litterbox repo's template (../litterbox/ui/_template.md) and save it back to that repo.
```

### Implementing a component from a spec

1. Read the spec file in `ui/`
2. Implement using the project's native UI framework (SwiftUI, Compose, React, etc.)
3. Follow the spec's appearance values, behavior, and states exactly
4. Apply platform-specific notes from the spec where applicable
5. Ensure accessibility requirements from the spec are met

### Writing new specs

Use `ui/_template.md` as a starting point. Each spec should be self-contained — include concrete values inline rather than referencing external tokens. A good spec is unambiguous enough that any LLM can implement it without follow-up questions.

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

If any verification step fails, fix the issue before considering the work complete.

## Testing components

Test app specs live in `Tests/Apps/`. Each spec describes how to generate an IDE project for a platform to visually test components in a catalog app.

- **Apple**: `Tests/Apps/apple.md` — XcodeGen project with iOS, macOS, watchOS, tvOS, visionOS targets
- Generated projects go in `Tests/Projects/` (gitignored — no generated code in the repo)

To test a component: generate the project per the platform spec, implement the component from its `ui/` spec, add a catalog view showing all states, then build.
