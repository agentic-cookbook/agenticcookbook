"""Tests for the prompt rendering / assembly logic."""

from __future__ import annotations

from pathlib import Path

import pytest

from cookbook.modules.prompt.render import (
    render_template,
    assemble_prompt,
    UnknownPlaceholderError,
)


def test_render_template_substitutes_known_placeholders():
    body = "Design a {{target}} schema for: {{task}}"
    out = render_template(body, {"target": "postgres", "task": "blog posts"})
    assert out == "Design a postgres schema for: blog posts"


def test_render_template_raises_on_unknown_placeholder():
    with pytest.raises(UnknownPlaceholderError) as exc:
        render_template("hello {{unknown}}", {"task": "x"})
    assert "unknown" in str(exc.value)


def test_assemble_prompt_order(tmp_path):
    module_md = tmp_path / "module.md"
    module_md.write_text(
        "---\nrole: \"db specialist\"\n---\nModule preamble line.\n",
        encoding="utf-8",
    )
    refs_dir = tmp_path / "references"
    refs_dir.mkdir()
    (refs_dir / "a.md").write_text("REF A body\n", encoding="utf-8")
    (refs_dir / "b.md").write_text("REF B body\n", encoding="utf-8")
    action_md = tmp_path / "actions" / "design.md"
    action_md.parent.mkdir()
    action_md.write_text(
        "---\ndescription: \"hi\"\nparams:\n  target:\n    default: postgres\n---\nACTION BODY for {{target}}\n",
        encoding="utf-8",
    )

    prompt = assemble_prompt(
        module_md_path=module_md,
        references_dir=refs_dir,
        action_md_path=action_md,
        params={"target": "sqlite"},
        task="some task",
    )

    # Role header first.
    assert prompt.startswith("You are a db specialist.")
    # Then preamble.
    assert "Module preamble line." in prompt
    # Then references in alphabetical order.
    a_idx = prompt.index("REF A body")
    b_idx = prompt.index("REF B body")
    assert a_idx < b_idx
    # Reference headers present.
    assert "## reference: a.md" in prompt
    assert "## reference: b.md" in prompt
    # Then action body with interpolation.
    assert "ACTION BODY for sqlite" in prompt
    # Finally the task block.
    assert prompt.rstrip().endswith("some task")
    assert "## Your task" in prompt
