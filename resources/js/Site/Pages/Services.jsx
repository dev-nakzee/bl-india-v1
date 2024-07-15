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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
import DownloadBrochure from '../Components/DownloadBrochure';
import RequestCallBack from '../Components/RequestCallBack';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import useMediaQuery from '@mui/material/useMediaQuery';
import BackButton from '../Components/BackButton';

const ServiceSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
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
  maxWidth: '70px',
  backgroundSize: 'contain',
  objectFit: 'contain',
  marginRight: '5px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '50px',
    marginRight: '5px',
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
  [theme.breakpoints.down('sm')]: {
    display: 'none', // Hide sidebar on small screens
  },
}));

const ServicesList = styled(Box)(({ theme }) => ({
  width: '75%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const Services = () => {
  const { categorySlug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileSelectValue, setMobileSelectValue] = useState('all'); // State for mobile select value
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await apiClient.get('/services');
        setServiceData(response.data);
        const category = response.data.serviceCategories.find(
          (cat) => cat.slug === categorySlug
        );
        setSelectedCategory(category ? category.id : 'all');
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [categorySlug]);

  const handleCategoryClick = (categoryId, slug) => {
    setSelectedCategory(categoryId);
    navigate(`/services/${slug}`);
  };

  const handleMobileSelectChange = (event) => {
    const categoryId = event.target.value;
    setMobileSelectValue(categoryId);
    const category = serviceData.serviceCategories.find(cat => cat.id === categoryId);
    navigate(`/services/${category.slug}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!serviceData) {
    return null;
  }

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
      
      <Grid item xs={12} display={'flex'} justifyContent={'center'} alignContent={'center'} marginBlock={3} className='services-page'>
        <Box flexDirection={'column'}>
          <Typography className="page-heading" variant="h4" textAlign="center" gutterBottom>
            {serviceData.page.name}
          </Typography>
        </Box>
      </Grid>
     
       {/* Mobile view select dropdown */}
       <Grid item xs={12} paddingInline={2}>
       <FormControl sx={{ marginTop: '10px', display: { xs: 'block', sm: 'none' } }}>
          {/* <InputLabel id="mobile-select-label">Select Category</InputLabel> */}
          <Select
            labelId="mobile-select-label"
            id="mobile-select"
            value={mobileSelectValue}
            onChange={handleMobileSelectChange}
            fullWidth={true}
          >
            <MenuItem value="all">All Services</MenuItem>
            {serviceData.serviceCategories.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
      <ServiceSection className='Service-section'>
        <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
       
          <Sidebar className='Service-section-siderbar'>
            <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>
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
            </Box>
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
                        <Box paddingInline={'16px'} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '16px' }}>
                          <ServiceImage
                            component="img"
                            image={`https://in.bl-india.com/${service.thumbnail_url}`}
                            alt={service.image_alt}
                          />
                            <Box 
                                    
                                    sx={{
                                        display: "flex",
                                        alignItems: "left",
                                       flexDirection:'column'                                       
                                    }}
                                    >
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{
                                            marginLeft: "5px",
                                            marginBottom:"5px",
                                            color: "#0D629A",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {service.name}
                                    </Typography>
                                    <Typography
                                        variant="bodytext"
                                        component="p"
                                        sx={{
                                            marginLeft: "5px",
                                            color: "#1C7CBC",
                                            fontWeight: 500,
                                        }}
                                    >
                                        
                                        {service.tagline}
                                    </Typography></Box>
                        </Box>
                        <ServiceCardContent>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                          <Button sx={{ marginTop: '15px' }} variant="outlined" component={Link} to={`/services/${service.service_category.slug}/${service.slug}`}>
                            Read More
                          </Button>
                        </ServiceCardContent>
                      </ServiceCard>
                      
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{marginBlock:2}}>
                <BackButton/></Box>

              </Grid>
            </Grid>
          </ServicesList>
          
        </Box>
       
      </ServiceSection>
      
    </>
  );
};

export default Services;



