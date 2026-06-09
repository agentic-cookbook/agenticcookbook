---

id: a1d4578f-aceb-4a87-8fa4-b57a89e80763
title: "Cross-Cutting Detection"
domain: agenticdevelopercookbook://guidelines/planning/code-quality/cross-cutting-detection
type: guideline
version: 1.0.3
status: accepted
language: en
created: 2026-04-07
modified: 2026-06-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Distinguish concerns that span all scope groups (cross-cutting — do not isolate) from shared infrastructure that is itself a coherent group."
platforms:
  - csharp
  - ios
  - kotlin
  - typescript
  - web
  - windows
tags:
  - codebase-decomposition
depends-on: []
related: []
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: 2026-06-09
triggers:
  - code-review
  - new-module
---

# Cross-Cutting Detection

Some code appears everywhere. Logging calls exist in every file. Error handling patterns repeat across every service. Analytics events fire from every user action. These are cross-cutting concerns — they cut across the grain of the architecture rather than residing in a single layer. The critical distinction is between concerns that are truly cross-cutting (woven into every group and impossible to isolate) and concerns that look cross-cutting but are actually shared infrastructure with clear ownership. Getting this wrong in either direction distorts the scope group map.

## Signals and Indicators

**Logging — the canonical cross-cutting concern:**

- `Logger.log()`, `os.log()`, `NSLog()`, `Log.d()`, `console.log()`, `_logger.LogInformation()` — logging calls scattered through every file are not a scope group; they are woven in
- A centralized `LogManager` or `Logger` configuration file that sets up log destinations IS shared infrastructure — classify as a single `Logging Infrastructure` unit
- The test: would removing all log calls from a scope group break its logic? No. Logging is decoration, not behavior.

**Error handling:**

- `do/catch`, `try/except`, `try/catch`, `.catch {}` — error handling is structural to the language, not a cross-cutting concern unto itself
- A centralized `ErrorHandler` that receives errors from all layers and routes them (to UI, analytics, retry logic) IS shared infrastructure — it has its own logic and state
- Custom error types / `enum AppError` — shared error taxonomy is shared infrastructure if it is used across 3+ scope groups
- The test: does every scope group need to know about the `ErrorHandler` explicitly? If yes, it may be an anti-pattern (forced coupling). If error types are passed as values, the error taxonomy is shared data, not cross-cutting behavior.

**Analytics instrumentation:**

- `Analytics.track("event_name", properties: [...])` calls scattered across UI and business logic — cross-cutting concern; the call sites are not a scope group
- The `Analytics` service / SDK wrapper itself — shared infrastructure with a clear boundary
- Event definition files (`AnalyticsEvents.swift`, `events.ts`) — shared data definitions; belong with the analytics infrastructure, not split across callers
- The test: if you removed all analytics calls, would each scope group still function correctly? Yes — analytics is observational, not behavioral.

**Authentication checks:**

- `guard isAuthenticated else { return }` scattered in individual handlers — these are policy enforcement points, not a scope group
- A centralized `AuthMiddleware`, `AuthGuard`, `SessionManager`, or `TokenRefreshInterceptor` with its own lifecycle and state — this IS a scope group (security infrastructure)
- The test: does removing the auth check break the underlying feature logic? No — the feature works; it just runs without access control. Auth checks are policy, not logic.

**Caching layers:**

- Cache read/write calls inside service implementations (`if let cached = cache[key] { return cached }`) — this is an optimization woven into the service; not a cross-cutting concern in the same sense as logging, but also not a separate scope group
- A dedicated caching service — `CacheService`, `ImageCache`, `ResponseCache` — with its own eviction policy and invalidation logic IS shared infrastructure
- The test: could you remove the caching layer and have everything still work correctly (just slower)? Yes — caching is an optimization. If removing it breaks correctness (not just performance), it is not a cache but a source of truth.

**Retry logic:**

- Inline retry loops within individual network calls — part of the networking layer, not cross-cutting
- A centralized `RetryPolicy` or `RetryInterceptor` applied to all outgoing requests — shared infrastructure belonging to the networking scope group
- The test: would removing retry logic break features? No — features would fail on transient errors instead of succeeding, but the logic is unchanged.

**Dependency injection containers:**

- A DI container that wires together all scope groups is a composition root — it is not itself a scope group in the functional sense, but it is a file (or files) that must be cataloged separately as the bootstrap/wiring layer

**Distinguishing cross-cutting from shared infrastructure:**

| Concern | Cross-cutting (do NOT isolate) | Shared infrastructure (IS its own scope group) |
|---|---|---|
| Logging | Log call sites throughout code | Logger configuration, log routing, log formatters |
| Analytics | Event tracking call sites | Analytics SDK wrapper, event schema definitions |
| Error handling | Try/catch at call sites | Centralized error router, custom error taxonomy |
| Auth | Auth checks at handler entry points | SessionManager, TokenRefreshService, AuthGuard |
| Caching | Cache lookups inline in services | CacheService with eviction and invalidation logic |
| Retry | Inline retry loops | RetryPolicy, RetryInterceptor applied globally |

**The definitive test for cross-cutting vs shared infrastructure:**

Ask: "Does this code have its own state, lifecycle, or logic — or does it exist only as calls woven into other code?" Code with its own state, lifecycle, or meaningful logic is shared infrastructure. Code that is only call sites in other modules is cross-cutting.

## Boundary Detection

1. **Cross-cutting concerns are noted, not isolated.** When a concern appears across all scope groups, note it in findings as cross-cutting and move on. Do not create a scope group whose members are "all the places that call log()".
2. **Shared infrastructure gets exactly one scope group.** If a concern has its own files (a Logger class, a SessionManager), those files form one scope group. The call sites in other groups are dependencies on this group, not members of it.
3. **Logging infrastructure vs logging call sites.** The `OSLog` / `Logger` configuration file is infrastructure. The `os.log("did the thing")` call in a view controller is not.
4. **Pervasive coupling is an architectural smell, not a decomposition strategy.** If every scope group directly calls a `GlobalSingleton`, note the anti-pattern — the solution is to inject the dependency, not to merge all groups into one because they share the dependency.
5. **Security/auth infrastructure is always its own scope group.** Never treat auth enforcement as merely cross-cutting — the SessionManager and token lifecycle have real behavior and state and warrant their own scope group (separate from where auth checks are enforced).

## Findings Format

```
CROSS-CUTTING DETECTION FINDINGS
==================================

Cross-Cutting Concerns (not scope groups — call sites are woven in):
  - <Concern> — call sites in <n> files across <m> candidate groups
    Infrastructure file(s): <list> — these ARE shared infrastructure (see below)

Shared Infrastructure Scope Groups (distinct from call sites):
  - <Name> — files: <list>
    Reason it is infrastructure, not cross-cutting: <one sentence>
    Consumed by: <n> other scope groups

Coupling Anomalies (pervasive anti-patterns):
  - <description — e.g., "Analytics.shared accessed in 23 files with no abstraction layer — recommend wrapping in an injected AnalyticsService">

DI / Composition Root:
  - <file(s)> — wires together: <list of scope groups>

Recommended Scope Group Candidates (infrastructure only):
  - <Name> — <one-line rationale>

Concerns to Exclude from Scope Group Map (truly cross-cutting):
  - <list of concerns that are only call sites and should not form scope groups>
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.3 | 2026-06-09 | Mike Fullerton | Add Change History table and approval metadata |
| 1.0.0 | 2026-04-07 | Mike Fullerton | Initial creation |