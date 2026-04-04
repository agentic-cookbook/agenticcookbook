---
id: fa2196e4-9513-4b23-b805-f5f5f099e5ff
title: "Architecture"
domain: agentic-cookbook://guidelines/platform/windows/architecture
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Use MVVM with [CommunityToolkit.Mvvm](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/) — source-gener..."
platforms: []
tags: 
  - architecture
  - platform
  - windows
depends-on: []
related: []
references: 
  - https://github.com/microsoft/TemplateStudio
  - https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/
approved-by: ""
approved-date: ""
---

# Architecture

Use MVVM with [CommunityToolkit.Mvvm](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/) — source-generated `ObservableObject`, `RelayCommand`, and messaging.

- NavigationView + Frame for page-level navigation
- Navigation service abstraction in the ViewModel layer — never manipulate Frame from code-behind
- Use [Template Studio](https://github.com/microsoft/TemplateStudio) for project scaffolding with MVVM, navigation, and theming pre-wired

```csharp
// ViewModel with CommunityToolkit.Mvvm source generators
[ObservableObject]
public partial class MainViewModel
{
    [ObservableProperty]
    private string _title = "Home";

    [RelayCommand]
    private async Task LoadDataAsync()
    {
        var data = await _dataService.FetchAsync();
        Title = data.Name;
    }
}
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
