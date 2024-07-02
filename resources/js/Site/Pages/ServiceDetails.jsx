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
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2), // Adjust padding for small screens
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
  borderRadius: '50%',
  border: '2px solid #0D629A',
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
  position: 'sticky',
  top: theme.spacing(4), // Adjust the top spacing as per your design
  height: 'fit-content',
  maxHeight: 'calc(100vh - 100px)', // Adjust based on your header height
  overflowY: 'auto',
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Make sidebar full width on small screens
    position: 'static', // Remove sticky positioning on small screens
    top: 'auto', // Reset top spacing on small screens
    maxHeight: 'none', // Reset max height on small screens
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

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <ServiceSection className='Service-section'>
        <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'} mb={3}>
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
            <ServiceImage
              component="img"
              image={`https://in.bl-india.com/${serviceData.service.thumbnail_url}`}
              alt={serviceData.service.image_alt}
            />
            <Box flexDirection={'column'}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, maxWidth:'100%', backgroundColor: '#0D629A', color: '#fff', margin: 'auto', borderRadius: 20, padding:'5px 40px' }}>
                {serviceData.service.tagline}
              </Typography>
              <Typography variant="h4" sx={{ textAlign: 'center', mt: 2, textTransform: 'uppercase' }}>
                {serviceData.service.name}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {isMobile ? (
            <>
               <FormControl fullWidth>
              {/* <InputLabel id="section-select-label">Select Section</InputLabel> */}
              <Select
                labelId="section-select-label"
                value={selectedSection ? selectedSection.id : ''}
                onChange={(e) => {
                  const section = serviceData.sections.find(sec => sec.id === e.target.value);
                  handleSectionClick(section);
                }}
              >
                {serviceData.sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
                <ServicesList>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12}>
                {selectedSection && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom>
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
            </>
         
            
          ) : (
            <Grid item xs={12}  display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
            <Sidebar className='Service-section-siderbar'>
              <Typography variant="h6" mb={2}>{serviceData.service.name}</Typography>
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
                {selectedSection && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom>
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
            </Grid>
          )}
      
        </Grid>
      </ServiceSection>
    </>
  );
};

export default ServiceDetails;
