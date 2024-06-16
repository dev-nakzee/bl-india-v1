import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { isAuthenticated } from '../services/auth';  // Update this path as necessary

const ProtectedRoute = ({ element }) => {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const checkAuthStatus = async () => {
      try {
        const authStatus = await isAuthenticated();
        if (isMounted) {
          setIsAuth(authStatus);
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
        if (isMounted) {
          setIsAuth(false);  // Assume unauthenticated on error
        }
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;  // Cleanup function to avoid setting state on unmounted component
    };
  }, []);

  if (isAuth === null) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  }

  return isAuth ? element : <Navigate to="/cms/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
