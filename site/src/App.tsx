import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ThemeProvider } from './contexts/ThemeContext'
import { ContentProvider } from './contexts/ContentContext'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import DocPage from './components/content/DocPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [_searchOpen, setSearchOpen] = useState(false)

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ContentProvider>
          <div className="min-h-screen">
            <Header
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              onSearchOpen={() => setSearchOpen(true)}
            />
            <div className="mx-auto flex max-w-[90rem]">
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="flex-1 min-w-0">
                <Routes>
                  <Route path="/*" element={<DocPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </ContentProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
