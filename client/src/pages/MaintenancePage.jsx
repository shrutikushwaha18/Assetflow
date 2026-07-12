import { useEffect, useState } from 'react';
import api from '../services/api';

const MaintenancePage = () => {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ description: '', priority: 'Medium' });

  const fetchRequests = async () => {
    const res = await api.get('/api/maintenance');
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/maintenance', { ...form, asset: '000000000000000000000000', requestedBy: '000000000000000000000000' });
    setForm({ description: '', priority: 'Medium' });
    fetchRequests();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Raise Maintenance Request</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea className="w-full border p-2 rounded" placeholder="Describe issue" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select className="border p-2 rounded" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button className="bg-slate-900 text-white px-4 py-2 rounded">Submit Request</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Maintenance Queue</h3>
        <ul className="space-y-2">
          {requests.map((request) => (
            <li key={request._id} className="border p-3 rounded">{request.description} — {request.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaintenancePage;
