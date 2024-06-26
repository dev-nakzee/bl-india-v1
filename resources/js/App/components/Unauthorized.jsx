import React from 'react';
import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4" color="error">
        You are not authorized to access this page.
      </Typography>
    </Box>
  );
};

export default Unauthorized;
