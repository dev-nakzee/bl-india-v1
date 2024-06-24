import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    image_alt: ''
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await apiClient.get('/api/galleries');
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
        image: gallery.image,
        image_alt: gallery.image_alt
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        image_alt: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentGallery(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      if (currentGallery) {
        await apiClient.put(`/api/galleries/${currentGallery.id}`, formData);
      } else {
        await apiClient.post('/api/galleries', formData);
      }
      fetchGalleries();
      handleClose();
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/galleries/${id}`);
      fetchGalleries();
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
      <List>
        {galleries.map((gallery) => (
          <ListItem key={gallery.id} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={gallery.title}
              secondary={gallery.description}
            />
            <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(gallery)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(gallery.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
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
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={formData.image}
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
    </Box>
  );
};

export default Gallery;
