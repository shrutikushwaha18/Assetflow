import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Assets', path: '/assets' },
  { label: 'Allocation', path: '/allocation' },
  { label: 'Bookings', path: '/bookings' },
  { label: 'Maintenance', path: '/maintenance' },
  { label: 'Audits', path: '/audits' },
  { label: 'Reports', path: '/reports' },
  { label: 'Notifications', path: '/notifications' }
];

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 fixed h-full">
        <h1 className="text-2xl font-bold mb-8">AssetFlow</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`block rounded px-3 py-2 ${location.pathname === item.path ? 'bg-slate-700' : 'hover:bg-slate-800'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Enterprise Asset & Resource Management</h2>
          <button className="bg-slate-900 text-white px-4 py-2 rounded" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>
            Logout
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
