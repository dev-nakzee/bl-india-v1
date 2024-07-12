import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import Sidebar from '../Layouts/Sidebar';

const Account = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4">Account Details</Typography>
          <Typography variant="h6">Name: {client.name}</Typography>
          <Typography variant="h6">Email: {client.email}</Typography>
          {/* Add more account-related information here */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Account;
