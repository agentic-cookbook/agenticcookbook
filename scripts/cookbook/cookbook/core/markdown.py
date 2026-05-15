"""Walk a cookbook tree and read/write markdown files."""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

SKIP_NAMES = {"index.md", "INDEX.md", "references.md", "_template.md"}


def iter_markdown(root: Path, skip_dirs: Iterable[str] = ()) -> list[Path]:
    skip = set(skip_dirs)
    out: list[Path] = []
    for p in sorted(root.rglob("*.md")):
        if p.name in SKIP_NAMES:
            continue
        if any(part in skip for part in p.relative_to(root).parts):
            continue
        out.append(p)
    return out
