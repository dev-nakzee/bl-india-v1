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
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Services = () => {
  const [services, setServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [service, setService] = useState({
    name: '',
    slug: '',
    image: null,
    image_alt: '',
    tagline: '',
    description: '',
    compliance_header: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_tags: '',
    is_global: false,
    service_category_id: ''
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchServiceCategories();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to fetch services');
      console.error('Failed to fetch services', error);
    }
  };

  const fetchServiceCategories = async () => {
    try {
      const response = await apiClient.get('/service-categories');
      setServiceCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch service categories');
      console.error('Failed to fetch service categories', error);
    }
  };

  const handleClickOpen = () => {
    setService({
      name: '',
      slug: '',
      image: null,
      image_alt: '',
      tagline: '',
      description: '',
      compliance_header: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_tags: '',
      is_global: false,
      service_category_id: ''
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (service) => {
    setService({
      ...service,
      image: null, // Reset image input to prevent unintentional uploads
    });
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/services/${deleteId}`);
      fetchServices(); // Refresh the list after deletion
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
      console.error('Failed to delete service', error);
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
    const { name, value, type, checked, files } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', service.name);
    formData.append('slug', service.slug);
    formData.append('image_alt', service.image_alt);
    formData.append('tagline', service.tagline);
    formData.append('description', service.description);
    formData.append('compliance_header', service.compliance_header);
    formData.append('seo_title', service.seo_title);
    formData.append('seo_description', service.seo_description);
    formData.append('seo_keywords', service.seo_keywords);
    formData.append('seo_tags', service.seo_tags);
    formData.append('is_global', service.is_global ? 1 : 0); // Convert boolean to string
    formData.append('service_category_id', service.service_category_id);
    if (service.image) {
      formData.append('image', service.image); // Append image file directly
    }

    try {
      if (editing) {
        await apiClient.post(`/services/${service.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Service updated successfully');
      } else {
        await apiClient.post('/services', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Service added successfully');
      }
      fetchServices();
      handleClose();
    } catch (error) {
      toast.error('Failed to save service');
      console.error('Failed to save service', error);
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Services Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Service
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Is Global</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell><img src={service.thumbnail_url} alt={service.image_alt} /></TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.slug}</TableCell>
                <TableCell>{service.service_category.name}</TableCell>
                <TableCell>{service.is_global ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(service)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(service.id)}
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
        <DialogTitle>{editing ? 'Edit Service' : 'Add Service'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the service.' : 'Fill in the details to add a new service.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Name"
              name="name"
              value={service.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Slug"
              name="slug"
              value={service.slug || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Image Alt"
              name="image_alt"
              value={service.image_alt || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tagline"
              name="tagline"
              value={service.tagline || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>
            <TextField
              label="Description"
              name="description"
              value={service.description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Compliance Header"
              name="compliance_header"
              value={service.compliance_header || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Title"
              name="seo_title"
              value={service.seo_title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Description"
              name="seo_description"
              value={service.seo_description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Keywords"
              name="seo_keywords"
              value={service.seo_keywords || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Tags"
              name="seo_tags"
              value={service.seo_tags || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={service.is_global || false}
                  onChange={handleChange}
                  name="is_global"
                  color="primary"
                />
              }
              label="Is Global"
            />
            <TextField
              select
              label="Service Category"
              name="service_category_id"
              value={service.service_category_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {serviceCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
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
            Are you sure you want to delete this service? This action cannot be undone.
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

export default Services;
