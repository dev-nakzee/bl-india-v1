import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Brochures = () => {
  const [brochures, setBrochures] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [brochure, setBrochure] = useState({
    title: '',
    filename: null,
    service_id: '',
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBrochures();
    fetchServices();
  }, []);

  const fetchBrochures = async () => {
    try {
      const response = await apiClient.get('/brochures');
      if (Array.isArray(response.data)) {
        setBrochures(response.data);
      } else {
        toast.error('Unexpected response format for brochures');
      }
    } catch (error) {
      toast.error('Failed to fetch brochures');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/services');
      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        toast.error('Unexpected response format for services');
      }
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const handleClickOpen = () => {
    setBrochure({
      title: '',
      filename: null,
      service_id: '',
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (brochure) => {
    setBrochure(brochure);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/brochures/${deleteId}`);
      fetchBrochures();
      toast.success('Brochure deleted successfully');
    } catch (error) {
      toast.error('Failed to delete brochure');
    } finally {
      setConfirmDeleteOpen(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteOpen(false);
    setDeleteId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrochure((prevBrochure) => ({
      ...prevBrochure,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBrochure((prevBrochure) => ({
      ...prevBrochure,
      filename: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', brochure.title);
    formData.append('service_id', brochure.service_id);
    if (brochure.filename) {
      formData.append('filename', brochure.filename);
    }

    try {
      if (editing) {
        await apiClient.post(`/brochures/${brochure.id}`, formData);
        toast.success('Brochure updated successfully');
      } else {
        await apiClient.post('/brochures', formData);
        toast.success('Brochure added successfully');
      }
      fetchBrochures();
      handleClose();
    } catch (error) {
      toast.error('Failed to save brochure');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Brochures Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Brochure
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Filename</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brochures.map((brochure) => (
              <TableRow key={brochure.id}>
                <TableCell>{brochure.title}</TableCell>
                <TableCell>{brochure.service?.name}</TableCell>
                <TableCell>
                  <a href={`/storage/${brochure.filename}`} target="_blank" rel="noopener noreferrer">
                    {brochure.filename.split('/').pop()}
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(brochure)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(brochure.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Brochure' : 'Add Brochure'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the brochure.' : 'Fill in the details to add a new brochure.'}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={brochure.title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Service</InputLabel>
              <Select
                name="service_id"
                value={brochure.service_id || ''}
                onChange={handleChange}
                required
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Filename"
              type="file"
              name="filename"
              onChange={handleFileChange}
              fullWidth
              margin="normal"
              required={!editing}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this brochure? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default Brochures;
