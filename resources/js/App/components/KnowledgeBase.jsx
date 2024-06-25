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
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const KnowledgeBase = () => {
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentKB, setCurrentKB] = useState(null);
  const [formData, setFormData] = useState({
    knowledge_base_category_id: '',
    question: '',
    answer: '',
    slug: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_tags: '',
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchKnowledgeBases();
    fetchCategories();
  }, []);

  const fetchKnowledgeBases = async () => {
    try {
      const response = await apiClient.get('/knowledge-base');
      if (Array.isArray(response.data)) {
        setKnowledgeBases(response.data);
      } else {
        setKnowledgeBases([]);
      }
    } catch (error) {
      toast.error('Error fetching knowledge bases');
      console.error('Error fetching knowledge bases:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/knowledge-categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Error fetching categories');
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpen = (kb = null) => {
    setCurrentKB(kb);
    if (kb) {
      setFormData({
        knowledge_base_category_id: kb.knowledge_base_category_id,
        question: kb.question,
        answer: kb.answer,
        slug: kb.slug,
        seo_title: kb.seo_title,
        seo_description: kb.seo_description,
        seo_keywords: kb.seo_keywords,
        seo_tags: kb.seo_tags,
      });
    } else {
      setFormData({
        knowledge_base_category_id: '',
        question: '',
        answer: '',
        slug: '',
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
    setCurrentKB(null);
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
      if (currentKB) {
        await apiClient.put(`/knowledge-base/${currentKB.id}`, formData);
        toast.success('Knowledge base updated successfully');
      } else {
        await apiClient.post('/knowledge-base', formData);
        toast.success('Knowledge base added successfully');
      }
      fetchKnowledgeBases();
      handleClose();
    } catch (error) {
      toast.error('Error saving knowledge base');
      console.error('Error saving knowledge base:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/knowledge-base/${id}`);
      fetchKnowledgeBases();
      toast.success('Knowledge base deleted successfully');
    } catch (error) {
      toast.error('Error deleting knowledge base');
      console.error('Error deleting knowledge base:', error);
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

  const filteredKnowledgeBases = knowledgeBases.filter((kb) =>
    kb.question.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Knowledge Base
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
            Add New Knowledge Base
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            size='small'
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
              <TableCell>Question</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredKnowledgeBases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((kb) => (
              <TableRow key={kb.id}>
                <TableCell>{kb.question}</TableCell>
                <TableCell>{kb.category?.name}</TableCell>
                <TableCell>{kb.slug}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(kb)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(kb.id)}>
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
        count={filteredKnowledgeBases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentKB ? 'Edit Knowledge Base' : 'Add New Knowledge Base'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentKB ? 'Edit the details of the knowledge base.' : 'Enter the details of the new knowledge base.'}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>
                <Select
                  name="knowledge_base_category_id"
                  value={formData.knowledge_base_category_id}
                  onChange={handleChange}
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="question"
                label="Question"
                type="text"
                fullWidth
                value={formData.question}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="answer"
                label="Answer"
                type="text"
                multiline
                rows={4}
                fullWidth
                value={formData.answer}
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
            {currentKB ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default KnowledgeBase;
