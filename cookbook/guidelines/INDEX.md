# Guidelines Index

Complete index of all rules, principles, and conventions across all guideline files.
Use `guide.X.Y` notation to cross-reference any rule. Search this file to find where a topic is covered.

---

## guide.1. General Coding Guidelines — [general.md](general.md)

| guide. | Rule | Keywords |
|---|------|----------|
| [guide.core.general.prefer-native-controls-and-libraries](general.md#guide.11-prefer-native-controls-and-libraries) | Prefer native controls and libraries | native, platform, built-in, framework |
| [guide.core.general.for-novel-components-prefer-proven-open](general.md#guide.12-for-novel-components-prefer-proven-open-source-solutions) | For novel components, prefer proven open-source solutions | open-source, library, custom |
| [guide.core.general.surface-all-design-decisions](general.md#guide.13-surface-all-design-decisions) | Surface all design decisions | decisions, approval, LLM, consistency |
| [guide.core.general.no-blocking-the-main-thread](general.md#guide.14-no-blocking-the-main-thread) | No blocking the main thread | async, await, concurrency, background, UI thread |
| [guide.core.general.always-show-progress](general.md#guide.15-always-show-progress) | Always show progress | spinner, skeleton, shimmer, progress bar, loading |
| [guide.core.general.comprehensive-unit-testing](general.md#guide.16-comprehensive-unit-testing) | Comprehensive unit testing | tests, unit tests, edge cases, test file |
| [guide.core.general.small-atomic-commits](general.md#guide.17-small-atomic-commits) | Small, atomic commits | commits, git, one change |
| [guide.core.general.post-generation-verification](general.md#guide.18-post-generation-verification) | Post-generation verification | build, test, lint, accessibility audit, code review |
| [guide.core.general.instrumented-logging](general.md#guide.19-instrumented-logging) | Instrumented logging | logging, os.log, Timber, ILogger, structured |
| [guide.core.general.deep-linking](general.md#guide.110-deep-linking) | Deep linking | deep link, URL, Universal Links, App Links, protocol activation |
| [guide.core.general.scriptable-and-automatable](general.md#guide.111-scriptable-and-automatable) | Scriptable and automatable | AppIntents, AppActions, Shortcuts, automation |
| [guide.core.general.accessibility-from-day-one](general.md#guide.112-accessibility-from-day-one) | Accessibility from day one | accessibility, VoiceOver, TalkBack, Narrator, WCAG, contrast, focus |
| [guide.core.general.localizability](general.md#guide.113-localizability) | Localizability | localization, i18n, strings, .xcstrings, strings.xml, .resw |
| [guide.core.general.rtl-layout-support](general.md#guide.114-rtl-layout-support) | RTL layout support | RTL, right-to-left, leading, trailing, FlowDirection |
| [guide.core.general.respect-accessibility-display-options](general.md#guide.115-respect-accessibility-display-options) | Respect accessibility display options | reduced motion, high contrast, bold text, grayscale |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.116-privacy-and-security-by-default) | Privacy and security by default | privacy, security, PII, TLS, consent |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.1161-data-minimization) | Data minimization | data minimization, on-device |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.1162-consent) | Consent | consent, opt-in, deny |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.1163-secure-storage) | Secure storage | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.1164-no-pii-logging) | No PII logging | PII, logging, personally identifiable |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.1165-tls-only) | TLS only | TLS, HTTPS, encryption |
| [guide.core.general.privacy-and-security-by-default](general.md#guide.1166-input-sanitization) | Input sanitization | sanitization, XSS, injection |
| [guide.core.general.feature-flags](general.md#guide.117-feature-flags) | Feature flags | feature flags, FeatureFlagProvider, gating |
| [guide.core.general.analytics](general.md#guide.118-analytics) | Analytics | analytics, AnalyticsProvider, tracking |
| [guide.core.general.ab-testing](general.md#guide.119-ab-testing) | A/B testing | A/B testing, ExperimentProvider, variants |
| [guide.core.general.debug-mode](general.md#guide.120-debug-mode) | Debug mode | debug panel, flag overrides, environment info |
| [guide.core.general.linting-from-day-one](general.md#guide.121-linting-from-day-one) | Linting from day one | linting, SwiftLint, ktlint, ESLint, Roslyn, dotnet format |

## guide.2. Engineering Principles — [engineering-principles.md](engineering-principles.md)

| guide. | Principle | Keywords |
|---|-----------|----------|
| [guide.core.principles.simplicity](engineering-principles.md#guide.21-simplicity) | Simplicity | simplicity, complexity, concerns |
| [guide.core.principles.make-it-work-make-it-right-make-it-fast](engineering-principles.md#guide.22-make-it-work-make-it-right-make-it-fast) | Make It Work, Make It Right, Make It Fast | correctness, refactor, optimize, phases |
| [guide.core.principles.composition-over-inheritance](engineering-principles.md#guide.23-composition-over-inheritance) | Composition over inheritance | composition, inheritance, protocols, interfaces |
| [guide.core.principles.dependency-injection](engineering-principles.md#guide.24-dependency-injection) | Dependency injection | DI, injection, constructor, service locator |
| [guide.core.principles.immutability-by-default](engineering-principles.md#guide.25-immutability-by-default) | Immutability by default | immutability, let, val, const, mutable |
| [guide.core.principles.fail-fast](engineering-principles.md#guide.26-fail-fast) | Fail fast | fail fast, assertions, preconditions, typed errors |
| [guide.core.principles.idempotency](engineering-principles.md#guide.27-idempotency) | Idempotency | idempotent, debounce, retry, duplicate |
| [guide.core.principles.design-for-deletion](engineering-principles.md#guide.28-design-for-deletion) | Design for deletion | deletion, disposable, maintenance, liability |
| [guide.core.principles.yagni](engineering-principles.md#guide.29-yagni) | YAGNI | YAGNI, speculative, premature, requirements |
| [guide.core.principles.explicit-over-implicit](engineering-principles.md#guide.210-explicit-over-implicit) | Explicit over implicit | explicit, implicit, hidden, magic |
| [guide.core.principles.small-reversible-decisions](engineering-principles.md#guide.211-small-reversible-decisions) | Small, reversible decisions | reversible, incremental, binding |
| [guide.core.principles.tight-feedback-loops](engineering-principles.md#guide.212-tight-feedback-loops) | Tight feedback loops | feedback, tests, deploy, iteration |
| [guide.core.principles.separation-of-concerns](engineering-principles.md#guide.213-separation-of-concerns) | Separation of concerns | separation, single responsibility, module |
| [guide.core.principles.principle-of-least-astonishment](engineering-principles.md#guide.214-principle-of-least-astonishment) | Principle of least astonishment | least astonishment, expectations, surprise |
| [guide.core.principles.manage-complexity-through-boundaries](engineering-principles.md#guide.215-manage-complexity-through-boundaries) | Manage complexity through boundaries | boundaries, ports, adapters, hexagonal |
| [guide.core.principles.meta-principle-optimize-for-change](engineering-principles.md#guide.216-meta-principle-optimize-for-change) | Meta-Principle: Optimize for Change | change, future, cost |

## guide.3. Swift / SwiftUI / AppKit — [swift.md](swift.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.3.1](swift.md#guide.31-references) | References | Swift API Design Guidelines, SwiftUI Performance |
| [guide.3.2](swift.md#guide.32-logging) | Logging | os.log, Logger, subsystem, category |
| [guide.3.3](swift.md#guide.33-secure-storage) | Secure Storage | Keychain, UserDefaults, secrets |
| [guide.3.4](swift.md#guide.34-localization) | Localization | String(localized:), NSLocalizedString, .xcstrings |
| [guide.3.5](swift.md#guide.35-linting-and-formatting) | Linting and Formatting | SwiftLint, swift-format |
| [guide.3.6](swift.md#guide.36-shortcuts-and-automation) | Shortcuts and Automation | AppIntents, Shortcuts, Siri, AppleScript |
| [guide.3.7](swift.md#guide.37-previews) | Previews | #Preview, SwiftUI, render |
| [guide.3.8](swift.md#guide.38-dynamic-type) | Dynamic Type | Dynamic Type, font sizes, text scaling |
| [guide.3.9](swift.md#guide.39-accessibility-environment-values) | Accessibility Environment Values | reduceMotion, reduceTransparency, colorSchemeContrast |
| [guide.3.10](swift.md#guide.310-concurrency) | Concurrency | async/await, Task, actors, @MainActor |
| [guide.3.11](swift.md#guide.311-privacy) | Privacy | App Tracking Transparency, Privacy Report, NSUsageDescription |
| [guide.3.12](swift.md#guide.312-feature-flags) | Feature Flags | protocol, UserDefaults |
| [guide.3.13](swift.md#guide.313-analytics) | Analytics | protocol, os.log |

## guide.4. Kotlin / Compose / Ktor — [kotlin.md](kotlin.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.4.1](kotlin.md#guide.41-references) | References | Kotlin Conventions, Material Design 3, Architecture |
| [guide.4.2](kotlin.md#guide.42-logging) | Logging | Timber, android.util.Log |
| [guide.4.3](kotlin.md#guide.43-concurrency) | Concurrency | Coroutines, Dispatchers.IO, viewModelScope |
| [guide.4.4](kotlin.md#guide.44-secure-storage) | Secure Storage | EncryptedSharedPreferences, Android Keystore |
| [guide.4.5](kotlin.md#guide.45-localization) | Localization | strings.xml, stringResource, R.string |
| [guide.4.6](kotlin.md#guide.46-linting-and-formatting) | Linting and Formatting | ktlint, .editorconfig |
| [guide.4.7](kotlin.md#guide.47-shortcuts-and-automation) | Shortcuts and Automation | AppActions, Google Assistant, Intent |
| [guide.4.8](kotlin.md#guide.48-previews) | Previews | @Preview, Compose |
| [guide.4.9](kotlin.md#guide.49-font-scaling) | Font Scaling | fontScale, Configuration, 2x |
| [guide.4.10](kotlin.md#guide.410-accessibility-settings) | Accessibility Settings | animator_duration_scale, TalkBack, Switch Access |
| [guide.4.11](kotlin.md#guide.411-privacy) | Privacy | scoped storage, permissions, rationale |
| [guide.4.12](kotlin.md#guide.412-feature-flags) | Feature Flags | interface, SharedPreferences |
| [guide.4.13](kotlin.md#guide.413-analytics) | Analytics | interface, Timber |
| [guide.4.14](kotlin.md#guide.414-rtl-support) | RTL Support | supportsRtl, start/end |
| [guide.4.15](kotlin.md#guide.415-immutability) | Immutability | val, data class, StateFlow |

## guide.5. TypeScript / React / Web — [typescript.md](typescript.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.5.1](typescript.md#guide.51-linting-and-formatting) | Linting and Formatting | ESLint, Prettier, Stylelint |
| [guide.5.2](typescript.md#guide.52-accessibility-references) | Accessibility References | WCAG 2.1, WAI-ARIA |
| [guide.5.3](typescript.md#guide.53-accessibility-css-media-queries) | Accessibility CSS Media Queries | prefers-reduced-motion, prefers-contrast, forced-colors |
| [guide.5.4](typescript.md#guide.54-security) | Security | CSP, HttpOnly, cookies, sanitization, Do Not Track |
| [guide.5.5](typescript.md#guide.55-localization) | Localization | react-intl, i18next, FormatJS, message catalogs |
| [guide.5.6](typescript.md#guide.56-rtl-layout-support) | RTL Layout Support | CSS logical properties, margin-inline-start, dir |
| [guide.5.7](typescript.md#guide.57-testing) | Testing | Playwright, E2E, visual regression, Storybook |
| [guide.5.8](typescript.md#guide.58-concurrency) | Concurrency | Promise, async/await, Web Workers |
| [guide.5.9](typescript.md#guide.59-deep-linking) | Deep Linking | URL routing, shareable URL |
| [guide.5.10](typescript.md#guide.510-debug-mode) | Debug Mode | /debug, Ctrl+Shift+D, NODE_ENV |
| [guide.5.11](typescript.md#guide.511-feature-flags) | Feature Flags | interface, localStorage |
| [guide.5.12](typescript.md#guide.512-analytics) | Analytics | interface, console |
| [guide.5.13](typescript.md#guide.513-immutability) | Immutability | const, useState |

## guide.6. Python — [python.md](python.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.6.1](python.md#guide.61-no-external-dependencies-in-core-libraries) | No external dependencies in core libraries | stdlib, roadmap_lib, portable |
| [guide.6.2](python.md#guide.62-testing) | Testing | pytest, regression test, demo port 9888 |
| [guide.6.3](python.md#guide.63-type-hints) | Type hints | type hints, annotations, Python 3.9 |
| [guide.6.4](python.md#guide.64-file-paths) | File paths | pathlib, Path, os.path |
| [guide.6.5](python.md#guide.65-yaml-frontmatter) | YAML frontmatter | frontmatter, parse, roadmap_lib |
| [guide.6.6](python.md#guide.66-web-services) | Web services | Flask, REST API |
| [guide.6.7](python.md#guide.67-database) | Database | SQLite, WAL, sqlite3 |
| [guide.6.8](python.md#guide.68-use-roadmap_lib) | Use roadmap_lib | roadmap_lib, existing functions |
| [guide.6.9](python.md#guide.69-deterministic-ids) | Deterministic IDs | UUID, frontmatter, deterministic |
| [guide.6.10](python.md#guide.610-dashboard-service-is-display-only) | Dashboard service is display-only | dashboard, generic, display-only |
| [guide.6.11](python.md#guide.611-shell-scripts) | Shell scripts | main(), functions, composable |
| [guide.6.12](python.md#guide.612-logging) | Logging | logging, getLogger, __name__ |

## guide.7. C# / .NET — [csharp.md](csharp.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.7.1](csharp.md#guide.71-references) | References | C# Conventions, .NET Design Guidelines, Runtime Coding Style |
| [guide.7.2](csharp.md#guide.72-naming) | Naming | PascalCase, camelCase, _camelCase, I prefix, Async suffix |
| [guide.7.3](csharp.md#guide.73-nullable-reference-types) | Nullable Reference Types | Nullable, enable, null-forgiving, required, guard clause |
| [guide.7.4](csharp.md#guide.74-immutability) | Immutability | readonly, record, ImmutableList, init, with |
| [guide.7.5](csharp.md#guide.75-concurrency) | Concurrency | async/await, ConfigureAwait, CancellationToken, ValueTask |
| [guide.7.6](csharp.md#guide.76-dependency-injection) | Dependency Injection | Microsoft.Extensions.DependencyInjection, IOptions, Transient, Singleton |
| [guide.7.7](csharp.md#guide.77-logging) | Logging | ILogger, structured, LoggerMessage, source generator |
| [guide.7.8](csharp.md#guide.78-linting-and-formatting) | Linting and Formatting | .editorconfig, Roslyn, EnforceCodeStyleInBuild, dotnet format |
| [guide.7.9](csharp.md#guide.79-testing) | Testing | xUnit, FluentAssertions, NSubstitute, Fact, Theory |
| [guide.7.10](csharp.md#guide.710-secure-storage) | Secure Storage | DPAPI, ProtectedData, User Secrets |
| [guide.7.11](csharp.md#guide.711-privacy) | Privacy | capabilities, manifest, broadFileSystemAccess, consent |
| [guide.7.12](csharp.md#guide.712-feature-flags) | Feature Flags | IFeatureManager, Microsoft.FeatureManagement |
| [guide.7.13](csharp.md#guide.713-analytics) | Analytics | ILogger, interface |

## guide.8. Windows / WinUI 3 — [windows.md](windows.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.8.1](windows.md#guide.81-references) | References | WinUI 3, Windows App SDK, Fluent 2, WinUI Gallery |
| [guide.8.2](windows.md#guide.82-architecture) | Architecture | MVVM, CommunityToolkit.Mvvm, NavigationView, Frame |
| [guide.8.3](windows.md#guide.83-fluent-design) | Fluent Design | built-in controls, Segoe UI Variable, Segoe Fluent Icons |
| [guide.8.4](windows.md#guide.84-theming) | Theming | Light, Dark, High Contrast, ThemeResource, semantic colors |
| [guide.8.5](windows.md#guide.85-accessibility) | Accessibility | UI Automation, AutomationProperties, Accessibility Insights, Narrator |
| [guide.8.6](windows.md#guide.86-localization) | Localization | MRT Core, .resw, x:Uid, ResourceLoader |
| [guide.8.7](windows.md#guide.87-deep-linking--protocol-activation) | Deep Linking / Protocol Activation | uap:Protocol, AppInstance, GetActivatedEventArgs |
| [guide.8.8](windows.md#guide.88-app-notifications) | App Notifications | AppNotificationManager, AppNotificationBuilder, toast |
| [guide.8.9](windows.md#guide.89-high-dpi--display-scaling) | High DPI / Display Scaling | effective pixels, RasterizationScale, multi-scale assets |
| [guide.8.10](windows.md#guide.810-msix-packaging) | MSIX Packaging | MSIX, single-project, capabilities, signing |
| [guide.8.11](windows.md#guide.811-concurrency) | Concurrency | DispatcherQueue, TryEnqueue, UI thread |
| [guide.8.12](windows.md#guide.812-rtl-layout-support) | RTL Layout Support | FlowDirection, RightToLeft |
| [guide.8.13](windows.md#guide.813-logging) | Logging | ILogger, ETW, EventSource, Live Visual Tree |
| [guide.8.14](windows.md#guide.814-debug-mode) | Debug Mode | #if DEBUG, settings page |
| [guide.8.15](windows.md#guide.815-design-time-data) | Design-Time Data | d:DataContext, d:DesignInstance, XAML Hot Reload |

## guide.9. UI Design — [ui.md](ui.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.9.1](ui.md#guide.91-platform-design-languages) | Platform Design Languages | HIG, Material Design, Fluent, WCAG |
| [guide.9.2](ui.md#guide.92-visual-hierarchy) | Visual Hierarchy | focal point, primary action, size, weight, proximity |
| [guide.9.3](ui.md#guide.93-spacing) | Spacing | 4px, 8px grid, spacing scale, padding, margin |
| [guide.9.4](ui.md#guide.94-typography) | Typography | system font, body text, line height, paragraph width |
| [guide.9.5](ui.md#guide.95-color) | Color | semantic tokens, palette, contrast, dark mode |
| [guide.9.6](ui.md#guide.96-layout) | Layout | single-column, content-first, responsive, scroll direction |
| [guide.9.7](ui.md#guide.97-state-design) | State Design | loading, empty state, error state, skeleton, CTA |
| [guide.9.8](ui.md#guide.98-form-design) | Form Design | forms, validation, error messages, labels |
| [guide.9.8.1](ui.md#guide.981-layout) | Layout | single-column, top-aligned labels |
| [guide.9.8.2](ui.md#guide.982-validation) | Validation | blur, keystroke, submit |
| [guide.9.8.3](ui.md#guide.983-error-messages) | Error messages | inline, below field, icon, specific |
| [guide.9.8.4](ui.md#guide.984-other-principles) | Other principles | placeholder, pre-fill, optional fields |
| [guide.9.9](ui.md#guide.99-feedback-patterns) | Feedback Patterns | toast, snackbar, dialog, confirmation, destructive |
| [guide.9.10](ui.md#guide.910-touch--click-targets) | Touch & Click Targets | 44pt, 48dp, 40epx, 24px, hit area, spacing |
| [guide.9.11](ui.md#guide.911-animation--motion) | Animation & Motion | duration, easing, reduced-motion, spring |
| [guide.9.12](ui.md#guide.912-iconography) | Iconography | SF Symbols, Material Symbols, Segoe Fluent Icons, labels |
| [guide.9.13](ui.md#guide.913-data-display) | Data Display | list, table, cards, grid, sort, filter, search |

## guide.10. Networking — [networking.md](networking.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.10.1](networking.md#guide.101-references) | References | Microsoft REST, Google API Design, Zalando, RFC 9457, RFC 9111 |
| [guide.10.2](networking.md#guide.102-api-design) | API Design | REST, URL, HTTP methods, status codes, versioning |
| [guide.10.3](networking.md#guide.103-error-responses) | Error Responses | RFC 9457, Problem Details, application/problem+json |
| [guide.10.4](networking.md#guide.104-pagination) | Pagination | cursor, offset, next_cursor, has_more, page_token |
| [guide.10.5](networking.md#guide.105-retry-and-resilience) | Retry and Resilience | exponential backoff, jitter, circuit breaker, retryable |
| [guide.10.6](networking.md#guide.106-timeouts) | Timeouts | connection timeout, read timeout, 10s, 30s |
| [guide.10.7](networking.md#guide.107-caching) | Caching | Cache-Control, ETag, If-None-Match, stale-while-revalidate |
| [guide.10.8](networking.md#guide.108-offline-and-connectivity) | Offline and Connectivity | offline-first, optimistic updates, sync, conflict resolution |
| [guide.10.9](networking.md#guide.109-rate-limiting) | Rate Limiting | 429, Retry-After, RateLimit-Remaining, throttling |
| [guide.10.10](networking.md#guide.1010-real-time-communication) | Real-Time Communication | SSE, WebSocket, polling, EventSource |

## guide.11. Security — [security.md](security.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.domain.security.references](security.md#guide.111-references) | References | OWASP, MASVS, MASTG, Mozilla TLS |
| [guide.domain.security.authentication](security.md#guide.112-authentication) | Authentication | OAuth 2.0, OIDC, PKCE, system browser, BFF |
| [guide.domain.security.token-handling](security.md#guide.113-token-handling) | Token Handling | access token, refresh token, JWT, storage |
| [guide.domain.security.token-handling](security.md#guide.1131-access-tokens) | Access tokens | short-lived, 5-15 min, claims |
| [guide.domain.security.token-handling](security.md#guide.1132-refresh-tokens) | Refresh tokens | rotation, revocation, token family |
| [guide.domain.security.token-handling](security.md#guide.1133-token-refresh-strategy) | Token refresh strategy | proactive, 75% TTL, queue |
| [guide.domain.security.token-handling](security.md#guide.1134-secure-storage-per-platform) | Secure storage per platform | Keychain, EncryptedSharedPreferences, DPAPI, HttpOnly |
| [guide.domain.security.token-handling](security.md#guide.1135-never-do-these) | Never do these | localStorage, URL params, alg:none |
| [guide.domain.security.authorization](security.md#guide.114-authorization) | Authorization | RBAC, scopes, least privilege, BOLA, deny by default |
| [guide.domain.security.transport-security](security.md#guide.115-transport-security) | Transport Security | TLS 1.2, TLS 1.3, HSTS, certificate pinning, AEAD |
| [guide.domain.security.cors](security.md#guide.116-cors) | CORS | origin allowlist, preflight, credentials, misconfigurations |
| [guide.domain.security.content-security-policy](security.md#guide.117-content-security-policy) | Content Security Policy | CSP, nonce, strict-dynamic, frame-ancestors, report-only |
| [guide.domain.security.input-validation](security.md#guide.118-input-validation) | Input Validation | allowlist, parameterized queries, output encoding, file uploads |
| [guide.domain.security.sensitive-data](security.md#guide.119-sensitive-data) | Sensitive Data | data minimization, PII, field-level encryption, KMS |
| [guide.domain.security.dependency-security](security.md#guide.1110-dependency-security) | Dependency Security | lockfiles, npm audit, pin versions, SRI, supply chain |
| [guide.domain.security.security-headers-checklist](security.md#guide.1111-security-headers-checklist) | Security Headers Checklist | HSTS, CSP, X-Content-Type-Options, Referrer-Policy |

## guide.12. Spec Writing Format — [specs.md](specs.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.domain.specs.frontmatter](specs.md#guide.121-frontmatter) | Frontmatter | version, status, created, platforms, dependencies |
| [guide.domain.specs.rfc-2119-keywords](specs.md#guide.122-rfc-2119-keywords) | RFC 2119 Keywords | MUST, SHOULD, MAY, requirements |
| [guide.domain.specs.requirement-numbering](specs.md#guide.123-requirement-numbering) | Requirement Numbering | REQ-NNN, sequential, test vector |
| [guide.domain.specs.template-variables](specs.md#guide.124-template-variables) | Template Variables | {{app_name}}, {{bundle_id}}, placeholders |
| [guide.domain.specs.standard-sections](specs.md#guide.125-standard-sections) | Standard Sections | Overview, Requirements, API Contract, Accessibility, Logging |
| [guide.domain.specs.test-vector-formats](specs.md#guide.126-test-vector-formats) | Test Vector Formats | behavioral table, data JSON, input/expected |
| [guide.domain.specs.logging-section](specs.md#guide.127-logging-section) | Logging Section | log messages, subsystem, category, grep |
| [guide.domain.specs.privacy-section](specs.md#guide.128-privacy-section) | Privacy Section | data collected, storage, PII handling |
| [guide.domain.specs.feature-flags-section](specs.md#guide.129-feature-flags-section) | Feature Flags Section | flag keys, gating |
| [guide.domain.specs.analytics-section](specs.md#guide.1210-analytics-section) | Analytics Section | event names, property schemas |

## guide.13. Best Practices References — [best-practices-references.md](best-practices-references.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.13.1](best-practices-references.md#guide.131-apple) | Apple | HIG, Swift API Design, Accessibility, App Store |
| [guide.13.2](best-practices-references.md#guide.132-android) | Android | Material Design 3, Architecture, Kotlin, Google Play |
| [guide.13.3](best-practices-references.md#guide.133-web) | Web | WCAG, WAI-ARIA, OWASP, MDN |
| [guide.13.4](best-practices-references.md#guide.134-windows--net) | Windows / .NET | C# Conventions, .NET Guidelines, WinUI 3, Fluent, MSIX |
| [guide.13.5](best-practices-references.md#guide.135-ui-design) | UI Design | NNGroup, Visual Hierarchy, Form Design, Empty States |
| [guide.13.6](best-practices-references.md#guide.136-networking) | Networking | Microsoft REST, Google API, Zalando, RFC 9457, RFC 9111 |
| [guide.13.7](best-practices-references.md#guide.137-security) | Security | OWASP Top 10, Mobile Top 10, Cheat Sheets, Mozilla TLS, SLSA |
| [guide.13.9](best-practices-references.md#guide.139-testing) | Testing | Google SWE Book, Martin Fowler, Kent Beck, Hypothesis, mutmut, Stryker |
| [guide.13.10](best-practices-references.md#guide.1310-cross-platform) | Cross-Platform | Nielsen Norman, MASVS, MASTG |

## guide.14. Testing — [testing.md](testing.md)

| guide. | Section | Keywords |
|---|---------|----------|
| [guide.domain.testing.references](testing.md#guide.141-references) | References | Google SWE Book, Martin Fowler, Kent Beck, ISTQB |
| [guide.domain.testing.test-pyramid](testing.md#guide.142-test-pyramid) | Test Pyramid | 80/15/5, unit, integration, E2E |
| [guide.domain.testing.properties-of-good-tests](testing.md#guide.143-properties-of-good-tests) | Properties of Good Tests | isolated, deterministic, fast, readable, behavioral |
| [guide.domain.testing.unit-test-patterns](testing.md#guide.144-unit-test-patterns) | Unit Test Patterns | AAA, arrange-act-assert, naming, one concept |
| [guide.domain.testing.property-based-testing](testing.md#guide.145-property-based-testing) | Property-Based Testing | Hypothesis, fast-check, round-trip, generators |
| [guide.domain.testing.mutation-testing](testing.md#guide.146-mutation-testing) | Mutation Testing | mutmut, Stryker, Muter, Pitest, surviving mutants |
| [guide.domain.testing.test-doubles](testing.md#guide.147-test-doubles) | Test Doubles | mock, stub, fake, spy, dummy, NSubstitute |
| [guide.domain.testing.security-testing](testing.md#guide.148-security-testing) | Security Testing | Semgrep, Bandit, CodeQL, OWASP ZAP, pip-audit |
| [guide.domain.testing.flaky-test-prevention](testing.md#guide.149-flaky-test-prevention) | Flaky Test Prevention | determinism, shared state, sleep, timing |
| [guide.domain.testing.test-data](testing.md#guide.1410-test-data) | Test Data | builder pattern, factory, generators, inline literals |
| [guide.domain.testing.the-testing-workflow](testing.md#guide.1411-the-testing-workflow) | The Testing Workflow | closed loop, mutation, security scan, E2E |
