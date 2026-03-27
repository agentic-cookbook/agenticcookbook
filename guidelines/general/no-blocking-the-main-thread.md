# No blocking the main thread

All lengthy work must run on background threads/tasks using platform async primitives:

- **Apple**: Swift Concurrency (`async`/`await`, `Task`, actors)
- **Android**: Kotlin Coroutines (`viewModelScope`, `Dispatchers.IO`)
- **Web**: `Promise`/`async`, Web Workers
- **Python**: `asyncio`, threading for I/O
- **Windows/.NET**: `async`/`await`, `Task.Run` for CPU-bound work, `DispatcherQueue` for UI updates

Never block the main/UI thread.
