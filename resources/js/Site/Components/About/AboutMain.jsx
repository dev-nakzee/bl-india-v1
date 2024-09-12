import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { styled } from "@mui/system";
import apiClient from "../../Services/api"; // Ensure this is your configured axios instance
import parse from "html-react-parser";

const AboutMainSection = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const AboutMainContent = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(2),
}));

const AboutMainImage = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "390px",
    borderRadius: "10px",
    boxShadow: theme.shadows[3],
}));

const AboutMain = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await apiClient.get("/about-main");
                setAboutData(response.data);
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
        <section>
            <Typography
                className="page-heading page-main-heading"
                variant="h1"
                textAlign="center"
                marginTop={{ xs: 2 }}
                marginBottom={{ xs: 2, md: 5 }}
            >
                {aboutData.title}
            </Typography>
            <AboutMainSection>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    position={"relative"}
                >
                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <AboutMainImage
                            src={
                                "https://in.bl-india.com/" + aboutData.image_url
                            }
                            alt={aboutData.image_alt}
                        />
                        <Box className="box-about" sx={{ left: "36%" }}>
                            <p>Since 2014</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <AboutMainContent>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    textAlign: "center",
                                    fontWeight: 500,
                                    background: "#0D629A",
                                    maxWidth: "80%",
                                    padding: "10px",
                                    color: "#ffffff",
                                    borderRadius: 20,
                                    mb: 3,
                                }}
                            >
                                {aboutData.tag_line}
                            </Typography>

                            <Box className="about-content">
                                {parse(aboutData.content)}
                            </Box>
                        </AboutMainContent>
                    </Grid>
                </Grid>
            </AboutMainSection>
        </section>
    );
};

export default AboutMain;
