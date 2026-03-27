# Analytics

All significant user actions MUST be instrumented via an `AnalyticsProvider` interface (`track(event, properties)`). No direct coupling to any analytics backend. Provide a logging-only default; swap in a backend (Mixpanel, Amplitude, PostHog) later. Each spec SHOULD define events in an **Analytics** section.

## Swift

Protocol + `os.log`-backed implementation as the default.

## Kotlin

Interface + `Timber`-backed implementation as the default.

## TypeScript

TypeScript interface + `console`-backed implementation as the default.

## C#

Interface + `ILogger`-backed implementation as the default. Same pattern as other platforms: no direct coupling to any analytics backend.
