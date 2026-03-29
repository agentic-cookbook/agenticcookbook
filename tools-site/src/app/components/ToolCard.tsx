import { Link } from 'react-router'
import type { Tool } from '../lib/api'

interface ToolCardProps {
  tool: Tool
}

const phaseColors: Record<string, string> = {
  plan: 'var(--color-info)',
  implement: 'var(--color-success)',
  verify: 'var(--color-accent)',
}

export function ToolCard({ tool }: ToolCardProps) {
  const phases = tool.loop_phases.split(',').map(p => p.trim()).filter(Boolean)

  return (
    <Link
      to={`/tools/${tool.id}`}
      className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200"
    >
      {/* Title row */}
      <div className="flex items-center gap-2 mb-1.5">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
          {tool.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 mb-2.5">
        {tool.description}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* Phase badges */}
        {phases.map(phase => (
          <span
            key={phase}
            className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
            style={{
              color: phaseColors[phase] ?? 'var(--color-text-dim)',
              borderColor: `color-mix(in srgb, ${phaseColors[phase] ?? 'var(--color-text-dim)'} 30%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${phaseColors[phase] ?? 'var(--color-text-dim)'} 8%, transparent)`,
            }}
          >
            {phase}
          </span>
        ))}

        {/* Category badge */}
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border-subtle)]">
          {tool.category}
        </span>
      </div>
    </Link>
  )
}
