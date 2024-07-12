import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  TextField,
  Button,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AccountCircle, Close } from '@mui/icons-material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterLoginDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    otp: '',
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setOtpSent(false); // Reset OTP state when drawer is toggled
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await apiClient.post('/client/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await apiClient.post('/client/login', {
        email: formData.email,
        password: formData.password,
      });
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const endpoint = isRegister ? '/client/verify-register-otp' : '/client/verify-login-otp';
      const response = await apiClient.post(endpoint, {
        email: formData.email,
        otp: formData.otp,
      });
      const { token, client } = response.data;

      // Save token and client info to localStorage or state
      localStorage.setItem('token', token);
      localStorage.setItem('client', JSON.stringify(client));

      toast.success('OTP verified successfully');
      setDrawerOpen(false);
    } catch (error) {
      toast.error('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <Box sx={{ width: isSmallScreen ? '100vw' : 400, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">{isRegister ? 'Register' : 'Login'}</Typography>
        <IconButton onClick={handleToggleDrawer}>
          <Close />
        </IconButton>
      </Box>
      {!otpSent ? (
        <>
          {isRegister && (
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {isRegister && (
            <TextField
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={isRegister ? handleRegister : handleLogin}>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Box>
          <Button
            variant="text"
            onClick={() => setIsRegister(!isRegister)}
            sx={{ mt: 2, textAlign: 'center', width: '100%' }}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="secondary" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={handleToggleDrawer} color="inherit">
        <AccountCircle fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={handleToggleDrawer}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          renderForm()
        )}
      </Drawer>
      <ToastContainer />
    </Box>
  );
};

export default RegisterLoginDrawer;
