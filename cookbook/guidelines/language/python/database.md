# Database

Use SQLite with WAL mode for concurrent read access. No ORM — use direct SQL via the `sqlite3` standard library module.

```python
conn = sqlite3.connect(db_path)
conn.execute("PRAGMA journal_mode=WAL")
```
