"""Interactive prompts via questionary. Used by modules that need user input."""

from __future__ import annotations

from .deps import require


def _q():
    return require("questionary")


def text(message: str, default: str = "") -> str:
    return _q().text(message, default=default).ask() or ""


def confirm(message: str, default: bool = True) -> bool:
    return bool(_q().confirm(message, default=default).ask())


def select(message: str, choices: list[str]) -> str:
    return _q().select(message, choices=choices).ask()


def checkbox(message: str, choices: list[str]) -> list[str]:
    return _q().checkbox(message, choices=choices).ask() or []
