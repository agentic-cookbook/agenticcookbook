#!/usr/bin/env bash
# Smoke test: run install.sh then exercise the CLI end-to-end against a tmp cookbook.
# Run from the repo root: bash scripts/cookbook/tests/integration/smoke.sh
set -euo pipefail

REPO_ROOT="$(cd -- "$(dirname -- "$0")/../../../.." && pwd)"
SCRATCH="$(mktemp -d)"
trap 'rm -rf "$SCRATCH"' EXIT

echo "== install.sh =="
bash "${REPO_ROOT}/install.sh"

export PATH="${HOME}/.local/bin:${PATH}"
echo "== cookbook --version =="
cookbook --version

echo "== create =="
cd "$SCRATCH"
cookbook create
test -f cookbook/index.md
test -f cookbook/description.md
test -f cookbook/recipes/.gitkeep
test -f cookbook/reference/.gitkeep

echo "== update (empty cookbook) =="
cookbook update -p cookbook

echo "== add a recipe and re-run update =="
cat > cookbook/recipes/hello.md <<'MD'
# Hello

Body.
MD
cookbook update -p cookbook --author Smoketester
test -f cookbook/recipes/INDEX.md
grep -q "Hello" cookbook/recipes/INDEX.md

echo "== validate (green) =="
cookbook validate -p cookbook

echo "== lint --no-llm (green) =="
cookbook lint -p cookbook --no-llm

echo "OK"
