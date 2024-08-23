import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, IconButton, Snackbar, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import apiClient from '../Services/api'; // Ensure this is the correct import path

const Brochures = () => {
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const response = await apiClient.get('/client/brochures'); // Assuming this is the correct endpoint
        setBrochures(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch brochures:', error);
        setError('Failed to load brochures');
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  const handleDownload = (link) => {
    window.open(link, '_blank');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" gutterBottom>Brochures</Typography>
      {brochures.length > 0 ? (
        <Grid container spacing={2}>
          {brochures.map((brochure) => (
            <Grid item key={brochure.id} xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <IconButton
                  onClick={() => handleDownload(brochure.download_link)}
                >
                  <PictureAsPdfIcon className='AccountDownloadIcon'/>
                </IconButton>
                <Typography variant="h6">{brochure.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No brochures available.</Typography>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Thank you for downloading our brochure!"
      />
    </Box>
  );
};

export default Brochures;
