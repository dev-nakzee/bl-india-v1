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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Processes = () => {
  const [processes, setProcesses] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [process, setProcess] = useState({
    name: '',
    order: '',
    text: '',
    image: '',
    image_alt: '',
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await apiClient.get('/processes');
      setProcesses(response.data);
    } catch (error) {
      toast.error('Failed to fetch processes');
    }
  };

  const handleClickOpen = () => {
    setProcess({
      name: '',
      order: '',
      text: '',
      image: '',
      image_alt: '',
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (process) => {
    setProcess(process);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/processes/${deleteId}`);
      fetchProcesses();
      toast.success('Process deleted successfully');
    } catch (error) {
      toast.error('Failed to delete process');
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
    setProcess((prevProcess) => ({
      ...prevProcess,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.post(`/processes/${process.id}`, process);
        toast.success('Process updated successfully');
      } else {
        await apiClient.post('/processes', process);
        toast.success('Process added successfully');
      }
      fetchProcesses();
      handleClose();
    } catch (error) {
      toast.error('Failed to save process');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Processes Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Process
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process) => (
              <TableRow key={process.id}>
                <TableCell>{process.id}</TableCell>
                <TableCell><img src={process.image_url} alt={process.image_alt} style={{ width: '50px', height: '50px' }} /></TableCell>
                <TableCell>{process.name}</TableCell>
                <TableCell>{process.order}</TableCell>
                <TableCell>{process.text}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(process)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(process.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Process' : 'Add Process'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the process.' : 'Fill in the details to add a new process.'}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={process.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Order"
              name="order"
              value={process.order || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Text"
              name="text"
              value={process.text || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              label="Image URL"
              name="image"
              value={process.image || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Image Alt Text"
              name="image_alt"
              value={process.image_alt || ''}
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
          <DialogContentText>Are you sure you want to delete this process? This action cannot be undone.</DialogContentText>
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

export default Processes;
