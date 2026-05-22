"""iter_markdown skip rules."""

from __future__ import annotations

from cookbook.core.markdown import SKIP_NAMES, iter_markdown


def test_skip_reserved_filenames(tmp_path):
    (tmp_path / "recipes").mkdir()
    (tmp_path / "recipes" / "good.md").write_text("# Good\n", encoding="utf-8")
    for name in SKIP_NAMES:
        (tmp_path / "recipes" / name).write_text("# skip\n", encoding="utf-8")
    files = iter_markdown(tmp_path)
    assert [f.name for f in files] == ["good.md"]


def test_skip_directories(tmp_path):
    (tmp_path / "recipes").mkdir()
    (tmp_path / "appendix").mkdir()
    (tmp_path / "recipes" / "r.md").write_text("# r\n", encoding="utf-8")
    (tmp_path / "appendix" / "a.md").write_text("# a\n", encoding="utf-8")
    files = iter_markdown(tmp_path, skip_dirs=("appendix",))
    assert {f.name for f in files} == {"r.md"}


def test_sorted_output(tmp_path):
    (tmp_path / "recipes").mkdir()
    for name in ("z.md", "a.md", "m.md"):
        (tmp_path / "recipes" / name).write_text("# x\n", encoding="utf-8")
    files = iter_markdown(tmp_path)
    assert [f.name for f in files] == ["a.md", "m.md", "z.md"]


def test_empty_dir(tmp_path):
    assert iter_markdown(tmp_path) == []
