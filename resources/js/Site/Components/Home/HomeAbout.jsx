import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import apiClient from "../../Services/api";
import parse from "html-react-parser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutSection = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(4),
    backgroundColor: "#C3E7FF",
    boxShadow: theme.shadows[3],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column", // Change flex direction to column on small screens
        padding: theme.spacing(2), // Adjust padding for smaller screens
    },
}));

const AboutContent = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(2),
}));

const AboutImage = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: theme.shadows[3],
}));

const HomeAbout = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await apiClient.get("/home-about");
                setAboutData(response.data.section[0]);
            } catch (error) {
                console.error("Error fetching about data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

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

    if (!aboutData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <AboutSection className="about-section">
            <Grid container spacing={4} alignItems="center" sx={{ mx: 4 }}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            fontWeight: 500,
                            background: "#0D629A",
                            maxWidth: 280,
                            color: "#ffffff",
                            borderRadius: 20,
                            margin: "0 auto",
                        }}
                    >
                        {aboutData.name}
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            display: { xs: "block", sm: "block", md: "none" },
                        }}
                        marginBlock={1}
                        textAlign={"center"}
                    >
                        {aboutData.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AboutImage
                        src={"https://in.bl-india.com/" + aboutData.image_url}
                        alt={aboutData.image_alt}
                        sx={{}}
                    />
                    <Box className="box-about">
                        <p>Since 2014</p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: { xs: "none", md: "block" } }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                textAlign: "center",
                                fontWeight: 500,
                                background: "#0D629A",
                                maxWidth: 280,
                                color: "#ffffff",
                                borderRadius: 20,
                            }}
                        >
                            {aboutData.name}
                        </Typography>
                    </Grid>
                    <AboutContent className="">
                        <Typography
                            variant="h3"
                            marginBlock={{xs:1,md:2}}
                            sx={{ display: { xs: "none", md: "block" } }}
                        >
                            {aboutData.title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                borderLeft: "5px solid #0D629A",
                                pl: 2,
                                fontSize: "1rem",
                                fontStyle: "italic",
                            }}
                        >
                            {aboutData.tag_line}
                        </Typography>
                        <Box className="about-content" paddingBottom={1}>
                            {parse(aboutData.content)}
                        </Box>
                    </AboutContent>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Button
                            component={Link}
                            to="/about"
                            variant="contained"
                            color="primary"
                        >
                            Read more about Brand Liaison
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </AboutSection>
    );
};

export default HomeAbout;
