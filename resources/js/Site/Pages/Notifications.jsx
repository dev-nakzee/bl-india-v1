import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const NotificationPage = () => {
  const { categorySlug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await apiClient.get('/notifications');
        const data = response.data;
        setPageData(data.page[0]);
        setNotifications(data.notifications);
        setCategories(data.categories);

        const category = data.categories.find(cat => cat.slug === categorySlug);
        setSelectedCategory(category ? category.id : 'all');
      } catch (error) {
        console.error('Error fetching notification data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationData();
  }, [categorySlug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pageData) {
    return null; // Or return a fallback UI if needed
  }

  const handleCategoryClick = (categoryId, slug) => {
    setSelectedCategory(categoryId);
    navigate(`/notifications/${slug}`);
  };

  const filteredNotifications = selectedCategory === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.notification_category_id === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{pageData.seo_title}</title>
        <meta name="description" content={pageData.seo_description} />
        <meta name="keywords" content={pageData.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom>
              Categories
            </Typography>
            <List>
              <ListItem
                button
                selected={selectedCategory === 'all'}
                onClick={() => handleCategoryClick('all', '')}
              >
                <ListItemText primary="All Notifications" />
              </ListItem>
              {categories.map(category => (
                <ListItem
                  key={category.id}
                  button
                  selected={category.id === selectedCategory}
                  onClick={() => handleCategoryClick(category.id, category.slug)}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" gutterBottom>
              {pageData.name}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredNotifications.map(notification => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.id}</TableCell>
                      <TableCell>{notification.name}</TableCell>
                      <TableCell>{notification.date}</TableCell>
                      <TableCell>
                        <Button variant="outlined" component="a" href={`/notifications/${notification.category.slug}/${notification.slug}`}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NotificationPage;
