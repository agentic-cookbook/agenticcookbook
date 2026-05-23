"""Auto-discover modules in `cookbook.modules`.

Drop-in extensibility: add a file under `cookbook/modules/foo.py` with NAME, HELP,
register(subparsers), and run(args, ctx) — it auto-registers. No edits here.
"""

from __future__ import annotations

import importlib
import pkgutil
from types import ModuleType


def discover() -> list[ModuleType]:
    from . import modules as modules_pkg

    found = []
    for info in pkgutil.iter_modules(modules_pkg.__path__):
        name = info.name
        if name.startswith("_"):
            continue
        mod = importlib.import_module(f"cookbook.modules.{name}")
        if all(hasattr(mod, attr) for attr in ("NAME", "HELP", "register", "run")):
            found.append(mod)
    return sorted(found, key=lambda m: m.NAME)
