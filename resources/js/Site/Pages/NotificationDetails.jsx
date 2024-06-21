import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Link as MuiLink } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const NotificationDetails = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await apiClient.get(`/notifications/${id}`);
        setNotification(response.data);
      } catch (error) {
        console.error('Error fetching notification details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!notification) {
    return <Typography variant="h6">Notification not found</Typography>;
  }

  return (
    <>
      <Helmet>
        <title>{notification.seo_title}</title>
        <meta name="description" content={notification.seo_description} />
        <meta name="keywords" content={notification.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          {notification.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {notification.date}
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <Typography variant="body1">{notification.content}</Typography>
        </Box>
        <MuiLink href={notification.file_url} target="_blank" rel="noopener noreferrer">
          View PDF
        </MuiLink>
        <Box sx={{ marginY: 2 }}>
          <Typography variant="h6">Products</Typography>
          {notification.products.length > 0 ? (
            notification.products.map((product) => (
              <MuiLink key={product.id} href={`/products/${product.slug}`} target="_blank">
                {product.name}
              </MuiLink>
            ))
          ) : (
            <Typography>No products available.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NotificationDetails;
