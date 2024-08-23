import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Button,
    CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import apiClient from "../../Services/api";

const HomeServices = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/home-services");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching home services data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

    if (!data) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <Box sx={{ mx: 4, px: 4, py: 6 }} className="Services-section">
            {data.section &&
                data.section.map((section) => (
                    <Box
                        key={section.id}
                        sx={{ marginBottom: "40px", textAlign: "center" }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 500,
                                background: "#0D629A",
                                maxWidth: 280,
                                color: "#ffffff",
                                margin: "auto",
                                borderRadius: 20,
                            }}
                        >
                            {section.tag_line}
                        </Typography>
                        <Typography variant="h3" sx={{ mt: 1 }}>
                            {section.title}
                        </Typography>
                    </Box>
                ))}
            <Grid container spacing={4}>
                {data.services &&
                    data.services.map((service) => (
                        <Grid item xs={12} sm={6} md={6} lg={3} key={service.id}>
                            <Box
                                sx={{
                                    // display: "flex",
                                    // flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    padding: "15px",
                                    boxShadow: 3,
                                    borderRadius: "10px",
                                    height: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <img
                                        src={
                                            "https://in.bl-india.com/" +
                                            service.thumbnail_url
                                        }
                                        alt={service.image_alt}
                                        style={{
                                            width: "70px",
                                            borderRadius: "10px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "left",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="bodytext"
                                            component="h6"
                                            sx={{
                                                textAlign:"left",
                                                marginLeft: "5px",
                                                // marginBottom: "5px",
                                                color: "#0D629A",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {service.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            component="p"
                                            sx={{
                                                marginLeft: "5px",
                                                textAlign:"left",
                                                color: "#1C7CBC",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {service.tagline}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        marginBlock: "5px",
                                        flexGrow: 1,
                                        textAlign: "left",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 6,
                                        overflow: "hidden",
                                    }}
                                >
                                    {service.description}
                                </Typography>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        sx={{fontSize:'10px'}}
                                        to={`/services/${service.service_category.slug}/${service.slug}`}
                                    >
                                        Learn about {service.name}
                                    </Button>
                                </CardActions>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
            <Box sx={{ textAlign: "center", marginTop: "40px" }}>
                <Button
                    component={Link}
                    to="/services"
                    variant="contained"
                    color="primary"
                >
                    View All Services
                </Button>
            </Box>
        </Box>
    );
};

export default HomeServices;
