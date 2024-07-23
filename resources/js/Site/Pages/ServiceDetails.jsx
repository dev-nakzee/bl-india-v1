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
  useMediaQuery,
  Button,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { useParams, useNavigate, useLocation,Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api';
import parse from 'html-react-parser';
import MandatoryProducts from '../Components/MandatoryProducts';
import BackButton from '../Components/BackButton';
import DownloadBrochure from "../Components/DownloadBrochure";
import RequestCallBack from "../Components/RequestCallBack";

const ServiceSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ServiceImage = styled(CardMedia)(({ theme }) => ({
  maxWidth: '85px',
  backgroundSize: 'contain',
  objectFit: 'contain',
  marginRight: '20px',
  borderRadius: '50%',
  border: '2px solid #0D629A',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '60px',
    marginRight: '10px',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: theme.shadows[5],
}));

const RelServiceImage = styled(CardMedia)(({ theme }) => ({
  width: '70px',
  height: '70px',
  backgroundSize: 'contain',
  objectFit: 'contain',
  marginRight: '5px',
  borderRadius: '50%',
  border: '2px solid #0D629A',
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    marginRight: '5px',
  },
}));

const ServiceCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '25%',
  position: 'sticky',
  top: theme.spacing(4),
  overflowY: 'auto',
  height: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    position: 'static',
    top: 'auto',
    maxHeight: 'none',
    overflowY: 'visible',
    paddingRight: 0,
  },
}));

const ServicesList = styled(Box)(({ theme }) => ({
  width: '75%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const RelatedServices = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ServiceDetails = () => {
  const { categorySlug, slug } = useParams();
  const location = useLocation();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await apiClient.get(`/services/${slug}`);
        setServiceData(response.data);
        if (response.data.sections.length > 0) {
          const initialSection = response.data.sections.find(sec => `#${sec.slug}` === location.hash) || response.data.sections[0];
          setSelectedSection(initialSection);
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [slug, location.hash]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    navigate(`/services/${categorySlug}/${slug}#${section.slug}`, { replace: true });
  };

  useEffect(() => {
    if (location.hash && serviceData) {
      const section = serviceData.sections.find(sec => `#${sec.slug}` === location.hash);
      if (section) {
        setSelectedSection(section);
      }
    }
  }, [location.hash, serviceData]);

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
              <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, maxWidth: '100%', backgroundColor: '#0D629A', color: '#fff', margin: 'auto', borderRadius: 20, padding: '5px 40px' }}>
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
            <Grid item xs={12} display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
              <Sidebar className='Service-section-siderbar'>
                <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>
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
                </Box>
                <DownloadBrochure />
                <RequestCallBack />
              </Sidebar>
              <ServicesList className='service-section-content'>
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
                {serviceData.related_services && serviceData.related_services.length > 0 && (
                  <RelatedServices>
                    <Typography variant="h5" gutterBottom>Related Services</Typography>
                    <Grid container spacing={2}>
                      {serviceData.related_services.map((relatedService) => (
                        <Grid item key={relatedService.id} xs={12} sm={6} md={4}>
                          <ServiceCard>
                            <Box paddingInline={'16px'} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '16px' }}>
                              <RelServiceImage
                                component="img"
                                image={`https://in.bl-india.com/${relatedService.thumbnail_url}`}
                                alt={relatedService.image_alt}
                              />
                              <Box sx={{ display: "flex", alignItems: "left", flexDirection: 'column' }}>
                                <Typography
                                  variant="h5"
                                  component="h5"
                                  sx={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                    color: "#0D629A",
                                    fontWeight: 600,
                                  }}
                                >
                                  {relatedService.name}
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
                                  {relatedService.tagline}
                                </Typography>
                              </Box>
                            </Box>
                            <ServiceCardContent>
                              <Typography variant="body2" color="text.secondary">
                                {relatedService.description}
                              </Typography>
                              <Button sx={{ marginTop: '15px' }} variant="outlined" component={Link} to={`/services/${relatedService.service_category?.slug}/${relatedService.slug}`}>
                                Read More
                              </Button>
                            </ServiceCardContent>
                          </ServiceCard>
                        </Grid>
                      ))}
                    </Grid>
                  </RelatedServices>
                )}
                <BackButton />
              </ServicesList>
            </Grid>
          )}
        </Grid>
        {isMobile ? (
            <Box sx={{marginBlock:2}}>
            <DownloadBrochure />
            <RequestCallBack />
          </Box>

        ):(
          <></>
        )
      }
      </ServiceSection>
    </>
  );
};

export default ServiceDetails;
