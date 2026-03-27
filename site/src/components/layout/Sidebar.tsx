import { Link, useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import type { NavNode } from '../../types/cookbook'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

/** Directory node — only directories appear in the sidebar */
function DirLink({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const { pathname } = useLocation()
  const isSelected = pathname === node.path
  const isAncestor = pathname.startsWith(node.path + '/')

  const childDirs = node.children.filter((c) => c.children.length > 0)

  return (
    <>
      <li>
        <Link
          to={node.path}
          aria-current={isSelected ? 'page' : undefined}
          className={`relative block py-1 text-sm transition-colors ${
            isSelected
              ? 'font-semibold text-[var(--color-text-primary)]'
              : isAncestor
                ? 'font-medium text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
          style={{ paddingInlineStart: `${(depth + 1) * 0.875}rem` }}
        >
          {isSelected && (
            <span className="absolute left-0 top-1 bottom-1 w-px bg-[var(--color-accent)]" />
          )}
          {node.label}
        </Link>
      </li>
      {childDirs.length > 0 && (
        <li>
          <ul className="flex flex-col border-l border-[var(--color-border)] ml-3.5">
            {childDirs.map((child) => (
              <DirLink key={child.path} node={child} depth={depth + 1} />
            ))}
          </ul>
        </li>
      )}
    </>
  )
}

/** Top-level section header with always-visible vertical bar */
function NavSection({ node }: { node: NavNode }) {
  const { pathname } = useLocation()
  const isSelected = pathname === node.path
  const isInSection = pathname.startsWith(node.path + '/')

  const childDirs = node.children.filter((c) => c.children.length > 0)

  return (
    <div className="flex flex-col gap-3">
      <h3 className={`font-mono text-xs font-medium uppercase tracking-widest transition-colors ${
        isSelected || isInSection
          ? 'text-[var(--color-text-secondary)]'
          : 'text-[var(--color-text-dim)]'
      }`}>
        {node.label}
      </h3>
      <ul className="flex flex-col border-l border-[var(--color-border)]">
        {childDirs.map((child) => (
          <DirLink key={child.path} node={child} />
        ))}
      </ul>
    </div>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { navTree } = useContent()
  const { pathname } = useLocation()
  const isOverviewSelected = pathname === '/'

  const nav = (
    <nav className="flex flex-col gap-6 px-6 py-6 overflow-y-auto h-full" data-autoscroll="true">
      {/* Overview — above all sections */}
      <div className="flex flex-col gap-3">
        <h3 className={`font-mono text-xs font-medium uppercase tracking-widest transition-colors ${
          isOverviewSelected ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-dim)]'
        }`}>
          <Link to="/" className="hover:text-[var(--color-text-secondary)]">
            Overview
          </Link>
        </h3>
      </div>
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
