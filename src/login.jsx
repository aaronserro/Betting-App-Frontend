import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api/axios' // ✅ Update if needed based on your structure

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1e40af_0%,_#7c3aed_100%)] text-white px-6 py-10">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-6xl font-extrabold tracking-tight">
          <span className="inline-block mr-3">🏆</span>
          Fantasy Betting Arena
        </h1>
        <p className="text-xl text-gray-200 max-w-xl">
          Welcome to the ultimate arena where stats meet strategy. Create your team, place your bets, and compete against your friends with BetCoins.
        </p>
      </div>

      <form onSubmit={handleLogin} className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-xl shadow-2xl p-8 w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-semibold text-center">🔐 Sign In</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition text-center block"
          >
            Sign In
          </button>
          <p className="text-sm text-center text-gray-300 mt-4">
            Don’t have an account?{' '}
            <a href="/users/create" className="text-indigo-400 underline hover:text-indigo-300">
              Sign up
            </a>
          </p>
        </div>
      </form>

      <footer className="mt-12 text-sm text-gray-300">
        Built with React, Tailwind CSS, and endless imagination ⚡
      </footer>
    </div>
  )
}

export default Login
