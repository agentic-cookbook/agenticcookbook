"""YAML frontmatter parser for prompt action and module files."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any

import yaml

_FRONTMATTER_RE = re.compile(r"\A---\s*\n(.*?)\n?---\s*\n?(.*)\Z", re.DOTALL)


@dataclass
class ParsedFile:
    frontmatter: dict[str, Any]
    body: str


@dataclass
class ParamSpec:
    name: str
    description: str
    default: Any | None
    required: bool

    @classmethod
    def from_dict(cls, name: str, raw: Any) -> "ParamSpec":
        if raw is None:
            raw = {}
        if not isinstance(raw, dict):
            raise ValueError(
                f"param '{name}' must be a YAML mapping (got {type(raw).__name__})"
            )
        return cls(
            name=name,
            description=str(raw.get("description", "")),
            default=raw.get("default"),
            required="default" not in raw,
        )


def parse(raw: str) -> ParsedFile:
    """Parse `raw` text into frontmatter dict + body string.

    If no frontmatter block is present, returns an empty dict and the full
    raw text as body.
    """
    match = _FRONTMATTER_RE.match(raw)
    if not match:
        return ParsedFile(frontmatter={}, body=raw)
    fm_raw, body = match.group(1), match.group(2)
    fm = yaml.safe_load(fm_raw) or {}
    if not isinstance(fm, dict):
        raise ValueError("frontmatter must be a YAML mapping")
    return ParsedFile(frontmatter=fm, body=body)


def params_from_frontmatter(fm: dict[str, Any]) -> list[ParamSpec]:
    """Build a list of ParamSpec from a frontmatter `params` mapping."""
    raw = fm.get("params") or {}
    if not isinstance(raw, dict):
        raise ValueError(
            f"'params' must be a YAML mapping (got {type(raw).__name__})"
        )
    return [ParamSpec.from_dict(name, body) for name, body in raw.items()]
