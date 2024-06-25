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
  TextField,
  InputAdornment
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const KnowledgeBase = () => {
  const [pageData, setPageData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKnowledgeBase();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      fetchKnowledgeBase();
    }
  }, [searchQuery]);

  const fetchKnowledgeBase = async (retryCount = 3) => {
    try {
      const response = await apiClient.get('/knowledge-base');
      setPageData(response.data.page);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
      if (retryCount > 0) {
        setTimeout(() => fetchKnowledgeBase(retryCount - 1), 3000); // Retry after 3 seconds
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query, retryCount = 3) => {
    try {
      const response = await apiClient.get(`/knowledge-base/find/${query}`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching search results:', error);
      if (retryCount > 0) {
        setTimeout(() => fetchSearchResults(query, retryCount - 1), 3000); // Retry after 3 seconds
      } else {
        setError(true);
      }
    }
  };

  const handleCategoryClick = (slug) => {
    navigate(`/knowledge-base/${slug}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Failed to load data. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!pageData) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <>
      <Helmet>
        <title>{pageData.seo_title}</title>
        <meta name="description" content={pageData.seo_description} />
        <meta name="keywords" content={pageData.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          {pageData.name}
        </Typography>
        <TextField
          label="Search Questions"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '20px' }}>
                <CardActionArea onClick={() => handleCategoryClick(category.slug)}>
                  {category.is_featured && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={'https://in.bl-india.com' + category.image_url}
                      alt={category.image_alt}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default KnowledgeBase;
