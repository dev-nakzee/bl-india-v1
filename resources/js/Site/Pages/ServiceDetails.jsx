// src/Pages/ServiceDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api';

const ServiceDetailsSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[3],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ServiceImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
}));

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await apiClient.get(`/services/${slug}`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <>
      <Helmet>
        <title>{service.seo_title}</title>
        <meta name="description" content={service.seo_description} />
        <meta name="keywords" content={service.seo_keywords} />
      </Helmet>
      <ServiceDetailsSection>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <ServiceImage src={`https://in.bl-india.com/${service.image_url}`} alt={service.image_alt} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
              {service.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {service.description}
            </Typography>
          </Grid>
        </Grid>
      </ServiceDetailsSection>
    </>
  );
};

export default ServiceDetails;
