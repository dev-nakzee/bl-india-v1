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
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone1: '',
    phone2: '',
    phone3: '',
    website: '',
    address: '',
    Timings: ''
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiClient.get('/contacts');
      setContacts(response.data.contacts || response.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setContact({
      name: '',
      email: '',
      phone1: '',
      phone2: '',
      phone3: '',
      website: '',
      address: '',
      Timings: ''
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (contact) => {
    setContact(contact);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/contacts/${deleteId}`);
      fetchContacts();
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.error('Failed to delete contact');
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
    setContact((prevContact) => ({
      ...prevContact,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleContentChange = (field) => (value) => {
    setContact((prevContact) => ({
      ...prevContact,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in contact) {
      formData.append(key, contact[key]);
    }
    try {
      if (editing) {
        await apiClient.post(`/contacts/${contact.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Contact updated successfully');
      } else {
        await apiClient.post('/contacts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Contact added successfully');
      }
      fetchContacts();
      handleClose();
    } catch (error) {
      toast.error('Failed to save contact');
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video'
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Contacts Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Contact
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone 1</TableCell>
              <TableCell>Phone 2</TableCell>
              <TableCell>Phone 3</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Timings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.id}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone1}</TableCell>
                <TableCell>{contact.phone2}</TableCell>
                <TableCell>{contact.phone3}</TableCell>
                <TableCell>{contact.website}</TableCell>
                <TableCell dangerouslySetInnerHTML={{ __html: contact.address }} />
                <TableCell dangerouslySetInnerHTML={{ __html: contact.Timings }} />
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(contact)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(contact.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the contact.' : 'Fill in the details to add a new contact.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Name"
              name="name"
              value={contact.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={contact.email || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone 1"
              name="phone1"
              value={contact.phone1 || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone 2"
              name="phone2"
              value={contact.phone2 || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone 3"
              name="phone3"
              value={contact.phone3 || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Website"
              name="website"
              value={contact.website || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Address</Typography>
            <ReactQuill
              value={contact.address || ''}
              onChange={handleContentChange('address')}
              placeholder="Address"
              theme="snow"
              modules={modules}
              formats={formats}
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Timings</Typography>
            <ReactQuill
              value={contact.Timings || ''}
              onChange={handleContentChange('Timings')}
              placeholder="Timings"
              theme="snow"
              modules={modules}
              formats={formats}
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
          <DialogContentText>Are you sure you want to delete this contact? This action cannot be undone.</DialogContentText>
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

export default Contacts;
