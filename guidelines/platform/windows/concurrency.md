# Concurrency

See guide.language.csharp.concurrency for general async/await conventions. For WinUI 3 specifically:

- Use `DispatcherQueue.TryEnqueue` to marshal work back to the UI thread from background tasks
- Never access UI elements from non-UI threads

```csharp
DispatcherQueue.TryEnqueue(() =>
{
    StatusText.Text = "Updated from background";
});
```
