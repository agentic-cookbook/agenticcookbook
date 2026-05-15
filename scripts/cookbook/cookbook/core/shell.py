"""Subprocess wrappers — particularly `claude -p` for LLM steps."""

from __future__ import annotations

import shutil
import subprocess
from dataclasses import dataclass


@dataclass
class ShellResult:
    returncode: int
    stdout: str
    stderr: str

    @property
    def ok(self) -> bool:
        return self.returncode == 0


def run(cmd: list[str], stdin: str | None = None, timeout: int | None = None) -> ShellResult:
    proc = subprocess.run(
        cmd,
        input=stdin,
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    return ShellResult(proc.returncode, proc.stdout, proc.stderr)


def claude_available() -> bool:
    return shutil.which("claude") is not None


def claude_p(prompt: str, timeout: int = 600) -> ShellResult:
    """Run `claude -p` with the given prompt on stdin. Returns the model's stdout."""
    if not claude_available():
        return ShellResult(127, "", "claude CLI not found on PATH")
    return run(["claude", "-p", prompt], timeout=timeout)
