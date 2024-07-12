import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await apiClient.post('/client/check-token');
        if (response.status === 200) {
          setIsValid(true);
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isValid ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
