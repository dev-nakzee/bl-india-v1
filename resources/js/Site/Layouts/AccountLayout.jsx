import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AccountLayout = () => {
  const client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : null;

  // Redirect or show message if client data is not available
  if (!client) {
    // Uncomment the next line to redirect instead of showing a message
    // return <Navigate to="/login" replace />;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">Please log in or register to access this area.</Typography>
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
          <Typography variant="h6">
            Welcome, {client.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={10}>
        <Box sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountLayout;
