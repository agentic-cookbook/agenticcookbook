"""Subprocess wrapper + claude_p stub guard.

We can't depend on `claude` being installed in CI, so the tests cover the
detect-and-bail path and the generic `run()` wrapper end-to-end on real
processes."""

from __future__ import annotations

from cookbook.core import shell


def test_run_captures_stdout():
    r = shell.run(["echo", "hello"])
    assert r.ok
    assert r.stdout.strip() == "hello"


def test_run_captures_nonzero_exit():
    r = shell.run(["sh", "-c", "exit 3"])
    assert not r.ok
    assert r.returncode == 3


def test_run_captures_stderr():
    r = shell.run(["sh", "-c", "echo oops 1>&2; exit 1"])
    assert r.stderr.strip() == "oops"


def test_run_passes_stdin():
    r = shell.run(["cat"], stdin="payload\n")
    assert r.stdout == "payload\n"


def test_claude_p_returns_127_when_unavailable(monkeypatch):
    monkeypatch.setattr(shell, "claude_available", lambda: False)
    r = shell.claude_p("anything")
    assert r.returncode == 127
    assert not r.ok
    assert "not found" in r.stderr.lower()
