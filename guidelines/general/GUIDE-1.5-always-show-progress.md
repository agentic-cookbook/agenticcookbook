# GUIDE-1.5. Always show progress

When the UI is waiting on an async task:

- Show **determinate progress** (progress bar with percentage) when total work is known
- Show **indeterminate progress** (spinner, skeleton, shimmer) when it is not
- Never show a frozen or unresponsive UI
