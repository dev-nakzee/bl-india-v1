import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import apiClient from '../../Services/api';
import parse from 'html-react-parser';

const AboutSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#C3E7FF',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const AboutContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const AboutImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const HomeAbout = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await apiClient.get('/home-about');
                setAboutData(response.data.section[0]);
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
        <AboutSection className='about-section'>
            <Grid container spacing={4} alignItems="center" sx={{ mx: 4}}>
               
                <Grid item xs={12} md={6}>
                    <AboutImage src={'https://in.bl-india.com/' + aboutData.image_url} alt={aboutData.image_alt} sx={{}}/>
                </Grid>
                <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff',  borderRadius: 20}}>
                        {aboutData.name}
                    </Typography>
                </Grid>
                    <AboutContent>
                        <Typography variant="h2" sx={{ mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase',  }}>
                            {aboutData.title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mt: 2, mb: 2, borderLeft: '5px solid #0D629A', pl: 2, fontSize: '1rem', fontStyle: 'italic' }}>
                            {aboutData.tag_line}
                        </Typography>
                        <Box className="about-content">
                            {parse(aboutData.content)}
                        </Box>
                    </AboutContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Button component={Link} to="/about" variant="contained" color="primary">
                            View All
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            
        </AboutSection>
    );
};

export default HomeAbout;
