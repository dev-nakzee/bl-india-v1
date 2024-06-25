import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Modal,
  IconButton
} from '@mui/material';
import Masonry from 'react-masonry-css';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import CloseIcon from '@mui/icons-material/Close';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [selectedImageDescription, setSelectedImageDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

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

  const openModal = (imageUrl, imageName, imageDescription) => {
    setSelectedImage(imageUrl);
    setSelectedImageName(imageName);
    setSelectedImageDescription(imageDescription);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageName('');
    setSelectedImageDescription('');
    setModalOpen(false);
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
      <Typography  className="page-heading" variant="h4" textAlign="center" gutterBottom marginBottom={5}>
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
            onClick={() => openModal(
              'https://in.bl-india.com/' + gallery.image_url,
              gallery.title,
              gallery.description
            )}
          >
            <img
              src={'https://in.bl-india.com/' + gallery.image_url}
              alt={gallery.image_alt}
              style={{ width: '100%', display: 'block', borderRadius: '8px' }}
            />
            <Typography variant="heading" align="center" sx={{ marginTop: 1 }}>
              {gallery.title}
            
            </Typography>
          </Box>
        ))}
      </Masonry>

      {/* Modal for displaying the selected image */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          textAlign: 'center',
          borderRadius: '8px'
        }}>
          {selectedImage && (
            <>
              <img
                src={selectedImage}
                alt={selectedImageName}
                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
              />
              <Typography variant="h6" sx={{ my: 2 }}>
                {selectedImageName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedImageDescription}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={{ position: 'absolute', top: 5, right: 5, color: 'inherit' }}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Gallery;
