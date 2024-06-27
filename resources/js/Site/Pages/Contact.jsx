import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/contact');
      setData(response.data);
    } catch (error) {
      toast.error('Error fetching contact data');
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
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
      await apiClient.post('/contact-form', formData);
      toast.success('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error('Error sending message');
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Container>
      <ToastContainer />
      <Helmet>
        <title>{data.page.seo_title}</title>
        <meta name="description" content={data.page.seo_description} />
        <meta name="keywords" content={data.page.seo_keywords} />
      </Helmet>
      <Box sx={{ paddingTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
          <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>Contact Us</Typography>
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">Send</Button>
          </form>
        </Box>

          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <List>
                <ListItem>
                  <ListItemText primary="Name" secondary={data.contact.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={data.contact.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone 1" secondary={data.contact.phone1} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone 2" secondary={data.contact.phone2} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone 3" secondary={data.contact.phone3} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Address" secondary={
                    <div dangerouslySetInnerHTML={{ __html: data.contact.address }} />
                  } />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>Our Location</Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <iframe
              title="Google Maps"
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(data.contact.address)}`}
              style={{ border: 0, width: '100%', height: '400px' }}
              allowFullScreen
            />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
