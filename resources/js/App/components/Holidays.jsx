import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  DialogContentText,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentHoliday, setCurrentHoliday] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    holiday_type: 'Gazetted',
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await apiClient.get('/holidays');
      setHolidays(response.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (holiday = null) => {
    setCurrentHoliday(holiday);
    if (holiday) {
      setFormData({
        title: holiday.title,
        date: holiday.date,
        holiday_type: holiday.holiday_type,
      });
    } else {
      setFormData({
        title: '',
        date: '',
        holiday_type: 'Gazetted',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentHoliday(null);
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
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (currentHoliday) {
        await apiClient.put(`/holidays/${currentHoliday.id}`, formData);
      } else {
        await apiClient.post('/holidays', formData);
      }
      fetchHolidays();
      handleClose();
    } catch (error) {
      console.error('Error saving holiday:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/holidays/${deleteId}`);
      fetchHolidays();
      handleConfirmClose();
    } catch (error) {
      console.error('Error deleting holiday:', error);
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
        Holidays
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
        Add New Holiday
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((holiday) => (
              <TableRow key={holiday.id}>
                <TableCell>{holiday.title}</TableCell>
                <TableCell>{holiday.date}</TableCell>
                <TableCell>{holiday.holiday_type}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(holiday)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleConfirmOpen(holiday.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentHoliday ? 'Edit Holiday' : 'Add New Holiday'}</DialogTitle>
        <DialogContent>
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
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.date}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="holiday-type-label">Type</InputLabel>
            <Select
              labelId="holiday-type-label"
              name="holiday_type"
              value={formData.holiday_type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value="Gazetted">Gazetted</MenuItem>
              <MenuItem value="Restricted">Restricted</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentHoliday ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this holiday?
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

export default Holidays;
