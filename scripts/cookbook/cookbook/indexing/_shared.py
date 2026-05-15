"""Shared helpers for index strategies."""

from __future__ import annotations

import uuid
from datetime import date
from pathlib import Path

from ..core.deps import require
from ..core.frontmatter import parse

yaml = require("yaml")

SKIP_FILENAMES = {"index.md", "INDEX.md", "references.md", "_template.md"}


def title_of(path: Path) -> str:
    """Frontmatter `title` if present; else humanized filename stem."""
    if path.exists():
        fm = parse(path.read_text(encoding="utf-8"))
        if fm.had_frontmatter and isinstance(fm.data.get("title"), str):
            return fm.data["title"]
    return path.stem.replace("-", " ").replace("_", " ").title()


def iter_artifacts(d: Path) -> list[Path]:
    """All `*.md` under `d`, skipping reserved index/template files."""
    return sorted(
        p for p in d.rglob("*.md")
        if p.name not in SKIP_FILENAMES
    )


def merge_index_frontmatter(
    output_path: Path,
    *,
    title: str,
    domain: str,
    summary: str,
    today: date,
    type_: str = "reference",
) -> dict:
    """Return frontmatter dict for an INDEX.md. Preserves id+created when one exists."""
    data: dict = {}
    if output_path.exists():
        fm = parse(output_path.read_text(encoding="utf-8"))
        if fm.had_frontmatter:
            data = dict(fm.data)
    today_s = today.isoformat()
    base = {
        "id": data.get("id") or str(uuid.uuid4()),
        "title": title,
        "domain": domain,
        "type": type_,
        "version": data.get("version") or "1.0.0",
        "status": data.get("status") or "draft",
        "language": data.get("language") or "en",
        "created": data.get("created") or today_s,
        "modified": today_s,
        "author": data.get("author", ""),
        "copyright": data.get("copyright", f"{today.year}"),
        "license": data.get("license") or "MIT",
        "summary": summary or data.get("summary", ""),
    }
    # preserve any extras
    for k, v in data.items():
        if k not in base:
            base[k] = v
    return base


def render_frontmatter(data: dict) -> str:
    return "---\n" + yaml.safe_dump(data, sort_keys=False, allow_unicode=True) + "---\n"


def cookbook_name(root: Path) -> str:
    return root.name
