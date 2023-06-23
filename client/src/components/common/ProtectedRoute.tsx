import { isAuthenticated } from '@projecthermes/client/config/util';
import { Navigate } from 'react-router-dom';

interface props {
  element: JSX.Element;
}

export function ProtectedRoute({ element }: props) {
  const authState = isAuthenticated();
  if (!authState) return <Navigate to={'/'} />;
  return element;
}
