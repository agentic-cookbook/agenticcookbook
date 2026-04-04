---
id: eb0764d5-aeac-40cc-9aa4-d84e4eaa652d
title: "Guidelines Index"
domain: agentic-cookbook://guidelines/INDEX
type: guideline
version: 1.1.0
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
  - agentic-cookbook://guidelines/feature-management/ab-testing
  - agentic-cookbook://guidelines/accessibility/accessibility
  - agentic-cookbook://guidelines/ui/always-show-progress
  - agentic-cookbook://guidelines/logging/analytics
  - agentic-cookbook://guidelines/testing/testing
  - agentic-cookbook://guidelines/feature-management/debug-mode
  - agentic-cookbook://guidelines/platform/deep-linking
  - agentic-cookbook://guidelines/feature-management/feature-flags
  - agentic-cookbook://principles/open-source-preference
  - agentic-cookbook://guidelines/logging/logging
  - agentic-cookbook://guidelines/code-quality/linting
  - agentic-cookbook://guidelines/internationalization/localization
  - agentic-cookbook://guidelines/concurrency/concurrency
  - agentic-cookbook://guidelines/testing/post-generation-verification
  - agentic-cookbook://principles/native-controls
  - agentic-cookbook://guidelines/security/privacy
  - agentic-cookbook://guidelines/accessibility/accessibility
  - agentic-cookbook://guidelines/internationalization/rtl-support
  - agentic-cookbook://guidelines/platform/shortcuts-and-automation
  - agentic-cookbook://guidelines/code-quality/atomic-commits
  - agentic-cookbook://guidelines/code-quality/scope-discipline
  - agentic-cookbook://guidelines/code-quality/bulk-operation-verification
  - agentic-cookbook://introduction/conventions
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
  - agentic-cookbook://introduction/conventions
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
  - agentic-cookbook://guidelines/skills-and-agents/authoring-skills-and-rules
  - agentic-cookbook://guidelines/skills-and-agents/performance
  - agentic-cookbook://guidelines/skills-and-agents/skill-checklist
  - agentic-cookbook://guidelines/skills-and-agents/rule-checklist
  - agentic-cookbook://guidelines/skills-and-agents/agent-checklist
  - agentic-cookbook://guidelines/skills-and-agents/skill-structure-reference
  - agentic-cookbook://guidelines/skills-and-agents/rule-structure-reference
  - agentic-cookbook://guidelines/skills-and-agents/agent-structure-reference
  - agentic-cookbook://guidelines/concurrency/immutability
  - agentic-cookbook://guidelines/platform/background-tasks
  - agentic-cookbook://guidelines/platform/notifications
  - agentic-cookbook://guidelines/platform/handoff-and-continuity
  - agentic-cookbook://guidelines/platform/search-integration
  - agentic-cookbook://guidelines/platform/share-and-inter-app-data
  - agentic-cookbook://guidelines/platform/widgets-and-glanceable-surfaces
  - agentic-cookbook://guidelines/ui/previews
  - agentic-cookbook://guidelines/language/swift/prefer-explicit-apple-apis
  - agentic-cookbook://guidelines/database-design/sqlite-best-practices
references: []
---

# Guidelines Index

Complete index of all rules, principles, and conventions across all guideline files.
Use `agentic-cookbook://X/Y` notation to cross-reference any rule. Search this file to find where a topic is covered.

---

## General Coding Guidelines

