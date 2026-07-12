import { useEffect, useState } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ resourceName: '', startTime: '', endTime: '' });

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/bookings` : '/api/bookings';
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const API = import.meta.env.VITE_API || '';
    const url = API ? `${API}/api/bookings` : '/api/bookings';
    await axios.post(url, { ...form, bookedBy: '000000000000000000000000' }, { headers: { Authorization: `Bearer ${token}` } });
    setForm({ resourceName: '', startTime: '', endTime: '' });
    fetchBookings();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Book Shared Resource</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <input className="border p-2 rounded" placeholder="Resource" value={form.resourceName} onChange={(e) => setForm({ ...form, resourceName: e.target.value })} />
          <input className="border p-2 rounded" type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          <input className="border p-2 rounded" type="datetime-local" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          <button className="md:col-span-3 bg-slate-900 text-white px-4 py-2 rounded">Create Booking</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Bookings</h3>
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-3 rounded">{booking.resourceName} — {booking.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingPage;
