import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import apiClient from "../../Services/api"; // Ensure this is your configured axios instance
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomersSection = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(4),
    // backgroundColor: '#f5f5f5',
    // boxShadow: theme.shadows[3],
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
}));

const CustomerCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    // boxShadow: theme.shadows[3],
}));

const CustomerImage = styled(CardMedia)(({ theme }) => ({
    height: 100,
    borderRadius: "10px",
    filter: "grayscale(1)",
    // boxShadow: theme.shadows[3],
}));

const AboutCustomers = () => {
    const [customersData, setCustomersData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomersData = async () => {
            try {
                const response = await apiClient.get("/about-clients");
                setCustomersData(response.data);
            } catch (error) {
                console.error("Error fetching customers data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomersData();
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

    if (!customersData) {
        return null; // Or return a fallback UI if needed
    }
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              }
            }
          ]
    };

    return (
        <CustomersSection>
           
            <Grid item xs={12} md={12} mb={3}>
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
                    {customersData.section.tag_line}
                </Typography>
                <Typography variant="h4" sx={{ textAlign: 'center', mt: 2}}>
                    {customersData.section.title}
                </Typography>
            </Grid>
           
            <Slider {...settings}>
                {customersData.customers.map((customer) => (
                    <Grid item key={customer.id}>
                        <CustomerCard>
                            <CustomerImage
                                image={"https://in.bl-india.com/" + customer.image_url}
                                title={customer.image_alt}
                            />
                            {/* <CardContent>
                                <Typography variant="h6" component="div">
                                    {customer.name}
                                </Typography>
                            </CardContent> */}
                        </CustomerCard>
                    </Grid>
                ))}
            </Slider>
           
        </CustomersSection>
    );
};

export default AboutCustomers;
