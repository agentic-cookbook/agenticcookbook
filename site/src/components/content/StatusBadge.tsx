const STATUS_STYLES: Record<string, string> = {
  accepted: 'bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/20',
  review: 'bg-[var(--color-info)]/15 text-[var(--color-info)] border-[var(--color-info)]/20',
  draft: 'bg-[var(--color-surface-raised)] text-[var(--color-text-dim)] border-[var(--color-border-subtle)]',
  deprecated: 'bg-[var(--color-error)]/15 text-[var(--color-error)] border-[var(--color-error)]/20',
}

interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`font-mono text-[10px] font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[status] ?? STATUS_STYLES.draft}`}>
      {status}
    </span>
  )
}
