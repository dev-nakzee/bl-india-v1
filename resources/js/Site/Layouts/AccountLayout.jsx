import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import Sidebar from '../Layouts/Sidebar';

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
