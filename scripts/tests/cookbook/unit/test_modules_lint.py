"""Lint module: Phase A pass/fail; Phase B skipped when claude unavailable."""

from __future__ import annotations

from cookbook.cli import main
from cookbook.modules import lint as lint_mod


def test_lint_green_on_clean_cookbook(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    cb = tmp_path / "cookbook"
    (cb / "recipes" / "ok.md").write_text("# Ok\n", encoding="utf-8")
    assert main(["update", "-p", str(cb), "--author", "T"]) == 0
    assert main(["lint", "-p", str(cb), "--no-llm"]) == 0


def test_lint_phase_a_reports_issues(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    cb = tmp_path / "cookbook"
    # Recipe with no frontmatter at all.
    (cb / "recipes" / "bad.md").write_text("# Just a header\n", encoding="utf-8")
    # Do NOT run update — leave frontmatter missing so Phase A complains.
    rc = main(["lint", "-p", str(cb), "--no-llm"])
    assert rc != 0


def test_lint_skips_phase_b_when_claude_missing(tmp_path, monkeypatch, patch_refs, capsys):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    cb = tmp_path / "cookbook"
    (cb / "recipes" / "ok.md").write_text("# Ok\n", encoding="utf-8")
    assert main(["update", "-p", str(cb), "--author", "T"]) == 0
    monkeypatch.setattr(lint_mod, "claude_available", lambda: False)
    # Without --no-llm, but claude is unavailable: should still exit 0 and warn.
    rc = main(["lint", "-p", str(cb)])
    assert rc == 0
