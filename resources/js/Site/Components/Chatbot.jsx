import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Chatbot = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: 300,
        height: 400,
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6">Chatbot</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        {/* Chatbot content goes here */}
        <Typography>Welcome! How can I help you today?</Typography>
      </Box>
    </Box>
  );
};

export default Chatbot;
