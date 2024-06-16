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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Stickers = () => {
  const [stickers, setStickers] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [sticker, setSticker] = useState({
    image: null,
    image_alt: '',
    image_type: 'Associate',
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchStickers();
  }, []);

  const fetchStickers = async () => {
    try {
      const response = await apiClient.get('/stickers');
      setStickers(response.data);
    } catch (error) {
      toast.error('Failed to fetch stickers');
      console.error('Failed to fetch stickers', error);
    }
  };

  const handleClickOpen = () => {
    setSticker({
      image: null,
      image_alt: '',
      image_type: 'Associate',
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (sticker) => {
    setSticker(sticker);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/stickers/${deleteId}`);
      fetchStickers(); // Refresh the list after deletion
      toast.success('Sticker deleted successfully');
    } catch (error) {
      toast.error('Failed to delete sticker');
      console.error('Failed to delete sticker', error);
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
    const { name, value, type, files } = e.target;
    setSticker((prevSticker) => ({
      ...prevSticker,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in sticker) {
      if (key === 'image' && sticker[key]) {
        formData.append(key, sticker[key]);
      } else {
        formData.append(key, sticker[key]);
      }
    }
    try {
      if (editing) {
        await apiClient.post(`/stickers/${sticker.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Sticker updated successfully');
      } else {
        await apiClient.post('/stickers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Sticker added successfully');
      }
      fetchStickers();
      handleClose();
    } catch (error) {
      toast.error('Failed to save sticker');
      console.error('Failed to save sticker', error);
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Stickers Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Sticker
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Alt Text</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stickers.map((sticker) => (
              <TableRow key={sticker.id}>
                <TableCell>{sticker.id}</TableCell>
                <TableCell><img src={sticker.image_url} alt={sticker.image_alt} style={{ width: '100px' }} /></TableCell>
                <TableCell>{sticker.image_alt}</TableCell>
                <TableCell>{sticker.image_type}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(sticker)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(sticker.id)}
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
        <DialogTitle>{editing ? 'Edit Sticker' : 'Add Sticker'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the sticker.' : 'Fill in the details to add a new sticker.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Alt Text"
              name="image_alt"
              value={sticker.image_alt || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              select
              label="Type"
              name="image_type"
              value={sticker.image_type || 'Associate'}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Associate">Associate</MenuItem>
              <MenuItem value="Site Certificate">Site Certificate</MenuItem>
              <MenuItem value="Company Certificate">Company Certificate</MenuItem>
            </TextField>
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
            Are you sure you want to delete this sticker? This action cannot be undone.
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

export default Stickers;
