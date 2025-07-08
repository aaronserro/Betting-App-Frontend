import { Routes, Route } from 'react-router-dom'
import CreateUser from './Users/createUser'
import UpdateUser from './Users/UpdateUser'
import Dashboard from './Users/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './login' // ✅ import your new login component
import './App.css'

function App() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/update" element={<UpdateUser />} />
      </Routes>
    </div>
  )
}

export default App
