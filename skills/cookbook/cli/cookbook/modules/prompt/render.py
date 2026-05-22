"""Assemble the final prompt string from module/action/references."""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from .frontmatter import parse

_PLACEHOLDER_RE = re.compile(r"\{\{\s*(\w+)\s*\}\}")


class UnknownPlaceholderError(RuntimeError):
    """Raised when a template references a placeholder not in `params`."""


def render_template(body: str, params: dict[str, Any]) -> str:
    """Substitute `{{name}}` placeholders with values from `params`.

    Raises UnknownPlaceholderError if the template references a name not
    present in `params`.
    """

    def sub(match: re.Match[str]) -> str:
        name = match.group(1)
        if name not in params:
            raise UnknownPlaceholderError(name)
        return str(params[name])

    return _PLACEHOLDER_RE.sub(sub, body)


def _role_header(module_fm: dict[str, Any]) -> str:
    role = module_fm.get("role", "specialist")
    return f"You are a {role}."


def _load_references(refs_dir: Path) -> str:
    if not refs_dir.is_dir():
        return ""
    chunks: list[str] = []
    for path in sorted(refs_dir.rglob("*")):
        if not path.is_file() or path.name == ".gitkeep":
            continue
        rel = path.relative_to(refs_dir).as_posix()
        body = path.read_text(encoding="utf-8")
        chunks.append(f"## reference: {rel}\n\n{body.rstrip()}")
    return "\n\n".join(chunks)


def assemble_prompt(
    *,
    module_md_path: Path,
    references_dir: Path,
    action_md_path: Path,
    params: dict[str, Any],
    task: str,
) -> str:
    """Return the assembled prompt text."""
    module_parsed = parse(module_md_path.read_text(encoding="utf-8"))
    action_parsed = parse(action_md_path.read_text(encoding="utf-8"))

    template_params = dict(params)
    template_params.setdefault("task", task)

    parts: list[str] = []
    parts.append(_role_header(module_parsed.frontmatter))
    if module_parsed.body.strip():
        parts.append(module_parsed.body.strip())
    refs_text = _load_references(references_dir)
    if refs_text:
        parts.append(refs_text)
    parts.append(render_template(action_parsed.body, template_params).strip())
    parts.append(f"## Your task\n\n{task}")
    return "\n\n".join(parts) + "\n"
