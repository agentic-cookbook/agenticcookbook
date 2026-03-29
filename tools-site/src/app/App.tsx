import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/Header'
import { SearchDialog } from './components/SearchDialog'
import { HomePage } from './pages/HomePage'
import { BrowsePage } from './pages/BrowsePage'
import { ToolDetailPage } from './pages/ToolDetailPage'
import { CategoryPage } from './pages/CategoryPage'
import { NewsPage } from './pages/NewsPage'
import { ApiDocsPage } from './pages/ApiDocsPage'

export function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header onOpenSearch={openSearch} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<BrowsePage />} />
              <Route path="/tools/:id" element={<ToolDetailPage />} />
              <Route path="/categories/:slug" element={<CategoryPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/api-docs" element={<ApiDocsPage />} />
            </Routes>
          </main>
          <SearchDialog open={searchOpen} onClose={closeSearch} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
