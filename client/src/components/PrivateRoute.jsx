import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the user is authenticated
  if (!currentUser) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to='/sign-in' />;
  }

  // Render child routes if authenticated
  return <Outlet />;
}
 