import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box
} from '@mui/material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import CloseIcon from '@mui/icons-material/Close';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await apiClient.get('/client/tutorials');
      setTutorials(response.data);
    } catch (error) {
      console.error('Failed to fetch tutorials', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = (tutorial) => {
    setSelectedTutorial(tutorial);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTutorial(null);
  };

  const getYouTubeEmbedUrl = (url) => {
    const urlObj = new URL(url);
    return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tutorials
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {tutorials.map((tutorial) => (
            <Grid item xs={12} sm={6} md={4} key={tutorial.id}>
              <Card onClick={() => handleClickOpen(tutorial)}>
                <CardMedia
                  component="iframe"
                  height="200"
                  src={getYouTubeEmbedUrl(tutorial.video_url)}
                  title={tutorial.title}
                />
                <CardContent>
                  <Typography variant="h6">{tutorial.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <div dangerouslySetInnerHTML={{ __html: tutorial.description }} />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedTutorial && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedTutorial.title}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <Box flex="1" marginRight={{ md: 2 }}>
                <iframe
                  width="100%"
                  height="315"
                  src={getYouTubeEmbedUrl(selectedTutorial.video_url)}
                  title={selectedTutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
              <Box flex="1">
                <Typography variant="body1" color="textPrimary">
                  <div dangerouslySetInnerHTML={{ __html: selectedTutorial.description }} />
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default Tutorials;
