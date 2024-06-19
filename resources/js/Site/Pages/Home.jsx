import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import HomeBanner from '../Components/Home/HomeBanner';
import HomeServices from '../Components/Home/HomeServices';
import HomeAbout from '../Components/Home/HomeAbout';
import HomeBrochure from '../Components/Home/HomeBrochure';
import ScheduleCallDrawer from '../Components/ScheduleCallDrawer';
import HomeProcess from '../Components/Home/HomeProcess';
import HomeBlog from '../Components/Home/HomeBlog';
import HomeTestimonials from '../Components/Home/HomeTestimonials';
import apiClient from '../Services/api';
import { Helmet } from 'react-helmet';

const HomePage = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getHomeData = async () => {
            try {
                const response = await apiClient.get("/home");
                const homePageData = response.data.find(
                    (page) => page.slug === "home"
                );
                setHomeData(homePageData);
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        getHomeData();
    }, []);

    return (
        <>
            <Helmet>
                <title>{homeData?.seo_title}</title>
                <meta name="description" content={homeData?.seo_description} />
                <meta name="keywords" content={homeData?.seo_keywords} />
                {/* Other meta tags */}
            </Helmet>
         
            <HomeBanner />
            <HomeServices />
            <HomeAbout />
            <HomeBrochure />
            <ScheduleCallDrawer />
            <HomeProcess />
            <HomeBlog />
            <HomeTestimonials />
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Typography paragraph>Welcome to our homepage!</Typography>
            )}
        </>
    );
};

export default HomePage;
