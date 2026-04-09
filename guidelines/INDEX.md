---

id: eb0764d5-aeac-40cc-9aa4-d84e4eaa652d
title: "Guidelines Index"
domain: agentic-cookbook://guidelines/INDEX
type: reference
version: 2.2.0
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
- [Algorithmic Complexity](planning/code-quality/algorithmic-complexity.md)
- [App Interactions](planning/code-quality/app-interactions.md)
- [Architecture](planning/code-quality/architecture.md)
- [Cross-Cutting Detection](planning/code-quality/cross-cutting-detection.md)
- [Dependency Clusters](planning/code-quality/dependency-clusters.md)
- [Framework Conventions](planning/code-quality/framework-conventions.md)
- [Interface Cohesion](planning/code-quality/interface-cohesion.md)
- [Lifecycle Patterns](planning/code-quality/lifecycle-patterns.md)
- [Module Boundaries](planning/code-quality/module-boundaries.md)
- [Purpose Classification](planning/code-quality/purpose-classification.md)
- [Runtime Conditions](planning/code-quality/runtime-conditions.md)
- [Scope discipline](planning/code-quality/scope-discipline.md)
- [System Dependencies](planning/code-quality/system-dependencies.md)
- [System Interactions](planning/code-quality/system-interactions.md)

**data**
- [Access Pattern Analysis](planning/data/access-pattern-analysis.md)
- [Clock Systems for Sync](planning/data/clock-systems.md)
- [Conflict Resolution](planning/data/conflict-resolution.md)
- [Database](planning/data/database.md)
- [Indexing](planning/data/indexing.md)
- [JSON columns and generated columns](planning/data/json-columns.md)
- [Normalization and denormalization](planning/data/normalization-and-denormalization.md)
- [Offline-First Architecture](planning/data/offline-first-architecture.md)
- [Primary key strategies](planning/data/primary-keys.md)
- [Relationship patterns](planning/data/relationships.md)
- [Sync Engine Design](planning/data/sync-engine-design.md)
- [Sync Protocol](planning/data/sync-protocol.md)
- [Sync Schema Design](planning/data/sync-schema-design.md)
- [SQLite Sync Tooling](planning/data/sync-tooling.md)
- [Transactions and Concurrency](planning/data/transactions-and-concurrency.md)

**feature-management**
- [Feature flags](planning/feature-management/feature-flags.md)

**networking**
- [API Design](planning/networking/api-design.md)
- [Caching](planning/networking/caching.md)
- [Offline and Connectivity](planning/networking/offline-and-connectivity.md)
- [Pagination](planning/networking/pagination.md)
- [Real-Time Communication](planning/networking/real-time-communication.md)

**security**
- [Authentication](planning/security/authentication.md)
- [Privacy and security by default](planning/security/privacy.md)

**testing**
- [Test Pyramid](planning/testing/test-pyramid.md)

**ui**
- [Dashboard service is display-only](planning/ui/dashboard-service-is-display-only.md)
- [Data Display](planning/ui/data-display.md)
- [Platform Design Languages](planning/ui/platform-design-languages.md)

---

### Implementing (109 guidelines)


**accessibility**
- [Accessibility from day one](implementing/accessibility/accessibility.md)
- [Dynamic Type](implementing/accessibility/dynamic-type.md)
- [Font Scaling](implementing/accessibility/font-scaling.md)

**code-quality**
- [Architecture](implementing/code-quality/architecture.md)
- [Small, atomic commits](implementing/code-quality/atomic-commits.md)
- [Dependency Injection](implementing/code-quality/dependency-injection.md)
- [File paths](implementing/code-quality/file-paths.md)
- [Linting from day one](implementing/code-quality/linting.md)
- [Naming](implementing/code-quality/naming.md)
- [No external dependencies in core libraries](implementing/code-quality/no-external-dependencies-in-core-librari.md)
- [Nullable Reference Types](implementing/code-quality/nullable-reference-types.md)
- [Scope discipline](implementing/code-quality/scope-discipline.md)
- [Shell scripts](implementing/code-quality/shell-scripts.md)
- [Type hints](implementing/code-quality/type-hints.md)
- [Use roadmap_lib](implementing/code-quality/use-roadmaplib.md)
- [YAML frontmatter](implementing/code-quality/yaml-frontmatter.md)

