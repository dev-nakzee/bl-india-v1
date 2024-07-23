import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
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
  ListItemIcon,
  InputAdornment,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import useMediaQuery from '@mui/material/useMediaQuery';
import DownloadBrochure from "../Components/DownloadBrochure";
import RequestCallBack from "../Components/RequestCallBack";

const Downloads = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const Sidebar = styled(Box)(({ theme }) => ({
    width: 'auto',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
    overflowY: 'auto',
    // 
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Make sidebar full width on small screens
      position: 'static', // Remove sticky positioning on small screens
      top: 'auto', // Reset top spacing on small screens
      overflowY: 'visible', // Reset overflow on small screens
      paddingRight: 0, // Reset right padding on small screens
    },
  }));

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
    <>
      <ToastContainer />
      <Helmet>
        <title>{data.page.seo_title}</title>
        <meta name="description" content={data.page.seo_description} />
        <meta name="keywords" content={data.page.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Typography className="page-heading" variant="h4" textAlign="center" gutterBottom marginBottom={5}>
          {data.page.name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={3}>
            {isMobile ? (
              <FormControl fullWidth>
                <Select
                  value={selectedCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  displayEmpty
                >
                  {data.downloadCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <>
              <Sidebar className="Service-section-siderbar">
                <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>
                <Typography variant="h6">Download Categories</Typography>
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
                </Box>
                <DownloadBrochure />
                <RequestCallBack />
              </Sidebar>
              
               </>
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table className="product-download">
                  <TableHead>
                    <TableRow className="table-row">
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
                className="table-pagination"
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
        {isMobile ? (
            <Box sx={{marginBlock:2}}>
            <DownloadBrochure />
            <RequestCallBack />
          </Box>

        ):(
          <></>
        )
      }
      </Box>
    </>
  );
};

export default Downloads;
