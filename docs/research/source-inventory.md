# Research Source Inventory (June 2026 expansion)

The machine-readable source list behind the June 2026 cookbook expansion
(see `cookbook-improvement-research.md`). That record states the full research
outputs "were produced ... during the June 2026 effort" but they were never
committed. This document recovers them from the workflow journals so every
sourced claim in the expansion is auditable.

**Provenance.** Sources were extracted verbatim from the background-workflow
journals of the research session (`cookbook-gap-research` and the authoring
runs). Tier-1 sources come from the gap-research run's per-gap `sources` arrays;
Tier-2 notes come from the authoring agents' actual `WebSearch`/`WebFetch` calls.

---

## How to read this

The expansion's sourcing came in **two tiers**, and they differ sharply in rigor:

| Tier | Origin | Coverage | Sourcing |
|------|--------|----------|----------|
| **Tier 1** | 13 parallel gap-analysis agents | ~100 gaps → most principles + waves 2/3/4 + backlog | 3–4 web sources/gap, adversarially audited. **365 unique URLs (below).** |
| **Tier 2** | 4 completeness-critic clusters (design tokens, IaC/containers, privacy/regulatory, agent-eval) | 22 guidelines | Authored largely from model knowledge — the whole run made **~12 searches / 3 fetches total**. Citations were from memory. |

