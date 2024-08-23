import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api'; // Ensure this is your configured axios instance
import parse from 'html-react-parser';

const MissionVisionSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#C3E7FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const MissionVisionContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const MissionVisionImage = styled('img')(({ theme }) => ({
    width: '100%',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const AboutMissionVision = () => {
    const [missionVisionData, setMissionVisionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMissionVisionData = async () => {
            try {
                const response = await apiClient.get('/vision-mission');
                setMissionVisionData(response.data);
            } catch (error) {
                console.error('Error fetching mission vision data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMissionVisionData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!missionVisionData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <MissionVisionSection>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {missionVisionData.tag_line}
                    </Typography>
                    <Typography variant="h4" sx={{ textAlign: 'center', mt: 2}}>
                        {missionVisionData.title}
                    </Typography>
                </Grid>        
                <Grid item xs={12} md={6}>
                    <MissionVisionContent>
                        <Box className="mission-vision-content">
                            {parse(missionVisionData.content)}
                        </Box>
                    </MissionVisionContent>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MissionVisionImage src={'https://in.bl-india.com/' + missionVisionData.image_url} alt={missionVisionData.image_alt} />
                </Grid>
            </Grid>
        </MissionVisionSection>
    );
};

export default AboutMissionVision;
