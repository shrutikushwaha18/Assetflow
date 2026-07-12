import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API = import.meta.env.VITE_API || '';
      const url = API ? `${API}/api/auth/login` : '/api/auth/login';
      const res = await axios.post(url, form);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleSubmit} className="bg-white text-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">AssetFlow Login</h1>
        <input className="w-full border p-3 rounded mb-4" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-3 rounded mb-4" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-slate-900 text-white py-3 rounded">Sign In</button>
        <p className="mt-4 text-sm">Demo: use any email/password to sign in; the API will create a session when the backend is running.</p>
      </form>
    </div>
  );
};

export default LoginPage;
