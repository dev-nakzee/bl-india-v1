import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import apiClient from '../../Services/api';
import parse from 'html-react-parser'; 

const Banner = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '50vh', // Set height to full viewport height
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'flex-start', // Align content to the left
    alignItems: 'center',
    color: '#fff',
    overflow: 'hidden', // Ensure the content stays within the bounds
    margin: 0, // Remove margins
    padding: 0, // Remove padding
    [theme.breakpoints.down('sm')]: {
      height: '50vh', // Adjust height for smaller screens
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
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearch = () => {
        // Handle search functionality here
        console.log('Search query:', searchQuery);
    };

    return (
        <Banner className="Banner-section"
         sx={{ backgroundImage: `url(${bannerData.image_url})` }}
         >
            <Content className='Banner-section-content-1'>
                <Typography sx={{ color: '#0D629A', width: '100%' }}>
                {parse(bannerData.content)} 

                </Typography>
                {/* <Typography variant="subtitle1" component="p" sx={{ color: '#0D629A', fontWeight: 'normal', fontSize: 18, mt: 4 }}>{bannerData.tag_line}</Typography> */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt:1, }}
                width={{xs:'100%',md:'50%'}}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Enter your product / Service "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: '5px', flexGrow: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color="primary" onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Content>
        </Banner>
    );
};

export default HomeBanner;
