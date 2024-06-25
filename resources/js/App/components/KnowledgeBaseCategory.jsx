import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  CircularProgress,
  InputAdornment,
  Paper
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const KnowledgeBaseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: null,
    image_alt: '',
    is_featured: false,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_tags: '',
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/knowledge-categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Error fetching categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (category = null) => {
    setCurrentCategory(category);
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        image: null,
        image_alt: category.image_alt,
        is_featured: category.is_featured,
        seo_title: category.seo_title || '',
        seo_description: category.seo_description || '',
        seo_keywords: category.seo_keywords || '',
        seo_tags: category.seo_tags || '',
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        image: null,
        image_alt: '',
        is_featured: false,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        seo_tags: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCategory(null);
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    if (formData.image) {
      data.append('image', formData.image);
    }
    data.append('image_alt', formData.image_alt);
    data.append('is_featured', formData.is_featured ? 'true' : 'false');
    data.append('seo_title', formData.seo_title);
    data.append('seo_description', formData.seo_description);
    data.append('seo_keywords', formData.seo_keywords);
    data.append('seo_tags', formData.seo_tags);

    try {
      if (currentCategory) {
        await apiClient.post(`/knowledge-categories/${currentCategory.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Category updated successfully');
      } else {
        await apiClient.post('/knowledge-categories', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Category added successfully');
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      toast.error('Error saving category');
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/knowledge-categories/${deleteId}`);
      fetchCategories();
      toast.success('Category deleted successfully');
      handleConfirmClose();
    } catch (error) {
      toast.error('Error deleting category');
      console.error('Error deleting category:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

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
        Knowledge Base Categories
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
            Add New Category
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.is_featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleConfirmOpen(category.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentCategory ? 'Edit the details of the category.' : 'Enter the details of the new category.'}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="slug"
                label="Slug"
                type="text"
                fullWidth
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="image_alt"
                label="Image Alt Text"
                type="text"
                fullWidth
                value={formData.image_alt}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  name="image"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_featured}
                    onChange={handleChange}
                    name="is_featured"
                    color="primary"
                  />
                }
                label="Featured"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="seo_title"
                label="SEO Title"
                type="text"
                fullWidth
                value={formData.seo_title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="seo_description"
                label="SEO Description"
                type="text"
                fullWidth
                value={formData.seo_description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="seo_keywords"
                label="SEO Keywords"
                type="text"
                fullWidth
                value={formData.seo_keywords}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="seo_tags"
                label="SEO Tags"
                type="text"
                fullWidth
                value={formData.seo_tags}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentCategory ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
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
      <ToastContainer />
    </Box>
  );
};

export default KnowledgeBaseCategory;
