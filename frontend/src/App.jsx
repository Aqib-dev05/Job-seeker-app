import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import JobsInternshipsModule from './components/hello'
import Manager from './components/Manager'
import Apply from './components/Apply'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const isManagerPage = location.pathname === '/manager'

  return (
    <div className="App">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
          <h1 className="text-2xl max-md:text-[1rem] font-bold text-gray-900">JobSeek App</h1>
          <nav className="space-x-3 ">
            <Link to={isManagerPage ? "/" : "/manager"} className="px-6 py-3 ml-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              {isManagerPage ? "Home" : "Manager"}
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<JobsInternshipsModule />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/apply/:id" element={<Apply />} />
        </Routes>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 JobSeek App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App