# Infrastructure Ingredients

Atomic infrastructure patterns for persistence, logging, and settings.

| File | Description |
|------|-------------|
| [logging.md](logging.md) | Centralized logging infrastructure with per-category static logger instances sharing one subsystem |
| [settings-keys.md](settings-keys.md) | Centralized settings key registry with dot-notation naming to prevent key duplication and scattered string literals |
| [window-frame-persistence.md](window-frame-persistence.md) | Invisible view modifier that persists window position and size between sessions via frame autosave |
