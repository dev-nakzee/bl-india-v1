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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [blog, setBlog] = useState({
    blog_category_id: '',
    name: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_tags: '',
    image: null,
    image_alt: '',
    content: '',
    like_count: 0
  });
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/blog-categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleClickOpen = () => {
    setBlog({
      blog_category_id: '',
      name: '',
      slug: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_tags: '',
      image: null,
      image_alt: '',
      content: '',
      like_count: 0
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (blog) => {
    setBlog(blog);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/blogs/${deleteId}`);
      fetchBlogs();
      toast.success('Blog post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete blog post');
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
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleContentChange = (value) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in blog) {
      formData.append(key, blog[key]);
    }
    try {
      if (editing) {
        await apiClient.post(`/blogs/${blog.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Blog post updated successfully');
      } else {
        await apiClient.post('/blogs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Blog post added successfully');
      }
      fetchBlogs();
      handleClose();
    } catch (error) {
      toast.error('Failed to save blog post');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Blog Posts Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Blog Post
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.id}</TableCell>
                <TableCell><img src={blog.image_url} alt={blog.image_alt} width={50} /></TableCell>
                <TableCell>{blog.name}</TableCell>
                <TableCell>{blog.slug}</TableCell>
                <TableCell>{blog.blog_category.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(blog)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(blog.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Blog Post' : 'Add Blog Post'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the blog post.' : 'Fill in the details to add a new blog post.'}
          </DialogContentText>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              select
              label="Category"
              name="blog_category_id"
              value={blog.blog_category_id || ''}
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
              value={blog.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Slug"
              name="slug"
              value={blog.slug || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="SEO Title"
              name="seo_title"
              value={blog.seo_title || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Description"
              name="seo_description"
              value={blog.seo_description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="SEO Keywords"
              name="seo_keywords"
              value={blog.seo_keywords || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SEO Tags"
              name="seo_tags"
              value={blog.seo_tags || ''}
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
              value={blog.image_alt || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <ReactQuill
              value={blog.content || ''}
              onChange={handleContentChange}
              placeholder="Content"
              theme="snow"
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{size: []}],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, 
                   {'indent': '-1'}, {'indent': '+1'}],
                  ['link', 'image', 'video'],
                  ['clean'], 
                  [{ 'align': [] }]
                ]
              }}
            />
            <TextField
              label="Like Count"
              name="like_count"
              value={blog.like_count || 0}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
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
          <DialogContentText>Are you sure you want to delete this blog post? This action cannot be undone.</DialogContentText>
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

export default BlogPosts;
