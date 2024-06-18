import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api';

const ProcessSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#C3E7FF',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const ProcessContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const ProcessImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const HomeProcess = () => {
    const [processData, setProcessData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProcessData = async () => {
            try {
                const response = await apiClient.get('/home-process');
                setProcessData(response.data);
            } catch (error) {
                console.error('Error fetching process data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProcessData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!processData) {
        return null; // Or return a fallback UI if needed
    }

    const { section, processes } = processData;

    return (
        <ProcessSection>
            <Grid container spacing={4} alignItems="center" sx={{ mx: 4 }}>
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {section[0].tag_line}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProcessImage src={'https://in.bl-india.com/' + section[0].image_url} alt={section[0].image_alt} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProcessContent>
                        <Typography variant="h2" sx={{ mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                            {section[0].title}
                        </Typography>
                    </ProcessContent>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4}>
                        {processes.map((process) => (
                            <Grid item xs={12} md={4} key={process.id}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={'https://in.bl-india.com/' + process.image_url}
                                        alt={process.image_alt}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {process.order}. {process.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {process.text}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </ProcessSection>
    );
};

export default HomeProcess;
