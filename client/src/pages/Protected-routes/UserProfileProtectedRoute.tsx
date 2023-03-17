import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

type Props = {
  children: React.ReactNode;
};

export default function UserProfileProtectedRoute({ children }: Props) {
  const {
    user: { isAuthenticated },
  } = useAppSelector((store) => store.user);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}
