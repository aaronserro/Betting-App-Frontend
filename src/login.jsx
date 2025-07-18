import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api/axios'
import Coin from './Coin'
function Login() {

const games = [
  { name: 'Roulette', icon: '🎡', color: 'from-yellow-400 to-red-500' },
  { name: 'Sudoku', icon: '🃏', color: 'from-green-400 to-blue-500' },
  { name: 'BlackJack', icon: '🂡', color: 'from-gray-700 to-black' },
  { name: 'Poker', icon: '🎰', color: 'from-pink-400 to-purple-500' },
  { name: 'WordHunt', icon: '🎲', color: 'from-green-300 to-green-700' },
  { name: 'BattleShip', icon: '🀄', color: 'from-red-400 to-yellow-600' },
  { name: '2048', icon: '🏈', color: 'from-blue-400 to-indigo-800' },
  { name: 'Tic-Tac-Toe', icon: '🔢', color: 'from-yellow-200 to-yellow-600' },
  { name: 'Chess', icon: '⚔️', color: 'from-gray-400 to-gray-900' },
  // Add more as you wish!
  ];
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const fallingCards = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => {
      const game = games[Math.floor(Math.random() * games.length)];
      const left = Math.random() * 90;
      const delay = Math.random() * 4;
      const duration = 3 + Math.random() * 2;
      const scale = 0.85 + Math.random() * 0.3;
      const rotate = Math.random() * 24 - 12;
      const opacity = 0.8 + Math.random() * 0.2;
      return {
        key: i,
        game,
        left,
        delay,
        duration,
        scale,
        rotate,
        opacity,
      };
    }), []
  );

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
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#fff_0%,_#222_100%)] text-white px-6 py-10 overflow-hidden">
  {/* Falling coins overlay */}
<div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
  {fallingCards.map(card => (
    <div
      key={card.key}
      className={`falling-card flex flex-col items-center justify-center w-32 h-40 rounded-3xl shadow-xl bg-gradient-to-br ${card.game.color}`}
      style={{
        left: `${card.left}%`,
        animationDelay: `${card.delay}s`,
        animationDuration: `${card.duration}s`,
        transform: `scale(${card.scale}) rotate(${card.rotate}deg)`,
        opacity: card.opacity,
      }}
    >
      <span className="text-3xl mb-2">{card.game.icon}</span>
      <span className="text-base font-bold text-white drop-shadow">{card.game.name}</span>
    </div>
  ))}
</div>

<div className="relative flex flex-col items-center justify-center w-full h-full">
  <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-center mb-4">
    <span className="inline-block mr-3 drop-shadow-lg animate-bounce">🏆</span>
    <span className="bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
      Fantasy <span className="text-black drop-shadow-lg">Betting</span> Arena
      <span className="inline-block mr-3 drop-shadow-lg animate-bounce">🏆</span>
    </span>
  </h1>
  <p className="text-lg sm:text-xl bg-black/60 px-6 py-3 rounded-xl text-gray-100 shadow-lg max-w-xl text-center mt-2">
    Welcome to the ultimate arena where <span className="font-semibold text-yellow-300">stats</span> meet <span className="font-semibold text-yellow-300">strategy</span>.<br />
    Create your team, place your bets, and compete against your friends with <span className="font-bold text-yellow-300">BetCoins</span>.
  </p>
</div>
<form
  onSubmit={handleLogin}
  className="relative z-20 bg-black/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl px-6 py-8 w-full max-w-sm flex flex-col items-center gap-6"
>
  <div className="flex flex-col items-center gap-1">
    <span className="text-4xl drop-shadow-lg">🎲</span>
    <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
      Sign In
    </h2>
    <p className="text-sm text-gray-300 text-center max-w-xs">
      Enter your credentials to join the arena!
    </p>
  </div>

  <div className="w-full flex flex-col gap-4">
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white font-semibold transition"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white font-semibold transition"
    />
    <button
      type="submit"
      className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-bold text-lg shadow transition"
    >
      Sign In
    </button>
    <p className="text-xs text-center text-gray-300 mt-2">
      Don’t have an account?{' '}
      <a href="/users/create" className="text-white underline hover:text-gray-200 font-bold">
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
