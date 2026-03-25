# Litterbox Rule Checklist

Quick-reference checklist for reviewing implementations. See `CLAUDE.md` for full rule details.

## UI Quality & Behavior

- [ ] **Rule 1: Native controls** — Platform built-in controls used before custom. Noted in output.
- [ ] **Rule 1.1: Open-source** — If no native control, battle-tested open-source considered before custom.
- [ ] **Rule 2: Responsiveness** — UI reacts on press, transitions begin immediately, no visible reflow.
- [ ] **Rule 3: Main thread** — No blocking work on main thread. Platform async primitives used.
- [ ] **Rule 4: Progress** — Determinate progress when total known, indeterminate otherwise. No frozen UI.
- [ ] **Rule 10: Deep linking** — Significant views are deep linkable via platform URL mechanism.
- [ ] **Rule 11: Scriptable** — Component is automatable via platform scripting (Shortcuts, AppIntents, etc.) where applicable.
- [ ] **Rule 15: Accessibility options** — Responds to: reduce motion, reduce transparency, increase contrast, differentiate without color, etc.

## Quality Assurance

- [ ] **Rule 5: Unit tests** — Tests exist, are comprehensive, cover logic/state/edge cases.
- [ ] **Rule 6: Design decisions** — LLM decisions surfaced, approved, recorded in spec.
- [ ] **Rule 7: Commits** — Small, atomic, one logical change each.
- [ ] **Rule 8: Verification** — Build all platforms, run tests, lint, a11y audit, previews, snapshots, log verification, code review against best practices.
- [ ] **Rule 9: Logging** — Log messages match spec's Logging section exactly. Platform logger used. Debug level.
- [ ] **Rule 17: Feature flags** — Features behind flags via interface. Local default implementation.
- [ ] **Rule 18: Analytics** — Events instrumented via interface. Match spec's Analytics section.
- [ ] **Rule 19: A/B testing** — Variant support via interface where applicable.
- [ ] **Rule 20: Debug mode** — Debug panel integration present. Not compiled in release.

## Accessibility, i18n, Privacy

- [ ] **Rule 12: Accessibility** — Semantic roles/labels, VoiceOver/TalkBack, keyboard nav, Dynamic Type, contrast ratios, focus order.
- [ ] **Rule 13: Localization** — All user-facing strings use platform i18n. No hardcoded strings.
- [ ] **Rule 14: RTL** — Leading/trailing used (not left/right). Directional icons mirrored. Tested with RTL locale.
- [ ] **Rule 16: Privacy** — Data minimization, transparency, opt-in consent, secure storage, no PII in logs, platform privacy features.

## Engineering Principles

- [ ] **Simplicity** — No braided concerns, no unnecessary abstraction.
- [ ] **Work → Right → Fast** — Correct first, then clean, then optimized.
- [ ] **Reversible decisions** — No premature binding to specific technologies.
- [ ] **Explicit over implicit** — No hidden behavior, dependencies visible.
- [ ] **Composition over inheritance** — Protocols/interfaces preferred over class hierarchies.
- [ ] **YAGNI** — No speculative features or premature generality.
- [ ] **Feedback loops** — Fast tests, fast builds.
- [ ] **Single responsibility** — One concept per module/file.
- [ ] **Design for deletion** — Easy to remove without cascading changes.
- [ ] **Boundaries** — Clean interfaces between subsystems.
- [ ] **Dependency injection** — Services injected via protocol/interface.
- [ ] **Immutability** — let/val/const preferred. Mutable state contained.
- [ ] **Fail fast** — Invalid state detected immediately.
- [ ] **Least astonishment** — APIs and UI behave as expected.
- [ ] **Idempotency** — Actions safe to repeat.
