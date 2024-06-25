import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/system';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const BlogDetails = () => {
  const { categorySlug, blogSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const Sidebar = styled(Box)(({ theme }) => ({
    width: '25%',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
    overflowY: 'auto',
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Make sidebar full width on small screens
      position: 'static', // Remove sticky positioning on small screens
      top: 'auto', // Reset top spacing on small screens
      overflowY: 'visible', // Reset overflow on small screens
      paddingRight: 0, // Reset right padding on small screens
    },
  }));

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await apiClient.get(`/blogs/${blogSlug}`);
        setBlog(response.data.blog[0]);
        setCategories(response.data.category);

        const category = response.data.category.find(cat => cat.slug === categorySlug);
        setSelectedCategory(category ? category.id : 'all');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [categorySlug, blogSlug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Blog not found.
        </Typography>
      </Box>
    );
  }

  const handleCategoryClick = (categoryId, slug) => {
    setSelectedCategory(categoryId);
    navigate(`/blogs/${slug}`);
  };

  return (
    <>
      <Helmet>
        <title>{blog.seo_title}</title>
        <meta name="description" content={blog.seo_description} />
        <meta name="keywords" content={blog.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Sidebar>
              <Typography variant="h6" mb={2}>Blog Categories</Typography>
              <List>
                <ListItem
                  button
                  selected={selectedCategory === 'all'}
                  onClick={() => handleCategoryClick('all', '')}
                >
                  <ListItemText primary="All Blogs" />
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
            </Sidebar>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom textAlign={'center'} marginBottom={4}>
              {blog.name}
            </Typography>
            <img
              src={'https://in.bl-india.com/' + blog.image_url}
              alt={blog.image_alt}
              style={{ width: '100%', borderRadius: '20px', marginBottom: '20px' }}
            />
            <Typography variant="body1" gutterBottom>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`Posted on ${new Date(blog.created_at).toLocaleDateString()}`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BlogDetails;
