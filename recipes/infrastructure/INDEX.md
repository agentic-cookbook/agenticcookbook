# Infrastructure Recipes

Recipes for cross-cutting infrastructure patterns like persistence, logging, and file system sync.

| File | Description |
|------|-------------|
| [directory-sync.md](directory-sync.md) | Lifecycle pattern for syncing an in-memory file tree with the filesystem via cache, full sync, watch, and surgical update |
| [logging.md](logging.md) | Centralized logging infrastructure with per-category static logger instances sharing one subsystem |
| [package-document.md](package-document.md) | Pattern for macOS document-based apps using directory bundle packages with SQLite databases and auto-save |
| [settings-keys.md](settings-keys.md) | Centralized settings key registry with dot-notation naming to prevent key duplication and scattered string literals |
| [window-frame-persistence.md](window-frame-persistence.md) | Invisible view modifier that persists window position and size between sessions via frame autosave |
