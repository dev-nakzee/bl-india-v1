import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogActions, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import apiClient from '../services/api'; // Ensure the API client is correctly configured

const Brochures = () => {
  const [brochures, setBrochures] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [brochureData, setBrochureData] = useState({ title: '', file: null, service_id: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchBrochures();
    fetchServices();
  }, []);

  const fetchBrochures = async () => {
    const response = await apiClient.get('/brochures');
    setBrochures(response.data || []);
  };

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/services');
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch services', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setBrochureData({ title: '', file: null, service_id: '' }); // Reset form when opening
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    setBrochureData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', brochureData.title);
    formData.append('service_id', brochureData.service_id);
    if (brochureData.file) {
        formData.append('filename', brochureData.file);
    }

    try {
        await apiClient.post('/brochures', formData);
        setSnackbarMessage('Brochure added successfully');
        setSnackbarOpen(true);
        fetchBrochures();
        handleClose(); // Close the dialog after successful save
    } catch (error) {
        setSnackbarMessage('Failed to add brochure: ' + error.response.data.message);
        setSnackbarOpen(true);
    }
  };
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/brochures/${id}`);
      setBrochures(brochures.filter(b => b.id !== id)); // Update UI
      setSnackbarMessage('Brochure deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to delete brochure: ' + (error.response.data.message || 'Server error'));
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Brochures Management</Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add Brochure
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brochures.map((brochure, index) => (
              <TableRow key={index}>
                <TableCell>{brochure.title}</TableCell>
                <TableCell>{brochure.service.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(brochure.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={brochureData.title}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
              <InputLabel>Service</InputLabel> {/* Corrected: close the tag properly */}
              <Select
                  name="service_id"
                  value={brochureData.service_id}
                  onChange={handleChange}
                  label="Service"
              >
                  {services.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                          {service.name}
                      </MenuItem>
                  ))}
              </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="filename"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Brochures;
