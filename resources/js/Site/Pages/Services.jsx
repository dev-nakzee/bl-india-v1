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
  Button,
} from '@mui/material';
import { Link } from'react-router-dom';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const ServiceSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[5],
  display: 'flex',
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  // margin: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));

const ServiceImage = styled(CardMedia)(({ theme }) => ({
 maxWidth: '85px',
  backgroundSize: 'contain',
  objectFit: 'contain' ,
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

const Services = () => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await apiClient.get('/services');
        setServiceData(response.data);
        setSelectedCategory('all'); // Default to 'All Services'
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredServices = selectedCategory === 'all' 
    ? serviceData.services 
    : serviceData.services.filter(service => service.service_category_id === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{serviceData.page.seo_title}</title>
        <meta name="description" content={serviceData.page.seo_description} />
        <meta name="keywords" content={serviceData.page.seo_keywords} />
      </Helmet>
      <ServiceSection className='Service-section'>
        <Sidebar className='Service-section-siderbar'>
          <Typography variant="h3" mb={2}>Service Categories</Typography>
          <List>
            <ListItem
              button
              selected={selectedCategory === 'all'}
              onClick={() => handleCategoryClick('all')}
            >
              <ListItemText primary="All Services" />
            </ListItem>
            {serviceData.serviceCategories.map(category => (
              <ListItem
                key={category.id}
                button
                selected={category.id === selectedCategory}
                onClick={() => handleCategoryClick(category.id)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Sidebar>
        <ServicesList>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 500, maxWidth: 280, color: '#0D629A', margin: 'auto', borderRadius: 20 }}>
                {serviceData.page.name}
              </Typography>
              <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                {serviceData.page.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {filteredServices.map(service => (
                  <Grid item key={service.id} xs={12} sm={6} md={4}>
                    <ServiceCard>
                      <Box paddingInline={'16px'} sx={{display:'flex',justifyContent:'flex-start',alignItems:'center',paddingTop:'16px'}}>
                      <ServiceImage
                        component="img"
                        image={`https://in.bl-india.com/${service.thumbnail_url}`}
                        alt={service.image_alt}
                      />
                        <Typography gutterBottom variant="h5" component="div">
                          {service.name}
                        </Typography>
                        </Box>
                      <ServiceCardContent>
                      
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                        <Button sx={{marginTop:'15px'}} variant="outlined" component={Link} to={`/services/${service.slug}`}>
                            Read More
                        </Button>
                      </ServiceCardContent>
                    </ServiceCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </ServicesList>
      </ServiceSection>
    </>
  );
};

export default Services;
