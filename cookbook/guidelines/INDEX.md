---
id: eb0764d5-aeac-40cc-9aa4-d84e4eaa652d
title: "Guidelines Index"
domain: agentic-cookbook://guidelines/INDEX
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Complete index of all rules, principles, and conventions across all guideline files."
platforms: 
  - csharp
  - kotlin
  - macos
  - python
  - swift
  - typescript
  - web
  - windows
tags: []
depends-on: []
related: 
  - agentic-cookbook://guidelines/general#ab-testing
  - agentic-cookbook://guidelines/general#accessibility-from-day-one
  - agentic-cookbook://guidelines/general#always-show-progress
  - agentic-cookbook://guidelines/general#analytics
  - agentic-cookbook://guidelines/general#comprehensive-unit-testing
  - agentic-cookbook://guidelines/general#debug-mode
  - agentic-cookbook://guidelines/general#deep-linking
  - agentic-cookbook://guidelines/general#feature-flags
  - agentic-cookbook://guidelines/general#for-novel-components-prefer-proven-open
  - agentic-cookbook://guidelines/general#instrumented-logging
  - agentic-cookbook://guidelines/general#linting-from-day-one
  - agentic-cookbook://guidelines/general#localizability
  - agentic-cookbook://guidelines/general#no-blocking-the-main-thread
  - agentic-cookbook://guidelines/general#post-generation-verification
  - agentic-cookbook://guidelines/general#prefer-native-controls-and-libraries
  - agentic-cookbook://guidelines/general#privacy-and-security-by-default
  - agentic-cookbook://guidelines/general#respect-accessibility-display-options
  - agentic-cookbook://guidelines/general#rtl-layout-support
  - agentic-cookbook://guidelines/general#scriptable-and-automatable
  - agentic-cookbook://guidelines/general#small-atomic-commits
  - agentic-cookbook://guidelines/general#surface-all-design-decisions
  - agentic-cookbook://principles/composition-over-inheritance
  - agentic-cookbook://principles/dependency-injection
  - agentic-cookbook://principles/design-for-deletion
  - agentic-cookbook://principles/explicit-over-implicit
  - agentic-cookbook://principles/fail-fast
  - agentic-cookbook://principles/idempotency
  - agentic-cookbook://principles/immutability-by-default
  - agentic-cookbook://principles/make-it-work-make-it-right-make-it-fast
  - agentic-cookbook://principles/manage-complexity-through-boundaries
  - agentic-cookbook://principles/meta-principle-optimize-for-change
  - agentic-cookbook://principles/principle-of-least-astonishment
  - agentic-cookbook://principles/separation-of-concerns
  - agentic-cookbook://principles/simplicity
  - agentic-cookbook://principles/small-reversible-decisions
  - agentic-cookbook://principles/tight-feedback-loops
  - agentic-cookbook://principles/yagni
  - agentic-cookbook://guidelines/security/authentication
  - agentic-cookbook://guidelines/security/authorization
  - agentic-cookbook://guidelines/security/content-security-policy
  - agentic-cookbook://guidelines/security/cors
  - agentic-cookbook://guidelines/security/dependency-security
  - agentic-cookbook://guidelines/security/input-validation
  - agentic-cookbook://guidelines/security/references
  - agentic-cookbook://guidelines/security/security-headers-checklist
  - agentic-cookbook://guidelines/security/sensitive-data
  - agentic-cookbook://guidelines/security/token-handling
  - agentic-cookbook://guidelines/security/transport-security
  - agentic-cookbook://guidelines/specs/analytics-section
  - agentic-cookbook://guidelines/specs/feature-flags-section
  - agentic-cookbook://guidelines/specs/frontmatter
  - agentic-cookbook://guidelines/specs/logging-section
  - agentic-cookbook://guidelines/specs/privacy-section
  - agentic-cookbook://guidelines/specs/requirement-numbering
  - agentic-cookbook://guidelines/specs/rfc-2119-keywords
  - agentic-cookbook://guidelines/specs/standard-sections
  - agentic-cookbook://guidelines/specs/template-variables
  - agentic-cookbook://guidelines/specs/test-vector-formats
  - agentic-cookbook://guidelines/testing/flaky-test-prevention
  - agentic-cookbook://guidelines/testing/mutation-testing
  - agentic-cookbook://guidelines/testing/properties-of-good-tests
  - agentic-cookbook://guidelines/testing/property-based-testing
  - agentic-cookbook://guidelines/testing/references
  - agentic-cookbook://guidelines/testing/security-testing
  - agentic-cookbook://guidelines/testing/test-data
  - agentic-cookbook://guidelines/testing/test-doubles
  - agentic-cookbook://guidelines/testing/test-pyramid
  - agentic-cookbook://guidelines/testing/the-testing-workflow
  - agentic-cookbook://guidelines/testing/unit-test-patterns
references: []
---

# Guidelines Index

Complete index of all rules, principles, and conventions across all guideline files.
Use `agentic-cookbook://X/Y` notation to cross-reference any rule. Search this file to find where a topic is covered.

