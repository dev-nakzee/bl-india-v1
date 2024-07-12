import React from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AccountLayout = () => {
  return (
    <Grid container>
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
