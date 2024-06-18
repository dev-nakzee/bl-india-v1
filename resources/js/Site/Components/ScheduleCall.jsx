import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+91', country: 'India' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+86', country: 'China' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+7', country: 'Russia' },
  { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' },
  { code: '+34', country: 'Spain' },
  { code: '+82', country: 'South Korea' },
  { code: '+971', country: 'UAE' },
  { code: '+52', country: 'Mexico' },
  { code: '+62', country: 'Indonesia' },
  { code: '+60', country: 'Malaysia' },
  { code: '+65', country: 'Singapore' },
  { code: '+66', country: 'Thailand' },
  { code: '+64', country: 'New Zealand' },
  { code: '+31', country: 'Netherlands' },
  { code: '+46', country: 'Sweden' },
  { code: '+41', country: 'Switzerland' },
  { code: '+48', country: 'Poland' },
  { code: '+45', country: 'Denmark' },
  { code: '+47', country: 'Norway' },
  { code: '+92', country: 'Pakistan' },
  { code: '+63', country: 'Philippines' },
  { code: '+20', country: 'Egypt' },
  { code: '+98', country: 'Iran' },
  { code: '+90', country: 'Turkey' },
  { code: '+58', country: 'Venezuela' },
  { code: '+56', country: 'Chile' },
  { code: '+51', country: 'Peru' },
  { code: '+57', country: 'Colombia' },
  { code: '+54', country: 'Argentina' },
  { code: '+964', country: 'Iraq' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+64', country: 'New Zealand' },
  { code: '+32', country: 'Belgium' },
  { code: '+353', country: 'Ireland' },
  { code: '+48', country: 'Poland' },
  { code: '+386', country: 'Slovenia' },
  { code: '+357', country: 'Cyprus' },
  { code: '+358', country: 'Finland' },
  { code: '+961', country: 'Lebanon' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+385', country: 'Croatia' },
  { code: '+380', country: 'Ukraine' },
];

const ScheduleCall = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+1',
    callDate: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/schedule-call', formData);
      toast.success('Call scheduled successfully');
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+1',
        callDate: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to schedule call');
    }
  };

  return (
    <Box sx={{ mx: 4, px: 4, py: 6 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Schedule a Call
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextField
                      select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      sx={{ width: '100px', mr: 1 }}
                    >
                      {countryCodes.map((code) => (
                        <MenuItem key={code.code} value={code.code}>
                          {code.code} ({code.country})
                        </MenuItem>
                      ))}
                    </TextField>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Preferred Call Date"
              name="callDate"
              type="date"
              value={formData.callDate}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" type="submit">
            Schedule Call
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ScheduleCall;
