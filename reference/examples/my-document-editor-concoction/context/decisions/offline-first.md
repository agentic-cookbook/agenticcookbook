# Decision: Offline-First Architecture

## Status

Accepted

## Context

The document editor needs to work reliably regardless of network connectivity. Users expect to open, edit, and save documents without an internet connection.

## Decision

The app will be offline-first with local document storage. iCloud sync is optional and additive — the app is fully functional without it.

## Consequences

- Documents are always stored locally first
- iCloud sync, if enabled, runs in the background and handles conflicts
- No features are gated on network availability
