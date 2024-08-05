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
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
  TablePagination
} from '@mui/material';
import { Add, Edit, Delete, Folder } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [filesDialogOpen, setFilesDialogOpen] = useState(false);
  const [currentDownload, setCurrentDownload] = useState(null);
  const [formData, setFormData] = useState({
    download_category_id: '',
    name: '',
  });
  const [fileData, setFileData] = useState({
    name: '',
    file: null
  });
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDownloads();
    fetchCategories();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await apiClient.get('/downloads');
      setDownloads(response.data);
    } catch (error) {
      toast.error('Error fetching downloads');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/download-categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  const fetchFiles = async (downloadId) => {
    try {
      const response = await apiClient.get(`/downloads/${downloadId}/files`);
      setFiles(response.data);
    } catch (error) {
      toast.error('Error fetching files');
    }
  };

  const handleOpen = (download = null) => {
    setCurrentDownload(download);
    if (download) {
      setFormData({
        download_category_id: download.download_category_id,
        name: download.name,
      });
    } else {
      setFormData({
        download_category_id: '',
        name: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDownload(null);
  };

  const handleFilesDialogOpen = (download) => {
    setCurrentDownload(download);
    fetchFiles(download.id);
    setFilesDialogOpen(true);
  };

  const handleFilesDialogClose = () => {
    setFilesDialogOpen(false);
    setCurrentDownload(null);
    setFileData({
      name: '',
      file: null
    });
  };

  const handleFileChange = (e) => {
    const { name, value, files } = e.target;
    setFileData({
      ...fileData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFilesSubmit = async () => {
    const form = new FormData();
    form.append('download_id', currentDownload.id);
    form.append('name', fileData.name);
    form.append('file', fileData.file);

    try {
      await apiClient.post(`/downloads/${currentDownload.id}/files`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('File added successfully');
      fetchFiles(currentDownload.id);
      handleFilesDialogClose();
    } catch (error) {
      toast.error('Error adding file');
    }
  };

  const handleFilesDelete = async (fileId) => {
    try {
      await apiClient.delete(`/downloads/${currentDownload.id}/files/${fileId}`);
      toast.success('File deleted successfully');
      fetchFiles(currentDownload.id);
    } catch (error) {
      toast.error('Error deleting file');
    }
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
      if (currentDownload) {
        await apiClient.put(`/downloads/${currentDownload.id}`, formData);
        toast.success('Download updated successfully');
      } else {
        await apiClient.post('/downloads', formData);
        toast.success('Download added successfully');
      }
      fetchDownloads();
      handleClose();
    } catch (error) {
      toast.error('Error saving download');
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/downloads/${currentDownload.id}`);
      fetchDownloads();
      toast.success('Download deleted successfully');
      setDeleteConfirmOpen(false);
      setCurrentDownload(null);
    } catch (error) {
      toast.error('Error deleting download');
    }
  };

  const openDeleteConfirmDialog = (download) => {
    setCurrentDownload(download);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirmDialog = () => {
    setDeleteConfirmOpen(false);
    setCurrentDownload(null);
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

  const filteredDownloads = downloads.filter((download) =>
    download.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    download.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedDownloads = filteredDownloads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ }}>
      <ToastContainer />
      <Typography variant="h5" gutterBottom>
        Downloads
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
          Add New Download
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
              <TableCell>Category Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDownloads.map((download) => (
              <TableRow key={download.id}>
                <TableCell>{download.category.name}</TableCell>
                <TableCell>{download.name}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(download)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => openDeleteConfirmDialog(download)}>
                    <Delete />
                  </IconButton>
                  <IconButton edge="end" aria-label="files" onClick={() => handleFilesDialogOpen(download)}>
                    <Folder />
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
        count={filteredDownloads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentDownload ? 'Edit Download' : 'Add New Download'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentDownload ? 'Edit the details of the download item.' : 'Enter the details of the new download item.'}
          </DialogContentText>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="download_category_id"
              value={formData.download_category_id}
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
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentDownload ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirmDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this download?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={filesDialogOpen} onClose={handleFilesDialogClose}>
        <DialogTitle>Manage Files for {currentDownload?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload and manage files for this download.
          </DialogContentText>
          <TextField
            margin="dense"
            name="name"
            label="File Name"
            type="text"
            fullWidth
            value={fileData.name}
            onChange={handleFileChange}
          />
          <input
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" fullWidth sx={{ mt: 2 }}>
              Upload File
            </Button>
            {fileData.file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {fileData.file.name}
              </Typography>
            )}
          </label>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleFilesSubmit}>
            Add File
          </Button>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleFilesDelete(file.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilesDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Downloads;
