import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Link as MuiLink, List, ListItem, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { Share } from '@mui/icons-material';

const NotificationDetails = () => {
  const { categorySlug, slug } = useParams();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await apiClient.get(`/notifications/${categorySlug}/${slug}`);
        setNotification(response.data);
      } catch (error) {
        console.error('Error fetching notification details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [categorySlug, slug]);

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
        <Typography variant="h6" gutterBottom>
          {notification.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {notification.date}
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: notification.content }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
          <MuiLink href={notification.file_url} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <PictureAsPdfIcon />
            </IconButton>
          </MuiLink>
          <MuiLink href={notification.file_url} target="_blank" download>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </MuiLink>
          <MuiLink href={notification.file_url} target="_blank" download>
            <IconButton>
              <Share />
            </IconButton>
          </MuiLink>
        </Box>
        <Box sx={{ marginY: 2 }}>
          <Typography variant="h6">Products</Typography>
          {notification.products.length > 0 ? (
            <List>
              {notification.products.map((product) => (
                <ListItem key={product.id}>
                  <MuiLink href={`/products/${product.slug}`} target="_blank">
                    {product.name}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No products available.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NotificationDetails;