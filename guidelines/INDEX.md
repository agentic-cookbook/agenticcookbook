# Guidelines Index

Complete index of all rules, principles, and conventions across all guideline files.
Use `GUIDE-X.Y` notation to cross-reference any rule. Search this file to find where a topic is covered.

---

## GUIDE-1. General Coding Guidelines — [general.md](general.md)

| GUIDE- | Rule | Keywords |
|---|------|----------|
| [GUIDE-1.1](general.md#GUIDE-11-prefer-native-controls-and-libraries) | Prefer native controls and libraries | native, platform, built-in, framework |
| [GUIDE-1.2](general.md#GUIDE-12-for-novel-components-prefer-proven-open-source-solutions) | For novel components, prefer proven open-source solutions | open-source, library, custom |
| [GUIDE-1.3](general.md#GUIDE-13-surface-all-design-decisions) | Surface all design decisions | decisions, approval, LLM, consistency |
| [GUIDE-1.4](general.md#GUIDE-14-no-blocking-the-main-thread) | No blocking the main thread | async, await, concurrency, background, UI thread |
| [GUIDE-1.5](general.md#GUIDE-15-always-show-progress) | Always show progress | spinner, skeleton, shimmer, progress bar, loading |
| [GUIDE-1.6](general.md#GUIDE-16-comprehensive-unit-testing) | Comprehensive unit testing | tests, unit tests, edge cases, test file |
| [GUIDE-1.7](general.md#GUIDE-17-small-atomic-commits) | Small, atomic commits | commits, git, one change |
| [GUIDE-1.8](general.md#GUIDE-18-post-generation-verification) | Post-generation verification | build, test, lint, accessibility audit, code review |
| [GUIDE-1.9](general.md#GUIDE-19-instrumented-logging) | Instrumented logging | logging, os.log, Timber, ILogger, structured |
| [GUIDE-1.10](general.md#GUIDE-110-deep-linking) | Deep linking | deep link, URL, Universal Links, App Links, protocol activation |
| [GUIDE-1.11](general.md#GUIDE-111-scriptable-and-automatable) | Scriptable and automatable | AppIntents, AppActions, Shortcuts, automation |
| [GUIDE-1.12](general.md#GUIDE-112-accessibility-from-day-one) | Accessibility from day one | accessibility, VoiceOver, TalkBack, Narrator, WCAG, contrast, focus |
| [GUIDE-1.13](general.md#GUIDE-113-localizability) | Localizability | localization, i18n, strings, .xcstrings, strings.xml, .resw |
| [GUIDE-1.14](general.md#GUIDE-114-rtl-layout-support) | RTL layout support | RTL, right-to-left, leading, trailing, FlowDirection |
| [GUIDE-1.15](general.md#GUIDE-115-respect-accessibility-display-options) | Respect accessibility display options | reduced motion, high contrast, bold text, grayscale |
| [GUIDE-1.16](general.md#GUIDE-116-privacy-and-security-by-default) | Privacy and security by default | privacy, security, PII, TLS, consent |
| [GUIDE-1.16.1](general.md#GUIDE-1161-data-minimization) | Data minimization | data minimization, on-device |
| [GUIDE-1.16.2](general.md#GUIDE-1162-consent) | Consent | consent, opt-in, deny |
| [GUIDE-1.16.3](general.md#GUIDE-1163-secure-storage) | Secure storage | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [GUIDE-1.16.4](general.md#GUIDE-1164-no-pii-logging) | No PII logging | PII, logging, personally identifiable |
| [GUIDE-1.16.5](general.md#GUIDE-1165-tls-only) | TLS only | TLS, HTTPS, encryption |
| [GUIDE-1.16.6](general.md#GUIDE-1166-input-sanitization) | Input sanitization | sanitization, XSS, injection |
| [GUIDE-1.17](general.md#GUIDE-117-feature-flags) | Feature flags | feature flags, FeatureFlagProvider, gating |
| [GUIDE-1.18](general.md#GUIDE-118-analytics) | Analytics | analytics, AnalyticsProvider, tracking |
| [GUIDE-1.19](general.md#GUIDE-119-ab-testing) | A/B testing | A/B testing, ExperimentProvider, variants |
| [GUIDE-1.20](general.md#GUIDE-120-debug-mode) | Debug mode | debug panel, flag overrides, environment info |
| [GUIDE-1.21](general.md#GUIDE-121-linting-from-day-one) | Linting from day one | linting, SwiftLint, ktlint, ESLint, Roslyn, dotnet format |

## GUIDE-2. Engineering Principles — [engineering-principles.md](engineering-principles.md)

| GUIDE- | Principle | Keywords |
|---|-----------|----------|
| [GUIDE-2.1](engineering-principles.md#GUIDE-21-simplicity) | Simplicity | simplicity, complexity, concerns |
| [GUIDE-2.2](engineering-principles.md#GUIDE-22-make-it-work-make-it-right-make-it-fast) | Make It Work, Make It Right, Make It Fast | correctness, refactor, optimize, phases |
| [GUIDE-2.3](engineering-principles.md#GUIDE-23-composition-over-inheritance) | Composition over inheritance | composition, inheritance, protocols, interfaces |
| [GUIDE-2.4](engineering-principles.md#GUIDE-24-dependency-injection) | Dependency injection | DI, injection, constructor, service locator |
| [GUIDE-2.5](engineering-principles.md#GUIDE-25-immutability-by-default) | Immutability by default | immutability, let, val, const, mutable |
| [GUIDE-2.6](engineering-principles.md#GUIDE-26-fail-fast) | Fail fast | fail fast, assertions, preconditions, typed errors |
| [GUIDE-2.7](engineering-principles.md#GUIDE-27-idempotency) | Idempotency | idempotent, debounce, retry, duplicate |
| [GUIDE-2.8](engineering-principles.md#GUIDE-28-design-for-deletion) | Design for deletion | deletion, disposable, maintenance, liability |
| [GUIDE-2.9](engineering-principles.md#GUIDE-29-yagni) | YAGNI | YAGNI, speculative, premature, requirements |
| [GUIDE-2.10](engineering-principles.md#GUIDE-210-explicit-over-implicit) | Explicit over implicit | explicit, implicit, hidden, magic |
| [GUIDE-2.11](engineering-principles.md#GUIDE-211-small-reversible-decisions) | Small, reversible decisions | reversible, incremental, binding |
| [GUIDE-2.12](engineering-principles.md#GUIDE-212-tight-feedback-loops) | Tight feedback loops | feedback, tests, deploy, iteration |
| [GUIDE-2.13](engineering-principles.md#GUIDE-213-separation-of-concerns) | Separation of concerns | separation, single responsibility, module |
| [GUIDE-2.14](engineering-principles.md#GUIDE-214-principle-of-least-astonishment) | Principle of least astonishment | least astonishment, expectations, surprise |
| [GUIDE-2.15](engineering-principles.md#GUIDE-215-manage-complexity-through-boundaries) | Manage complexity through boundaries | boundaries, ports, adapters, hexagonal |
| [GUIDE-2.16](engineering-principles.md#GUIDE-216-meta-principle-optimize-for-change) | Meta-Principle: Optimize for Change | change, future, cost |

## GUIDE-3. Swift / SwiftUI / AppKit — [swift.md](swift.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-3.1](swift.md#GUIDE-31-references) | References | Swift API Design Guidelines, SwiftUI Performance |
| [GUIDE-3.2](swift.md#GUIDE-32-logging) | Logging | os.log, Logger, subsystem, category |
| [GUIDE-3.3](swift.md#GUIDE-33-secure-storage) | Secure Storage | Keychain, UserDefaults, secrets |
| [GUIDE-3.4](swift.md#GUIDE-34-localization) | Localization | String(localized:), NSLocalizedString, .xcstrings |
| [GUIDE-3.5](swift.md#GUIDE-35-linting-and-formatting) | Linting and Formatting | SwiftLint, swift-format |
| [GUIDE-3.6](swift.md#GUIDE-36-shortcuts-and-automation) | Shortcuts and Automation | AppIntents, Shortcuts, Siri, AppleScript |
| [GUIDE-3.7](swift.md#GUIDE-37-previews) | Previews | #Preview, SwiftUI, render |
| [GUIDE-3.8](swift.md#GUIDE-38-dynamic-type) | Dynamic Type | Dynamic Type, font sizes, text scaling |
| [GUIDE-3.9](swift.md#GUIDE-39-accessibility-environment-values) | Accessibility Environment Values | reduceMotion, reduceTransparency, colorSchemeContrast |
| [GUIDE-3.10](swift.md#GUIDE-310-concurrency) | Concurrency | async/await, Task, actors, @MainActor |
| [GUIDE-3.11](swift.md#GUIDE-311-privacy) | Privacy | App Tracking Transparency, Privacy Report, NSUsageDescription |
| [GUIDE-3.12](swift.md#GUIDE-312-feature-flags) | Feature Flags | protocol, UserDefaults |
| [GUIDE-3.13](swift.md#GUIDE-313-analytics) | Analytics | protocol, os.log |

## GUIDE-4. Kotlin / Compose / Ktor — [kotlin.md](kotlin.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-4.1](kotlin.md#GUIDE-41-references) | References | Kotlin Conventions, Material Design 3, Architecture |
| [GUIDE-4.2](kotlin.md#GUIDE-42-logging) | Logging | Timber, android.util.Log |
| [GUIDE-4.3](kotlin.md#GUIDE-43-concurrency) | Concurrency | Coroutines, Dispatchers.IO, viewModelScope |
| [GUIDE-4.4](kotlin.md#GUIDE-44-secure-storage) | Secure Storage | EncryptedSharedPreferences, Android Keystore |
| [GUIDE-4.5](kotlin.md#GUIDE-45-localization) | Localization | strings.xml, stringResource, R.string |
| [GUIDE-4.6](kotlin.md#GUIDE-46-linting-and-formatting) | Linting and Formatting | ktlint, .editorconfig |
| [GUIDE-4.7](kotlin.md#GUIDE-47-shortcuts-and-automation) | Shortcuts and Automation | AppActions, Google Assistant, Intent |
| [GUIDE-4.8](kotlin.md#GUIDE-48-previews) | Previews | @Preview, Compose |
| [GUIDE-4.9](kotlin.md#GUIDE-49-font-scaling) | Font Scaling | fontScale, Configuration, 2x |
| [GUIDE-4.10](kotlin.md#GUIDE-410-accessibility-settings) | Accessibility Settings | animator_duration_scale, TalkBack, Switch Access |
| [GUIDE-4.11](kotlin.md#GUIDE-411-privacy) | Privacy | scoped storage, permissions, rationale |
| [GUIDE-4.12](kotlin.md#GUIDE-412-feature-flags) | Feature Flags | interface, SharedPreferences |
| [GUIDE-4.13](kotlin.md#GUIDE-413-analytics) | Analytics | interface, Timber |
| [GUIDE-4.14](kotlin.md#GUIDE-414-rtl-support) | RTL Support | supportsRtl, start/end |
| [GUIDE-4.15](kotlin.md#GUIDE-415-immutability) | Immutability | val, data class, StateFlow |

## GUIDE-5. TypeScript / React / Web — [typescript.md](typescript.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-5.1](typescript.md#GUIDE-51-linting-and-formatting) | Linting and Formatting | ESLint, Prettier, Stylelint |
| [GUIDE-5.2](typescript.md#GUIDE-52-accessibility-references) | Accessibility References | WCAG 2.1, WAI-ARIA |
| [GUIDE-5.3](typescript.md#GUIDE-53-accessibility-css-media-queries) | Accessibility CSS Media Queries | prefers-reduced-motion, prefers-contrast, forced-colors |
| [GUIDE-5.4](typescript.md#GUIDE-54-security) | Security | CSP, HttpOnly, cookies, sanitization, Do Not Track |
| [GUIDE-5.5](typescript.md#GUIDE-55-localization) | Localization | react-intl, i18next, FormatJS, message catalogs |
| [GUIDE-5.6](typescript.md#GUIDE-56-rtl-layout-support) | RTL Layout Support | CSS logical properties, margin-inline-start, dir |
| [GUIDE-5.7](typescript.md#GUIDE-57-testing) | Testing | Playwright, E2E, visual regression, Storybook |
| [GUIDE-5.8](typescript.md#GUIDE-58-concurrency) | Concurrency | Promise, async/await, Web Workers |
| [GUIDE-5.9](typescript.md#GUIDE-59-deep-linking) | Deep Linking | URL routing, shareable URL |
| [GUIDE-5.10](typescript.md#GUIDE-510-debug-mode) | Debug Mode | /debug, Ctrl+Shift+D, NODE_ENV |
| [GUIDE-5.11](typescript.md#GUIDE-511-feature-flags) | Feature Flags | interface, localStorage |
| [GUIDE-5.12](typescript.md#GUIDE-512-analytics) | Analytics | interface, console |
| [GUIDE-5.13](typescript.md#GUIDE-513-immutability) | Immutability | const, useState |

## GUIDE-6. Python — [python.md](python.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-6.1](python.md#GUIDE-61-no-external-dependencies-in-core-libraries) | No external dependencies in core libraries | stdlib, roadmap_lib, portable |
| [GUIDE-6.2](python.md#GUIDE-62-testing) | Testing | pytest, regression test, demo port 9888 |
| [GUIDE-6.3](python.md#GUIDE-63-type-hints) | Type hints | type hints, annotations, Python 3.9 |
| [GUIDE-6.4](python.md#GUIDE-64-file-paths) | File paths | pathlib, Path, os.path |
| [GUIDE-6.5](python.md#GUIDE-65-yaml-frontmatter) | YAML frontmatter | frontmatter, parse, roadmap_lib |
| [GUIDE-6.6](python.md#GUIDE-66-web-services) | Web services | Flask, REST API |
| [GUIDE-6.7](python.md#GUIDE-67-database) | Database | SQLite, WAL, sqlite3 |
| [GUIDE-6.8](python.md#GUIDE-68-use-roadmap_lib) | Use roadmap_lib | roadmap_lib, existing functions |
| [GUIDE-6.9](python.md#GUIDE-69-deterministic-ids) | Deterministic IDs | UUID, frontmatter, deterministic |
| [GUIDE-6.10](python.md#GUIDE-610-dashboard-service-is-display-only) | Dashboard service is display-only | dashboard, generic, display-only |
| [GUIDE-6.11](python.md#GUIDE-611-shell-scripts) | Shell scripts | main(), functions, composable |
| [GUIDE-6.12](python.md#GUIDE-612-logging) | Logging | logging, getLogger, __name__ |

## GUIDE-7. C# / .NET — [csharp.md](csharp.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-7.1](csharp.md#GUIDE-71-references) | References | C# Conventions, .NET Design Guidelines, Runtime Coding Style |
| [GUIDE-7.2](csharp.md#GUIDE-72-naming) | Naming | PascalCase, camelCase, _camelCase, I prefix, Async suffix |
| [GUIDE-7.3](csharp.md#GUIDE-73-nullable-reference-types) | Nullable Reference Types | Nullable, enable, null-forgiving, required, guard clause |
| [GUIDE-7.4](csharp.md#GUIDE-74-immutability) | Immutability | readonly, record, ImmutableList, init, with |
| [GUIDE-7.5](csharp.md#GUIDE-75-concurrency) | Concurrency | async/await, ConfigureAwait, CancellationToken, ValueTask |
| [GUIDE-7.6](csharp.md#GUIDE-76-dependency-injection) | Dependency Injection | Microsoft.Extensions.DependencyInjection, IOptions, Transient, Singleton |
| [GUIDE-7.7](csharp.md#GUIDE-77-logging) | Logging | ILogger, structured, LoggerMessage, source generator |
| [GUIDE-7.8](csharp.md#GUIDE-78-linting-and-formatting) | Linting and Formatting | .editorconfig, Roslyn, EnforceCodeStyleInBuild, dotnet format |
| [GUIDE-7.9](csharp.md#GUIDE-79-testing) | Testing | xUnit, FluentAssertions, NSubstitute, Fact, Theory |
| [GUIDE-7.10](csharp.md#GUIDE-710-secure-storage) | Secure Storage | DPAPI, ProtectedData, User Secrets |
| [GUIDE-7.11](csharp.md#GUIDE-711-privacy) | Privacy | capabilities, manifest, broadFileSystemAccess, consent |
| [GUIDE-7.12](csharp.md#GUIDE-712-feature-flags) | Feature Flags | IFeatureManager, Microsoft.FeatureManagement |
| [GUIDE-7.13](csharp.md#GUIDE-713-analytics) | Analytics | ILogger, interface |

## GUIDE-8. Windows / WinUI 3 — [windows.md](windows.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-8.1](windows.md#GUIDE-81-references) | References | WinUI 3, Windows App SDK, Fluent 2, WinUI Gallery |
| [GUIDE-8.2](windows.md#GUIDE-82-architecture) | Architecture | MVVM, CommunityToolkit.Mvvm, NavigationView, Frame |
| [GUIDE-8.3](windows.md#GUIDE-83-fluent-design) | Fluent Design | built-in controls, Segoe UI Variable, Segoe Fluent Icons |
| [GUIDE-8.4](windows.md#GUIDE-84-theming) | Theming | Light, Dark, High Contrast, ThemeResource, semantic colors |
| [GUIDE-8.5](windows.md#GUIDE-85-accessibility) | Accessibility | UI Automation, AutomationProperties, Accessibility Insights, Narrator |
| [GUIDE-8.6](windows.md#GUIDE-86-localization) | Localization | MRT Core, .resw, x:Uid, ResourceLoader |
| [GUIDE-8.7](windows.md#GUIDE-87-deep-linking--protocol-activation) | Deep Linking / Protocol Activation | uap:Protocol, AppInstance, GetActivatedEventArgs |
| [GUIDE-8.8](windows.md#GUIDE-88-app-notifications) | App Notifications | AppNotificationManager, AppNotificationBuilder, toast |
| [GUIDE-8.9](windows.md#GUIDE-89-high-dpi--display-scaling) | High DPI / Display Scaling | effective pixels, RasterizationScale, multi-scale assets |
| [GUIDE-8.10](windows.md#GUIDE-810-msix-packaging) | MSIX Packaging | MSIX, single-project, capabilities, signing |
| [GUIDE-8.11](windows.md#GUIDE-811-concurrency) | Concurrency | DispatcherQueue, TryEnqueue, UI thread |
| [GUIDE-8.12](windows.md#GUIDE-812-rtl-layout-support) | RTL Layout Support | FlowDirection, RightToLeft |
| [GUIDE-8.13](windows.md#GUIDE-813-logging) | Logging | ILogger, ETW, EventSource, Live Visual Tree |
| [GUIDE-8.14](windows.md#GUIDE-814-debug-mode) | Debug Mode | #if DEBUG, settings page |
| [GUIDE-8.15](windows.md#GUIDE-815-design-time-data) | Design-Time Data | d:DataContext, d:DesignInstance, XAML Hot Reload |

## GUIDE-9. UI Design — [ui.md](ui.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-9.1](ui.md#GUIDE-91-platform-design-languages) | Platform Design Languages | HIG, Material Design, Fluent, WCAG |
| [GUIDE-9.2](ui.md#GUIDE-92-visual-hierarchy) | Visual Hierarchy | focal point, primary action, size, weight, proximity |
| [GUIDE-9.3](ui.md#GUIDE-93-spacing) | Spacing | 4px, 8px grid, spacing scale, padding, margin |
| [GUIDE-9.4](ui.md#GUIDE-94-typography) | Typography | system font, body text, line height, paragraph width |
| [GUIDE-9.5](ui.md#GUIDE-95-color) | Color | semantic tokens, palette, contrast, dark mode |
| [GUIDE-9.6](ui.md#GUIDE-96-layout) | Layout | single-column, content-first, responsive, scroll direction |
| [GUIDE-9.7](ui.md#GUIDE-97-state-design) | State Design | loading, empty state, error state, skeleton, CTA |
| [GUIDE-9.8](ui.md#GUIDE-98-form-design) | Form Design | forms, validation, error messages, labels |
| [GUIDE-9.8.1](ui.md#GUIDE-981-layout) | Layout | single-column, top-aligned labels |
| [GUIDE-9.8.2](ui.md#GUIDE-982-validation) | Validation | blur, keystroke, submit |
| [GUIDE-9.8.3](ui.md#GUIDE-983-error-messages) | Error messages | inline, below field, icon, specific |
| [GUIDE-9.8.4](ui.md#GUIDE-984-other-principles) | Other principles | placeholder, pre-fill, optional fields |
| [GUIDE-9.9](ui.md#GUIDE-99-feedback-patterns) | Feedback Patterns | toast, snackbar, dialog, confirmation, destructive |
| [GUIDE-9.10](ui.md#GUIDE-910-touch--click-targets) | Touch & Click Targets | 44pt, 48dp, 40epx, 24px, hit area, spacing |
| [GUIDE-9.11](ui.md#GUIDE-911-animation--motion) | Animation & Motion | duration, easing, reduced-motion, spring |
| [GUIDE-9.12](ui.md#GUIDE-912-iconography) | Iconography | SF Symbols, Material Symbols, Segoe Fluent Icons, labels |
| [GUIDE-9.13](ui.md#GUIDE-913-data-display) | Data Display | list, table, cards, grid, sort, filter, search |

## GUIDE-10. Networking — [networking.md](networking.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-10.1](networking.md#GUIDE-101-references) | References | Microsoft REST, Google API Design, Zalando, RFC 9457, RFC 9111 |
| [GUIDE-10.2](networking.md#GUIDE-102-api-design) | API Design | REST, URL, HTTP methods, status codes, versioning |
| [GUIDE-10.3](networking.md#GUIDE-103-error-responses) | Error Responses | RFC 9457, Problem Details, application/problem+json |
| [GUIDE-10.4](networking.md#GUIDE-104-pagination) | Pagination | cursor, offset, next_cursor, has_more, page_token |
| [GUIDE-10.5](networking.md#GUIDE-105-retry-and-resilience) | Retry and Resilience | exponential backoff, jitter, circuit breaker, retryable |
| [GUIDE-10.6](networking.md#GUIDE-106-timeouts) | Timeouts | connection timeout, read timeout, 10s, 30s |
| [GUIDE-10.7](networking.md#GUIDE-107-caching) | Caching | Cache-Control, ETag, If-None-Match, stale-while-revalidate |
| [GUIDE-10.8](networking.md#GUIDE-108-offline-and-connectivity) | Offline and Connectivity | offline-first, optimistic updates, sync, conflict resolution |
| [GUIDE-10.9](networking.md#GUIDE-109-rate-limiting) | Rate Limiting | 429, Retry-After, RateLimit-Remaining, throttling |
| [GUIDE-10.10](networking.md#GUIDE-1010-real-time-communication) | Real-Time Communication | SSE, WebSocket, polling, EventSource |

## GUIDE-11. Security — [security.md](security.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-11.1](security.md#GUIDE-111-references) | References | OWASP, MASVS, MASTG, Mozilla TLS |
| [GUIDE-11.2](security.md#GUIDE-112-authentication) | Authentication | OAuth 2.0, OIDC, PKCE, system browser, BFF |
| [GUIDE-11.3](security.md#GUIDE-113-token-handling) | Token Handling | access token, refresh token, JWT, storage |
| [GUIDE-11.3.1](security.md#GUIDE-1131-access-tokens) | Access tokens | short-lived, 5-15 min, claims |
| [GUIDE-11.3.2](security.md#GUIDE-1132-refresh-tokens) | Refresh tokens | rotation, revocation, token family |
| [GUIDE-11.3.3](security.md#GUIDE-1133-token-refresh-strategy) | Token refresh strategy | proactive, 75% TTL, queue |
| [GUIDE-11.3.4](security.md#GUIDE-1134-secure-storage-per-platform) | Secure storage per platform | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [GUIDE-11.3.5](security.md#GUIDE-1135-never-do-these) | Never do these | localStorage, URL params, alg:none |
| [GUIDE-11.4](security.md#GUIDE-114-authorization) | Authorization | RBAC, scopes, least privilege, BOLA, deny by default |
| [GUIDE-11.5](security.md#GUIDE-115-transport-security) | Transport Security | TLS 1.2, TLS 1.3, HSTS, certificate pinning, AEAD |
| [GUIDE-11.6](security.md#GUIDE-116-cors) | CORS | origin allowlist, preflight, credentials, misconfigurations |
| [GUIDE-11.7](security.md#GUIDE-117-content-security-policy) | Content Security Policy | CSP, nonce, strict-dynamic, frame-ancestors, report-only |
| [GUIDE-11.8](security.md#GUIDE-118-input-validation) | Input Validation | allowlist, parameterized queries, output encoding, file uploads |
| [GUIDE-11.9](security.md#GUIDE-119-sensitive-data) | Sensitive Data | data minimization, PII, field-level encryption, KMS |
| [GUIDE-11.10](security.md#GUIDE-1110-dependency-security) | Dependency Security | lockfiles, npm audit, pin versions, SRI, supply chain |
| [GUIDE-11.11](security.md#GUIDE-1111-security-headers-checklist) | Security Headers Checklist | HSTS, CSP, X-Content-Type-Options, Referrer-Policy |

## GUIDE-12. Spec Writing Format — [specs.md](specs.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-12.1](specs.md#GUIDE-121-frontmatter) | Frontmatter | version, status, created, platforms, dependencies |
| [GUIDE-12.2](specs.md#GUIDE-122-rfc-2119-keywords) | RFC 2119 Keywords | MUST, SHOULD, MAY, requirements |
| [GUIDE-12.3](specs.md#GUIDE-123-requirement-numbering) | Requirement Numbering | REQ-NNN, sequential, test vector |
| [GUIDE-12.4](specs.md#GUIDE-124-template-variables) | Template Variables | {{app_name}}, {{bundle_id}}, placeholders |
| [GUIDE-12.5](specs.md#GUIDE-125-standard-sections) | Standard Sections | Overview, Requirements, API Contract, Accessibility, Logging |
| [GUIDE-12.6](specs.md#GUIDE-126-test-vector-formats) | Test Vector Formats | behavioral table, data JSON, input/expected |
| [GUIDE-12.7](specs.md#GUIDE-127-logging-section) | Logging Section | log messages, subsystem, category, grep |
| [GUIDE-12.8](specs.md#GUIDE-128-privacy-section) | Privacy Section | data collected, storage, PII handling |
| [GUIDE-12.9](specs.md#GUIDE-129-feature-flags-section) | Feature Flags Section | flag keys, gating |
| [GUIDE-12.10](specs.md#GUIDE-1210-analytics-section) | Analytics Section | event names, property schemas |

## GUIDE-13. Best Practices References — [best-practices-references.md](best-practices-references.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-13.1](best-practices-references.md#GUIDE-131-apple) | Apple | HIG, Swift API Design, Accessibility, App Store |
| [GUIDE-13.2](best-practices-references.md#GUIDE-132-android) | Android | Material Design 3, Architecture, Kotlin, Google Play |
| [GUIDE-13.3](best-practices-references.md#GUIDE-133-web) | Web | WCAG, WAI-ARIA, OWASP, MDN |
| [GUIDE-13.4](best-practices-references.md#GUIDE-134-windows--net) | Windows / .NET | C# Conventions, .NET Guidelines, WinUI 3, Fluent, MSIX |
| [GUIDE-13.5](best-practices-references.md#GUIDE-135-ui-design) | UI Design | NNGroup, Visual Hierarchy, Form Design, Empty States |
| [GUIDE-13.6](best-practices-references.md#GUIDE-136-networking) | Networking | Microsoft REST, Google API, Zalando, RFC 9457, RFC 9111 |
| [GUIDE-13.7](best-practices-references.md#GUIDE-137-security) | Security | OWASP Top 10, Mobile Top 10, Cheat Sheets, Mozilla TLS, SLSA |
| [GUIDE-13.9](best-practices-references.md#GUIDE-139-testing) | Testing | Google SWE Book, Martin Fowler, Kent Beck, Hypothesis, mutmut, Stryker |
| [GUIDE-13.10](best-practices-references.md#GUIDE-1310-cross-platform) | Cross-Platform | Nielsen Norman, MASVS, MASTG |

## GUIDE-14. Testing — [testing.md](testing.md)

| GUIDE- | Section | Keywords |
|---|---------|----------|
| [GUIDE-14.1](testing.md#GUIDE-141-references) | References | Google SWE Book, Martin Fowler, Kent Beck, ISTQB |
| [GUIDE-14.2](testing.md#GUIDE-142-test-pyramid) | Test Pyramid | 80/15/5, unit, integration, E2E |
| [GUIDE-14.3](testing.md#GUIDE-143-properties-of-good-tests) | Properties of Good Tests | isolated, deterministic, fast, readable, behavioral |
| [GUIDE-14.4](testing.md#GUIDE-144-unit-test-patterns) | Unit Test Patterns | AAA, arrange-act-assert, naming, one concept |
| [GUIDE-14.5](testing.md#GUIDE-145-property-based-testing) | Property-Based Testing | Hypothesis, fast-check, round-trip, generators |
| [GUIDE-14.6](testing.md#GUIDE-146-mutation-testing) | Mutation Testing | mutmut, Stryker, Muter, Pitest, surviving mutants |
| [GUIDE-14.7](testing.md#GUIDE-147-test-doubles) | Test Doubles | mock, stub, fake, spy, dummy, NSubstitute |
| [GUIDE-14.8](testing.md#GUIDE-148-security-testing) | Security Testing | Semgrep, Bandit, CodeQL, OWASP ZAP, pip-audit |
| [GUIDE-14.9](testing.md#GUIDE-149-flaky-test-prevention) | Flaky Test Prevention | determinism, shared state, sleep, timing |
| [GUIDE-14.10](testing.md#GUIDE-1410-test-data) | Test Data | builder pattern, factory, generators, inline literals |
| [GUIDE-14.11](testing.md#GUIDE-1411-the-testing-workflow) | The Testing Workflow | closed loop, mutation, security scan, E2E |
