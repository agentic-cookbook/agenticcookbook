# No external dependencies in core libraries

`roadmap_lib` uses the standard library only. Do not add PyYAML, requests, or other third-party packages to core library code. This keeps the library portable and installable without dependency management.
