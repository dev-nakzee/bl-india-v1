import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import Masonry from 'react-masonry-css';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await apiClient.get('/galleries');
      setGalleries(response.data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
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

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gallery
      </Typography>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {galleries.map((gallery) => (
          <Box
            key={gallery.id}
            sx={{ cursor: 'pointer', marginBottom: 2 }}
          >
            <img
              src={gallery.image_url}
              alt={gallery.image_alt}
              style={{ width: '100%', display: 'block', borderRadius: '8px' }}
            />
            <Typography variant="body1" align="center" sx={{ marginTop: 1 }}>
              {gallery.title}
            </Typography>
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};

export default Gallery;
