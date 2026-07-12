const NotificationsPage = () => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Notifications</h3>
      <ul className="space-y-2">
        <li className="border p-3 rounded">Asset assigned to employee</li>
        <li className="border p-3 rounded">Maintenance request approved</li>
        <li className="border p-3 rounded">Booking confirmed</li>
      </ul>
    </div>
  );
};

export default NotificationsPage;
