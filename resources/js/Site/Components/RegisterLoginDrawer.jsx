import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Tooltip,
  Grid,
  MenuItem,
} from '@mui/material';
import { AccountCircle, Close, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { countries } from "country-data";
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const RegisterLoginDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    password: '',
    password_confirmation: '',
    otp: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleToggleDrawer = () => {
    if (isLoggedIn) {
      navigate('/account');
    } else {
      setDrawerOpen(!drawerOpen);
      if (!drawerOpen) {
        setOtpSent(false);
        setIsRegister(true);
        setIsForgotPassword(false);
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          phone: '',
          password: '',
          password_confirmation: '',
          otp: '',
        });
        setMessage('');
        setErrors({});
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrors({});
    try {
      await apiClient.post('/client/register', {
        name: formData.name,
        email: formData.email,
        country_code: formData.countryCode,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      setOtpSent(true);
      setMessageType('success');
      setMessage('OTP sent to your email');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessageType('error');
        setMessage('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrors({});
    try {
      await apiClient.post('/client/login', {
        email: formData.email,
        password: formData.password,
      });
      setOtpSent(true);
      setMessageType('success');
      setMessage('OTP sent to your email');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessageType('error');
        setMessage('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setErrors({});
    try {
      await apiClient.post('/client/forgot-password', {
        email: formData.email,
      });
      setMessageType('success');
      setMessage('Password reset email sent');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessageType('error');
        setMessage('Password reset request failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrors({});
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

      setMessageType('success');
      setMessage('OTP verified successfully');
      setIsLoggedIn(true);
      handleToggleDrawer();
      navigate('/account');
    } catch (error) {
      setMessageType('error');
      setMessage('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          {isForgotPassword ? 'Forgot Password' : isRegister ? 'Register' : 'Login'}
        </Typography>
        <IconButton onClick={handleToggleDrawer}>
          <Close />
        </IconButton>
      </Box>
      {message && (
        <Alert severity={messageType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {isForgotPassword ? (
        <>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email[0] : ''}
          />
          <Button variant="contained" color="secondary" onClick={handleForgotPassword}>
            Send Password Reset Email
          </Button>
        </>
      ) : !otpSent ? (
        <>
          {isRegister && (
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? errors.name[0] : ''}
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
            error={!!errors.email}
            helperText={errors.email ? errors.email[0] : ''}
          />
          {isRegister &&(
          <Grid container spacing={2} alignItems="center" sx={{ mt:1 }}>
            <Grid item xs={4}>
                <TextField
                    select
                    label="Code"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.country_code}
                    helperText={
                        errors.country_code &&
                        errors.country_code[0]
                    }
                    SelectProps={{
                        MenuProps: {
                            sx: {
                                zIndex: 2100,
                            },
                        },
                    }}
                >
                    {countries.all.map((country) => (
                        <MenuItem
                            key={country.alpha2}
                            value={
                                country
                                    .countryCallingCodes[0]
                            }
                        >
                            {
                                country
                                    .countryCallingCodes[0]
                            }{" "}
                            ({country.name})
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.phone}
                    helperText={
                        errors.phone && errors.phone[0]
                    }
                />
            </Grid>
          </Grid>)}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password[0] : ''}
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
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation ? errors.password_confirmation[0] : ''}
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={isRegister ? handleRegister : handleLogin}>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Box>
          {!isRegister && (
            <Button
              variant="text"
              onClick={() => setIsForgotPassword(true)}
              sx={{ mt: 2, textAlign: 'center', width: '100%' }}
            >
              Forgot Password?
            </Button>
          )}
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
            error={!!errors.otp}
            helperText={errors.otp ? errors.otp[0] : ''}
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
      <Tooltip title={isLoggedIn ? 'Access Account' : 'Register / Login'}>
        <IconButton onClick={handleToggleDrawer} color="inherit">
          {isLoggedIn ? <AccountCircle fontSize="large" /> : <Lock fontSize="large" />}
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleToggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: isSmallScreen ? '100vw' : '25vw'
          }
        }}
      >
        {loading ? (
          <Box sx={{ width: isSmallScreen ? '100vw' : '25vw', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          renderForm()
        )}
      </Drawer>
    </Box>
  );
};

export default RegisterLoginDrawer;
