---
id: 61ca76a4-0188-488b-9ac6-1144ca8ed506
title: "AI Processing Node"
domain: agenticdevelopercookbook://recipes/infrastructure/ai-processing-node
type: recipe
version: 1.0.0
status: review
language: en
created: 2026-06-28
modified: 2026-06-28
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Platform-agnostic spec for a pull-model AI job worker that claims jobs from the adh backend, runs handlers, renews leases, and reports results with at-least-once idempotency."
platforms:
  - macos
  - swift
  - typescript
tags:
  - infrastructure
  - ai-jobs
  - worker
  - polling
depends-on: []
related:
  - agenticdevelopercookbook://recipes/infrastructure/directory-sync
references:
  - https://datatracker.ietf.org/doc/html/rfc2119
approved-by: ""
approved-date: ""
---

# AI Processing Node

## Overview

An AI processing node is a long-running worker that continuously pulls AI jobs from the `adh` backend, executes each job through a registered handler, renews the job's server-side lease while working, and reports either a structured result or a retryable failure.

This recipe specifies **shared business logic only** — it is intentionally platform-agnostic. Two implementations satisfy it simultaneously: a Swift macOS daemon used as a development node, and a TypeScript service deployed as the production node. Neither implementation language appears in the requirements below; platform-specific guidance lives in [Platform Notes](#platform-notes).

**Scope:** this recipe covers the poll-claim loop, lease heartbeat, handler dispatch, result reporting, idempotency contract, and LLM backend selection. It does not cover job schema evolution, backend authentication/credential rotation, or the backend API itself.

## Terminology

| Term | Definition |
|------|-----------|
| Node | A single running instance of this worker |
| Job | A unit of work queued on the backend, identified by a UUID `id` and a string `type` |
| Claim | The act of atomically reserving one or more jobs for exclusive processing |
| Lease | A server-managed time window during which the node has exclusive ownership of a claimed job |
| Heartbeat | A periodic renewal call that extends the current lease |
| Handler | A function registered for a specific job type that accepts a typed payload and returns a typed result |
| Dead-letter | A terminal failure state the backend applies after a job exceeds its max retry attempts |
| LLM backend | The inference provider a handler uses: a local model server, a hosted API, or a CLI tool |

## Behavioral Requirements

### Poll-Claim Loop

- **poll-claim**: The node MUST claim work by sending a batch claim request to the backend (pull model), passing the set of job types it supports and a maximum batch size. The backend atomically reserves and returns up to that many matching pending jobs. An empty result (zero jobs returned) MUST be treated as a no-op — the loop continues without producing side effects or logging spurious errors.

- **supported-types-static**: The set of job types a node can handle MUST be declared at startup from configuration and MUST NOT change during a run. The node MUST NOT claim a job whose type it cannot handle.

- **loop-continuity**: The poll-claim loop MUST run continuously. A single job failure, a lease loss, or a handler panic MUST NOT terminate the loop; the node logs the incident and continues to the next poll iteration.

- **poll-interval**: Between claim attempts that return zero jobs, the node SHOULD wait a configurable backoff interval (default 5 seconds) before polling again to avoid hammering an idle queue.

### Lease Heartbeat

- **lease-heartbeat**: While processing a claimed job, the node MUST renew the job's lease by sending a heartbeat to the backend at an interval of approximately one-third of the lease duration. The heartbeat interval MUST be derived from the lease duration returned with the claim response, not hardcoded.

- **lost-lease-abort**: If a heartbeat response indicates the lease is no longer valid (expired, stolen, or cancelled), the node MUST stop all work on that job immediately, discard any partial result, and NOT call the complete or fail endpoint. The job will be re-queued by the backend.

- **heartbeat-stop-on-terminal**: The node MUST stop sending heartbeats as soon as it calls complete or fail for a job.

### Handler Dispatch

- **run-handler**: The node MUST dispatch each claimed job to a handler registered for that job's `type` field. The handler receives the job's `payload` deserialized to the handler's declared input type. The dispatch table MUST be populated at startup from registered handlers; runtime registration is not required.

- **unknown-type-fail**: If no handler is registered for a job's `type`, the node MUST immediately report failure with `retryable: false`. The job MUST NOT be retried and MUST be sent to dead-letter by the backend. The node MUST NOT crash or halt the loop.

- **handler-timeout**: Each handler invocation SHOULD be subject to a configurable per-handler timeout. If a handler exceeds its timeout, the node MUST treat the invocation as a handler error (see `fail-with-backoff`).

### Result Reporting

- **complete-on-success**: On handler success, the node MUST report job completion to the backend, passing the handler's structured result as the job result payload. The node MUST wait for the backend's acknowledgement before releasing the job from local tracking.

- **fail-with-backoff**: On handler error (exception, timeout, or non-recoverable condition), the node MUST report job failure to the backend with `retryable: true`. The backend is solely responsible for applying exponential backoff and enforcing the max-attempts dead-letter policy; the node MUST NOT implement retry logic locally. One failing job MUST NOT halt the poll-claim loop.

### Idempotency

- **idempotency**: Handlers MUST be safe to run more than once for the same job ID and target (leases can expire mid-run and the same job may be re-claimed by any node). A handler MUST produce no duplicate side effects on repeated invocation — if the operation was already applied, the handler MUST detect this and return the same result without re-applying. Calling complete or fail for a job that has already reached a terminal state MUST be accepted gracefully; the node MUST NOT treat such a response as an error.

### LLM Backend

- **llm-backend-selectable**: The node MUST support selecting which LLM backend executes a handler's inference step via configuration (e.g., an environment variable or config file), with no code changes required to switch. Supported backend kinds include at minimum: an OpenAI-compatible HTTP API endpoint (local model server or hosted), and a CLI-based inference tool invoked as a subprocess.

- **structured-output**: Handlers that invoke the LLM MUST request schema-constrained (structured) output from the backend rather than parsing free-form text. The output schema MUST be defined per handler and validated before the handler returns its result.

## The `categorize_and_tag` Handler

This is the primary concrete handler shipped with the node. It categorizes and tags a piece of content using the configured LLM backend.

### Input (job payload)

```json
{
  "title": "string",
  "body":  "string"
}
```

### Output (job result)

```json
{
  "category":   "string",
  "tags":       ["string"],
  "confidence": 0.0
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `category` | Yes | The single best-fit category string. The backend maps this to its categories store. |
| `tags` | Yes | Zero or more keyword strings. The backend maps these to its keywords store. |
| `confidence` | No | Advisory float in [0,1] expressing the LLM's self-reported confidence. The backend treats this as informational only. |

**Schema-constrained output rule** (`structured-output`): the handler MUST pass a JSON Schema (or equivalent structured-output constraint) for the result object when invoking the LLM. It MUST NOT parse category or tags from free-form text.

**Idempotency rule** (`idempotency`): categorizing the same `(title, body)` pair a second time MUST produce no additional writes if the backend already holds a result for this job ID.

## Integration Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| `apn-001` | `poll-claim`, `run-handler`, `complete-on-success` | Backend queue contains one `categorize_and_tag` job with `{ "title": "How to prune roses", "body": "..." }` | Node claims the job, handler executes, node calls complete with `{ category, tags, confidence? }`, job moves to done state on backend |
| `apn-002` | `run-handler`, `fail-with-backoff`, `loop-continuity` | Handler for `categorize_and_tag` throws an unrecoverable error | Node calls fail with `retryable: true`; loop continues; next poll iteration proceeds normally |
| `apn-003` | `unknown-type-fail` | Backend queue contains a job with `type: "transcribe_audio"` and node has no handler for that type | Node immediately calls fail with `retryable: false`; job goes to dead-letter; loop continues |
| `apn-004` | `lease-heartbeat`, `complete-on-success` | Handler takes longer than one heartbeat interval (e.g., 40s LLM call on a 30s lease) | At least one heartbeat is sent before the complete call; job lease remains valid throughout; complete succeeds |
| `apn-005` | `idempotency` | Same job is claimed twice (simulated lease expiry mid-run); handler completes on the second claim | Backend result is identical to first completion; no duplicate category or tag entries created |
| `apn-006` | `poll-claim`, `loop-continuity` | Backend queue is empty | Claim returns zero jobs; no complete/fail calls made; loop waits the poll interval and polls again |
| `apn-007` | `lost-lease-abort` | Heartbeat response returns lease-invalid (e.g. 409 Conflict) mid-handler | Node cancels handler execution, does NOT call complete or fail, logs lease loss, continues loop |

## Edge Cases

- **Network partition during complete**: if the complete or fail call fails with a transient network error, the node SHOULD retry that specific HTTP call with limited exponential backoff before giving up. Abandoning without reporting is preferable to a tight retry storm; the job will eventually be re-queued when the lease expires.
- **Handler returns before first heartbeat interval**: heartbeat goroutine/timer MUST be cancelled before calling complete so no heartbeat fires after the terminal call.
- **LLM backend returns invalid schema**: the handler MUST fail the job with `retryable: true` rather than passing a malformed result to complete.
- **Startup with empty handler registry**: the node MUST log a warning and start normally; it will claim no jobs (no supported types), poll an empty result, and idle.
- **Clock skew between node and backend**: heartbeat interval MUST be derived from the backend-reported lease duration, not the node's wall clock, to tolerate moderate skew.
- **Large batch with mixed types**: the node SHOULD process jobs in the batch concurrently up to a configurable concurrency limit, with each job's heartbeat running independently.

## Platform Notes

### Swift macOS Daemon (Development Node)

- Implemented as a launchd-managed background process (`launchd` plist, `KeepAlive: true`).
- The poll-claim loop runs on a dedicated `Task` (Swift Concurrency). Each job is processed in its own child `Task`, bounded by a `TaskGroup` limited to the configured concurrency ceiling.
- Lease heartbeat: a `Task` that loops `try await Task.sleep(for: heartbeatInterval)` until cancelled. Cancel it by calling `.cancel()` on the heartbeat task before reporting complete/fail.
- LLM backend selection: read from a `.env` file or `UserDefaults` key `com.adh.node.llmBackend`. A local model server (e.g., Ollama via OpenAI-compat endpoint) is the default for development.
- Structured output: use the `/v1/chat/completions` endpoint with `response_format: { type: "json_schema", json_schema: { schema: ... } }` when the model supports it; fall back to a `json_object` response type with system-prompt schema injection.
- Logging: use `os.Logger` with subsystem `com.adh.node` and category per handler.

### TypeScript Service (Production Node)

- Implemented as a Node.js long-running process, containerized and managed by the deployment platform (e.g., Docker / Kubernetes Deployment).
- The poll-claim loop runs as an `async` loop with `await`-based polling. Each job is dispatched to a `Promise`-based handler; a `p-limit` semaphore or equivalent caps concurrency.
- Lease heartbeat: a `setInterval` timer started immediately after claim, cleared in a `finally` block that fires whether complete, fail, or error terminates the handler.
- LLM backend selection: `LLM_BACKEND_KIND` and `LLM_BACKEND_URL` environment variables. Production uses a hosted API (e.g., Anthropic API via OpenAI-compatible shim, or the native Anthropic SDK). See `agenticdevelopercookbook://recipes/infrastructure/ai-processing-node#design-decisions/llm-backend-env`.
- Structured output: use the provider's native structured-output parameter (`response_format` or `tools` with a single schema-constrained tool) to avoid parsing free text.
- Logging: structured JSON to stdout (`pino` or equivalent), consumed by the deployment platform's log aggregator.

## Design Decisions

**Decision**: Pull model (node polls for jobs) rather than push model (backend pushes to node).
**Rationale**: Pull tolerates node restarts without message loss, scales horizontally without a broker, and lets each node self-throttle by controlling its batch size. At the scale of a development or small production node, the polling overhead is negligible.
**Approved**: pending

**Decision**: Lease + heartbeat rather than a one-shot acknowledgement.
**Rationale**: Long-running LLM inference can take tens of seconds to minutes. A one-shot ack with no keepalive would require the backend to set an unrealistically long timeout or risk never detecting a crashed node. Heartbeats let the backend detect node loss in one heartbeat interval.
**Approved**: pending

**Decision**: Heartbeat interval is one-third of the lease duration (not one-half or fixed).
**Rationale**: One-third gives two missed heartbeats before the lease expires, tolerating transient network hiccups without prematurely losing the lease. One-half leaves only one miss, which is too tight; fixed intervals couple the node to backend config.
**Approved**: pending

**Decision**: `retryable: false` on unknown job type (immediate dead-letter).
**Rationale**: An unknown type means no handler will ever exist on this node for that job. Retrying would exhaust the max-attempts counter with no chance of success and delay the operator seeing the misconfiguration. Dead-letter with a clear error is faster feedback.
**Approved**: pending

**Decision**: LLM backend selected by configuration, not by handler code.
**Rationale**: The `categorize_and_tag` handler (and future handlers) must run unmodified on both the Swift dev node (local model) and the TypeScript prod node (hosted API). Injecting the backend as a configured dependency keeps handler code platform-agnostic and testable with a stub.
**Approved**: pending

**Decision**: Idempotency is a handler contract, not enforced by the node framework.
**Rationale**: Only the handler knows what constitutes a duplicate side effect for its domain. The node framework can detect a duplicate job ID (already in terminal state on the backend) and skip re-running, but fine-grained deduplication (e.g., "did I already write this category?") requires handler-level logic.
**Approved**: pending

## Compliance

| Check | Status | Category |
|-------|--------|----------|
| [secure-log-output](agenticdevelopercookbook://compliance/security#secure-log-output) | passed | Security |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-28 | Mike Fullerton | Initial recipe — platform-agnostic spec for the AI processing node with poll-claim, heartbeat, handler dispatch, idempotency, and categorize_and_tag handler |
