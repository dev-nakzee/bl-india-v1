import React from 'react';
import { Typography, Box } from '@mui/material';

const Account = () => {
  const client = JSON.parse(localStorage.getItem('client'));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Account Details</Typography>
      <Typography variant="h6">Name: {client.name}</Typography>
      <Typography variant="h6">Email: {client.email}</Typography>
      {/* Add more account-related information here */}
    </Box>
  );
};

export default Account;
