# Cookbook Improvement Research (June 2026)

A record of the research that drove the June 2026 expansion of the Agentic
Developer Cookbook — the methodology, the findings, the adversarial corrections,
and how the findings translated into cookbook artifacts. The goal of the research
was to give the dev-team specialist agents sharper, more current direction.

The cookbook grew from **21 principles / 142 guidelines** to **27 principles /
240 guidelines / 19 ingredients / 12 recipes** as a direct result of this work.

---

## 1. Methodology

The research ran in two adversarially-verified rounds, each driven by a
multi-agent workflow rather than a single pass.

| Round | Question | Harness | Scale |
|-------|----------|---------|-------|
| **1 — Heuristic tensions** | Current (2018–2026) expert thinking on the tensions among core design heuristics (YAGNI, DRY, OCP/SOLID, reuse, hygiene, completeness) and how they apply to LLM coding agents | `deep-research` harness: decompose → fan-out web search → fetch → 3-vote adversarial verification → synthesize | 6 angles · 27 sources · 124 claims extracted · 25 verified (22 confirmed, 3 killed) · 12 synthesized · ~110 agent calls |
| **2 — Gap analysis** | What current best practice (2024–2026) is missing, outdated, or partial across 13 areas, mapped to dev-team specialists | Custom workflow: inventory cookbook + dev-team specialists → 13 parallel research agents → per-area gap analysis → **accuracy/currency auditor + completeness critic** → synthesis | 31 agents · 13 areas · per-gap confidence + sources |

Two quality mechanisms shaped the trustworthiness of the output:

- **Adversarial verification (round 1).** Each falsifiable claim was challenged
  by 3 independent skeptics; a claim survived only with a 2/3 majority. 3 of 25
  verified claims were killed.
- **Accuracy/currency audit + completeness critic (round 2).** A dedicated
  auditor downgraded single-vendor statistics, reframed contested heuristics as
  *defensible defaults* rather than consensus, merged duplicate gaps, and
  corrected misattributions/forecasts. A completeness critic then asked "what
  whole area did we miss?" — which surfaced four new domains (see §6).

This audit step is the reason the cookbook's new content **encodes durable
practice and marks volatile facts as forecasts**, rather than baking in
version-sensitive or vendor-marketing claims.

---

## 2. Round 1 — Design-heuristic tensions & AI-agent failure modes

The driving observation: the cookbook's existing principles (`yagni`,
`dry`, `design-for-deletion`) already matched modern expert consensus, so the
opportunity was to add **sharp new artifacts that cite and bound them**, plus to
encode the *AI-agent-specific* failure modes that make these heuristics matter
more, not less.

### 2.1 Heuristic consensus & dissent (verified)

