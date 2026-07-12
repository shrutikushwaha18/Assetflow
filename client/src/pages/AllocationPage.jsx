import { useState } from 'react';

const AllocationPage = () => {
  const [form, setForm] = useState({ asset: '', holder: '', expectedReturnDate: '' });

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Asset Allocation & Transfer</h3>
      <form className="grid md:grid-cols-3 gap-4">
        <input className="border p-2 rounded" placeholder="Asset" value={form.asset} onChange={(e) => setForm({ ...form, asset: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Employee / Department" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} />
        <input className="border p-2 rounded" type="date" value={form.expectedReturnDate} onChange={(e) => setForm({ ...form, expectedReturnDate: e.target.value })} />
        <button className="md:col-span-3 bg-slate-900 text-white px-4 py-2 rounded">Create Allocation</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">The workflow blocks double allocation and supports transfer requests through the backend service layer.</p>
    </div>
  );
};

export default AllocationPage;