**concurrency**
- [No blocking the main thread](implementing/concurrency/concurrency.md)
- [Immutability](implementing/concurrency/immutability.md)

**data**
- [Access Pattern Analysis](implementing/data/access-pattern-analysis.md)
- [Database backup and recovery](implementing/data/backup-and-recovery.md)
- [Clock Systems for Sync](implementing/data/clock-systems.md)
- [Conflict Resolution](implementing/data/conflict-resolution.md)
- [Constraints and validation](implementing/data/constraints-and-validation.md)
- [Data types and type affinity](implementing/data/data-types.md)
- [Database](implementing/data/database.md)
- [Deterministic IDs](implementing/data/deterministic-ids.md)
- [Foreign keys and referential integrity](implementing/data/foreign-keys.md)
- [Indexing](implementing/data/indexing.md)
- [JSON columns and generated columns](implementing/data/json-columns.md)
- [Database naming conventions](implementing/data/naming-conventions.md)
- [Normalization and denormalization](implementing/data/normalization-and-denormalization.md)
- [Offline-First Architecture](implementing/data/offline-first-architecture.md)
- [Primary key strategies](implementing/data/primary-keys.md)
- [Query Optimization](implementing/data/query-optimization.md)
- [Relationship patterns](implementing/data/relationships.md)
- [Schema evolution and migrations](implementing/data/schema-evolution.md)
- [Sync Engine Design](implementing/data/sync-engine-design.md)
- [Sync Protocol](implementing/data/sync-protocol.md)
- [Sync Schema Design](implementing/data/sync-schema-design.md)
- [SQLite Sync Tooling](implementing/data/sync-tooling.md)
- [Transactions and Concurrency](implementing/data/transactions-and-concurrency.md)

**feature-management**
- [A/B testing](implementing/feature-management/ab-testing.md)
- [Debug mode](implementing/feature-management/debug-mode.md)
- [Feature flags](implementing/feature-management/feature-flags.md)

**internationalization**
- [Localizability](implementing/internationalization/localization.md)
- [RTL layout support](implementing/internationalization/rtl-support.md)

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
- [Web services](implementing/networking/web-services.md)

**observability**
- [Analytics](implementing/observability/analytics.md)
- [Instrumented logging](implementing/observability/logging.md)

**platform-integration**
- [Background tasks](implementing/platform-integration/background-tasks.md)
- [Deep linking](implementing/platform-integration/deep-linking.md)
- [Handoff and continuity](implementing/platform-integration/handoff-and-continuity.md)
- [Notifications](implementing/platform-integration/notifications.md)
- [Use AppKit and UIKit, not SwiftUI](implementing/platform-integration/prefer-explicit-apple-apis.md)
- [Search integration](implementing/platform-integration/search-integration.md)
- [Share and inter-app data flow](implementing/platform-integration/share-and-inter-app-data.md)
- [Scriptable and automatable](implementing/platform-integration/shortcuts-and-automation.md)
- [Widgets and glanceable surfaces](implementing/platform-integration/widgets-and-glanceable-surfaces.md)

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
- [Property-Based Testing](implementing/testing/property-based-testing.md)
- [Test Data](implementing/testing/test-data.md)
- [Test Doubles](implementing/testing/test-doubles.md)
- [Comprehensive unit testing](implementing/testing/testing.md)
- [Unit Test Patterns](implementing/testing/unit-test-patterns.md)

**ui**
- [Always show progress](implementing/ui/always-show-progress.md)
- [Animation & Motion](implementing/ui/animation-motion.md)
- [Color](implementing/ui/color.md)
- [Dashboard service is display-only](implementing/ui/dashboard-service-is-display-only.md)
- [Data Display](implementing/ui/data-display.md)
- [Design-Time Data](implementing/ui/design-time-data.md)
- [Feedback Patterns](implementing/ui/feedback-patterns.md)
- [Fluent Design](implementing/ui/fluent-design.md)
- [Form Design](implementing/ui/form-design.md)
- [High DPI / Display Scaling](implementing/ui/high-dpi-display-scaling.md)
- [Iconography](implementing/ui/iconography.md)
- [Layout](implementing/ui/layout.md)
- [Platform Design Languages](implementing/ui/platform-design-languages.md)
- [Previews](implementing/ui/previews.md)
- [Spacing](implementing/ui/spacing.md)
- [State Design](implementing/ui/state-design.md)
- [Theming](implementing/ui/theming.md)
- [Touch & Click Targets](implementing/ui/touch-click-targets.md)
- [Typography](implementing/ui/typography.md)
- [Visual Hierarchy](implementing/ui/visual-hierarchy.md)

