import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Stack,

} from "@mui/material";
import { styled } from "@mui/system";
import Badge from "@mui/material/Badge";
import apiClient from "../../Services/api";

const ProcessSection = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column", // Change flex direction to column on small screens
        padding: theme.spacing(2), // Adjust padding for small screens
    },
}));

const ProcessContent = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(2),
}));

const ProcessImage = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: theme.shadows[3],
}));

const HomeProcess = () => {
    const [processData, setProcessData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProcessData = async () => {
            try {
                const response = await apiClient.get("/home-process");
                setProcessData(response.data);
            } catch (error) {
                console.error("Error fetching process data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProcessData();
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

    if (!processData) {
        return null; // Or return a fallback UI if needed
    }

    const { section, processes } = processData;

    return (
        <ProcessSection className="Process-section">
            <Grid
                container
                className="Process-section-container"
                spacing={4}
                alignItems="center"
                paddingBlock={{ sm: 1, md: 2, lg: 3 }}
            >
                <Grid
                    className="Process-section-item"
                    item
                    xs={12}
                    sx={{ mb: 5 }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            fontWeight: 500,
                            background: "#0D629A",
                            maxWidth: 280,
                            color: "#ffffff",
                            margin: "auto",
                            borderRadius: 20,
                        }}
                    >
                        {section[0].tag_line}
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: "center",
                            mt: 2,
                            
                        }}
                    >
                        {section[0].title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={4}
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {processes.map((process) => (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={process.id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        height: "100%",
                                    }}
                                >
                                    <Badge badgeContent= {process.order} color="primary" >
                                   
                                    </Badge>
                                    <img
                                        src={
                                            "https://bl-india.com/" +
                                            process.image_url
                                        }
                                        alt={process.image_alt}
                                    />
                                    <Box sx={{ textAlign: "center", mt: 2 }}>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            {process.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {process.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </ProcessSection>
    );
};

export default HomeProcess;
