import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        setError('Wrong email or password');
      }
    } catch {
      setError('Login error');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-700">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          No account?{' '}
          <button onClick={() => navigate('/register')} className="text-blue-500 underline bg-transparent border-none">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;