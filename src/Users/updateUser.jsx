import { useState } from 'react'

function UpdateUser() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    bio: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updated Data:', formData)
    setSubmitted(true)
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1e40af_0%,_#7c3aed_100%)] px-4 py-10 text-white">
      {!submitted ? (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-xl shadow-2xl p-8 w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">⚙️ Update Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              type="text"
              placeholder="New Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="password"
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              name="bio"
              placeholder="Update Bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-xl shadow-2xl p-8 w-full max-w-md space-y-6 text-center">
          <h2 className="text-4xl font-bold text-white">✅ Changes Saved!</h2>
          <p className="text-lg text-gray-200">
            Your profile has been updated successfully.
          </p>
          <a
            href="/"
            className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            ⬅ Back to Home
          </a>
        </div>
      )}
    </div>
  )
}

export default UpdateUser
