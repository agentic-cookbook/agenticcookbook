"""`cookbook plan` — guide the user through planning a recipe or project (v1 stub).

v1 behavior:
- Load the bundled plan prompt template.
- Collect a goal via interactive prompt.
- Shell to `claude -p` and stream the result.
- Iteration of the prompt content itself is deferred — extend `references-src/prompts/plan.md`.
"""

from __future__ import annotations

from ..core import prompts, refs
from ..core.errors import NoCookbookRootError
from ..core.shell import claude_available, claude_p

NAME = "plan"
HELP = "Plan a recipe or project with LLM assistance (stub)."


def register(parser) -> None:
    parser.add_argument(
        "--goal",
        default=None,
        help="Recipe/project goal (skip the interactive prompt).",
    )


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

    template = refs.prompt_template("plan")
    prompt = template.replace("{{goal}}", goal).replace(
        "{{cookbook_root}}", str(ctx.cookbook_root)
    )

    ctx.ui.section("Plan")
    result = claude_p(prompt)
    if not result.ok:
        ctx.ui.error(f"claude failed: {result.stderr.strip()[:200]}")
        return 1
    ctx.ui.console.print(result.stdout.rstrip())
    return 0
