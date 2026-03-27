# GUIDE-6.4. File paths

Use `pathlib.Path`, not `os.path`. All path manipulation should go through `pathlib`.

```python
from pathlib import Path

roadmap_dir = Path.home() / ".roadmaps" / project_name
```
