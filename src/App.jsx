import React from 'react'
import JobsInternshipsModule from './components/hello'

function App() {
  return (
    <div className="App">
      {/* Header/Navigation could go here */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">JobSeek App</h1>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <JobsInternshipsModule />
      </main>

      {/* Footer could go here */}
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