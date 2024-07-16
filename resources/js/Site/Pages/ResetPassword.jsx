import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  CheckCircleOutline
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const ResetPassword = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await apiClient.get(`/password-reset/${token}`);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        setMessageType('error');
        setMessage('Invalid or expired token');
        setLoading(false);
      }
    };

    fetchEmail();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setMessageType('error');
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/password-reset', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessageType('success');
      setMessage('Password reset successfully. You can now log in with your new password.');
      setSuccess(true);
    } catch (error) {
      setMessageType('error');
      setMessage('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h6">Reset Password</Typography>
      {loading ? (
        <CircularProgress />
      ) : success ? (
        <Box textAlign="center">
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mt: 2 }} />
          <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
            Password reset successfully
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            You can now log in with your new password.
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          {message && <Alert severity={messageType}>{message}</Alert>}
          <TextField
            label="Email"
            value={email}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ResetPassword;
