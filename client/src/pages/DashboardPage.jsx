import { useEffect, useState } from 'react';
import axios from 'axios';

const cards = [
  { title: 'Assets Available', key: 'available' },
  { title: 'Assets Allocated', key: 'allocated' },
  { title: 'Maintenance Today', key: 'maintenanceToday' },
  { title: 'Active Bookings', key: 'activeBookings' },
  { title: 'Pending Transfers', key: 'pendingTransfers' },
  { title: 'Overdue Returns', key: 'overdueReturns' }
];

const DashboardPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/dashboard` : '/api/dashboard';
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.key} className="bg-white p-5 rounded shadow">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="text-3xl font-bold mt-2">{stats[card.key] ?? 0}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Operational Snapshot</h3>
        <p className="text-slate-600">The dashboard surfaces asset availability, maintenance volume, active bookings, pending transfers, and overdue returns in one place.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
