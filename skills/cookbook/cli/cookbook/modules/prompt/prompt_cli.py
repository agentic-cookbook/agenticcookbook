"""`cookbook prompt <module> <action> ...` dispatcher.

The CLI assembles a domain-specialist prompt (role header + module
preamble + bundled cookbook references + action template + free-text task)
and prints it to stdout. No LLM is called from this code; the parent
Claude session acts on the printed prompt.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .frontmatter import parse, params_from_frontmatter
from .render import assemble_prompt, UnknownPlaceholderError

NAME = "prompt"
HELP = "Assemble an expert prompt for a specific module/action and print it."

PROMPTS_DIR = Path(__file__).parent / "prompts"


def register(parser: argparse.ArgumentParser) -> None:
    # NOTE: positional names avoid `module`/`action` because the top-level
    # cli.py uses `dest="module"` on its subparsers — adding a positional
    # named `module` here would overwrite that on the args namespace and
    # break cli.py's "if not args.module" check at the top of main().
    parser.add_argument(
        "pmodule",
        nargs="?",
        help="Prompt module (e.g., database). Omit to list available modules.",
    )
    parser.add_argument(
        "paction",
        nargs="?",
        help="Action within the module (e.g., design). Omit to list actions for the module.",
    )
    parser.add_argument(
        "rest",
        nargs=argparse.REMAINDER,
        help="Formal flags and free-text task (everything after <module> <action>).",
    )


def run(args, ctx) -> int:
    if not args.pmodule:
        return _list_modules(ctx)
    if not args.paction:
        return _list_actions(args.pmodule, ctx)
    return _render_action(args.pmodule, args.paction, args.rest, ctx)


def _list_modules(ctx) -> int:
    if not PROMPTS_DIR.is_dir():
        ctx.ui.warn(f"No prompt modules found at {PROMPTS_DIR}.")
        return 0
    names = sorted(p.name for p in PROMPTS_DIR.iterdir() if p.is_dir())
    ctx.ui.title("cookbook prompt — available modules")
    for name in names:
        ctx.ui.info(f"  {name}")
    return 0


def _list_actions(module: str, ctx) -> int:
    module_dir = PROMPTS_DIR / module
    actions_dir = module_dir / "actions"
    if not actions_dir.is_dir():
        ctx.ui.error(f"cookbook prompt: unknown module '{module}'.")
        return 2
    names = sorted(p.stem for p in actions_dir.glob("*.md"))
    ctx.ui.title(f"cookbook prompt {module} — available actions")
    for name in names:
        ctx.ui.info(f"  {name}")
    return 0


def _module_dir(module: str) -> Path:
    return PROMPTS_DIR / module


def _action_path(module: str, action: str) -> Path:
    return _module_dir(module) / "actions" / f"{action}.md"


def _render_action(module: str, action: str, rest: list[str], ctx) -> int:
    module_md = _module_dir(module) / "module.md"
    action_md = _action_path(module, action)
    refs_dir = _module_dir(module) / "references"

    if not module_md.is_file():
        ctx.ui.error(f"cookbook prompt: unknown module '{module}' (no module.md at {module_md}).")
        return 2
    if not action_md.is_file():
        ctx.ui.error(f"cookbook prompt {module}: unknown action '{action}' (no file at {action_md}).")
        return 2

    action_parsed = parse(action_md.read_text(encoding="utf-8"))
    specs = params_from_frontmatter(action_parsed.frontmatter)

    sub = argparse.ArgumentParser(
        prog=f"cookbook prompt {module} {action}",
        description=action_parsed.frontmatter.get("description", ""),
        add_help=True,
    )
    for spec in specs:
        kwargs = {"help": spec.description}
        if spec.required:
            kwargs["required"] = True
        else:
            kwargs["default"] = spec.default
        sub.add_argument(f"--{spec.name}", **kwargs)

    parsed, leftover = sub.parse_known_args(rest)
    params = {spec.name: getattr(parsed, spec.name) for spec in specs}
    task = " ".join(leftover).strip()
    if not task:
        ctx.ui.warn("cookbook prompt: empty task — assembled prompt will be low quality.")

    try:
        prompt = assemble_prompt(
            module_md_path=module_md,
            references_dir=refs_dir,
            action_md_path=action_md,
            params=params,
            task=task,
        )
    except UnknownPlaceholderError as e:
        ctx.ui.error(f"cookbook prompt {module} {action}: template references unknown placeholder '{{{{{e}}}}}'.")
        return 1

    sys.stdout.write(prompt)
    return 0
