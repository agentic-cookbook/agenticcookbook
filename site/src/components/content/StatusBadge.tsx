const STATUS_STYLES: Record<string, string> = {
  accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  review: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  deprecated: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[status] ?? STATUS_STYLES.draft}`}>
      {status}
    </span>
  )
}
