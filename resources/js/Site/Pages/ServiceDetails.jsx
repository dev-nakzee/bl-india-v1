import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';
import MandatoryProducts from '../Components/MandatoryProducts'; // Import the MandatoryProducts component

const ServiceSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[3],
  display: 'flex',
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: theme.shadows[5],
}));

const ServiceImage = styled(CardMedia)(({ theme }) => ({
  maxWidth: '85px',
  backgroundSize: 'contain',
  objectFit: 'contain',
  marginRight: '20px',
}));

const ServiceCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '25%',
  maxHeight: '400px',
  overflowY: 'auto',
  paddingRight: theme.spacing(2),
}));

const ServicesList = styled(Box)(({ theme }) => ({
  width: '75%',
}));

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await apiClient.get(`/services/${slug}`);
        setServiceData(response.data);
        if (response.data.sections.length > 0) {
          setSelectedSection(response.data.sections[0]);
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!serviceData) {
    return null; // Or return a fallback UI if needed
  }

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
      <Helmet>
        <title>{serviceData.service.seo_title}</title>
        <meta name="description" content={serviceData.service.seo_description} />
        <meta name="keywords" content={serviceData.service.seo_keywords} />
      </Helmet>
      <ServiceSection>
        <Sidebar>
          <Typography variant="h3" mb={2}>Service Sections</Typography>
          <List>
            {serviceData.sections.map((section) => (
              <ListItem
                button
                key={section.id}
                selected={section.id === (selectedSection && selectedSection.id)}
                onClick={() => handleSectionClick(section)}
              >
                <ListItemText primary={section.name} />
              </ListItem>
            ))}
          </List>
        </Sidebar>
        <ServicesList>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <ServiceImage
                component="img"
                image={`https://in.bl-india.com/${serviceData.service.thumbnail_url}`}
                alt={serviceData.service.image_alt}
              />
              <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 500, maxWidth: 280, color: '#0D629A', margin: 'auto', borderRadius: 20 }}>
                {serviceData.service.name}
              </Typography>
              <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                {serviceData.service.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {selectedSection && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    {selectedSection.name}
                  </Typography>
                  {selectedSection.slug === 'mandatory-products' ? (
                    <MandatoryProducts serviceId={serviceData.service.id} />
                  ) : (
                    <Typography variant="body1">
                      {selectedSection.content ? parse(selectedSection.content) : 'No content available.'}
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </ServicesList>
      </ServiceSection>
    </>
  );
};

export default ServiceDetails;