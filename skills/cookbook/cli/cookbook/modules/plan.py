"""`cookbook plan` — guide the user through planning a recipe or small project.

Loads the bundled prompt template, fills in cookbook principles/conventions/glossary
context, collects the goal (CLI flag or interactive prompt), and shells to `claude -p`.
"""

from __future__ import annotations

from pathlib import Path

from ..core import prompts, refs
from ..core.errors import NoCookbookRootError
from ..core.shell import claude_available, claude_p

NAME = "plan"
HELP = "Plan a recipe or small project with LLM assistance."


def register(parser) -> None:
    parser.add_argument(
        "--goal",
        default=None,
        help="Recipe/project goal (skip the interactive prompt).",
    )


def _safe_read(p: Path) -> str:
    return p.read_text(encoding="utf-8") if p.exists() else "(not bundled)"


def _list_principles(principles_dir: Path) -> str:
    if not principles_dir.is_dir():
        return "(not bundled)"
    return "\n".join(f"- {p.stem}" for p in sorted(principles_dir.glob("*.md")))


def run(args, ctx) -> int:
    if ctx.cookbook_root is None:
        raise NoCookbookRootError(
            "Could not find a cookbook root. Run from inside a cookbook dir, or pass -p."
        )

    ctx.ui.title("cookbook plan")
    if not claude_available():
        ctx.ui.error("`claude` CLI is required for `cookbook plan`. Install it and retry.")
        return 2

    goal = args.goal or prompts.text("What do you want to plan?")
    if not goal:
        ctx.ui.warn("No goal provided. Nothing to plan.")
        return 0

    refs_dir = ctx.references_dir
    template = refs.prompt_template("plan")
    prompt = (
        template
        .replace("{{goal}}", goal)
        .replace("{{cookbook_root}}", str(ctx.cookbook_root))
        .replace("{{principles}}", _list_principles(refs_dir / "principles"))
        .replace("{{conventions}}", _safe_read(refs_dir / "conventions.md"))
        .replace("{{glossary}}", _safe_read(refs_dir / "glossary.md"))
    )

    ctx.ui.section("Plan")
    result = claude_p(prompt)
    if not result.ok:
        ctx.ui.error(f"claude failed: {result.stderr.strip()[:200]}")
        return 1
    ctx.ui.console.print(result.stdout.rstrip())
    return 0
