"""Make the `cookbook` package importable for pytest.

The package lives at scripts/cookbook/cookbook/. Tests live at scripts/cookbook/tests/.
We push scripts/cookbook/ onto sys.path so `import cookbook` works.

We also point `cookbook.core.refs.references_dir()` at a stand-in references/
populated from references-src/, so tests don't depend on running install.sh.
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

import pytest

PKG_PARENT = Path(__file__).resolve().parents[1]  # scripts/cookbook/
sys.path.insert(0, str(PKG_PARENT))


@pytest.fixture(scope="session")
def references_dir(tmp_path_factory) -> Path:
    """Build a references/ tree from references-src/ for tests."""
    src = PKG_PARENT / "references-src"
    dest = tmp_path_factory.mktemp("references")
    if src.is_dir():
        for f in src.rglob("*"):
            if f.is_file():
                rel = f.relative_to(src)
                target = dest / rel
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, target)
    return dest


@pytest.fixture
def patch_refs(monkeypatch, references_dir):
    from cookbook.core import refs as refs_module
    monkeypatch.setattr(refs_module, "references_dir", lambda: references_dir)
    return references_dir
