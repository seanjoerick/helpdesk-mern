import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { currentUser } = useSelector(state => state.user);

  // Check if the user is authenticated
  if (!currentUser) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to='/sign-in' />;
  }

  // Check if the user has one of the allowed roles
  const hasAccess = Array.isArray(allowedRoles) && allowedRoles.length > 0 
    ? allowedRoles.some(role => currentUser.roles.includes(role))
    : true; // If no roles are specified, grant access

  if (!hasAccess) {
    // Redirect to unauthorized page if the user does not have access
    return <Navigate to='/unauthorized' />;
  }

  // Render child routes if authenticated and has access
  return <Outlet />;
};

export default PrivateRoute;
