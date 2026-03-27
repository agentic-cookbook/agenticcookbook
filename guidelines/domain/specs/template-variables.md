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
