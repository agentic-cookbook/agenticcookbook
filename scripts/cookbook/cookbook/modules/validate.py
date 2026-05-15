"""`cookbook validate` — read-only Phase A checks + index drift detection."""

from __future__ import annotations

from pathlib import Path

from ..core.checks import fix_for, phase_a
from ..core.errors import NoCookbookRootError
from ..indexing import engine

NAME = "validate"
HELP = "Read-only validation: frontmatter + link checks + index drift."

_DRIFT_FIX = "Run `cookbook update` to regenerate this index."
_MISSING_FIX = "Run `cookbook update` to create this index."


def register(parser) -> None:
    pass


def _drift(root: Path, configs_dir: Path, ui) -> int:
    if not configs_dir.is_dir():
        ui.warn(f"No index configs found at {configs_dir}; skipping drift checks.")
        return 0
    configs = engine.load_configs(configs_dir)
    if not configs:
        return 0

    drift_found = 0
    rows = []
    for c in configs:
        ok, reason = engine._applies(c.get("applies_when"), root)
        if not ok:
            rows.append([c.get("name", "?"), c["strategy"], "n/a", reason])
            continue
        strategy_mod = engine.STRATEGIES[c["strategy"]]
        from datetime import date
        text, _ = strategy_mod.generate(c, root, today=date.today())
        out = root / c["output"]
        if not out.exists():
            rows.append([c.get("name", "?"), c["strategy"], "missing", str(out.relative_to(root))])
            drift_found += 1
            continue
        existing = out.read_text(encoding="utf-8")
        if existing.strip() != text.strip():
            rows.append([c.get("name", "?"), c["strategy"], "drift", str(out.relative_to(root))])
            drift_found += 1
        else:
            rows.append([c.get("name", "?"), c["strategy"], "ok", str(out.relative_to(root))])

    ui.table(["config", "strategy", "result", "output"], rows)
    if drift_found:
        ui.info(f"Fix: {_DRIFT_FIX}")
    return 1 if drift_found else 0


def run(args, ctx) -> int:
    if ctx.cookbook_root is None:
        raise NoCookbookRootError(
            "Could not find a cookbook root. Run from inside a cookbook dir, or pass -p."
        )
    root = ctx.cookbook_root
    ctx.ui.title(f"cookbook validate · {root}")

    ctx.ui.section("Frontmatter & links")
    report = phase_a(root)
    if report.ok:
        ctx.ui.ok(f"All {report.files_checked} artifacts passed deterministic checks.")
        a_exit = 0
    else:
        rows = [[i.file, i.rule, i.detail, fix_for(i.rule)] for i in report.issues]
        ctx.ui.table(["file", "rule", "issue", "fix"], rows)
        ctx.ui.error(f"{len(report.issues)} issue(s) across {report.files_checked} files.")
        a_exit = 1

    ctx.ui.section("Index drift")
    b_exit = _drift(root, ctx.references_dir / "index-configs", ctx.ui)

    ctx.ui.blank()
    if a_exit or b_exit:
        ctx.ui.error("Validation failed.")
    else:
        ctx.ui.ok("Validation passed.")
    return a_exit or b_exit
