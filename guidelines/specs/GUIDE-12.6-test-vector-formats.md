# GUIDE-12.6. Test Vector Formats

Two formats, use whichever fits:

### Behavioral (table)

For state/action/outcome tests:

```markdown
| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| component-001 | REQ-001 | Action description | Expected outcome |
| component-002 | REQ-002, REQ-003 | Action description | Expected outcome |
```

### Data (JSON blocks)

For serialization, algorithms, and wire formats:

```markdown
#### vector-name-001
**Input**:
```json
{ "field": "value" }
```
**Expected**:
```json
{ "result": "value" }
```
```

For complex components, test vectors may also be published as separate JSON files in a `vectors/` directory.
