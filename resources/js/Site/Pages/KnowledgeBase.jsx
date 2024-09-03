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
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Search, ExpandMore } from '@mui/icons-material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import { useLocation } from 'react-router-dom';


const KnowledgeBase = () => {
  const [pageData, setPageData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

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
      setSearchResults([]);
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
      setSearchResults(response.data);
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
    <section className='knowledge_bg' >
      <Helmet>
        <title>{pageData.seo_title}</title>
        <meta name="description" content={pageData.seo_description} />
        <meta name="keywords" content={pageData.seo_keywords} />
        
        <meta name="author" content="Rajesh Kumar" />
        <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
        <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
        <meta name="Classification" content="Business" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageData.seo_description} />
        <meta property="og:url" content="https://bl-india.com" />
        <meta property="og:site_name" content="Brand Liaison India®" />
        <meta property="og:image" content={'https://bl-india.com/'+pageData.image_url} />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={fullUrl} />
      </Helmet>
      {/* <img src={know_bg} alt="careers_bg" className='knowledge_bg' /> */}

      <Box padding={{lg:5,md:4,sm:3,xs:2}}>
      <Typography   className="page-main-heading page-heading"
                    variant="h1" textAlign="center" gutterBottom marginBottom={4}>
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
        {searchQuery && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <Accordion key={result.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{result.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{result.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Grid container spacing={4} marginTop={2}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                {category.is_featured ? (
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '20px',boxShadow:'none' }}>
                    <CardActionArea onClick={() => handleCategoryClick(category.slug)}>
                      <CardMedia  
                      sx={{backgroundSize:'contain',objectFit: 'contain' }}
                        component="img"
                        height="100"
                        image={'https://in.bl-india.com' + category.image_url}
                        alt={category.image_alt}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
                          {category.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ) : (
                  <Typography variant="h6" textAlign={'center'}>
                    <Link href="#" onClick={() => handleCategoryClick(category.slug)}>
                      {category.name}
                    </Link>
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </section>
  );
};

export default KnowledgeBase;
