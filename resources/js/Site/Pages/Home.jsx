import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import HomeBanner from "../Components/Home/HomeBanner";
import HomeServices from "../Components/Home/HomeServices";
import HomeAbout from "../Components/Home/HomeAbout";
import HomeBrochure from "../Components/Home/HomeBrochure";
import ScheduleCallDrawer from "../Components/ScheduleCallDrawer";
import HomeProcess from "../Components/Home/HomeProcess";
import HomeBlog from "../Components/Home/HomeBlog";
import HomeTestimonials from "../Components/Home/HomeTestimonials";
import HomeAssociates from "../Components/Home/HomeAssociates";
import apiClient from "../Services/api";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useLocation } from 'react-router-dom';

const LazyLoadComponent = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return <div ref={ref}>{inView && children}</div>;
};

const HomePage = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

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

    const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

    return (
        <>
            <Helmet>
                <title>{homeData?.seo_title || "Brand Liaison"}</title>
                <meta
                    name="description"
                    content={
                        homeData?.seo_description ||
                        "Best Consultant for Product Certifications and Approvals"
                    }
                />
                <meta
                    name="keywords"
                    content={
                        homeData?.seo_keywords ||
                        "BIS Certificate Consultants, WPC Consultants, BIS certification"
                    }
                />
                {/* Other meta tags */}
                <meta name="author" content="Rajesh Kumar" />
                <meta
                    name="publisher"
                    content="Brand Liaison India Pvt. Ltd."
                />
                <meta
                    name="copyright"
                    content="Brand Liaison India Pvt. Ltd."
                />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={homeData?.seo_title || "Brand Liaison"}
                />
                <meta
                    property="og:description"
                    content={
                        homeData?.seo_description ||
                        "Best Consultant for Product Certifications and Approvals"
                    }
                />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />

                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />
                 {/* Dynamically add meta tags */}
        {homeData.meta_tags?.map((meta, index) => (
          <meta key={index} {...meta} />
        ))}
        
        {/* Dynamically add scripts */}
        {homeData.seo_scripts?.map((script, index) => (
          <script key={index} type={script.type || "text/javascript"} dangerouslySetInnerHTML={{ __html: script.content }} />
        ))}

        {/* Dynamically add styles */}
        {homeData.seo_styles && (
          <style dangerouslySetInnerHTML={{ __html: homeData.seo_styles }} />
        )}
        
        {/* Inject structured data */}
        {homeData.seo_tags && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeData.seo_tags }} />
        )}
            </Helmet>
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
                <>
                    <HomeBanner />
                    <HomeServices />
                    <LazyLoadComponent>
                        <HomeAbout />
                    </LazyLoadComponent>
                    <LazyLoadComponent>
                        <HomeBrochure />
                    </LazyLoadComponent>
                    <LazyLoadComponent>
                        <ScheduleCallDrawer />
                    </LazyLoadComponent>
                    <LazyLoadComponent>
                        <HomeProcess />
                    </LazyLoadComponent>
                    <LazyLoadComponent>
                        <HomeBlog />
                    </LazyLoadComponent>
                    <LazyLoadComponent>
                        <HomeTestimonials />
                    </LazyLoadComponent>
                    <LazyLoadComponent>
                        <HomeAssociates />
                    </LazyLoadComponent>
                </>
            )}
        </>
    );
};

export default HomePage;
