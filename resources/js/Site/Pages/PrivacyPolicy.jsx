import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import { Helmet } from "react-helmet";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import parse from "html-react-parser";
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;


    useEffect(() => {
        fetchPrivacyPolicy();
    }, []);

    const fetchPrivacyPolicy = async () => {
        try {
            const response = await apiClient.get("/privacy-policy");
            setPageData(response.data);
        } catch (error) {
            console.error("Error fetching privacy policy:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!pageData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <>
            <Helmet>
                <title>{pageData.page.seo_title}</title>
                <meta
                    name="description"
                    content={pageData.page.seo_description}
                />
                <meta name="keywords" content={pageData.page.seo_keywords} />
                                {/* Other meta tags */}
                <meta name="author" content="Rajesh Kumar" />
                <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
                <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageData.page.seo_title} />
                <meta property="og:description" content={pageData.page.seo_description} />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />

                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />
            </Helmet>

            <Box padding={{lg:5,md:4,sm:3,xs:2}} className="privacy-policy">
                <Typography
                    className="page-main-heading page-heading"
                    variant="h1"
                    gutterBottom
                    textAlign={"center"}
                    marginBottom={4}
                >
                    {pageData.page.name}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                    {parse(pageData.section.content)}
                </Box>
            </Box>
        </>
    );
};

export default PrivacyPolicy;
