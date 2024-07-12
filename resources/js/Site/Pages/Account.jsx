import React, { useState } from 'react';
import { Typography, Box, Grid, TextField, Button, Alert } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Account = () => {
  const client = JSON.parse(localStorage.getItem('client'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'

  const handlePasswordChange = async () => {
    setMessage('');
    setMessageType('');
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match');
      setMessageType('error');
      return;
    }

    try {
      const response = await apiClient.post('/client/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setMessage('Password changed successfully');
      setMessageType('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage('Failed to change password');
      setMessageType('error');
    }
  };

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

          <Typography variant="h5" sx={{ marginTop: 3 }}>Change Password</Typography>
          {message && (
            <Alert severity={messageType} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 2 }} 
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Account;
