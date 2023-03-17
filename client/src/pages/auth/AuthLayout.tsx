import { Outlet } from 'react-router-dom';

import { AuthLayoutContainer } from './styled-components';

export default function AuthLayout() {
  return (
    <AuthLayoutContainer>
      <Outlet />
    </AuthLayoutContainer>
  );
}
