import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import apiClient from '../../Services/api';

const HomeServices = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('https://in.bl-india.com/api/v1/fe/home-services');
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
        <Box sx={{ mx: 4, px: 4 }}>
            {data.section && data.section.map(section => (
                <Box key={section.id} sx={{ marginBottom: '40px', textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>{section.tag_line}</Typography>
                    <Typography variant="h3">{section.title}</Typography>
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
                                <img src={service.thumbnail_url} alt={service.image_alt} style={{ width: '90px', borderRadius: '10px' }} />
                                <Typography variant="h3" sx={{ marginLeft: '15px' }}>{service.name}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ marginTop: '10px', flexGrow: 1 }}>{service.description}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomeServices;
