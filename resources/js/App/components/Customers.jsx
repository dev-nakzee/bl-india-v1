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
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: '',
    image: null,
    image_alt: '',
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await apiClient.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      toast.error('Failed to fetch customers');
    }
  };

  const handleClickOpen = () => {
    setCustomer({
      name: '',
      image: null,
      image_alt: '',
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (customer) => {
    setCustomer(customer);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/customers/${deleteId}`);
      fetchCustomers();
      toast.success('Customer deleted successfully');
    } catch (error) {
      toast.error('Failed to delete customer');
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
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in customer) {
      formData.append(key, customer[key]);
    }
    try {
      if (editing) {
        await apiClient.post(`/customers/${customer.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Customer updated successfully');
      } else {
        await apiClient.post('/customers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Customer added successfully');
      }
      fetchCustomers();
      handleClose();
    } catch (error) {
      toast.error('Failed to save customer');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.image_alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCustomers = filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Customers Management</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Customer
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <img src={customer.image_url} alt={customer.image_alt} width="50" />
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(customer)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(customer.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCustomers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the customer.' : 'Fill in the details to add a new customer.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Name"
              name="name"
              value={customer.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
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
              label="Image Alt"
              name="image_alt"
              value={customer.image_alt || ''}
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
          <DialogContentText>
            Are you sure you want to delete this customer? This action cannot be undone.
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

export default Customers;
