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
  ListItemIcon,
  Link as MuiLink,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadIcon from '@mui/icons-material/Download';

const Downloads = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/downloads');
      setData(response.data);
    } catch (error) {
      toast.error('Error fetching downloads data');
      console.error('Error fetching downloads data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <img
                src={data.page.image_url}
                alt={data.page.image_alt}
                style={{ width: '100%', height: 'auto' }}
              />
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }}>
          {data.downloadCategories.map((category) => (
            <Box key={category.id} sx={{ marginBottom: 4 }}>
              <Typography variant="h4" gutterBottom>{category.name}</Typography>
              {data.downloads
                .filter((download) => download.download_category_id === category.id)
                .map((download) => (
                  <Paper key={download.id} elevation={3} sx={{ marginBottom: 4, padding: 2 }}>
                    <Typography variant="h5" gutterBottom>{download.name}</Typography>
                    <List>
                      {download.files.map((file) => (
                        <ListItem key={file.id} button component="a" href={file.file_url} target="_blank" rel="noopener noreferrer">
                          <ListItemIcon>
                            <DownloadIcon />
                          </ListItemIcon>
                          <ListItemText primary={file.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Downloads;
