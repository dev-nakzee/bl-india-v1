import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Drawer,
  IconButton,
  Grid,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../Services/api';

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

const ScheduleCallDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+1',
    schedule: '',
  });

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
        phone: '',
        countryCode: '+1',
        schedule: '',
      });
      handleDrawerClose();
    } catch (error) {
      toast.error('Failed to schedule call');
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDrawerOpen}>
        Connect with us
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose} sx={{ zIndex: 1301}}>
        <Box sx={{ width: 350, p: 3 }}>
          <IconButton onClick={handleDrawerClose} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Schedule a Call
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
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
                ),
              }}
            />
            <TextField
              label="Schedule (Date and Time)"
              name="schedule"
              type="datetime-local"
              value={formData.schedule}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Schedule Call
            </Button>
          </Box>
        </Box>
      </Drawer>
      <ToastContainer />
    </>
  );
};

export default ScheduleCallDrawer;