---

### Testing (16 guidelines)

- [Database testing](testing/database-testing.md)
- [Design-Time Data](testing/design-time-data.md)
- [Flaky Test Prevention](testing/flaky-test-prevention.md)
- [Linting from day one](testing/linting.md)
- [Mutation Testing](testing/mutation-testing.md)
- [Post-generation verification](testing/post-generation-verification.md)
- [Previews](testing/previews.md)
- [Properties of Good Tests](testing/properties-of-good-tests.md)
- [Property-Based Testing](testing/property-based-testing.md)
- [Security Testing](testing/security-testing.md)
- [Test Data](testing/test-data.md)
- [Test Doubles](testing/test-doubles.md)
- [Test Pyramid](testing/test-pyramid.md)
- [Comprehensive unit testing](testing/testing.md)
- [The Testing Workflow](testing/the-testing-workflow.md)
- [Unit Test Patterns](testing/unit-test-patterns.md)

---

### Reviewing (41 guidelines)


**accessibility**
- [Accessibility from day one](reviewing/accessibility/accessibility.md)

**code-quality**
- [Bulk operation verification](reviewing/code-quality/bulk-operation-verification.md)
- [Dependency Injection](reviewing/code-quality/dependency-injection.md)
- [File paths](reviewing/code-quality/file-paths.md)
- [Naming](reviewing/code-quality/naming.md)
- [No external dependencies in core libraries](reviewing/code-quality/no-external-dependencies-in-core-librari.md)
- [Scope discipline](reviewing/code-quality/scope-discipline.md)
- [Shell scripts](reviewing/code-quality/shell-scripts.md)
- [Type hints](reviewing/code-quality/type-hints.md)
- [Use roadmap_lib](reviewing/code-quality/use-roadmaplib.md)
- [YAML frontmatter](reviewing/code-quality/yaml-frontmatter.md)

**data**
- [Query Optimization](reviewing/data/query-optimization.md)

**internationalization**
- [Localizability](reviewing/internationalization/localization.md)
- [RTL layout support](reviewing/internationalization/rtl-support.md)

**networking**
- [Rate Limiting](reviewing/networking/rate-limiting.md)
- [Timeouts](reviewing/networking/timeouts.md)

**observability**
- [Analytics](reviewing/observability/analytics.md)
- [Instrumented logging](reviewing/observability/logging.md)

**platform-integration**
- [Deep linking](reviewing/platform-integration/deep-linking.md)
- [Use AppKit and UIKit, not SwiftUI](reviewing/platform-integration/prefer-explicit-apple-apis.md)

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

- [A/B testing](shipping/ab-testing.md)
- [Small, atomic commits](shipping/atomic-commits.md)
- [Database backup and recovery](shipping/backup-and-recovery.md)
- [Bulk operation verification](shipping/bulk-operation-verification.md)
- [Dependency Security](shipping/dependency-security.md)
- [Feature flags](shipping/feature-flags.md)
- [MSIX Packaging](shipping/msix-packaging.md)
- [Schema evolution and migrations](shipping/schema-evolution.md)
- [Transport Security](shipping/transport-security.md)

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
| 2.2.0 | 2026-04-09 | Mike Fullerton | Recategorize: 20→12 categories, dissolve language/platform, flatten shipping/testing |
| 2.1.0 | 2026-04-09 | Mike Fullerton | Pass 2: tailor guidelines to use cases, update counts (140 unique, 232 total) |
| 2.0.0 | 2026-04-09 | Mike Fullerton | Reorganize by use case (planning, implementing, testing, reviewing, shipping, cookbook) |
| 1.1.0 | 2026-04-04 | Mike Fullerton | Add database-design category with SQLite best practices |
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
