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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
import DownloadBrochure from '../Components/DownloadBrochure';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import RequestCallBack from '../Components/RequestCallBack';

const ServiceSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  // backgroundColor: '#f5f5f5',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2), // Decrease padding on small screens
  },
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
  [theme.breakpoints.down('sm')]: {
    maxWidth: '60px', // Adjust image size for small screens
    marginRight: '10px', // Adjust margin for small screens
  },
}));

const ServiceCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

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

const ServicesList = styled(Box)(({ theme }) => ({
  width: '75%',
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Make services list full width on small screens
  },
}));

const Services = () => {
  const { categorySlug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await apiClient.get('/services');
        setServiceData(response.data);
        const category = response.data.serviceCategories.find(
          (cat) => cat.slug === categorySlug
        );
        setSelectedCategory(category ? category.id : 'all'); // Default to 'All Services' if no categorySlug is matched
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [categorySlug]);

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

  const handleCategoryClick = (categoryId, slug) => {
    setSelectedCategory(categoryId);
    navigate(`/services/${slug}`);
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
      <Grid item xs={12}  display={'flex'} justifyContent={'center'} alignContent={'center'}marginBlock={3} className='services-page'>
      <Box flexDirection={'column'}>
              {/* <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, maxWidth: 280, backgroundColor: '#0D629A',color: '#fff', margin: 'auto', borderRadius: 20 }}>
              {serviceData.page.title} 
              </Typography> */}
              <Typography  className="page-heading" variant="h4" textAlign="center" gutterBottom >
              {serviceData.page.name}

              </Typography>
             </Box>
            </Grid>
      <ServiceSection className='Service-section'>
     
            <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
        <Sidebar className='Service-section-siderbar'>
          <Typography variant="h6" mb={2}>Service Categories</Typography>
          <List>
            <ListItem
              button
              selected={selectedCategory === 'all'}
              onClick={() => handleCategoryClick('all', '')}
            >
              <ListItemText primary="All Services" />
            </ListItem>
            {serviceData.serviceCategories.map(category => (
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
          <DownloadBrochure />
          <RequestCallBack />
        </Sidebar>
        <ServicesList>
          <Grid container spacing={4} alignItems="center">
           
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
                        <Typography gutterBottom variant="heading" component="div">
                          {service.name}
                        </Typography>
                        </Box>
                      <ServiceCardContent>
                      
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                        <Button sx={{marginTop:'15px'}} variant="outlined" component={Link} to={`/services/${service.service_category.slug}/${service.slug}`}>
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
        </Box>
      </ServiceSection>
    </>
  );
};

export default Services;