| # | Finding | Confidence |
|---|---------|-----------|
| 1 | A **wrong abstraction is more expensive than duplication** — tolerate duplication until a pattern is proven (Rule of Three / AHA), don't abstract prematurely | high |
| 2 | Dissent: "duplication is cheaper than the wrong abstraction" is *overstated terminology* (a wrong abstraction is just bad code; duplication's cost is scenario-dependent) — but the causal mechanism holds | medium |
| 3 | A prominent **YAGNI-aligned strand** argues building flexibility for *anticipated* extension is rarely needed and almost always adds carrying cost — opposing speculative scaffolds | medium |
| 4 | There is **active, named criticism of the Open/Closed Principle and SOLID** ("OCP is wrong", "SOLID is not solid") in modern practice | medium |

> **Decision taken:** drop a standalone Open-Closed principle; fold the
> defensible kernels of SOLID and CUPID (Dan North) into existing principles
> (e.g. the open/closed kernel → `manage-complexity-through-boundaries`).

### 2.2 Reuse, build-vs-buy, supply chain (verified)

| # | Finding | Confidence |
|---|---------|-----------|
| 5 | **left-pad (2016)** is the canonical lesson that trivial micro-dependencies create systemic fragility | high |
| 6 | Freed dependency namespaces are an **immediate supply-chain attack surface** (republished under unknown code) | high |
| 7 | **Slopsquatting** (2024–2025): LLMs suggest plausible but non-existent package names that attackers register maliciously | high |
| 8 | Slopsquatting is practically exploitable: **~19.7% aggregate hallucination rate** across 16 LLMs (open models 21.7% vs commercial 5.2%), **43% of hallucinated names recur** on every re-run | high |

### 2.3 LLM-agent failure modes (verified)

These are the failure modes the cookbook's new guidance directly counters:

| # | Failure mode | Evidence | Confidence |
|---|---|---|---|
| 9 | **DRY erosion** — agents accumulate redundant/duplicated code while extending their own output | verbosity rises in ~75.5% of long-horizon trajectories | medium |
| 10 | **Hygiene / incomplete refactors** — "deletion phobia", "library aversion", structure erodes turn-over-turn | structural erosion rises in ~77% of trajectories | medium |
| 11 | **Dead/orphaned code** — old implementations linger; comments stripped as edit side-effects | — | medium |
| 12 | **Completeness / verification bottleneck** — agents shift review burden to humans (bigger PRs, lagging review) | only ~48% of devs always review AI code; review times up ~91%; ~98% more PRs | high |

> Stats above are reported as evidence with their sources; the round-2 auditor's
> rule (don't treat single-vendor numbers as law) applies — they motivate the
> guidance but are not load-bearing in the artifacts.

---

## 3. Round 2 — Gap analysis across 13 areas

> **Executive summary (audit-corrected).** The cookbook's weaknesses clustered
> in three places. **(1) AI-native practice:** no artifact on machine-targeted
> instruction files (AGENTS.md/CLAUDE.md), context/memory management,
> deterministic agent guardrails, or LLM/agentic security — striking for a
> cookbook whose purpose is AI-assisted codegen. **(2) Structural vocabulary in
> the principle layer:** coupling is discussed but never *ranked* (connascence);
> invariants are validated but not *encoded in types* (parse-don't-validate,
> errors-as-values); separation-of-concerns is one-sided. **(3) Server/backend &
> ops:** the data layer assumed embedded SQLite (no Postgres-era datastore
> selection, isolation, pooling, zero-downtime migrations, or vector/RAG
> retrieval); observability covered only logging/analytics (no SLO, RED/USE,
> tracing, incident response). Platform currency gaps (Swift 6, privacy
> manifests, Compose state/edge-to-edge, Core Web Vitals, WCAG 2.2) are real but
> mostly bounded additions. **Build the principle-layer and AI-native
> foundations first, then backend/observability, then platforms.**

### Gaps by area

| Area | Headline gap |
|------|--------------|
| **Engineering heuristics** | No gradable coupling vocabulary (connascence); no type-driven layer (parse-don't-validate, errors-as-values, value-objects); SoC one-sided (locality-of-behavior); descriptive laws absent (Hyrum's, Postel/RFC 9413, Demeter, Conway's) |
| **AI-native codebases** | AGENTS.md/CLAUDE.md, context/memory management, deterministic guardrails (harness engineering), code-for-the-AI-reader, spec-driven dev, eval-driven dev, agent install guardrails, small-diff discipline |
| **Web** | Core Web Vitals/INP, rendering-strategy, TypeScript strictness, server-vs-client state, WCAG 2.1→**2.2**, CSP Trusted Types, server-render input validation, modern CSS/Baseline, PWA |
| **Apple** | Swift 6 strict concurrency, SwiftData vs Core Data, **privacy manifest (App Store gate)**, App Intents, Swift Testing |
| **Windows** | UI-framework + deployment-model selection (UWP is *not* dead), ARM64, Win 11 materials, .NET target version, AOT/CsWinRT |
| **Android** | Compose state/UDF, Flow/StateFlow lifecycle, **edge-to-edge** (mandatory at targetSdk 35), Hilt, Room, predictive-back, Compose perf/stability, Nav3, Material 3, side-effects, KMP |
| **Database** | Datastore selection (Postgres default), transaction isolation + 40001 retry, connection pooling, zero-downtime expand/contract migrations, **pgvector hybrid retrieval**, advanced indexing, partitioning, CQRS/event-sourcing |
| **REST API** | Idempotency keys, OpenAPI design-first, versioning/deprecation (RFC 8594 Sunset), API-style selection, ETag/If-Match concurrency, sender-constrained tokens (DPoP/mTLS, RFC 9700) |
| **MCP** | Server design (primitives/structured output/annotations), server security (tool poisoning, rug-pull, token passthrough), input validation, review checklist, server recipe |
| **Security** | **OWASP LLM Top 10**, supply-chain integrity (SBOM/SLSA/signing), threat modeling (STRIDE), EPSS/KEV vuln prioritization, passkeys/WebAuthn |
| **Observability** | SLO/error budgets, RED/USE metrics, distributed tracing (OTel/W3C), OpenTelemetry logging, incident response, progressive delivery, continuous profiling |
| **Testing** | Contract testing, frame for verifying AI-generated code, test-pyramid→trophy reframe, snapshot discipline, flaky-test quarantine, fuzzing, ephemeral environments |
| **Product iteration** | **Steel-thread-first** (walking skeleton), **deliberate/prudent technical debt**, trunk-based development, continuous delivery, DORA, fitness functions, definition-of-done |

---

## 4. What the audit said *not* to do

The accuracy auditor explicitly flagged these as wrong-by-default. They were
**deliberately excluded** (or shipped only in a bounded/caveated form):

- **Don't elevate "15-Factor / Telemetry" to a principle** — a single vendor's
  extension, not a standard; the principle set is deliberately small.
- **Don't cite single-vendor stats as fact** (the "1.7× buggier AI PRs", the
  eval "60%→25% under 8-run consistency") — keep the disciplines, drop the
  numbers as load-bearing.
- **Don't tell teams "UWP is dead, port now"** — UWP is feature-frozen but *not*
  deprecated (still recommended for Xbox/Surface Hub/HoloLens); WPF is fully
  supported.
- **Don't blanket-adopt Material 3 Expressive / alpha tech** — pin versions,
  mark as forecast.
- **Don't mandate Native AOT, partitioning, CQRS/event-sourcing, or fuzzing
  broadly** — gate each on a measured trigger.
- **Don't chase WCAG 3.0** — a Working Draft with an unknowable timeline; target
  WCAG 2.2 AA.

These became the cookbook's **citation/currency house style**: encode the
durable rule, attribute-and-date version-sensitive facts sparingly, mark
roadmap items as forecasts, and frame measured-need optimizations conditionally.

---

## 5. From research to artifacts

The findings translated directly into cookbook content:

- **5 new principles** for the structural-vocabulary gap: `connascence`,
  `parse-dont-validate` (make illegal states unrepresentable), `errors-as-values`,
  `steel-thread-first`, `deliberate-prudent-debt` — plus `conways-law`. Existing
  principles were revised to fold in the SOLID/CUPID kernels and a
  locality-of-behavior counterweight.
- **AI-native guidelines**: agent-instruction-files, context-and-memory-management,
  verification-harness, eval-driven-development, code-for-the-ai-reader,
  spec-driven-development.
- **Backend/data/API/MCP/observability/security/testing/product** guidelines for
  every high-confidence gap above.
- **Platform currency**: Swift 6, privacy manifest, SwiftData-vs-Core-Data;
  Compose state/edge-to-edge/Hilt/Room/Flow; Core Web Vitals, TS strictness,
  state-management; Windows UI-framework selection — with the audit's guardrails
  applied throughout.
- The owner's six original themes (encapsulation/cohesion, reuse, hygiene,
  completeness, tuned-YAGNI) shipped as `code-hygiene`, `completeness`,
  `value-objects`, and `reuse-before-build`.

The cookbook's domain scheme was subsequently rebranded
`agentic-cookbook://` → `agenticdevelopercookbook://`.

---

## 6. Future-work areas surfaced by the completeness critic

The completeness critic flagged four whole domains the gap analysis hadn't
covered. **All four were subsequently built** as new guideline clusters:

1. **Infrastructure-as-code & containers** — IaC, immutable infrastructure,
   containerization, Kubernetes workloads/config, 12-factor config, image security.
2. **Data privacy & regulatory compliance** — GDPR/CCPA regulations, privacy-by-design,
   DSAR/data-subject-rights, consent management, PII handling, retention/deletion.
3. **Cross-platform design tokens** — design-tokens, distribution, theming-with-tokens,
   cross-platform adaptation.
4. **Agent evaluation & safety** — agent-evaluation-and-safety, groundedness/hallucination
   checks, tool-call evaluation, agent guardrails, LLM red-teaming.

Remaining open questions (process-level, deferred to the owner): house policy
for citing fast-moving figures; co-ownership of artifacts across specialists; and
whether behavioral agent painpoints (don't-write-to-prod, don't-stall) belong in
the dev-team harness/rules rather than cookbook content.

---

## 7. Key sources

Round 1 drew on 27 sources; round 2 cited per-gap. Representative anchors:

- **Abstraction/DRY** — Sandi Metz, "The Wrong Abstraction"; Kent C. Dodds, "AHA Programming"; Wikipedia, "Rule of three".
- **OCP/SOLID critique** — Copeland, "Open/Closed Principle is … wrong"; "Say no to the Open/Closed pattern".
- **CUPID** — Dan North, "CUPID — for joyful coding".
- **Supply chain** — Wikipedia, "npm left-pad incident"; The Register / Snyk on slopsquatting; "A little copying is better than a little dependency".
- **AI-agent failure modes** — SlopCodeBench and related preprints (arXiv 2603.24755, 2602.17091); addyo.substack "the 80% problem in agentic coding".
- **Round-2 standards** — OWASP Top 10 for LLM Applications (2025); RFC 9457 (Problem Details), RFC 9413 (robustness reconsidered), RFC 8594 (Sunset), RFC 9700 (OAuth BCP); WCAG 2.2; web.dev INP / Core Web Vitals; Model Context Protocol spec.

*Full machine-readable research outputs (findings, per-area gaps, sources,
refuted claims, audit corrections) were produced by the deep-research and
gap-analysis workflows during the June 2026 effort.*

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial research record |
