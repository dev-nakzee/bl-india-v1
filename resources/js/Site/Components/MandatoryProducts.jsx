import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const MandatoryProducts = ({ serviceId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get(`/services/${serviceId}/mandatory-products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching mandatory products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [serviceId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!products.length) {
    return <Typography>No mandatory products available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`https://in.bl-india.com/${product.image_url}`}
              alt={product.image_alt}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MandatoryProducts;
