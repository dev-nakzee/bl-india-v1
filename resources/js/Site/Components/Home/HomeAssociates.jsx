import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api';

const AssociatesSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#C3E7FF',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2), // Adjust padding for smaller screens
    },
  }));
  
  const AssociatesContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
  }));
  
  const AssociatesImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '200px',
    margin: '0 auto',
    display: 'block',
  }));
const HomeAssociates = () => {
    const [associatesData, setAssociatesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssociatesData = async () => {
            try {
                const response = await apiClient.get('/home-associates');
                setAssociatesData(response.data);
            } catch (error) {
                console.error('Error fetching associates data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssociatesData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!associatesData) {
        return null; // Or return a fallback UI if needed
    }

    const { section, associates } = associatesData;

    return (
        <AssociatesSection className='Associates-section'>
            <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {section[0].tag_line}
                    </Typography>
                    <Typography variant="h3" sx={{mt: 2}}>
                        {section[0].title}
                    </Typography>
                </Grid>
              
                <Grid item xs={12} >
                    <AssociatesContent>
                        <Grid container spacing={2}>
                            {associates.map((associate) => (
                                <Grid item xs={6} sm={3} md={3}  key={associate.id}>
                                    <img src={'https://in.bl-india.com/' + associate.image_url} alt={associate.image_alt} style={{ height: '100px' }} />
                                </Grid>
                            ))}
                        </Grid>
                    </AssociatesContent>
                </Grid>
            </Grid>
        </AssociatesSection>
    );
};

export default HomeAssociates;
