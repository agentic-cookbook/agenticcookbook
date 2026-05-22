"""Cookbook root resolution.

Rules:
1. Explicit --path wins. Validate it looks like a cookbook (or is empty/missing for `create`).
2. If cwd contains `cookbook/index.md`, that subdir is the root (typical agenticcookbook layout).
3. Walk up from cwd; first dir with `index.md` AND any canonical subdir is the root.
4. Return None when nothing is found — `create` is allowed without a root; other modules error.
"""

from __future__ import annotations

from pathlib import Path

CANONICAL_SUBDIRS = (
    "recipes",
    "reference",
    "principles",
    "guidelines",
    "ingredients",
)


def _looks_like_cookbook(d: Path) -> bool:
    return any((d / sub).is_dir() for sub in CANONICAL_SUBDIRS)


def resolve(start: Path, explicit: Path | None = None) -> Path | None:
    if explicit is not None:
        p = explicit.expanduser().resolve()
        return p if p.is_dir() else None

    start = start.resolve()
    child = start / "cookbook"
    if (child / "index.md").exists() and _looks_like_cookbook(child):
        return child

    for d in (start, *start.parents):
        if (d / "index.md").exists() and _looks_like_cookbook(d):
            return d

    return None
