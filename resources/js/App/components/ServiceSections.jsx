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
  FormControlLabel,
  Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const ServiceSections = () => {
  const [serviceSections, setServiceSections] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [serviceSection, setServiceSection] = useState({
    service_id: '',
    name: '',
    slug: '',
    tagline: '',
    content: '',
    is_global: false,
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchServiceSections();
    fetchServices();
  }, []);

  const fetchServiceSections = async () => {
    try {
      const response = await apiClient.get('/service-sections');
      setServiceSections(response.data);
    } catch (error) {
      toast.error(`Failed to fetch service sections: ${error.message}`);
      console.error('Error fetching service sections:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/services');
      setServices(response.data);
    } catch (error) {
      toast.error(`Failed to fetch services: ${error.message}`);
      console.error('Error fetching services:', error);
    }
  };

  const handleClickOpen = () => {
    setServiceSection({
      service_id: '',
      name: '',
      slug: '',
      tagline: '',
      content: '',
      is_global: false,
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (serviceSection) => {
    setServiceSection(serviceSection);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/service-sections/${deleteId}`);
      fetchServiceSections();
      toast.success('Service section deleted successfully');
    } catch (error) {
      toast.error(`Failed to delete service section: ${error.message}`);
      console.error('Error deleting service section:', error);
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
    const { name, value, type, checked } = e.target;
    setServiceSection((prevServiceSection) => ({
      ...prevServiceSection,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setServiceSection((prevServiceSection) => ({
      ...prevServiceSection,
      content: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.put(`/service-sections/${serviceSection.id}`, serviceSection);
        toast.success('Service section updated successfully');
      } else {
        await apiClient.post('/service-sections', serviceSection);
        toast.success('Service section added successfully');
      }
      fetchServiceSections();
      handleClose();
    } catch (error) {
      toast.error(`Failed to save service section: ${error.message}`);
      console.error('Error saving service section:', error);
    }
  };

  // Custom upload adapter for CKEditor 5
  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('upload', file);
            apiClient
              .post('/upload-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((response) => {
                resolve({
                  default: response.data.url,
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
      );
    }

    abort() {
      // Reject the promise returned from upload()
    }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  const getBaseURL = () => {
    const hostname = window.location.hostname;
    if (hostname.startsWith('global')) {
      return 'http://global.localhost:8000/api/v1/cms';
    } else if (hostname.startsWith('in')) {
      return 'http://in.localhost:8000/api/v1/cms';
    }
    return 'http://localhost:8000/api/v1/cms'; // Default to local
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Service Sections Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Service Section
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Tagline</TableCell>
              <TableCell>Global</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceSections.length > 0 ? (
              serviceSections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell>{section.id}</TableCell>
                  <TableCell>{section.service ? section.service.name : 'N/A'}</TableCell>
                  <TableCell>{section.name}</TableCell>
                  <TableCell>{section.slug}</TableCell>
                  <TableCell>{section.tagline}</TableCell>
                  <TableCell>{section.is_global ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(section)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(section.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No service sections found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Service Section' : 'Add Service Section'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the service section.' : 'Fill in the details to add a new service section.'}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              label="Service"
              name="service_id"
              value={serviceSection.service_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {services.length > 0 ? (
                services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No services available</MenuItem>
              )}
            </TextField>
            <TextField
              label="Name"
              name="name"
              value={serviceSection.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Slug"
              name="slug"
              value={serviceSection.slug || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Tagline"
              name="tagline"
              value={serviceSection.tagline || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={serviceSection.is_global}
                  onChange={handleChange}
                  name="is_global"
                  color="primary"
                />
              }
              label="Global"
            />
            <CKEditor
              editor={ClassicEditor}
              data={serviceSection.content || ''}
              onChange={handleContentChange}
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
                toolbar: [
                  'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                  'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|', 'imageUpload', '|', 'undo', 'redo'
                ],
              }}
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
          <DialogContentText>Are you sure you want to delete this service section? This action cannot be undone.</DialogContentText>
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

export default ServiceSections;
