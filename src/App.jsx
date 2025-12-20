import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">ToDoMaster</h1>
              <nav className="flex space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="/tasks" className="text-gray-600 hover:text-gray-900">Tasks</a>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to ToDoMaster</h2>
              <p className="text-gray-600">Your personal task management application</p>
            </div>} />
            <Route path="/tasks" element={<div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tasks</h2>
              <p className="text-gray-600">Task management coming soon...</p>
            </div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
