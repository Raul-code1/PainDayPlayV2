import { Outlet } from 'react-router-dom';

import { AdminNavBar } from './components';
import { AdminDashboardContainer } from './styled-components/admin-dashboard';

export default function AdminDashboard() {
  return (
    <AdminDashboardContainer>
      <AdminNavBar />
      <Outlet />
    </AdminDashboardContainer>
  );
}