---

## agentic-cookbook://1/ General Coding Guidelines — [general.md](general.md)

| guide. | Rule | Keywords |
|---|------|----------|
| [agentic-cookbook://guidelines/general#prefer-native-controls-and-libraries](general.md#agentic-cookbook://11-prefer-native-controls-and-libraries) | Prefer native controls and libraries | native, platform, built-in, framework |
| [agentic-cookbook://guidelines/general#for-novel-components-prefer-proven-open](general.md#agentic-cookbook://12-for-novel-components-prefer-proven-open-source-solutions) | For novel components, prefer proven open-source solutions | open-source, library, custom |
| [agentic-cookbook://guidelines/general#surface-all-design-decisions](general.md#agentic-cookbook://13-surface-all-design-decisions) | Surface all design decisions | decisions, approval, LLM, consistency |
| [agentic-cookbook://guidelines/general#no-blocking-the-main-thread](general.md#agentic-cookbook://14-no-blocking-the-main-thread) | No blocking the main thread | async, await, concurrency, background, UI thread |
| [agentic-cookbook://guidelines/general#always-show-progress](general.md#agentic-cookbook://15-always-show-progress) | Always show progress | spinner, skeleton, shimmer, progress bar, loading |
| [agentic-cookbook://guidelines/general#comprehensive-unit-testing](general.md#agentic-cookbook://16-comprehensive-unit-testing) | Comprehensive unit testing | tests, unit tests, edge cases, test file |
| [agentic-cookbook://guidelines/general#small-atomic-commits](general.md#agentic-cookbook://17-small-atomic-commits) | Small, atomic commits | commits, git, one change |
| [agentic-cookbook://guidelines/general#post-generation-verification](general.md#agentic-cookbook://18-post-generation-verification) | Post-generation verification | build, test, lint, accessibility audit, code review |
| [agentic-cookbook://guidelines/general#instrumented-logging](general.md#agentic-cookbook://19-instrumented-logging) | Instrumented logging | logging, os.log, Timber, ILogger, structured |
| [agentic-cookbook://guidelines/general#deep-linking](general.md#agentic-cookbook://110-deep-linking) | Deep linking | deep link, URL, Universal Links, App Links, protocol activation |
| [agentic-cookbook://guidelines/general#scriptable-and-automatable](general.md#agentic-cookbook://111-scriptable-and-automatable) | Scriptable and automatable | AppIntents, AppActions, Shortcuts, automation |
| [agentic-cookbook://guidelines/general#accessibility-from-day-one](general.md#agentic-cookbook://112-accessibility-from-day-one) | Accessibility from day one | accessibility, VoiceOver, TalkBack, Narrator, WCAG, contrast, focus |
| [agentic-cookbook://guidelines/general#localizability](general.md#agentic-cookbook://113-localizability) | Localizability | localization, i18n, strings, .xcstrings, strings.xml, .resw |
| [agentic-cookbook://guidelines/general#rtl-layout-support](general.md#agentic-cookbook://114-rtl-layout-support) | RTL layout support | RTL, right-to-left, leading, trailing, FlowDirection |
| [agentic-cookbook://guidelines/general#respect-accessibility-display-options](general.md#agentic-cookbook://115-respect-accessibility-display-options) | Respect accessibility display options | reduced motion, high contrast, bold text, grayscale |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://116-privacy-and-security-by-default) | Privacy and security by default | privacy, security, PII, TLS, consent |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://1161-data-minimization) | Data minimization | data minimization, on-device |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://1162-consent) | Consent | consent, opt-in, deny |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://1163-secure-storage) | Secure storage | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://1164-no-pii-logging) | No PII logging | PII, logging, personally identifiable |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://1165-tls-only) | TLS only | TLS, HTTPS, encryption |
| [agentic-cookbook://guidelines/general#privacy-and-security-by-default](general.md#agentic-cookbook://1166-input-sanitization) | Input sanitization | sanitization, XSS, injection |
| [agentic-cookbook://guidelines/general#feature-flags](general.md#agentic-cookbook://117-feature-flags) | Feature flags | feature flags, FeatureFlagProvider, gating |
| [agentic-cookbook://guidelines/general#analytics](general.md#agentic-cookbook://118-analytics) | Analytics | analytics, AnalyticsProvider, tracking |
| [agentic-cookbook://guidelines/general#ab-testing](general.md#agentic-cookbook://119-ab-testing) | A/B testing | A/B testing, ExperimentProvider, variants |
| [agentic-cookbook://guidelines/general#debug-mode](general.md#agentic-cookbook://120-debug-mode) | Debug mode | debug panel, flag overrides, environment info |
| [agentic-cookbook://guidelines/general#linting-from-day-one](general.md#agentic-cookbook://121-linting-from-day-one) | Linting from day one | linting, SwiftLint, ktlint, ESLint, Roslyn, dotnet format |

## agentic-cookbook://2/ Engineering Principles — [engineering-principles.md](engineering-principles.md)

| guide. | Principle | Keywords |
|---|-----------|----------|
| [agentic-cookbook://principles/simplicity](engineering-principles.md#agentic-cookbook://21-simplicity) | Simplicity | simplicity, complexity, concerns |
| [agentic-cookbook://principles/make-it-work-make-it-right-make-it-fast](engineering-principles.md#agentic-cookbook://22-make-it-work-make-it-right-make-it-fast) | Make It Work, Make It Right, Make It Fast | correctness, refactor, optimize, phases |
| [agentic-cookbook://principles/composition-over-inheritance](engineering-principles.md#agentic-cookbook://23-composition-over-inheritance) | Composition over inheritance | composition, inheritance, protocols, interfaces |
| [agentic-cookbook://principles/dependency-injection](engineering-principles.md#agentic-cookbook://24-dependency-injection) | Dependency injection | DI, injection, constructor, service locator |
| [agentic-cookbook://principles/immutability-by-default](engineering-principles.md#agentic-cookbook://25-immutability-by-default) | Immutability by default | immutability, let, val, const, mutable |
| [agentic-cookbook://principles/fail-fast](engineering-principles.md#agentic-cookbook://26-fail-fast) | Fail fast | fail fast, assertions, preconditions, typed errors |
| [agentic-cookbook://principles/idempotency](engineering-principles.md#agentic-cookbook://27-idempotency) | Idempotency | idempotent, debounce, retry, duplicate |
| [agentic-cookbook://principles/design-for-deletion](engineering-principles.md#agentic-cookbook://28-design-for-deletion) | Design for deletion | deletion, disposable, maintenance, liability |
| [agentic-cookbook://principles/yagni](engineering-principles.md#agentic-cookbook://29-yagni) | YAGNI | YAGNI, speculative, premature, requirements |
| [agentic-cookbook://principles/explicit-over-implicit](engineering-principles.md#agentic-cookbook://210-explicit-over-implicit) | Explicit over implicit | explicit, implicit, hidden, magic |
| [agentic-cookbook://principles/small-reversible-decisions](engineering-principles.md#agentic-cookbook://211-small-reversible-decisions) | Small, reversible decisions | reversible, incremental, binding |
| [agentic-cookbook://principles/tight-feedback-loops](engineering-principles.md#agentic-cookbook://212-tight-feedback-loops) | Tight feedback loops | feedback, tests, deploy, iteration |
| [agentic-cookbook://principles/separation-of-concerns](engineering-principles.md#agentic-cookbook://213-separation-of-concerns) | Separation of concerns | separation, single responsibility, module |
| [agentic-cookbook://principles/principle-of-least-astonishment](engineering-principles.md#agentic-cookbook://214-principle-of-least-astonishment) | Principle of least astonishment | least astonishment, expectations, surprise |
| [agentic-cookbook://principles/manage-complexity-through-boundaries](engineering-principles.md#agentic-cookbook://215-manage-complexity-through-boundaries) | Manage complexity through boundaries | boundaries, ports, adapters, hexagonal |
| [agentic-cookbook://principles/meta-principle-optimize-for-change](engineering-principles.md#agentic-cookbook://216-meta-principle-optimize-for-change) | Meta-Principle: Optimize for Change | change, future, cost |

## agentic-cookbook://3/ Swift / SwiftUI / AppKit — [swift.md](swift.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://3/1](swift.md#agentic-cookbook://31-references) | References | Swift API Design Guidelines, SwiftUI Performance |
| [agentic-cookbook://3/2](swift.md#agentic-cookbook://32-logging) | Logging | os.log, Logger, subsystem, category |
| [agentic-cookbook://3/3](swift.md#agentic-cookbook://33-secure-storage) | Secure Storage | Keychain, UserDefaults, secrets |
| [agentic-cookbook://3/4](swift.md#agentic-cookbook://34-localization) | Localization | String(localized:), NSLocalizedString, .xcstrings |
| [agentic-cookbook://3/5](swift.md#agentic-cookbook://35-linting-and-formatting) | Linting and Formatting | SwiftLint, swift-format |
| [agentic-cookbook://3/6](swift.md#agentic-cookbook://36-shortcuts-and-automation) | Shortcuts and Automation | AppIntents, Shortcuts, Siri, AppleScript |
| [agentic-cookbook://3/7](swift.md#agentic-cookbook://37-previews) | Previews | #Preview, SwiftUI, render |
| [agentic-cookbook://3/8](swift.md#agentic-cookbook://38-dynamic-type) | Dynamic Type | Dynamic Type, font sizes, text scaling |
| [agentic-cookbook://3/9](swift.md#agentic-cookbook://39-accessibility-environment-values) | Accessibility Environment Values | reduceMotion, reduceTransparency, colorSchemeContrast |
| [agentic-cookbook://3/10](swift.md#agentic-cookbook://310-concurrency) | Concurrency | async/await, Task, actors, @MainActor |
| [agentic-cookbook://3/11](swift.md#agentic-cookbook://311-privacy) | Privacy | App Tracking Transparency, Privacy Report, NSUsageDescription |
| [agentic-cookbook://3/12](swift.md#agentic-cookbook://312-feature-flags) | Feature Flags | protocol, UserDefaults |
| [agentic-cookbook://3/13](swift.md#agentic-cookbook://313-analytics) | Analytics | protocol, os.log |

## agentic-cookbook://4/ Kotlin / Compose / Ktor — [kotlin.md](kotlin.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://4/1](kotlin.md#agentic-cookbook://41-references) | References | Kotlin Conventions, Material Design 3, Architecture |
| [agentic-cookbook://4/2](kotlin.md#agentic-cookbook://42-logging) | Logging | Timber, android.util.Log |
| [agentic-cookbook://4/3](kotlin.md#agentic-cookbook://43-concurrency) | Concurrency | Coroutines, Dispatchers.IO, viewModelScope |
| [agentic-cookbook://4/4](kotlin.md#agentic-cookbook://44-secure-storage) | Secure Storage | EncryptedSharedPreferences, Android Keystore |
| [agentic-cookbook://4/5](kotlin.md#agentic-cookbook://45-localization) | Localization | strings.xml, stringResource, R.string |
| [agentic-cookbook://4/6](kotlin.md#agentic-cookbook://46-linting-and-formatting) | Linting and Formatting | ktlint, .editorconfig |
| [agentic-cookbook://4/7](kotlin.md#agentic-cookbook://47-shortcuts-and-automation) | Shortcuts and Automation | AppActions, Google Assistant, Intent |
| [agentic-cookbook://4/8](kotlin.md#agentic-cookbook://48-previews) | Previews | @Preview, Compose |
| [agentic-cookbook://4/9](kotlin.md#agentic-cookbook://49-font-scaling) | Font Scaling | fontScale, Configuration, 2x |
| [agentic-cookbook://4/10](kotlin.md#agentic-cookbook://410-accessibility-settings) | Accessibility Settings | animator_duration_scale, TalkBack, Switch Access |
| [agentic-cookbook://4/11](kotlin.md#agentic-cookbook://411-privacy) | Privacy | scoped storage, permissions, rationale |
| [agentic-cookbook://4/12](kotlin.md#agentic-cookbook://412-feature-flags) | Feature Flags | interface, SharedPreferences |
| [agentic-cookbook://4/13](kotlin.md#agentic-cookbook://413-analytics) | Analytics | interface, Timber |
| [agentic-cookbook://4/14](kotlin.md#agentic-cookbook://414-rtl-support) | RTL Support | supportsRtl, start/end |
| [agentic-cookbook://4/15](kotlin.md#agentic-cookbook://415-immutability) | Immutability | val, data class, StateFlow |

## agentic-cookbook://5/ TypeScript / React / Web — [typescript.md](typescript.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://5/1](typescript.md#agentic-cookbook://51-linting-and-formatting) | Linting and Formatting | ESLint, Prettier, Stylelint |
| [agentic-cookbook://5/2](typescript.md#agentic-cookbook://52-accessibility-references) | Accessibility References | WCAG 2.1, WAI-ARIA |
| [agentic-cookbook://5/3](typescript.md#agentic-cookbook://53-accessibility-css-media-queries) | Accessibility CSS Media Queries | prefers-reduced-motion, prefers-contrast, forced-colors |
| [agentic-cookbook://5/4](typescript.md#agentic-cookbook://54-security) | Security | CSP, HttpOnly, cookies, sanitization, Do Not Track |
| [agentic-cookbook://5/5](typescript.md#agentic-cookbook://55-localization) | Localization | react-intl, i18next, FormatJS, message catalogs |
| [agentic-cookbook://5/6](typescript.md#agentic-cookbook://56-rtl-layout-support) | RTL Layout Support | CSS logical properties, margin-inline-start, dir |
| [agentic-cookbook://5/7](typescript.md#agentic-cookbook://57-testing) | Testing | Playwright, E2E, visual regression, Storybook |
| [agentic-cookbook://5/8](typescript.md#agentic-cookbook://58-concurrency) | Concurrency | Promise, async/await, Web Workers |
| [agentic-cookbook://5/9](typescript.md#agentic-cookbook://59-deep-linking) | Deep Linking | URL routing, shareable URL |
| [agentic-cookbook://5/10](typescript.md#agentic-cookbook://510-debug-mode) | Debug Mode | /debug, Ctrl+Shift+D, NODE_ENV |
| [agentic-cookbook://5/11](typescript.md#agentic-cookbook://511-feature-flags) | Feature Flags | interface, localStorage |
| [agentic-cookbook://5/12](typescript.md#agentic-cookbook://512-analytics) | Analytics | interface, console |
| [agentic-cookbook://5/13](typescript.md#agentic-cookbook://513-immutability) | Immutability | const, useState |

## agentic-cookbook://6/ Python — [python.md](python.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://6/1](python.md#agentic-cookbook://61-no-external-dependencies-in-core-libraries) | No external dependencies in core libraries | stdlib, roadmap_lib, portable |
| [agentic-cookbook://6/2](python.md#agentic-cookbook://62-testing) | Testing | pytest, regression test, demo port 9888 |
| [agentic-cookbook://6/3](python.md#agentic-cookbook://63-type-hints) | Type hints | type hints, annotations, Python 3.9 |
| [agentic-cookbook://6/4](python.md#agentic-cookbook://64-file-paths) | File paths | pathlib, Path, os.path |
| [agentic-cookbook://6/5](python.md#agentic-cookbook://65-yaml-frontmatter) | YAML frontmatter | frontmatter, parse, roadmap_lib |
| [agentic-cookbook://6/6](python.md#agentic-cookbook://66-web-services) | Web services | Flask, REST API |
| [agentic-cookbook://6/7](python.md#agentic-cookbook://67-database) | Database | SQLite, WAL, sqlite3 |
| [agentic-cookbook://6/8](python.md#agentic-cookbook://68-use-roadmap_lib) | Use roadmap_lib | roadmap_lib, existing functions |
| [agentic-cookbook://6/9](python.md#agentic-cookbook://69-deterministic-ids) | Deterministic IDs | UUID, frontmatter, deterministic |
| [agentic-cookbook://6/10](python.md#agentic-cookbook://610-dashboard-service-is-display-only) | Dashboard service is display-only | dashboard, generic, display-only |
| [agentic-cookbook://6/11](python.md#agentic-cookbook://611-shell-scripts) | Shell scripts | main(), functions, composable |
| [agentic-cookbook://6/12](python.md#agentic-cookbook://612-logging) | Logging | logging, getLogger, __name__ |

## agentic-cookbook://7/ C# / .NET — [csharp.md](csharp.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://7/1](csharp.md#agentic-cookbook://71-references) | References | C# Conventions, .NET Design Guidelines, Runtime Coding Style |
| [agentic-cookbook://7/2](csharp.md#agentic-cookbook://72-naming) | Naming | PascalCase, camelCase, _camelCase, I prefix, Async suffix |
| [agentic-cookbook://7/3](csharp.md#agentic-cookbook://73-nullable-reference-types) | Nullable Reference Types | Nullable, enable, null-forgiving, required, guard clause |
| [agentic-cookbook://7/4](csharp.md#agentic-cookbook://74-immutability) | Immutability | readonly, record, ImmutableList, init, with |
| [agentic-cookbook://7/5](csharp.md#agentic-cookbook://75-concurrency) | Concurrency | async/await, ConfigureAwait, CancellationToken, ValueTask |
| [agentic-cookbook://7/6](csharp.md#agentic-cookbook://76-dependency-injection) | Dependency Injection | Microsoft.Extensions.DependencyInjection, IOptions, Transient, Singleton |
| [agentic-cookbook://7/7](csharp.md#agentic-cookbook://77-logging) | Logging | ILogger, structured, LoggerMessage, source generator |
| [agentic-cookbook://7/8](csharp.md#agentic-cookbook://78-linting-and-formatting) | Linting and Formatting | .editorconfig, Roslyn, EnforceCodeStyleInBuild, dotnet format |
| [agentic-cookbook://7/9](csharp.md#agentic-cookbook://79-testing) | Testing | xUnit, FluentAssertions, NSubstitute, Fact, Theory |
| [agentic-cookbook://7/10](csharp.md#agentic-cookbook://710-secure-storage) | Secure Storage | DPAPI, ProtectedData, User Secrets |
| [agentic-cookbook://7/11](csharp.md#agentic-cookbook://711-privacy) | Privacy | capabilities, manifest, broadFileSystemAccess, consent |
| [agentic-cookbook://7/12](csharp.md#agentic-cookbook://712-feature-flags) | Feature Flags | IFeatureManager, Microsoft.FeatureManagement |
| [agentic-cookbook://7/13](csharp.md#agentic-cookbook://713-analytics) | Analytics | ILogger, interface |

## agentic-cookbook://8/ Windows / WinUI 3 — [windows.md](windows.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://8/1](windows.md#agentic-cookbook://81-references) | References | WinUI 3, Windows App SDK, Fluent 2, WinUI Gallery |
| [agentic-cookbook://8/2](windows.md#agentic-cookbook://82-architecture) | Architecture | MVVM, CommunityToolkit.Mvvm, NavigationView, Frame |
| [agentic-cookbook://8/3](windows.md#agentic-cookbook://83-fluent-design) | Fluent Design | built-in controls, Segoe UI Variable, Segoe Fluent Icons |
| [agentic-cookbook://8/4](windows.md#agentic-cookbook://84-theming) | Theming | Light, Dark, High Contrast, ThemeResource, semantic colors |
| [agentic-cookbook://8/5](windows.md#agentic-cookbook://85-accessibility) | Accessibility | UI Automation, AutomationProperties, Accessibility Insights, Narrator |
| [agentic-cookbook://8/6](windows.md#agentic-cookbook://86-localization) | Localization | MRT Core, .resw, x:Uid, ResourceLoader |
| [agentic-cookbook://8/7](windows.md#agentic-cookbook://87-deep-linking--protocol-activation) | Deep Linking / Protocol Activation | uap:Protocol, AppInstance, GetActivatedEventArgs |
| [agentic-cookbook://8/8](windows.md#agentic-cookbook://88-app-notifications) | App Notifications | AppNotificationManager, AppNotificationBuilder, toast |
| [agentic-cookbook://8/9](windows.md#agentic-cookbook://89-high-dpi--display-scaling) | High DPI / Display Scaling | effective pixels, RasterizationScale, multi-scale assets |
| [agentic-cookbook://8/10](windows.md#agentic-cookbook://810-msix-packaging) | MSIX Packaging | MSIX, single-project, capabilities, signing |
| [agentic-cookbook://8/11](windows.md#agentic-cookbook://811-concurrency) | Concurrency | DispatcherQueue, TryEnqueue, UI thread |
| [agentic-cookbook://8/12](windows.md#agentic-cookbook://812-rtl-layout-support) | RTL Layout Support | FlowDirection, RightToLeft |
| [agentic-cookbook://8/13](windows.md#agentic-cookbook://813-logging) | Logging | ILogger, ETW, EventSource, Live Visual Tree |
| [agentic-cookbook://8/14](windows.md#agentic-cookbook://814-debug-mode) | Debug Mode | #if DEBUG, settings page |
| [agentic-cookbook://8/15](windows.md#agentic-cookbook://815-design-time-data) | Design-Time Data | d:DataContext, d:DesignInstance, XAML Hot Reload |

## agentic-cookbook://9/ UI Design — [ui.md](ui.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://9/1](ui.md#agentic-cookbook://91-platform-design-languages) | Platform Design Languages | HIG, Material Design, Fluent, WCAG |
| [agentic-cookbook://9/2](ui.md#agentic-cookbook://92-visual-hierarchy) | Visual Hierarchy | focal point, primary action, size, weight, proximity |
| [agentic-cookbook://9/3](ui.md#agentic-cookbook://93-spacing) | Spacing | 4px, 8px grid, spacing scale, padding, margin |
| [agentic-cookbook://9/4](ui.md#agentic-cookbook://94-typography) | Typography | system font, body text, line height, paragraph width |
| [agentic-cookbook://9/5](ui.md#agentic-cookbook://95-color) | Color | semantic tokens, palette, contrast, dark mode |
| [agentic-cookbook://9/6](ui.md#agentic-cookbook://96-layout) | Layout | single-column, content-first, responsive, scroll direction |
| [agentic-cookbook://9/7](ui.md#agentic-cookbook://97-state-design) | State Design | loading, empty state, error state, skeleton, CTA |
| [agentic-cookbook://9/8](ui.md#agentic-cookbook://98-form-design) | Form Design | forms, validation, error messages, labels |
| [agentic-cookbook://9/8/1](ui.md#agentic-cookbook://981-layout) | Layout | single-column, top-aligned labels |
| [agentic-cookbook://9/8/2](ui.md#agentic-cookbook://982-validation) | Validation | blur, keystroke, submit |
| [agentic-cookbook://9/8/3](ui.md#agentic-cookbook://983-error-messages) | Error messages | inline, below field, icon, specific |
| [agentic-cookbook://9/8/4](ui.md#agentic-cookbook://984-other-principles) | Other principles | placeholder, pre-fill, optional fields |
| [agentic-cookbook://9/9](ui.md#agentic-cookbook://99-feedback-patterns) | Feedback Patterns | toast, snackbar, dialog, confirmation, destructive |
| [agentic-cookbook://9/10](ui.md#agentic-cookbook://910-touch--click-targets) | Touch & Click Targets | 44pt, 48dp, 40epx, 24px, hit area, spacing |
| [agentic-cookbook://9/11](ui.md#agentic-cookbook://911-animation--motion) | Animation & Motion | duration, easing, reduced-motion, spring |
| [agentic-cookbook://9/12](ui.md#agentic-cookbook://912-iconography) | Iconography | SF Symbols, Material Symbols, Segoe Fluent Icons, labels |
| [agentic-cookbook://9/13](ui.md#agentic-cookbook://913-data-display) | Data Display | list, table, cards, grid, sort, filter, search |

## agentic-cookbook://10/ Networking — [networking.md](networking.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://10/1](networking.md#agentic-cookbook://101-references) | References | Microsoft REST, Google API Design, Zalando, RFC 9457, RFC 9111 |
| [agentic-cookbook://10/2](networking.md#agentic-cookbook://102-api-design) | API Design | REST, URL, HTTP methods, status codes, versioning |
| [agentic-cookbook://10/3](networking.md#agentic-cookbook://103-error-responses) | Error Responses | RFC 9457, Problem Details, application/problem+json |
| [agentic-cookbook://10/4](networking.md#agentic-cookbook://104-pagination) | Pagination | cursor, offset, next_cursor, has_more, page_token |
| [agentic-cookbook://10/5](networking.md#agentic-cookbook://105-retry-and-resilience) | Retry and Resilience | exponential backoff, jitter, circuit breaker, retryable |
| [agentic-cookbook://10/6](networking.md#agentic-cookbook://106-timeouts) | Timeouts | connection timeout, read timeout, 10s, 30s |
| [agentic-cookbook://10/7](networking.md#agentic-cookbook://107-caching) | Caching | Cache-Control, ETag, If-None-Match, stale-while-revalidate |
| [agentic-cookbook://10/8](networking.md#agentic-cookbook://108-offline-and-connectivity) | Offline and Connectivity | offline-first, optimistic updates, sync, conflict resolution |
| [agentic-cookbook://10/9](networking.md#agentic-cookbook://109-rate-limiting) | Rate Limiting | 429, Retry-After, RateLimit-Remaining, throttling |
| [agentic-cookbook://10/10](networking.md#agentic-cookbook://1010-real-time-communication) | Real-Time Communication | SSE, WebSocket, polling, EventSource |

## agentic-cookbook://11/ Security — [security.md](security.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://guidelines/security/references](security.md#agentic-cookbook://111-references) | References | OWASP, MASVS, MASTG, Mozilla TLS |
| [agentic-cookbook://guidelines/security/authentication](security.md#agentic-cookbook://112-authentication) | Authentication | OAuth 2.0, OIDC, PKCE, system browser, BFF |
| [agentic-cookbook://guidelines/security/token-handling](security.md#agentic-cookbook://113-token-handling) | Token Handling | access token, refresh token, JWT, storage |
| [agentic-cookbook://guidelines/security/token-handling](security.md#agentic-cookbook://1131-access-tokens) | Access tokens | short-lived, 5-15 min, claims |
| [agentic-cookbook://guidelines/security/token-handling](security.md#agentic-cookbook://1132-refresh-tokens) | Refresh tokens | rotation, revocation, token family |
| [agentic-cookbook://guidelines/security/token-handling](security.md#agentic-cookbook://1133-token-refresh-strategy) | Token refresh strategy | proactive, 75% TTL, queue |
| [agentic-cookbook://guidelines/security/token-handling](security.md#agentic-cookbook://1134-secure-storage-per-platform) | Secure storage per platform | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [agentic-cookbook://guidelines/security/token-handling](security.md#agentic-cookbook://1135-never-do-these) | Never do these | localStorage, URL params, alg:none |
| [agentic-cookbook://guidelines/security/authorization](security.md#agentic-cookbook://114-authorization) | Authorization | RBAC, scopes, least privilege, BOLA, deny by default |
| [agentic-cookbook://guidelines/security/transport-security](security.md#agentic-cookbook://115-transport-security) | Transport Security | TLS 1.2, TLS 1.3, HSTS, certificate pinning, AEAD |
| [agentic-cookbook://guidelines/security/cors](security.md#agentic-cookbook://116-cors) | CORS | origin allowlist, preflight, credentials, misconfigurations |
| [agentic-cookbook://guidelines/security/content-security-policy](security.md#agentic-cookbook://117-content-security-policy) | Content Security Policy | CSP, nonce, strict-dynamic, frame-ancestors, report-only |
| [agentic-cookbook://guidelines/security/input-validation](security.md#agentic-cookbook://118-input-validation) | Input Validation | allowlist, parameterized queries, output encoding, file uploads |
| [agentic-cookbook://guidelines/security/sensitive-data](security.md#agentic-cookbook://119-sensitive-data) | Sensitive Data | data minimization, PII, field-level encryption, KMS |
| [agentic-cookbook://guidelines/security/dependency-security](security.md#agentic-cookbook://1110-dependency-security) | Dependency Security | lockfiles, npm audit, pin versions, SRI, supply chain |
| [agentic-cookbook://guidelines/security/security-headers-checklist](security.md#agentic-cookbook://1111-security-headers-checklist) | Security Headers Checklist | HSTS, CSP, X-Content-Type-Options, Referrer-Policy |

## agentic-cookbook://12/ Spec Writing Format — [specs.md](specs.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://guidelines/specs/frontmatter](specs.md#agentic-cookbook://121-frontmatter) | Frontmatter | version, status, created, platforms, dependencies |
| [agentic-cookbook://guidelines/specs/rfc-2119-keywords](specs.md#agentic-cookbook://122-rfc-2119-keywords) | RFC 2119 Keywords | MUST, SHOULD, MAY, requirements |
| [agentic-cookbook://guidelines/specs/requirement-numbering](specs.md#agentic-cookbook://123-requirement-numbering) | Requirement Numbering | REQ-NNN, sequential, test vector |
| [agentic-cookbook://guidelines/specs/template-variables](specs.md#agentic-cookbook://124-template-variables) | Template Variables | {{app_name}}, {{bundle_id}}, placeholders |
| [agentic-cookbook://guidelines/specs/standard-sections](specs.md#agentic-cookbook://125-standard-sections) | Standard Sections | Overview, Requirements, API Contract, Accessibility, Logging |
| [agentic-cookbook://guidelines/specs/test-vector-formats](specs.md#agentic-cookbook://126-test-vector-formats) | Test Vector Formats | behavioral table, data JSON, input/expected |
| [agentic-cookbook://guidelines/specs/logging-section](specs.md#agentic-cookbook://127-logging-section) | Logging Section | log messages, subsystem, category, grep |
| [agentic-cookbook://guidelines/specs/privacy-section](specs.md#agentic-cookbook://128-privacy-section) | Privacy Section | data collected, storage, PII handling |
| [agentic-cookbook://guidelines/specs/feature-flags-section](specs.md#agentic-cookbook://129-feature-flags-section) | Feature Flags Section | flag keys, gating |
| [agentic-cookbook://guidelines/specs/analytics-section](specs.md#agentic-cookbook://1210-analytics-section) | Analytics Section | event names, property schemas |

## agentic-cookbook://13/ Best Practices References — [best-practices-references.md](best-practices-references.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://13/1](best-practices-references.md#agentic-cookbook://131-apple) | Apple | HIG, Swift API Design, Accessibility, App Store |
| [agentic-cookbook://13/2](best-practices-references.md#agentic-cookbook://132-android) | Android | Material Design 3, Architecture, Kotlin, Google Play |
| [agentic-cookbook://13/3](best-practices-references.md#agentic-cookbook://133-web) | Web | WCAG, WAI-ARIA, OWASP, MDN |
| [agentic-cookbook://13/4](best-practices-references.md#agentic-cookbook://134-windows--net) | Windows / .NET | C# Conventions, .NET Guidelines, WinUI 3, Fluent, MSIX |
| [agentic-cookbook://13/5](best-practices-references.md#agentic-cookbook://135-ui-design) | UI Design | NNGroup, Visual Hierarchy, Form Design, Empty States |
| [agentic-cookbook://13/6](best-practices-references.md#agentic-cookbook://136-networking) | Networking | Microsoft REST, Google API, Zalando, RFC 9457, RFC 9111 |
| [agentic-cookbook://13/7](best-practices-references.md#agentic-cookbook://137-security) | Security | OWASP Top 10, Mobile Top 10, Cheat Sheets, Mozilla TLS, SLSA |
| [agentic-cookbook://13/9](best-practices-references.md#agentic-cookbook://139-testing) | Testing | Google SWE Book, Martin Fowler, Kent Beck, Hypothesis, mutmut, Stryker |
| [agentic-cookbook://13/10](best-practices-references.md#agentic-cookbook://1310-cross-platform) | Cross-Platform | Nielsen Norman, MASVS, MASTG |

## agentic-cookbook://14/ Testing — [testing.md](testing.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [agentic-cookbook://guidelines/testing/references](testing.md#agentic-cookbook://141-references) | References | Google SWE Book, Martin Fowler, Kent Beck, ISTQB |
| [agentic-cookbook://guidelines/testing/test-pyramid](testing.md#agentic-cookbook://142-test-pyramid) | Test Pyramid | 80/15/5, unit, integration, E2E |
| [agentic-cookbook://guidelines/testing/properties-of-good-tests](testing.md#agentic-cookbook://143-properties-of-good-tests) | Properties of Good Tests | isolated, deterministic, fast, readable, behavioral |
| [agentic-cookbook://guidelines/testing/unit-test-patterns](testing.md#agentic-cookbook://144-unit-test-patterns) | Unit Test Patterns | AAA, arrange-act-assert, naming, one concept |
| [agentic-cookbook://guidelines/testing/property-based-testing](testing.md#agentic-cookbook://145-property-based-testing) | Property-Based Testing | Hypothesis, fast-check, round-trip, generators |
| [agentic-cookbook://guidelines/testing/mutation-testing](testing.md#agentic-cookbook://146-mutation-testing) | Mutation Testing | mutmut, Stryker, Muter, Pitest, surviving mutants |
| [agentic-cookbook://guidelines/testing/test-doubles](testing.md#agentic-cookbook://147-test-doubles) | Test Doubles | mock, stub, fake, spy, dummy, NSubstitute |
| [agentic-cookbook://guidelines/testing/security-testing](testing.md#agentic-cookbook://148-security-testing) | Security Testing | Semgrep, Bandit, CodeQL, OWASP ZAP, pip-audit |
| [agentic-cookbook://guidelines/testing/flaky-test-prevention](testing.md#agentic-cookbook://149-flaky-test-prevention) | Flaky Test Prevention | determinism, shared state, sleep, timing |
| [agentic-cookbook://guidelines/testing/test-data](testing.md#agentic-cookbook://1410-test-data) | Test Data | builder pattern, factory, generators, inline literals |
| [agentic-cookbook://guidelines/testing/the-testing-workflow](testing.md#agentic-cookbook://1411-the-testing-workflow) | The Testing Workflow | closed loop, mutation, security scan, E2E |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
