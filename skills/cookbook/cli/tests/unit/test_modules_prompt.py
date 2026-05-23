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
            Do something for {{target}}.
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


def test_multi_token_task_is_joined(tmp_path, monkeypatch, patch_refs, capsys):
    """Free-text task split across multiple argv tokens joins back into one line."""
    prompts_root = _write_test_module(tmp_path)
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR",
        prompts_root,
    )
    rc = main(["prompt", "demo", "do", "Build", "a", "list", "view"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "Build a list view" in out


def test_kebab_case_param_flag(tmp_path, monkeypatch, patch_refs, capsys):
    """A param named with hyphens still resolves: argparse rewrites the attr name."""
    mod = tmp_path / "demo"
    (mod / "actions").mkdir(parents=True)
    (mod / "references").mkdir(parents=True)
    (mod / "module.md").write_text(
        "---\nrole: \"r\"\n---\nP.\n", encoding="utf-8"
    )
    (mod / "actions" / "do.md").write_text(
        textwrap.dedent(
            """\
            ---
            description: "d"
            params:
              my-name:
                description: "x"
                default: "fallback"
            ---
            Hello {{my-name}}.
            """
        ),
        encoding="utf-8",
    )
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR", tmp_path
    )
    rc = main(["prompt", "demo", "do", "--my-name", "world", "task"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "Hello world" in out


def test_none_default_renders_as_empty_string(tmp_path, monkeypatch, patch_refs, capsys):
    """A frontmatter `default: null` for an unspecified param renders as empty, not 'None'."""
    mod = tmp_path / "demo"
    (mod / "actions").mkdir(parents=True)
    (mod / "references").mkdir(parents=True)
    (mod / "module.md").write_text(
        "---\nrole: \"r\"\n---\nP.\n", encoding="utf-8"
    )
    (mod / "actions" / "do.md").write_text(
        textwrap.dedent(
            """\
            ---
            description: "d"
            params:
              opt:
                description: "x"
                default: null
            ---
            START{{opt}}END
            """
        ),
        encoding="utf-8",
    )
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR", tmp_path
    )
    rc = main(["prompt", "demo", "do", "task"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "STARTEND" in out
    assert "None" not in out


def test_user_defined_task_param_no_collision(tmp_path, monkeypatch, patch_refs, capsys):
    """A user-defined --task flag works; it does not collide with the task footer."""
    mod = tmp_path / "demo"
    (mod / "actions").mkdir(parents=True)
    (mod / "references").mkdir(parents=True)
    (mod / "module.md").write_text(
        "---\nrole: \"r\"\n---\nP.\n", encoding="utf-8"
    )
    (mod / "actions" / "do.md").write_text(
        textwrap.dedent(
            """\
            ---
            description: "d"
            params:
              task:
                description: "the user param named task"
                default: "param-default"
            ---
            Param-task: {{task}}
            """
        ),
        encoding="utf-8",
    )
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR", tmp_path
    )
    rc = main(["prompt", "demo", "do", "--task", "p-value", "free text"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "Param-task: p-value" in out
    assert "free text" in out  # still appears in `## Your task` footer


def test_malformed_frontmatter_returns_clean_error(tmp_path, monkeypatch, patch_refs, capsys):
    """A broken YAML frontmatter returns exit 1 with a friendly message, not a stack trace."""
    mod = tmp_path / "demo"
    (mod / "actions").mkdir(parents=True)
    (mod / "references").mkdir(parents=True)
    (mod / "module.md").write_text(
        "---\nrole: \"r\"\n---\nP.\n", encoding="utf-8"
    )
    (mod / "actions" / "do.md").write_text(
        "---\nparams: [not, a, mapping]\n---\nbody\n", encoding="utf-8"
    )
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR", tmp_path
    )
    rc = main(["prompt", "demo", "do", "task"])
    assert rc == 1


def test_global_flag_after_subcommand_is_stripped(tmp_path, monkeypatch, patch_refs, capsys):
    """`-p VAL` placed after the subcommand is stripped (not leaked into the task) with a warning."""
    prompts_root = _write_test_module(tmp_path)
    monkeypatch.setattr(
        "cookbook.modules.prompt.prompt_cli.PROMPTS_DIR",
        prompts_root,
    )
    rc = main(["prompt", "demo", "do", "-p", "/some/path", "Real", "task"])
    assert rc == 0
    captured = capsys.readouterr()
    # The path token MUST NOT leak into the assembled task footer.
    task_section = captured.out.split("## Your task")[-1]
    assert "/some/path" not in task_section
    # The free-text task DOES appear in that footer.
    assert "Real task" in task_section
