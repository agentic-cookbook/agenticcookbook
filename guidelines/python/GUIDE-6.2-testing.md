# GUIDE-6.2. Testing

1. Use `pytest` for all tests.
2. Every change needs tests. Every bug fix needs a regression test.
3. Prioritize unit tests over integration tests.
4. Never remove or modify production dashboard data during testing — use demo port 9888, not production port 8888.
