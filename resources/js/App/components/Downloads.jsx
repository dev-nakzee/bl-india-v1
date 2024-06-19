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
import apiClient from '../services/api'; // Ensure this is your configured axios instance

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [downloadCategories, setDownloadCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [download, setDownload] = useState({
    name: '',
    download_category_id: '',
  });
  const [fileForm, setFileForm] = useState({
    name: '',
    file_url: null,
  });
  const [relatedFiles, setRelatedFiles] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedDownloadId, setSelectedDownloadId] = useState(null);

  useEffect(() => {
    fetchDownloads();
    fetchDownloadCategories();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await apiClient.get('/downloads');
      setDownloads(response.data);
    } catch (error) {
      toast.error('Failed to fetch downloads');
    }
  };

  const fetchDownloadCategories = async () => {
    try {
      const response = await apiClient.get('/download-categories');
      setDownloadCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch download categories');
    }
  };

  const handleClickOpen = () => {
    setDownload({
      name: '',
      download_category_id: '',
    });
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (download) => {
    setDownload(download);
    setEditing(true);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(`/downloads/${deleteId}`);
      fetchDownloads();
      toast.success('Download deleted successfully');
    } catch (error) {
      toast.error('Failed to delete download');
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
    const { name, value } = e.target;
    setDownload((prevDownload) => ({
      ...prevDownload,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileForm((prevFileForm) => ({
      ...prevFileForm,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.post(`/downloads/${download.id}`, download);
        toast.success('Download updated successfully');
      } else {
        await apiClient.post('/downloads', download);
        toast.success('Download added successfully');
      }
      fetchDownloads();
      handleClose();
    } catch (error) {
      toast.error('Failed to save download');
    }
  };

  const handleManageFiles = (downloadId) => {
    setSelectedDownloadId(downloadId);
    fetchRelatedFiles(downloadId);
    setFileDialogOpen(true);
  };

  const fetchRelatedFiles = async (downloadId) => {
    try {
      const response = await apiClient.get(`/downloads/${downloadId}/files`);
      setRelatedFiles(response.data);
    } catch (error) {
      toast.error('Failed to fetch related files');
    }
  };

  const handleAttachFile = async () => {
    const formData = new FormData();
    formData.append('name', fileForm.name);
    formData.append('file_url', fileForm.file_url);

    try {
      await apiClient.post(`/downloads/${selectedDownloadId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchRelatedFiles(selectedDownloadId);
      setFileForm({
        name: '',
        file_url: null,
      });
      toast.success('File attached successfully');
    } catch (error) {
      toast.error('Failed to attach file');
    }
  };

  const handleDetachFile = async (fileId) => {
    try {
      await apiClient.delete(`/downloads/${selectedDownloadId}/files/${fileId}`);
      fetchRelatedFiles(selectedDownloadId);
      toast.success('File detached successfully');
    } catch (error) {
      toast.error('Failed to detach file');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6">Downloads Management</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginY: 2 }}
        onClick={handleClickOpen}
      >
        Add Download
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {downloads.map((download) => (
              <TableRow key={download.id}>
                <TableCell>{download.id}</TableCell>
                <TableCell>{download.name}</TableCell>
                <TableCell>{download.download_category.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(download)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(download.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button color="primary" onClick={() => handleManageFiles(download.id)}>
                    Manage Files
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Download' : 'Add Download'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editing ? 'Edit the details of the download.' : 'Fill in the details to add a new download.'}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={download.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              select
              label="Download Category"
              name="download_category_id"
              value={download.download_category_id || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              {downloadCategories.map((category) => (
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
        open={fileDialogOpen}
        onClose={() => setFileDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Manage Download Files</DialogTitle>
        <DialogContent>
          <DialogContentText>Attach or detach files related to the download.</DialogContentText>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="File Name"
              name="name"
              value={fileForm.name}
              onChange={(e) => setFileForm({ ...fileForm, name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              name="file_url"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button variant="contained" color="primary" component="span">
                Upload File
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAttachFile}
              sx={{ marginTop: 2 }}
            >
              Attach File
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>File URL</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relatedFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.id}</TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell><a href={file.file_url} target="_blank" rel="noopener noreferrer">View File</a></TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => handleDetachFile(file.id)}>
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
          <Button onClick={() => setFileDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this download? This action cannot be undone.</DialogContentText>
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

export default Downloads;
