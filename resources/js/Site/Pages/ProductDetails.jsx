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
import { useParams, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(`/products/${slug}`);
        let services = response.data.services || [];
        const notificationData = response.data.notification || [];

        // If serviceId is provided in local storage, set the corresponding tab as selected
        const serviceId = localStorage.getItem('serviceId');
        if (serviceId) {
          const initialTabIndex = services.findIndex(
            (service) => service.id === parseInt(serviceId)
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
        <meta name="author" content="Rajesh Kumar" />
        <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
        <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
        <meta name="Classification" content="Business" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={productData.seo_title} />
        <meta property="og:description" content={productData.seo_description} />
        <meta property="og:url" content="https://bl-india.com" />
        <meta property="og:site_name" content="Brand Liaison India®" />
        <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />
  
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={fullUrl} />
      </Helmet>
      <Box className="product-details" sx={{ padding: isMobile ? 2 : 4 }}>
      {/* <Typography variant="h1" className='d-none'>Brand Liaison
      </Typography> */}
        <Card className="Product-card" sx={{ marginBottom: isMobile ? 2 : 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <CardMedia
                component="img"
                sx={{ width: '100%', backgroundColor: '#c3e7ff' }}
                image={`https://bl-india.com/${productData.image_url}`}
                alt={productData.image_alt}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <CardContent>
                <Typography variant="subtitle" gutterBottom sx={{ display: 'block' }}>
                <Typography variant="subtitle" className='font-bold' sx={{display: 'inline-block' }}>Product Name:</Typography> &nbsp;&nbsp; <Typography variant="h1" className='font-bold product-name' sx={{display: 'inline-block' }}
                    >{productData.name}</Typography>
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
          <Typography variant="h6" mb={1}>
            Applicable Compliances
          </Typography>
          {productData.services && productData.services.length > 0 ? (
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
                      label={service.is_mandatory === '1' ? `${service.name} (Mandatory)` : `${service.name} (Voluntary)`}
                      value={`${index}`}
                    />
                  ))}
                </Tabs>
                {productData.services.map((service, index) => (
                  <TabPanel key={service.id} value={`${index}`}>
                    <Typography variant="subtitle1" gutterBottom>
                      {service.name} for {productData.name}
                    </Typography>
                    {service.compliance_header === 'Indian Standard' ? (
                      <Typography variant="body1" gutterBottom>
                        Indian Standard : <strong>{service.is}</strong>
                      </Typography>
                    ) : service.compliance_header === 'Group, Scheme' ? (
                      <>
                        <Typography variant="body1" gutterBottom>
                          Group : <strong>{service.group}</strong>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Scheme : <strong>{service.scheme}</strong>
                        </Typography>
                      </>
                    ) : service.compliance_header !== 'Indian Standard' && service.compliance_header !== 'Group, Scheme' && service.compliance_header !== 'null' ? (
                      <Typography variant="body1" gutterBottom>
                        {service.compliance_header} : <strong>{service.others}</strong>
                      </Typography>
                    ) : null}
                    <>
                      {service.details ? parse(service.details) : 'No details available.'}
                    </>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2, pb: 2, justifyContent: 'center' }}>
                      <Button
                        component={Link}
                        to={`/services/${service.service_category.slug}/${service.slug}`}
                        variant="contained"
                        color="primary"
                        sx={{borderRadius:2}}
                      >
                        Learn More
                      </Button>
                      <Button
                        component={Link}
                        to={`/notifications/${service.slug}`}
                        variant="contained"
                        color="secondary"
                        sx={{borderRadius:2}}

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
              <Box key={notif.id}>
                <Typography variant="subtitle">
                  <Button
                    component={Link}
                    sx={{paddingLeft:0}}
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
        <Box sx={{mb: 2, px: 1,pl:0}}>
        <BackButton />
      </Box> 
      </Box>
     
    </>
  );
};

export default ProductDetails;
