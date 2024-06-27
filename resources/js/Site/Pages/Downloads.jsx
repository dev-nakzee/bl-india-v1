import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  ListItemIcon,
  InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadIcon from '@mui/icons-material/Download';

const Downloads = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/downloads');
      setData(response.data);
      if (response.data.downloadCategories.length > 0) {
        setSelectedCategory(response.data.downloadCategories[0].id);
      }
    } catch (error) {
      toast.error('Error fetching downloads data');
      console.error('Error fetching downloads data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(0);
    setSearchTerm('');
  };

  const filteredDownloads = data
    ? data.downloads.filter(
        (download) =>
          download.download_category_id === selectedCategory &&
          download.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Container>
      <ToastContainer />
      <Helmet>
        <title>{data.page.seo_title}</title>
        <meta name="description" content={data.page.seo_description} />
        <meta name="keywords" content={data.page.seo_keywords} />
      </Helmet>
      <Box sx={{ paddingTop: 4 }}>
        <Typography variant="h3" gutterBottom>{data.page.seo_title}</Typography>
        <Typography variant="body1" gutterBottom>{data.page.seo_description}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Categories</Typography>
              <List>
                {data.downloadCategories.map((category) => (
                  <ListItem
                    button
                    key={category.id}
                    selected={category.id === selectedCategory}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search downloads"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: 2 }}
              />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Files</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDownloads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((download) => (
                      <TableRow key={download.id}>
                        <TableCell>{download.name}</TableCell>
                        <TableCell>
                          <List>
                            {download.files.map((file) => (
                              <ListItem
                                key={file.id}
                                button
                                component="a"
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ListItemIcon>
                                  <DownloadIcon />
                                </ListItemIcon>
                                <ListItemText primary={file.name} />
                              </ListItem>
                            ))}
                          </List>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredDownloads.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Downloads;
