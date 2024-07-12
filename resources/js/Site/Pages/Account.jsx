import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const client = JSON.parse(localStorage.getItem('client'));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear client and token information from localStorage
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    
    // Navigate back to the home page or login page
    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Account Details</Typography>
      <Typography variant="h6">Name: {client.name}</Typography>
      <Typography variant="h6">Email: {client.email}</Typography>
      {/* Add more account-related information here */}
      <Button 
        variant="contained" 
        color="secondary" 
        sx={{ marginTop: 2 }} 
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Account;
