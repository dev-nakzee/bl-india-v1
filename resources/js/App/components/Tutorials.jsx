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
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tutorial, setTutorial] = useState({
    title: '',
    video_url: '',
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await apiClient.get('/tutorials');
      setTutorials(response.data);
    } catch (error) {
      toast.error('Failed to fetch tutorials');
    }
  };

  const handleClickOpen = () => {
    setTutorial({
      title: '',
      video_url: '',
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (tutorial) => {
    setTutorial(tutorial);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/tutorials/${deleteId}`);
      fetchTutorials();
      toast.success('Tutorial deleted successfully');
    } catch (error) {
      toast.error('Failed to delete tutorial');
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
    setTutorial((prevTutorial) => ({
      ...prevTutorial,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.put(`/tutorials/${tutorial.id}`, tutorial);
        toast.success('Tutorial updated successfully');
      } else {
        await apiClient.post('/tutorials', tutorial);
        toast.success('Tutorial added successfully');
      }
      fetchTutorials();
      handleClose();
    } catch (error) {
      toast.error('Failed to save tutorial');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Tutorials Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Tutorial
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Video URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tutorials.map((tutorial) => (
              <TableRow key={tutorial.id}>
                <TableCell>{tutorial.title}</TableCell>
                <TableCell>{tutorial.video_url}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(tutorial)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(tutorial.id)}
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
        <DialogTitle>{editing ? 'Edit Tutorial' : 'Add Tutorial'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the tutorial.' : 'Fill in the details to add a new tutorial.'}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={tutorial.title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Video URL"
              name="video_url"
              value={tutorial.video_url || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
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
            Are you sure you want to delete this tutorial? This action cannot be undone.
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

export default Tutorials;
