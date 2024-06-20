import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const FounderSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const FounderContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const FounderImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const AboutFounder = () => {
    const [founderData, setFounderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFounderData = async () => {
            try {
                const response = await apiClient.get('/founder-voice');
                setFounderData(response.data);
            } catch (error) {
                console.error('Error fetching founder data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFounderData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!founderData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <FounderSection>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {founderData.tag_line}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                        {founderData.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FounderImage src={'https://in.bl-india.com/' + founderData.image_url} alt={founderData.image_alt} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FounderContent>
                        <Box className="founder-content">
                            {parse(founderData.content)}
                        </Box>
                    </FounderContent>
                </Grid>
            </Grid>
        </FounderSection>
    );
};

export default AboutFounder;
