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
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';
import SharePage from '../Components/SharePage';

const ProductDetails = () => {
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState('0');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(`/products/${slug}`);
        setProductData(response.data.product);
        setNotificationData(response.data.notification);
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
      <Box sx={{ padding: 4 }}>
        <Card className="Product-card" sx={{ display: 'flex', mb: 4 }}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', sm: '350px' }, backgroundColor: '#c3e7ff' }}
            image={`https://in.bl-india.com/${productData.image_url}`}
            alt={productData.image_alt}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Product Name: &nbsp;&nbsp;&nbsp; <span className='font-bold'>{productData.name}</span>
            </Typography>
            {productData.technical_name && (
              <Typography variant="h4" gutterBottom>
                <span className='font-bold'>Technical Name:</span> &nbsp;&nbsp;&nbsp; {productData.technical_name}
              </Typography>
            )}
            <Typography variant="h4" gutterBottom>
              <span className='font-bold'>Product Category:</span> &nbsp;&nbsp;&nbsp; {productData.product_category.name}
            </Typography>
            <SharePage color='secondary'/>
          </CardContent>
        </Card>
        <Box>
          <Typography variant="body1">
            {productData.description ? parse(productData.description) : 'No description available.'}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Applicable Compliances
          </Typography>
          {productData.services.length > 0 ? (
            <Box className="ProductDetail-tab">
              <TabContext value={tabValue}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="service tabs">
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
                    <Typography variant="h5" gutterBottom>
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
                    {service.details ? parse(service.details) : 'No details available.'}
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
        {/* {notificationData && notificationData.length > 0 && (
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
                    variant="contained"
                  >
                    {notif.notification.name}
                  </Button>
                </Typography>
              </Box>
            ))}
          </Box>
        )} */}
      </Box>
    </>
  );
};

export default ProductDetails;
