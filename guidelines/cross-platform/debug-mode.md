# Debug Mode

Apps MUST include a debug-only configuration panel (not in release builds) with:

- Feature flag overrides
- Analytics event log
- A/B test variant picker
- Environment info (version, build, OS, device)

## TypeScript

Access via `/debug` route or keyboard shortcut (`Ctrl+Shift+D`), guarded by `process.env.NODE_ENV === 'development'`.

## Windows

Dev-only settings page guarded by `#if DEBUG`:

- Feature flag overrides
- Analytics event log
- Environment info (app version, OS version, device)
- Access via navigation menu item visible only in debug builds
