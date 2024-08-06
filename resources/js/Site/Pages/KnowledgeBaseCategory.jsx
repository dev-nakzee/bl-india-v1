import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { ExpandMore, Search } from '@mui/icons-material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const KnowledgeBaseCategory = () => {
  const { categorySlug } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [filteredKnowledgeBases, setFilteredKnowledgeBases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCategoryData();
  }, [categorySlug]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredKnowledgeBases(
        knowledgeBases.filter((kb) =>
          kb.question.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredKnowledgeBases(knowledgeBases);
    }
  }, [searchQuery, knowledgeBases]);

  const fetchCategoryData = async (retryCount = 3) => {
    try {
      const response = await apiClient.get(`/knowledge-base/${categorySlug}`);
      setCategoryData(response.data.category);
      setKnowledgeBases(response.data.knowledgeBases);
      setFilteredKnowledgeBases(response.data.knowledgeBases);
    } catch (error) {
      console.error('Error fetching category data:', error);
      if (retryCount > 0) {
        setTimeout(() => fetchCategoryData(retryCount - 1), 3000); // Retry after 3 seconds
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
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

  if (!categoryData) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <section className='knowledge_bg'>
      <Helmet>
        <title>{categoryData.seo_title || categoryData.name}</title>
        <meta name="description" content={categoryData.seo_description || categoryData.name} />
        <meta name="keywords" content={categoryData.seo_keywords || categoryData.name} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
      <Typography    className="page-main-heading page-heading"
                    variant="h1" textAlign="center" gutterBottom marginBottom={4}>
          Knowledgebase - {categoryData.name}
        </Typography>
        <TextField
          label="Search Questions"
          variant="outlined"
          
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        <Grid container spacing={4} marginTop={1}>
          {filteredKnowledgeBases.map((kb) => (
            <Grid item xs={12} key={kb.id}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant='bodytext' color="secondary">{kb.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{kb.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default KnowledgeBaseCategory;
