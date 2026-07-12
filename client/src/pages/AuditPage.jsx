import { useEffect, useState } from 'react';
import axios from 'axios';

const AuditPage = () => {
  const [audits, setAudits] = useState([]);
  const [form, setForm] = useState({ title: '', location: '' });

  const fetchAudits = async () => {
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/audits` : '/api/audits';
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    setAudits(res.data);
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/audits` : '/api/audits';
    await axios.post(url, form, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ title: '', location: '' });
    fetchAudits();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Create Audit Cycle</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Audit title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <button className="md:col-span-2 bg-slate-900 text-white px-4 py-2 rounded">Create Audit</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Audit History</h3>
        <ul className="space-y-2">
          {audits.map((audit) => (
            <li key={audit._id} className="border p-3 rounded">{audit.title} — {audit.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuditPage;
