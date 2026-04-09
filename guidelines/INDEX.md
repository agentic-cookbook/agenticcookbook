---
id: eb0764d5-aeac-40cc-9aa4-d84e4eaa652d
title: "Guidelines Index"
domain: agentic-cookbook://guidelines/INDEX
type: reference
version: 2.1.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-04-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Complete index of all guidelines, organized by use case."
platforms: []
tags: []
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Guidelines Index

Guidelines are organized by **use case** — the phase of work where they apply. Guidelines that apply to multiple use cases are duplicated into each so the agent gets everything it needs by reading one directory.

| Use Case | Guidelines | When to use |
|----------|-----------|-------------|
| [Planning](#planning-41-guidelines) | 41 | Architecture, data modeling, choosing patterns |
| [Implementing](#implementing-109-guidelines) | 109 | Writing new code |
| [Testing](#testing-16-guidelines) | 16 | Writing and structuring tests |
| [Reviewing](#reviewing-41-guidelines) | 41 | Checking code quality, security, accessibility |
| [Shipping](#shipping-9-guidelines) | 9 | Pre-commit, pre-PR, packaging |
| [Cookbook](#cookbook-16-guidelines) | 16 | Writing cookbook content (recipes, skills, agents) |

140 unique guidelines, 232 total (with duplicates across use cases).

---

### Planning (41 guidelines)

**code-quality**
- [Scope discipline](planning/code-quality/scope-discipline.md)

**codebase-decomposition**
- [Algorithmic Complexity](planning/codebase-decomposition/algorithmic-complexity.md)
- [App Interactions](planning/codebase-decomposition/app-interactions.md)
- [Cross-Cutting Detection](planning/codebase-decomposition/cross-cutting-detection.md)
- [Dependency Clusters](planning/codebase-decomposition/dependency-clusters.md)
- [Framework Conventions](planning/codebase-decomposition/framework-conventions.md)
- [Interface Cohesion](planning/codebase-decomposition/interface-cohesion.md)
- [Lifecycle Patterns](planning/codebase-decomposition/lifecycle-patterns.md)
- [Module Boundaries](planning/codebase-decomposition/module-boundaries.md)
- [Purpose Classification](planning/codebase-decomposition/purpose-classification.md)
- [Runtime Conditions](planning/codebase-decomposition/runtime-conditions.md)
- [System Dependencies](planning/codebase-decomposition/system-dependencies.md)
- [System Interactions](planning/codebase-decomposition/system-interactions.md)

**database-design**
- [Access Pattern Analysis](planning/database-design/access-pattern-analysis.md)
- [Clock Systems for Sync](planning/database-design/clock-systems.md)
- [Conflict Resolution](planning/database-design/conflict-resolution.md)
- [Indexing](planning/database-design/indexing.md)
- [JSON columns and generated columns](planning/database-design/json-columns.md)
- [Normalization and denormalization](planning/database-design/normalization-and-denormalization.md)
- [Offline-First Architecture](planning/database-design/offline-first-architecture.md)
- [Primary key strategies](planning/database-design/primary-keys.md)
- [Relationship patterns](planning/database-design/relationships.md)
- [SQLite Sync Tooling](planning/database-design/sync-tooling.md)
- [Sync Engine Design](planning/database-design/sync-engine-design.md)
- [Sync Protocol](planning/database-design/sync-protocol.md)
- [Sync Schema Design](planning/database-design/sync-schema-design.md)
- [Transactions and Concurrency](planning/database-design/transactions-and-concurrency.md)

**feature-management**
- [Feature flags](planning/feature-management/feature-flags.md)

**language/python**
- [Dashboard service is display-only](planning/language/python/dashboard-service-is-display-only.md)
- [Database](planning/language/python/database.md)

**networking**
- [API Design](planning/networking/api-design.md)
- [Caching](planning/networking/caching.md)
- [Offline and Connectivity](planning/networking/offline-and-connectivity.md)
- [Pagination](planning/networking/pagination.md)
- [Real-Time Communication](planning/networking/real-time-communication.md)

**platform/windows**
- [Architecture](planning/platform/windows/architecture.md)

**security**
- [Authentication](planning/security/authentication.md)
- [Privacy and security by default](planning/security/privacy.md)

**testing**
- [Test Pyramid](planning/testing/test-pyramid.md)

**ui**
- [Data Display](planning/ui/data-display.md)
- [Platform Design Languages](planning/ui/platform-design-languages.md)

---

### Implementing (109 guidelines)

**accessibility**
- [Accessibility from day one](implementing/accessibility/accessibility.md)

**code-quality**
- [Linting from day one](implementing/code-quality/linting.md)
- [Scope discipline](implementing/code-quality/scope-discipline.md)
- [Small, atomic commits](implementing/code-quality/atomic-commits.md)

**concurrency**
- [Immutability](implementing/concurrency/immutability.md)
- [No blocking the main thread](implementing/concurrency/concurrency.md)

**database-design**
- [Access Pattern Analysis](implementing/database-design/access-pattern-analysis.md)
- [Clock Systems for Sync](implementing/database-design/clock-systems.md)
- [Conflict Resolution](implementing/database-design/conflict-resolution.md)
- [Constraints and validation](implementing/database-design/constraints-and-validation.md)
- [Data types and type affinity](implementing/database-design/data-types.md)
- [Database backup and recovery](implementing/database-design/backup-and-recovery.md)
- [Database naming conventions](implementing/database-design/naming-conventions.md)
- [Foreign keys and referential integrity](implementing/database-design/foreign-keys.md)
- [Indexing](implementing/database-design/indexing.md)
- [JSON columns and generated columns](implementing/database-design/json-columns.md)
- [Normalization and denormalization](implementing/database-design/normalization-and-denormalization.md)
- [Offline-First Architecture](implementing/database-design/offline-first-architecture.md)
- [Primary key strategies](implementing/database-design/primary-keys.md)
- [Query Optimization](implementing/database-design/query-optimization.md)
- [Relationship patterns](implementing/database-design/relationships.md)
- [Schema evolution and migrations](implementing/database-design/schema-evolution.md)
- [SQLite Sync Tooling](implementing/database-design/sync-tooling.md)
- [Sync Engine Design](implementing/database-design/sync-engine-design.md)
- [Sync Protocol](implementing/database-design/sync-protocol.md)
- [Sync Schema Design](implementing/database-design/sync-schema-design.md)
- [Transactions and Concurrency](implementing/database-design/transactions-and-concurrency.md)

**feature-management**
- [A/B testing](implementing/feature-management/ab-testing.md)
- [Debug mode](implementing/feature-management/debug-mode.md)
- [Feature flags](implementing/feature-management/feature-flags.md)

**internationalization**
- [Localizability](implementing/internationalization/localization.md)
- [RTL layout support](implementing/internationalization/rtl-support.md)

**language/csharp**
- [Dependency Injection](implementing/language/csharp/dependency-injection.md)
- [Naming](implementing/language/csharp/naming.md)
- [Nullable Reference Types](implementing/language/csharp/nullable-reference-types.md)

**language/kotlin**
- [Font Scaling](implementing/language/kotlin/font-scaling.md)

**language/python**
- [Dashboard service is display-only](implementing/language/python/dashboard-service-is-display-only.md)
- [Database](implementing/language/python/database.md)
- [Deterministic IDs](implementing/language/python/deterministic-ids.md)
- [File paths](implementing/language/python/file-paths.md)
- [No external dependencies in core libraries](implementing/language/python/no-external-dependencies-in-core-librari.md)
- [Shell scripts](implementing/language/python/shell-scripts.md)
- [Type hints](implementing/language/python/type-hints.md)
- [Use roadmap_lib](implementing/language/python/use-roadmaplib.md)
- [Web services](implementing/language/python/web-services.md)
- [YAML frontmatter](implementing/language/python/yaml-frontmatter.md)

**language/swift**
- [Dynamic Type](implementing/language/swift/dynamic-type.md)
- [Use AppKit and UIKit, not SwiftUI](implementing/language/swift/prefer-explicit-apple-apis.md)

**logging**
- [Analytics](implementing/logging/analytics.md)
- [Instrumented logging](implementing/logging/logging.md)

**networking**
- [API Design](implementing/networking/api-design.md)
- [Caching](implementing/networking/caching.md)
- [Error Responses](implementing/networking/error-responses.md)
- [Offline and Connectivity](implementing/networking/offline-and-connectivity.md)
- [Pagination](implementing/networking/pagination.md)
- [Rate Limiting](implementing/networking/rate-limiting.md)
- [Real-Time Communication](implementing/networking/real-time-communication.md)
- [Retry and Resilience](implementing/networking/retry-and-resilience.md)
- [Timeouts](implementing/networking/timeouts.md)

**platform**
- [Background tasks](implementing/platform/background-tasks.md)
- [Deep linking](implementing/platform/deep-linking.md)
- [Handoff and continuity](implementing/platform/handoff-and-continuity.md)
- [Notifications](implementing/platform/notifications.md)
- [Scriptable and automatable](implementing/platform/shortcuts-and-automation.md)
- [Search integration](implementing/platform/search-integration.md)
- [Share and inter-app data flow](implementing/platform/share-and-inter-app-data.md)
- [Widgets and glanceable surfaces](implementing/platform/widgets-and-glanceable-surfaces.md)

**platform/windows**
- [Architecture](implementing/platform/windows/architecture.md)
- [Design-Time Data](implementing/platform/windows/design-time-data.md)
- [Fluent Design](implementing/platform/windows/fluent-design.md)
- [High DPI / Display Scaling](implementing/platform/windows/high-dpi-display-scaling.md)
- [Theming](implementing/platform/windows/theming.md)

**security**
- [Authentication](implementing/security/authentication.md)
- [Authorization](implementing/security/authorization.md)
- [Content Security Policy](implementing/security/content-security-policy.md)
- [CORS](implementing/security/cors.md)
- [Dependency Security](implementing/security/dependency-security.md)
- [Input Validation](implementing/security/input-validation.md)
- [Privacy and security by default](implementing/security/privacy.md)
- [Secure Storage](implementing/security/secure-storage.md)
- [Security Headers Checklist](implementing/security/security-headers-checklist.md)
- [Sensitive Data](implementing/security/sensitive-data.md)
- [Token Handling](implementing/security/token-handling.md)
- [Transport Security](implementing/security/transport-security.md)

**skills-and-agents**
- [Agent Structure Reference](implementing/skills-and-agents/agent-structure-reference.md)
- [Authoring Skills and Rules](implementing/skills-and-agents/authoring-skills-and-rules.md)
- [Performance: Speed and Token Efficiency](implementing/skills-and-agents/performance.md)
- [Rule Structure Reference](implementing/skills-and-agents/rule-structure-reference.md)
- [Skill Structure Reference](implementing/skills-and-agents/skill-structure-reference.md)

**testing**
- [Comprehensive unit testing](implementing/testing/testing.md)
- [Property-Based Testing](implementing/testing/property-based-testing.md)
- [Test Data](implementing/testing/test-data.md)
- [Test Doubles](implementing/testing/test-doubles.md)
- [Unit Test Patterns](implementing/testing/unit-test-patterns.md)

**ui**
- [Always show progress](implementing/ui/always-show-progress.md)
- [Animation & Motion](implementing/ui/animation-motion.md)
- [Color](implementing/ui/color.md)
- [Data Display](implementing/ui/data-display.md)
- [Feedback Patterns](implementing/ui/feedback-patterns.md)
- [Form Design](implementing/ui/form-design.md)
- [Iconography](implementing/ui/iconography.md)
- [Layout](implementing/ui/layout.md)
- [Platform Design Languages](implementing/ui/platform-design-languages.md)
- [Previews](implementing/ui/previews.md)
- [Spacing](implementing/ui/spacing.md)
- [State Design](implementing/ui/state-design.md)
- [Touch & Click Targets](implementing/ui/touch-click-targets.md)
- [Typography](implementing/ui/typography.md)
- [Visual Hierarchy](implementing/ui/visual-hierarchy.md)

---

### Testing (16 guidelines)

**code-quality**
- [Linting from day one](testing/code-quality/linting.md)

**database-design**
- [Database testing](testing/database-design/testing.md)

**platform/windows**
- [Design-Time Data](testing/platform/windows/design-time-data.md)

**testing**
- [Comprehensive unit testing](testing/testing/testing.md)
- [Flaky Test Prevention](testing/testing/flaky-test-prevention.md)
- [Mutation Testing](testing/testing/mutation-testing.md)
- [Post-generation verification](testing/testing/post-generation-verification.md)
- [Properties of Good Tests](testing/testing/properties-of-good-tests.md)
- [Property-Based Testing](testing/testing/property-based-testing.md)
- [Security Testing](testing/testing/security-testing.md)
- [Test Data](testing/testing/test-data.md)
- [Test Doubles](testing/testing/test-doubles.md)
- [Test Pyramid](testing/testing/test-pyramid.md)
- [The Testing Workflow](testing/testing/the-testing-workflow.md)
- [Unit Test Patterns](testing/testing/unit-test-patterns.md)

**ui**
- [Previews](testing/ui/previews.md)

---

### Reviewing (41 guidelines)

**accessibility**
- [Accessibility from day one](reviewing/accessibility/accessibility.md)

**code-quality**
- [Bulk operation verification](reviewing/code-quality/bulk-operation-verification.md)
- [Scope discipline](reviewing/code-quality/scope-discipline.md)

**database-design**
- [Query Optimization](reviewing/database-design/query-optimization.md)

**internationalization**
- [Localizability](reviewing/internationalization/localization.md)
- [RTL layout support](reviewing/internationalization/rtl-support.md)

**language/csharp**
- [Dependency Injection](reviewing/language/csharp/dependency-injection.md)
- [Naming](reviewing/language/csharp/naming.md)

**language/python**
- [File paths](reviewing/language/python/file-paths.md)
- [No external dependencies in core libraries](reviewing/language/python/no-external-dependencies-in-core-librari.md)
- [Shell scripts](reviewing/language/python/shell-scripts.md)
- [Type hints](reviewing/language/python/type-hints.md)
- [Use roadmap_lib](reviewing/language/python/use-roadmaplib.md)
- [YAML frontmatter](reviewing/language/python/yaml-frontmatter.md)

**language/swift**
- [Use AppKit and UIKit, not SwiftUI](reviewing/language/swift/prefer-explicit-apple-apis.md)

**logging**
- [Analytics](reviewing/logging/analytics.md)
- [Instrumented logging](reviewing/logging/logging.md)

**networking**
- [Rate Limiting](reviewing/networking/rate-limiting.md)
- [Timeouts](reviewing/networking/timeouts.md)

**platform**
- [Deep linking](reviewing/platform/deep-linking.md)

**security**
- [Authentication](reviewing/security/authentication.md)
- [Authorization](reviewing/security/authorization.md)
- [Content Security Policy](reviewing/security/content-security-policy.md)
- [CORS](reviewing/security/cors.md)
- [Dependency Security](reviewing/security/dependency-security.md)
- [Input Validation](reviewing/security/input-validation.md)
- [Privacy and security by default](reviewing/security/privacy.md)
- [Secure Storage](reviewing/security/secure-storage.md)
- [Security Headers Checklist](reviewing/security/security-headers-checklist.md)
- [Sensitive Data](reviewing/security/sensitive-data.md)
- [Token Handling](reviewing/security/token-handling.md)
- [Transport Security](reviewing/security/transport-security.md)

**skills-and-agents**
- [Agent Lint Checklist](reviewing/skills-and-agents/agent-checklist.md)
- [Performance: Speed and Token Efficiency](reviewing/skills-and-agents/performance.md)
- [Rule Lint Checklist](reviewing/skills-and-agents/rule-checklist.md)
- [Skill Lint Checklist](reviewing/skills-and-agents/skill-checklist.md)

**testing**
- [Flaky Test Prevention](reviewing/testing/flaky-test-prevention.md)
- [Post-generation verification](reviewing/testing/post-generation-verification.md)
- [Security Testing](reviewing/testing/security-testing.md)

**ui**
- [Color](reviewing/ui/color.md)
- [Touch & Click Targets](reviewing/ui/touch-click-targets.md)

---

### Shipping (9 guidelines)

**code-quality**
- [Bulk operation verification](shipping/code-quality/bulk-operation-verification.md)
- [Small, atomic commits](shipping/code-quality/atomic-commits.md)

**database-design**
- [Database backup and recovery](shipping/database-design/backup-and-recovery.md)
- [Schema evolution and migrations](shipping/database-design/schema-evolution.md)

**feature-management**
- [A/B testing](shipping/feature-management/ab-testing.md)
- [Feature flags](shipping/feature-management/feature-flags.md)

**platform/windows**
- [MSIX Packaging](shipping/platform/windows/msix-packaging.md)

**security**
- [Dependency Security](shipping/security/dependency-security.md)
- [Transport Security](shipping/security/transport-security.md)

---

### Cookbook (16 guidelines)

**recipe-quality**
- [Behavioral Requirements](cookbook/recipe-quality/behavioral-requirements.md)
- [Completeness](cookbook/recipe-quality/completeness.md)
- [Cookbook Compliance](cookbook/recipe-quality/cookbook-compliance.md)
- [Cross-Recipe Consistency](cookbook/recipe-quality/cross-recipe-consistency.md)
- [Source Fidelity](cookbook/recipe-quality/source-fidelity.md)
- [Template Conformance](cookbook/recipe-quality/template-conformance.md)

**skills-and-agents**
- [Agent Lint Checklist](cookbook/skills-and-agents/agent-checklist.md)
- [Agent Structure Reference](cookbook/skills-and-agents/agent-structure-reference.md)
- [Authoring Skills and Rules](cookbook/skills-and-agents/authoring-skills-and-rules.md)
- [Rule Lint Checklist](cookbook/skills-and-agents/rule-checklist.md)
- [Rule Structure Reference](cookbook/skills-and-agents/rule-structure-reference.md)
- [Skill Lint Checklist](cookbook/skills-and-agents/skill-checklist.md)
- [Skill Structure Reference](cookbook/skills-and-agents/skill-structure-reference.md)

**testing**
- [Properties of Good Tests](cookbook/testing/properties-of-good-tests.md)
- [Unit Test Patterns](cookbook/testing/unit-test-patterns.md)

**ui**
- [Platform Design Languages](cookbook/ui/platform-design-languages.md)

---

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 2.1.0 | 2026-04-09 | Mike Fullerton | Pass 2: tailor guidelines to use cases, update counts (140 unique, 232 total) |
| 2.0.0 | 2026-04-09 | Mike Fullerton | Reorganize by use case (planning, implementing, testing, reviewing, shipping, cookbook) |
| 1.1.0 | 2026-04-04 | Mike Fullerton | Add database-design category with SQLite best practices |
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
