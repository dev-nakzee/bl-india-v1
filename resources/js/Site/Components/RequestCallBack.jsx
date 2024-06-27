import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  TextField,
  Typography,
  IconButton,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schedules = [
  'Morning (9am - 12pm)',
  'Afternoon (12pm - 3pm)',
  'Evening (3pm - 6pm)',
  'Anytime',
];

const RequestCallBack = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    schedule: '',
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the server (adjust the endpoint and data format as needed)
      // await apiClient.post('/request-callback', formData);
      toast.success('Callback request submitted successfully');
      setFormData({
        name: '',
        phone: '',
        schedule: '',
      });
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error('Error submitting callback request');
      console.error('Error submitting callback request:', error);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Request a Callback
        </Typography>
        <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
          Request Callback
        </Button>
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 350, padding: 4 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Request a Callback
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              select
              label="Preferred Schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {schedules.map((schedule) => (
                <MenuItem key={schedule} value={schedule}>
                  {schedule}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Drawer>
    </Container>
  );
};

export default RequestCallBack;
