import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AssetsPage from './pages/AssetsPage';
import AllocationPage from './pages/AllocationPage';
import BookingPage from './pages/BookingPage';
import MaintenancePage from './pages/MaintenancePage';
import AuditPage from './pages/AuditPage';
import ReportsPage from './pages/ReportsPage';
import NotificationsPage from './pages/NotificationsPage';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={token ? <Layout><DashboardPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/assets" element={token ? <Layout><AssetsPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/allocation" element={token ? <Layout><AllocationPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/bookings" element={token ? <Layout><BookingPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/maintenance" element={token ? <Layout><MaintenancePage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/audits" element={token ? <Layout><AuditPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/reports" element={token ? <Layout><ReportsPage /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/notifications" element={token ? <Layout><NotificationsPage /></Layout> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
