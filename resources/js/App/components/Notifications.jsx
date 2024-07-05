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
  InputAdornment,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [notification, setNotification] = useState({
    notification_category_id: '',
    name: '',
    technical_name: '',
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
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      setFilteredProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const fetchRelatedProducts = async (notificationId) => {
    try {
      const response = await apiClient.get(`/notifications/${notificationId}/products`);
      setRelatedProducts(response.data.notification.products);
    } catch (error) {
      toast.error('Failed to fetch related products');
    }
  };

  const handleClickOpen = () => {
    setNotification({
      notification_category_id: '',
      name: '',
      technical_name: '',
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

  const handleAttachProduct = async (productId) => {
    try {
      await apiClient.post(`/notifications/${selectedNotificationId}/products`, { product_id: productId });
      fetchRelatedProducts(selectedNotificationId);
      toast.success('Product attached successfully');
    } catch (error) {
      toast.error('Failed to attach product');
    }
  };

  const handleDetachProduct = async (productId) => {
    try {
      await apiClient.delete(`/notifications/${selectedNotificationId}/products/${productId}`);
      fetchRelatedProducts(selectedNotificationId);
      toast.success('Product detached successfully');
    } catch (error) {
      toast.error('Failed to detach product');
    }
  };

  const handleManageProducts = (notificationId) => {
    setSelectedNotificationId(notificationId);
    fetchRelatedProducts(notificationId);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(value)));
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageIndex(0);
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modules = {
    toolbar: [
      [{ header: '1'}, { header: '2'}],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered'}, { list: 'bullet' }, { indent: '-1'}, { indent: '+1' }],
      [{ 'align': [] }],
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

  return (
    <Box sx={{ margin: 2 }}>
      <ToastContainer />
      <Typography variant="h6">Notifications Management</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Notification
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
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
            {filteredNotifications
              .slice(pageIndex * rowsPerPage, pageIndex * rowsPerPage + rowsPerPage)
              .map((notification) => (
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
                    <Button color="primary" onClick={() => handleManageProducts(notification.id)}>
                      Manage Products
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredNotifications.length}
          rowsPerPage={rowsPerPage}
          page={pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
              label="Technical Name"
              name="technical_name"
              value={notification.technical_name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
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

      <Dialog open={Boolean(selectedNotificationId)} onClose={() => setSelectedNotificationId(null)} maxWidth="md" fullWidth>
        <DialogTitle>Manage Products</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Attach or detach products related to this notification.
          </DialogContentText>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Search Products"
              value={search}
              onChange={handleSearchChange}
              fullWidth
              margin="normal"
            />
            <Typography variant="h6">Attach Product</Typography>
            <TextField
              select
              label="Product"
              onChange={(e) => handleAttachProduct(e.target.value)}
              fullWidth
              margin="normal"
            >
              {filteredProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
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
                {relatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => handleDetachProduct(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedNotificationId(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;
