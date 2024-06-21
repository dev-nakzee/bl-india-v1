import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const ProductDetails = () => {
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(`/products/${slug}`);
        setProductData(response.data.product);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!productData) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <>
      <Helmet>
        <title>{productData.seo_title}</title>
        <meta name="description" content={productData.seo_description} />
        <meta name="keywords" content={productData.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Card sx={{ display: 'flex', mb: 4 }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={`https://in.bl-india.com/${productData.image_url}`}
            alt={productData.image_alt}
          />
          <CardContent>
                <Typography variant="h3" gutterBottom>
                {productData.name}
                </Typography>
                {productData.technical_name ?
                   ( <Typography variant="h3" gutterBottom>
                    Technical Name : {productData.technical_name}
                    </Typography>) : ("")}
                <Typography variant="h3" gutterBottom>
                    Product Category : {productData.product_category.name}
                </Typography>
          </CardContent>
        </Card>
        <Box>
        <Typography variant="body1">
              {productData.description ? parse(productData.description) : 'No description available.'}
        </Typography>
          <Typography variant="h4" gutterBottom>
            Services
          </Typography>
          {productData.services.length > 0 ? (
            productData.services.map(service => (
              <Box key={service.id} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  {service.details ? parse(service.details) : 'No details available.'}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No services available for this product.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
