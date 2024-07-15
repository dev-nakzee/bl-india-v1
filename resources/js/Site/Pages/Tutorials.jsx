import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <Card>
                <CardMedia
                  component="iframe"
                  height="200"
                  src={tutorial.video_url}
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
    </Container>
  );
};

export default Tutorials;
