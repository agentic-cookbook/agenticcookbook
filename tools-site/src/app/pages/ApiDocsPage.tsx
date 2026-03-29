import { useState } from 'react'

interface Endpoint {
  method: string
  path: string
  description: string
  params?: { name: string; type: string; description: string }[]
  example: {
    curl: string
    response: string
  }
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/tools',
    description: 'List tools with optional filtering, search, and pagination.',
    params: [
      { name: 'q', type: 'string', description: 'Full-text search query' },
      { name: 'category', type: 'string', description: 'Filter by category slug' },
      { name: 'phase', type: 'string', description: 'Filter by loop phase (plan, implement, verify)' },
      { name: 'platform', type: 'string', description: 'Filter by platform (macos, linux, windows, web, ios, android)' },
      { name: 'integration', type: 'string', description: 'Filter by integration method (cli, library, plugin, saas, api, mcp-server)' },
      { name: 'maintained', type: 'boolean', description: 'Filter by maintained status (true/false)' },
      { name: 'limit', type: 'number', description: 'Results per page (1-200, default 50)' },
      { name: 'offset', type: 'number', description: 'Pagination offset (default 0)' },
    ],
    example: {
      curl: 'curl "https://tools.agenticcookbook.com/api/tools?category=cli&phase=verify&limit=10"',
      response: `{
  "data": [
    {
      "id": "shellcheck",
      "name": "ShellCheck",
      "url": "https://www.shellcheck.net",
      "github_url": "https://github.com/koalaman/shellcheck",
      "description": "Static analysis tool for shell scripts",
      "install_command": "brew install shellcheck",
      "category": "cli",
      "subcategory": "linting",
      "loop_phases": "verify",
      "integration_method": "cli",
      "platforms": "macos,linux,windows",
      "languages": "bash,sh,zsh",
      "license": "GPL-3.0",
      "maintained": true,
      "last_verified": "2025-01-15",
      "source_file": null,
      "created_at": "2025-01-01T00:00:00",
      "updated_at": "2025-01-15T00:00:00"
    }
  ],
  "total": 42,
  "limit": 10,
  "offset": 0
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/tools/:id',
    description: 'Get a single tool by its ID.',
    example: {
      curl: 'curl "https://tools.agenticcookbook.com/api/tools/shellcheck"',
      response: `{
  "id": "shellcheck",
  "name": "ShellCheck",
  "url": "https://www.shellcheck.net",
  "github_url": "https://github.com/koalaman/shellcheck",
  "description": "Static analysis tool for shell scripts",
  "install_command": "brew install shellcheck",
  "category": "cli",
  "subcategory": "linting",
  "loop_phases": "verify",
  "integration_method": "cli",
  "platforms": "macos,linux,windows",
  "languages": "bash,sh,zsh",
  "license": "GPL-3.0",
  "maintained": true,
  "last_verified": "2025-01-15",
  "source_file": null,
  "created_at": "2025-01-01T00:00:00",
  "updated_at": "2025-01-15T00:00:00"
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/categories',
    description: 'List all tool categories with tool counts.',
    example: {
      curl: 'curl "https://tools.agenticcookbook.com/api/categories"',
      response: `[
  {
    "slug": "cli",
    "name": "CLI & Terminal",
    "description": "Argument parsing, shell testing, TUI frameworks, and distribution",
    "icon": "\\ud83d\\udcbb",
    "tool_count": 42
  },
  {
    "slug": "web-frontend",
    "name": "Web Frontend",
    "description": "Frameworks, linters, component libraries, and visual testing for web UI",
    "icon": "\\ud83c\\udf10",
    "tool_count": 67
  }
]`,
    },
  },
  {
    method: 'GET',
    path: '/api/news',
    description: 'List news items with optional type filtering and pagination.',
    params: [
      { name: 'type', type: 'string', description: 'Filter by type (new-tool, update, deprecation, breaking-change)' },
      { name: 'limit', type: 'number', description: 'Results per page (1-200, default 50)' },
      { name: 'offset', type: 'number', description: 'Pagination offset (default 0)' },
    ],
    example: {
      curl: 'curl "https://tools.agenticcookbook.com/api/news?type=new-tool&limit=5"',
      response: `{
  "data": [
    {
      "id": 1,
      "title": "Added ShellCheck to CLI category",
      "body": "ShellCheck is now available in the tools directory.",
      "tool_id": "shellcheck",
      "type": "new-tool",
      "published_at": "2025-01-15T00:00:00"
    }
  ],
  "total": 12,
  "limit": 5,
  "offset": 0
}`,
    },
  },
]

export function ApiDocsPage() {
  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          API Documentation
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          All endpoints return JSON. No authentication required.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {ENDPOINTS.map(ep => (
          <EndpointSection key={`${ep.method} ${ep.path}`} endpoint={ep} />
        ))}
      </div>
    </div>
  )
}

function EndpointSection({ endpoint }: { endpoint: Endpoint }) {
  const [showResponse, setShowResponse] = useState(false)
  const [copiedCurl, setCopiedCurl] = useState(false)

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(endpoint.example.curl).then(() => {
      setCopiedCurl(true)
      setTimeout(() => setCopiedCurl(false), 2000)
    })
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6">
      {/* Method + Path */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
          {endpoint.method}
        </span>
        <code className="font-mono text-sm text-[var(--color-text-primary)]">
          {endpoint.path}
        </code>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        {endpoint.description}
      </p>

      {/* Query params */}
      {endpoint.params && endpoint.params.length > 0 && (
        <div className="mb-4">
          <h4 className="font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
            Query Parameters
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="text-left font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-dim)] pb-2 pr-4">
                    Name
                  </th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-dim)] pb-2 pr-4">
                    Type
                  </th>
                  <th className="text-left font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-dim)] pb-2">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {endpoint.params.map(p => (
                  <tr key={p.name} className="border-b border-[var(--color-border-subtle)] last:border-0">
                    <td className="py-2 pr-4">
                      <code className="font-mono text-xs text-[var(--color-accent)]">{p.name}</code>
                    </td>
                    <td className="py-2 pr-4">
                      <span className="font-mono text-xs text-[var(--color-text-dim)]">{p.type}</span>
                    </td>
                    <td className="py-2 text-xs text-[var(--color-text-secondary)]">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* cURL example */}
      <div className="mb-3">
        <h4 className="font-mono text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
          Example
        </h4>
        <div className="relative group">
          <pre className="p-4 rounded-md bg-[var(--color-surface)] border border-[var(--color-border-subtle)] overflow-x-auto font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {endpoint.example.curl}
          </pre>
          <button
            onClick={handleCopyCurl}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-all"
            title="Copy"
          >
            {copiedCurl ? (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Response toggle */}
      <button
        onClick={() => setShowResponse(!showResponse)}
        className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text-secondary)] transition-colors"
      >
        <svg
          className={`h-3 w-3 shrink-0 transition-transform duration-150 ${showResponse ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        Example Response
      </button>

      {showResponse && (
        <pre className="mt-3 p-4 rounded-md bg-[var(--color-surface)] border border-[var(--color-border-subtle)] overflow-x-auto font-mono text-xs text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
          {endpoint.example.response}
        </pre>
      )}
    </div>
  )
}
