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
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

// Import Quill Table
import TableUI from 'quill-table-ui';

// Register the table module
Quill.register({
  'modules/tableUI': TableUI
});

const PageSections = () => {
  const [pageSections, setPageSections] = useState([]);
  const [pages, setPages] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [pageSection, setPageSection] = useState({
    page_id: '',
    name: '',
    slug: '',
    title: '',
    tag_line: '',
    image: null,
    image_alt: '',
    content: ''
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPageSections();
    fetchPages();
  }, []);

  const fetchPageSections = async () => {
    try {
      const response = await apiClient.get('/page-sections');
      setPageSections(response.data);
    } catch (error) {
      toast.error('Failed to fetch page sections');
    }
  };

  const fetchPages = async () => {
    try {
      const response = await apiClient.get('/pages');
      setPages(response.data);
    } catch (error) {
      toast.error('Failed to fetch pages');
    }
  };

  const handleClickOpen = () => {
    setPageSection({
      page_id: '',
      name: '',
      slug: '',
      title: '',
      tag_line: '',
      image: null,
      image_alt: '',
      content: ''
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (pageSection) => {
    setPageSection(pageSection);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/page-sections/${deleteId}`);
      fetchPageSections();
      toast.success('Page section deleted successfully');
    } catch (error) {
      toast.error('Failed to delete page section');
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
    setPageSection((prevPageSection) => ({
      ...prevPageSection,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleContentChange = (value) => {
    setPageSection((prevPageSection) => ({
      ...prevPageSection,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in pageSection) {
      formData.append(key, pageSection[key]);
    }
    try {
      if (editing) {
        await apiClient.post(`/page-sections/${pageSection.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Page section updated successfully');
      } else {
        await apiClient.post('/page-sections', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Page section added successfully');
      }
      fetchPageSections();
      handleClose();
    } catch (error) {
      toast.error('Failed to save page section');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPageSections = pageSections.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPageSections = filteredPageSections.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ font: [] }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['table']
    ],
    tableUI: true
  };

  const formats = [
    'header', 'size', 'color', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'script', 'list', 'bullet', 'indent', 'align',
    'link', 'image', 'video', 'table'
  ];

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Page Sections Management</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Page Section
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
              <TableCell>Slug</TableCell>
              <TableCell>Page</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPageSections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.id}</TableCell>
                <TableCell><img src={section.image_url} alt={section.image_alt} width={50} /></TableCell>
                <TableCell>{section.name}</TableCell>
                <TableCell>{section.slug}</TableCell>
                <TableCell>{section.page.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(section)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(section.id)}>
                    <DeleteIcon />
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
        count={filteredPageSections.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Page Section' : 'Add Page Section'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the page section.' : 'Fill in the details to add a new page section.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              select
              label="Page"
              name="page_id"
              value={pageSection.page_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {pages.map((page) => (
                <MenuItem key={page.id} value={page.id}>
                  {page.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Name"
              name="name"
              value={pageSection.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Slug"
              name="slug"
              value={pageSection.slug || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Title"
              name="title"
              value={pageSection.title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tag Line"
              name="tag_line"
              value={pageSection.tag_line || ''}
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
              label="Image Alt"
              name="image_alt"
              value={pageSection.image_alt || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <ReactQuill
              value={pageSection.content || ''}
              onChange={handleContentChange}
              placeholder="Page Section Content"
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
          <DialogContentText>Are you sure you want to delete this page section? This action cannot be undone.</DialogContentText>
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

export default PageSections;
