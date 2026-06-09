from cookbook.cli import main


def test_validate_green_then_drift(tmp_path, monkeypatch, patch_refs):
    monkeypatch.chdir(tmp_path)
    assert main(["create"]) == 0
    cb = tmp_path / "cookbook"
    (cb / "recipes" / "alpha.md").write_text("# Alpha Recipe\n", encoding="utf-8")
    assert main(["update", "-p", str(cb), "--author", "Tester"]) == 0
    assert main(["validate", "-p", str(cb)]) == 0  # green

    # Induce drift by adding a new file without re-running update.
    (cb / "recipes" / "gamma.md").write_text(
        "---\ntitle: Gamma\nid: 22222222-3333-4444-5555-666666666666\n"
        "domain: agenticdevelopercookbook://cookbook/recipes/gamma\ntype: recipe\n"
        "version: 1.0.0\nstatus: draft\nlanguage: en\ncreated: 2026-05-15\n"
        "modified: 2026-05-15\nauthor: T\ncopyright: 2026 T\nlicense: MIT\nsummary: x\n"
        "---\n# Gamma\n",
        encoding="utf-8",
    )
    rc = main(["validate", "-p", str(cb)])
    assert rc != 0  # drift detected
