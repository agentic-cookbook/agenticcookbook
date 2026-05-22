"""Tests for the `cookbook prompt` module."""

from __future__ import annotations

import pytest

from cookbook.cli import main


def test_prompt_appears_in_module_table(capsys, patch_refs):
    rc = main([])
    assert rc == 0
    out = capsys.readouterr().out
    assert "prompt" in out


def test_prompt_help_runs(capsys, patch_refs):
    with pytest.raises(SystemExit) as exc:
        main(["prompt", "--help"])
    assert exc.value.code == 0


import os
import textwrap
from pathlib import Path


def _write_test_module(tmp_path: Path) -> Path:
    """Create a minimal test module under tmp_path and return its parent."""
    mod = tmp_path / "demo"
    (mod / "actions").mkdir(parents=True)
    (mod / "references").mkdir(parents=True)
    (mod / "module.md").write_text(
        textwrap.dedent(
            """\
            ---
            role: "test specialist"
            ---
            Test preamble.
            """
        ),
        encoding="utf-8",
    )
    (mod / "actions" / "do.md").write_text(
        textwrap.dedent(
            """\
            ---
            description: "do it"
            params:
              target:
                description: "x"
                default: "default-target"
            ---
            Do something for {{target}} and {{task}}.
            """
        ),
        encoding="utf-8",
    )
    return tmp_path


def test_render_with_default_target(tmp_path, monkeypatch, patch_refs, capsys):
    prompts_root = _write_test_module(tmp_path)
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR",
        prompts_root,
    )
    rc = main(["prompt", "demo", "do", "Build a list view"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "test specialist" in out
    assert "default-target" in out
    assert "Build a list view" in out


def test_render_with_explicit_flag(tmp_path, monkeypatch, patch_refs, capsys):
    prompts_root = _write_test_module(tmp_path)
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR",
        prompts_root,
    )
    rc = main(["prompt", "demo", "do", "--target", "sqlite", "Build a list view"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "sqlite" in out


def test_render_unknown_action_exits_nonzero(tmp_path, monkeypatch, patch_refs):
    prompts_root = _write_test_module(tmp_path)
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR",
        prompts_root,
    )
    rc = main(["prompt", "demo", "nope", "task"])
    assert rc == 2
