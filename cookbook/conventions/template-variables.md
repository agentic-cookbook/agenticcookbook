---
id: 131daee5-d621-4836-a022-a783e4b4a48d
title: "Template Variables"
domain: contributing.template-variables
type: reference
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Specs use `{{placeholder}}` tokens for consumer-specific values:"
platforms: []
tags: 
  - template-variables
depends-on: []
related: []
references: []
---

# Template Variables

Specs use `{{placeholder}}` tokens for consumer-specific values:

| Variable | Example | Purpose |
|----------|---------|---------|
| `{{app_name}}` | `Temporal` | Application name (PascalCase) |
| `{{app_name_lower}}` | `temporal` | Application name (lowercase) |
| `{{org_package}}` | `company.temporal` | Package/bundle identifier root |
| `{{api_base_url}}` | `https://api.temporal.today` | Production API URL |
| `{{api_dev_url}}` | `http://localhost:8080` | Development API URL |
| `{{db_name}}` | `temporal.db` | Local database filename |
| `{{bundle_id}}` | `com.company.app` | Bundle/package identifier |
