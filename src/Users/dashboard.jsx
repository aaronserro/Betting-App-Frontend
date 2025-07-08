import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
      <h1 className="text-4xl font-bold mb-6">🎉 Welcome to Your Dashboard!</h1>

      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
      >
        🔓 Logout
      </button>
    </div>
  );
}

export default Dashboard;
