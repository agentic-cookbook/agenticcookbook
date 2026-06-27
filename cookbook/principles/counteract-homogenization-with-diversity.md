---
id: adcd06cf-abe1-490f-ab96-4e9f4e3c9d3a
title: "Counteract Homogenization with Diversity"
domain: agenticdevelopercookbook://principles/counteract-homogenization-with-diversity
type: principle
version: 1.0.0
status: draft
language: en
created: 2026-06-27
modified: 2026-06-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "A single AI voice is a convergence trap: it raises average individual output quality while compressing population-level variety. Counter with explicit persona diversity and low-probability idea demands."
platforms: []
tags:
  - brainstorming
  - diversity
  - ai-pitfalls
depends-on: []
related:
  - agenticdevelopercookbook://principles/human-first-ideation
  - agenticdevelopercookbook://principles/bridge-distant-domains
references:
  - Anderson et al., PNAS Nexus, 2024, https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001
  - Meincke/Nave/Terwiesch, Nature Human Behaviour, June 2025, https://www.nature.com/articles/s41562-025-02173-x
  - MultiAgent Research Ideator, SIGDIAL 2025, arXiv 2507.08350
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-06-27"
---

# Counteract Homogenization with Diversity

Resist statistically-common ideas; deploy diverse specialist personas and,
where feasible, multiple models with different training data. A single LLM voice narrows the
collective idea space even as it may improve individual idea quality.

- Anderson et al. (2024, *PNAS Nexus*): LLMs matched individual human originality scores but
  AUT variability was 0.459 (LLM) vs. 0.699 (human) — structurally convergent at population level
- Meincke/Nave/Terwiesch (*Nature Human Behaviour*, June 2025): across 5 experiments, 37 of 45
  comparisons showed ChatGPT *decreases* population-level idea diversity; 94% of AI-assisted ideas
  shared overlapping concepts
- MultiAgent Research Ideator (SIGDIAL 2025, 7,000 ideas empirically): diverse agent personas are
  the single highest-leverage variable for idea quality, outperforming parallelism or iteration depth
- Always ask "what would be the most *surprising* version of this?" to reach the low-probability
  tail of the idea distribution rather than the statistical center
- Prefer genuine multi-model diversity (different providers, different training data) over
  multi-prompt diversity within one model where feasible

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-27 | Mike Fullerton | Initial creation |
