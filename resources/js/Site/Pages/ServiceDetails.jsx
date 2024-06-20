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
  Drawer,
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const ServiceSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[3],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
}));

const ServiceImage = styled(CardMedia)(({ theme }) => ({
  height: 140,
}));

const drawerWidth = 240;

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Helmet>
        <title>{serviceData.service.seo_title}</title>
        <meta name="description" content={serviceData.service.seo_description} />
        <meta name="keywords" content={serviceData.service.seo_keywords} />
      </Helmet>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <List>
          {serviceData.sections.map((section) => (
            <ListItem button key={section.id} onClick={() => handleSectionClick(section)}>
              <ListItemText primary={section.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          p: 3,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
              {serviceData.service.name}
            </Typography>
            <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
              {serviceData.service.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ServiceCard>
              <ServiceImage
                component="img"
                image={`https://in.bl-india.com/${serviceData.service.image_url}`}
                alt={serviceData.service.image_alt}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {serviceData.service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {serviceData.service.description}
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12}>
            {selectedSection && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                  {selectedSection.name}
                </Typography>
                <Typography variant="body1">
                  {selectedSection.content ? parse(selectedSection.content) : ''}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ServiceDetails;
