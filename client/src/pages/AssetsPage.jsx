import { useEffect, useState } from 'react';
import axios from 'axios';

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', location: '', condition: 'Good' });

  const fetchAssets = async () => {
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/assets` : '/api/assets';
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    setAssets(res.data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/assets` : '/api/assets';
    await axios.post(url, form, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ name: '', category: '', location: '', condition: 'Good' });
    fetchAssets();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Register Asset</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
          <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <select className="border p-2 rounded" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
            <option>Good</option>
            <option>Excellent</option>
            <option>Fair</option>
            <option>Poor</option>
          </select>
          <button className="md:col-span-4 bg-slate-900 text-white px-4 py-2 rounded">Save Asset</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Asset Directory</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Tag</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id} className="border-b">
                <td className="py-2">{asset.name}</td>
                <td>{asset.assetTag}</td>
                <td>{asset.status}</td>
                <td>{asset.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsPage;
