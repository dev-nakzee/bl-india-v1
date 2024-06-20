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
  MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [team, setTeam] = useState({
    name: '',
    image: null,
    image_alt: '',
    designation: '',
    order: 0
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await apiClient.get('/teams');
      setTeams(response.data);
    } catch (error) {
      toast.error('Failed to fetch team members');
    }
  };

  const handleClickOpen = () => {
    setTeam({
      name: '',
      image: null,
      image_alt: '',
      designation: '',
      order: 0
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (team) => {
    setTeam(team);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/teams/${deleteId}`);
      fetchTeams();
      toast.success('Team member deleted successfully');
    } catch (error) {
      toast.error('Failed to delete team member');
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
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in team) {
      formData.append(key, team[key]);
    }
    try {
      if (editing) {
        await apiClient.post(`/teams/${team.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Team member updated successfully');
      } else {
        await apiClient.post('/teams', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Team member added successfully');
      }
      fetchTeams();
      handleClose();
    } catch (error) {
      toast.error('Failed to save team member');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Team Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Team Member
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.designation}</TableCell>
                <TableCell>{team.order}</TableCell>
                <TableCell>
                  <img src={team.image_url} alt={team.image_alt} width={50} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(team)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(team.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the team member.' : 'Fill in the details to add a new team member.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Name"
              name="name"
              value={team.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Designation"
              name="designation"
              value={team.designation || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Order"
              name="order"
              type="number"
              value={team.order || 0}
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
              label="Image Alt Text"
              name="image_alt"
              value={team.image_alt || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
          <DialogContentText>Are you sure you want to delete this team member? This action cannot be undone.</DialogContentText>
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

export default Teams;
