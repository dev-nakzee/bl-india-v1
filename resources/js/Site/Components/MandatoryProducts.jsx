import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const ProductCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: theme.shadows[5],
  margin: theme.spacing(2),
}));

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

  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <ProductCard>
            <CardContent>
              <Typography variant="h5" component="div">
                {product.product_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.product_slug}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.product_category_name}
              </Typography>
            </CardContent>
          </ProductCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MandatoryProducts;
