import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const AboutMainSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const AboutMainContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const AboutMainImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const AboutMain = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await apiClient.get('/about-main');
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!aboutData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <AboutMainSection>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {aboutData.tag_line}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                        {aboutData.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AboutMainImage src={'https://in.bl-india.com/' + aboutData.image_url} alt={aboutData.image_alt} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AboutMainContent>
                        <Box className="about-content">
                            {parse(aboutData.content)}
                        </Box>
                    </AboutMainContent>
                </Grid>
            </Grid>
        </AboutMainSection>
    );
};

export default AboutMain;