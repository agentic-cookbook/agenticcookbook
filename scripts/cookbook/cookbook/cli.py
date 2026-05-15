"""Top-level CLI entry point.

Usage:
    cookbook [--help] [-p PATH] [--version] <module> [module-args]
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from . import __version__
from .core import refs, roots
from .core.errors import CookbookError
from .core.ui import UI
from .modules._base import CookbookContext
from .registry import discover


def _build_parser(modules):
    parser = argparse.ArgumentParser(
        prog="cookbook",
        description="Create and maintain cookbook directories (recipes, reference, indexes).",
    )
    parser.add_argument(
        "-p", "--path",
        type=Path,
        default=None,
        help="Path to the cookbook dir (defaults to discovery from cwd).",
    )
    parser.add_argument(
        "--version",
        action="version",
        version=f"cookbook {__version__}",
    )
    sub = parser.add_subparsers(dest="module", metavar="<module>", required=False)
    for mod in modules:
        sp = sub.add_parser(mod.NAME, help=mod.HELP, description=mod.HELP)
        mod.register(sp)
        sp.set_defaults(_module=mod)
    return parser


def _print_module_table(ui: UI, modules) -> None:
    ui.title(f"cookbook {__version__}")
    ui.info("Usage: cookbook [-p PATH] <module> [args]")
    ui.blank()
    rows = [[m.NAME, m.HELP] for m in modules]
    ui.table(["module", "description"], rows, title="Modules")
    ui.blank()
    ui.info("Run `cookbook <module> --help` for module-specific options.")


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    ui = UI()
    try:
        modules = discover()
        parser = _build_parser(modules)
        args = parser.parse_args(argv)

        if not getattr(args, "module", None):
            _print_module_table(ui, modules)
            return 0

        cwd = Path.cwd()
        root = roots.resolve(cwd, args.path)
        ctx = CookbookContext(
            cwd=cwd,
            cookbook_root=root,
            references_dir=refs.references_dir(),
            ui=ui,
        )
        return int(args._module.run(args, ctx) or 0)

    except CookbookError as e:
        ui.error(str(e))
        return 2
    except KeyboardInterrupt:
        ui.warn("Interrupted.")
        return 130


if __name__ == "__main__":
    raise SystemExit(main())
