"""Tests for the prompt module's frontmatter parser."""

from __future__ import annotations

import pytest

from cookbook.modules.prompt.frontmatter import (
    ParsedFile,
    parse,
    ParamSpec,
)


def test_parse_extracts_frontmatter_and_body():
    raw = "---\ndescription: \"hi\"\n---\nbody text\n"
    parsed = parse(raw)
    assert parsed.frontmatter["description"] == "hi"
    assert parsed.body.strip() == "body text"


def test_parse_returns_empty_frontmatter_when_missing():
    raw = "no frontmatter here\n"
    parsed = parse(raw)
    assert parsed.frontmatter == {}
    assert parsed.body.strip() == "no frontmatter here"


def test_param_spec_from_dict_with_default():
    spec = ParamSpec.from_dict("target", {"description": "x", "default": "postgres"})
    assert spec.name == "target"
    assert spec.description == "x"
    assert spec.default == "postgres"
    assert spec.required is False


def test_param_spec_from_dict_without_default_is_required():
    spec = ParamSpec.from_dict("target", {"description": "x"})
    assert spec.required is True
    assert spec.default is None


def test_parse_empty_body_after_frontmatter():
    """Regression: a frontmatter block followed by nothing must parse cleanly."""
    raw = "---\nrole: r\n---\n"
    parsed = parse(raw)
    assert parsed.frontmatter == {"role": "r"}
    assert parsed.body == ""


def test_parse_rejects_non_mapping_frontmatter():
    """A YAML scalar/list at the top level is not a frontmatter mapping."""
    raw = "---\n[a, b, c]\n---\nbody\n"
    with pytest.raises(ValueError):
        parse(raw)


def test_param_spec_from_dict_rejects_non_mapping_body():
    """If a param's body is a list (not a dict), surface a clear error."""
    with pytest.raises(ValueError):
        ParamSpec.from_dict("target", ["not", "a", "dict"])


def test_param_spec_from_dict_treats_none_as_required():
    """A param with `null` body is treated as 'no default → required'."""
    spec = ParamSpec.from_dict("target", None)
    assert spec.required is True
    assert spec.default is None
