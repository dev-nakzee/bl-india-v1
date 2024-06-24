import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Pagination,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Blogs = () => {
  const { categorySlug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await apiClient.get('/blogs');
        const data = response.data;
        setPageData(data.page);
        setBlogs(data.blogs);
        setCategories(data.category);

        const category = data.category.find(cat => cat.slug === categorySlug);
        setSelectedCategory(category ? category.id : 'all');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
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
    navigate(`/blogs/${slug}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredBlogs = selectedCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.blog_category_id === selectedCategory);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

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
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" gutterBottom>
              {pageData.name}
            </Typography>
            <Grid container spacing={2}>
              {paginatedBlogs.map(blog => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,borderRadius:'20px'}}>
                                <CardActionArea component={MuiLink} href={`/blogs/${blog.slug}`}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={'https://in.bl-india.com/' + blog.image_url}
                        alt={blog.image_alt}
                        className='cardmedia'
                      />
                      <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="h6">
                          {blog.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {blog.seo_description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredBlogs.length / blogsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Blogs;
