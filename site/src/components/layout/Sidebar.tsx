import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useContent } from '../../contexts/ContentContext'
import type { NavNode } from '../../types/cookbook'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function NavItem({ node, depth = 0 }: { node: NavNode; depth?: number }) {
  const { pathname } = useLocation()
  const isActive = pathname === node.path
  const hasChildren = node.children.length > 0
  const isExpanded = pathname.startsWith(node.path + '/') || pathname === node.path
  const [open, setOpen] = useState(isExpanded)

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center justify-between py-1.5 text-sm ${
            depth === 0
              ? 'font-semibold text-slate-900 dark:text-slate-100 mt-4 first:mt-0'
              : 'font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          style={{ paddingInlineStart: depth > 0 ? `${depth * 0.75}rem` : undefined }}
        >
          <span>{node.label}</span>
          <svg
            className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {open && (
          <div>
            {node.children.map((child) => (
              <NavItem key={child.path} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      to={node.path}
      className={`block py-1.5 text-sm transition-colors ${
        isActive
          ? 'font-medium text-sky-600 dark:text-sky-400 border-l-2 border-sky-500 bg-sky-50 dark:bg-sky-900/20'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-l-2 border-transparent'
      }`}
      style={{ paddingInlineStart: `${Math.max(depth * 0.75, 0.5)}rem` }}
    >
      {node.label}
    </Link>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { navTree } = useContent()

  const nav = (
    <nav className="p-4 overflow-y-auto h-full">
      {navTree.map((section) => (
        <NavItem key={section.path} node={section} />
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-700 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">
        {nav}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white">Navigation</span>
              <button
                onClick={onClose}
                className="p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
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
