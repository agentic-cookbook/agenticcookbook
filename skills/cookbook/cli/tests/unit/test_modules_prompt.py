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
