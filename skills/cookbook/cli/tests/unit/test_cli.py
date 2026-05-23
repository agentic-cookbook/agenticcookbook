"""Top-level CLI shape: --version, --help, module dispatch, error mapping,
and the `-p` flag working before *or* after the subcommand."""

from __future__ import annotations

import pytest

from cookbook import __version__
from cookbook.cli import main


def test_version_flag(capsys):
    with pytest.raises(SystemExit) as exc:
        main(["--version"])
    assert exc.value.code == 0
    out = capsys.readouterr().out
    assert __version__ in out


def test_no_args_shows_module_table(capsys, patch_refs):
    rc = main([])
    assert rc == 0
    out = capsys.readouterr().out
    for name in ("create", "update", "lint", "validate", "plan"):
        assert name in out


def test_unknown_module_exits_nonzero(patch_refs):
    with pytest.raises(SystemExit) as exc:
        main(["nope"])
    assert exc.value.code != 0


def test_path_flag_before_subcommand(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    rc = main(["-p", str(tmp_path / "cookbook"), "update", "--author", "T"])
    assert rc == 0


def test_path_flag_after_subcommand(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    rc = main(["update", "-p", str(tmp_path / "cookbook"), "--author", "T"])
    assert rc == 0


def test_no_cookbook_root_error_maps_to_exit_2(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    # No cookbook anywhere → update should error out.
    assert main(["update"]) == 2