| guide. | Rule | Keywords |
|---|------|----------|
| [Prefer native controls and libraries](../principles/native-controls.md) | Prefer native controls and libraries | native, platform, built-in, framework |
| [For novel components, prefer proven open-source solutions](../principles/open-source-preference.md) | For novel components, prefer proven open-source solutions | open-source, library, custom |
| [Surface all design decisions](../conventions.md) | Surface all design decisions | decisions, approval, LLM, consistency |
| [No blocking the main thread](concurrency/concurrency.md) | No blocking the main thread | async, await, concurrency, background, UI thread |
| [Immutability](concurrency/immutability.md) | Immutability | immutable, value types, let, val, const, records |
| [Always show progress](ui/always-show-progress.md) | Always show progress | spinner, skeleton, shimmer, progress bar, loading |
| [Comprehensive unit testing](testing/testing.md) | Comprehensive unit testing | tests, unit tests, edge cases, test file |
| [Small, atomic commits](code-quality/atomic-commits.md) | Small, atomic commits | commits, git, one change |
| [agentic-cookbook://guidelines/code-quality/scope-discipline](code-quality/scope-discipline.md) | Scope discipline | scope, boundaries, focus, no scope creep |
| [agentic-cookbook://guidelines/code-quality/bulk-operation-verification](code-quality/bulk-operation-verification.md) | Bulk operation verification | bulk, rename, migration, stale references, verification |
| [Post-generation verification](testing/post-generation-verification.md) | Post-generation verification | build, test, lint, accessibility audit, code review |
| [Instrumented logging](logging/logging.md) | Instrumented logging | logging, os.log, Timber, ILogger, structured |
| [Deep linking](platform/deep-linking.md) | Deep linking | deep link, URL, Universal Links, App Links, protocol activation |
| [Scriptable and automatable](platform/shortcuts-and-automation.md) | Scriptable and automatable | AppIntents, AppActions, Shortcuts, automation |
| [Background tasks](platform/background-tasks.md) | Background tasks | BGAppRefreshTask, WorkManager, background transfers |
| [Notifications](platform/notifications.md) | Notifications | push, local, UNUserNotificationCenter, channels |
| [Handoff and continuity](platform/handoff-and-continuity.md) | Handoff and continuity | NSUserActivity, Nearby Connections, cross-device |
| [Search integration](platform/search-integration.md) | Search integration | Core Spotlight, AppIndexing, on-device search |
| [Share and inter-app data](platform/share-and-inter-app-data.md) | Share and inter-app data | share sheet, ACTION_SEND, ContentProvider |
| [Widgets and glanceable surfaces](platform/widgets-and-glanceable-surfaces.md) | Widgets and glanceable surfaces | WidgetKit, Jetpack Glance, Live Activities |
| [Accessibility from day one](accessibility/accessibility.md) | Accessibility from day one | accessibility, VoiceOver, TalkBack, Narrator, WCAG, contrast, focus |
| [Localizability](internationalization/localization.md) | Localizability | localization, i18n, strings, .xcstrings, strings.xml, .resw |
| [RTL layout support](internationalization/rtl-support.md) | RTL layout support | RTL, right-to-left, leading, trailing, FlowDirection |
| [Respect accessibility display options](accessibility/accessibility.md) | Respect accessibility display options | reduced motion, high contrast, bold text, grayscale |
| [Privacy and security by default](security/privacy.md) | Privacy and security by default | privacy, security, PII, TLS, consent |
| [Data minimization](security/privacy.md) | Data minimization | data minimization, on-device |
| [Consent](security/privacy.md) | Consent | consent, opt-in, deny |
| [Secure storage](security/privacy.md) | Secure storage | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [No PII logging](security/privacy.md) | No PII logging | PII, logging, personally identifiable |
| [TLS only](security/privacy.md) | TLS only | TLS, HTTPS, encryption |
| [Input sanitization](security/privacy.md) | Input sanitization | sanitization, XSS, injection |
| [Feature flags](feature-management/feature-flags.md) | Feature flags | feature flags, FeatureFlagProvider, gating |
| [Analytics](logging/analytics.md) | Analytics | analytics, AnalyticsProvider, tracking |
| [A/B testing](feature-management/ab-testing.md) | A/B testing | A/B testing, ExperimentProvider, variants |
| [Debug mode](feature-management/debug-mode.md) | Debug mode | debug panel, flag overrides, environment info |
| [Linting from day one](code-quality/linting.md) | Linting from day one | linting, SwiftLint, ktlint, ESLint, Roslyn, dotnet format |

## Engineering Principles

| guide. | Principle | Keywords |
|---|-----------|----------|
| [Simplicity](../principles/simplicity.md) | Simplicity | simplicity, complexity, concerns |
| [Make It Work, Make It Right, Make It Fast](../principles/make-it-work-make-it-right-make-it-fast.md) | Make It Work, Make It Right, Make It Fast | correctness, refactor, optimize, phases |
| [Composition over inheritance](../principles/composition-over-inheritance.md) | Composition over inheritance | composition, inheritance, protocols, interfaces |
| [Dependency injection](../principles/dependency-injection.md) | Dependency injection | DI, injection, constructor, service locator |
| [Immutability by default](../principles/immutability-by-default.md) | Immutability by default | immutability, let, val, const, mutable |
| [Fail fast](../principles/fail-fast.md) | Fail fast | fail fast, assertions, preconditions, typed errors |
| [Idempotency](../principles/idempotency.md) | Idempotency | idempotent, debounce, retry, duplicate |
| [Design for deletion](../principles/design-for-deletion.md) | Design for deletion | deletion, disposable, maintenance, liability |
| [YAGNI](../principles/yagni.md) | YAGNI | YAGNI, speculative, premature, requirements |
| [Explicit over implicit](../principles/explicit-over-implicit.md) | Explicit over implicit | explicit, implicit, hidden, magic |
| [Small, reversible decisions](../principles/small-reversible-decisions.md) | Small, reversible decisions | reversible, incremental, binding |
| [Tight feedback loops](../principles/tight-feedback-loops.md) | Tight feedback loops | feedback, tests, deploy, iteration |
| [Separation of concerns](../principles/separation-of-concerns.md) | Separation of concerns | separation, single responsibility, module |
| [Principle of least astonishment](../principles/principle-of-least-astonishment.md) | Principle of least astonishment | least astonishment, expectations, surprise |
| [Manage complexity through boundaries](../principles/manage-complexity-through-boundaries.md) | Manage complexity through boundaries | boundaries, ports, adapters, hexagonal |
| [Meta-Principle: Optimize for Change](../principles/meta-principle-optimize-for-change.md) | Meta-Principle: Optimize for Change | change, future, cost |

## Swift / SwiftUI / AppKit

| guide. | Section | Keywords |
|---|---------|----------|
| References | References | Swift API Design Guidelines, SwiftUI Performance |
| Logging | Logging | os.log, Logger, subsystem, category |
| Secure Storage | Secure Storage | Keychain, UserDefaults, secrets |
| Localization | Localization | String(localized:), NSLocalizedString, .xcstrings |
| Linting and Formatting | Linting and Formatting | SwiftLint, swift-format |
| Shortcuts and Automation | Shortcuts and Automation | AppIntents, Shortcuts, Siri, AppleScript |
| Previews | Previews | #Preview, SwiftUI, render |
| [Dynamic Type](language/swift/dynamic-type.md) | Dynamic Type | Dynamic Type, font sizes, text scaling |
| [Use AppKit and UIKit, not SwiftUI](language/swift/prefer-explicit-apple-apis.md) | Prefer explicit Apple APIs | UIKit, AppKit, SwiftUI restrictions |
| Accessibility Environment Values | Accessibility Environment Values | reduceMotion, reduceTransparency, colorSchemeContrast |
| Concurrency | Concurrency | async/await, Task, actors, @MainActor |
| Privacy | Privacy | App Tracking Transparency, Privacy Report, NSUsageDescription |
| Feature Flags | Feature Flags | protocol, UserDefaults |
| Analytics | Analytics | protocol, os.log |

## Kotlin / Compose / Ktor

| guide. | Section | Keywords |
|---|---------|----------|
| References | References | Kotlin Conventions, Material Design 3, Architecture |
| Logging | Logging | Timber, android.util.Log |
| Concurrency | Concurrency | Coroutines, Dispatchers.IO, viewModelScope |
| Secure Storage | Secure Storage | EncryptedSharedPreferences, Android Keystore |
| Localization | Localization | strings.xml, stringResource, R.string |
| Linting and Formatting | Linting and Formatting | ktlint, .editorconfig |
| Shortcuts and Automation | Shortcuts and Automation | AppActions, Google Assistant, Intent |
| Previews | Previews | @Preview, Compose |
| [Font Scaling](language/kotlin/font-scaling.md) | Font Scaling | fontScale, Configuration, 2x |
| Accessibility Settings | Accessibility Settings | animator_duration_scale, TalkBack, Switch Access |
| Privacy | Privacy | scoped storage, permissions, rationale |
| Feature Flags | Feature Flags | interface, SharedPreferences |
| Analytics | Analytics | interface, Timber |
| RTL Support | RTL Support | supportsRtl, start/end |
| Immutability | Immutability | val, data class, StateFlow |

## TypeScript / React / Web

| guide. | Section | Keywords |
|---|---------|----------|
| Linting and Formatting | Linting and Formatting | ESLint, Prettier, Stylelint |
| Accessibility References | Accessibility References | WCAG 2.1, WAI-ARIA |
| Accessibility CSS Media Queries | Accessibility CSS Media Queries | prefers-reduced-motion, prefers-contrast, forced-colors |
| Security | Security | CSP, HttpOnly, cookies, sanitization, Do Not Track |
| Localization | Localization | react-intl, i18next, FormatJS, message catalogs |
| RTL Layout Support | RTL Layout Support | CSS logical properties, margin-inline-start, dir |
| Testing | Testing | Playwright, E2E, visual regression, Storybook |
| Concurrency | Concurrency | Promise, async/await, Web Workers |
| Deep Linking | Deep Linking | URL routing, shareable URL |
| Debug Mode | Debug Mode | /debug, Ctrl+Shift+D, NODE_ENV |
| Feature Flags | Feature Flags | interface, localStorage |
| Analytics | Analytics | interface, console |
| Immutability | Immutability | const, useState |

## Python

| guide. | Section | Keywords |
|---|---------|----------|
| [No external dependencies in core libraries](language/python/no-external-dependencies-in-core-librari.md) | No external dependencies in core libraries | stdlib, roadmap_lib, portable |
| Testing | Testing | pytest, regression test, demo port 9888 |
| [Type hints](language/python/type-hints.md) | Type hints | type hints, annotations, Python 3.9 |
| [File paths](language/python/file-paths.md) | File paths | pathlib, Path, os.path |
| [YAML frontmatter](language/python/yaml-frontmatter.md) | YAML frontmatter | frontmatter, parse, roadmap_lib |
| [Web services](language/python/web-services.md) | Web services | Flask, REST API |
| [Database](language/python/database.md) | Database | SQLite, WAL, sqlite3 |
| [Use roadmap_lib](language/python/use-roadmaplib.md) | Use roadmap_lib | roadmap_lib, existing functions |
| [Deterministic IDs](language/python/deterministic-ids.md) | Deterministic IDs | UUID, frontmatter, deterministic |
| [Dashboard service is display-only](language/python/dashboard-service-is-display-only.md) | Dashboard service is display-only | dashboard, generic, display-only |
| [Shell scripts](language/python/shell-scripts.md) | Shell scripts | main(), functions, composable |
| Logging | Logging | logging, getLogger, __name__ |

## C# / .NET

| guide. | Section | Keywords |
|---|---------|----------|
| References | References | C# Conventions, .NET Design Guidelines, Runtime Coding Style |
| [Naming](language/csharp/naming.md) | Naming | PascalCase, camelCase, _camelCase, I prefix, Async suffix |
| [Nullable Reference Types](language/csharp/nullable-reference-types.md) | Nullable Reference Types | Nullable, enable, null-forgiving, required, guard clause |
| Immutability | Immutability | readonly, record, ImmutableList, init, with |
| Concurrency | Concurrency | async/await, ConfigureAwait, CancellationToken, ValueTask |
| [Dependency Injection](language/csharp/dependency-injection.md) | Dependency Injection | Microsoft.Extensions.DependencyInjection, IOptions, Transient, Singleton |
| Logging | Logging | ILogger, structured, LoggerMessage, source generator |
| Linting and Formatting | Linting and Formatting | .editorconfig, Roslyn, EnforceCodeStyleInBuild, dotnet format |
| Testing | Testing | xUnit, FluentAssertions, NSubstitute, Fact, Theory |
| Secure Storage | Secure Storage | DPAPI, ProtectedData, User Secrets |
| Privacy | Privacy | capabilities, manifest, broadFileSystemAccess, consent |
| Feature Flags | Feature Flags | IFeatureManager, Microsoft.FeatureManagement |
| Analytics | Analytics | ILogger, interface |

## Windows / WinUI 3

| guide. | Section | Keywords |
|---|---------|----------|
| References | References | WinUI 3, Windows App SDK, Fluent 2, WinUI Gallery |
| [Architecture](platform/windows/architecture.md) | Architecture | MVVM, CommunityToolkit.Mvvm, NavigationView, Frame |
| [Fluent Design](platform/windows/fluent-design.md) | Fluent Design | built-in controls, Segoe UI Variable, Segoe Fluent Icons |
| [Theming](platform/windows/theming.md) | Theming | Light, Dark, High Contrast, ThemeResource, semantic colors |
| Accessibility | Accessibility | UI Automation, AutomationProperties, Accessibility Insights, Narrator |
| Localization | Localization | MRT Core, .resw, x:Uid, ResourceLoader |
| Deep Linking / Protocol Activation | Deep Linking / Protocol Activation | uap:Protocol, AppInstance, GetActivatedEventArgs |
| App Notifications | App Notifications | AppNotificationManager, AppNotificationBuilder, toast |
| [High DPI / Display Scaling](platform/windows/high-dpi-display-scaling.md) | High DPI / Display Scaling | effective pixels, RasterizationScale, multi-scale assets |
| [MSIX Packaging](platform/windows/msix-packaging.md) | MSIX Packaging | MSIX, single-project, capabilities, signing |
| Concurrency | Concurrency | DispatcherQueue, TryEnqueue, UI thread |
| RTL Layout Support | RTL Layout Support | FlowDirection, RightToLeft |
| Logging | Logging | ILogger, ETW, EventSource, Live Visual Tree |
| Debug Mode | Debug Mode | #if DEBUG, settings page |
| [Design-Time Data](platform/windows/design-time-data.md) | Design-Time Data | d:DataContext, d:DesignInstance, XAML Hot Reload |

## UI Design

| guide. | Section | Keywords |
|---|---------|----------|
| [Platform Design Languages](ui/platform-design-languages.md) | Platform Design Languages | HIG, Material Design, Fluent, WCAG |
| [Visual Hierarchy](ui/visual-hierarchy.md) | Visual Hierarchy | focal point, primary action, size, weight, proximity |
| [Spacing](ui/spacing.md) | Spacing | 4px, 8px grid, spacing scale, padding, margin |
| [Typography](ui/typography.md) | Typography | system font, body text, line height, paragraph width |
| [Color](ui/color.md) | Color | semantic tokens, palette, contrast, dark mode |
| [Layout](ui/layout.md) | Layout | single-column, content-first, responsive, scroll direction |
| [State Design](ui/state-design.md) | State Design | loading, empty state, error state, skeleton, CTA |
| [Form Design](ui/form-design.md) | Form Design | forms, validation, error messages, labels |
| [Layout](ui/form-design.md) | Layout | single-column, top-aligned labels |
| [Validation](ui/form-design.md) | Validation | blur, keystroke, submit |
| [Error messages](ui/form-design.md) | Error messages | inline, below field, icon, specific |
| [Other principles](ui/form-design.md) | Other principles | placeholder, pre-fill, optional fields |
| [Feedback Patterns](ui/feedback-patterns.md) | Feedback Patterns | toast, snackbar, dialog, confirmation, destructive |
| [Touch & Click Targets](ui/touch-click-targets.md) | Touch & Click Targets | 44pt, 48dp, 40epx, 24px, hit area, spacing |
| [Animation & Motion](ui/animation-motion.md) | Animation & Motion | duration, easing, reduced-motion, spring |
| [Iconography](ui/iconography.md) | Iconography | SF Symbols, Material Symbols, Segoe Fluent Icons, labels |
| [Data Display](ui/data-display.md) | Data Display | list, table, cards, grid, sort, filter, search |
| [Previews](ui/previews.md) | Previews | #Preview, SwiftUI, Compose @Preview, component preview |

## Networking

| guide. | Section | Keywords |
|---|---------|----------|
| [References](networking/references.md) | References | Microsoft REST, Google API Design, Zalando, RFC 9457, RFC 9111 |
| [API Design](networking/api-design.md) | API Design | REST, URL, HTTP methods, status codes, versioning |
| [Error Responses](networking/error-responses.md) | Error Responses | RFC 9457, Problem Details, application/problem+json |
| [Pagination](networking/pagination.md) | Pagination | cursor, offset, next_cursor, has_more, page_token |
| [Retry and Resilience](networking/retry-and-resilience.md) | Retry and Resilience | exponential backoff, jitter, circuit breaker, retryable |
| [Timeouts](networking/timeouts.md) | Timeouts | connection timeout, read timeout, 10s, 30s |
| [Caching](networking/caching.md) | Caching | Cache-Control, ETag, If-None-Match, stale-while-revalidate |
| [Offline and Connectivity](networking/offline-and-connectivity.md) | Offline and Connectivity | offline-first, optimistic updates, sync, conflict resolution |
| [Rate Limiting](networking/rate-limiting.md) | Rate Limiting | 429, Retry-After, RateLimit-Remaining, throttling |
| [Real-Time Communication](networking/real-time-communication.md) | Real-Time Communication | SSE, WebSocket, polling, EventSource |

## Security

| guide. | Section | Keywords |
|---|---------|----------|
| [References](security/references.md) | References | OWASP, MASVS, MASTG, Mozilla TLS |
| [Authentication](security/authentication.md) | Authentication | OAuth 2.0, OIDC, PKCE, system browser, BFF |
| [Token Handling](security/token-handling.md) | Token Handling | access token, refresh token, JWT, storage |
| [Access tokens](security/token-handling.md) | Access tokens | short-lived, 5-15 min, claims |
| [Refresh tokens](security/token-handling.md) | Refresh tokens | rotation, revocation, token family |
| [Token refresh strategy](security/token-handling.md) | Token refresh strategy | proactive, 75% TTL, queue |
| [Secure storage per platform](security/token-handling.md) | Secure storage per platform | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [Never do these](security/token-handling.md) | Never do these | localStorage, URL params, alg:none |
| [Authorization](security/authorization.md) | Authorization | RBAC, scopes, least privilege, BOLA, deny by default |
| [Transport Security](security/transport-security.md) | Transport Security | TLS 1.2, TLS 1.3, HSTS, certificate pinning, AEAD |
| [CORS](security/cors.md) | CORS | origin allowlist, preflight, credentials, misconfigurations |
| [Content Security Policy](security/content-security-policy.md) | Content Security Policy | CSP, nonce, strict-dynamic, frame-ancestors, report-only |
| [Input Validation](security/input-validation.md) | Input Validation | allowlist, parameterized queries, output encoding, file uploads |
| [Sensitive Data](security/sensitive-data.md) | Sensitive Data | data minimization, PII, field-level encryption, KMS |
| [Dependency Security](security/dependency-security.md) | Dependency Security | lockfiles, npm audit, pin versions, SRI, supply chain |
| [Security Headers Checklist](security/security-headers-checklist.md) | Security Headers Checklist | HSTS, CSP, X-Content-Type-Options, Referrer-Policy |

## Database Design

| guide. | Rule | Keywords |
|---|------|----------|
| [SQLite best practices](database-design/sqlite-best-practices.md) | Comprehensive SQLite reference — schema design, naming, types, keys, indexes, triggers, WAL, transactions, migrations, backup, security, testing, device-to-server sync, conflict resolution, offline-first, CRDTs | SQLite, database, schema, indexes, WAL, sync, offline-first, CRDT, PRAGMA, foreign keys, triggers, migration |

## Spec Writing Format

| guide. | Section | Keywords |
|---|---------|----------|
| Frontmatter | Frontmatter | version, status, created, platforms, dependencies |
| RFC 2119 Keywords | RFC 2119 Keywords | MUST, SHOULD, MAY, requirements |
| Requirement Numbering | Requirement Numbering | REQ-NNN, sequential, test vector |
| Template Variables | Template Variables | {{app_name}}, {{bundle_id}}, placeholders |
| Standard Sections | Standard Sections | Overview, Requirements, API Contract, Accessibility, Logging |
| Test Vector Formats | Test Vector Formats | behavioral table, data JSON, input/expected |
| Logging Section | Logging Section | log messages, subsystem, category, grep |
| Privacy Section | Privacy Section | data collected, storage, PII handling |
| Feature Flags Section | Feature Flags Section | flag keys, gating |
| Analytics Section | Analytics Section | event names, property schemas |

## Best Practices References

| guide. | Section | Keywords |
|---|---------|----------|
| [Apple](../reference/best-practices/apple.md) | Apple | HIG, Swift API Design, Accessibility, App Store |
| [Android](../reference/best-practices/android.md) | Android | Material Design 3, Architecture, Kotlin, Google Play |
| [Web](../reference/best-practices/web.md) | Web | WCAG, WAI-ARIA, OWASP, MDN |
| [Windows / .NET](../reference/best-practices/windows-net.md) | Windows / .NET | C# Conventions, .NET Guidelines, WinUI 3, Fluent, MSIX |
| [UI Design](../reference/best-practices/ui-design.md) | UI Design | NNGroup, Visual Hierarchy, Form Design, Empty States |
| [Networking](../reference/best-practices/networking.md) | Networking | Microsoft REST, Google API, Zalando, RFC 9457, RFC 9111 |
| [Security](../reference/best-practices/security.md) | Security | OWASP Top 10, Mobile Top 10, Cheat Sheets, Mozilla TLS, SLSA |
| [Testing](../reference/best-practices/testing.md) | Testing | Google SWE Book, Martin Fowler, Kent Beck, Hypothesis, mutmut, Stryker |
| [Cross-Platform](../reference/best-practices/cross-platform.md) | Cross-Platform | Nielsen Norman, MASVS, MASTG |

## Testing

| guide. | Section | Keywords |
|---|---------|----------|
| [References](testing/references.md) | References | Google SWE Book, Martin Fowler, Kent Beck, ISTQB |
| [Test Pyramid](testing/test-pyramid.md) | Test Pyramid | 80/15/5, unit, integration, E2E |
| [Properties of Good Tests](testing/properties-of-good-tests.md) | Properties of Good Tests | isolated, deterministic, fast, readable, behavioral |
| [Unit Test Patterns](testing/unit-test-patterns.md) | Unit Test Patterns | AAA, arrange-act-assert, naming, one concept |
| [Property-Based Testing](testing/property-based-testing.md) | Property-Based Testing | Hypothesis, fast-check, round-trip, generators |
| [Mutation Testing](testing/mutation-testing.md) | Mutation Testing | mutmut, Stryker, Muter, Pitest, surviving mutants |
| [Test Doubles](testing/test-doubles.md) | Test Doubles | mock, stub, fake, spy, dummy, NSubstitute |
| [Security Testing](testing/security-testing.md) | Security Testing | Semgrep, Bandit, CodeQL, OWASP ZAP, pip-audit |
| [Flaky Test Prevention](testing/flaky-test-prevention.md) | Flaky Test Prevention | determinism, shared state, sleep, timing |
| [Test Data](testing/test-data.md) | Test Data | builder pattern, factory, generators, inline literals |
| [The Testing Workflow](testing/the-testing-workflow.md) | The Testing Workflow | closed loop, mutation, security scan, E2E |

## Skills and Agents

| guide. | Section | Keywords |
|---|---------|----------|
| [Authoring Skills and Rules](skills-and-agents/authoring-skills-and-rules.md) | Authoring Skills and Rules | skill, rule, agent, SKILL.md, hooks |
| [Performance](skills-and-agents/performance.md) | Performance: Speed and Token Efficiency | tokens, model selection, context, caching |
| [Skill Checklist](skills-and-agents/skill-checklist.md) | Skill Checklist | checklist, lint, validation |
| [Rule Checklist](skills-and-agents/rule-checklist.md) | Rule Checklist | checklist, lint, validation |
| [Agent Checklist](skills-and-agents/agent-checklist.md) | Agent Checklist | checklist, lint, validation |
| [Skill Structure Reference](skills-and-agents/skill-structure-reference.md) | Skill Structure Reference | frontmatter, sections, format |
| [Rule Structure Reference](skills-and-agents/rule-structure-reference.md) | Rule Structure Reference | frontmatter, sections, format |
| [Agent Structure Reference](skills-and-agents/agent-structure-reference.md) | Agent Structure Reference | frontmatter, sections, format |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.1.0 | 2026-04-04 | Mike Fullerton | Add database-design category with SQLite best practices |
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
