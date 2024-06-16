// resources/js/components/ProtectedRoute.jsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const ProtectedRoute = ({ element }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsAuth(result);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
