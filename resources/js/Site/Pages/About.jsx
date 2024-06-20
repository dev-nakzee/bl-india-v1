import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import { Helmet } from 'react-helmet';
import AboutMain from '../Components/About/AboutMain';

const AboutSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
}));

const AboutCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    boxShadow: theme.shadows[1],
}));

const AboutContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const AboutPage = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await apiClient.get('/about');
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
        <>
            <Helmet>
                <title>{aboutData?.seo_title}</title>
                <meta name="description" content={aboutData?.seo_description} />
                <meta name="keywords" content={aboutData?.seo_keywords} />
                {/* Other meta tags */}
            </Helmet>
            <AboutSection>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={12}>
                        <AboutCard>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {aboutData.name}
                                </Typography>
                            </CardContent>
                        </AboutCard>
                    </Grid>
                </Grid>
            </AboutSection>
            <AboutMain />
        </>
        
    );
};

export default AboutPage;
