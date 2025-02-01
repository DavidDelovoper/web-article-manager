import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const response = await registerUser({ email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        setError('Registration error');
      }
    } catch {
      setError('Registration error');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-700">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Registration</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-500 underline bg-transparent border-none">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;