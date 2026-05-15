"""Plan module: error paths + short-circuit on empty interactive goal."""

from __future__ import annotations

from cookbook.cli import main
from cookbook.core import prompts as prompts_mod
from cookbook.modules import plan as plan_mod


def test_plan_errors_when_claude_unavailable(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    monkeypatch.setattr(plan_mod, "claude_available", lambda: False)
    rc = main(["plan", "-p", str(tmp_path / "cookbook"), "--goal", "x"])
    assert rc == 2


def test_plan_errors_with_no_cookbook_root(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    rc = main(["plan", "--goal", "x"])
    assert rc == 2


def test_plan_short_circuits_on_empty_interactive_goal(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    monkeypatch.setattr(plan_mod, "claude_available", lambda: True)
    # `prompts.text` is the interactive question. Stub it to return "" — the
    # plan module should short-circuit and exit 0 without invoking claude.
    monkeypatch.setattr(prompts_mod, "text", lambda *a, **kw: "")
    rc = main(["plan", "-p", str(tmp_path / "cookbook")])
    assert rc == 0
