import { Routes, Route } from 'react-router-dom'
import Dashboard from './Users/dashboard'
import SudokuPage from './pages/SudokuPage'
import './App.css'

function App() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Routes>
        {/* Main entry goes straight to Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Games are public, no ProtectedRoute */}
        <Route path="/games/sudoku" element={<SudokuPage />} />
      </Routes>
    </div>
  )
}

export default App
