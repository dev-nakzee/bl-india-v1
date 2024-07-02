import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  TextField,
  Typography,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const partnerTypes = ['Service Partner', 'Channel Partner'];
const entityTypes = ['Company', 'Individual'];

const PartnerWithUsLink = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    entityType: 'Individual',
    partnerType: 'Service Partner',
    name: '',
    email: '',
    phone: '',
    companyName: '',
    designation: '',
    fieldOfExpertise: '',
    yearsOfExperience: '',
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
      // await apiClient.post('/partner-with-us', formData);
      toast.success('Partner request submitted successfully');
      setFormData({
        partnerType: '',
        entityType: '',
        name: '',
        email: '',
        phone: '',
        companyName: '',
        designation: '',
        fieldOfExpertise: '',
        yearsOfExperience: '',
      });
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error('Error submitting partner request');
      console.error('Error submitting partner request:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Typography
        variant="body2"
        className="Service-list"
        onClick={toggleDrawer(true)}
      >
        Partner With Us
      </Typography>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 380, padding: 2 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Partner With Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" margin="normal" required>
              <FormLabel component="legend">Partner Type</FormLabel>
              <FormGroup row>
                <RadioGroup
                  row
                  name="partnerType"
                  value={formData.partnerType}
                  onChange={handleChange}
                >
                  {partnerTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      control={<Radio />}
                      label={type}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal" required>
              <FormLabel component="legend">Entity Type</FormLabel>
              <FormGroup row>
                <RadioGroup
                  row
                  name="entityType"
                  value={formData.entityType}
                  onChange={handleChange}
                >
                  {entityTypes.map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      control={<Radio />}
                      label={type}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
            </FormControl>
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
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            {formData.entityType === 'Company' && (
              <>
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </>
            )}
            {formData.entityType === 'Individual' && (
              <>
                <TextField
                  label="Field of Expertise"
                  name="fieldOfExpertise"
                  value={formData.fieldOfExpertise}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Years of Experience"
                  name="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:1}}>
              Submit
            </Button>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default PartnerWithUsLink;
