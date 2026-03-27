import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider } from './contexts/ThemeContext'
import { ContentProvider } from './contexts/ContentContext'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import DocPage from './components/content/DocPage'
import SearchDialog from './components/content/SearchDialog'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Global Cmd+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ContentProvider>
          <div className="min-h-screen">
            <Header
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              onSearchOpen={() => setSearchOpen(true)}
            />
            <div className="flex">
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="flex-1 min-w-0">
                <Routes>
                  <Route path="/*" element={<DocPage />} />
                </Routes>
              </main>
            </div>
            <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        </ContentProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
