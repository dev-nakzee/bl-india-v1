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
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const BlogComments = () => {
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [comment, setComment] = useState({
    blog_id: '',
    client_id: '',
    comments: '',
    is_approved: false,
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchComments();
    fetchBlogs();
    fetchClients();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await apiClient.get('/blog-comments');
      setComments(response.data);
    } catch (error) {
      toast.error('Failed to fetch comments');
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await apiClient.get('/clients');
      setClients(response.data);
    } catch (error) {
      toast.error('Failed to fetch clients');
    }
  };

  const handleClickOpen = () => {
    setComment({
      blog_id: '',
      client_id: '',
      comments: '',
      is_approved: false,
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (comment) => {
    setComment(comment);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/blog-comments/${deleteId}`);
      fetchComments();
      toast.success('Comment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete comment');
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
    setComment((prevComment) => ({
      ...prevComment,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.put(`/blog-comments/${comment.id}`, comment);
        toast.success('Comment updated successfully');
      } else {
        await apiClient.post('/blog-comments', comment);
        toast.success('Comment added successfully');
      }
      fetchComments();
      handleClose();
    } catch (error) {
      toast.error('Failed to save comment');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Blog Comments Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Comment
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Blog</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell>{comment.blog.name}</TableCell>
                <TableCell>{comment.client.name}</TableCell>
                <TableCell>{comment.comments}</TableCell>
                <TableCell>{comment.is_approved ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(comment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(comment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Comment' : 'Add Comment'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the comment.' : 'Fill in the details to add a new comment.'}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              label="Blog"
              name="blog_id"
              value={comment.blog_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {blogs.map((blog) => (
                <MenuItem key={blog.id} value={blog.id}>
                  {blog.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Client"
              name="client_id"
              value={comment.client_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Comments"
              name="comments"
              value={comment.comments || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={comment.is_approved || false}
                  onChange={handleChange}
                  name="is_approved"
                  color="primary"
                />
              }
              label="Approved"
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
          <DialogContentText>Are you sure you want to delete this comment? This action cannot be undone.</DialogContentText>
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

export default BlogComments;
