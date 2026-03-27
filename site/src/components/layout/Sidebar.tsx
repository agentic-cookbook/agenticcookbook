import { Link, useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import type { NavNode } from '../../types/cookbook'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

/** Leaf item — clickable link */
function NavLeaf({ node }: { node: NavNode }) {
  const { pathname } = useLocation()
  const isActive = pathname === node.path

  return (
    <li className="-ml-px">
      <Link
        to={node.path}
        aria-current={isActive ? 'page' : undefined}
        className={`block border-l py-1 pl-4 text-sm transition-colors ${
          isActive
            ? 'border-[var(--color-accent)] font-semibold text-[var(--color-text-primary)]'
            : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
        }`}
      >
        {node.label}
      </Link>
    </li>
  )
}

/** Subsection group label (e.g. Testing, Security under Guidelines) — always expanded */
function NavGroup({ node }: { node: NavNode }) {
  return (
    <li className="-ml-px">
      <span className="block border-l border-transparent py-1 pl-4 text-sm font-medium text-[var(--color-text-secondary)]">
        {node.label}
      </span>
      <ul className="flex flex-col border-l border-[var(--color-border-subtle)] ml-4">
        {node.children.map((child) =>
          child.children.length > 0 ? (
            <NavGroup key={child.path} node={child} />
          ) : (
            <NavLeaf key={child.path} node={child} />
          ),
        )}
      </ul>
    </li>
  )
}

/** Top-level section (Principles, Guidelines, etc.) — always expanded, static label */
function NavSection({ node }: { node: NavNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-text-dim)]">
        {node.label}
      </h3>
      <ul className="flex flex-col border-l border-[var(--color-border)]">
        {node.children.map((child) =>
          child.children.length > 0 ? (
            <NavGroup key={child.path} node={child} />
          ) : (
            <NavLeaf key={child.path} node={child} />
          ),
        )}
      </ul>
    </div>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { navTree } = useContent()

  const nav = (
    <nav className="flex flex-col gap-6 px-6 py-6 overflow-y-auto h-full" data-autoscroll="true">
      {navTree.map((section) => (
        <NavSection key={section.path} node={section} />
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[var(--color-border-subtle)] overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
        {nav}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-72 bg-[var(--color-surface)] shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]">
              <span className="font-mono text-sm font-medium text-[var(--color-text-primary)]">Navigation</span>
              <button
                onClick={onClose}
                className="p-1 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]"
                aria-label="Close navigation"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}
    </>
  )
}
