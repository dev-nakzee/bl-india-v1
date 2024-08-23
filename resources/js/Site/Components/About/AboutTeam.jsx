import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api'; // Ensure this is your configured axios instance

const TeamSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#C3E7FF',
    // boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const TeamCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    boxShadow: theme.shadows[3],
}));

const TeamImage = styled(CardMedia)(({ theme }) => ({
    minHeight: '300px',
    width: '250px',
    objectFit: 'cover',
    borderBottomRightRadius:'220px',
}));

const AboutTeam = () => {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await apiClient.get('/about-team');
                setTeamData(response.data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!teamData) {
        return null; // Or return a fallback UI if needed
    }

    const { section, team } = teamData;

    return (
        <TeamSection>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: '30%', color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {section.tag_line}
                    </Typography>
                    <Typography variant="h4" sx={{ textAlign: 'center', mt: 2}}>
                        {section.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Grid container justifyContent="center">
                        {team.map((member) => (
                            <TeamCard key={member.id}>
                                <TeamImage
                                    image={'https://in.bl-india.com/' + member.image_url}
                                    title={member.image_alt}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.designation}
                                    </Typography>
                                </CardContent>
                            </TeamCard>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </TeamSection>
    );
};

export default AboutTeam;
