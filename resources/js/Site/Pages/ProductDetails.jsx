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
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const ProductDetails = () => {
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState('0');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get(`/products/${slug}`);
        setProductData(response.data.product);
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
    return null; // Or return a fallback UI if needed
  }

  return (
    <>
      <Helmet>
        <title>{productData.seo_title}</title>
        <meta name="description" content={productData.seo_description} />
        <meta name="keywords" content={productData.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }}>
        <Card  className="Product-card" sx={{ display: 'flex', mb: 4 }}>
          <CardMedia
            component="img"
            sx={{ width: '100%',maxWidth:'350px',backgroundColor:'#c3e7ff' }}
            image={`https://in.bl-india.com/${productData.image_url}`}
            alt={productData.image_alt}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
            <span className=''>Product Name: </span>&nbsp;&nbsp;&nbsp; {productData.name}
            </Typography>
            {productData.technical_name && (
              <Typography variant="h4" gutterBottom>
               <span className=''>Technical Name: </span>&nbsp;&nbsp;&nbsp;{productData.technical_name}
              </Typography>
            )}
            <Typography variant="h4" gutterBottom>
            <span className=''>Product Category:</span>&nbsp;&nbsp;&nbsp; {productData.product_category.name}
            </Typography>
          </CardContent>
        </Card>
        <Box>
          <Typography variant="body1">
            {productData.description ? parse(productData.description) : 'No description available.'}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Compliances
          </Typography >
          {productData.services.length > 0 ? (
            <Box className="ProductDetail-tab">
            <TabContext value={tabValue}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="service tabs">
                {productData.services.map((service, index) => (
                  <Tab
                    key={service.id}
                    label={service.is_mandatory === true ? `${service.service.name} (Mandatory)` : `${service.service.name} (Voluntary)`}
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
                    <Typography variant="h6" gutterBottom>
                      Indian Standard: {service.is}
                    </Typography>
                  ) : service.service.compliance_header === 'Group, Scheme' ? (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Group: {service.group}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Scheme: {service.scheme}
                      </Typography>
                    </>
                  ) : null}
                  {service.details ? parse(service.details) : 'No details available.'}
                </TabPanel>
              ))}
            </TabContext>
            </Box>
          ) : (
            <Typography>No services available for this product.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
