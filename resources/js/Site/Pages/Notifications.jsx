import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
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
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    notification_category_id: '',
    name: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_tags: '',
    file_url: null,
    content: '',
    date: ''
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/notification-categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
      setSearchProducts(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setNotification({
      notification_category_id: '',
      name: '',
      slug: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_tags: '',
      file_url: null,
      content: '',
      date: ''
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (notification) => {
    setNotification(notification);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/notifications/${deleteId}`);
      fetchNotifications();
      toast.success('Notification deleted successfully');
    } catch (error) {
      toast.error('Failed to delete notification');
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
    setNotification((prevNotification) => ({
      ...prevNotification,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleContentChange = (value) => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in notification) {
      formData.append(key, notification[key]);
    }
    try {
      if (editing) {
        await apiClient.post(`/notifications/${notification.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Notification updated successfully');
      } else {
        await apiClient.post('/notifications', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Notification added successfully');
      }
      fetchNotifications();
      handleClose();
    } catch (error) {
      toast.error('Failed to save notification');
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleAttachProducts = async () => {
    try {
      await apiClient.post(`/notifications/${notification.id}/products`, {
        product_ids: selectedProducts.map((product) => product.id),
      });
      toast.success('Products attached successfully');
      setProductDialogOpen(false);
    } catch (error) {
      toast.error('Failed to attach products');
    }
  };

  const handleDetachProduct = async (productId) => {
    try {
      await apiClient.delete(`/notifications/${notification.id}/products/${productId}`);
      setSelectedProducts(
        selectedProducts.filter((product) => product.id !== productId)
      );
      toast.success('Product detached successfully');
    } catch (error) {
      toast.error('Failed to detach product');
    }
  };

  const handleAddProductClick = (notification) => {
    setNotification(notification);
    setSelectedProducts(notification.products || []);
    setProductDialogOpen(true);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Notifications Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Notification
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.name}</TableCell>
                <TableCell>{notification.category.name}</TableCell>
                <TableCell>{notification.slug}</TableCell>
                <TableCell>{notification.date}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(notification)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(notification.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button color="primary" onClick={() => handleAddProductClick(notification)}>
                    Add Products
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Notification' : 'Add Notification'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the notification.' : 'Fill in the details to add a new notification.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              select
              label="Category"
              name="notification_category_id"
              value={notification.notification_category_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Name"
              name="name"
              value={notification.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Slug"
              name="slug"
              value={notification.slug || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="SEO Title"
              name="seo_title"
              value={notification.seo_title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Description"
              name="seo_description"
              value={notification.seo_description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Keywords"
              name="seo_keywords"
              value={notification.seo_keywords || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Tags"
              name="seo_tags"
              value={notification.seo_tags || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              name="file_url"
              onChange={handleChange}
            />
            <label htmlFor="file-upload">
              <Button variant="contained" color="primary" component="span">
                Upload PDF
              </Button>
            </label>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={notification.date || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <ReactQuill
              value={notification.content || ''}
              onChange={handleContentChange}
              placeholder="Notification Content"
              theme="snow"
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
          <DialogContentText>Are you sure you want to delete this notification? This action cannot be undone.</DialogContentText>
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

      <Dialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)}>
        <DialogTitle>Attach Products</DialogTitle>
        <DialogContent>
          <TextField
            label="Search Products"
            fullWidth
            margin="normal"
            onChange={handleSearchChange}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            setSelectedProducts((prevProducts) => [...prevProducts, product])
                          }
                          disabled={selectedProducts.some((p) => p.id === product.id)}
                        >
                          Attach
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Typography variant="h6" sx={{ marginY: 2 }}>
            Attached Products
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDetachProduct(product.id)}
                      >
                        Detach
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogActions>
            <Button onClick={() => setProductDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAttachProducts} color="primary">
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default Notifications;
