import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Divider,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { countries } from 'country-data';
import apiClient from "../Services/api"; // Ensure the import path is correct

const RequestCallBack = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+1',
    email: '',
    schedule: '',
  });
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
    if (!open) {
      setShowOtpField(false);
      setLoading(false);
      setErrors({});
      setSuccessMessage('');
      setFormData({
        name: '',
        phone: '',
        countryCode: '+1',
        email: '',
        schedule: '',
      });
      setOtp('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');
    try {
      await apiClient.post('/schedule', formData);
      setShowOtpField(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Failed to schedule call. Please try again." });
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');
    try {
      await apiClient.post('/schedule-verify-otp', { email: formData.email, otp });
      setSuccessMessage("Call scheduled successfully");
      setFormData({
        name: '',
        phone: '',
        countryCode: '+1',
        email: '',
        schedule: '',
      });
      setOtp('');
      setShowOtpField(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message === "Invalid OTP or OTP expired.") {
        setFormData({
          name: '',
          phone: '',
          countryCode: '+1',
          email: '',
          schedule: '',
        });
        setOtp('');
        setShowOtpField(false);
        setErrors({ general: "Invalid OTP or OTP expired." });
      } else if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Failed to verify OTP. Please try again." });
      }
    }
  };

  return (
    <>
      <Divider sx={{ mt: 6, mb: 4 }} />
      <Box sx={{ textAlign: 'left', padding: 2 }}>
        <Typography variant="h6" mb={1}>
          Request a Callback
        </Typography>
        <Typography variant="body1" mb={1}>
          Fill out the form for the call back and learn more about our services.
        </Typography>
        <Button variant="contained" color="primary" sx={{ textTransform: 'inherit' }} onClick={toggleDrawer(true)}>
          Request Callback
        </Button>
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 500, padding: 4 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Request a Callback
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}>
            {!showOtpField && !loading && (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.name}
                  helperText={errors.name && errors.name[0]}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.email}
                  helperText={errors.email && errors.email[0]}
                />
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <TextField
                      select
                      label="Code"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.country_code}
                      helperText={errors.country_code && errors.country_code[0]}
                      SelectProps={{
                        MenuProps: {
                          sx: { zIndex: 2000 },
                        },
                      }}
                    >
                      {countries.all.map((country) => (
                        <MenuItem key={country.alpha2} value={country.countryCallingCodes[0]}>
                          {country.countryCallingCodes[0]} ({country.name})
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
                      margin="normal"
                      required
                      error={!!errors.phone}
                      helperText={errors.phone && errors.phone[0]}
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Schedule (Date and Time)"
                  name="schedule"
                  type="datetime-local"
                  value={formData.schedule}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.schedule}
                  helperText={errors.schedule && errors.schedule[0]}
                />
              </>
            )}
            {showOtpField && (
              <TextField
                label="OTP"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                fullWidth
                margin="normal"
                required
                error={!!errors.otp}
                helperText={errors.otp && errors.otp[0]}
              />
            )}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {showOtpField ? "Verify OTP" : "Schedule Call"}
              </Button>
            )}
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default RequestCallBack;
