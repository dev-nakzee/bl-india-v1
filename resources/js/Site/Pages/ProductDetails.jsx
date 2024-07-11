import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Button,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTheme } from '@mui/system';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';
import SharePage from '../Components/SharePage';
import BackButton from '../Components/BackButton';

const ProductDetails = () => {
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState('0');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(`/products/${slug}`);
        let services = response.data.product.services;
        const notificationData = response.data.notification;

        // If serviceId is provided in local storage, set the corresponding tab as selected
        const serviceId = localStorage.getItem('serviceId');
        if (serviceId) {
          const initialTabIndex = services.findIndex(
            (service) => service.service.id === parseInt(serviceId)
          );
          if (initialTabIndex !== -1) {
            setTabValue('0');
            // Move the selected service to the first position
            services = [
              services[initialTabIndex],
              ...services.slice(0, initialTabIndex),
              ...services.slice(initialTabIndex + 1),
            ];
            localStorage.removeItem('serviceId'); // Clear local storage after using it
          }
        }

        setProductData({ ...response.data.product, services });
        setNotificationData(notificationData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!productData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>{productData.seo_title}</title>
        <meta name="description" content={productData.seo_description} />
        <meta name="keywords" content={productData.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: isMobile ? 2 : 4 }}>
        <Card className="Product-card" sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <CardMedia
                component="img"
                sx={{ width: '100%', backgroundColor: '#c3e7ff' }}
                image={`https://in.bl-india.com/${productData.image_url}`}
                alt={productData.image_alt}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <CardContent>
                <Typography variant="subtitle" gutterBottom sx={{ display: 'block' }}>
                  <span>Product Name:</span> &nbsp;&nbsp; <span className='font-bold'>{productData.name}</span>
                </Typography>
                {productData.technical_name && productData.technical_name !== 'null' && (
                  <Typography variant="subtitle" gutterBottom sx={{ display: 'block' }}>
                    <span>Technical Name:</span> &nbsp;&nbsp; <span className='font-bold'>{productData.technical_name}</span>
                  </Typography>
                )}
                <Typography variant="subtitle" gutterBottom sx={{ display: 'block' }}>
                  <span>Product Categories:</span> &nbsp;&nbsp; 
                  <span className='font-bold'>
                    {productData.categories.map((category) => category.name).join(' / ')}
                  </span>
                </Typography>
                <Typography variant="subtitle" gutterBottom sx={{ display: 'block' }}>
                  <span>Share Product:</span> &nbsp;&nbsp; <SharePage color='secondary' />
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Box>
          <Typography variant="body1">
            {productData.description ? parse(productData.description) : 'No description available.'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Applicable Compliances
          </Typography>
          {productData.services.length > 0 ? (
            <Box className="ProductDetail-tab">
              <TabContext value={tabValue}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="service tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {productData.services.map((service, index) => (
                    <Tab
                      key={service.id}
                      label={service.is_mandatory ? `${service.service.name} (Mandatory)` : `${service.service.name} (Voluntary)`}
                      value={`${index}`}
                    />
                  ))}
                </Tabs>
                {productData.services.map((service, index) => (
                  <TabPanel key={service.id} value={`${index}`}>
                    <Typography variant="subtitle1" gutterBottom>
                      {service.service.name} for {productData.name}
                    </Typography>
                    {service.service.compliance_header === 'Indian Standard' ? (
                      <Typography variant="body1" gutterBottom>
                        Indian Standard: <strong>{service.is}</strong>
                      </Typography>
                    ) : service.service.compliance_header === 'Group, Scheme' ? (
                      <>
                        <Typography variant="body1" gutterBottom>
                          Group: <strong>{service.group}</strong>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Scheme: <strong>{service.scheme}</strong>
                        </Typography>
                      </>
                    ) : null}
                    <>
                      {service.details ? parse(service.details) : 'No details available.'}
                    </>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2, justifyContent: 'center' }}>
                      <Button
                        component={Link}
                        to={`/services/${service.service.service_category.slug}/${service.service.slug}`}
                        variant="contained"
                        color="primary"
                      >
                        Learn More
                      </Button>
                      <Button
                        component={Link}
                        to={`/notifications/${service.service.slug}`}
                        variant="contained"
                        color="secondary"
                      >
                        Latest Notifications
                      </Button>
                    </Box>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          ) : (
            <Typography>No services available for this product.</Typography>
          )}
        </Box>
        {notificationData && notificationData.length > 0 && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
              Related Notifications
            </Typography>
            {notificationData.map((notif) => (
              <Box key={notif.id} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">
                  <Button
                    component={Link}
                    to={`/notifications/${notif.notification.category.slug}/${notif.notification.slug}`}
                    // variant="contained"
                  >
                    {notif.notification.name}
                  </Button>
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        
      </Box>
      <Box sx={{mb: 2, px: 4}}>
      <BackButton/>
      </Box>
    </>
  );
};

export default ProductDetails;
