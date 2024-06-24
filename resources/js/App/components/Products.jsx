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
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    technical_name: '',
    description: '',
    image: null,
    image_alt: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_tags: '',
    product_category_id: ''
  });
  const [serviceForm, setServiceForm] = useState({
    service_id: '',
    is: '',
    group: '',
    scheme: '',
    others: '',
    is_mandatory: false,
    details: '',
  });
  const [relatedServices, setRelatedServices] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
    fetchProductCategories();
    fetchServices();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const fetchProductCategories = async () => {
    try {
      const response = await apiClient.get('/product-categories');
      setProductCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch product categories');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const handleClickOpen = () => {
    setProduct({
      name: '',
      slug: '',
      technical_name: '',
      description: '',
      image: null,
      image_alt: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_tags: '',
      product_category_id: ''
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (product) => {
    setProduct(product);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/products/${deleteId}`);
      fetchProducts();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
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
    const { name, value, type, checked, files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        if (key === 'is_global') {
          formData.append(key, product[key] ? '1' : '0'); // Convert boolean to string
        } else if (key === 'image' && product[key]) {
          formData.append(key, product[key]); // Append image file directly
        } else {
          formData.append(key, product[key]);
        }
      }
    }
    try {
      if (editing) {
        await apiClient.post(`/products/${product.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Product updated successfully');
      } else {
        await apiClient.post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Product added successfully');
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleManageServices = (productId) => {
    setSelectedProductId(productId);
    fetchRelatedServices(productId);
    setServiceDialogOpen(true);
  };

  const fetchRelatedServices = async (productId) => {
    try {
      const response = await apiClient.get(`/products/${productId}/services`);
      setRelatedServices(response.data);
    } catch (error) {
      toast.error('Failed to fetch related services');
    }
  };

  const handleServiceChange = (e, serviceId) => {
    const { name, value, type, checked } = e.target;
    setRelatedServices((prevServices) =>
      prevServices.map((service) =>
        service.service_id === serviceId
          ? { ...service, [name]: type === 'checkbox' ? checked : value }
          : service
      )
    );
  };

  const handleAttachServiceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAttachService = async () => {
    try {
      const service = {
        service_id: serviceForm.service_id,
        is: serviceForm.is,
        group: serviceForm.group,
        scheme: serviceForm.scheme,
        others: serviceForm.others,
        is_mandatory: serviceForm.is_mandatory,
        details: serviceForm.details,
      };
      await apiClient.post(`/products/${selectedProductId}/services`, {
        services: [service],
      });
      fetchRelatedServices(selectedProductId);
      setServiceForm({
        service_id: '',
        is: '',
        group: '',
        scheme: '',
        others: '',
        is_mandatory: false,
        details: '',
      });
      toast.success('Service attached successfully');
    } catch (error) {
      toast.error('Failed to attach service');
    }
  };

  const handleDetachService = async (serviceId) => {
    try {
      await apiClient.delete(`/products/${selectedProductId}/services/${serviceId}`);
      fetchRelatedServices(selectedProductId);
      toast.success('Service detached successfully');
    } catch (error) {
      toast.error('Failed to detach service');
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.slug.toLowerCase().includes(search.toLowerCase()) ||
    product.product_category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Products Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell><img src={product.thumbnail_url} alt={product.image_alt} /></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.slug}</TableCell>
                <TableCell>{product.product_category.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button color="primary" onClick={() => handleManageServices(product.id)}>
                    <CategoryIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the product.' : 'Fill in the details to add a new product.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Name"
              name="name"
              value={product.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Slug"
              name="slug"
              value={product.slug || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Technical Name"
              name="technical_name"
              value={product.technical_name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <ReactQuill
              value={product.description || ''}
              onChange={handleDescriptionChange}
              placeholder="Product Description"
              theme="snow"
            />
            <TextField
              label="Image Alt"
              name="image_alt"
              value={product.image_alt || ''}
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
              label="SEO Title"
              name="seo_title"
              value={product.seo_title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Description"
              name="seo_description"
              value={product.seo_description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Keywords"
              name="seo_keywords"
              value={product.seo_keywords || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Tags"
              name="seo_tags"
              value={product.seo_tags || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Product Category"
              name="product_category_id"
              value={product.product_category_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {productCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
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
      <Dialog
        open={serviceDialogOpen}
        onClose={() => setServiceDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Manage Related Services</DialogTitle>
        <DialogContent>
          <DialogContentText>Attach or detach services related to the product.</DialogContentText>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="service-select-label">Select Service to Attach</InputLabel>
              <Select
                labelId="service-select-label"
                id="service-select"
                name="service_id"
                value={serviceForm.service_id}
                onChange={handleAttachServiceChange}
                fullWidth
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Group"
              name="group"
              value={serviceForm.group}
              onChange={handleAttachServiceChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Scheme"
              name="scheme"
              value={serviceForm.scheme}
              onChange={handleAttachServiceChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Is"
              name="is"
              value={serviceForm.is}
              onChange={handleAttachServiceChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Others"
              name="others"
              value={serviceForm.others}
              onChange={handleAttachServiceChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!serviceForm.is_mandatory}
                  onChange={handleAttachServiceChange}
                  name="is_mandatory"
                  color="primary"
                />
              }
              label="Is Mandatory"
            />
            <ReactQuill
              value={serviceForm.details}
              onChange={(value) =>
                setServiceForm((prevForm) => ({
                  ...prevForm,
                  details: value,
                }))
              }
              placeholder="Service Details"
              theme="snow"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAttachService}
              sx={{ marginTop: 2 }}
            >
              Attach Service
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Scheme</TableCell>
                  <TableCell>Is</TableCell>
                  <TableCell>Others</TableCell>
                  <TableCell>Is Mandatory</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relatedServices.map((service) => (
                  <TableRow key={service.service_id}>
                    <TableCell>{service.service_id}</TableCell>
                    <TableCell>{service.service.name}</TableCell>
                    <TableCell>{service.group}</TableCell>
                    <TableCell>{service.scheme}</TableCell>
                    <TableCell>{service.is}</TableCell>
                    <TableCell>{service.others}</TableCell>
                    <TableCell>{service.is_mandatory ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <div dangerouslySetInnerHTML={{ __html: service.details }} />
                    </TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => handleDetachService(service.service_id)}>
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
          <Button onClick={() => setServiceDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDeleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product? This action cannot be undone.</DialogContentText>
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

export default Products;
