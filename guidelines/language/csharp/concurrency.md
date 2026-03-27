# Concurrency

Use `async`/`await` for all async work. Never block the main thread.

- `ConfigureAwait(false)` in library code to avoid capturing the synchronization context
- Never use `.Result` or `.Wait()` — causes deadlocks
- Never use `async void` except for event handlers
- Accept `CancellationToken` in all async APIs
- Use `ValueTask<T>` only when the method frequently completes synchronously
- Use `Task.Run` for CPU-bound work, never on the UI thread

```csharp
// Library code — ConfigureAwait(false)
public async Task<Data> FetchAsync(CancellationToken ct = default)
{
    var response = await _client.GetAsync(url, ct).ConfigureAwait(false);
    return await ParseAsync(response, ct).ConfigureAwait(false);
}

// Application code — no ConfigureAwait needed
public async Task OnLoadAsync()
{
    var data = await _service.FetchAsync();
    UpdateUI(data);
}
```
