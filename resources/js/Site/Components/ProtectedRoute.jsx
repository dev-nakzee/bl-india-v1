import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// LoginPrompt component
const LoginPrompt = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <p>Please register or login to access this page.</p>
    </Box>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await apiClient.get('/check-token');
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

  return isValid ? children : <LoginPrompt />;
};

export default ProtectedRoute;
