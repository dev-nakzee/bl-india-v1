import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import apiClient from '../services/api'; // Ensure this is your configured axios instance
import FormData from 'form-data'; // Import form-data

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null, // Change to null to handle file input
    image_alt: ''
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await apiClient.get('/galleries');
      setGalleries(response.data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (gallery = null) => {
    setCurrentGallery(gallery);
    if (gallery) {
      setFormData({
        title: gallery.title,
        description: gallery.description,
        image: null, // Set to null for file input
        image_alt: gallery.image_alt
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: null,
        image_alt: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentGallery(null);
  };

  const handleConfirmOpen = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('image', formData.image);
    form.append('image_alt', formData.image_alt);

    try {
      if (currentGallery) {
        await apiClient.post(`/galleries/${currentGallery.id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await apiClient.post('/galleries', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchGalleries();
      handleClose();
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/galleries/${deleteId}`);
      fetchGalleries();
      handleConfirmClose();
    } catch (error) {
      console.error('Error deleting gallery:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gallery
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
        Add New Gallery
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleries.map((gallery) => (
              <TableRow key={gallery.id}>
                <TableCell>
                  {gallery.image_url && (
                    <img
                      src={gallery.image_url}
                      alt={gallery.image_alt}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </TableCell>
                <TableCell>{gallery.title}</TableCell>
                <TableCell>{gallery.description}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(gallery)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleConfirmOpen(gallery.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentGallery ? 'Edit Gallery' : 'Add New Gallery'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentGallery ? 'Edit the details of the gallery item.' : 'Enter the details of the new gallery item.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image_alt"
            label="Image Alt Text"
            type="text"
            fullWidth
            value={formData.image_alt}
            onChange={handleChange}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span" sx={{ mt: 2 }}>
              Upload Image
            </Button>
            {formData.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.image.name}
              </Typography>
            )}
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentGallery ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this gallery item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gallery;
