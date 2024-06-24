import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Container
} from '@mui/material';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const WebsiteDisclaimer = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebsiteDisclaimer();
  }, []);

  const fetchWebsiteDisclaimer = async () => {
    try {
      const response = await apiClient.get('/website-disclaimer');
      setPageData(response.data);
    } catch (error) {
      console.error('Error fetching website disclaimer:', error);
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

  if (!pageData) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <>
      <Helmet>
        <title>{pageData.page.seo_title}</title>
        <meta name="description" content={pageData.page.seo_description} />
        <meta name="keywords" content={pageData.page.seo_keywords} />
      </Helmet>
      <>
        <Box sx={{ padding: 4 }} className="privacy-policy">
          <Typography variant="h3" gutterBottom>
            {pageData.page.name}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            {parse(pageData.section.content)}
          </Box>
        </Box>
      </>
    </>
  );
};

export default WebsiteDisclaimer;
