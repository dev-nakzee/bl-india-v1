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
                <meta name="author" content="Rajesh Kumar" />
                <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
                <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={homeData?.seo_title || "Brand Liaison"} />
                <meta property="og:description" content={homeData?.seo_description || "Best Consultant for Product Certifications and Approvals"} />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />

                {/* Breadcrumb Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "About Us", "item": "https://bl-india.com/about" },
                            { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://bl-india.com/services" },
                            { "@type": "ListItem", "position": 3, "name": "Latest Notification", "item": "https://bl-india.com/notifications" },
                            { "@type": "ListItem", "position": 4, "name": "Blog", "item": "https://bl-india.com/blogs" },
                            { "@type": "ListItem", "position": 5, "name": "Contact Us", "item": "https://bl-india.com/contact" }
                        ]
                    })}
                </script>

                {/* Website Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "WebSite",
                        "name": "Brand Liaison India Pvt Ltd",
                        "url": "https://bl-india.com/",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "{search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>

                {/* Local Business Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Brand Liaison India Pvt Ltd",
                        "image": "https://in.bl-india.com/storage/site_settings/logo.webp",
                        "@id": "https://bl-india.com/",
                        "url": "https://bl-india.com/",
                        "telephone": "9810363988",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "110, Sharma Complex, A-2, Guru Nanak Pura",
                            "addressLocality": "New Delhi",
                            "postalCode": "110092",
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 28.63713,
                            "longitude": 77.28476
                        },
                        "openingHoursSpecification": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday"
                            ],
                            "opens": "10:00",
                            "closes": "18:30"
                        },
                        "sameAs": [
                            "https://www.facebook.com/BrandLiaisonIndia",
                            "https://x.com/BrandLiaison",
                            "https://www.instagram.com/brandliaison_/",
                            "https://www.youtube.com/@brandliaison8817",
                            "https://www.linkedin.com/company/brand-liaison-india-pvt-ltd1/",
                            "https://in.pinterest.com/brandliaison/",
                            "https://bl-india.com/"
                        ]
                    })}
                </script>
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
