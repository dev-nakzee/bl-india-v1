import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AccountLayout = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
          <Typography variant="h6">
            Welcome, {client.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountLayout;
