import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';

const FounderSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    // boxShadow: theme.shadows[3],
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
}));

const FounderContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
    position:'relative',
}));

const FounderImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '350px',
    border: '6px solid #ffffff',
    borderRadius: '30px 85px 30px 95px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, .25)',
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
        <FounderSection className='founder-section'>
            <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {founderData.tag_line}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                        {founderData.title}
                    </Typography>
                </Grid>
            <Grid container spacing={3} alignItems="center" justifyContent={'space-around'} mt={3}>
            <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={2}>
                    <FounderImage className="founder-img" src={'https://in.bl-india.com/' + founderData.image_url} alt={founderData.image_alt} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FounderContent>
                        <Box className="founder-content">                       
                            {parse(founderData.content)}
                        </Box>
                        <Box class="testimonial-quote"><FormatQuoteOutlinedIcon className=''/></Box>
                    </FounderContent>
                </Grid>
                <Grid item xs={12} md={2}></Grid>
            </Grid>
        </FounderSection>
    );
};

export default AboutFounder;
