import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

type Props = {
  children: React.ReactNode;
};

export default function AdminProtectedRoute({ children }: Props) {
  const {
    user: { isAuthenticated, role },
  } = useAppSelector((store) => store.user);

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}
