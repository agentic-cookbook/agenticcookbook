import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import type { NavNode } from '../../types/cookbook'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

/** Leaf item in the nav tree */
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

/** Collapsible group within a section (e.g. Testing, Security under Guidelines) */
function NavGroup({ node }: { node: NavNode }) {
  const { pathname } = useLocation()
  const isExpanded = pathname.startsWith(node.path + '/') || pathname === node.path
  const [open, setOpen] = useState(isExpanded)

  return (
    <li className="-ml-px">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-l border-transparent py-1 pl-4 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
      >
        <span>{node.label}</span>
        <svg
          className={`mr-1 h-3 w-3 shrink-0 text-[var(--color-text-dim)] transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && (
        <ul className="flex flex-col gap-0 border-l border-[var(--color-border-subtle)] ml-4">
          {node.children.map((child) =>
            child.children.length > 0 ? (
              <NavGroup key={child.path} node={child} />
            ) : (
              <NavLeaf key={child.path} node={child} />
            ),
          )}
        </ul>
      )}
    </li>
  )
}

/** Top-level section (Principles, Guidelines, etc.) */
function NavSection({ node }: { node: NavNode }) {
  const { pathname } = useLocation()
  const isExpanded = pathname.startsWith(node.path + '/') || pathname === node.path
  const [open, setOpen] = useState(isExpanded)

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between"
      >
        <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-text-dim)]">
          {node.label}
        </h3>
        <svg
          className={`h-3 w-3 text-[var(--color-text-dim)] transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && (
        <ul className="flex flex-col gap-0 border-l border-[var(--color-border)]">
          {node.children.map((child) =>
            child.children.length > 0 ? (
              <NavGroup key={child.path} node={child} />
            ) : (
              <NavLeaf key={child.path} node={child} />
            ),
          )}
        </ul>
      )}
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
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[var(--color-border-subtle)] overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
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
