# GUIDE-12.7. Logging Section

Every behavioral spec MUST include a Logging section with exact log messages. This enables verification by grepping output rather than visual inspection.

Format: `Subsystem: {{org_package}} | Category: ComponentName`

```markdown
## Logging

Subsystem: `{{bundle_id}}` | Category: `ComponentName`

| Event | Level | Message |
|-------|-------|---------|
| Tap | debug | `ComponentName: tapped, starting async action` |
| Action success | debug | `ComponentName: async action completed (success, {duration}ms)` |
| Action failure | debug | `ComponentName: async action failed ({error})` |
| State change | debug | `ComponentName: state changed to {state}` |
```
