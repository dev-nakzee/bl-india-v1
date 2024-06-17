import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import apiClient from '../../Services/api';

const HomeServices = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/home-services');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching home services data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <Box sx={{ mx: 4, px: 4, py: 6 }}>
            {data.section && data.section.map(section => (
                <Box key={section.id} sx={{ marginBottom: '40px', textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20}}>{section.tag_line}</Typography>
                    <Typography variant="h1" sx={{ mt: 1, fontWeight: 400}}>{section.title}</Typography>
                </Box>
            ))}
            <Grid container spacing={4}>
                {data.services && data.services.map(service => (
                    <Grid item xs={12} md={6} lg={3} key={service.id}>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center', 
                            padding: '20px', 
                            boxShadow: 3, 
                            borderRadius: '10px', 
                            height: '100%' 
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <img src={'https://in.bl-india.com/' + service.thumbnail_url} alt={service.image_alt} style={{ width: '90px', borderRadius: '10px' }} />
                                <Typography variant="h3" component="h3" sx={{ marginLeft: '15px', color: '#0D629A', fontWeight: 500 }}>{service.name}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ marginTop: '10px', flexGrow: 1 }}>{service.description}</Typography>
                            <Button component={Link} to={`/services/${service.slug}`} sx={{ marginTop: '10px', color: '#0D629A' }}>
                                Read More
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
                <Button component={Link} to="/services" variant="contained" color="primary">
                    View All
                </Button>
            </Box>
        </Box>
    );
};

export default HomeServices;
