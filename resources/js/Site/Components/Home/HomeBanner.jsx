import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api';
import parse from 'html-react-parser';
import SearchField from '../Search/SearchField';

const Banner = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '55vh', // Set height to full viewport height
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    display: 'flex',
    justifyContent: 'flex-start', // Align content to the left
    alignItems: 'center',
    color: '#fff',
    overflow: 'hidden', // Ensure the content stays within the bounds
    margin: 0, // Remove margins
    padding: 0, // Remove padding
    [theme.breakpoints.down('md')]: {
        height: '45vh', // Adjust height for smaller screens
    },
    [theme.breakpoints.down('sm')]: {
        height: '30vh', // Adjust height for smaller screens
    },
    [theme.breakpoints.down('xs')]: {
        height: '25vh', // Adjust height for smaller screens
    },
}));

const Content = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    marginLeft: 40, // Add some left margin
    [theme.breakpoints.down('sm')]: {
        marginLeft: 20, // Adjust left margin for smaller screens
    },
}));

const HomeBanner = () => {
    const [bannerData, setBannerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await apiClient.get('/home-banner');
                const bannerContent = response.data.find(banner => banner.slug === 'home-banner');
                setBannerData(bannerContent);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBannerData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!bannerData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <Banner className="Banner-section"
            sx={{ backgroundImage: `url(${bannerData.image_url})` }}
        >
            <Typography variant="h1" className='d-none'>Brand Liaison
                    </Typography>
            <Content className='Banner-section-content-fix'>
                <div className='banner-content-text' sx={{ width: '60%' }}>
                    {parse(bannerData.content)}
                </div>
                <SearchField />
            </Content>
        </Banner>
    );
};

export default HomeBanner;
