import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
    <header className="mb-10">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
        Welcome to My App
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        A beautiful, responsive landing page built with React and Tailwind CSS.
      </p>
    </header>

    <div className="flex space-x-4 mb-8">
      <a
        href="https://vitejs.dev"
        target="_blank"
        className="hover:scale-105 transition-transform"
      >
        <img src={viteLogo} alt="Vite" className="w-20 h-20" />
      </a>
      <a
        href="https://reactjs.org"
        target="_blank"
        className="hover:scale-105 transition-transform"
      >
        <img src={reactLogo} alt="React" className="w-20 h-20" />
      </a>
    </div>

    <button
      onClick={() => setCount(count + 1)}
      className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
    >
      Count is {count}
    </button>

    <footer className="mt-10 text-sm text-gray-500">
      Edit <code>src/App.jsx</code> and save to test HMR.
    </footer>
  </div>
  )
}

export default App