Tier-2 was the gap: those 22 artifacts shipped citations that were never
verified. **All four Tier-2 clusters have since been verified live** (June 2026)
and now carry canonical primary-source citations — design tokens (see
[Tier-2 verification](#tier-2-verification-design-token-cluster) below), plus
IaC/containers, privacy/regulatory, and agent-eval & safety (see
[Tier-2 verification — remaining clusters](#tier-2-verification-remaining-clusters)).

---

### Tier-1 sources by area

Recovered verbatim from the `cookbook-gap-research` workflow journal. Each
gap carried 3–4 sources selected and (round-2) adversarially audited.

#### Engineering heuristics (beyond SOLID/CUPID)

- **Connascence**
  - <https://en.wikipedia.org/wiki/Connascence>
  - <https://thoughtbot.com/blog/connascence-as-a-vocabulary-to-discuss-coupling>
  - <https://connascence.io/pages/about.html>
  - <https://coupling.dev/posts/related-topics/connascence/>
- **Parse, Don't Validate (Type-Driven Design)**
  - <https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/>
  - <https://functional-architecture.org/make_illegal_states_unrepresentable/>
  - <https://aipatternbook.com/make-illegal-states-unrepresentable>
  - <https://deviq.com/practices/parse-dont-validate/>
- **Errors as Values**
  - <https://doc.rust-lang.org/book/ch09-00-error-handling.html>
  - <https://fsharpforfunandprofit.com/rop/>
  - <https://blog.kinto-technologies.com/posts/2025-12-13-rust-railway-oriented-programming-en/>
  - <https://returns.readthedocs.io/en/latest/pages/railway.html>
- **Value Objects over Primitive Obsession**
  - <https://blog.ploeh.dk/2011/05/25/DesignSmellPrimitiveObsession/>
  - <https://blog.ndepend.com/code-smell-primitive-obsession-and-refactoring-recipes/>
  - <https://www.arhohuttunen.com/primitive-obsession/>
- **Separation of Concerns (add Locality of Behavior tension)**
  - <https://htmx.org/essays/locality-of-behaviour/>
  - <https://shows.acast.com/dead-code/episodes/brutality-of-behaviour-with-carson-gross>
  - <https://wipdev.netlify.app/posts/separation-of-concerns-locality-of-behavior-and-javascript/>
- **Optimize for Change (name Cognitive Load as the served metric)**
  - <https://teamtopologies.com/>
  - <https://teamtopologies.com/news-blogs-newsletters/when-teams-grow-too-large-solving-cognitive-load-issues>
  - <https://kentbeck.com/summaries>
  - <https://martinfowler.com/bliki/TeamTopologies.html>
- **Essential vs Accidental Complexity**
  - <https://www.cs.unc.edu/techreports/86-020.pdf>
  - <https://en.wikipedia.org/wiki/No_Silver_Bullet>
  - <https://thenextweb.com/news/complexity-is-the-ceiling-software-design-in-the-age-of-ai-coding>
- **Hyrum's Law: Constrain and Document the Implicit Contract**
  - <https://www.hyrumslaw.com/>
  - <https://www.laws-of-software.com/laws/hyrum/>
  - <https://nordicapis.com/what-does-hyrums-law-mean-for-api-design/>
- **Robustness Principle and Its RFC 9413 Correction**
  - <https://datatracker.ietf.org/doc/html/rfc9413>
  - <https://datatracker.ietf.org/doc/draft-thomson-postel-was-wrong/>
  - <https://en.wikipedia.org/wiki/Robustness_principle>
- **Law of Demeter and Tell, Don't Ask**
  - <https://en.wikipedia.org/wiki/Law_of_Demeter>
  - <https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/ch10lev2sec23.html>
  - <https://www.devskillsunlock.com/blog/law-of-demeter-csharp-dotnet>
- **Conway's Law and Agent-Team Topology**
  - <https://martinfowler.com/bliki/ConwaysLaw.html>
  - <https://teamtopologies.com/>
  - <https://itrevolution.com/articles/conways-law-critical-for-efficient-team-design-in-tech/>

#### Codebases optimized for AI agents

- **Repository Instruction Files for Agents (AGENTS.md / CLAUDE.md)**
  - <https://agents.md/>
  - <https://aaif.io/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation-aaif-anchored-by-new-project-contributions-including-model-context-protocol-mcp-goose-and-agents-md/>
  - <https://arxiv.org/pdf/2602.11988>
  - <https://code.claude.com/docs/en/best-practices>
- **Designing Code for the AI Reader (Semantic Density and Greppability)**
  - <https://tianpan.co/blog/2026-04-13-the-ai-legible-codebase>
  - <https://simonwillison.net/2025/Mar/11/using-llms-for-code/>
  - <https://www.honeycomb.io/blog/how-i-code-with-llms-these-days>
- **Spec-Driven Development (Spec as Source of Truth)**
  - <https://github.com/github/spec-kit>
  - <https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html>
  - <https://code.claude.com/docs/en/best-practices>
- **Deterministic Guardrails for Coding Agents (Harness Engineering)**
  - <https://code.claude.com/docs/en/best-practices>
  - <https://www.nxcode.io/resources/news/harness-engineering-complete-guide-ai-agent-codex-2026>
  - <https://github.com/ai-boost/awesome-harness-engineering>
- **Eval-Driven Development for Agent and LLM Behavior**
  - <https://arxiv.org/abs/2411.13768>
  - <https://huggingface.co/blog/evaleval/eval-costs-bottleneck>
  - <https://www.digitalapplied.com/blog/ai-agent-evaluation-pipeline-2026-testing-methodology>
- **Context and Memory Management for Coding Agents**
  - <https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools>
  - <https://code.claude.com/docs/en/best-practices>
  - <https://www.pixelmojo.io/blogs/context-engineering-ai-coding-agents-beyond-claude-md>
- **Revise dependency-security: add agent install guardrails (allowlists, cooldowns, install-scope restriction)**
  - <https://www.infoq.com/news/2026/05/pip-261-dependency-cooldowns/>
  - <https://safedep.io/mass-npm-supply-chain-attack-tanstack-mistral/>
  - <https://dev.to/maxkrivich/ai-coding-agent-security-practical-guardrails-for-claude-code-copilot-and-codex-och>
- **Revise atomic-commits (or add reviewing guideline): small diffs for agent-reviewability**
  - <https://dev.to/mcsee/ai-coding-tip-023-shrink-your-ais-pull-request-4lnb>
  - <https://www.qodo.ai/blog/best-ai-code-review-tools-2026/>
  - <https://arxiv.org/pdf/2604.03196>

#### Web frontend

- **Core Web Vitals and Web Performance Budgets**
  - <https://web.dev/articles/inp>
  - <https://web.dev/blog/inp-cwv-march-12>
  - <https://developers.google.com/search/blog/2023/05/introducing-inp>
- **Choose a Web Rendering Strategy per Route; Minimize Client JS**
  - <https://react.dev/reference/rsc/server-components>
  - <https://docs.astro.build/en/concepts/islands/>
  - <https://www.patterns.dev/vanilla/islands-architecture/>
  - <https://react.dev/reference/react-dom/server/renderToReadableStream>
  - <https://reactrouter.com/start/data/route-modules>
- **Modern CSS Primitives and Baseline-Gated Adoption**
  - <https://web.dev/baseline>
  - <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries>
  - <https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API>
  - <https://www.w3.org/TR/css-2026/>
- **TypeScript Strictness Baseline (tsconfig)**
  - <https://www.typescriptlang.org/tsconfig/strict.html>
  - <https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html>
  - <https://www.typescriptlang.org/tsconfig/verbatimModuleSyntax.html>
  - <https://github.com/microsoft/TypeScript/issues/63293>
- **Separate Server State from Client State**
  - <https://tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state>
  - <https://www.pkgpulse.com/blog/state-of-react-state-management-2026>
- **Revise Content Security Policy guideline to add Trusted Types and a documented sanitizer**
  - <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for>
  - <https://web.dev/articles/strict-csp>
  - <https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html>
- **Validate Untrusted Input at the Server-Render and Server-Action Boundary**
  - <https://nvd.nist.gov/vuln/detail/CVE-2025-55182>
  - <https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components>
  - <https://www.microsoft.com/en-us/security/blog/2025/12/15/defending-against-the-cve-2025-55182-react2shell-vulnerability-in-react-server-components/>
  - <https://unit42.paloaltonetworks.com/cve-2025-55182-react-and-cve-2025-66478-next/>
- **Revise Accessibility guideline to WCAG 2.2 AA (and reconcile with touch-click-targets)**
  - <https://www.w3.org/TR/WCAG22/>
  - <https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/>
  - <https://www.w3.org/WAI/standards-guidelines/wcag/>
- **Progressive Web App Installability and Service Workers**
  - <https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps>
  - <https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide>
  - <https://webkit.org/blog/>

#### Apple platform development (iOS/macOS, Swift)

- **Adopt Swift 6 strict concurrency incrementally (Sendable, actors, per-module migration)**
  - <https://developer.apple.com/documentation/swift/adoptingswift6>
  - <https://www.avanderlee.com/concurrency/swift-6-migrating-xcode-projects-packages/>
  - <https://qualitycoding.org/conversation-swift6-data-race-safety/>
- **Enable Approachable Concurrency and default main-actor isolation for Apple app targets**
  - <https://www.swift.org/blog/swift-6.2-released/>
  - <https://www.avanderlee.com/concurrency/approachable-concurrency-in-swift-6-2-a-clear-guide/>
  - <https://useyourloaf.com/blog/approachable-concurrency-in-swift-packages/>
- **Choose SwiftData vs Core Data by maturity, schema complexity, and minimum-OS gate**
  - <https://distantjob.com/blog/core-data-vs-swiftdata/>
  - <https://fatbobman.com/en/posts/why-i-am-still-thinking-about-core-data-in-2026/>
  - <https://cocoacasts.com/why-i-chose-core-data-over-swift-data-for-hive-notes>
- **Ship a privacy manifest and declare required-reason API usage (App Store gate)**
  - <https://developer.apple.com/documentation/bundleresources/privacy-manifest-files>
  - <https://developer.apple.com/documentation/technotes/tn3183-adding-required-reason-api-entries-to-your-privacy-manifest>
  - <https://developer.apple.com/news/?id=pvszzano>
  - <https://bitrise.io/blog/post/enforcement-of-apple-privacy-manifest-starting-from-may-1-2024>
- **Expose app actions and content via App Intents (entities, App Shortcuts, schemas, testing)**
  - <https://developer.apple.com/documentation/appintents>
  - <https://developer.apple.com/videos/play/wwdc2025/275/>
  - <https://developer.apple.com/documentation/appintents/integrating-actions-with-siri-and-apple-intelligence>
- **Use Swift Testing for unit tests, keep XCTest for UI and performance, migrate incrementally**
  - <https://developer.apple.com/xcode/swift-testing/>
  - <https://forums.swift.org/t/what-you-need-to-know-before-migrating-to-swift-testing/81005>
  - <https://blakecrosley.com/blog/swift-testing-vs-xctest>
- **Revise prefer-explicit-apple-apis: update SwiftUI churn rationale (Observation is stable since iOS 17)**
  - <https://developer.apple.com/documentation/SwiftUI/Migrating-from-the-observable-object-protocol-to-the-observable-macro>
  - <https://www.jessesquires.com/blog/2024/09/09/swift-observable-macro/>
  - <https://nilcoalescing.com/blog/ObservableInSwiftUI/>
- **Adopt Liquid Glass: glass for the navigation layer, content at the base, Icon Composer icons**
  - <https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/>
  - <https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass>
  - <https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views>
- **Revise widgets guideline: add Controls, widget push updates, and refresh-strategy decision**
  - <https://developer.apple.com/documentation/widgetkit>
  - <https://developer.apple.com/videos/play/wwdc2025/278/>
  - <https://developer.apple.com/documentation/widgetkit/developing-a-widgetkit-strategy>

#### Windows desktop development (WinUI 3 / Windows App SDK, .NET, MSIX, Fluent, packaging, ARM64, AOT/CsWinRT)

- **Choosing a Windows UI Framework (WinUI + Windows App SDK, WPF, UWP)**
  - <https://learn.microsoft.com/en-us/windows/apps/get-started/windows-developer-faq>
  - <https://learn.microsoft.com/en-us/windows/apps/winui/winui3/>
  - <https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/what-is-supported>
- **Windows Deployment Model Selection (MSIX, Unpackaged, Self-Contained)**
  - <https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/choose-packaging-model>
  - <https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/self-contained-deploy/deploy-self-contained-apps>
  - <https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/deploy-unpackaged-apps>
- **Windows Multi-Architecture Targeting (x64 and ARM64)**
  - <https://learn.microsoft.com/en-us/windows/apps/get-started/windows-developer-faq>
  - <https://github.com/dotnet/sdk/issues/53387>
  - <https://github.com/microsoft/microsoft-ui-xaml/issues/9998>
- **Windows 11 Materials: Mica and Acrylic Backdrops**
  - <https://learn.microsoft.com/en-us/windows/apps/design/style/mica>
  - <https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic>
  - <https://learn.microsoft.com/en-us/windows/apps/develop/ui/system-backdrops>
- **Targeting .NET Versions on Windows (LTS vs STS, .NET 10)**
  - <https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core>
  - <https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/>
  - <https://learn.microsoft.com/en-us/dotnet/core/releases-and-support>
- **Native AOT and Trimming for WinUI (CsWinRT Interop)**
  - <https://github.com/microsoft/CsWinRT/blob/master/docs/aot-trimming.md>
  - <https://learn.microsoft.com/en-us/windows/apps/develop/platform/csharp-winrt/>
  - <https://github.com/microsoft/CsWinRT/releases>

#### Android development best practices (2024-2026)

- **Jetpack Compose UI Architecture: State Hoisting and Unidirectional Data Flow**
  - <https://developer.android.com/develop/ui/compose/state>
  - <https://developer.android.com/develop/ui/compose/state-hoisting>
  - <https://developer.android.com/topic/architecture>
  - <https://github.com/android/nowinandroid>
- **Kotlin Flow and StateFlow: Lifecycle-Aware State Exposure and Collection**
  - <https://developer.android.com/kotlin/flow/stateflow-and-sharedflow>
  - <https://developer.android.com/topic/libraries/architecture/coroutines>
  - <https://medium.com/androiddevelopers/a-safer-way-to-collect-flows-from-android-uis-23080b1f8bda>
  - <https://developer.android.com/topic/libraries/architecture/lifecycle>
- **Android Edge-to-Edge and Window Insets (targetSdk 35+)**
  - <https://developer.android.com/develop/ui/views/layout/edge-to-edge>
  - <https://developer.android.com/codelabs/edge-to-edge>
  - <https://medium.com/androiddevelopers/insets-handling-tips-for-android-15s-edge-to-edge-enforcement-872774e8839b>
- **Jetpack Compose Accessibility: Semantics, TalkBack, and Touch Targets**
  - <https://developer.android.com/develop/ui/compose/accessibility>
  - <https://developer.android.com/develop/ui/compose/accessibility/semantics>
  - <https://medium.com/@graser1305/build-accessible-android-apps-with-jetpack-compose-and-be-ready-for-the-eaa-2025-fb8c08912623>
- **Android Predictive Back Gesture Migration**
  - <https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture>
  - <https://developer.android.com/guide/navigation/custom-back/support-animations>
  - <https://developer.android.com/about/versions/14/features/predictive-back>
- **Hilt Dependency Injection for Android (with KSP)**
  - <https://developer.android.com/training/dependency-injection/hilt-android>
  - <https://developer.android.com/training/dependency-injection/hilt-jetpack>
  - <https://developer.android.com/jetpack/androidx/releases/hilt>
- **Room Persistence on Android (KSP, Flow DAOs, KMP/Room 3.0)**
  - <https://android-developers.googleblog.com/2026/03/room-30-modernizing-room.html>
  - <https://developer.android.com/kotlin/multiplatform/room>
  - <https://developer.android.com/training/data-storage/room>
- **Jetpack Compose Performance and Stability**
  - <https://developer.android.com/develop/ui/compose/performance/stability/strongskipping>
  - <https://developer.android.com/develop/ui/compose/performance/stability/fix>
  - <https://byteiota.com/jetpack-compose-performance-matches-views-december-2025/>
  - <https://medium.com/androiddevelopers/new-ways-of-optimizing-stability-in-jetpack-compose-038106c283cc>
- **Compose Navigation: Navigation 3 and Type-Safe Routes**
  - <https://android-developers.googleblog.com/2025/11/jetpack-navigation-3-is-stable.html>
  - <https://developer.android.com/guide/navigation>
  - <https://kotlinlang.org/docs/multiplatform/compose-navigation.html>
- **Material 3 Theming on Android (Dynamic Color and Expressive)**
  - <https://blog.google/products-and-platforms/platforms/android/material-3-expressive-android-wearos-launch/>
  - <https://m3.material.io/>
  - <https://developer.android.com/jetpack/androidx/releases/compose-material3>
  - <https://developer.android.com/develop/ui/compose/designsystems/material3>
- **Android Baseline Profiles and Macrobenchmark Performance Tooling**
  - <https://developer.android.com/topic/performance/baselineprofiles/overview>
  - <https://developer.android.com/topic/performance/baselineprofiles/measure-baselineprofile>
  - <https://android-developers.googleblog.com/2025/11/leveling-guide-for-your-performance.html>
  - <https://engineering.fb.com/2025/10/01/android/accelerating-our-android-apps-with-baseline-profiles/>
- **Jetpack Compose Side-Effect APIs**
  - <https://developer.android.com/develop/ui/compose/side-effects>
  - <https://developer.android.com/codelabs/jetpack-compose-advanced-state-side-effects>
- **Handling One-Off UI Events in Compose/MVVM**
  - <https://developer.android.com/topic/architecture/ui-layer/events>
  - <https://medium.com/androiddevelopers/viewmodel-one-off-event-antipatterns-16a1da869b95>
  - <https://nek12.dev/blog/en/events-as-state-are-an-antipattern-in-mvi-and-mvvm-heres-why/>
- **Kotlin Multiplatform and Compose Multiplatform: Sharing Strategy**
  - <https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/>
  - <https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-getting-started.html>
  - <https://blog.jetbrains.com/kotlin/2025/08/kmp-roadmap-aug-2025/>
- **Revise concurrency guideline's Android/Kotlin section for modern structured concurrency**
  - <https://kotlinlang.org/docs/coroutines-best-practices.html>
  - <https://developer.android.com/topic/libraries/architecture/coroutines>
  - <https://developer.android.com/kotlin/flow/stateflow-and-sharedflow>

#### Database design

- **Choosing a Primary Datastore (default to Postgres; defer specialists)**
  - <https://www.tigerdata.com/blog/its-2026-just-use-postgres>
  - <https://news.ycombinator.com/item?id=46905555>
  - <https://www.cockroachlabs.com/blog/document-store-vs-relational-database/>
  - <https://aerospike.com/blog/sql-vs-nosql/>
- **Transaction Isolation and Serialization-Failure Retry (server databases)**
  - <https://www.postgresql.org/docs/current/transaction-iso.html>
  - <https://www.thenile.dev/blog/transaction-isolation-postgres>
  - <https://planetscale.com/blog/pitfalls-of-isolation-levels-in-distributed-databases>
- **Connection Pooling for Server and Serverless Backends**
  - <https://learn.microsoft.com/en-us/azure/postgresql/connectivity/concepts-connection-pooling-best-practices>
  - <https://www.pgbouncer.org/usage.html>
  - <https://devcenter.heroku.com/articles/best-practices-pgbouncer-configuration>
- **Zero-Downtime Migrations: Expand/Contract for Server Databases**
  - <https://blogs.reliablepenguin.com/2025/11/16/database-migrations-without-drama-expand-contract-in-practice>
  - <https://www.datasops.com/blog/database-migrations-zero-downtime>
  - <https://www.postgresql.org/docs/current/sql-createindex.html>
- **Add server-side indexing to indexing.md (CONCURRENTLY, GIN/GiST/BRIN, REINDEX, bloat)**
  - <https://www.postgresql.org/docs/current/indexes-types.html>
  - <https://www.postgresql.org/docs/current/sql-createindex.html>
  - <https://pganalyze.com/blog/gin-index>
- **Vector Search and Retrieval (pgvector + hybrid retrieval)**
  - <https://github.com/pgvector/pgvector>
  - <https://aws.amazon.com/blogs/database/supercharging-vector-search-performance-and-relevance-with-pgvector-0-8-0-on-amazon-aurora-postgresql/>
  - <https://venturebeat.com/data/the-retrieval-rebuild-why-hybrid-retrieval-intent-tripled-as-enterprise-rag-programs-hit-the-scale-wall>
- **Add Postgres JSONB indexing to json-columns.md (GIN vs expression, operator classes)**
  - <https://www.postgresql.org/docs/current/datatype-json.html>
  - <https://www.crunchydata.com/blog/indexing-jsonb-in-postgres>
  - <https://vsevolod.net/postgresql-jsonb-index/>
- **Partitioning and Time-Series Patterns for Large Tables**
  - <https://www.postgresql.org/docs/current/ddl-partitioning.html>
  - <https://pgxn.org/dist/pg_partman/doc/pg_partman.html>
  - <https://github.com/timescale/timescaledb>
- **CQRS and Event Sourcing: When (and When Not) to Use Them**
  - <https://microservices.io/patterns/data/event-sourcing.html>
  - <https://www.usefulfunctions.co.uk/2025/11/06/cqrs-and-event-sourcing-when-to-use/>
  - <https://www.ashrafmageed.com/cqrs-eventsourcing-and-the-cost-of-tooling-constraints/>
- **Add the CRDT-vs-server-authoritative decision + library landscape to conflict-resolution.md / sync-engine-design.md**
  - <https://www.pkgpulse.com/guides/yjs-vs-automerge-vs-loro-crdt-libraries-2026>
  - <https://powersync.com/blog/why-cinapse-moved-away-from-crdts-for-sync>
  - <https://stack.convex.dev/automerge-and-convex>

#### REST API / routes design

- **Idempotency Keys for Write APIs**
  - <https://stripe.com/blog/idempotency>
  - <https://docs.stripe.com/api/idempotent_requests>
  - <https://brandur.org/idempotency-keys>
  - <https://httptoolkit.com/blog/idempotency-keys/>
- **Design-First API Development with OpenAPI**
  - <https://www.openapis.org/blog/2025/09/23/announcing-openapi-v3-2>
  - <https://spec.openapis.org/oas/v3.2.0.html>
  - <https://apisyouwonthate.com/blog/a-developers-guide-to-api-design-first/>
- **Server-Side Rate Limiting and Quota Headers**
  - <https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/>
  - <https://www.speakeasy.com/api-design/rate-limiting>
  - <https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api>
- **Revise API Design: versioning policy + Deprecation/Sunset lifecycle**
  - <https://restfulapi.net/versioning/>
  - <https://www.xmatters.com/blog/api-versioning-strategies>
  - <https://www.rfc-editor.org/rfc/rfc8594.html>
- **Choosing an API Style: REST vs gRPC vs GraphQL**
  - <https://www.designgurus.io/blog/rest-graphql-grpc-system-design>
  - <https://blog.apilayer.com/graphql-vs-rest-vs-grpc-which-should-you-choose-and-when/>
- **Revise Caching (or add): ETag/If-Match optimistic concurrency for writes**
  - <https://www.rfc-editor.org/rfc/rfc9110.html>
  - <https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-None-Match>
  - <https://www.rfc-editor.org/rfc/rfc9111.html>
- **Revise Authentication: sender-constrained tokens (DPoP/mTLS), RFC 9700, OIDC-vs-access-token**
  - <https://www.rfc-editor.org/info/rfc9700/>
  - <https://oauth.net/2.1/>
  - <https://workos.com/blog/oauth-best-practices>
- **Revise API Design + Pagination: Richardson maturity framing and RFC 8288 Link relations**
  - <https://restfulapi.net/richardson-maturity-model/>
  - <https://www.rfc-editor.org/rfc/rfc8288.html>
  - <https://www.speakeasy.com/api-design/pagination>

#### MCP endpoints (building Model Context Protocol servers/endpoints): spec primitives, transports, tool design, structured output, and security

- **MCP Server Design**
  - <https://modelcontextprotocol.io/specification/draft/server/tools>
  - <https://www.anthropic.com/engineering/writing-tools-for-agents>
  - <https://workos.com/blog/mcp-features-guide>
  - <https://modelcontextprotocol.io/specification/2025-11-25/changelog>
  - <https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/>
- **MCP Server Security**
  - <https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices>
  - <https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks>
  - <https://www.descope.com/blog/post/mcp-vulnerabilities>
  - <https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html>
  - <https://christian-schneider.net/blog/securing-mcp-defense-first-architecture/>
- **MCP Transports and Authorization**
  - <https://modelcontextprotocol.io/specification/draft/basic/authorization>
  - <https://modelcontextprotocol.io/specification/2025-03-26/basic/transports>
  - <https://auth0.com/blog/mcp-streamable-http/>
  - <https://workos.com/blog/mcp-2025-11-25-spec-update>
  - <https://www.truefoundry.com/blog/mcp-stdio-vs-streamable-http-enterprise>
- **Input Validation (add: tool descriptions and tool outputs are untrusted LLM-context input)**
  - <https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks>
  - <https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/>
  - <https://arxiv.org/html/2508.14925v1>
- **MCP Server Review Checklist**
  - <https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices>
  - <https://modelcontextprotocol.io/specification/draft/server/tools>
  - <https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html>
- **MCP Server**
  - <https://modelcontextprotocol.io/specification/2025-11-25/changelog>
  - <https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/>
  - <https://www.anthropic.com/engineering/code-execution-with-mcp>

#### Security currency

- **LLM and Agentic Application Security**
  - <https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/>
  - <https://genai.owasp.org/llm-top-10/>
  - <https://owasp.org/www-project-top-10-for-large-language-model-applications/>
- **Software Supply-Chain Integrity (SBOM, SLSA Provenance, Artifact Signing)**
  - <https://owasp.org/Top10/2025/0x00_2025-Introduction/>
  - <https://slsa.dev/spec/v1.0/levels>
  - <https://cyclonedx.org/specification/overview/>
  - <https://docs.sigstore.dev/cosign/signing/overview/>
  - <https://www.cisa.gov/sbom>
- **Threat Modeling (STRIDE, Continuous)**
  - <https://www.threatmodelingmanifesto.org/>
  - <https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats>
  - <https://owasp.org/www-community/Threat_Modeling_Process>
- **Secrets Management (Secretless, Workload Identity, Short-Lived Credentials)**
  - <https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html>
  - <https://www.hashicorp.com/en/blog/securing-modern-workloads-with-hashicorp-vault-and-wif>
  - <https://securityboulevard.com/2025/11/secrets-management-best-practices-for-ephemeral-environments/>
- **Revise Dependency Security: prioritize by exploitability (reachability + EPSS + CISA KEV)**
  - <https://www.first.org/epss/>
  - <https://www.cisa.gov/known-exploited-vulnerabilities-catalog>
  - <https://about.gitlab.com/blog/2025/01/07/reduce-supply-chain-risk-with-smarter-vulnerability-prioritization/>
- **Add passkeys/WebAuthn to Authentication guideline**
  - <https://fidoalliance.org/passkeys/>
  - <https://pages.nist.gov/800-63-4/sp800-63b.html>
  - <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2>
- **Refresh security reference + compliance to OWASP Top 10 2025 (add A10 fail-open handling)**
  - <https://owasp.org/Top10/2025/0x00_2025-Introduction/>
  - <https://owasp.org/www-project-top-ten/>
  - <https://owasp.org/Top10/>
- **Parse Don't Validate (typed trust boundary for untrusted input)**
  - <https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/>
  - <https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html>
  - <https://rednegra.net/blog/20250810-parse-dont-validate/>

#### Observability & ops

- **Service-Level Objectives and Error Budgets**
  - <https://sre.google/workbook/alerting-on-slos/>
  - <https://sre.google/workbook/implementing-slos/>
  - <https://docs.cloud.google.com/stackdriver/docs/solutions/slo-monitoring/alerting-on-budget-burn-rate>
  - <https://www.nobl9.com/service-level-objectives/slo-best-practices>
- **Metrics Instrumentation: RED and USE Methods**
  - <https://grafana.com/blog/the-red-method-how-to-instrument-your-services/>
  - <https://www.brendangregg.com/usemethod.html>
  - <https://sre.google/sre-book/monitoring-distributed-systems/>
  - <https://betterstack.com/community/guides/monitoring/red-use-metrics/>
- **Distributed Tracing and Context Propagation**
  - <https://opentelemetry.io/docs/concepts/context-propagation/>
  - <https://opentelemetry.io/blog/2025/sampling-milestones/>
  - <https://www.w3.org/TR/trace-context/>
  - <https://uptrace.dev/opentelemetry/distributed-tracing>
- **Revise 'Instrumented logging' to add OpenTelemetry, trace correlation, and semantic-convention field naming**
  - <https://opentelemetry.io/blog/2026/otel-graduates/>
  - <https://www.cncf.io/announcements/2026/05/21/cloud-native-computing-foundation-announces-opentelemetrys-graduation-solidifying-status-as-the-de-facto-observability-standard/>
  - <https://www.structlog.org/en/stable/logging-best-practices.html>
  - <https://opentelemetry.io/docs/specs/semconv/>
  - <https://docs.cloud.google.com/logging/docs/structured-logging>
- **Incident Response and Blameless Postmortems**
  - <https://sre.google/workbook/postmortem-culture/>
  - <https://sre.google/sre-book/managing-incidents/>
  - <https://incident.io/blog/sre-incident-postmortem-best-practices>
  - <https://rootly.com/sre/2025-sre-incident-management-best-practices-checklist>
- **Progressive Delivery: Canary, Blue-Green, and Metric-Gated Rollout**
  - <https://argo-rollouts.readthedocs.io/en/stable/concepts/>
  - <https://www.getunleash.io/blog/canary-release-vs-progressive-delivery>
  - <https://openfeature.dev/>
  - <https://www.flagsmith.com/blog/progressive-delivery>
- **Continuous Profiling and the Signals Debate**
  - <https://www.datadoghq.com/blog/continuous-profiling-fourth-pillar/>
  - <https://charity.wtf/2025/10/30/the-pillar-is-a-lie/>
  - <https://opentelemetry.io/docs/specs/status/>
  - <https://thenewstack.io/elastic-profiling-agent-offers-a-4th-pillar-of-observability/>
- **Telemetry as a First-Class Concern (15-Factor)**
  - <https://12factor.net/>
  - <https://www.oreilly.com/library/view/beyond-the-twelve-factor/9781492042631/>
  - <https://medium.com/@uptoamir/the-evolution-of-cloud-native-development-from-12-factor-to-15-factor-methodologies-799e6921420e>

#### Testing currency

- **Contract Testing for Services**
  - <https://docs.pact.io/>
  - <https://docs.pact.io/consumer>
  - <https://www.gravitee.io/blog/contract-testing-microservices-strategy>
  - <https://www.sqaexperts.com/consumerdriven-contract-testing-with-pact-microservices-qa-guide-for-2026>
- **Verifying AI-Generated Code**
  - <https://addyo.substack.com/p/code-review-in-the-age-of-ai>
  - <https://peterlavigne.com/writing/verifying-ai-generated-code>
  - <https://red.anthropic.com/2026/property-based-testing/>
  - <https://medium.com/@haseeb_sohail/how-i-evaluate-llm-code-quality-reviewing-ai-generated-code-at-scale-db8c4f150107>
- **Test Pyramid → Test Suite Shape (pyramid, trophy, and context)**
  - <https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications>
  - <https://kentcdodds.com/blog/write-tests>
  - <https://web.dev/articles/ta-strategies>
  - <https://www.wiremock.io/post/rethinking-the-testing-pyramid>
- **Using Snapshot Tests Responsibly**
  - <https://jestjs.io/docs/snapshot-testing>
  - <https://blog.stackademic.com/its-2025-stop-using-snapshot-testing-1afa6612259e>
  - <https://dev.to/dorshinar/why-i-ve-stopped-writing-snapshots-tests-in-jest-376d>
  - <https://selleo.com/blog/when-to-use-jest-snapshots>
- **Flaky Test Prevention → add quarantine lifecycle and detection**
  - <https://docs.datadoghq.com/tests/flaky_management/>
  - <https://docs.datadoghq.com/tests/flaky_test_management/early_flake_detection/>
  - <https://www.datadoghq.com/blog/datadog-flaky-tests/>
  - <https://martinfowler.com/articles/nonDeterminism.html>
- **Fuzz Testing for Untrusted Input**
  - <https://github.com/google/oss-fuzz>
  - <https://appsec.guide/docs/fuzzing/oss-fuzz/>
  - <https://google.github.io/oss-fuzz/research/llms/target_generation/>
  - <https://arxiv.org/html/2510.16433v1>
- **Ephemeral Preview Environments for Per-PR Testing**
  - <https://ephemeralenvironments.io/>
  - <https://northflank.com/blog/the-what-and-why-of-ephemeral-preview-environments-on-kubernetes-sandbox-testing>
  - <https://www.uffizzi.com/preview-environments-guide>
  - <https://www.bunnyshell.com/blog/best-practices-for-end-to-end-testing-in-2025/>
- **Property-Based & Test-Data guidelines → add agentic PBT and builder/mother/factory detail**
  - <https://red.anthropic.com/2026/property-based-testing/>
  - <https://github.com/HypothesisWorks/hypothesis>
  - <http://www.natpryce.com/articles/000714.html>
  - <https://www.arhohuttunen.com/test-data-builders/>

#### Product iteration & delivery

- **Steel Thread First (Walking Skeleton)**
  - <https://www.rubick.com/steel-threads/>
  - <https://bryceyork.com/steel-threads/>
  - <https://codeclimate.com/blog/kickstart-your-next-project-with-a-walking-skeleton>
  - <https://news.ycombinator.com/item?id=35090989>
- **Deliberate, Prudent Technical Debt**
  - <https://martinfowler.com/bliki/TechnicalDebtQuadrant.html>
  - <https://techdebt.guru/tech-debt-quadrant/>
  - <https://arxiv.org/pdf/2601.11430>
  - <https://www.gitclear.com/research/google_dora_2024_summary_ai_impact>
- **Trunk-Based Development**
  - <https://dora.dev/capabilities/trunk-based-development/>
  - <https://dora.dev/devops-capabilities/technical/trunk-based-development/>
  - <https://launchdarkly.com/blog/elite-performance-with-trunk-based-development/>
- **Continuous Delivery**
  - <https://dora.dev/capabilities/continuous-delivery/>
  - <https://dora.dev/capabilities/continuous-integration/>
- **Delivery Metrics (DORA)**
  - <https://dora.dev/research/2024/dora-report/>
  - <https://dora.dev/dora-report-2025/>
  - <https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report>
  - <https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025>
- **Fitness Functions for Evolutionary Architecture**
  - <https://www.oreilly.com/library/view/building-evolutionary-architectures/9781492097532/>
  - <https://nealford.com/books/buildingevolutionaryarchitectures.html>
  - <https://evolutionaryarchitecture.com/>
- **Definition of Done — Fix the Bar, Flex the Scope**
  - <https://www.scrum.org/resources/what-definition-done>
  - <https://www.atlassian.com/agile/project-management/definition-of-done>
  - <https://agilealliance.org/glossary/definition-of-done/>
  - <https://age-of-product.com/definition-of-product-done-principles-scrum-success-factor/>

---

## Tier-2 verification: design-token cluster

The 4 design-token guidelines (`planning/ui/design-tokens`,
`implementing/ui/theming-with-tokens`, `implementing/ui/design-token-distribution`,
`implementing/ui/cross-platform-token-adaptation`) were authored with **1 web
search total** (`design-tokens.md`: "W3C Design Tokens Community Group format
module 2024 specification draft") and zero fetches. Their citations were
re-verified live on 2026-06-10:

| Claim (as shipped) | Verdict | Source |
|--------------------|---------|--------|
| DTCG "first stable version 2025.10, October 2025" | ✅ Confirmed — announced 2025-10-28 | <https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/> |
| DTCG 2025.10 adds Display P3 / OKLCH / CSS Color 4 (real basis for the P3/OKLCH claim in `cross-platform-token-adaptation`, which was uncited) | ✅ Confirmed | <https://www.designtokens.org/tr/drafts/format/> |
| Style Dictionary is the established transform; "use a current released version" | ✅ Current is **v5**, which targets DTCG 2025.10 (v4 export formats sunset Sep 2026) | <https://styledictionary.com/> · <https://help.zeroheight.com/hc/en-us/articles/48049028236187-Migrating-to-Style-Dictionary-v5-in-tokens-automation> |
| WCAG contrast thresholds (4.5:1 / 3:1) | ⚠️ Accurate, but `design-tokens.md` cites WCAG **2.2** while `theming-with-tokens.md` linked WCAG **2.1**. 2.2 is current; thresholds identical. Reconciled to 2.2. | <https://www.w3.org/TR/WCAG22/> |

Net: the token cluster's claims were accurate but un-traceable. Verification
upgraded them from "asserted from memory" to "confirmed," and the citations are
now wired into the guideline files.

### Tier-2 verification — remaining clusters

The other three Tier-2 clusters (18 files) were authored the same way (near-zero
live research) and were verified live on 2026-06-10 via three parallel research
agents — each read every file, checked its claims and existing citation against
the live web, and recommended canonical primary sources (verified to resolve).
All existing citations resolved; two factual fixes were found:

| Cluster | Files | Sources added | Fixes |
|---------|-------|---------------|-------|
| IaC / containers | 7 | OpenTofu/Terraform state+plan, k8s resource/PSA/PDB/secrets-good-practices/KMS/External-Secrets, Docker BuildKit secrets, distroless, OCI image-spec, cosign, SLSA provenance, NIST SP 800-190 | none (all version claims — OpenTofu S3 `use_lockfile`, KMS v2 GA in 1.29, PSA `restricted` in 1.25+ — verified current) |
| privacy / regulatory | 6 | CCPA (oag.ca.gov), IAPP state tracker, EUR-Lex Reg (EU) 2016/679, EDPB Art.25 & consent guidelines, GDPR Art.4/12/17/20/35, ISO 27701:2025, NIST Privacy Framework | "US state laws in effect" **20 → 19** (as of Jan 1 2026, per IAPP) |
| agent-eval & safety | 5 | NIST AI 600-1 + AI RMF, OWASP LLM Top-10 2025 dated page, RAGAS faithfulness + paper, BFCL v3/paper, MCP spec 2025-06-18, indirect-prompt-injection paper (Greshake et al.) | deprecated `platform.openai.com/docs/guides/evals` → `developers.openai.com/...`; `FACTScore` → `FActScore` |

All 18 pass `/approve-artifact` (zero FAIL/WARN) and are bumped to 1.0.1.

> Notes from verification, left for the author: ISO/IEC 27701 is now the **2025**
> stand-alone edition (`iso.org/standard/27701`); the CISA KEV catalog URL is
> referenced in prose but returns HTTP 403 to automated fetches (live, but not
> machine-verifiable), so it was deliberately not added as a formal citation.

---

## Tier-1 back-fill — dropped sources recovered into artifacts

A reference audit of the whole cookbook (2026-06-10) found that the Tier-1
research had produced sources that never reached the artifacts they belonged to.
Mapping each gap's `proposedDomain` to its artifact surfaced two gaps, both now
closed by wiring the recovered (adversarially-audited) sources in:

| Situation | Artifacts | Sources wired in |
|-----------|-----------|------------------|
| Recovered sources, but artifact shipped with **zero** references | **12** (6 principles: connascence, parse-don't-validate, errors-as-values, separation-of-concerns, steel-thread-first, optimize-for-change; 6 guidelines incl. value-objects, api-design, test-pyramid) | ~44 |
| Artifact had **1 from-memory** citation, but inventory held more | **41** guidelines (e.g. authentication +6, mcp-server-design/security +5, logging +5) | 126 |

All 53 pass `/approve-artifact` (zero FAIL) and are patch/minor-bumped.

**Audit results (clean):** zero old-scheme (`agentic-cookbook://`) stragglers;
all artifact `domain`s match their paths; of 1,222 internal cross-references,
**zero are genuinely broken** (the 7 flagged were illustrative examples in docs,
template placeholders, a deliberately-shown anti-pattern, and one `/*` wildcard).

**Remaining zero-reference artifacts (~167)** are intentionally uncited: the
original foundational principles (simplicity, yagni, dry, fail-fast, …) and the
ingredient/recipe composition specs (which reference other artifacts, not
external URLs). No source was fabricated for them — only researched sources were
wired in.

These Tier-1 sources were **not re-fetched on 2026-06-10** (unlike the Tier-2 and
design-token sources, which were re-verified live); they are the original
adversarially-audited research links, one day old at back-fill time.

---

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.2.0 | 2026-06-10 | Mike Fullerton | Reference audit: back-fill 53 artifacts (12 zero-ref + 41 enrich) with recovered Tier-1 sources |
| 1.1.0 | 2026-06-10 | Mike Fullerton | Verify all 4 Tier-2 clusters live (22 files) and record sources added + fixes |
| 1.0.0 | 2026-06-10 | Mike Fullerton | Recovered 365 Tier-1 sources from workflow journals; verified design-token cluster live |
